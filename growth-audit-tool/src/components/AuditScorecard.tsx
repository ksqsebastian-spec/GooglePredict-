"use client";

import { useState } from "react";
import { auditCategories } from "@/data/audit-questions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { exportTableToExcel, printSection } from "@/lib/export";
import { Download, Printer } from "lucide-react";

interface ClientInfo {
  kundenname: string;
  website: string;
  stadt: string;
  branche: string;
  berater: string;
  datum: string;
}

export default function AuditScorecard() {
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    kundenname: "",
    website: "",
    stadt: "",
    branche: "",
    berater: "",
    datum: new Date().toISOString().split("T")[0],
  });

  const [scores, setScores] = useState<Record<number, number>>({});
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [expandedNotes, setExpandedNotes] = useState<Record<number, boolean>>({});
  const [showScoringGuide, setShowScoringGuide] = useState(false);

  const handleClientChange = (field: keyof ClientInfo, value: string) => {
    setClientInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleScoreChange = (questionId: number, value: number) => {
    setScores((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNoteChange = (questionId: number, value: string) => {
    setNotes((prev) => ({ ...prev, [questionId]: value }));
  };

  const toggleNote = (questionId: number) => {
    setExpandedNotes((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const getStatusBadge = (score: number | undefined) => {
    if (score === undefined) return null;
    if (score <= 1) {
      return <Badge variant="critical">KRITISCH</Badge>;
    }
    if (score <= 3) {
      return <Badge variant="warning">NACHBESSERN</Badge>;
    }
    return <Badge variant="success">GUT</Badge>;
  };

  const getCategoryScore = (categoryIndex: number): number => {
    const category = auditCategories[categoryIndex];
    return category.questions.reduce((sum, q) => sum + (scores[q.id] ?? 0), 0);
  };

  const totalScore = auditCategories.reduce(
    (sum, _, idx) => sum + getCategoryScore(idx),
    0
  );

  const totalPercentage = totalScore;

  const getProgressColor = (): string => {
    if (totalScore < 40) return "bg-red-500";
    if (totalScore < 70) return "bg-orange-500";
    return "bg-green-500";
  };

  const getRecommendation = () => {
    if (totalScore < 40) {
      return {
        bg: "bg-red-50 border-red-300",
        text: "text-red-800",
        label: "NICHT BEREIT",
        message: "Grundlegende L\u00fccken schlie\u00dfen, bevor Werbung sinnvoll ist.",
      };
    }
    if (totalScore < 70) {
      return {
        bg: "bg-orange-50 border-orange-300",
        text: "text-orange-800",
        label: "ERST GRUNDLAGEN VERBESSERN",
        message: "Noch nicht werben \u2014 zuerst die Basis st\u00e4rken.",
      };
    }
    return {
      bg: "bg-green-50 border-green-300",
      text: "text-green-800",
      label: "BEREIT F\u00dcR WERBUNG",
      message: "Anzeigen starten!",
    };
  };

  const handleExportExcel = () => {
    const headers = [
      "Kategorie",
      "Frage",
      "Hinweis",
      "Punkte",
      "Status",
      "Notiz",
    ];
    const rows: (string | number)[][] = [];

    auditCategories.forEach((category) => {
      category.questions.forEach((q) => {
        const score = scores[q.id];
        let status = "";
        if (score !== undefined) {
          if (score <= 1) status = "KRITISCH";
          else if (score <= 3) status = "NACHBESSERN";
          else status = "GUT";
        }
        rows.push([
          category.name,
          q.question,
          q.hint,
          score ?? "",
          status,
          notes[q.id] ?? "",
        ]);
      });
    });

    // Add summary rows
    rows.push([]);
    rows.push(["ZUSAMMENFASSUNG", "", "", "", "", ""]);
    auditCategories.forEach((category, idx) => {
      rows.push([category.name, "", "", `${getCategoryScore(idx)} / 20`, "", ""]);
    });
    rows.push(["GESAMTPUNKTZAHL", "", "", `${totalScore} / 100`, "", ""]);

    const recommendation = getRecommendation();
    rows.push([
      "EMPFEHLUNG",
      `${recommendation.label} \u2014 ${recommendation.message}`,
      "",
      "",
      "",
      "",
    ]);

    const fileName = clientInfo.kundenname
      ? `Growth-Audit_${clientInfo.kundenname.replace(/\s+/g, "_")}`
      : "Growth-Audit";

    exportTableToExcel(headers, rows, fileName, "Audit-Ergebnis");
  };

  const handleExportPDF = () => {
    printSection("scorecard-content");
  };

  const recommendation = getRecommendation();

  return (
    <div className="space-y-6">
      {/* Export Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={handleExportPDF}
          className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
        >
          <Printer className="h-4 w-4" />
          Als PDF exportieren
        </button>
        <button
          onClick={handleExportExcel}
          className="inline-flex items-center gap-2 rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition-colors"
        >
          <Download className="h-4 w-4" />
          Als Excel exportieren
        </button>
      </div>

      <div id="scorecard-content" className="space-y-6">
        {/* Scoring Guide (collapsible) */}
        <div className="rounded-lg border bg-slate-50 p-4">
          <button
            onClick={() => setShowScoringGuide(!showScoringGuide)}
            className="flex w-full items-center justify-between text-sm font-semibold text-slate-700"
          >
            <span>Bewertungslegende anzeigen</span>
            <span className="text-xs text-slate-500">
              {showScoringGuide ? "Einklappen \u25B2" : "Aufklappen \u25BC"}
            </span>
          </button>
          {showScoringGuide && (
            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-slate-600 sm:grid-cols-3">
              <span><strong>0</strong> = Gar nicht vorhanden</span>
              <span><strong>1</strong> = Schlecht umgesetzt</span>
              <span><strong>2</strong> = Grundlegend / unvollst\u00e4ndig</span>
              <span><strong>3</strong> = Ausreichend</span>
              <span><strong>4</strong> = Gut</span>
              <span><strong>5</strong> = Hervorragend</span>
            </div>
          )}
        </div>

        {/* Client Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Kundeninformationen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Kundenname
                </label>
                <Input
                  className="input-yellow"
                  placeholder="Firmenname"
                  value={clientInfo.kundenname}
                  onChange={(e) => handleClientChange("kundenname", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Website
                </label>
                <Input
                  className="input-yellow"
                  placeholder="https://www.beispiel.de"
                  value={clientInfo.website}
                  onChange={(e) => handleClientChange("website", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Stadt
                </label>
                <Input
                  className="input-yellow"
                  placeholder="z.B. M\u00fcnchen"
                  value={clientInfo.stadt}
                  onChange={(e) => handleClientChange("stadt", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Branche
                </label>
                <Input
                  className="input-yellow"
                  placeholder="z.B. Handwerk, Gastronomie"
                  value={clientInfo.branche}
                  onChange={(e) => handleClientChange("branche", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Berater
                </label>
                <Input
                  className="input-yellow"
                  placeholder="Name des Beraters"
                  value={clientInfo.berater}
                  onChange={(e) => handleClientChange("berater", e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Datum
                </label>
                <Input
                  className="input-yellow"
                  type="date"
                  value={clientInfo.datum}
                  onChange={(e) => handleClientChange("datum", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit Questions by Category */}
        {auditCategories.map((category, catIdx) => (
          <Card key={catIdx} className={`border ${category.borderColor}`}>
            <CardHeader className={`${category.bgColor} rounded-t-lg`}>
              <CardTitle className={`text-lg ${category.color}`}>
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {category.questions.map((q) => (
                <div
                  key={q.id}
                  className="rounded-lg border border-slate-200 bg-white p-4 space-y-3"
                >
                  {/* Question header row */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">
                        {q.id}. {q.question}
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {q.hint}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {getStatusBadge(scores[q.id])}
                    </div>
                  </div>

                  {/* Slider */}
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-slate-500 w-4 text-center">0</span>
                    <input
                      type="range"
                      min={0}
                      max={5}
                      step={1}
                      value={scores[q.id] ?? 0}
                      onChange={(e) =>
                        handleScoreChange(q.id, parseInt(e.target.value, 10))
                      }
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-700
                        [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-slate-700 [&::-webkit-slider-thumb]:shadow-md
                        [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-slate-700 [&::-moz-range-thumb]:shadow-md"
                    />
                    <span className="text-xs font-medium text-slate-500 w-4 text-center">5</span>
                    <span className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-sm font-bold text-slate-800">
                      {scores[q.id] !== undefined ? scores[q.id] : "\u2013"}
                    </span>
                  </div>

                  {/* Note toggle */}
                  <div>
                    <button
                      onClick={() => toggleNote(q.id)}
                      className="text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors underline underline-offset-2"
                    >
                      {expandedNotes[q.id] ? "Notiz ausblenden" : "Notiz"}
                    </button>
                    {expandedNotes[q.id] && (
                      <div className="mt-2">
                        <Textarea
                          placeholder="Anmerkungen hier eingeben..."
                          value={notes[q.id] ?? ""}
                          onChange={(e) => handleNoteChange(q.id, e.target.value)}
                          className="text-sm"
                          rows={2}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Results Section */}
        <Card className="border-2 border-slate-300">
          <CardHeader>
            <CardTitle className="text-lg">Ergebnis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Category Subtotals */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {auditCategories.map((category, idx) => {
                const catScore = getCategoryScore(idx);
                return (
                  <div
                    key={idx}
                    className={`rounded-lg border p-3 text-center ${category.bgColor} ${category.borderColor}`}
                  >
                    <p className={`text-xs font-semibold ${category.color} truncate`}>
                      {category.name}
                    </p>
                    <p className={`mt-1 text-2xl font-bold ${category.color}`}>
                      {catScore}
                      <span className="text-sm font-normal"> / 20</span>
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Total Score + Progress */}
            <div className="space-y-3">
              <div className="flex items-end justify-between">
                <p className="text-sm font-semibold text-slate-600">
                  Gesamtpunktzahl
                </p>
                <p className="text-3xl font-bold text-slate-800">
                  {totalScore}
                  <span className="text-base font-normal text-slate-500"> / 100</span>
                </p>
              </div>
              <Progress
                value={totalPercentage}
                className="h-5"
                indicatorClassName={getProgressColor()}
              />
            </div>

            {/* Recommendation Box */}
            <div
              className={`rounded-lg border-2 p-5 ${recommendation.bg}`}
            >
              <p className={`text-lg font-bold ${recommendation.text}`}>
                {recommendation.label}
              </p>
              <p className={`mt-1 text-sm ${recommendation.text}`}>
                {recommendation.message}
              </p>
              {totalScore < 40 && (
                <p className={`mt-2 text-sm ${recommendation.text}`}>
                  Empfehlung: Grundlegende L\u00fccken schlie\u00dfen, bevor Werbebudget investiert wird.
                </p>
              )}
              {totalScore >= 40 && totalScore < 70 && (
                <p className={`mt-2 text-sm ${recommendation.text}`}>
                  Empfehlung: Erst Grundlagen verbessern \u2014 noch nicht werben.
                </p>
              )}
              {totalScore >= 70 && (
                <p className={`mt-2 text-sm ${recommendation.text}`}>
                  Empfehlung: Das Unternehmen ist bereit f\u00fcr bezahlte Werbung. Anzeigen k\u00f6nnen gestartet werden!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
