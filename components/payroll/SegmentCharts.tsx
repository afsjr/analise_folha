"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";

const COLORS = ["#2563eb", "#059669", "#d97706", "#dc2626", "#7c3aed", "#db2777", "#0891b2", "#65a30a"];

interface SegmentChartsProps {
  segmentData: { name: string; value: number }[];
  pieData: { name: string; value: number; pct: string; color: string }[];
}

export function SegmentCharts({ segmentData, pieData }: SegmentChartsProps) {
  const formatCurrency = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  return (
    <div className="grid" style={{ gridTemplateColumns: "1.2fr 0.8fr", marginBottom: "1.25rem" }}>
      <div className="card">
        <h2 style={{ marginBottom: "1rem" }}>Custo por Segmento</h2>
        <div style={{ height: "260px", width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={segmentData} layout="vertical" margin={{ left: 100, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `R$${v/1000}k`} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" stroke="#475569" fontSize={11} width={95} axisLine={false} tickLine={false} />
              <Tooltip 
                formatter={(v) => formatCurrency(v as number)} 
                contentStyle={{ background: "#fff", border: "none", borderRadius: "8px", boxShadow: "var(--shadow-md)" }} 
              />
              <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: "1rem" }}>Distribuição Percentual</h2>
        <div style={{ height: "260px", width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                {pieData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
              </Pie>
              <Tooltip 
                formatter={(v) => formatCurrency(v as number)} 
                contentStyle={{ background: "#fff", border: "none", borderRadius: "8px", boxShadow: "var(--shadow-md)" }} 
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
