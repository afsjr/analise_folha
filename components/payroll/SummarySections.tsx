"use client";

import { Employee } from "@/types";

const BG_LIGHT = ["#dbeafe", "#d1fae5", "#fef3c7", "#fee2e2", "#ede9fe", "#fce7f3", "#cffafe", "#dcfce7"];
const COLORS = ["#2563eb", "#059669", "#d97706", "#dc2626", "#7c3aed", "#db2777", "#0891b2", "#65a30a"];

interface SummarySectionsProps {
  top10: (Employee & { rank: number })[];
  segmentSummary: { name: string; count: number; bruto: number; liquido: number }[];
  totalBruto: number;
}

export function SummarySections({ top10, segmentSummary, totalBruto }: SummarySectionsProps) {
  const formatCurrency = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  return (
    <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: "1.25rem" }}>
      <div className="card">
        <h2 style={{ marginBottom: "1rem" }}>Top 10 Maiores Custos</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {top10.map((emp) => (
            <div key={emp.rank} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 0.75rem", background: "#f8fafc", borderRadius: "8px" }}>
              <span style={{ fontWeight: 800, color: "var(--primary)", width: "28px", fontSize: "0.85rem" }}>#{emp.rank}</span>
              <span style={{ flex: 1, fontSize: "0.85rem", color: "var(--text-main)", fontWeight: 500 }}>{emp.nome.split(" ").slice(0,2).join(" ")}</span>
              <span className="badge" style={{ 
                background: BG_LIGHT[emp.rank % BG_LIGHT.length], 
                color: COLORS[emp.rank % COLORS.length], 
                fontSize: "0.6rem" 
              }}>{emp.segmento}</span>
              <span style={{ fontWeight: 700, color: "var(--text-main)", fontSize: "0.85rem" }}>{formatCurrency(emp.total_bruto)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: "1rem" }}>Resumo por Segmento</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Segmento</th>
                <th style={{ textAlign: "right" }}>Colab.</th>
                <th style={{ textAlign: "right" }}>Custo Bruto</th>
                <th style={{ textAlign: "right" }}>%</th>
              </tr>
            </thead>
            <tbody>
              {segmentSummary.map((seg, i) => (
                <tr key={i}>
                  <td>
                    <span className="badge" style={{ background: BG_LIGHT[i % BG_LIGHT.length], color: COLORS[i % COLORS.length] }}>{seg.name}</span>
                  </td>
                  <td style={{ padding: "0.75rem", textAlign: "right", fontWeight: 500 }}>{seg.count}</td>
                  <td style={{ padding: "0.75rem", textAlign: "right", fontWeight: 600 }}>{formatCurrency(seg.bruto)}</td>
                  <td style={{ padding: "0.75rem", textAlign: "right", color: "var(--primary)", fontWeight: 700 }}>
                    {((seg.bruto / totalBruto) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
