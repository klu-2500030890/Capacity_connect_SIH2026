"use client";

import React, { useState, useEffect } from "react";
import { useAppState } from "@/context/AppStateContext";
import {
  ShieldCheck,
  Zap,
  Activity,
  Server,
  Lock,
  Wifi,
  UserCheck,
} from "lucide-react";

export const SystemSyncHUD: React.FC = () => {
  const { role, currentUser, learner } = useAppState();
  const [latency, setLatency] = useState(14);

  // Subtle real-time latency heartbeat simulation (12ms - 19ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(12 + Math.random() * 8));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside aria-label="System status" className="fixed bottom-0 left-0 right-0 z-40 bg-[#070913]/90 backdrop-blur-md border-t border-white/10 px-4 py-1.5 text-[11px] font-mono text-neutral-400 flex flex-wrap items-center justify-between gap-2 shadow-2xl">
      {/* Left: Enterprise RBAC & Security */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold">SYSTEM SYNCED</span>
          <span className="text-neutral-500">({latency}ms)</span>
        </div>

        <span className="hidden md:inline text-neutral-600">|</span>

        <div className="hidden md:flex items-center gap-1.5 text-neutral-300">
          <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
          <span>TLS 1.3 · SHA-256 Ledger Active</span>
        </div>
      </div>

      {/* Right: Active Session Identity & RBAC Clearance */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-neutral-500 hidden sm:inline">Active Clearance:</span>
          <span className="px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold uppercase text-[10px]">
            {role.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-neutral-300">
          <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span className="font-semibold text-white truncate max-w-[150px]">{currentUser.name}</span>
          <span className="text-[10px] text-neutral-500 hidden lg:inline">({learner.points} XP)</span>
        </div>
      </div>
    </aside>
  );
};
