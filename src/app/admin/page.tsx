"use client";

import React, { useState } from "react";
import { useAppState, RoleType } from "@/context/AppStateContext";
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
  Phone,
  Mail,
  Filter,
  CheckCircle2,
  UserCheck,
} from "lucide-react";

export default function AdminPortal() {
  const { role, competencies, jobRoles, teamMembers, registeredUsers, courses } = useAppState();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [directorySearch, setDirectorySearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");

  const filteredCompetencies = competencies.filter(
    (c) => selectedCategory === "All" || c.category === selectedCategory
  );

  const allAccounts = registeredUsers || teamMembers;

  const filteredUsers = allAccounts.filter((u) => {
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
      u.email.toLowerCase().includes(directorySearch.toLowerCase()) ||
      (u.contactNumber && u.contactNumber.includes(directorySearch)) ||
      u.department.toLowerCase().includes(directorySearch.toLowerCase()) ||
      u.jobTitle.toLowerCase().includes(directorySearch.toLowerCase());
    return matchesRole && matchesSearch;
  });

  if (role !== "admin") {
    return (
      <div className="p-8 rounded-3xl border border-rose-500/30 bg-rose-950/20 text-center space-y-4 my-12">
        <AlertTriangle className="h-10 w-10 text-rose-400 mx-auto" />
        <h2 className="text-lg font-bold text-white">403 Forbidden: Super Admin Governance Clearance Required</h2>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          You are currently authenticated with <strong>{role.toUpperCase()}</strong> clearance. Access to Global User Directory auditing and Master Competency Framework definitions is strictly restricted to authorized Super Admins.
        </p>
      </div>
    );
  }

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
              Super Admin authority to audit all registered enterprise accounts (Learners, Managers, Trainers), govern Level 1–5 competency scales, inspect cross-department skill matrices, and analyze training ROI.
            </p>
          </div>

          {/* Org KPI Summary */}
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center min-w-[95px]">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">Total Accounts</span>
              <span className="text-xl font-black text-white">{allAccounts.length} Active</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center min-w-[95px]">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">Framework</span>
              <span className="text-xl font-black text-violet-400">{competencies.length} Skills</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center min-w-[95px]">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">Org ROI</span>
              <span className="text-xl font-black text-emerald-400">3.8x</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global User Directory & RBAC Audit Section */}
      <section id="directory" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">
              Super Admin Governance
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-400" />
              Global User Directory & Role-Based Access Control Audit
            </h2>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={directorySearch}
                onChange={(e) => setDirectorySearch(e.target.value)}
                className="bg-white/[0.04] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 font-mono w-48 sm:w-64"
              />
            </div>

            <div className="flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/10 text-xs">
              {["All", "learner", "manager", "trainer", "admin"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition-all ${
                    roleFilter === r
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {r === "All" ? "All Roles" : r}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#090b14]/90 overflow-hidden shadow-2xl">
          <div className="divide-y divide-white/5">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                {/* User Identity & Contact */}
                <div className="flex items-center gap-3.5">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{user.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          user.role === "admin"
                            ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                            : user.role === "manager"
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                            : user.role === "trainer"
                            ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 font-mono mt-0.5">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-neutral-500" />
                        {user.email}
                      </span>
                      {user.contactNumber && (
                        <span className="flex items-center gap-1 text-neutral-300">
                          <Phone className="h-3 w-3 text-emerald-400" />
                          {user.contactNumber}
                        </span>
                      )}
                      <span>•</span>
                      <span>{user.department}</span>
                    </div>
                  </div>
                </div>

                {/* Job Title & Verified Metrics */}
                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="text-right hidden sm:block">
                    <span className="text-white font-semibold block">{user.jobTitle}</span>
                    <span className="text-[10px] text-neutral-500">{user.employeeId}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-center min-w-[75px]">
                    <span className="text-[9px] text-neutral-500 uppercase block">XP</span>
                    <span className="text-xs font-bold text-emerald-400">{user.points}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-center min-w-[75px]">
                    <span className="text-[9px] text-neutral-500 uppercase block">Certs</span>
                    <span className="text-xs font-bold text-white">{user.completedCoursesCount}</span>
                  </div>

                  <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] flex items-center gap-1 font-bold">
                    <UserCheck className="h-3 w-3" /> RBAC Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Master Competency Framework Editor */}
      <section id="framework" className="space-y-4 pt-4">
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
            {["All", "Cloud & Infrastructure", "Software Engineering", "Product & Agile", "Leadership & Collaboration", "Enterprise Storage & Security"].map((cat) => (
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
          members={allAccounts}
          competencies={competencies}
        />
      </section>
    </div>
  );
}
