"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { exportTableToExcel, printSection } from "@/lib/export";
import { Download, Printer } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MONTHS = [
  "Jan",
  "Feb",
  "Mär",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dez",
] as const;

type MonthKey = (typeof MONTHS)[number];

interface MonthData {
  werbeausgaben: number | "";
  impressionen: number | "";
  klicks: number | "";
  anrufe: number | "";
  formularAnfragen: number | "";
  anfragenGesamt: number | "";
  gewonneneKunden: number | "";
  umsatz: number | "";
  googleBewertungen: number | "";
  websiteBesucher: number | "";
}

type InputMetricKey = keyof MonthData;

const INPUT_METRICS: { key: InputMetricKey; label: string }[] = [
  { key: "werbeausgaben", label: "Werbeausgaben (€)" },
  { key: "impressionen", label: "Impressionen" },
  { key: "klicks", label: "Klicks" },
  { key: "anrufe", label: "Anrufe (aus Anzeigen)" },
  { key: "formularAnfragen", label: "Formular-Anfragen" },
  { key: "anfragenGesamt", label: "Anfragen gesamt (Leads)" },
  { key: "gewonneneKunden", label: "Gewonnene Kunden" },
  { key: "umsatz", label: "Umsatz aus Anzeigenkunden (€)" },
  { key: "googleBewertungen", label: "Google-Bewertungen (kumuliert)" },
  { key: "websiteBesucher", label: "Website-Besucher gesamt" },
];

function emptyMonth(): MonthData {
  return {
    werbeausgaben: "",
    impressionen: "",
    klicks: "",
    anrufe: "",
    formularAnfragen: "",
    anfragenGesamt: "",
    gewonneneKunden: "",
    umsatz: "",
    googleBewertungen: "",
    websiteBesucher: "",
  };
}

function num(v: number | ""): number {
  return v === "" ? 0 : v;
}

function fmtEuro(value: number | null): string {
  if (value === null) return "-";
  return (
    value.toLocaleString("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " €"
  );
}

function fmtPercent(value: number | null): string {
  if (value === null) return "-";
  return (
    value.toLocaleString("de-DE", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }) + " %"
  );
}

