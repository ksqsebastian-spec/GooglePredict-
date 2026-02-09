"use client";

import React from "react";
import { customerAvatars } from "@/data/avatars";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { printSection } from "@/lib/export";
import { Printer, User } from "lucide-react";

export default function CustomerAvatars() {
  const handleExportPDF = () => {
    printSection("avatars-content");
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Export Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Kunden-Avatare</h1>
        <button
          onClick={handleExportPDF}
          className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
        >
          <Printer className="h-4 w-4" />
          Als PDF exportieren
        </button>
      </div>

      {/* Avatars Content */}
      <div id="avatars-content" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {customerAvatars.map((avatar) => (
          <Card
            key={avatar.name}
            className={`border-t-4 ${avatar.borderColor} flex flex-col`}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                {/* Avatar Icon */}
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${avatar.bgColor}`}
                >
                  <User className={`h-6 w-6 ${avatar.color}`} />
                </div>

                {/* Name, Subtitle, Badge */}
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-xl font-bold leading-tight">
                    {avatar.name}
                  </CardTitle>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {avatar.subtitle}
                  </p>
                  <Badge
                    className={`mt-2 ${avatar.badgeColor} border-transparent text-white`}
                  >
                    {avatar.share} Umsatzanteil
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 pt-0">
              <div className="divide-y divide-slate-100">
                {avatar.attributes.map((attr) => (
                  <div key={attr.label} className="py-2">
                    <dt className="text-sm font-medium text-slate-700">
                      {attr.label}
                    </dt>
                    <dd className="mt-0.5 text-sm text-muted-foreground">
                      {attr.value}
                    </dd>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
