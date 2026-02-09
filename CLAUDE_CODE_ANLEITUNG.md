# Claude Code Anleitung: "Growth Audit Tool" — Interaktive Web-App

## Was soll gebaut werden

Eine lokale Web-App (Next.js + Tailwind + shadcn/ui), die du im Browser öffnen kannst.
Das Tool ersetzt die Excel-Vorlage durch eine schönere, interaktivere Oberfläche.
Es ist ein internes Tool für Berater, die lokale Dienstleistungsunternehmen (Handwerker, Tischler etc.) beim Wachstum mit Google Ads unterstützen.

---

## Prompt für Claude Code

Kopiere den folgenden Block komplett in Claude Code und starte damit:

---

```
Baue mir eine lokale Next.js Web-App (TypeScript, Tailwind CSS, shadcn/ui) namens "Growth Audit Tool".

Die App ist komplett auf Deutsch. Sie hat 5 Hauptbereiche als Tabs/Seiten in einer Sidebar-Navigation:

## 1. AUDIT-SCORECARD (Startseite)

Oben: Kundeninfo-Felder (Kundenname, Website, Stadt, Branche, Berater, Datum).
Darunter: 20 Prüfpunkte in 5 Kategorien:

### Kategorien mit je 4 Fragen:
- MARKE & POSITIONIERUNG (blau)
- VERTRAUEN & BEWERTUNGEN (grün)
- TECHNISCHE BEREITSCHAFT (gelb/gold)
- BETRIEBLICHE BEREITSCHAFT (braun)
- WETTBEWERBSPOSITION (lila)

Jede Frage hat:
- Frage-Text (fett)
- Hinweis-Text (grau, kleiner)
- Slider oder Dropdown 0-5
- Status-Badge: 0-1 = "KRITISCH" (rot), 2-3 = "NACHBESSERN" (orange), 4-5 = "GUT" (grün)
- Optionales Notiz-Feld

Unten: Gesamtpunktzahl (/100) mit großem visuellen Fortschrittsbalken.
Empfehlung als farbige Box:
- 0-39: Rot — "NICHT BEREIT — grundlegende Lücken schließen"
- 40-69: Orange — "ERST GRUNDLAGEN VERBESSERN — noch nicht werben"
- 70-100: Grün — "BEREIT FÜR WERBUNG — Anzeigen starten!"

## 2. KEYWORD-BUDGET-RECHNER

Oben: 4 Eingabefelder (gelber Hintergrund):
- Monatliches Werbebudget (€) — Standard: 600
- Conversion-Rate der Landingpage (%) — Standard: 10%
- Abschlussquote Lead→Kunde (%) — Standard: 35%
- Durchschnittlicher Auftragswert (€) — Standard: 500

Darunter: Tabelle mit Spalten:
| Keyword | Ø CPC (€) | Suchvolumen/Mo | Klicks/Mo | Anfragen/Mo | Kunden/Mo | Umsatz/Mo |

Vorbefüllt mit diesen 12 Keywords (CPC und Suchvolumen als editierbare Inputs):
- Fensterdichtung erneuern Hamburg (3.50€, 210)
- Fenster undicht reparieren Hamburg (4.20€, 170)
- Zugluft Fenster abdichten Hamburg (2.80€, 140)
- Holzfenster Dichtung tauschen (3.00€, 120)
- Tischler Notdienst Hamburg (6.50€, 320)
- Fenster reparieren Hamburg (5.20€, 280)
- Fensterwartung Hamburg (2.50€, 90)
- Repair Care Holzfenster Hamburg (1.80€, 40)
- Sicherheitstechnik Fenster Hamburg (4.00€, 60)
- Dichtungstausch Fenster Kosten (2.20€, 150)
- Fenster Notdienst Hamburg 24h (7.00€, 180)
- Tischlerei Fenster Hamburg (4.50€, 200)

Plus 3 leere Zeilen zum Hinzufügen.

Berechnung (live, reaktiv):
- Klicks/Mo = Budget / CPC
- Anfragen/Mo = Klicks × Conversion-Rate
- Kunden/Mo = Anfragen × Abschlussquote
- Umsatz/Mo = Kunden × Auftragswert

Unten: ROI-Zusammenfassung als Cards:
- Bester Fall (günstigstes Keyword): Umsatz und ROI
- Schlechtester Fall (teuerstes Keyword): Umsatz und ROI
- Mittlerer Fall: Durchschnitt

## 3. 90-TAGE-AKTIONSPLAN

Drei Abschnitte mit Farbcodierung:
- MONAT 1 (rot/orange) — 8 Aufgaben
- MONAT 2 (blau) — 6 Aufgaben
- MONAT 3 (grün) — 7 Aufgaben

Jede Aufgabe als Card/Zeile mit:
- Aufgabenname (fett)
- Details (grauer Text)
- Zuständig (editierbares Feld)
- Fällig bis (Datum-Picker)
- Status (Dropdown: Offen / In Arbeit / Erledigt / Blockiert)

Fortschrittsbalken pro Monat und gesamt.

Die genauen Aufgaben findest du in der Excel-Datei "Wachstums_Audit_Vorlage_DE.xlsx" im Tab "3. 90-Tage-Aktionsplan".

## 4. MONATSTRACKER

Tabelle: 12 Monate (Jan-Dez) als Spalten.

Eingabe-Zeilen (gelb):
- Werbeausgaben (€)
- Impressionen
- Klicks
- Anrufe (aus Werbung)
- Formular-Anfragen
- Anfragen gesamt
- Gewonnene Kunden
- Umsatz aus Werbekunden (€)
- Google-Bewertungen (kumuliert)
- Website-Besucher (gesamt)

Berechnete Zeilen (automatisch, visuell abgesetzt):
- Klickrate (CTR) = Klicks/Impressionen
- Kosten pro Klick (CPC) = Ausgaben/Klicks
- Kosten pro Anfrage (CPL) = Ausgaben/Anfragen
- Kosten pro Neukunde (CAC) = Ausgaben/Kunden
- Conversion-Rate = Anfragen/Klicks
- Abschlussquote = Kunden/Anfragen
- ROAS = Umsatz/Ausgaben
- ROI = (Umsatz-Ausgaben)/Ausgaben

BONUS: Zeige ein kleines Liniendiagramm (recharts) für die Entwicklung von Ausgaben vs. Umsatz über die Monate.

## 5. KUNDEN-AVATARE

Drei nebeneinander liegende Cards (responsive, auf Mobile untereinander):

### "Besorgte Helga" — Hausbesitzerin (blau, 60%)
### "Notfall-Markus" — Akutfall (rot, 20%)
### "Verwalter Thomas" — Hausverwaltung (grün, 20%)

Jede Card zeigt:
- Avatar-Name und Umsatzanteil als Badge
- Eigenschaft-Wert-Paare als kompakte Liste:
  Alter, Immobilientyp, Standort, Fenstertyp, Schmerzpunkte, Emotionaler Treiber, Suchverhalten, Bevorzugter Kontakt, Entscheidungsfaktoren, Preissensibilität, Bester Werbe-Ansatz, Empfohlene Keywords

Die konkreten Werte findest du in der Excel-Datei.

## GLOBALE ANFORDERUNGEN

- Sprache: Komplett Deutsch (UI, Labels, Platzhalter, Tooltips)
- Design: Dunkel/Navy Sidebar, heller Content-Bereich, gelbe Input-Felder, saubere Typografie
- State: Alle Daten im React State (kein Backend nötig). Optional: localStorage für Persistenz
- Export: Button "Als PDF exportieren" auf jeder Seite (nutze react-to-print oder html2canvas)
- Export: Button "Als Excel exportieren" (nutze xlsx/SheetJS library)
- Responsive: Funktioniert auf Laptop und Tablet
- Die App soll lokal laufen mit `npm run dev`

## TECHNISCHE DETAILS

- Framework: Next.js 14 App Router
- Styling: Tailwind CSS
- UI-Komponenten: shadcn/ui (Tabs, Cards, Input, Select, Badge, Progress, Table)
- Charts: recharts
- Export: SheetJS (xlsx) + react-to-print
- TypeScript durchgängig
- Keine Datenbank — alles Client-seitig

Erstelle die komplette App mit allen 5 Bereichen. Starte mit dem Projekt-Setup, dann baue jeden Bereich Schritt für Schritt.
```

