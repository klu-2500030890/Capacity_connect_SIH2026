"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Badge } from "@/components/ui/Badge";
import { CompetencyHeatmap } from "@/components/competency/CompetencyHeatmap";
import {
  Building2,
  Sliders,
  Grid,
  Users,
  BarChart3,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Award,
  Layers,
  Search,
} from "lucide-react";

export default function AdminPortal() {
  const { competencies, jobRoles, teamMembers, courses } = useAppState();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [directorySearch, setDirectorySearch] = useState("");

  const filteredCompetencies = competencies.filter(
    (c) => selectedCategory === "All" || c.category === selectedCategory
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-violet-950/40 via-[#0b0e18] to-violet-950/40 p-6 md:p-8 backdrop-blur-2xl shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <Badge variant="purple" size="sm" dot>Super Admin Command</Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Enterprise Competency Governance & ROI
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Define organization-wide skill frameworks (Levels 1–5), govern job role benchmarks, monitor cross-department competency heatmaps, and audit training effectiveness.
            </p>
          </div>

          {/* Org KPI Summary */}
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center min-w-[95px]">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">Employees</span>
              <span className="text-xl font-black text-white">25 Active</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center min-w-[95px]">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">Framework</span>
              <span className="text-xl font-black text-violet-400">15 Skills</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center min-w-[95px]">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">Org ROI</span>
              <span className="text-xl font-black text-emerald-400">3.8x</span>
            </div>
          </div>
        </div>
      </div>

      {/* Master Competency Framework Editor */}
      <section id="framework" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-violet-400 font-bold">
              Core Architecture
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="h-5 w-5 text-violet-400" />
              Master Competency Framework (Level 1–5 Standard)
            </h2>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {["All", "Cloud & Infrastructure", "Software Engineering", "Product & Agile", "Leadership & Collaboration"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl border text-[11px] font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-violet-500/20 text-violet-300 border-violet-500/40 font-bold"
                    : "bg-white/[0.02] text-neutral-400 border-white/5 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCompetencies.map((comp) => (
            <div
              key={comp.id}
              className="p-5 rounded-3xl border border-white/10 bg-[#090b14]/90 space-y-3 shadow-xl hover:border-violet-500/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-300 border border-violet-500/20 text-[10px] font-mono">
                  {comp.category}
                </span>
                <span className="text-[10px] font-mono text-neutral-500">ID: {comp.id}</span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{comp.name}</h3>
                <p className="text-xs text-neutral-400 mt-1">{comp.description}</p>
              </div>

              {/* Levels Checklist */}
              <div className="space-y-1.5 pt-2 border-t border-white/5 text-[11px]">
                {comp.levels.map((lvl) => (
                  <div key={lvl.level} className="flex items-start gap-2 text-neutral-300">
                    <span className="font-mono text-violet-400 font-bold shrink-0">L{lvl.level}:</span>
                    <span className="text-neutral-400 truncate"><strong>{lvl.title}</strong> — {lvl.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Org-Wide Competency Heatmap */}
      <section id="heatmap" className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
              Organization-Wide Distribution
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Grid className="h-5 w-5 text-cyan-400" />
              Cross-Department Skill Matrix & Heatmap
            </h2>
          </div>
        </div>

        <CompetencyHeatmap
          members={teamMembers}
          competencies={competencies}
        />
      </section>

      {/* User Directory */}
      <section id="directory" className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">
              Enterprise Talent Roster
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-400" />
              Employee Directory & Role Mapping
            </h2>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#090b14]/90 overflow-hidden">
          <div className="divide-y divide-white/5">
            {teamMembers.map((user) => (
              <div key={user.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">{user.name}</span>
                    <span className="text-[10px] text-neutral-400">{user.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs">
                  <span className="text-indigo-400 font-mono hidden sm:inline">{user.jobTitle}</span>
                  <span className="text-emerald-400 font-mono font-bold">{user.points} XP</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono">
                    {user.completedCoursesCount} Certs
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
