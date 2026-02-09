"use client";

import React, { useState, useMemo } from "react";
import { defaultKeywords, defaultAssumptions, KeywordData } from "@/data/keywords";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { exportTableToExcel, printSection } from "@/lib/export";
import { Download, Printer, Plus, Trash2 } from "lucide-react";

interface RowData {
  keyword: string;
  cpc: string;
  volume: string;
}

function formatDE(value: number, decimals: number = 0): string {
  return value.toLocaleString("de-DE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function KeywordCalculator() {
  const [assumptions, setAssumptions] = useState({
    budget: defaultAssumptions.budget,
    conversionRate: defaultAssumptions.conversionRate,
    closeRate: defaultAssumptions.closeRate,
    avgOrderValue: defaultAssumptions.avgOrderValue,
  });

  const initialRows: RowData[] = [
    ...defaultKeywords.map((kw: KeywordData) => ({
      keyword: kw.keyword,
      cpc: kw.cpc.toString(),
      volume: kw.volume.toString(),
    })),
    { keyword: "", cpc: "", volume: "" },
    { keyword: "", cpc: "", volume: "" },
    { keyword: "", cpc: "", volume: "" },
  ];

  const [rows, setRows] = useState<RowData[]>(initialRows);

  const updateAssumption = (field: keyof typeof assumptions, value: string) => {
    const num = value === "" ? 0 : parseFloat(value);
    setAssumptions((prev) => ({ ...prev, [field]: isNaN(num) ? 0 : num }));
  };

  const updateRow = (index: number, field: keyof RowData, value: string) => {
    setRows((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addRow = () => {
    setRows((prev) => [...prev, { keyword: "", cpc: "", volume: "" }]);
  };

  const deleteRow = (index: number) => {
    if (rows.length <= 1) return;
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const calculated = useMemo(() => {
    return rows.map((row) => {
      const cpc = parseFloat(row.cpc);
      const valid = !isNaN(cpc) && cpc > 0;
      if (!valid) {
        return { klicks: null, anfragen: null, kunden: null, umsatz: null };
      }
      const klicks = Math.round(assumptions.budget / cpc);
      const anfragen = klicks * (assumptions.conversionRate / 100);
      const kunden = anfragen * (assumptions.closeRate / 100);
      const umsatz = Math.round(kunden * assumptions.avgOrderValue);
      return {
        klicks,
        anfragen: parseFloat(anfragen.toFixed(1)),
        kunden: parseFloat(kunden.toFixed(1)),
        umsatz,
      };
    });
  }, [rows, assumptions]);

  const roiSummary = useMemo(() => {
    const validEntries = rows
      .map((row, i) => ({ row, calc: calculated[i] }))
      .filter((entry) => entry.calc.umsatz !== null && entry.calc.umsatz !== undefined);

    if (validEntries.length === 0) {
      return { best: null, worst: null, average: null };
    }

    let bestIdx = 0;
    let worstIdx = 0;
    let totalUmsatz = 0;

    validEntries.forEach((entry, i) => {
      const umsatz = entry.calc.umsatz!;
      totalUmsatz += umsatz;
      if (umsatz > validEntries[bestIdx].calc.umsatz!) bestIdx = i;
      if (umsatz < validEntries[worstIdx].calc.umsatz!) worstIdx = i;
    });

    const budget = assumptions.budget;
    const bestEntry = validEntries[bestIdx];
    const worstEntry = validEntries[worstIdx];
    const avgUmsatz = totalUmsatz / validEntries.length;

    return {
      best: {
        keyword: bestEntry.row.keyword || "—",
        umsatz: bestEntry.calc.umsatz!,
        roi: budget > 0 ? ((bestEntry.calc.umsatz! - budget) / budget) * 100 : 0,
      },
      worst: {
        keyword: worstEntry.row.keyword || "—",
        umsatz: worstEntry.calc.umsatz!,
        roi: budget > 0 ? ((worstEntry.calc.umsatz! - budget) / budget) * 100 : 0,
      },
      average: {
        umsatz: Math.round(avgUmsatz),
        roi: budget > 0 ? ((avgUmsatz - budget) / budget) * 100 : 0,
      },
    };
  }, [rows, calculated, assumptions.budget]);

  const handleExportExcel = () => {
    const headers = [
      "Keyword",
      "Ø CPC (€)",
      "Suchvolumen/Mo",
      "Klicks/Mo",
      "Anfragen/Mo",
      "Kunden/Mo",
      "Umsatz/Mo (€)",
    ];
    const exportRows = rows.map((row, i) => {
      const c = calculated[i];
      return [
        row.keyword,
        row.cpc ? parseFloat(row.cpc) : "",
        row.volume ? parseInt(row.volume, 10) : "",
        c.klicks !== null ? c.klicks : "-",
        c.anfragen !== null ? c.anfragen : "-",
        c.kunden !== null ? c.kunden : "-",
        c.umsatz !== null ? c.umsatz : "-",
      ] as (string | number)[];
    });
    exportTableToExcel(headers, exportRows, "Keyword-Kalkulation", "Keywords");
  };

  const handlePrint = () => {
    printSection("keywords-content");
  };

  return (
    <div className="space-y-6">
      {/* Header with export buttons */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">
          Keyword-Kalkulator
        </h2>
        <div className="flex gap-2 no-print">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <Printer className="h-4 w-4" />
            Als PDF exportieren
          </button>
          <button
            onClick={handleExportExcel}
            className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            Als Excel exportieren
          </button>
        </div>
      </div>

      <div id="keywords-content" className="space-y-6">
        {/* Assumption Fields */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Annahmen & Parameter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Monatliches Werbebudget (&euro;)
                </label>
                <Input
                  type="number"
                  className="input-yellow"
                  value={assumptions.budget || ""}
                  onChange={(e) => updateAssumption("budget", e.target.value)}
                  placeholder="600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Conversion-Rate der Landingpage (%)
                </label>
                <Input
                  type="number"
                  className="input-yellow"
                  value={assumptions.conversionRate || ""}
                  onChange={(e) => updateAssumption("conversionRate", e.target.value)}
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Abschlussquote Lead&rarr;Kunde (%)
                </label>
                <Input
                  type="number"
                  className="input-yellow"
                  value={assumptions.closeRate || ""}
                  onChange={(e) => updateAssumption("closeRate", e.target.value)}
                  placeholder="35"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Durchschnittlicher Auftragswert (&euro;)
                </label>
                <Input
                  type="number"
                  className="input-yellow"
                  value={assumptions.avgOrderValue || ""}
                  onChange={(e) => updateAssumption("avgOrderValue", e.target.value)}
                  placeholder="500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Keyword Table */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Keyword-Analyse</CardTitle>
              <button
                onClick={addRow}
                className="no-print inline-flex items-center gap-1 rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Zeile hinzuf&uuml;gen
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-200 px-3 py-2 text-left font-semibold text-slate-700 min-w-[220px]">
                      Keyword
                    </th>
                    <th className="border border-slate-200 px-3 py-2 text-right font-semibold text-slate-700 w-[110px]">
                      &Oslash; CPC (&euro;)
                    </th>
                    <th className="border border-slate-200 px-3 py-2 text-right font-semibold text-slate-700 w-[140px]">
                      Suchvolumen/Mo
                    </th>
                    <th className="border border-slate-200 px-3 py-2 text-right font-semibold text-slate-700 bg-slate-50 w-[110px]">
                      Klicks/Mo
                    </th>
                    <th className="border border-slate-200 px-3 py-2 text-right font-semibold text-slate-700 bg-slate-50 w-[120px]">
                      Anfragen/Mo
                    </th>
                    <th className="border border-slate-200 px-3 py-2 text-right font-semibold text-slate-700 bg-slate-50 w-[110px]">
                      Kunden/Mo
                    </th>
                    <th className="border border-slate-200 px-3 py-2 text-right font-semibold text-slate-700 bg-slate-50 w-[120px]">
                      Umsatz/Mo (&euro;)
                    </th>
                    <th className="border border-slate-200 px-3 py-2 w-[50px] no-print" />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => {
                    const c = calculated[i];
                    return (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="border border-slate-200 px-1 py-1">
                          <Input
                            type="text"
                            value={row.keyword}
                            onChange={(e) => updateRow(i, "keyword", e.target.value)}
                            className="h-8 border-0 bg-transparent text-sm focus-visible:ring-1"
                            placeholder="Keyword eingeben..."
                          />
                        </td>
                        <td className="border border-slate-200 px-1 py-1">
                          <Input
                            type="number"
                            step="0.1"
                            value={row.cpc}
                            onChange={(e) => updateRow(i, "cpc", e.target.value)}
                            className="h-8 border-0 bg-transparent text-sm text-right focus-visible:ring-1"
                            placeholder="0,00"
                          />
                        </td>
                        <td className="border border-slate-200 px-1 py-1">
                          <Input
                            type="number"
                            value={row.volume}
                            onChange={(e) => updateRow(i, "volume", e.target.value)}
                            className="h-8 border-0 bg-transparent text-sm text-right focus-visible:ring-1"
                            placeholder="0"
                          />
                        </td>
                        <td className="border border-slate-200 px-3 py-2 text-right bg-slate-50 font-mono text-slate-600">
                          {c.klicks !== null ? formatDE(c.klicks) : "-"}
                        </td>
                        <td className="border border-slate-200 px-3 py-2 text-right bg-slate-50 font-mono text-slate-600">
                          {c.anfragen !== null ? formatDE(c.anfragen, 1) : "-"}
                        </td>
                        <td className="border border-slate-200 px-3 py-2 text-right bg-slate-50 font-mono text-slate-600">
                          {c.kunden !== null ? formatDE(c.kunden, 1) : "-"}
                        </td>
                        <td className="border border-slate-200 px-3 py-2 text-right bg-slate-50 font-mono font-semibold text-slate-800">
                          {c.umsatz !== null ? formatDE(c.umsatz) : "-"}
                        </td>
                        <td className="border border-slate-200 px-1 py-1 text-center no-print">
                          <button
                            onClick={() => deleteRow(i)}
                            disabled={rows.length <= 1}
                            className="inline-flex items-center justify-center rounded p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Zeile entfernen"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* ROI Summary Cards */}
        {roiSummary.best && roiSummary.worst && roiSummary.average && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Bester Fall */}
            <Card className="border-green-300 border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-green-700">
                  Bester Fall
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-slate-600 truncate" title={roiSummary.best.keyword}>
                  {roiSummary.best.keyword}
                </p>
                <p className="text-2xl font-bold text-green-700">
                  {formatDE(roiSummary.best.umsatz)} &euro;
                  <span className="text-sm font-normal text-slate-500"> /Mo</span>
                </p>
                <p className="text-sm font-semibold text-green-600">
                  ROI: {formatDE(roiSummary.best.roi, 1)} %
                </p>
              </CardContent>
            </Card>

            {/* Schlechtester Fall */}
            <Card className="border-red-300 border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-red-700">
                  Schlechtester Fall
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-slate-600 truncate" title={roiSummary.worst.keyword}>
                  {roiSummary.worst.keyword}
                </p>
                <p className="text-2xl font-bold text-red-700">
                  {formatDE(roiSummary.worst.umsatz)} &euro;
                  <span className="text-sm font-normal text-slate-500"> /Mo</span>
                </p>
                <p className="text-sm font-semibold text-red-600">
                  ROI: {formatDE(roiSummary.worst.roi, 1)} %
                </p>
              </CardContent>
            </Card>

            {/* Mittlerer Fall */}
            <Card className="border-blue-300 border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-blue-700">
                  Mittlerer Fall
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-slate-600">
                  Durchschnitt aller Keywords
                </p>
                <p className="text-2xl font-bold text-blue-700">
                  {formatDE(roiSummary.average.umsatz)} &euro;
                  <span className="text-sm font-normal text-slate-500"> /Mo</span>
                </p>
                <p className="text-sm font-semibold text-blue-600">
                  ROI: {formatDE(roiSummary.average.roi, 1)} %
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
