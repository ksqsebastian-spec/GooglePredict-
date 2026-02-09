export interface AvatarAttribute {
  label: string;
  value: string;
}

export interface CustomerAvatar {
  name: string;
  subtitle: string;
  share: string;
  color: string;
  bgColor: string;
  borderColor: string;
  badgeColor: string;
  attributes: AvatarAttribute[];
}

export const customerAvatars: CustomerAvatar[] = [
  {
    name: "Besorgte Helga",
    subtitle: "Hausbesitzerin",
    share: "60%",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    badgeColor: "bg-blue-600",
    attributes: [
      { label: "Alter", value: "45–70 Jahre" },
      { label: "Immobilientyp", value: "Eigentumswohnung oder Einfamilienhaus" },
      { label: "Standort", value: "Hamburg-Nord, Wandsbek, Harburg, Bergedorf" },
      { label: "Fenstertyp", value: "Holzfenster aus den 80er/90er Jahren" },
      { label: "Schmerzpunkte", value: "Zugluft im Winter, steigende Heizkosten, Fenster schwer zu öffnen/schließen" },
      { label: "Emotionaler Treiber", value: "Sorge um Energiekosten, Werterhalt ohne große Renovierung" },
      { label: "Suchverhalten", value: "Google: \"Fenster undicht was tun\", \"Fensterdichtung erneuern Hamburg\"" },
      { label: "Bevorzugter Kontakt", value: "Telefonanruf (füllt KEINE Web-Formulare aus)" },
      { label: "Entscheidungsfaktoren", value: "Vertrauen, fairer Preis, Meisterbetrieb, echte Bewertungen" },
      { label: "Preissensibilität", value: "Mittel — will Preis-Leistung, vergleicht 2-3 Angebote" },
      { label: "Bester Werbe-Ansatz", value: "\"Sparen Sie 500€+ Heizkosten — Dichtungstausch statt teurer Fenstertausch\"" },
      { label: "Empfohlene Keywords", value: "Fensterdichtung erneuern, Zugluft abdichten, Fenster undicht reparieren" },
    ],
  },
  {
    name: "Notfall-Markus",
    subtitle: "Akutfall",
    share: "20%",
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-300",
    badgeColor: "bg-red-600",
    attributes: [
      { label: "Alter", value: "30–55 Jahre" },
      { label: "Immobilientyp", value: "Beliebig — Haus oder Wohnung" },
      { label: "Standort", value: "Hamburg + 30km Radius" },
      { label: "Fenstertyp", value: "Beliebig — Defekt, Sturmschaden, Einbruch" },
      { label: "Schmerzpunkte", value: "Fenster/Tür geht nicht mehr zu, Sicherheitsproblem, dringend" },
      { label: "Emotionaler Treiber", value: "Angst (Sicherheit), Frustration, Zeitdruck" },
      { label: "Suchverhalten", value: "Google um 21 Uhr: \"Tischler Notdienst Hamburg\", \"Fenster Notdienst 24h\"" },
      { label: "Bevorzugter Kontakt", value: "Telefonanruf — sofort. Ruft die ERSTE Nummer an." },
      { label: "Entscheidungsfaktoren", value: "Geschwindigkeit > Preis. Wer zuerst reagiert, gewinnt." },
      { label: "Preissensibilität", value: "Gering — zahlt Aufpreis für sofortigen Service" },
      { label: "Bester Werbe-Ansatz", value: "\"24h Fenster-Notdienst Hamburg — Rückmeldung garantiert in 24 Stunden\"" },
      { label: "Empfohlene Keywords", value: "Tischler Notdienst Hamburg, Fenster Notdienst 24h, Tür klemmt Notdienst" },
    ],
  },
  {
    name: "Verwalter Thomas",
    subtitle: "Hausverwaltung",
    share: "20%",
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    badgeColor: "bg-green-600",
    attributes: [
      { label: "Alter", value: "35–60 Jahre" },
      { label: "Immobilientyp", value: "Verwaltet 5–50+ Einheiten" },
      { label: "Standort", value: "Hamburg + Norddeutschland" },
      { label: "Fenstertyp", value: "Gemischter Bestand — laufende Wartung" },
      { label: "Schmerzpunkte", value: "Braucht zuverlässigen Partner für wiederkehrende Fenster-/Türprobleme" },
      { label: "Emotionaler Treiber", value: "Effizienz, Zuverlässigkeit, ein Anruf löst alles" },
      { label: "Suchverhalten", value: "Sucht NICHT bei Google — verlässt sich auf Netzwerk und Empfehlungen" },
      { label: "Bevorzugter Kontakt", value: "E-Mail zuerst, dann Telefon für laufende Beziehung" },
      { label: "Entscheidungsfaktoren", value: "Zuverlässigkeit, einfache Rechnungen, Mengenrabatt, Komplettservice" },
      { label: "Preissensibilität", value: "Gering pro Auftrag — schätzt Konstanz mehr als Billigstpreis" },
      { label: "Bester Werbe-Ansatz", value: "KEINE Werbung — B2B-Direktansprache. \"Kostenloser Sicherheitscheck für alle Objekte\"" },
      { label: "Empfohlene Keywords", value: "Entfällt — gewinnen durch Akquise, nicht Suchanzeigen" },
    ],
  },
];
