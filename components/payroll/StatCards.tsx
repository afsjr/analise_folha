"use client";

import { TrendingUp, Wallet, ArrowDownCircle, Users, FileSpreadsheet, HelpCircle } from "lucide-react";
import { useState } from "react";

interface StatCardsProps {
  stats: {
    totalBruto: number;
    totalLiquido: number;
    totalINSS: number;
    count: number;
    avgSalary: number;
  };
  tooltips: Record<string, string>;
}

function TooltipIcon({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', marginLeft: '4px' }}>
      <HelpCircle 
        size={14} 
        style={{ color: '#94a3b8', cursor: 'pointer' }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      />
      {show && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1e293b',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '0.75rem',
          width: '200px',
          zIndex: 100,
          marginBottom: '8px',
          textAlign: 'center',
          lineHeight: 1.4
        }}>
          {text}
        </div>
      )}
    </div>
  );
}

export function StatCards({ stats, tooltips }: StatCardsProps) {
  const formatCurrency = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  return (
    <div className="grid grid-cols-5" style={{ marginBottom: "1.25rem" }}>
      <div className="card">
        <div className="metric-label">
          <TrendingUp size={14} /> 
          Total Bruto
          <TooltipIcon text={tooltips.totalBruto} />
        </div>
        <div className="metric-value" style={{ color: "#1e293b" }}>{formatCurrency(stats.totalBruto)}</div>
      </div>
      <div className="card">
        <div className="metric-label">
          <Wallet size={14} /> 
          Total Líquido
          <TooltipIcon text={tooltips.totalLiquido} />
        </div>
        <div className="metric-value" style={{ color: "#059669" }}>{formatCurrency(stats.totalLiquido)}</div>
      </div>
      <div className="card">
        <div className="metric-label">
          <ArrowDownCircle size={14} /> 
          Descontos
          <TooltipIcon text={tooltips.totalINSS} />
        </div>
        <div className="metric-value" style={{ color: "#dc2626" }}>{formatCurrency(stats.totalINSS)}</div>
      </div>
      <div className="card">
        <div className="metric-label">
          <Users size={14} /> 
          Funcionários
        </div>
        <div className="metric-value" style={{ color: "#1e293b" }}>{stats.count}</div>
      </div>
      <div className="card">
        <div className="metric-label">
          <FileSpreadsheet size={14} /> 
          Média por Func.
          <TooltipIcon text={tooltips.media} />
        </div>
        <div className="metric-value" style={{ color: "#1e293b" }}>{formatCurrency(stats.avgSalary)}</div>
      </div>
    </div>
  );
}
