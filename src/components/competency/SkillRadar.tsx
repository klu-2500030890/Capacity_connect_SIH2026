"use client";

import React from "react";
import { Competency, UserCompetency, JobRole } from "@/data/capacityData";

interface SkillRadarProps {
  competencies: Competency[];
  userCompetencies: UserCompetency[];
  targetRole?: JobRole;
  size?: number;
}

export const SkillRadar: React.FC<SkillRadarProps> = ({
  competencies,
  userCompetencies,
  targetRole,
  size = 360,
}) => {
  // Select top 6 key competencies for clean radar visualization
  const selectedComps = competencies.slice(0, 6);
  const numAxes = selectedComps.length;
  const radius = size / 2 - 45;
  const center = size / 2;
  const levels = 5;

  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 / numAxes) * index - Math.PI / 2;
    const distance = (value / levels) * radius;
    const x = center + distance * Math.cos(angle);
    const y = center + distance * Math.sin(angle);
    return { x, y };
  };

  // Generate radar polygon path for current user skills
  const userPoints = selectedComps.map((comp, i) => {
    const userComp = userCompetencies.find((uc) => uc.competencyId === comp.id);
    const val = userComp ? userComp.currentLevel : 1;
    return getCoordinates(i, val);
  });
  const userPolygonPath = userPoints.map((p) => `${p.x},${p.y}`).join(" ");

  // Generate radar polygon path for target role requirements
  const targetPoints = selectedComps.map((comp, i) => {
    if (!targetRole) return getCoordinates(i, 3);
    const req = targetRole.requiredCompetencies.find((rc) => rc.competencyId === comp.id);
    const val = req ? req.requiredLevel : 3;
    return getCoordinates(i, val);
  });
  const targetPolygonPath = targetPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background concentric level polygons */}
        {[1, 2, 3, 4, 5].map((lvl) => {
          const polyPoints = selectedComps
            .map((_, i) => {
              const { x, y } = getCoordinates(i, lvl);
              return `${x},${y}`;
            })
            .join(" ");
          return (
            <g key={lvl}>
              <polygon
                points={polyPoints}
                fill={lvl % 2 === 0 ? "rgba(255, 255, 255, 0.015)" : "transparent"}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />
              <text
                x={center}
                y={center - (lvl / levels) * radius - 2}
                textAnchor="middle"
                className="text-[9px] font-mono fill-neutral-600"
              >
                L{lvl}
              </text>
            </g>
          );
        })}

        {/* Axes rays */}
        {selectedComps.map((comp, i) => {
          const { x, y } = getCoordinates(i, 5);
          return (
            <line
              key={comp.id}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          );
        })}

        {/* Target Role Layer (Cyan Outline) */}
        <polygon
          points={targetPolygonPath}
          fill="rgba(6, 182, 212, 0.08)"
          stroke="#06b6d4"
          strokeWidth="2"
          strokeDasharray="4 3"
        />

        {/* Current User Skill Layer (Emerald Glow Fill) */}
        <polygon
          points={userPolygonPath}
          fill="rgba(16, 185, 129, 0.25)"
          stroke="#10b981"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out"
        />

        {/* User Data Points */}
        {userPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4.5"
            className="fill-emerald-400 stroke-[#06070b] stroke-2 transition-all duration-700"
          />
        ))}

        {/* Axis Labels */}
        {selectedComps.map((comp, i) => {
          const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
          const labelDist = radius + 22;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);
          const isRight = Math.cos(angle) > 0.1;
          const isLeft = Math.cos(angle) < -0.1;
          const anchor = isRight ? "start" : isLeft ? "end" : "middle";

          const userComp = userCompetencies.find((uc) => uc.competencyId === comp.id);
          const curVal = userComp ? userComp.currentLevel : 1;

          return (
            <g key={comp.id}>
              <text
                x={lx}
                y={ly}
                textAnchor={anchor}
                className="text-[10px] font-semibold fill-neutral-300 transition-colors hover:fill-white"
              >
                {comp.name.split(" ")[0]} {comp.name.split(" ")[1] || ""}
              </text>
              <text
                x={lx}
                y={ly + 11}
                textAnchor={anchor}
                className="text-[9px] font-mono fill-emerald-400 font-bold"
              >
                Level {curVal}/5
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend Footer */}
      <div className="flex items-center gap-6 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
          <span className="text-neutral-300 font-medium">Your Current Competencies</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-cyan-400 border border-dashed border-cyan-400" />
          <span className="text-cyan-300 font-medium">
            {targetRole ? targetRole.title : "Target Role Benchmark"}
          </span>
        </div>
      </div>
    </div>
  );
};
