"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { MonthlyStat } from "@/types";

interface EvolutionChartProps {
  data: MonthlyStat[];
  tooltipText: string;
}

export function EvolutionChart({ data, tooltipText }: EvolutionChartProps) {
  const formatCurrency = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  return (
    <div className="card" style={{ marginBottom: "1.25rem" }}>
      <h2 style={{ display: 'flex', alignItems: 'center', marginBottom: "1rem" }}>
        Evolução Mensal
      </h2>
      <div style={{ height: "250px", width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="mes" stroke="#64748b" fontSize={11} axisLine={false} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v/1000}k`} />
            <Tooltip 
              formatter={(v) => formatCurrency(v as number)} 
              contentStyle={{ background: "#fff", border: "none", borderRadius: "8px", boxShadow: "var(--shadow-md)" }} 
            />
            <Line type="monotone" dataKey="bruto" stroke="#2563eb" strokeWidth={3} dot={{ fill: "#2563eb", r: 4, strokeWidth: 2, stroke: "#fff" }} name="Bruto" activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="liquido" stroke="#059669" strokeWidth={3} dot={{ fill: "#059669", r: 4, strokeWidth: 2, stroke: "#fff" }} name="Líquido" activeDot={{ r: 6 }} />
            <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: "20px", fontSize: "12px" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", justifyContent: "center" }}>
        {data.map((m, i) => (
          <div key={m.mesKey} style={{ textAlign: "center", padding: "0.5rem 1rem", background: i === data.length - 1 ? "var(--primary-light-alpha)" : "#f8fafc", borderRadius: "8px", border: i === data.length - 1 ? "1px solid var(--primary-light-alpha)" : "1px solid transparent" }}>
            <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 500 }}>{m.mes}</div>
            <div style={{ fontWeight: 700, color: "var(--text-main)", fontSize: "0.9rem" }}>{formatCurrency(m.bruto)}</div>
            <div style={{ fontSize: "0.7rem", color: "#059669", fontWeight: 600 }}>{m.count} colaboradores</div>
          </div>
        ))}
      </div>
    </div>
  );
}
