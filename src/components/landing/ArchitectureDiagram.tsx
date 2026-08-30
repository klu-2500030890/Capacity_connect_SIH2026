"use client";

import React from "react";
import { Sparkles, Database, UserCheck, Bot, FileSpreadsheet, Building2 } from "lucide-react";

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#07080f]/95 backdrop-blur-2xl p-8 shadow-2xl relative overflow-hidden">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
          Single Unified Intelligence Architecture
        </span>
        <h3 className="text-2xl font-extrabold text-white">
          Why Smart Campus OS is Different
        </h3>
        <p className="text-xs text-neutral-400">
          Traditional colleges isolate LMS, ERP, and AI into disconnected silos. In Smart Campus OS, attendance, grades, syllabi, and administrative scheduling share the same real-time intelligence layer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Layer 1: Inputs & Operations */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-cyan-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              1. Institutional Data Layer
            </h4>
          </div>
          <ul className="text-xs text-neutral-400 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Student Attendance & Logs
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Course Syllabi & PDFs (RAG)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Room Capacities & Timetables
            </li>
          </ul>
        </div>

        {/* Layer 2: Core AI Reasoning Bus */}
        <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-3 shadow-lg shadow-indigo-500/10">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              2. Shared AI Neural Engine
            </h4>
          </div>
          <ul className="text-xs text-indigo-200 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" /> Grounded RAG Retrieval (pgvector)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" /> At-Risk Attendance Predictor
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" /> Bloom's Taxonomy Question Generator
            </li>
          </ul>
        </div>

        {/* Layer 3: Role Workspaces */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-emerald-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              3. Synchronized Experiences
            </h4>
          </div>
          <ul className="text-xs text-neutral-400 space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Student: Adaptive AI Study Tutor
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Faculty: Cohort Diagnostics & Grading
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Admin: Conflict-Free ERP Optimizer
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
