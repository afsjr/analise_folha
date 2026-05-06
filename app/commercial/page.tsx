"use client";

import { 
  TrendingUp, 
  Users, 
  PhoneCall, 
  Mail, 
  Calendar, 
  Plus, 
  Search, 
  MoreHorizontal,
  ArrowRight,
  Target,
  BarChart3
} from "lucide-react";
import { 
  PieChart as RechartsPie, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  Legend
} from "recharts";

const PIPELINE = [
  { id: 1, name: "Novos Leads", count: 45, color: "#2563eb", leads: [
    { name: "Carlos Antunes", source: "Google Ads", interest: "Fundamental I", date: "Hoje" },
    { name: "Luciana Costa", source: "Indicação", interest: "Ensino Médio", date: "Ontem" },
  ]},
  { id: 2, name: "Em Atendimento", count: 18, color: "#7c3aed", leads: [
    { name: "Ricardo Mendes", source: "Facebook", interest: "Educação Infantil", date: "2 dias" },
  ]},
  { id: 3, name: "Visita Agendada", count: 12, color: "#d97706", leads: [
    { name: "Fabiana Lima", source: "Site", interest: "Fundamental II", date: "10/05" },
  ]},
  { id: 4, name: "Matrícula Iniciada", count: 8, color: "#059669", leads: [
    { name: "Marcos Paulo", source: "Google Ads", interest: "Ensino Médio", date: "05/05" },
  ]},
];

const SOURCE_DATA = [
  { name: "Google Ads", value: 40, color: "#2563eb" },
  { name: "Facebook/IG", value: 25, color: "#7c3aed" },
  { name: "Indicação", value: 20, color: "#059669" },
  { name: "Site (Orgânico)", value: 15, color: "#d97706" },
];

export default function CommercialDashboard() {
  return (
    <main className="container animate-fade-in">
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p className="text-sm font-medium" style={{ color: "#64748b", marginBottom: "0.25rem" }}>Comercial & Vendas</p>
          <h1>CRM Escolar</h1>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="card" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <BarChart3 size={18} />
            Relatório de Conversão
          </button>
          <button className="card primary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Plus size={18} />
            Novo Lead
          </button>
        </div>
      </header>

      {/* Commercial Summary */}
      <div className="grid grid-cols-5" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: "2rem" }}>
        <div className="card">
          <div className="metric-label"><Target size={16} /> Meta de Matrículas</div>
          <div className="metric-value">124 / 150</div>
          <div style={{ height: "6px", background: "#e2e8f0", borderRadius: "3px", marginTop: "1rem" }}>
            <div style={{ height: "100%", width: "82%", background: "#2563eb", borderRadius: "3px" }} />
          </div>
          <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.5rem" }}>82.6% da meta atingida</p>
        </div>
        <div className="card">
          <div className="metric-label"><TrendingUp size={16} /> Taxa de Conversão</div>
          <div className="metric-value">24.5%</div>
          <p style={{ fontSize: "0.75rem", color: "#059669", marginTop: "0.5rem" }}>+2.1% em relação ao mês anterior</p>
        </div>
        <div className="card">
          <div className="metric-label"><Users size={16} /> Leads Ativos</div>
          <div className="metric-value">83</div>
          <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.5rem" }}>Aguardando contato: 12</p>
        </div>
        <div className="card">
          <div className="metric-label"><PhoneCall size={16} /> Agendamentos (Semana)</div>
          <div className="metric-value">15</div>
          <p style={{ fontSize: "0.75rem", color: "#d97706", marginTop: "0.5rem" }}>3 para hoje</p>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "2.2fr 0.8fr", marginBottom: "2rem" }}>
        {/* Pipeline Board */}
        <div className="grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
          {PIPELINE.map((column) => (
            <div key={column.id} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem" }}>
                <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                  {column.name.toUpperCase()}
                  <span style={{ marginLeft: "0.5rem", color: "var(--text-muted)", fontWeight: 500 }}>({column.count})</span>
                </h3>
                <div style={{ width: "100%", height: "3px", background: column.color, position: "absolute", bottom: "-4px", left: 0, borderRadius: "2px" }} />
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {column.leads.map((lead, i) => (
                  <div key={i} className="card" style={{ padding: "1rem", cursor: "pointer", transition: "var(--transition)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span className="badge" style={{ background: "#f1f5f9", color: "#64748b", fontSize: "0.65rem" }}>{lead.source}</span>
                      <MoreHorizontal size={14} color="#94a3b8" />
                    </div>
                    <p style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.25rem" }}>{lead.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>{lead.interest}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "0.75rem" }}>
                      <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{lead.date}</span>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button style={{ background: "none", border: "none", color: "var(--primary)" }}><PhoneCall size={14} /></button>
                        <button style={{ background: "none", border: "none", color: "var(--primary)" }}><Mail size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  className="card" 
                  style={{ 
                    borderStyle: "dashed", 
                    background: "transparent", 
                    color: "var(--text-muted)", 
                    padding: "0.5rem", 
                    fontSize: "0.75rem", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    gap: "0.5rem" 
                  }}
                >
                  <Plus size={14} /> Novo Lead
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Source Analysis */}
        <div className="card">
          <h2>Origem dos Leads</h2>
          <div style={{ height: "240px", width: "100%", marginTop: "1rem" }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie data={SOURCE_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {SOURCE_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <RechartsTooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
          
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <h3 style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8" }}>ESTATÍSTICAS DO MÊS</h3>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: "0.8125rem" }}>Custo por Lead (CPL)</span>
              <span style={{ fontWeight: 600, fontSize: "0.8125rem" }}>R$ 42,50</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: "0.8125rem" }}>CAC (Custo Aquisição)</span>
              <span style={{ fontWeight: 600, fontSize: "0.8125rem" }}>R$ 175,00</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
