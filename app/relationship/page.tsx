"use client";

import { 
  HeartHandshake, 
  MessageSquare, 
  Smile, 
  Frown, 
  Meh, 
  Users, 
  Calendar, 
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

const NPS_DATA = [
  { name: "Promotores", value: 65, color: "#059669" },
  { name: "Passivos", value: 25, color: "#d97706" },
  { name: "Detratores", value: 10, color: "#dc2626" },
];

const FEEDBACKS = [
  { id: 1, author: "Mariana Souza", role: "Mãe (3º Ano)", content: "Excelente atendimento na secretaria hoje. A resolução foi muito rápida.", mood: "happy", date: "Há 10 min" },
  { id: 2, author: "José Roberto", role: "Pai (1º Médio)", content: "O novo sistema de notas está um pouco confuso para acessar via celular.", mood: "neutral", date: "Há 1h" },
  { id: 3, author: "Ana Paula", role: "Mãe (Fund I)", content: "A atividade de campo do último sábado foi maravilhosa. As crianças adoraram!", mood: "happy", date: "Há 3h" },
];

export default function RelationshipDashboard() {
  return (
    <main className="container animate-fade-in">
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p className="text-sm font-medium" style={{ color: "#64748b", marginBottom: "0.25rem" }}>Comunidade Escolar</p>
          <h1>Relacionamento</h1>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="card" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <MessageSquare size={18} />
            Nova Campanha SMS/Email
          </button>
          <button className="card primary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Smile size={18} />
            Enviar Pesquisa NPS
          </button>
        </div>
      </header>

      {/* Relationship Metrics */}
      <div className="grid grid-cols-5" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: "2rem" }}>
        <div className="card">
          <div className="metric-label"><Star size={16} color="#eab308" /> NPS Score</div>
          <div className="metric-value">72</div>
          <p style={{ fontSize: "0.75rem", color: "#059669", marginTop: "0.5rem" }}>Zona de Qualidade (Acima de 50)</p>
        </div>
        <div className="card">
          <div className="metric-label"><MessageSquare size={16} /> Canais de Contato</div>
          <div className="metric-value">85%</div>
          <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.5rem" }}>Preferência: WhatsApp</p>
        </div>
        <div className="card">
          <div className="metric-label"><Users size={16} /> Engajamento Pais</div>
          <div className="metric-value">68%</div>
          <p style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.5rem" }}>Participação em reuniões/eventos</p>
        </div>
        <div className="card">
          <div className="metric-label"><Smile size={16} /> Satisfação Geral</div>
          <div className="metric-value">8.4 / 10</div>
          <p style={{ fontSize: "0.75rem", color: "#059669", marginTop: "0.5rem" }}>+0.3 em relação ao semestre anterior</p>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.2fr 1.8fr", gap: "2rem" }}>
        {/* NPS Chart */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h2>Distribuição NPS</h2>
            <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Últimos 30 dias</span>
          </div>
          <div style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={NPS_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} width={80} />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                  {NPS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: "1rem" }}>
            <div style={{ textAlign: "center" }}>
              <Smile color="#059669" size={24} />
              <p style={{ fontSize: "0.7rem", fontWeight: 700, marginTop: "0.25rem" }}>65%</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <Meh color="#d97706" size={24} />
              <p style={{ fontSize: "0.7rem", fontWeight: 700, marginTop: "0.25rem" }}>25%</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <Frown color="#dc2626" size={24} />
              <p style={{ fontSize: "0.7rem", fontWeight: 700, marginTop: "0.25rem" }}>10%</p>
            </div>
          </div>
        </div>

        {/* Recent Feedback Feed */}
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Feedbacks Recentes</h2>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="card" style={{ padding: "0.4rem", borderRadius: "6px" }}><Search size={14} /></button>
              <button className="card" style={{ padding: "0.4rem", borderRadius: "6px" }}><Filter size={14} /></button>
            </div>
          </div>
          
          <div style={{ padding: "0.5rem" }}>
            {FEEDBACKS.map((f) => (
              <div key={f.id} style={{ padding: "1.25rem", borderBottom: "1px solid #f1f5f9", display: "flex", gap: "1rem" }}>
                <div style={{ 
                  width: "40px", 
                  height: "40px", 
                  borderRadius: "50%", 
                  background: "#e2e8f0", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#64748b"
                }}>
                  {f.author[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>{f.author}</span>
                      <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", color: "#94a3b8" }}>• {f.role}</span>
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{f.date}</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "0.75rem" }}>{f.content}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button style={{ 
                        background: "#f1f5f9", 
                        border: "none", 
                        borderRadius: "12px", 
                        padding: "0.25rem 0.75rem", 
                        fontSize: "0.7rem", 
                        fontWeight: 600, 
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem"
                      }}>
                        <Send size={10} /> Responder
                      </button>
                    </div>
                    {f.mood === "happy" ? <Smile size={18} color="#059669" /> : f.mood === "neutral" ? <Meh size={18} color="#d97706" /> : <Frown size={18} color="#dc2626" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ padding: "1.25rem", borderTop: "1px solid var(--border-light)", textAlign: "center" }}>
            <button style={{ background: "transparent", border: "none", color: "var(--primary)", fontWeight: 600, fontSize: "0.875rem" }}>Ver Todos os Feedbacks</button>
          </div>
        </div>
      </div>
    </main>
  );
}