function fmtFactor(value: number | null): string {
  if (value === null) return "-";
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function safeDivide(
  numerator: number,
  denominator: number
): number | null {
  if (denominator === 0) return null;
  return numerator / denominator;
}

interface CalculatedRow {
  label: string;
  compute: (d: MonthData) => string;
  rawValue: (d: MonthData) => number | null;
}

const CALCULATED_ROWS: CalculatedRow[] = [
  {
    label: "Klickrate (CTR)",
    compute: (d) =>
      fmtPercent(
        safeDivide(num(d.klicks), num(d.impressionen)) !== null
          ? safeDivide(num(d.klicks), num(d.impressionen))! * 100
          : null
      ),
    rawValue: (d) => {
      const v = safeDivide(num(d.klicks), num(d.impressionen));
      return v !== null ? v * 100 : null;
    },
  },
  {
    label: "Kosten pro Klick (CPC)",
    compute: (d) =>
      fmtEuro(safeDivide(num(d.werbeausgaben), num(d.klicks))),
    rawValue: (d) => safeDivide(num(d.werbeausgaben), num(d.klicks)),
  },
  {
    label: "Kosten pro Anfrage (CPL)",
    compute: (d) =>
      fmtEuro(safeDivide(num(d.werbeausgaben), num(d.anfragenGesamt))),
    rawValue: (d) =>
      safeDivide(num(d.werbeausgaben), num(d.anfragenGesamt)),
  },
  {
    label: "Kosten pro Neukunde (CAC)",
    compute: (d) =>
      fmtEuro(safeDivide(num(d.werbeausgaben), num(d.gewonneneKunden))),
    rawValue: (d) =>
      safeDivide(num(d.werbeausgaben), num(d.gewonneneKunden)),
  },
  {
    label: "Conversion-Rate",
    compute: (d) =>
      fmtPercent(
        safeDivide(num(d.anfragenGesamt), num(d.klicks)) !== null
          ? safeDivide(num(d.anfragenGesamt), num(d.klicks))! * 100
          : null
      ),
    rawValue: (d) => {
      const v = safeDivide(num(d.anfragenGesamt), num(d.klicks));
      return v !== null ? v * 100 : null;
    },
  },
  {
    label: "Abschlussquote",
    compute: (d) =>
      fmtPercent(
        safeDivide(num(d.gewonneneKunden), num(d.anfragenGesamt)) !== null
          ? safeDivide(num(d.gewonneneKunden), num(d.anfragenGesamt))! *
              100
          : null
      ),
    rawValue: (d) => {
      const v = safeDivide(
        num(d.gewonneneKunden),
        num(d.anfragenGesamt)
      );
      return v !== null ? v * 100 : null;
    },
  },
  {
    label: "ROAS",
    compute: (d) =>
      fmtFactor(safeDivide(num(d.umsatz), num(d.werbeausgaben))),
    rawValue: (d) => safeDivide(num(d.umsatz), num(d.werbeausgaben)),
  },
  {
    label: "ROI",
    compute: (d) =>
      fmtPercent(
        safeDivide(
          num(d.umsatz) - num(d.werbeausgaben),
          num(d.werbeausgaben)
        ) !== null
          ? safeDivide(
              num(d.umsatz) - num(d.werbeausgaben),
              num(d.werbeausgaben)
            )! * 100
          : null
      ),
    rawValue: (d) => {
      const v = safeDivide(
        num(d.umsatz) - num(d.werbeausgaben),
        num(d.werbeausgaben)
      );
      return v !== null ? v * 100 : null;
    },
  },
];

export default function MonthlyTracker() {
  const [data, setData] = useState<Record<MonthKey, MonthData>>(() => {
    const init = {} as Record<MonthKey, MonthData>;
    for (const m of MONTHS) {
      init[m] = emptyMonth();
    }
    return init;
  });

  const handleChange = (
    month: MonthKey,
    field: InputMetricKey,
    raw: string
  ) => {
    setData((prev) => ({
      ...prev,
      [month]: {
        ...prev[month],
        [field]: raw === "" ? "" : Number(raw),
      },
    }));
  };

  const chartData = useMemo(() => {
    return MONTHS.map((m) => {
      const d = data[m];
      const hasData =
        d.werbeausgaben !== "" || d.umsatz !== "";
      if (!hasData) return null;
      return {
        monat: m,
        Werbeausgaben: num(d.werbeausgaben),
        Umsatz: num(d.umsatz),
      };
    }).filter(Boolean);
  }, [data]);

  const handleExport = () => {
    const headers = ["Kennzahl", ...MONTHS];
    const rows: (string | number)[][] = [];

    for (const metric of INPUT_METRICS) {
      const row: (string | number)[] = [metric.label];
      for (const m of MONTHS) {
        const v = data[m][metric.key];
        row.push(v === "" ? "" : v);
      }
      rows.push(row);
    }

    for (const calc of CALCULATED_ROWS) {
      const row: (string | number)[] = [calc.label];
      for (const m of MONTHS) {
        row.push(calc.compute(data[m]));
      }
      rows.push(row);
    }

    exportTableToExcel(headers, rows, "Monatlicher-Tracker", "Tracker");
  };

  const handlePrint = () => {
    printSection("tracker-content");
  };

  return (
    <div id="tracker-content">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Monatlicher Performance-Tracker</CardTitle>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-green-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                Excel-Export
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-md bg-slate-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-slate-700 transition-colors"
              >
                <Printer className="h-4 w-4" />
                Drucken
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Scrollable table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse text-sm">
              <thead>
                <tr className="border-b bg-slate-100">
                  <th className="sticky left-0 z-10 bg-slate-100 px-3 py-2 text-left font-semibold whitespace-nowrap">
                    Kennzahl
                  </th>
                  {MONTHS.map((m) => (
                    <th
                      key={m}
                      className="px-2 py-2 text-center font-semibold whitespace-nowrap"
                    >
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Input metric rows */}
                {INPUT_METRICS.map((metric) => (
                  <tr key={metric.key} className="border-b">
                    <td className="sticky left-0 z-10 bg-white px-3 py-1.5 font-medium whitespace-nowrap">
                      {metric.label}
                    </td>
                    {MONTHS.map((m) => (
                      <td
                        key={m}
                        className="input-yellow px-1 py-1"
                      >
                        <Input
                          type="number"
                          min={0}
                          value={data[m][metric.key]}
                          onChange={(e) =>
                            handleChange(m, metric.key, e.target.value)
                          }
                          className="h-8 w-[90px] text-center text-xs"
                          placeholder="-"
                        />
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Separator */}
                <tr>
                  <td
                    colSpan={MONTHS.length + 1}
                    className="h-2 bg-slate-200"
                  />
                </tr>

                {/* Calculated rows */}
                {CALCULATED_ROWS.map((calc) => (
                  <tr key={calc.label} className="border-b bg-slate-50">
                    <td className="sticky left-0 z-10 bg-slate-50 px-3 py-2 font-medium whitespace-nowrap">
                      {calc.label}
                    </td>
                    {MONTHS.map((m) => (
                      <td
                        key={m}
                        className="px-2 py-2 text-center text-xs font-mono whitespace-nowrap"
                      >
                        {calc.compute(data[m])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Line chart */}
          {chartData.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold">
                Werbeausgaben vs. Umsatz im Jahresverlauf
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="monat" />
                  <YAxis
                    tickFormatter={(v: number) =>
                      v.toLocaleString("de-DE") + " €"
                    }
                  />
                  <Tooltip
                    formatter={(
                      value: number | string | Array<number | string> | undefined,
                      name: string | undefined,
                    ) => [
                      typeof value === "number"
                        ? value.toLocaleString("de-DE", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }) + " €"
                        : "-",
                      name ?? "",
                    ]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Werbeausgaben"
                    stroke="#ea580c"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Werbeausgaben"
                  />
                  <Line
                    type="monotone"
                    dataKey="Umsatz"
                    stroke="#16a34a"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Umsatz"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
