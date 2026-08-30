"use client";

import React from "react";

// Line / Area Chart for Attendance & Performance trends
export const TrendAreaChart: React.FC<{
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
  threshold?: number;
}> = ({ data, color = "#6366f1", height = 120, threshold = 75 }) => {
  if (!data || data.length === 0) return null;

  const width = 360;
  const padding = 20;
  const minVal = Math.min(...data.map((d) => d.value), threshold - 5);
  const maxVal = Math.max(...data.map((d) => d.value), 100);

  const getX = (i: number) => padding + (i * (width - 2 * padding)) / (data.length - 1);
  const getY = (val: number) => height - padding - ((val - minVal) / (maxVal - minVal)) * (height - 2 * padding);

  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(" ");
  const areaPoints = `${getX(0)},${height - padding} ${points} ${getX(data.length - 1)},${height - padding}`;
  const thresholdY = getY(threshold);

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id={`grad-${color.replace("#", "")}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Threshold Line (75%) */}
        {threshold && (
          <line
            x1={padding}
            y1={thresholdY}
            x2={width - padding}
            y2={thresholdY}
            stroke="rgba(244, 63, 94, 0.5)"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
        )}

        {/* Area fill */}
        <polygon points={areaPoints} fill={`url(#grad-${color.replace("#", "")})`} />

        {/* Line */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          points={points}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((d, i) => (
          <g key={i} className="group cursor-pointer">
            <circle
              cx={getX(i)}
              cy={getY(d.value)}
              r="4"
              fill="#0e111a"
              stroke={color}
              strokeWidth="2"
              className="transition-transform group-hover:scale-150"
            />
            {/* Value tooltip label */}
            <text
              x={getX(i)}
              y={getY(d.value) - 8}
              textAnchor="middle"
              className="text-[10px] fill-neutral-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {d.value}%
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text
            key={`lbl-${i}`}
            x={getX(i)}
            y={height - 2}
            textAnchor="middle"
            className="text-[9px] fill-neutral-500"
          >
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );
};

// Bar chart for Department comparisons
export const HorizontalBarChart: React.FC<{
  items: { label: string; value: number; secondary?: string; target?: number }[];
  color?: string;
}> = ({ items, color = "bg-indigo-500" }) => {
  const max = Math.max(...items.map((i) => i.value), 100);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-neutral-300 line-clamp-1">{item.label}</span>
            <span className="font-bold text-neutral-100">{item.secondary || `${item.value}%`}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-neutral-800/80 overflow-hidden relative">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
              style={{ width: `${(item.value / max) * 100}%` }}
            />
            {item.target && (
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-rose-400/80 z-10"
                style={{ left: `${item.target}%` }}
                title={`Target: ${item.target}%`}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Bloom's Taxonomy breakdown bar
export const BloomTaxonomyBar: React.FC<{
  distribution: {
    remembering: number;
    understanding: number;
    applying: number;
    analyzing: number;
    evaluating: number;
  };
}> = ({ distribution }) => {
  const total =
    distribution.remembering +
    distribution.understanding +
    distribution.applying +
    distribution.analyzing +
    distribution.evaluating || 100;

  const categories = [
    { name: "Remembering (L1)", value: distribution.remembering, color: "bg-blue-500" },
    { name: "Understanding (L2)", value: distribution.understanding, color: "bg-cyan-500" },
    { name: "Applying (L3)", value: distribution.applying, color: "bg-emerald-500" },
    { name: "Analyzing (L4)", value: distribution.analyzing, color: "bg-amber-500" },
    { name: "Evaluating (L5)", value: distribution.evaluating, color: "bg-rose-500" },
  ];

  return (
    <div className="space-y-2">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-neutral-800">
        {categories.map((c, i) => (
          <div
            key={i}
            className={`${c.color} transition-all duration-500`}
            style={{ width: `${(c.value / total) * 100}%` }}
            title={`${c.name}: ${c.value}%`}
          />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-1 text-[10px] text-neutral-400 text-center">
        {categories.map((c, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="font-bold text-neutral-200">{Math.round((c.value / total) * 100)}%</span>
            <span className="truncate w-full">{c.name.split(" ")[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
