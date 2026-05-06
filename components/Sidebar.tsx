"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  TrendingUp, 
  HeartHandshake, 
  Wallet,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Geral", href: "/" },
  { icon: GraduationCap, label: "Acadêmico", href: "/academic" },
  { icon: TrendingUp, label: "Comercial", href: "/commercial" },
  { icon: Wallet, label: "Financeiro", href: "/financial" },
  { icon: Users, label: "Folha / RH", href: "/payroll" },
  { icon: HeartHandshake, label: "Relacionamento", href: "/relationship" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      style={{
        width: collapsed ? '80px' : '260px',
        height: '100vh',
        background: 'var(--bg-card)',
        borderRight: '1px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'var(--transition)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}
    >
      <div style={{ 
        padding: '1.5rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: collapsed ? 'center' : 'space-between',
        borderBottom: '1px solid var(--border-light)',
        marginBottom: '1rem'
      }}>
        {!collapsed && <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)', letterSpacing: '-0.02em' }}>CSM Manager</span>}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          style={{ 
            background: 'var(--bg-main)', 
            border: 'none', 
            borderRadius: '6px', 
            padding: '4px',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav style={{ flex: 1, padding: '0 0.75rem' }}>
        {MENU_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                marginBottom: '0.25rem',
                textDecoration: 'none',
                color: active ? 'var(--primary)' : 'var(--text-secondary)',
                background: active ? 'var(--primary-light-alpha)' : 'transparent',
                fontWeight: active ? 600 : 500,
                transition: 'var(--transition)',
                justifyContent: collapsed ? 'center' : 'flex-start',
                position: 'relative'
              }}
              className="nav-item"
            >
              <item.icon size={20} strokeWidth={active ? 2.5 : 2} />
              {!collapsed && <span>{item.label}</span>}
              {active && !collapsed && (
                <div style={{
                  position: 'absolute',
                  right: '0.5rem',
                  width: '4px',
                  height: '16px',
                  background: 'var(--primary)',
                  borderRadius: '2px'
                }} />
              )}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid var(--border-light)' }}>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            width: '100%',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            justifyContent: collapsed ? 'center' : 'flex-start'
          }}
        >
          <Settings size={20} />
          {!collapsed && <span>Configurações</span>}
        </button>
      </div>
    </aside>
  );
}
