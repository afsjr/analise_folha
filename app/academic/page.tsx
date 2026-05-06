"use client";

import { 
  BookOpen, 
  Calendar, 
  Users, 
  FileCheck, 
  Search, 
  ClipboardList,
  UserCheck,
  ArrowUpRight
} from "lucide-react";
import { ClassList } from "@/components/academic/ClassList";

const CLASSES = [
  { id: 1, name: "1º Ano A - Fundamental I", students: 28, average: 8.2, attendance: "96%", teacher: "Profa. Eliana" },
  { id: 2, name: "3º Ano B - Fundamental II", students: 32, average: 7.5, attendance: "92%", teacher: "Prof. Marcos" },
  { id: 3, name: "2º Ano Médio - Regular", students: 25, average: 6.8, attendance: "88%", teacher: "Profa. Sandra" },
  { id: 4, name: "Pré-Escolar II - Tarde", students: 20, average: 9.0, attendance: "98%", teacher: "Profa. Carla" },
];

const METRICS = [
  { label: "Total de Alunos", value: "1,240", icon: Users, color: "var(--primary)", sub: "Ativos: 1,225 | Trancados: 15" },
  { label: "Frequência Média", value: "94.2%", icon: UserCheck, color: "var(--success)", sub: "Dentro da meta (90%)" },
  { label: "Rendimento Geral", value: "7.8", icon: FileCheck, color: "var(--warning)", sub: "-0.2 vs Bimestre 1" },
  { label: "Disciplinas", value: "18", icon: BookOpen, color: "var(--primary)", sub: "Carga: 3.200h" },
];

export default function AcademicDashboard() {
  return (
    <main className="container animate-fade-in">
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p className="text-sm font-medium" style={{ color: "#64748b", marginBottom: "0.25rem" }}>Gestão Pedagógica</p>
          <h1>Acadêmico</h1>
          <p className="text-sm text-muted">Acompanhamento de turmas e desempenho escolar.</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="card" style={{ padding: "0.6rem 1.25rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }}>
            <Calendar size={18} color="var(--primary)" />
            Horários
          </button>
          <button className="card primary" style={{ padding: "0.6rem 1.25rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }}>
            <ClipboardList size={18} />
            Lançar Notas
          </button>
        </div>
      </header>

      {/* Academic Metrics */}
      <div className="grid grid-cols-5" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: "2rem" }}>
        {METRICS.map((m, i) => (
          <div key={i} className="card">
            <div className="metric-label" style={{ color: "#64748b" }}><m.icon size={16} style={{ color: m.color }} /> {m.label}</div>
            <div className="metric-value" style={{ marginTop: "0.5rem", color: "var(--text-main)" }}>{m.value}</div>
            <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.5rem", fontWeight: 500 }}>{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.6fr 1fr", gap: "2rem" }}>
        <ClassList classes={CLASSES} />

        {/* Academic Calendar / Events */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ color: "var(--text-secondary)" }}>Calendário & Prazos</h2>
            <button className="card" style={{ padding: "0.4rem 0.8rem", fontSize: "0.75rem" }}>Ver Agenda</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { title: "Entrega de Notas - 1º Bimestre", date: "15 Mai", type: "deadline", urgency: "high" },
              { title: "Conselho de Classe (EF II)", date: "18 Mai", type: "meeting", urgency: "medium" },
              { title: "Início do 2º Bimestre", date: "20 Mai", type: "event", urgency: "low" },
              { title: "Reunião Pedagógica Mensal", date: "25 Mai", type: "meeting", urgency: "medium" },
            ].map((event, i) => (
              <div key={i} style={{ 
                display: "flex", 
                gap: "1.25rem", 
                padding: "1rem", 
                background: "#f8fafc", 
                borderRadius: "14px", 
                border: event.urgency === "high" ? "1px solid var(--danger-light)" : "1px solid #f1f5f9",
                transition: "var(--transition)",
                cursor: "pointer"
              }} className="nav-item">
                <div style={{ 
                  background: "white", 
                  padding: "0.5rem", 
                  borderRadius: "10px", 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "55px",
                  boxShadow: "var(--shadow-sm)"
                }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "var(--primary)", textTransform: "uppercase" }}>{event.date.split(" ")[1]}</span>
                  <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-main)" }}>{event.date.split(" ")[0]}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-main)", marginBottom: "0.25rem" }}>{event.title}</p>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <span className="badge" style={{ 
                      fontSize: "0.6rem", 
                      background: event.urgency === "high" ? "var(--danger-light)" : "#e2e8f0", 
                      color: event.urgency === "high" ? "var(--danger)" : "#64748b" 
                    }}>
                      {event.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={16} color="#94a3b8" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