---

## So benutzt du diese Anleitung

1. Öffne dein Terminal
2. Navigiere zu einem Ordner, in dem das Projekt liegen soll
3. Starte Claude Code: `claude`
4. Kopiere den kompletten Prompt oben rein und drücke Enter
5. Claude Code wird:
   - Das Next.js Projekt erstellen
   - Alle Abhängigkeiten installieren
   - Die 5 Seiten/Tabs bauen
   - Die gesamte Logik implementieren
6. Am Ende: `npm run dev` → Öffne `http://localhost:3000`

## Optionale Erweiterungen (als Follow-up-Prompts)

Nach dem initialen Build kannst du diese Erweiterungen anfordern:

- "Füge einen Dark Mode Toggle hinzu"
- "Speichere alle Daten automatisch in localStorage, damit sie bei Seiten-Refresh erhalten bleiben"
- "Füge einen 'Neuer Kunde' Button hinzu, der alle Felder zurücksetzt"
- "Erstelle eine Druckansicht, die alle 5 Bereiche als sauberen Report auf einer Seite zeigt"
- "Füge ein Dashboard als Startseite hinzu mit einer Zusammenfassung aller Bereiche"
- "Mache die Keywords-Liste editierbar — Benutzer sollen Keywords hinzufügen und löschen können"
- "Verbinde die App mit der Google Ads API, um echte CPC-Daten zu ziehen" (braucht API-Key)

## Hinweise

- Die App braucht KEIN Backend und KEINE Datenbank
- Alle Berechnungen passieren live im Browser
- Die Daten sind Beispieldaten für Karl Brink Tischlerei Hamburg
- Du kannst die Daten jederzeit für andere Kunden anpassen
- Die Excel-Vorlage "Wachstums_Audit_Vorlage_DE.xlsx" enthält alle Referenzdaten
