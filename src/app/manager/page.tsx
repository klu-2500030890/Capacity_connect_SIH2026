"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Badge } from "@/components/ui/Badge";
import { CompetencyHeatmap } from "@/components/competency/CompetencyHeatmap";
import {
  Grid,
  Users,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Send,
  Sparkles,
  BarChart3,
  Award,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Clock,
  UserCheck,
} from "lucide-react";

export default function ManagerPortal() {
  const {
    role,
    teamMembers,
    currentProfile,
    competencies,
    courses,
    enrollments,
    nudgeTeamMember,
    nominateMember,
  } = useAppState();

  const directReports = teamMembers.filter((m) => m.role === "learner");

  const [selectedCourseForNomination, setSelectedCourseForNomination] = useState(courses[0].id);
  const [selectedMemberForNomination, setSelectedMemberForNomination] = useState(
    directReports[0]?.id || teamMembers[0].id
  );

  const handleNominateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nominateMember(selectedMemberForNomination, selectedCourseForNomination);
  };

  // Find overdue / at-risk team members
  const overdueEnrollments = enrollments
    .filter((e) => e.status === "overdue" || (e.status === "in_progress" && e.progressPercent < 40))
    .map((e) => {
      const member = directReports.find((m) => m.id === e.userId);
      const course = courses.find((c) => c.id === e.courseId);
      return { ...e, member, course };
    })
    .filter((e) => e.member !== undefined && e.course !== undefined);

  if (role !== "manager") {
    return (
      <div className="p-8 rounded-3xl border border-rose-500/30 bg-rose-950/20 text-center space-y-4 my-12">
        <AlertTriangle className="h-10 w-10 text-rose-400 mx-auto" />
        <h2 className="text-lg font-bold text-white">403 Forbidden: People Leadership Clearance Required</h2>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          You are currently authenticated with <strong>{role.toUpperCase()}</strong> clearance. Access to Team Competency Heatmaps and Manager Intervention Nudges is restricted to People Leads.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Top Welcome Banner */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-950/40 via-[#0b0e18] to-cyan-950/40 p-6 md:p-8 backdrop-blur-2xl shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <Badge variant="cyan" size="sm" dot>People Leadership Hub</Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Engineering Team Competency Command
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Managing 4 platform engineers across 15 competency frameworks. Track team proficiency heatmaps, disburse 1-click training nudges, and nominate engineers for role paths.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center min-w-[95px]">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">Completion</span>
              <span className="text-xl font-black text-emerald-400">88.4%</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center min-w-[95px]">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">At-Risk</span>
              <span className="text-xl font-black text-rose-400">{overdueEnrollments.length}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center min-w-[95px]">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block">Avg Level</span>
              <span className="text-xl font-black text-cyan-300">L3.2</span>
            </div>
          </div>
        </div>
      </div>

      {/* PILLAR 2: Team Competency Heatmap Matrix */}
      <section id="heatmap" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
              Team Proficiency Distribution
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Grid className="h-5 w-5 text-cyan-400" />
              Live Team Competency Heatmap (L1–L5)
            </h2>
          </div>
          <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
            Click any cell to inspect assessment history
          </span>
        </div>

        <CompetencyHeatmap
          members={directReports}
          competencies={competencies}
          onNudgeMember={(memberId, memberName, compName) =>
            nudgeTeamMember(memberId, memberName, compName)
          }
        />
      </section>

      {/* DIFFERENTIATOR: At-Risk Watchlist & 1-Click Manager Nudge System */}
      <section id="nudges" className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-rose-400 font-bold">
              Intervention Queue
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-rose-400" />
              At-Risk Learners & Manager 1-Click Nudge System
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {overdueEnrollments.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-3xl border border-rose-500/20 bg-gradient-to-r from-rose-950/20 via-[#090b14] to-[#090b14] flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.member!.avatar}
                      alt={item.member!.name}
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">{item.member!.name}</span>
                      <span className="text-[10px] text-neutral-400">{item.member!.jobTitle}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold">
                    {item.status === "overdue" ? "Overdue" : "Lagging Progress"}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-xs font-semibold text-white block truncate">
                    Course: {item.course!.title}
                  </span>
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                    <span>Progress: {item.progressPercent}%</span>
                    <span>Due: {item.dueDate}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden mt-1">
                    <div
                      className="bg-rose-500 h-full rounded-full"
                      style={{ width: `${item.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">
                  Send encouragement to help unblock
                </span>
                <button
                  onClick={() =>
                    nudgeTeamMember(item.member!.id, item.member!.name, item.course!.title)
                  }
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  1-Click Nudge
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Course Nominations & Approvals Drawer */}
      <section id="nominations" className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">
              Team Upskilling Workflow
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-indigo-400" />
              Nominate Team Member for Mandatory Upskilling
            </h2>
          </div>
        </div>

        <div className="p-6 rounded-3xl border border-white/10 bg-[#090b14]/90 backdrop-blur-xl">
          <form onSubmit={handleNominateSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                Select Team Member
              </label>
              <select
                value={selectedMemberForNomination}
                onChange={(e) => setSelectedMemberForNomination(e.target.value)}
                className="w-full bg-[#0e111a] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {teamMembers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — {m.jobTitle}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                Assign Course / Certification Path
              </label>
              <select
                value={selectedCourseForNomination}
                onChange={(e) => setSelectedCourseForNomination(e.target.value)}
                className="w-full bg-[#0e111a] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} (Unlocks L{c.competencyGainLevel})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Disburse Mandatory Nomination
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
