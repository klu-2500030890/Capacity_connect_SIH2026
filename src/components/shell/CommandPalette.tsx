"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppState, RoleType } from "@/context/AppStateContext";
import {
  Search,
  BookOpen,
  Target,
  Sparkles,
  User,
  GraduationCap,
  Building2,
  Calendar,
  Award,
  ArrowRight,
  Command,
  FileText,
  Grid,
} from "lucide-react";

export const CommandPalette: React.FC = () => {
  const router = useRouter();
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    courses,
    competencies,
    articles,
    sessions,
    setRole,
  } = useAppState();

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isCommandPaletteOpen) setQuery("");
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCompetencies = competencies.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectRole = (targetRole: RoleType) => {
    setRole(targetRole);
    setIsCommandPaletteOpen(false);
    router.push(`/${targetRole}`);
  };

  const handleSelectCourse = (courseId: string) => {
    setIsCommandPaletteOpen(false);
    router.push("/learner");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-100">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#090b14]/95 p-4 shadow-2xl space-y-4">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10">
          <Search className="h-4 w-4 text-indigo-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type to search courses, competencies, knowledge articles, or workspaces..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
          />
          <kbd className="text-[10px] font-mono text-neutral-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto space-y-4 px-2 text-xs">
          {/* Quick Role Jump */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block px-2">
              Switch Role Workspace
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <button
                onClick={() => handleSelectRole("learner")}
                className="p-2 rounded-xl bg-white/[0.02] hover:bg-emerald-500/20 text-neutral-300 hover:text-emerald-300 border border-white/5 text-left flex items-center gap-2 transition-all"
              >
                <User className="h-3.5 w-3.5 text-emerald-400" /> Learner
              </button>
              <button
                onClick={() => handleSelectRole("manager")}
                className="p-2 rounded-xl bg-white/[0.02] hover:bg-cyan-500/20 text-neutral-300 hover:text-cyan-300 border border-white/5 text-left flex items-center gap-2 transition-all"
              >
                <Grid className="h-3.5 w-3.5 text-cyan-400" /> Manager
              </button>
              <button
                onClick={() => handleSelectRole("trainer")}
                className="p-2 rounded-xl bg-white/[0.02] hover:bg-indigo-500/20 text-neutral-300 hover:text-indigo-300 border border-white/5 text-left flex items-center gap-2 transition-all"
              >
                <GraduationCap className="h-3.5 w-3.5 text-indigo-400" /> Trainer
              </button>
              <button
                onClick={() => handleSelectRole("admin")}
                className="p-2 rounded-xl bg-white/[0.02] hover:bg-violet-500/20 text-neutral-300 hover:text-violet-300 border border-white/5 text-left flex items-center gap-2 transition-all"
              >
                <Building2 className="h-3.5 w-3.5 text-violet-400" /> Admin
              </button>
            </div>
          </div>

          {/* Courses */}
          {filteredCourses.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block px-2">
                Courses & Certifications ({filteredCourses.length})
              </span>
              {filteredCourses.slice(0, 3).map((c) => (
                <div
                  key={c.id}
                  onClick={() => handleSelectCourse(c.id)}
                  className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <BookOpen className="h-4 w-4 text-indigo-400 shrink-0" />
                    <span className="font-semibold text-white truncate">{c.title}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono shrink-0">Level {c.competencyGainLevel}</span>
                </div>
              ))}
            </div>
          )}

          {/* Competencies */}
          {filteredCompetencies.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block px-2">
                Organizational Competencies ({filteredCompetencies.length})
              </span>
              {filteredCompetencies.slice(0, 3).map((comp) => (
                <div
                  key={comp.id}
                  onClick={() => {
                    setIsCommandPaletteOpen(false);
                    router.push("/learner");
                  }}
                  className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Target className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span className="font-semibold text-white truncate">{comp.name}</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono shrink-0">{comp.category}</span>
                </div>
              ))}
            </div>
          )}

          {/* Knowledge Articles */}
          {filteredArticles.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block px-2">
                Knowledge Base Articles ({filteredArticles.length})
              </span>
              {filteredArticles.slice(0, 2).map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    setIsCommandPaletteOpen(false);
                    router.push("/learner#knowledge");
                  }}
                  className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold text-white truncate">{art.title}</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 shrink-0">by {art.authorName}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Backdrop click closer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-neutral-500 px-2">
          <span>Navigate with mouse or keyboard</span>
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="hover:text-white"
          >
            Close Palette
          </button>
        </div>
      </div>
    </div>
  );
};
