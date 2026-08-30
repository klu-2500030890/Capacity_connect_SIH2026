"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppState, RoleType } from "@/context/AppStateContext";
import {
  Sparkles,
  User,
  GraduationCap,
  Building2,
  Zap,
  Play,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Compass,
  Grid,
  ShieldCheck,
  ChevronUp,
  ChevronDown,
  Award,
} from "lucide-react";

export const DemoControlBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { role, setRole, simulateScenario, demoToast, setDemoToast } = useAppState();
  const [minimized, setMinimized] = useState(false);

  const handleRoleSwitch = (newRole: RoleType) => {
    setRole(newRole);
    router.push(`/${newRole}`);
  };

  const handleLanding = () => {
    router.push("/");
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center select-none">
      {/* Toast Notification Alert */}
      {demoToast && (
        <div
          className={`mb-2.5 px-4 py-2 rounded-2xl text-xs font-semibold shadow-2xl backdrop-blur-2xl border flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-200 ${
            demoToast.type === "success"
              ? "bg-emerald-950/90 text-emerald-300 border-emerald-500/40 shadow-emerald-950/50"
              : demoToast.type === "warning"
              ? "bg-amber-950/90 text-amber-300 border-amber-500/40 shadow-amber-950/50"
              : "bg-indigo-950/90 text-indigo-300 border-indigo-500/40 shadow-indigo-950/50"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>{demoToast.message}</span>
          <button
            onClick={() => setDemoToast(null)}
            className="ml-2 text-neutral-400 hover:text-white text-[10px]"
          >
            ✕
          </button>
        </div>
      )}

      {/* Control Bar Container */}
      <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-[#090b14]/95 p-1.5 shadow-2xl shadow-black/80 backdrop-blur-2xl">
        {/* Evaluator Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white border-r border-white/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          <span className="hidden sm:inline font-mono">CAPACITY CONNECT</span>
          <span className="text-[10px] text-indigo-300 font-mono">DEMO BAR</span>
        </div>

        {/* Role Switchers */}
        <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
          <button
            onClick={handleLanding}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              pathname === "/"
                ? "bg-indigo-600 text-white shadow-sm font-bold"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
            title="Public Landing Overview"
          >
            <Compass className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Landing</span>
          </button>

          <button
            onClick={() => handleRoleSwitch("learner")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              role === "learner" && pathname.includes("learner")
                ? "bg-emerald-600 text-white shadow-sm font-bold"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span>Learner</span>
          </button>

          <button
            onClick={() => handleRoleSwitch("manager")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              role === "manager" && pathname.includes("manager")
                ? "bg-cyan-600 text-white shadow-sm font-bold"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Grid className="h-3.5 w-3.5" />
            <span>Manager</span>
          </button>

          <button
            onClick={() => handleRoleSwitch("trainer")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              role === "trainer" && pathname.includes("trainer")
                ? "bg-indigo-600 text-white shadow-sm font-bold"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Trainer</span>
          </button>

          <button
            onClick={() => handleRoleSwitch("admin")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              role === "admin" && pathname.includes("admin")
                ? "bg-violet-600 text-white shadow-sm font-bold"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* Live Simulation Action Buttons */}
        {!minimized && (
          <div className="hidden lg:flex items-center gap-1.5 border-l border-white/10 pl-2">
            <button
              onClick={() => simulateScenario("auto_level_up")}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 text-[11px] font-semibold transition-colors"
              title="Passes Capstone Quiz & immediately upgrades Kubernetes to Level 3 in Skill Radar"
            >
              <Zap className="h-3 w-3" />
              <span>Level-Up Skill</span>
            </button>

            <button
              onClick={() => simulateScenario("manager_nudge")}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-[11px] font-semibold transition-colors"
              title="Dispatches manager 1-click nudge to at-risk employee"
            >
              <Play className="h-3 w-3" />
              <span>Manager Nudge</span>
            </button>

            <button
              onClick={() => router.push("/verify/CERT-CC-84920")}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 text-[11px] font-semibold transition-colors"
              title="Public certificate verification endpoint"
            >
              <Award className="h-3 w-3" />
              <span>Verify Cert</span>
            </button>
          </div>
        )}

        {/* Minimize / Expand Bar */}
        <button
          onClick={() => setMinimized(!minimized)}
          className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          title={minimized ? "Expand Bar" : "Minimize Bar"}
        >
          {minimized ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
};
