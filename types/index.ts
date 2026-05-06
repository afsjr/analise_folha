export type Employee = {
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

export type MonthlyStat = {
  mes: string;
  mesKey: string;
  count: number;
  bruto: number;
  liquido: number;
};
