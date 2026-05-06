"use client";

import { useEffect, useState, useMemo } from "react";
import dataDefault from "@/data/folha.json";
import fullDataDefault from "@/data/folha_completa.json";
import Papa from "papaparse";
import { 
  Download, 
  Upload, 
  Printer, 
  Calendar 
} from "lucide-react";

import { Employee, MonthlyStat } from "@/types";
import { StatCards } from "@/components/payroll/StatCards";
import { EvolutionChart } from "@/components/payroll/EvolutionChart";
import { SegmentCharts } from "@/components/payroll/SegmentCharts";
import { SummarySections } from "@/components/payroll/SummarySections";
import { EmployeeTable } from "@/components/payroll/EmployeeTable";
import { ImportModal } from "@/components/payroll/ImportModal";

const TOOLTIPS = {
  totalBruto: "Valor total da folha antes de descontos (salário base + adicionais + gratificações)",
  totalLiquido: "Valor líquido a ser pago aos funcionários após todos os descontos",
  totalINSS: "Total das contribuições ao INSS descontadas dos funcionários",
  media: "Média do custo por funcionário (Bruto / Número de funcionários)",
  evolucao: "Evolução mensal do custo total da folha nos últimos meses",
};

const MESES: Record<string, string> = {
  '2026-02': 'Fev/2026',
  '2026-03': 'Mar/2026', 
  '2026-04': 'Abr/2026'
};

const COLORS = ["#2563eb", "#059669", "#d97706", "#dc2626", "#7c3aed", "#db2777", "#0891b2", "#65a30a"];

export default function PayrollDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSegment, setFilterSegment] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("2026-04");
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentData, setCurrentData] = useState<Employee[]>(dataDefault);
  const [fullData, setFullData] = useState<Employee[]>(fullDataDefault);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => setIsLoaded(true), []);

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

  const allSegments = useMemo(() => {
    const segs = new Set(currentData.map(e => e.segmento).filter(Boolean));
    return ["all", ...Array.from(segs).sort()];
  }, [currentData]);

  const stats = useMemo(() => {
    const filtered = filterSegment === "all" ? currentData : currentData.filter(e => e.segmento === filterSegment);
    const totalBruto = filtered.reduce((a, c) => a + c.total_bruto, 0);
    const totalLiquido = filtered.reduce((a, c) => a + c.total_liquido, 0);
    const totalINSS = filtered.reduce((a, c) => a + c.inss, 0);
    const avgSalary = filtered.length ? totalBruto / filtered.length : 0;
    return { totalBruto, totalLiquido, totalINSS, avgSalary, count: filtered.length };
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
    return Object.entries(groups).map(([name, value], i) => ({ 
      name, 
      value, 
      pct: total ? (value / total * 100).toFixed(1) : "0", 
      color: COLORS[i % COLORS.length] 
    }));
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

  const exportBackup = () => {
    const csv = Papa.unparse(currentData.map(emp => ({
      Nome: emp.nome,
      Cargo: emp.cargo,
      Segmento: emp.segmento,
      "Total Bruto": emp.total_bruto,
      INSS: emp.inss,
      "Total Líquido": emp.total_liquido
    })));
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `folha_${selectedMonth}.csv`;
    link.click();
  };

  if (!isLoaded) return null;

  return (
    <main className="container animate-fade-in">
      <header style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p className="text-sm font-medium" style={{ color: "#64748b", marginBottom: "0.25rem" }}>Folha de Pagamento</p>
          <h1>Gestão de RH & Colaboradores</h1>
          <p className="text-sm text-muted">Mês de Referência: {MESES[selectedMonth]}</p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#fff", padding: "0.5rem 1rem", borderRadius: "8px", border: "1px solid var(--border-light)" }}>
            <Calendar size={16} style={{ color: "var(--primary)" }} />
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)} 
              style={{ border: "none", background: "transparent", fontSize: "0.875rem", fontWeight: 600, outline: "none", cursor: "pointer" }}
            >
              {Object.entries(MESES).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <button className="card" onClick={exportBackup} style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Download size={16} /> Backup
          </button>
          <button className="card primary" onClick={() => setShowModal(true)} style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Upload size={16} /> Importar
          </button>
          <button className="card" onClick={() => window.print()} style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem", background: "#059669", color: "white", border: "none" }}>
            <Printer size={16} /> Imprimir
          </button>
        </div>
      </header>

      <StatCards stats={stats} tooltips={TOOLTIPS} />
      
      <EvolutionChart data={monthlyStats} tooltipText={TOOLTIPS.evolucao} />
      
      <SegmentCharts segmentData={segmentData} pieData={pieData} />
      
      <SummarySections top10={top10} segmentSummary={segmentSummary} totalBruto={stats.totalBruto} />
      
      <EmployeeTable 
        data={filteredData} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        filterSegment={filterSegment}
        setFilterSegment={setFilterSegment}
        allSegments={allSegments}
      />

      <ImportModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onDataImported={(newData) => setCurrentData(newData)} 
      />
    </main>
  );
}