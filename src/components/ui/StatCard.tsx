"use client";

import React from "react";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  accentColor?: "indigo" | "emerald" | "violet" | "cyan" | "amber" | "rose";
  progress?: number;
  onClick?: () => void;
}

const colorMap = {
  indigo: {
    bg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    glow: "hover:border-indigo-500/40 hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.2)]",
    progress: "bg-indigo-500",
  },
  emerald: {
    bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    glow: "hover:border-emerald-500/40 hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.2)]",
    progress: "bg-emerald-500",
  },
  violet: {
    bg: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    glow: "hover:border-violet-500/40 hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.2)]",
    progress: "bg-violet-500",
  },
  cyan: {
    bg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    glow: "hover:border-cyan-500/40 hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.2)]",
    progress: "bg-cyan-500",
  },
  amber: {
    bg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    glow: "hover:border-amber-500/40 hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.2)]",
    progress: "bg-amber-500",
  },
  rose: {
    bg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    glow: "hover:border-rose-500/40 hover:shadow-[0_0_25px_-5px_rgba(244,63,94,0.2)]",
    progress: "bg-rose-500",
  },
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  trend,
  icon: Icon,
  accentColor = "indigo",
  progress,
  onClick,
}) => {
  const scheme = colorMap[accentColor] || colorMap.indigo;

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 dark:border-white/5 bg-white/70 dark:bg-[#0e111a]/80 backdrop-blur-xl p-5 transition-all duration-300 ${
        onClick ? "cursor-pointer" : ""
      } ${scheme.glow}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              {value}
            </span>
            {change && (
              <span
                className={`inline-flex items-center text-xs font-semibold ${
                  trend === "up"
                    ? "text-emerald-500"
                    : trend === "down"
                    ? "text-rose-500"
                    : "text-neutral-400"
                }`}
              >
                {trend === "up" && <TrendingUp className="mr-0.5 h-3 w-3" />}
                {trend === "down" && <TrendingDown className="mr-0.5 h-3 w-3" />}
                {trend === "neutral" && <Minus className="mr-0.5 h-3 w-3" />}
                {change}
              </span>
            )}
          </div>
        </div>

        <div className={`rounded-xl border p-2.5 ${scheme.bg}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {subtitle && (
        <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-400 line-clamp-1">
          {subtitle}
        </p>
      )}

      {typeof progress === "number" && (
        <div className="mt-3">
          <div className="flex justify-between text-[10px] font-medium text-neutral-500 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${scheme.progress}`}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
