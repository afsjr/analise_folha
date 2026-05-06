"use client";

import { Search } from "lucide-react";
import { Employee } from "@/types";

interface EmployeeTableProps {
  data: Employee[];
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  filterSegment: string;
  setFilterSegment: (val: string) => void;
  allSegments: string[];
}

export function EmployeeTable({ data, searchTerm, setSearchTerm, filterSegment, setFilterSegment, allSegments }: EmployeeTableProps) {
  const formatCurrency = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <h2 style={{ display: 'flex', alignItems: 'center' }}>
          Relatório Detalhado ({data.length})
        </h2>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
            <input 
              type="text" 
              placeholder="Buscar colaborador..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{ paddingLeft: "2.5rem", width: "220px" }} 
            />
          </div>
          <select value={filterSegment} onChange={(e) => setFilterSegment(e.target.value)} style={{ padding: "0.5rem 1rem" }}>
            {allSegments.map(seg => <option key={seg} value={seg}>{seg === "all" ? "Todos Segmentos" : seg}</option>)}
          </select>
        </div>
      </div>
      <div style={{ maxHeight: "400px", overflow: "auto" }} className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Segmento</th>
              <th>Cargo</th>
              <th style={{ textAlign: "right" }}>Bruto</th>
              <th style={{ textAlign: "right" }}>INSS</th>
              <th style={{ textAlign: "right" }}>Créditos</th>
              <th style={{ textAlign: "right" }}>Líquido</th>
            </tr>
          </thead>
          <tbody>
            {data.map((emp, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600, color: "var(--text-main)" }}>{emp.nome}</td>
                <td><span className="badge badge-primary">{emp.segmento}</span></td>
                <td style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>{emp.cargo}</td>
                <td style={{ textAlign: "right", fontWeight: 500 }}>{formatCurrency(emp.total_bruto)}</td>
                <td style={{ textAlign: "right", color: "var(--danger)" }}>-{formatCurrency(emp.inss)}</td>
                <td style={{ textAlign: "right", color: "var(--success)" }}>+{formatCurrency(emp.creditos_extras)}</td>
                <td style={{ textAlign: "right", fontWeight: 700, color: "var(--text-main)" }}>{formatCurrency(emp.total_liquido)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
