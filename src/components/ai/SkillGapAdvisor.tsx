"use client";

import React, { useState } from "react";
import { JobRole, UserProfile, Competency, Course } from "@/data/capacityData";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  Target,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Calendar,
  Layers,
  Award,
  Zap,
} from "lucide-react";

interface SkillGapAdvisorProps {
  user: UserProfile;
  jobRoles: JobRole[];
  competencies: Competency[];
  courses: Course[];
  onEnrollPath?: (courseIds: string[]) => void;
}

export const SkillGapAdvisor: React.FC<SkillGapAdvisorProps> = ({
  user,
  jobRoles,
  competencies,
  courses,
  onEnrollPath,
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>("role-sr-cloud-arch");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const selectedRole = jobRoles.find((r) => r.id === selectedRoleId) || jobRoles[1];

  // Compute Gaps
  const gapAnalysis = selectedRole.requiredCompetencies.map((req) => {
    const comp = competencies.find((c) => c.id === req.competencyId);
    const userComp = user.competencies.find((uc) => uc.competencyId === req.competencyId);
    const currentLevel = userComp ? userComp.currentLevel : 1;
    const gap = req.requiredLevel - currentLevel;
    const isMet = gap <= 0;

    return {
      competency: comp,
      requiredLevel: req.requiredLevel,
      currentLevel,
      gap: Math.max(0, gap),
      isMet,
    };
  });

  const totalRequiredPoints = selectedRole.requiredCompetencies.reduce(
    (acc, r) => acc + r.requiredLevel,
    0
  );
  const totalCurrentPoints = gapAnalysis.reduce(
    (acc, g) => acc + Math.min(g.requiredLevel, g.currentLevel),
    0
  );
  const readinessPercentage = Math.round((totalCurrentPoints / totalRequiredPoints) * 100);
  const criticalGapsCount = gapAnalysis.filter((g) => g.gap > 0).length;

  // Identify recommended courses that close the specific gaps
  const recommendedCourses = courses.filter((course) =>
    course.competencyIds.some((cId) =>
      gapAnalysis.some((g) => g.competency?.id === cId && g.gap > 0)
    )
  );

  const handleRoleSelect = (roleId: string) => {
    setIsGenerating(true);
    setSelectedRoleId(roleId);
    setTimeout(() => setIsGenerating(false), 300);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Target Career Role Selector */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-indigo-950/40 border border-indigo-500/20 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                AI-Powered Career Gap Advisor
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Target Career Pathway Analysis
            </h3>
            <p className="text-xs text-neutral-400 max-w-2xl">
              Select any target organizational role to calculate live competency differentials and generate an accelerated transition curriculum.
            </p>
          </div>

          {/* Role Dropdown */}
          <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
            <Target className="h-4 w-4 text-indigo-400 ml-2" />
            <select
              value={selectedRoleId}
              onChange={(e) => handleRoleSelect(e.target.value)}
              className="bg-transparent text-xs font-bold text-white pr-4 py-1.5 focus:outline-none cursor-pointer"
            >
              {jobRoles.map((role) => (
                <option key={role.id} value={role.id} className="bg-[#0b0e18] text-white">
                  {role.title} ({role.department})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Readiness Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-neutral-400 uppercase">Role Readiness</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">{readinessPercentage}%</span>
              <span className="text-xs text-indigo-400 font-semibold">
                {readinessPercentage >= 80 ? "Promotion Ready" : "Path Active"}
              </span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden mt-2">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${readinessPercentage}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-neutral-400 uppercase">Competency Gaps</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-rose-400">{criticalGapsCount}</span>
              <span className="text-xs text-neutral-400 font-normal">skills below benchmark</span>
            </div>
            <span className="text-[10px] text-neutral-500 block">
              Estimated 6-8 weeks micro-learning to bridge
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-neutral-400 uppercase">Curated Courses</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-400">{recommendedCourses.length}</span>
              <span className="text-xs text-neutral-400 font-normal">targeted modules</span>
            </div>
            <span className="text-[10px] text-neutral-500 block">
              Directly unlocks Level 3 & Level 4 proficiencies
            </span>
          </div>
        </div>
      </div>

      {/* Two-Column Breakdown: Competency Gap Table (Left) + Recommended Path (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Detailed Gap Breakdown (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-indigo-400" />
              Skill-by-Skill Gap Diagnostics
            </h4>
            <span className="text-[11px] font-mono text-neutral-500">Benchmark: {selectedRole.title}</span>
          </div>

          <div className="space-y-2.5">
            {gapAnalysis.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border transition-all ${
                  item.isMet
                    ? "bg-emerald-500/[0.03] border-emerald-500/20"
                    : "bg-white/[0.02] border-white/10 hover:border-indigo-500/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {item.isMet ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                    )}
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {item.competency?.name}
                      </span>
                      <span className="text-[10px] text-neutral-500">
                        {item.competency?.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-[11px] font-mono text-neutral-400">
                      Current: <strong className="text-white">L{item.currentLevel}</strong> / Req: <strong className="text-indigo-400">L{item.requiredLevel}</strong>
                    </span>
                    {item.isMet ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                        Target Met
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 text-[10px] font-bold border border-rose-500/20">
                        -{item.gap} Level Gap
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 bg-black/40 rounded-full h-1.5 overflow-hidden flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((lvl) => {
                      const isCurrent = lvl <= item.currentLevel;
                      const isRequired = lvl <= item.requiredLevel;
                      return (
                        <div
                          key={lvl}
                          className={`flex-1 h-full rounded-full transition-all ${
                            isCurrent
                              ? "bg-emerald-400"
                              : isRequired
                              ? "bg-indigo-500/40"
                              : "bg-white/5"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Recommended Learning Sequence (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-400" />
              Prescribed Learning Sequence
            </h4>
            <Badge variant="success" size="sm">AI Tailored</Badge>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#090b14]/90 p-5 space-y-4 shadow-xl">
            <p className="text-xs text-neutral-400">
              Complete these {recommendedCourses.length} structured courses to satisfy all {criticalGapsCount} competency requirements:
            </p>

            <div className="space-y-3">
              {recommendedCourses.map((crs, i) => (
                <div
                  key={crs.id}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 transition-all flex items-start gap-3 group"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-white block group-hover:text-indigo-300 transition-colors truncate">
                      {crs.title}
                    </span>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-neutral-400">
                      <span>{crs.duration}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-mono">Unlocks Level {crs.competencyGainLevel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/5">
              <button
                onClick={() =>
                  onEnrollPath && onEnrollPath(recommendedCourses.map((c) => c.id))
                }
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Enroll in Career Bridge Path
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
