"use client";

import { X, Upload } from "lucide-react";
import { useRef, useState } from "react";
import Papa from "papaparse";
import { Employee } from "@/types";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataImported: (data: Employee[]) => void;
}

export function ImportModal({ isOpen, onClose, onDataImported }: ImportModalProps) {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData: Employee[] = results.data.map((row: any) => ({
          nome: row["Nome"] || "",
          cargo: row["Cargo"] || "",
          segmento: row["Segmento"] || "Outros",
          categoria: row["Categoria"] || "Outros",
          aulas_semanais: row["Aulas Semanais"] || "0",
          total_bruto: parseFloat(row["Total Bruto"]) || 0,
          inss: parseFloat(row["INSS"]) || 0,
          creditos_extras: parseFloat(row["Créditos"]) || 0,
          total_liquido: parseFloat(row["Total Líquido"]) || 0,
        })).filter((e: Employee) => e.nome);

        if (parsedData.length === 0) {
          setError("Arquivo inválido ou vazio.");
          return;
        }

        onDataImported(parsedData);
        onClose();
      }
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Importar Folha de Pagamento</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">
          <div style={{ 
            border: "2px dashed var(--border-light)", 
            borderRadius: "12px", 
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            textAlign: "center",
            marginBottom: "1.5rem"
          }}>
            <div style={{ background: "var(--primary-light-alpha)", color: "var(--primary)", padding: "1rem", borderRadius: "50%" }}>
              <Upload size={32} />
            </div>
            <div>
              <p style={{ fontWeight: 600 }}>Selecione o arquivo CSV</p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>O arquivo deve conter colunas como "Nome", "Cargo", "Segmento", etc.</p>
            </div>
            <input 
              ref={fileInputRef} 
              type="file" 
              accept=".csv" 
              onChange={handleFileSelect} 
              style={{ display: "none" }} 
            />
            <button className="card primary" onClick={() => fileInputRef.current?.click()} style={{ padding: "0.5rem 1.5rem" }}>
              Selecionar Arquivo
            </button>
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <div className="modal-actions">
            <button className="card" onClick={onClose} style={{ flex: 1 }}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
