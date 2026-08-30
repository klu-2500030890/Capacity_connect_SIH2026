"use client";

import React from "react";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";

interface AttendanceMeterProps {
  percentage: number;
  subjectCode?: string;
  subjectName?: string;
  attendedClasses?: number;
  totalClasses?: number;
  showDetails?: boolean;
  size?: "sm" | "md" | "lg";
}

export const AttendanceMeter: React.FC<AttendanceMeterProps> = ({
  percentage,
  subjectCode,
  subjectName,
  attendedClasses,
  totalClasses,
  showDetails = true,
  size = "md",
}) => {
  const isSafe = percentage >= 75;
  const isWarning = percentage >= 70 && percentage < 75;
  const isCritical = percentage < 70;

  const colorClass = isSafe
    ? "text-emerald-500 stroke-emerald-500"
    : isWarning
    ? "text-amber-500 stroke-amber-500"
    : "text-rose-500 stroke-rose-500";

  const bgRingClass = isSafe
    ? "stroke-emerald-500/20"
    : isWarning
    ? "stroke-amber-500/20"
    : "stroke-rose-500/20";

  const statusBadge = isSafe ? (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
      <CheckCircle2 className="w-3 h-3" /> Safe ({percentage}%)
    </span>
  ) : isWarning ? (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 animate-pulse">
      <AlertTriangle className="w-3 h-3" /> Warning ({percentage}%)
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20 animate-pulse">
      <ShieldAlert className="w-3 h-3" /> At-Risk ({percentage}%)
    </span>
  );

  const radius = size === "sm" ? 22 : size === "md" ? 36 : 48;
  const strokeWidth = size === "sm" ? 4 : size === "md" ? 6 : 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, percentage) / 100) * circumference;
  const svgSize = (radius + strokeWidth) * 2;

  return (
    <div className="flex items-center gap-4">
      {/* Radial Gauge */}
      <div className="relative flex items-center justify-center">
        <svg width={svgSize} height={svgSize} className="rotate-[-90deg]">
          {/* Track */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            strokeWidth={strokeWidth}
            className={`${bgRingClass} fill-none`}
          />
          {/* Progress */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${colorClass} fill-none transition-all duration-700 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span
            className={`font-bold tracking-tight ${
              size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-lg"
            }`}
          >
            {percentage.toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Details */}
      {showDetails && (
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-neutral-100">
              {subjectCode && <span className="text-indigo-400 mr-1.5">{subjectCode}</span>}
              {subjectName || "Overall Attendance"}
            </h4>
            {statusBadge}
          </div>

          {typeof attendedClasses === "number" && typeof totalClasses === "number" && (
            <p className="text-xs text-neutral-400">
              Attended <span className="text-neutral-200 font-medium">{attendedClasses}</span> of{" "}
              <span className="text-neutral-200 font-medium">{totalClasses}</span> lectures
            </p>
          )}

          {/* 75% threshold baseline indicator */}
          <div className="pt-1">
            <div className="relative h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  isSafe ? "bg-emerald-500" : isWarning ? "bg-amber-500" : "bg-rose-500"
                }`}
                style={{ width: `${Math.min(100, percentage)}%` }}
              />
              {/* 75% indicator line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white/70 z-10"
                style={{ left: "75%" }}
                title="75% Minimum Requirement Threshold"
              />
            </div>
            <div className="flex justify-between text-[10px] text-neutral-500 mt-0.5">
              <span>0%</span>
              <span className="text-neutral-400 font-semibold">Req: 75%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
