"use client";

import React, { useState } from "react";
import { useAppState, RoleType, DEMO_USERS } from "@/context/AppStateContext";
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
  AlertTriangle,
  Key,
  Plus,
  ArrowRight,
  Zap,
  Activity,
  Lock,
} from "lucide-react";

export default function AdminPortal() {
  const {
    role,
    login,
    competencies,
    jobRoles,
    teamMembers,
    registeredUsers,
    courses,
    setDemoToast,
  } = useAppState();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [directorySearch, setDirectorySearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [showAddCompetencyModal, setShowAddCompetencyModal] = useState(false);

  // New Competency State
  const [newCompName, setNewCompName] = useState("");
  const [newCompCategory, setNewCompCategory] = useState<"Technical" | "Domain" | "Leadership" | "Process">("Technical");
  const [newCompDesc, setNewCompDesc] = useState("");

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

  const handlePromoteRole = (userId: string, newRole: RoleType) => {
    setDemoToast({
      message: `User clearance updated to ${newRole.toUpperCase()} on active LDAP directory.`,
      type: "success",
    });
  };

  const handleAddCompetency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompName.trim()) return;
    setDemoToast({
      message: `New competency '${newCompName}' published to Enterprise Framework (Levels 1-5).`,
      type: "success",
    });
    setShowAddCompetencyModal(false);
    setNewCompName("");
    setNewCompDesc("");
  };

  // IF NOT AUTHENTICATED AS ADMIN: Provide direct 1-Click Clearance Activation bridge!
  if (role !== "admin") {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 rounded-3xl border border-violet-500/30 bg-gradient-to-b from-[#0e101f] to-[#080911] text-center space-y-6 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-violet-600/20 border border-violet-500/30 text-violet-400 flex items-center justify-center mx-auto shadow-lg shadow-violet-600/20">
          <Key className="h-7 w-7 animate-pulse" />
        </div>

        <div className="space-y-2">
          <Badge variant="purple" size="sm" dot>Super Admin Governance Gateway</Badge>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Executive Governance Clearance Required
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
            You are currently accessing this workspace with <strong className="text-white">{role.toUpperCase()}</strong> clearance. To audit user accounts and define competency frameworks, activate Super Admin status.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-neutral-300 space-y-2 text-left">
          <div className="flex items-center justify-between text-neutral-400">
            <span>Executive Account:</span>
            <span className="text-violet-300 font-bold">Dr. Elena Rostova</span>
          </div>
          <div className="flex items-center justify-between text-neutral-400">
            <span>Corporate Title:</span>
            <span className="font-mono text-white">Chief Learning Officer & Super Admin</span>
          </div>
          <div className="flex items-center justify-between text-neutral-400">
            <span>Enterprise Email:</span>
            <span className="font-mono text-emerald-400">elena.rostova@capacityconnect.io</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => login("elena.rostova@capacityconnect.io", "Passcode@2026")}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-xl shadow-violet-600/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>1-Click Activate Super Admin Clearance</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
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
              Enterprise Competency Governance & Executive ROI
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
              Global User Directory & Role-Based Access Control Audit ({filteredUsers.length})
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
                  className={`px-2.5 py-1 rounded-lg font-semibold capitalize transition-all ${
                    roleFilter === r
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User Directory Table */}
        <div className="rounded-3xl border border-white/10 bg-[#090b14]/90 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/[0.02] text-neutral-400 font-mono text-[10px] uppercase">
                <tr>
                  <th className="py-3 px-4">Employee Identity</th>
                  <th className="py-3 px-4">Role Clearance</th>
                  <th className="py-3 px-4">Department & Title</th>
                  <th className="py-3 px-4">Verified Contact</th>
                  <th className="py-3 px-4">Progression XP</th>
                  <th className="py-3 px-4 text-right">Clearance Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user) => {
                  const roleBadgeColor =
                    user.role === "learner"
                      ? "success"
                      : user.role === "manager"
                      ? "cyan"
                      : user.role === "trainer"
                      ? "purple"
                      : "purple";

                  return (
                    <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover border border-white/10"
                          />
                          <div>
                            <span className="font-bold text-white block">{user.name}</span>
                            <span className="text-[10px] text-neutral-400 font-mono">{user.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <Badge variant={roleBadgeColor} size="sm">
                          {user.role.toUpperCase()}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-neutral-200 block font-medium">{user.department}</span>
                        <span className="text-[10px] text-neutral-400 font-mono">{user.jobTitle}</span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-emerald-400 text-[11px]">
                        {user.contactNumber || "+1 (555) 000-0000"}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-indigo-300 font-bold">
                        {user.points || 100} XP
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handlePromoteRole(user.id, "manager")}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-indigo-600 text-neutral-300 hover:text-white border border-white/10 transition-colors text-[10px] font-mono"
                        >
                          Audit Clearance
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Master Competency Framework Matrix (L1 to L5) */}
      <section id="framework" className="space-y-4 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-violet-400 font-bold">
              Standardization Engine
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="h-5 w-5 text-violet-400" />
              Enterprise Master Competency Framework (Levels 1 to 5)
            </h2>
          </div>

          <button
            onClick={() => setShowAddCompetencyModal(true)}
            className="px-4 py-2 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all flex items-center gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" /> Define New Competency
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompetencies.map((comp) => (
            <div
              key={comp.id}
              className="rounded-3xl border border-white/10 bg-[#090b14]/90 p-5 space-y-4 shadow-xl flex flex-col justify-between hover:border-violet-500/40 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-violet-400 uppercase font-bold">
                    {comp.category}
                  </span>
                  <Badge variant="purple" size="sm">
                    Weight: {comp.weight}x
                  </Badge>
                </div>
                <h3 className="text-sm font-bold text-white">{comp.name}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
                  {comp.description}
                </p>
              </div>

              {/* Levels Rubric Indicator */}
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                <span className="text-[10px] uppercase font-mono text-neutral-500 block">
                  Level 1-5 Mastery Rubrics
                </span>
                <div className="grid grid-cols-5 gap-1 text-center font-mono text-[9px]">
                  <div className="p-1 rounded bg-white/5 text-neutral-400" title="Foundational">L1</div>
                  <div className="p-1 rounded bg-indigo-500/10 text-indigo-300" title="Practitioner">L2</div>
                  <div className="p-1 rounded bg-cyan-500/10 text-cyan-300" title="Specialist">L3</div>
                  <div className="p-1 rounded bg-emerald-500/10 text-emerald-300" title="Expert">L4</div>
                  <div className="p-1 rounded bg-violet-500/20 text-violet-300 font-bold" title="Fellow">L5</div>
                </div>
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
              Cross-Department Distribution
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Grid className="h-5 w-5 text-cyan-400" />
              Enterprise-Wide Competency Heatmap
            </h2>
          </div>
        </div>

        <CompetencyHeatmap members={allAccounts} competencies={competencies} />
      </section>

      {/* Add Competency Modal */}
      {showAddCompetencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0c0f1d] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Define New Enterprise Competency</h3>
              <button
                onClick={() => setShowAddCompetencyModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCompetency} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-neutral-300">Competency Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Multi-Cloud Cyber Resilience"
                  value={newCompName}
                  onChange={(e) => setNewCompName(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-neutral-300">Category</label>
                <select
                  value={newCompCategory}
                  onChange={(e) => setNewCompCategory(e.target.value as any)}
                  className="w-full bg-[#05060b] border border-white/10 rounded-xl px-3.5 py-2 text-white font-mono"
                >
                  <option value="Technical">Technical</option>
                  <option value="Domain">Domain</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Process">Process</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-neutral-300">Description & Behavioral Rubric</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe key proficiency expectations from Level 1 (Novice) to Level 5 (Fellow)..."
                  value={newCompDesc}
                  onChange={(e) => setNewCompDesc(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCompetencyModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold"
                >
                  Publish Competency
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
