"use client";

import React, { useState } from "react";
import { actionPlan, ActionMonth } from "@/data/action-plan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { exportTableToExcel, printSection } from "@/lib/export";
import { Download, Printer } from "lucide-react";

type Status = "Offen" | "In Arbeit" | "Erledigt" | "Blockiert";

interface TaskState {
  owner: string;
  dueDate: string;
  status: Status;
}

const STATUS_OPTIONS: Status[] = ["Offen", "In Arbeit", "Erledigt", "Blockiert"];

function getStatusClasses(status: Status): string {
  switch (status) {
    case "In Arbeit":
      return "bg-blue-50 border-blue-300 text-blue-800";
    case "Erledigt":
      return "bg-green-50 border-green-300 text-green-800";
    case "Blockiert":
      return "bg-red-50 border-red-300 text-red-800";
    default:
      return "";
  }
}

export default function ActionPlan() {
  const allTasks = actionPlan.flatMap((month) => month.tasks);

  const [taskStates, setTaskStates] = useState<Record<number, TaskState>>(() => {
    const initial: Record<number, TaskState> = {};
    allTasks.forEach((task) => {
      initial[task.id] = { owner: "", dueDate: "", status: "Offen" };
    });
    return initial;
  });

  const updateTask = (id: number, field: keyof TaskState, value: string) => {
    setTaskStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const getMonthProgress = (month: ActionMonth): number => {
    const total = month.tasks.length;
    if (total === 0) return 0;
    const done = month.tasks.filter((t) => taskStates[t.id]?.status === "Erledigt").length;
    return Math.round((done / total) * 100);
  };

  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => taskStates[t.id]?.status === "Erledigt").length;
  const totalProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleExport = () => {
    const headers = ["Nr.", "Aufgabe", "Details", "Zuständig", "Fällig bis", "Status"];
    const rows = allTasks.map((task) => {
      const state = taskStates[task.id];
      return [
        task.id,
        task.task,
        task.details,
        state.owner,
        state.dueDate,
        state.status,
      ];
    });
    exportTableToExcel(headers, rows, "Aktionsplan", "Aktionsplan");
  };

  const handlePrint = () => {
    printSection("actionplan-content");
  };

  return (
    <div id="actionplan-content" className="space-y-8">
      {/* Header with export buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">90-Tage Aktionsplan</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Verfolgen Sie Ihren Fortschritt Monat für Monat
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Download className="h-4 w-4" />
            Excel Export
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Printer className="h-4 w-4" />
            Drucken
          </button>
        </div>
      </div>

      {/* Month sections */}
      {actionPlan.map((month, monthIndex) => {
        const monthProgress = getMonthProgress(month);

        return (
          <Card key={monthIndex} className="overflow-hidden">
            {/* Colored header bar */}
            <div className={`${month.bgColor} ${month.borderColor} border-b px-6 py-4`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className={`text-lg font-bold ${month.color}`}>
                    {month.title}
                  </h3>
                  <p className={`text-sm font-medium ${month.color} opacity-80`}>
                    {month.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-3 min-w-[200px]">
                  <Progress
                    value={monthProgress}
                    className="h-3 flex-1"
                    indicatorClassName={
                      monthIndex === 0
                        ? "bg-orange-500"
                        : monthIndex === 1
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }
                  />
                  <span className={`text-sm font-semibold ${month.color} whitespace-nowrap`}>
                    {monthProgress}%
                  </span>
                </div>
              </div>
            </div>

            {/* Task list */}
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                {month.tasks.map((task) => {
                  const state = taskStates[task.id];

                  return (
                    <Card
                      key={task.id}
                      className={`border transition-colors ${
                        state.status === "Erledigt"
                          ? "bg-green-50/50 border-green-200"
                          : state.status === "Blockiert"
                          ? "bg-red-50/50 border-red-200"
                          : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        {/* Task header */}
                        <div className="mb-3">
                          <p className="font-semibold text-foreground">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-bold mr-2">
                              {task.id}
                            </span>
                            {task.task}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1 ml-8">
                            {task.details}
                          </p>
                        </div>

                        {/* Inline fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 ml-8">
                          {/* Zuständig */}
                          <div>
                            <label className="text-xs font-medium text-muted-foreground mb-1 block">
                              Zuständig
                            </label>
                            <Input
                              type="text"
                              placeholder="Name eingeben..."
                              value={state.owner}
                              onChange={(e) => updateTask(task.id, "owner", e.target.value)}
                              className="h-9 text-sm"
                            />
                          </div>

                          {/* Fällig bis */}
                          <div>
                            <label className="text-xs font-medium text-muted-foreground mb-1 block">
                              Fällig bis
                            </label>
                            <Input
                              type="date"
                              value={state.dueDate}
                              onChange={(e) => updateTask(task.id, "dueDate", e.target.value)}
                              className="h-9 text-sm"
                            />
                          </div>

                          {/* Status */}
                          <div>
                            <label className="text-xs font-medium text-muted-foreground mb-1 block">
                              Status
                            </label>
                            <Select
                              value={state.status}
                              onChange={(e) =>
                                updateTask(task.id, "status", e.target.value)
                              }
                              className={`h-9 text-sm ${getStatusClasses(state.status)}`}
                            >
                              {STATUS_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Overall progress section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Gesamtfortschritt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress
              value={totalProgress}
              className="h-5"
              indicatorClassName="bg-primary"
            />
            <p className="text-sm font-medium text-muted-foreground text-center">
              {completedTasks} von {totalTasks} Aufgaben erledigt
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
