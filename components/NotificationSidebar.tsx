"use client";

import { X, Bell, Info, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

interface Notification {
  id: number;
  type: "info" | "warning" | "success" | "danger";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 1, type: "danger", title: "Inadimplência", message: "15 mensalidades em atraso há mais de 30 dias.", time: "2h atrás", read: false },
  { id: 2, type: "warning", title: "Acadêmico", message: "Queda na média de notas do 3º Ano B.", time: "5h atrás", read: false },
  { id: 3, type: "success", title: "Comercial", message: "5 novos leads qualificados via site.", time: "Ontem", read: true },
  { id: 4, type: "info", title: "Sistema", message: "Backup automático da folha realizado com sucesso.", time: "Ontem", read: true },
];

export function NotificationSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{ justifyContent: "flex-end", background: "rgba(15, 23, 42, 0.3)" }}
    >
      <div 
        className="animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "380px",
          height: "100vh",
          background: "var(--bg-card)",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
          animation: "slideInRight 0.3s ease-out"
        }}
      >
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Bell size={20} color="var(--primary)" />
            <h3 style={{ fontWeight: 700, fontSize: "1.1rem" }}>Notificações</h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-muted)" }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {MOCK_NOTIFICATIONS.map((notif) => (
              <div 
                key={notif.id} 
                style={{ 
                  padding: "1rem", 
                  borderRadius: "12px", 
                  background: notif.read ? "transparent" : "var(--bg-main)",
                  border: "1px solid var(--border-light)",
                  position: "relative"
                }}
              >
                {!notif.read && (
                  <div style={{ position: "absolute", top: "1rem", right: "1rem", width: "8px", height: "8px", borderRadius: "50%", background: "var(--primary)" }} />
                )}
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <div style={{ 
                    color: notif.type === "danger" ? "var(--danger)" : notif.type === "warning" ? "var(--warning)" : notif.type === "success" ? "var(--success)" : "var(--primary)",
                    marginTop: "0.25rem"
                  }}>
                    {notif.type === "danger" && <AlertTriangle size={18} />}
                    {notif.type === "warning" && <Info size={18} />}
                    {notif.type === "success" && <CheckCircle2 size={18} />}
                    {notif.type === "info" && <Clock size={18} />}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--text-main)" }}>{notif.title}</p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", marginTop: "0.25rem", lineHeight: 1.4 }}>{notif.message}</p>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.5rem", display: "block" }}>{notif.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "1.25rem", borderTop: "1px solid var(--border-light)", textAlign: "center" }}>
          <button style={{ background: "transparent", border: "none", color: "var(--primary)", fontWeight: 600, fontSize: "0.875rem" }}>Marcar todas como lidas</button>
        </div>
      </div>
      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
