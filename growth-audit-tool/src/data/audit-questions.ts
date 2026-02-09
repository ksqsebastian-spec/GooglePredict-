export interface AuditQuestion {
  id: number;
  question: string;
  hint: string;
}

export interface AuditCategory {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  questions: AuditQuestion[];
}

export const auditCategories: AuditCategory[] = [
  {
    name: "MARKE & POSITIONIERUNG",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    questions: [
      { id: 1, question: "Klare Positionierung auf der Startseite?", hint: "Ein-Satz-Statement, das sofort klar macht, was Sie tun und für wen" },
      { id: 2, question: "Einheitliches visuelles Erscheinungsbild?", hint: "Logo, Farben, Schriften konsistent auf Website, Google-Profil, Social Media" },
      { id: 3, question: "Eigene Landingpage für Haupt-Dienstleistung?", hint: "Separate Seite für den wichtigsten Service, nicht nur die Startseite" },
      { id: 4, question: "Klare Abgrenzung zum Wettbewerb?", hint: "Alleinstellungsmerkmal (USP) klar kommuniziert" },
    ],
  },
  {
    name: "VERTRAUEN & BEWERTUNGEN",
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    questions: [
      { id: 5, question: "Google Unternehmensprofil eingerichtet?", hint: "Vollständig ausgefüllt mit Fotos, Öffnungszeiten, Kategorien" },
      { id: 6, question: "Mindestens 10 echte Google-Bewertungen?", hint: "Echte Kundenbewertungen, keine gekauften oder gefälschten" },
      { id: 7, question: "Durchschnittsbewertung 4,5+ Sterne?", hint: "Hohe Bewertung signalisiert Qualität und Vertrauen" },
      { id: 8, question: "Referenzen / Vorher-Nachher auf Website?", hint: "Fallstudien, Bildergalerien oder Kundenstimmen auf der Website" },
    ],
  },
  {
    name: "TECHNISCHE BEREITSCHAFT",
    color: "text-yellow-700",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    questions: [
      { id: 9, question: "Google Analytics / Tag Manager installiert?", hint: "Tracking-Tools zur Messung von Website-Besuchern und Verhalten" },
      { id: 10, question: "Conversion-Tracking eingerichtet (Anrufe + Formulare)?", hint: "Messung, welche Besucher zu Anfragen werden" },
      { id: 11, question: "Mobil-optimierte Website?", hint: "Schnelle Ladezeit, einfache Navigation, Click-to-Call auf dem Handy" },
      { id: 12, question: "Click-to-Call Button gut sichtbar?", hint: "Telefonnummer als klickbarer Button, prominent platziert" },
    ],
  },
  {
    name: "BETRIEBLICHE BEREITSCHAFT",
    color: "text-amber-800",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    questions: [
      { id: 13, question: "Kapazität für 5-10 zusätzliche Anfragen/Woche?", hint: "Können Sie den Mehrbedarf an Aufträgen auch tatsächlich bedienen?" },
      { id: 14, question: "Reaktionszeit unter 2 Stunden?", hint: "Schnelle Antwort auf Anfragen — entscheidend für Abschlussquote" },
      { id: 15, question: "Klare Preise oder Preisspannen verfügbar?", hint: "Transparenz bei Kosten schafft Vertrauen" },
      { id: 16, question: "Nachfass-System für nicht-konvertierte Anfragen?", hint: "Follow-up per Telefon oder E-Mail bei offenen Anfragen" },
    ],
  },
  {
    name: "WETTBEWERBSPOSITION",
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    questions: [
      { id: 17, question: "Top 3 Wettbewerber bekannt?", hint: "Wissen, wer die Hauptkonkurrenten sind und wie sie sich positionieren" },
      { id: 18, question: "Einzugsgebiet klar definiert?", hint: "Klare geografische Abgrenzung des Servicegebiets" },
      { id: 19, question: "Saisonale Nachfragemuster verstanden?", hint: "Wissen, wann Hochsaison und Nebensaison ist" },
      { id: 20, question: "Empfehlungs- oder Stammkundenprogramm?", hint: "System zur Förderung von Weiterempfehlungen und Wiederkäufen" },
    ],
  },
];
