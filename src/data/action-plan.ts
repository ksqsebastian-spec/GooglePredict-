export interface ActionTask {
  id: number;
  task: string;
  details: string;
}

export interface ActionMonth {
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
  borderColor: string;
  tasks: ActionTask[];
}

export const actionPlan: ActionMonth[] = [
  {
    title: "MONAT 1",
    subtitle: "GRUNDLAGEN SCHAFFEN",
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-300",
    tasks: [
      {
        id: 1,
        task: "Fake-Bewertungen von Website entfernen",
        details: "Gefälschte Bewertungen von der Website entfernen; nur echte Bewertungen zeigen oder Bereich komplett entfernen.",
      },
      {
        id: 2,
        task: "Google Unternehmensprofil einrichten",
        details: "Kategorien festlegen (z.B. Tischlerei, Fensterreparatur, Türenreparatur), 10+ Arbeitsfotos hochladen, Einzugsgebiet definieren.",
      },
      {
        id: 3,
        task: "10-15 echte Google-Bewertungen sammeln",
        details: "Zufriedene Bestandskunden anrufen, Bewertungslink senden, 1-2 Bewertungen pro Tag anpeilen, keine finanziellen Anreize.",
      },
      {
        id: 4,
        task: "Eigene Landingpage für Dichtungstausch bauen",
        details: "Aufbau: Problem (Zugluft, Heizkosten) → Lösung (Dichtungstausch) → Beweis (Bewertungen) → CTA (Jetzt anrufen).",
      },
      {
        id: 5,
        task: "Google Analytics + Tag Manager installieren",
        details: "Besucher, Seitenaufrufe und Formular-Absendungen tracken.",
      },
      {
        id: 6,
        task: "Anruf-Tracking einrichten",
        details: "Tracking-Telefonnummer nutzen (z.B. matelso), um Anrufe den Anzeigen zuordnen zu können.",
      },
      {
        id: 7,
        task: "Positionierung schärfen: EIN Haupt-Service wählen",
        details: "Empfehlung: Dichtungstausch zur Energieeinsparung als Haupt-Dienstleistung positionieren.",
      },
      {
        id: 8,
        task: "Website-Texte überarbeiten: Ergebnisse statt Features",
        details: "Statt 'Wir bieten Dichtungstausch' → 'Sparen Sie 500€+ Heizkosten — Dichtungstausch in einem Termin'.",
      },
    ],
  },
  {
    title: "MONAT 2",
    subtitle: "GOOGLE ADS STARTEN",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    tasks: [
      {
        id: 9,
        task: "Google Suchanzeigen-Kampagne starten",
        details: "Start: 10-15 Long-Tail-Keywords, 500-800€/Monat Budget, nur Suchnetzwerk (kein Display).",
      },
      {
        id: 10,
        task: "3 Anzeigenvarianten pro Keyword-Gruppe schreiben",
        details: "Fokus: Energieeinsparung, Kosten vs. neue Fenster, 24h Rückmeldung, Preisanker.",
      },
      {
        id: 11,
        task: "Conversion-Tracking in Google Ads einrichten",
        details: "Ads mit Analytics verknüpfen, Anrufe/Formulare/Click-to-Call als Conversions tracken.",
      },
      {
        id: 12,
        task: "Wöchentliche Optimierung: Keywords prüfen",
        details: "Jeden Freitag: Klicks/Conversions prüfen, Keywords mit 50+ Klicks ohne Conversion pausieren.",
      },
      {
        id: 13,
        task: "Weiter Bewertungen sammeln (Ziel: 20+)",
        details: "Nach jedem abgeschlossenen Auftrag Bewertung mit Fotos anfragen.",
      },
      {
        id: 14,
        task: "Retargeting-Zielgruppe aufbauen",
        details: "Google Remarketing-Tag installieren, Zielgruppe aus Website-Besuchern für Monat 3 aufbauen.",
      },
    ],
  },
  {
    title: "MONAT 3",
    subtitle: "OPTIMIEREN & SKALIEREN",
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    tasks: [
      {
        id: 15,
        task: "Auf erfolgreiche Keywords verdoppeln",
        details: "Budget auf Top 3-5 konvertierende Keywords erhöhen, alles andere pausieren.",
      },
      {
        id: 16,
        task: "Display-Retargeting starten",
        details: "100-200€/Monat, Anzeigen an Nicht-Konvertierer, einfache Creatives (Marke + Telefon).",
      },
      {
        id: 17,
        task: "Notdienst-Keyword-Kampagne hinzufügen",
        details: "Separate Kampagne für Notdienst-Keywords (höherer CPC, höhere Abschlussquote), 24h-Erreichbarkeit sicherstellen.",
      },
      {
        id: 18,
        task: "Erste ROI-Analyse: kompletter Funnel",
        details: "Tatsächliche Kosten pro Neukunde über den gesamten Funnel berechnen (Ausgaben → Klicks → Anfragen → Kunden → Umsatz).",
      },
      {
        id: 19,
        task: "Ziel: 25+ Google-Bewertungen",
        details: "Bewertungstempo beibehalten, Bewertungen verstärken sich gegenseitig im Effekt.",
      },
      {
        id: 20,
        task: "Hausverwaltungen ansprechen (B2B)",
        details: "10 Hausverwaltungen in Hamburg identifizieren, Direktansprache mit Wartungsservice-Angebot.",
      },
      {
        id: 21,
        task: "Empfehlungsprogramm aufbauen",
        details: "Zufriedene Kunden um Empfehlungen bitten, kostenlosen Sicherheitscheck als Anreiz anbieten.",
      },
    ],
  },
];
