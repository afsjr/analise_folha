"use client";

import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Users, 
  FileCheck, 
  Search, 
  Filter, 
  ArrowUpRight,
  ClipboardList,
  UserCheck,
  MoreVertical
} from "lucide-react";

const CLASSES = [
  { id: 1, name: "1º Ano A - Fundamental I", students: 28, average: 8.2, attendance: "96%", teacher: "Profa. Eliana" },
  { id: 2, name: "3º Ano B - Fundamental II", students: 32, average: 7.5, attendance: "92%", teacher: "Prof. Marcos" },
  { id: 3, name: "2º Ano Médio - Regular", students: 25, average: 6.8, attendance: "88%", teacher: "Profa. Sandra" },
  { id: 4, name: "Pré-Escolar II - Tarde", students: 20, average: 9.0, attendance: "98%", teacher: "Profa. Carla" },
];

export default function AcademicDashboard() {
  return (
    <main className="container animate-fade-in">
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p className="text-sm font-medium" style={{ color: "#64748b", marginBottom: "0.25rem" }}>Gestão Pedagógica</p>
          <h1>Acadêmico</h1>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="card" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Calendar size={18} />
            Horários
          </button>
          <button className="card primary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ClipboardList size={18} />
            Lançar Notas
          </button>
        </div>
      </header>

      {/* Academic Metrics */}
      <div className="grid grid-cols-5" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: "2rem" }}>
        <div className="card">
          <div className="metric-label"><Users size={16} /> Total de Alunos</div>
          <div className="metric-value">1,240</div>
          <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.5rem" }}>Ativos: 1,225 | Trancados: 15</p>
        </div>
        <div className="card">
          <div className="metric-label"><UserCheck size={16} /> Frequência Média</div>
          <div className="metric-value">94.2%</div>
          <p style={{ fontSize: "0.75rem", color: "#059669", marginTop: "0.5rem" }}>Dentro da meta (90%)</p>
        </div>
        <div className="card">
          <div className="metric-label"><FileCheck size={16} /> Rendimento Geral</div>
          <div className="metric-value">7.8</div>
          <p style={{ fontSize: "0.75rem", color: "#d97706", marginTop: "0.5rem" }}>-0.2 em relação ao Bimestre 1</p>
        </div>
        <div className="card">
          <div className="metric-label"><BookOpen size={16} /> Disciplinas</div>
          <div className="metric-value">18</div>
          <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.5rem" }}>Carga horária total: 3.200h</p>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Classes List */}
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Turmas Ativas</h2>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input type="text" placeholder="Buscar turma..." style={{ paddingLeft: "2.5rem", width: "180px", fontSize: "0.8rem" }} />
            </div>
          </div>
          
          <div style={{ padding: "0.5rem" }}>
            {CLASSES.map((cls) => (
              <div key={cls.id} style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between", 
                padding: "1rem", 
                borderBottom: "1px solid #f1f5f9",
                cursor: "pointer"
              }} className="nav-item">
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ background: "var(--primary-light-alpha)", color: "var(--primary)", padding: "0.75rem", borderRadius: "10px" }}>
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: "var(--text-main)" }}>{cls.name}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{cls.teacher} • {cls.students} alunos</p>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontWeight: 700, color: cls.average >= 7 ? "var(--success)" : "var(--danger)" }}>{cls.average}</p>
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Média</p>
                </div>
                <MoreVertical size={16} color="#94a3b8" />
              </div>
            ))}
          </div>
          
          <div style={{ padding: "1.25rem", borderTop: "1px solid var(--border-light)", textAlign: "center" }}>
            <button style={{ background: "transparent", border: "none", color: "var(--primary)", fontWeight: 600, fontSize: "0.875rem" }}>Ver Todas as Turmas</button>
          </div>
        </div>

        {/* Academic Calendar / Events */}
        <div className="card">
          <h2 style={{ marginBottom: "1.5rem" }}>Calendário & Prazos</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { title: "Entrega de Notas - 1º Bimestre", date: "15 Mai", type: "deadline", urgency: "high" },
              { title: "Conselho de Classe (EF II)", date: "18 Mai", type: "meeting", urgency: "medium" },
              { title: "Início do 2º Bimestre", date: "20 Mai", type: "event", urgency: "low" },
              { title: "Reunião Pedagógica Mensal", date: "25 Mai", type: "meeting", urgency: "medium" },
            ].map((event, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#f8fafc", borderRadius: "12px", border: event.urgency === "high" ? "1px solid #fee2e2" : "1px solid transparent" }}>
                <div style={{ 
                  background: "white", 
                  padding: "0.5rem", 
                  borderRadius: "8px", 
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "50px",
                  boxShadow: "var(--shadow-sm)"
                }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase" }}>{event.date.split(" ")[1]}</span>
                  <span style={{ fontSize: "1rem", fontWeight: 800 }}>{event.date.split(" ")[0]}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-main)" }}>{event.title}</p>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
                    <span className="badge" style={{ fontSize: "0.6rem", background: event.urgency === "high" ? "var(--danger-light)" : "#e2e8f0", color: event.urgency === "high" ? "var(--danger)" : "#64748b" }}>
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
