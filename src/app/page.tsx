"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AuditScorecard from "@/components/AuditScorecard";
import KeywordCalculator from "@/components/KeywordCalculator";
import ActionPlan from "@/components/ActionPlan";
import MonthlyTracker from "@/components/MonthlyTracker";
import CustomerAvatars from "@/components/CustomerAvatars";

export default function Home() {
  const [activeTab, setActiveTab] = useState("scorecard");

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 lg:ml-0 overflow-auto">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8 max-w-7xl mx-auto">
          {activeTab === "scorecard" && <AuditScorecard />}
          {activeTab === "keywords" && <KeywordCalculator />}
          {activeTab === "actionplan" && <ActionPlan />}
          {activeTab === "tracker" && <MonthlyTracker />}
          {activeTab === "avatars" && <CustomerAvatars />}
        </div>
      </main>
    </div>
  );
}
