"use client";

import { GraduationCap, MoreVertical } from "lucide-react";

interface Class {
  id: number;
  name: string;
  students: number;
  average: number;
  attendance: string;
  teacher: string;
}

interface ClassListProps {
  classes: Class[];
}

export function ClassList({ classes }: ClassListProps) {
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ color: "var(--text-secondary)" }}>Turmas Ativas</h2>
        <button style={{ background: "transparent", border: "none", color: "var(--primary)", fontWeight: 600, fontSize: "0.8rem" }}>Ver Todas</button>
      </div>
      
      <div style={{ padding: "0.5rem" }}>
        {classes.map((cls) => (
          <div key={cls.id} style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            padding: "1.25rem", 
            borderBottom: "1px solid #f1f5f9",
            cursor: "pointer",
            borderRadius: "12px",
            transition: "var(--transition)"
          }} className="nav-item">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ background: "var(--primary-light-alpha)", color: "var(--primary)", padding: "0.75rem", borderRadius: "12px" }}>
                <GraduationCap size={20} />
              </div>
              <div>
                <p style={{ fontWeight: 700, color: "var(--text-main)", fontSize: "0.95rem" }}>{cls.name}</p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 }}>{cls.teacher} • {cls.students} alunos</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontWeight: 800, color: cls.average >= 7 ? "var(--success)" : "var(--danger)", fontSize: "1.1rem" }}>{cls.average}</p>
                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Média</p>
              </div>
              <div style={{ textAlign: "right", minWidth: "60px" }}>
                <p style={{ fontWeight: 700, color: "var(--text-main)", fontSize: "1rem" }}>{cls.attendance}</p>
                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>Freq.</p>
              </div>
              <button style={{ background: "transparent", border: "none", color: "#94a3b8" }}>
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
