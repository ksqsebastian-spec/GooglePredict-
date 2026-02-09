import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Growth Audit Tool",
  description: "Wachstums-Audit für lokale Dienstleistungsunternehmen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
