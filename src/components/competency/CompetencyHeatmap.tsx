"use client";

import React, { useState } from "react";
import { UserProfile, Competency } from "@/data/capacityData";
import { Badge } from "@/components/ui/Badge";
import { Filter, Eye, AlertCircle, CheckCircle2, Sparkles, User, ArrowUpRight } from "lucide-react";

interface CompetencyHeatmapProps {
  members: UserProfile[];
  competencies: Competency[];
  onNudgeMember?: (memberId: string, memberName: string, competencyName: string) => void;
}

export const CompetencyHeatmap: React.FC<CompetencyHeatmapProps> = ({
  members,
  competencies,
  onNudgeMember,
}) => {
  const [filterGapOnly, setFilterGapOnly] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{
    member: UserProfile;
    competency: Competency;
    level: number;
    lastAssessed: string;
  } | null>(null);

  const displayedCompetencies = competencies.slice(0, 8); // Top 8 key competencies

  const getLevelColor = (level: number) => {
    switch (level) {
      case 5:
        return "bg-amber-400 text-amber-950 font-bold border-amber-300 shadow-sm shadow-amber-500/30";
      case 4:
        return "bg-violet-500 text-white font-bold border-violet-400";
      case 3:
        return "bg-emerald-500 text-white font-bold border-emerald-400";
      case 2:
        return "bg-sky-600/80 text-sky-100 font-medium border-sky-500/50";
      case 1:
      default:
        return "bg-rose-500/20 text-rose-300 font-semibold border-rose-500/30";
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Filter & Legend Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterGapOnly(!filterGapOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              filterGapOnly
                ? "bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm"
                : "bg-white/5 text-neutral-400 border-white/10 hover:text-white"
            }`}
          >
            <Filter className="h-3.5 w-3.5" />
            {filterGapOnly ? "Filtering: Showing Gaps (< L3)" : "Filter Skill Gaps"}
          </button>
          <span className="text-xs text-neutral-500 hidden sm:inline">
            Showing {members.length} engineers across {displayedCompetencies.length} critical skills
          </span>
        </div>

        {/* Level Legend */}
        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className="text-neutral-400 text-xs mr-1">Scale:</span>
          <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">L1 Novice</span>
          <span className="px-1.5 py-0.5 rounded bg-sky-600/80 text-sky-100 border border-sky-500/50 font-bold">L2 Practitioner</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white font-bold">L3 Advanced</span>
          <span className="px-1.5 py-0.5 rounded bg-violet-500 text-white font-bold">L4 Expert</span>
          <span className="px-1.5 py-0.5 rounded bg-amber-400 text-amber-950 font-bold">L5 Principal</span>
        </div>
      </div>

      {/* Heatmap Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#090b14]/90 backdrop-blur-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <th className="p-3.5 text-xs font-bold uppercase tracking-wider text-neutral-400 min-w-[200px]">
                Team Member
              </th>
              {displayedCompetencies.map((comp) => (
                <th
                  key={comp.id}
                  className="p-3 text-center text-[11px] font-semibold text-neutral-300 min-w-[110px] border-l border-white/5"
                  title={comp.description}
                >
                  <span className="block truncate max-w-[120px] mx-auto">{comp.name.split(" ")[0]} {comp.name.split(" ")[1] || ""}</span>
                  <span className="text-[9px] font-mono text-neutral-500 font-normal">{comp.category.split(" ")[0]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                {/* Member Info Cell */}
                <td className="p-3.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">{member.name}</span>
                      <span className="text-[10px] text-neutral-400">{member.jobTitle}</span>
                    </div>
                  </div>
                </td>

                {/* Heatmap Level Cells */}
                {displayedCompetencies.map((comp) => {
                  const userComp = member.competencies.find((c) => c.competencyId === comp.id);
                  const level = userComp ? userComp.currentLevel : 1;
                  const isGap = level < 3;

                  if (filterGapOnly && !isGap) {
                    return (
                      <td key={comp.id} className="p-2 text-center border-l border-white/5 bg-black/20">
                        <span className="text-[10px] text-neutral-600 font-mono">-</span>
                      </td>
                    );
                  }

                  return (
                    <td
                      key={comp.id}
                      onClick={() =>
                        setSelectedCell({
                          member,
                          competency: comp,
                          level,
                          lastAssessed: userComp?.lastAssessedAt || "Not verified",
                        })
                      }
                      className="p-2 text-center border-l border-white/5 cursor-pointer hover:bg-white/5 transition-all group"
                    >
                      <div
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-xl text-xs border transition-transform group-hover:scale-110 ${getLevelColor(
                          level
                        )}`}
                      >
                        L{level}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Cell Detail Drawer / Modal */}
      {selectedCell && (
        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">
                  {selectedCell.member.name} · {selectedCell.competency.name}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono ${getLevelColor(
                    selectedCell.level
                  )}`}
                >
                  Current: Level {selectedCell.level}/5
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                {selectedCell.competency.levels.find((l) => l.level === selectedCell.level)?.description ||
                  selectedCell.competency.description}
                {" · "}
                <span className="font-mono text-neutral-500">Last Assessed: {selectedCell.lastAssessed}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedCell.level < 3 && onNudgeMember && (
              <button
                onClick={() =>
                  onNudgeMember(
                    selectedCell.member.id,
                    selectedCell.member.name,
                    selectedCell.competency.name
                  )
                }
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all"
              >
                Send Training Nudge
              </button>
            )}
            <button
              onClick={() => setSelectedCell(null)}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
