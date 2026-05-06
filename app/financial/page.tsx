"use client";

import { useState } from "react";
import { 
  Wallet, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Download,
  AlertCircle,
  FileSearch,
  CheckCircle2,
  Clock,
  Loader2
} from "lucide-react";

const TRANSACTIONS = [
  { id: 1, type: "receivable", category: "Mensalidade", description: "Mensalidade - João Silva (3º Ano)", amount: 1200.00, date: "2026-05-05", status: "pago" },
  { id: 2, type: "payable", category: "Manutenção", description: "Reparo Ar Condicionado - Bloco A", amount: 450.00, date: "2026-05-04", status: "pendente" },
  { id: 3, type: "receivable", category: "Matrícula", description: "Matrícula - Maria Oliveira (1º Ano)", amount: 2500.00, date: "2026-05-03", status: "pago" },
  { id: 4, type: "payable", category: "Suprimentos", description: "Papelaria e Escritório - Abril", amount: 890.40, date: "2026-05-02", status: "atrasado" },
  { id: 5, type: "payable", category: "Energia", description: "Fatura Equatorial - Março/Abril", amount: 3200.00, date: "2026-05-01", status: "pendente" },
];

export default function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const formatCurrency = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const handleProcessNFs = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 3000);
    }, 2000);
  };

  return (
    <main className="container animate-fade-in">
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p className="text-sm font-medium" style={{ color: "#64748b", marginBottom: "0.25rem" }}>Gestão Financeira</p>
          <h1>Contas a Pagar e Receber</h1>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button 
            className="card" 
            onClick={handleProcessNFs}
            disabled={isProcessing}
            style={{ 
              padding: "0.5rem 1rem", 
              fontSize: "0.875rem", 
              display: "flex", 
              alignItems: "center", 
              gap: "0.5rem",
              background: isProcessing ? "#f1f5f9" : "#fff",
              cursor: isProcessing ? "not-allowed" : "pointer"
            }}
          >
            {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <FileSearch size={18} color="var(--primary)" />}
            {isProcessing ? "Processando..." : "Processar Notas Fiscais"}
          </button>
          <button className="card primary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Plus size={18} />
            Nova Entrada
          </button>
        </div>
      </header>

      {showFeedback && (
        <div style={{
          position: "fixed",
          top: "2rem",
          right: "2rem",
          background: "var(--success)",
          color: "white",
          padding: "1rem 1.5rem",
          borderRadius: "12px",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          zIndex: 1000,
          animation: "fadeIn 0.3s ease-out"
        }}>
          <CheckCircle2 size={20} />
          <div>
            <p style={{ fontWeight: 700, fontSize: "0.875rem" }}>Sucesso!</p>
            <p style={{ fontSize: "0.75rem" }}>3 novas notas fiscais foram processadas e adicionadas.</p>
          </div>
        </div>
      )}

      {/* Financial Summary */}
      <div className="grid grid-cols-5" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: "2rem" }}>
        <div className="card">
          <div className="metric-label"><Wallet size={16} /> Saldo em Caixa</div>
          <div className="metric-value">R$ 145.620,00</div>
          <p style={{ fontSize: "0.75rem", color: "#059669", marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <ArrowUpCircle size={12} /> +R$ 12k este mês
          </p>
        </div>
        <div className="card">
          <div className="metric-label" style={{ color: "#059669" }}><ArrowUpCircle size={16} /> Total a Receber</div>
          <div className="metric-value" style={{ color: "#059669" }}>R$ 42.800,00</div>
          <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.5rem" }}>12 faturas pendentes</p>
        </div>
        <div className="card">
          <div className="metric-label" style={{ color: "#dc2626" }}><ArrowDownCircle size={16} /> Total a Pagar</div>
          <div className="metric-value" style={{ color: "#dc2626" }}>R$ 18.250,00</div>
          <p style={{ fontSize: "0.75rem", color: "#dc2626", marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <AlertCircle size={12} /> R$ 2.400,00 em atraso
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            {["all", "receivable", "payable"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ 
                  background: "transparent", 
                  border: "none", 
                  padding: "0.25rem 0.5rem", 
                  fontSize: "0.875rem", 
                  fontWeight: activeTab === tab ? 600 : 500,
                  color: activeTab === tab ? "var(--primary)" : "var(--text-muted)",
                  borderBottom: activeTab === tab ? "2px solid var(--primary)" : "2px solid transparent",
                  transition: "var(--transition)"
                }}
              >
                {tab === "all" ? "Todos" : tab === "receivable" ? "A Receber" : "A Pagar"}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input type="text" placeholder="Buscar transação..." style={{ paddingLeft: "2.5rem", width: "240px" }} />
            </div>
            <button className="card" style={{ padding: "0.5rem", display: "flex", alignItems: "center" }}><Filter size={18} /></button>
            <button className="card" style={{ padding: "0.5rem", display: "flex", alignItems: "center" }}><Download size={18} /></button>
          </div>
        </div>
        
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Data</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Valor</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.filter(t => activeTab === "all" || t.type === activeTab).map((t) => (
                <tr key={t.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ 
                        background: t.type === "receivable" ? "#d1fae5" : "#fee2e2", 
                        color: t.type === "receivable" ? "#059669" : "#dc2626",
                        padding: "0.5rem",
                        borderRadius: "8px"
                      }}>
                        {t.type === "receivable" ? <ArrowUpCircle size={18} /> : <ArrowDownCircle size={18} />}
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, color: "var(--text-main)" }}>{t.description}</p>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>ID: #FIN-{t.id}0293</p>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge" style={{ background: "#f1f5f9", color: "#475569" }}>{t.category}</span></td>
                  <td style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{new Date(t.date).toLocaleDateString("pt-BR")}</td>
                  <td>
                    <span className="badge" style={{ 
                      background: t.status === "pago" ? "var(--success-light)" : t.status === "atrasado" ? "var(--danger-light)" : "var(--warning-light)",
                      color: t.status === "pago" ? "var(--success)" : t.status === "atrasado" ? "var(--danger)" : "var(--warning)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      width: "fit-content"
                    }}>
                      {t.status === "pago" ? <CheckCircle2 size={12} /> : t.status === "atrasado" ? <AlertCircle size={12} /> : <Clock size={12} />}
                      {t.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ textAlign: "right", fontWeight: 700, color: t.type === "receivable" ? "#059669" : "#1e293b" }}>
                    {t.type === "receivable" ? "+" : "-"}{formatCurrency(t.amount)}
                  </td>
                  <td>
                    <button style={{ background: "transparent", border: "none", color: "#94a3b8" }}><Plus size={18} style={{ transform: "rotate(45deg)" }} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ padding: "1.25rem", borderTop: "1px solid var(--border-light)", display: "flex", justifyContent: "center" }}>
          <button style={{ background: "transparent", border: "none", color: "var(--primary)", fontWeight: 600, fontSize: "0.875rem" }}>Ver Todas as Transações</button>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: "2rem" }}>
        <div className="card">
          <h2>Próximos Vencimentos</h2>
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { label: "Internet Fibra", date: "10/05", value: 199.90 },
              { label: "Seguro Predial", date: "12/05", value: 850.00 },
              { label: "Saneamento", date: "15/05", value: 320.00 },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", background: "#f8fafc", borderRadius: "8px" }}>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600 }}>{item.label}</p>
                  <p style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Vence em {item.date}</p>
                </div>
                <span style={{ fontWeight: 600 }}>{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <h2>Notas Fiscais para Processar</h2>
          <div style={{ 
            marginTop: "1rem", 
            border: "2px dashed var(--border-light)", 
            borderRadius: "12px", 
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            textAlign: "center"
          }}>
            <div style={{ background: "var(--primary-light-alpha)", color: "var(--primary)", padding: "1rem", borderRadius: "50%" }}>
              <FileText size={32} />
            </div>
            <div>
              <p style={{ fontWeight: 600 }}>Arraste suas notas aqui</p>
              <p style={{ fontSize: "0.75rem", color: "#64748b" }}>Suporta PDF, JPG e PNG (extração automática via IA)</p>
            </div>
            <button className="card" onClick={handleProcessNFs} disabled={isProcessing} style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>
              {isProcessing ? "Processando..." : "Selecionar Arquivos"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
