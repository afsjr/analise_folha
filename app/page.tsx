"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import dataDefault from "@/data/folha.json";
import fullDataDefault from "@/data/folha_completa.json";
import Papa from "papaparse";
import { 
  TrendingUp, 
  Users, 
  Wallet, 
  ArrowDownCircle, 
  Search,
  Download,
  Upload,
  X,
  FileSpreadsheet,
  Calendar,
  Printer
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from "recharts";

type Employee = {
  nome: string;
  cargo: string;
  segmento: string;
  categoria: string;
  aulas_semanais: string;
  total_bruto: number;
  inss: number;
  creditos_extras: number;
  total_liquido: number;
  mes?: string;
};

const MESES: Record<string, string> = {
  '2026-02': 'Fev/2026',
  '2026-03': 'Mar/2026', 
  '2026-04': 'Abr/2026'
};

const COLORS = ["#2563eb", "#059669", "#d97706", "#dc2626", "#7c3aed", "#db2777", "#0891b2", "#65a30a"];
const BG_LIGHT = ["#dbeafe", "#d1fae5", "#fef3c7", "#fee2e2", "#ede9fe", "#fce7f3", "#cffafe", "#dcfce7"];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSegment, setFilterSegment] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("2026-04");
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<Employee[]>(dataDefault);
  const [fullData, setFullData] = useState<Employee[]>(fullDataDefault);
  const [showModal, setShowModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dataByMonth = useMemo(() => {
    const months: Record<string, Employee[]> = {};
    fullData.forEach(emp => {
      const mes = emp.mes || '2026-04';
      if (!months[mes]) months[mes] = [];
      months[mes].push(emp);
    });
    return months;
  }, [fullData]);

  const monthlyStats = useMemo(() => {
    return Object.keys(MESES).map((mes: string) => {
      const employees = dataByMonth[mes] || [];
      const totalBruto = employees.reduce((a, c) => a + c.total_bruto, 0);
      const totalLiquido = employees.reduce((a, c) => a + c.total_liquido, 0);
      return {
        mes: MESES[mes],
        mesKey: mes,
        count: employees.length,
        bruto: totalBruto,
        liquido: totalLiquido
      };
    });
  }, [dataByMonth]);

  const currentData = useMemo(() => {
    return fullData.filter(emp => emp.mes === selectedMonth);
  }, [fullData, selectedMonth]);

  const allSegments = useMemo(() => {
    const segs = new Set(currentData.map(e => e.segmento).filter(Boolean));
    return ["all", ...Array.from(segs).sort()];
  }, [currentData]);

  const exportBackup = () => {
    const csv = Papa.unparse(currentData.map(emp => ({
      Nome: emp.nome,
      Cargo: emp.cargo,
      Segmento: emp.segmento,
      "Total Bruto": emp.total_bruto,
      INSS: emp.inss,
      Créditos: emp.creditos_extras,
      "Total Líquido": emp.total_liquido
    })));
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `folha_${selectedMonth}.csv`;
    link.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData: Employee[] = results.data.map((row: any) => ({
          nome: row["Nome"] || "",
          cargo: row["Cargo"] || "",
          segmento: row["Segmento"] || "Outros",
          categoria: row["Categoria"] || "Outros",
          aulas_semanais: row["Aulas Semanais"] || "0",
          total_bruto: parseFloat(row["Total Bruto"]) || 0,
          inss: parseFloat(row["INSS"]) || 0,
          creditos_extras: parseFloat(row["Créditos"]) || 0,
          total_liquido: parseFloat(row["Total Líquido"]) || 0,
        })).filter((e: Employee) => e.nome);
        if (parsedData.length === 0) {
          setError("Arquivo inválido");
          return;
        }
        setData(parsedData);
        setShowModal(false);
      }
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const stats = useMemo(() => {
    const filtered = filterSegment === "all" ? currentData : currentData.filter(e => e.segmento === filterSegment);
    const totalBruto = filtered.reduce((a, c) => a + c.total_bruto, 0);
    const totalLiquido = filtered.reduce((a, c) => a + c.total_liquido, 0);
    const totalINSS = filtered.reduce((a, c) => a + c.inss, 0);
    const totalCreditos = filtered.reduce((a, c) => a + c.creditos_extras, 0);
    const avgSalary = filtered.length ? totalBruto / filtered.length : 0;
    return { totalBruto, totalLiquido, totalINSS, totalCreditos, avgSalary, count: filtered.length };
  }, [currentData, filterSegment]);

  const segmentData = useMemo(() => {
    const groups: Record<string, number> = {};
    currentData.forEach(emp => { groups[emp.segmento] = (groups[emp.segmento] || 0) + emp.total_bruto; });
    return Object.entries(groups).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [currentData]);

  const pieData = useMemo(() => {
    const groups: Record<string, number> = {};
    currentData.forEach(emp => { groups[emp.segmento] = (groups[emp.segmento] || 0) + emp.total_bruto; });
    const total = Object.values(groups).reduce((a, b) => a + b, 0);
    return Object.entries(groups).map(([name, value], i) => ({ name, value, pct: total ? (value / total * 100).toFixed(1) : "0", color: COLORS[i % COLORS.length] }));
  }, [currentData]);

  const segmentSummary = useMemo(() => {
    const groups: Record<string, {count: number, bruto: number, liquido: number}> = {};
    currentData.forEach(emp => {
      if (!groups[emp.segmento]) groups[emp.segmento] = {count: 0, bruto: 0, liquido: 0};
      groups[emp.segmento].count++;
      groups[emp.segmento].bruto += emp.total_bruto;
      groups[emp.segmento].liquido += emp.total_liquido;
    });
    return Object.entries(groups).map(([name, v]) => ({name, ...v})).sort((a, b) => b.bruto - a.bruto);
  }, [currentData]);

  const top10 = useMemo(() => 
    [...currentData].sort((a, b) => b.total_bruto - a.total_bruto).slice(0, 10).map((e, i) => ({...e, rank: i + 1})),
  [currentData]);

  const filteredData = useMemo(() => currentData.filter(emp => {
    const matchSearch = !searchTerm || emp.nome.toLowerCase().includes(searchTerm.toLowerCase()) || emp.cargo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSeg = filterSegment === "all" || emp.segmento === filterSegment;
    return matchSearch && matchSeg;
  }), [currentData, searchTerm, filterSegment]);

  const formatCurrency = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const printReport = () => {
    window.print();
  };

  useEffect(() => setIsLoaded(true), []);

  if (!isLoaded) return null;

  return (
    <main className="container animate-fade-in">
      <header style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p className="text-sm font-medium" style={{ color: "#64748b", marginBottom: "0.25rem" }}>Folha de Pagamento</p>
          <h1>Colégio Santa Mônica</h1>
          <p className="text-sm text-muted">Referência: {MESES[selectedMonth]}</p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#f1f5f9", padding: "0.25rem 0.5rem", borderRadius: "6px" }}>
            <Calendar size={14} style={{ color: "#64748b" }} />
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} style={{ border: "none", background: "transparent", fontSize: "0.8rem", fontWeight: 500 }}>
              {Object.entries(MESES).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <button className="card" onClick={exportBackup} style={{ padding: "0.5rem 0.75rem", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Download size={14} /> Backup
          </button>
          <button className="card primary" onClick={() => setShowModal(true)} style={{ padding: "0.5rem 0.75rem", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Upload size={14} /> Importar
          </button>
          <button className="card" onClick={printReport} style={{ padding: "0.5rem 0.75rem", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.4rem", background: "#059669", color: "white", borderColor: "#059669" }}>
            <Printer size={14} /> Imprimir
          </button>
        </div>
      </header>

      <div className="grid grid-cols-5" style={{ marginBottom: "1.25rem" }}>
        <div className="card">
          <div className="metric-label"><TrendingUp size={14} /> Total Bruto</div>
          <div className="metric-value" style={{ color: "#1e293b" }}>{formatCurrency(stats.totalBruto)}</div>
        </div>
        <div className="card">
          <div className="metric-label"><Wallet size={14} /> Total Líquido</div>
          <div className="metric-value" style={{ color: "#059669" }}>{formatCurrency(stats.totalLiquido)}</div>
        </div>
        <div className="card">
          <div className="metric-label"><ArrowDownCircle size={14} /> Descontos</div>
          <div className="metric-value" style={{ color: "#dc2626" }}>{formatCurrency(stats.totalINSS)}</div>
        </div>
        <div className="card">
          <div className="metric-label"><Users size={14} /> Funcionários</div>
          <div className="metric-value" style={{ color: "#1e293b" }}>{stats.count}</div>
        </div>
        <div className="card">
          <div className="metric-label"><FileSpreadsheet size={14} /> Média</div>
          <div className="metric-value" style={{ color: "#1e293b" }}>{formatCurrency(stats.avgSalary)}</div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr", marginBottom: "1.25rem" }}>
        <div className="card">
          <h2>Evolução Mensal</h2>
          <div style={{ height: "200px", width: "100%", marginTop: "0.75rem" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyStats} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="mes" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `R$${v/1000}k`} />
                <Tooltip formatter={(v) => formatCurrency(v as number)} contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }} />
                <Line type="monotone" dataKey="bruto" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb", r: 4 }} name="Bruto" />
                <Line type="monotone" dataKey="liquido" stroke="#059669" strokeWidth={2} dot={{ fill: "#059669", r: 4 }} name="Líquido" />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", justifyContent: "center" }}>
            {monthlyStats.map((m: {mes: string, mesKey: string, count: number, bruto: number, liquido: number}, i: number) => (
              <div key={m.mesKey} style={{ textAlign: "center", padding: "0.5rem 1rem", background: i === monthlyStats.length - 1 ? "#dbeafe" : "#f8fafc", borderRadius: "6px" }}>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{m.mes}</div>
                <div style={{ fontWeight: 600, color: "#1e293b" }}>{formatCurrency(m.bruto)}</div>
                <div style={{ fontSize: "0.7rem", color: "#059669" }}>{m.count} func</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.2fr 0.8fr", marginBottom: "1.25rem" }}>
        <div className="card">
          <h2>Custo por Segmento</h2>
          <div style={{ height: "240px", width: "100%", marginTop: "0.75rem" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentData} layout="vertical" margin={{ left: 100, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `R$${v/1000}k`} />
                <YAxis dataKey="name" type="category" stroke="#475569" fontSize={11} width={95} />
                <Tooltip formatter={(v) => formatCurrency(v as number)} contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }} />
                <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2>Proporção por Segmento</h2>
          <div style={{ height: "240px", width: "100%", marginTop: "0.75rem" }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(v as number)} contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: "1.25rem" }}>
        <div className="card">
          <h2>Top 10 Maiores Custos</h2>
          <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {top10.map((emp) => (
              <div key={emp.rank} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.6rem", background: "#f8fafc", borderRadius: "6px" }}>
                <span style={{ fontWeight: 700, color: "#2563eb", width: "24px", fontSize: "0.8rem" }}>#{emp.rank}</span>
                <span style={{ flex: 1, fontSize: "0.8rem", color: "#1e293b" }}>{emp.nome.split(" ").slice(0,2).join(" ")}</span>
                <span className="badge" style={{ background: BG_LIGHT[pieData.findIndex(p => p.name === emp.segmento) % BG_LIGHT.length], color: COLORS[pieData.findIndex(p => p.name === emp.segmento) % COLORS.length], fontSize: "0.65rem" }}>{emp.segmento}</span>
                <span style={{ fontWeight: 600, color: "#059669", fontSize: "0.8rem" }}>{formatCurrency(emp.total_bruto)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Resumo por Segmento</h2>
          <table style={{ marginTop: "0.75rem", fontSize: "0.8rem", width: "100%" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <th style={{ padding: "0.4rem", textAlign: "left" }}>Segmento</th>
                <th style={{ padding: "0.4rem", textAlign: "right" }}>Func.</th>
                <th style={{ padding: "0.4rem", textAlign: "right" }}>Bruto</th>
                <th style={{ padding: "0.4rem", textAlign: "right" }}>Part.</th>
              </tr>
            </thead>
            <tbody>
              {segmentSummary.map((seg, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "0.4rem" }}>
                    <span className="badge" style={{ background: BG_LIGHT[i % BG_LIGHT.length], color: COLORS[i % COLORS.length] }}>{seg.name}</span>
                  </td>
                  <td style={{ padding: "0.4rem", textAlign: "right" }}>{seg.count}</td>
                  <td style={{ padding: "0.4rem", textAlign: "right", fontWeight: 500 }}>{formatCurrency(seg.bruto)}</td>
                  <td style={{ padding: "0.4rem", textAlign: "right", color: "#2563eb", fontWeight: 600 }}>{((seg.bruto / stats.totalBruto) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <h2>Relatório Detalhado ({filteredData.length})</h2>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: "0.6rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
              <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: "0.4rem 0.6rem 0.4rem 2rem", fontSize: "0.8rem", width: "160px" }} />
            </div>
            <select value={filterSegment} onChange={(e) => setFilterSegment(e.target.value)} style={{ padding: "0.4rem 0.6rem", fontSize: "0.8rem" }}>
              {allSegments.map(seg => <option key={seg} value={seg}>{seg === "all" ? "Todos Segmentos" : seg}</option>)}
            </select>
          </div>
        </div>
        <div style={{ maxHeight: "350px", overflow: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Segmento</th>
                <th>Cargo</th>
                <th style={{ textAlign: "right" }}>Bruto</th>
                <th style={{ textAlign: "right" }}>INSS</th>
                <th style={{ textAlign: "right" }}>Créditos</th>
                <th style={{ textAlign: "right" }}>Líquido</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((emp, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 500 }}>{emp.nome}</td>
                  <td><span className="badge badge-primary">{emp.segmento}</span></td>
                  <td style={{ color: "#64748b" }}>{emp.cargo}</td>
                  <td style={{ textAlign: "right", fontWeight: 500 }}>{formatCurrency(emp.total_bruto)}</td>
                  <td style={{ textAlign: "right", color: "#dc2626" }}>-{formatCurrency(emp.inss)}</td>
                  <td style={{ textAlign: "right", color: "#059669" }}>+{formatCurrency(emp.creditos_extras)}</td>
                  <td style={{ textAlign: "right", fontWeight: 700, color: "#1e293b" }}>{formatCurrency(emp.total_liquido)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Importar Folha</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: "0.75rem", fontSize: "0.85rem" }}>Selecione o arquivo CSV:</p>
              {error && <p className="error-message">{error}</p>}
              <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileSelect} style={{ display: "none" }} />
              <div className="modal-actions">
                <button className="card" onClick={() => setShowModal(false)} style={{ flex: 1 }}>Cancelar</button>
                <button className="card primary" onClick={() => fileInputRef.current?.click()} style={{ flex: 1 }}>Selecionar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}