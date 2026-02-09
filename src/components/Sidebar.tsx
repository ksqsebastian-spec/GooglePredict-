"use client";

import { cn } from "@/lib/utils";
import {
  ClipboardCheck,
  Calculator,
  CalendarDays,
  BarChart3,
  Users,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { id: "scorecard", label: "Audit-Scorecard", icon: ClipboardCheck },
  { id: "keywords", label: "Keyword-Budget-Rechner", icon: Calculator },
  { id: "actionplan", label: "90-Tage-Aktionsplan", icon: CalendarDays },
  { id: "tracker", label: "Monatstracker", icon: BarChart3 },
  { id: "avatars", label: "Kunden-Avatare", icon: Users },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#1e293b] text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#1e293b] text-white flex flex-col transition-transform duration-200",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 border-b border-slate-600">
          <h1 className="text-lg font-bold tracking-tight">Growth Audit Tool</h1>
          <p className="text-xs text-slate-400 mt-1">Wachstums-Audit für lokale Dienstleister</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-600 text-xs text-slate-500">
          Alle Daten lokal im Browser
        </div>
      </aside>
    </>
  );
}
