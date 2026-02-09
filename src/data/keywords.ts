export interface KeywordData {
  keyword: string;
  cpc: number;
  volume: number;
}

export const defaultKeywords: KeywordData[] = [
  { keyword: "Fensterdichtung erneuern Hamburg", cpc: 3.5, volume: 210 },
  { keyword: "Fenster undicht reparieren Hamburg", cpc: 4.2, volume: 170 },
  { keyword: "Zugluft Fenster abdichten Hamburg", cpc: 2.8, volume: 140 },
  { keyword: "Holzfenster Dichtung tauschen", cpc: 3.0, volume: 120 },
  { keyword: "Tischler Notdienst Hamburg", cpc: 6.5, volume: 320 },
  { keyword: "Fenster reparieren Hamburg", cpc: 5.2, volume: 280 },
  { keyword: "Fensterwartung Hamburg", cpc: 2.5, volume: 90 },
  { keyword: "Repair Care Holzfenster Hamburg", cpc: 1.8, volume: 40 },
  { keyword: "Sicherheitstechnik Fenster Hamburg", cpc: 4.0, volume: 60 },
  { keyword: "Dichtungstausch Fenster Kosten", cpc: 2.2, volume: 150 },
  { keyword: "Fenster Notdienst Hamburg 24h", cpc: 7.0, volume: 180 },
  { keyword: "Tischlerei Fenster Hamburg", cpc: 4.5, volume: 200 },
];

export const defaultAssumptions = {
  budget: 600,
  conversionRate: 10,
  closeRate: 35,
  avgOrderValue: 500,
};
