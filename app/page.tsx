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
import { useState } from "react";
import { NotificationSidebar } from "@/components/NotificationSidebar";

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
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <main className="container animate-fade-in">
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p className="text-sm font-medium" style={{ color: "#64748b", marginBottom: "0.25rem" }}>Visão Global</p>
          <h1>Olá, Gestor</h1>
          <p className="text-sm text-muted">Aqui está o resumo da sua escola hoje.</p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button 
            className="card" 
            onClick={() => setShowNotifications(true)}
            style={{ 
              padding: "0.5rem", 
              borderRadius: "50%", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              position: "relative"
            }}
          >
            <Bell size={20} />
            <div style={{ position: "absolute", top: "2px", right: "2px", width: "10px", height: "10px", borderRadius: "50%", background: "var(--danger)", border: "2px solid #fff" }} />
          </button>
          <div className="card" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem" }}>
            <Calendar size={18} />
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>6 de Maio, 2026</span>
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
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: stat.positive ? "#059669" : "#dc2626", fontSize: "0.75rem", fontWeight: 700 }}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div>
              <p style={{ fontSize: "0.875rem", color: "#64748b", fontWeight: 500 }}>{stat.label}</p>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginTop: "0.25rem", color: "var(--text-main)" }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", marginBottom: "2rem" }}>
        {/* Enrollment Chart */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ color: "var(--text-secondary)" }}>Evolução de Matrículas</h2>
            <select style={{ fontSize: "0.75rem", padding: "0.4rem 0.6rem" }}>
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
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "var(--shadow-lg)" }}
                  cursor={{ fill: "#f8fafc" }}
                />
                <Bar dataKey="meta" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="atual" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ color: "var(--text-secondary)" }}>Receita Semanal (Abril)</h2>
            <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 700 }}>Meta: R$ 450k</span>
          </div>
          <div style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} tickFormatter={(v) => `R$${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "var(--shadow-lg)" }}
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
          <h2 style={{ marginBottom: "1rem", color: "var(--text-secondary)" }}>Alertas Recentes</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { type: "danger", msg: "15 mensalidades em atraso (> 30 dias)", time: "2h atrás" },
              { type: "warning", msg: "Queda na média de notas - 3º Ano B", time: "5h atrás" },
              { type: "success", msg: "5 novos leads qualificados via site", time: "Ontem" },
            ].map((alert, i) => (
              <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "1rem", background: "#f8fafc", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                <div style={{ width: "4px", background: alert.type === "danger" ? "var(--danger)" : alert.type === "warning" ? "var(--warning)" : "var(--success)", borderRadius: "2px" }} />
                <div>
                  <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-main)" }}>{alert.msg}</p>
                  <span style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 500 }}>{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Overview */}
        <div className="card">
          <h2 style={{ marginBottom: "1rem", color: "var(--text-secondary)" }}>Status Acadêmico</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 500 }}>Frequência Média</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>94.2%</span>
              </div>
              <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "4px" }}>
                <div style={{ height: "100%", width: "94.2%", background: "var(--primary)", borderRadius: "4px" }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 500 }}>Média Geral</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>7.8 / 10</span>
              </div>
              <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "4px" }}>
                <div style={{ height: "100%", width: "78%", background: "#7c3aed", borderRadius: "4px" }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 500 }}>Aproveitamento Curricular</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>65%</span>
              </div>
              <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "4px" }}>
                <div style={{ height: "100%", width: "65%", background: "var(--success)", borderRadius: "4px" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Commercial Pipeline */}
        <div className="card">
          <h2 style={{ marginBottom: "1rem", color: "var(--text-secondary)" }}>Pipeline Comercial</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { label: "Novos Leads", value: 45, color: "#2563eb" },
              { label: "Visitas Agendadas", value: 12, color: "#7c3aed" },
              { label: "Matrículas em Análise", value: 8, color: "#d97706" },
              { label: "Convertidos (Mês)", value: 20, color: "#059669" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "10px", height: "100%", background: item.color, position: "absolute", left: 0, top: 0, borderRadius: "12px 0 0 12px" }} />
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color }} />
                  <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", fontWeight: 500 }}>{item.label}</span>
                </div>
                <span style={{ fontWeight: 800, color: "var(--text-main)", fontSize: "0.875rem" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NotificationSidebar isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </main>
  );
}
