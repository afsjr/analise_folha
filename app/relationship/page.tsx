"use client";

import { 
  HeartHandshake, 
  MessageSquare, 
  Smile, 
  Frown, 
  Meh, 
  Users, 
  Star,
  Send,
  MoreHorizontal,
  Search,
  Filter
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { useState } from "react";

const NPS_DATA = [
  { name: "Promotores", value: 65, color: "#059669" },
  { name: "Passivos", value: 25, color: "#d97706" },
  { name: "Detratores", value: 10, color: "#dc2626" },
];

const FEEDBACKS = [
  { id: 1, author: "Mariana Souza", role: "Mãe (3º Ano)", content: "Excelente atendimento na secretaria hoje. A resolução foi muito rápida.", mood: "happy", date: "Há 10 min", initials: "MS" },
  { id: 2, author: "José Roberto", role: "Pai (1º Médio)", content: "O novo sistema de notas está um pouco confuso para acessar via celular.", mood: "neutral", date: "Há 1h", initials: "JR" },
  { id: 3, author: "Ana Paula", role: "Mãe (Fund I)", content: "A atividade de campo do último sábado foi maravilhosa. As crianças adoraram!", mood: "happy", date: "Há 3h", initials: "AP" },
];

export default function RelationshipDashboard() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <main className="container animate-fade-in">
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p className="text-sm font-medium" style={{ color: "#64748b", marginBottom: "0.25rem" }}>Comunidade Escolar</p>
          <h1>Relacionamento</h1>
          <p className="text-sm text-muted">Acompanhamento do clima e satisfação da comunidade.</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="card" style={{ padding: "0.6rem 1.25rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }}>
            <MessageSquare size={18} color="var(--primary)" />
            Campanha SMS/Email
          </button>
          <button className="card primary" style={{ padding: "0.6rem 1.25rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }}>
            <Smile size={18} />
            Enviar NPS
          </button>
        </div>
      </header>

      {/* Relationship Metrics */}
      <div className="grid grid-cols-5" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: "2rem" }}>
        <div className="card">
          <div className="metric-label" style={{ color: "#64748b" }}><Star size={16} color="#eab308" /> NPS Score</div>
          <div className="metric-value" style={{ marginTop: "0.5rem", color: "var(--text-main)" }}>72</div>
          <p style={{ fontSize: "0.75rem", color: "#059669", marginTop: "0.5rem", fontWeight: 600 }}>Zona de Qualidade (Acima de 50)</p>
        </div>
        <div className="card">
          <div className="metric-label" style={{ color: "#64748b" }}><MessageSquare size={16} color="var(--primary)" /> Canais de Contato</div>
          <div className="metric-value" style={{ marginTop: "0.5rem", color: "var(--text-main)" }}>85%</div>
          <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.5rem", fontWeight: 500 }}>Preferência: WhatsApp</p>
        </div>
        <div className="card">
          <div className="metric-label" style={{ color: "#64748b" }}><Users size={16} color="var(--primary)" /> Engajamento</div>
          <div className="metric-value" style={{ marginTop: "0.5rem", color: "var(--text-main)" }}>68%</div>
          <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.5rem", fontWeight: 500 }}>Participação em reuniões</p>
        </div>
        <div className="card">
          <div className="metric-label" style={{ color: "#64748b" }}><Smile size={16} color="var(--success)" /> Satisfação</div>
          <div className="metric-value" style={{ marginTop: "0.5rem", color: "var(--text-main)" }}>8.4 / 10</div>
          <p style={{ fontSize: "0.75rem", color: "#059669", marginTop: "0.5rem", fontWeight: 600 }}>+0.3 vs semestre anterior</p>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1.6fr", gap: "2rem" }}>
        {/* NPS Chart */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2 style={{ color: "var(--text-secondary)" }}>Distribuição NPS</h2>
            <span style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 600 }}>Últimos 30 dias</span>
          </div>
          <div style={{ height: "260px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={NPS_DATA} layout="vertical" margin={{ left: 10, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 500, fill: "#64748b" }} width={80} />
                <Tooltip 
                  cursor={{ fill: "transparent" }} 
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "var(--shadow-md)" }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={25}>
                  {NPS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: "1.5rem", borderTop: "1px solid #f1f5f9", paddingTop: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <Smile color="#059669" size={24} />
              <p style={{ fontSize: "0.75rem", fontWeight: 800, marginTop: "0.25rem", color: "#059669" }}>65%</p>
              <p style={{ fontSize: "0.6rem", color: "#94a3b8", textTransform: "uppercase" }}>Promotores</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <Meh color="#d97706" size={24} />
              <p style={{ fontSize: "0.75rem", fontWeight: 800, marginTop: "0.25rem", color: "#d97706" }}>25%</p>
              <p style={{ fontSize: "0.6rem", color: "#94a3b8", textTransform: "uppercase" }}>Passivos</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <Frown color="#dc2626" size={24} />
              <p style={{ fontSize: "0.75rem", fontWeight: 800, marginTop: "0.25rem", color: "#dc2626" }}>10%</p>
              <p style={{ fontSize: "0.6rem", color: "#94a3b8", textTransform: "uppercase" }}>Detratores</p>
            </div>
          </div>
        </div>

        {/* Recent Feedback Feed */}
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ color: "var(--text-secondary)" }}>Feedbacks Recentes</h2>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <div style={{ position: "relative" }}>
                <Search size={14} style={{ position: "absolute", left: "0.6rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                <input type="text" placeholder="Buscar..." style={{ padding: "0.4rem 0.6rem 0.4rem 2rem", fontSize: "0.75rem", width: "140px" }} />
              </div>
              <button className="card" style={{ padding: "0.4rem", borderRadius: "8px" }}><Filter size={14} /></button>
            </div>
          </div>
          
          <div style={{ padding: "0.5rem" }}>
            {FEEDBACKS.map((f) => (
              <div key={f.id} style={{ 
                padding: "1.25rem", 
                borderBottom: "1px solid #f1f5f9", 
                display: "flex", 
                gap: "1.25rem",
                borderRadius: "12px",
                transition: "var(--transition)"
              }} className="nav-item">
                <div style={{ 
                  width: "45px", 
                  height: "45px", 
                  borderRadius: "12px", 
                  background: "var(--primary-light-alpha)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "var(--primary)"
                }}>
                  {f.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-main)" }}>{f.author}</span>
                      <span style={{ marginLeft: "0.75rem", fontSize: "0.75rem", color: "#94a3b8", fontWeight: 500 }}>{f.role}</span>
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 500 }}>{f.date}</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>{f.content}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button style={{ 
                        background: "var(--primary-light-alpha)", 
                        border: "none", 
                        borderRadius: "8px", 
                        padding: "0.4rem 1rem", 
                        fontSize: "0.75rem", 
                        fontWeight: 700, 
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem"
                      }}>
                        <Send size={12} /> Responder
                      </button>
                    </div>
                    {f.mood === "happy" ? <Smile size={20} color="#059669" /> : f.mood === "neutral" ? <Meh size={20} color="#d97706" /> : <Frown size={20} color="#dc2626" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ padding: "1.25rem", borderTop: "1px solid var(--border-light)", textAlign: "center" }}>
            <button style={{ background: "transparent", border: "none", color: "var(--primary)", fontWeight: 700, fontSize: "0.875rem" }}>Ver Todo o Histórico</button>
          </div>
        </div>
      </div>
    </main>
  );
}
