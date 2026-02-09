import * as XLSX from "xlsx";

export function exportToExcel(data: Record<string, unknown>[][], sheetNames: string[], fileName: string) {
  const wb = XLSX.utils.book_new();
  data.forEach((sheetData, i) => {
    const ws = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(wb, ws, sheetNames[i]);
  });
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}

export function exportTableToExcel(
  headers: string[],
  rows: (string | number)[][],
  fileName: string,
  sheetName: string = "Daten"
) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}

export function printSection(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  printWindow.document.write(`
    <html>
      <head>
        <title>Growth Audit Tool — Export</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 24px; color: #1e293b; }
          table { border-collapse: collapse; width: 100%; margin: 12px 0; }
          th, td { border: 1px solid #e2e8f0; padding: 8px 12px; text-align: left; font-size: 13px; }
          th { background: #f1f5f9; font-weight: 600; }
          h1, h2, h3 { margin: 16px 0 8px; }
          .badge { display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600; }
          .badge-green { background: #dcfce7; color: #166534; }
          .badge-orange { background: #ffedd5; color: #9a3412; }
          .badge-red { background: #fee2e2; color: #991b1b; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>${element.innerHTML}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}
