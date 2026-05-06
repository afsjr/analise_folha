"use client";

import { 
  GraduationCap, 
  TrendingUp, 
  HeartHandshake, 
  Wallet, 
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Calendar
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

const QUICK_STATS = [
  { label: "Matrículas 2026", value: "1,240", change: "+12%", positive: true, icon: GraduationCap, color: "#2563eb" },
  { label: "Faturamento Mensal", value: "R$ 420k", change: "+5.4%", positive: true, icon: Wallet, color: "#059669" },
  { label: "Leads Ativos", value: "85", change: "-2%", positive: false, icon: TrendingUp, color: "#d97706" },
  { label: "NPS (Pais/Alunos)", value: "8.4", change: "+0.2", positive: true, icon: HeartHandshake, color: "#7c3aed" },
];

const ENROLLMENT_DATA = [
  { name: "Jan", atual: 400, meta: 380 },
  { name: "Fev", atual: 600, meta: 550 },
  { name: "Mar", atual: 800, meta: 750 },
  { name: "Abr", atual: 1000, meta: 950 },
  { name: "Mai", atual: 1240, meta: 1100 },
];

const REVENUE_DATA = [
  { name: "Sem 1", valor: 85000 },
  { name: "Sem 2", valor: 120000 },
  { name: "Sem 3", valor: 95000 },
  { name: "Sem 4", valor: 110000 },
];

export default function GlobalDashboard() {
  return (
    <main className="container animate-fade-in">
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p className="text-sm font-medium" style={{ color: "#64748b", marginBottom: "0.25rem" }}>Visão Global</p>
          <h1>Olá, Gestor</h1>
          <p className="text-sm text-muted">Aqui está o resumo da sua escola hoje.</p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button className="card" style={{ padding: "0.5rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bell size={20} />
          </button>
          <div className="card" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem" }}>
            <Calendar size={18} />
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>6 de Maio, 2026</span>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-5" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: "2rem" }}>
        {QUICK_STATS.map((stat, i) => (
          <div key={i} className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ background: `${stat.color}15`, color: stat.color, padding: "0.5rem", borderRadius: "8px" }}>
                <stat.icon size={24} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: stat.positive ? "#059669" : "#dc2626", fontSize: "0.75rem", fontWeight: 600 }}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div>
              <p style={{ fontSize: "0.875rem", color: "#64748b", fontWeight: 500 }}>{stat.label}</p>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "0.25rem" }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", marginBottom: "2rem" }}>
        {/* Enrollment Chart */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2>Evolução de Matrículas</h2>
            <select style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}>
              <option>Anual</option>
              <option>Semestral</option>
            </select>
          </div>
          <div style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ENROLLMENT_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <Tooltip 
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  cursor={{ fill: "#f8fafc" }}
                />
                <Bar dataKey="meta" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="atual" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2>Receita Semanal (Abril)</h2>
            <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 600 }}>Meta: R$ 450k</span>
          </div>
          <div style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} tickFormatter={(v) => `R$${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                />
                <Line type="monotone" dataKey="valor" stroke="#059669" strokeWidth={3} dot={{ r: 6, fill: "#059669", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
        {/* Recent Alerts */}
        <div className="card">
          <h2 style={{ marginBottom: "1rem" }}>Alertas Recentes</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { type: "danger", msg: "15 mensalidades em atraso (> 30 dias)", time: "2h atrás" },
              { type: "warning", msg: "Queda na média de notas - 3º Ano B", time: "5h atrás" },
              { type: "success", msg: "5 novos leads qualificados via site", time: "Ontem" },
            ].map((alert, i) => (
              <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "0.75rem", background: "#f8fafc", borderRadius: "8px" }}>
                <div style={{ width: "4px", background: alert.type === "danger" ? "#dc2626" : alert.type === "warning" ? "#d97706" : "#059669", borderRadius: "2px" }} />
                <div>
                  <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "#1e293b" }}>{alert.msg}</p>
                  <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Overview */}
        <div className="card">
          <h2 style={{ marginBottom: "1rem" }}>Status Acadêmico</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Frequência Média</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>94.2%</span>
              </div>
              <div style={{ height: "6px", background: "#e2e8f0", borderRadius: "3px" }}>
                <div style={{ height: "100%", width: "94.2%", background: "#2563eb", borderRadius: "3px" }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Média Geral</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>7.8 / 10</span>
              </div>
              <div style={{ height: "6px", background: "#e2e8f0", borderRadius: "3px" }}>
                <div style={{ height: "100%", width: "78%", background: "#7c3aed", borderRadius: "3px" }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Aproveitamento Curricular</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>65%</span>
              </div>
              <div style={{ height: "6px", background: "#e2e8f0", borderRadius: "3px" }}>
                <div style={{ height: "100%", width: "65%", background: "#059669", borderRadius: "3px" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Commercial Pipeline */}
        <div className="card">
          <h2 style={{ marginBottom: "1rem" }}>Pipeline Comercial</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { label: "Novos Leads", value: 45, color: "#2563eb" },
              { label: "Visitas Agendadas", value: 12, color: "#7c3aed" },
              { label: "Matrículas em Análise", value: 8, color: "#d97706" },
              { label: "Convertidos (Mês)", value: 20, color: "#059669" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.5rem 0.75rem", background: "#f8fafc", borderRadius: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color }} />
                  <span style={{ fontSize: "0.8125rem", color: "#475569" }}>{item.label}</span>
                </div>
                <span style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.875rem" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
