"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  type: "core" | "entity" | "satellite";
  description: string;
}

interface Packet {
  sourceIdx: number;
  targetIdx: number;
  progress: number;
  speed: number;
  color: string;
}

export const EcosystemCanvas: React.FC<{ onNodeHover?: (node: Node | null) => void }> = ({
  onNodeHover,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initial Node Layout
    const nodes: Node[] = [
      {
        id: "ai-core",
        label: "AI Neural Core",
        x: width / 2,
        y: height / 2,
        vx: 0,
        vy: 0,
        radius: 28,
        color: "#6366f1",
        type: "core",
        description: "Central intelligence reasoning over RAG, learning profiles & institution data",
      },
      {
        id: "students",
        label: "Student LMS",
        x: width * 0.25,
        y: height * 0.3,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 18,
        color: "#10b981",
        type: "entity",
        description: "Adaptive tutor, personalized focus schedule & study metrics",
      },
      {
        id: "faculty",
        label: "Faculty Studio",
        x: width * 0.75,
        y: height * 0.3,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 18,
        color: "#06b6d4",
        type: "entity",
        description: "AI exam authoring, automated rubric evaluation & cohort diagnostics",
      },
      {
        id: "attendance",
        label: "Smart Attendance",
        x: width * 0.2,
        y: height * 0.72,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 16,
        color: "#f59e0b",
        type: "satellite",
        description: "Risk forecasting, 75% eligibility alert & recovery calculator",
      },
      {
        id: "admin",
        label: "Executive ERP",
        x: width * 0.8,
        y: height * 0.72,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 18,
        color: "#8b5cf6",
        type: "entity",
        description: "Institutional oversight, timetable optimizer & room allocation matrix",
      },
      {
        id: "rag",
        label: "RAG Knowledge Base",
        x: width * 0.5,
        y: height * 0.82,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 16,
        color: "#ec4899",
        type: "satellite",
        description: "Grounded embeddings from institutional course syllabus & slides",
      },
    ];

    // Data flow packets
    const packets: Packet[] = [
      { sourceIdx: 1, targetIdx: 0, progress: 0.1, speed: 0.007, color: "#10b981" },
      { sourceIdx: 0, targetIdx: 2, progress: 0.4, speed: 0.006, color: "#6366f1" },
      { sourceIdx: 2, targetIdx: 5, progress: 0.7, speed: 0.008, color: "#06b6d4" },
      { sourceIdx: 3, targetIdx: 0, progress: 0.2, speed: 0.009, color: "#f59e0b" },
      { sourceIdx: 0, targetIdx: 4, progress: 0.6, speed: 0.007, color: "#8b5cf6" },
      { sourceIdx: 5, targetIdx: 1, progress: 0.85, speed: 0.006, color: "#ec4899" },
    ];

    let hoveredNode: Node | null = null;
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      let found: Node | null = null;
      for (const node of nodes) {
        const dist = Math.hypot(node.x - mouseX, node.y - mouseY);
        if (dist < node.radius + 10) {
          found = node;
          break;
        }
      }
      hoveredNode = found;
      if (onNodeHover) onNodeHover(found);
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Smooth center positioning for core
      nodes[0].x = width / 2;
      nodes[0].y = height / 2 + Math.sin(time * 1.5) * 4;

      // Gentle movement for satellites
      for (let i = 1; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Boundaries bounce
        const margin = 40;
        if (node.x < margin || node.x > width - margin) node.vx *= -1;
        if (node.y < margin || node.y > height - margin) node.vy *= -1;

        // Mouse gentle repulsion
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 80 && dist > 0) {
          node.x += (dx / dist) * 1.5;
          node.y += (dy / dist) * 1.5;
        }
      }

      // Draw Connections to AI Core
      for (let i = 1; i < nodes.length; i++) {
        const target = nodes[i];
        const core = nodes[0];

        ctx.beginPath();
        ctx.moveTo(core.x, core.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Secondary ring links
        if (i < nodes.length - 1) {
          const next = nodes[i + 1];
          ctx.beginPath();
          ctx.moveTo(target.x, target.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw moving data packets
      for (const pkt of packets) {
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) pkt.progress = 0;

        const s = nodes[pkt.sourceIdx];
        const t = nodes[pkt.targetIdx];
        const curX = s.x + (t.x - s.x) * pkt.progress;
        const curY = s.y + (t.y - s.y) * pkt.progress;

        // Glow trail
        ctx.beginPath();
        ctx.arc(curX, curY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // Draw Nodes
      for (const node of nodes) {
        const isHovered = hoveredNode?.id === node.id;
        const radius = isHovered ? node.radius + 4 : node.radius;

        // Outer glow
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 2);
        glowGradient.addColorStop(0, `${node.color}40`);
        glowGradient.addColorStop(1, "transparent");
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Node Circle Body
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0c0e17";
        ctx.fill();
        ctx.lineWidth = isHovered ? 2.5 : 1.5;
        ctx.strokeStyle = node.color;
        ctx.stroke();

        // Center dot or icon ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Node Label
        ctx.font = isHovered ? "600 12px Inter, sans-serif" : "500 11px Inter, sans-serif";
        ctx.fillStyle = isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.8)";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + radius + 15);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onNodeHover]);

  return (
    <div className="relative w-full h-[420px] rounded-3xl overflow-hidden border border-white/10 bg-[#07080d]/90 backdrop-blur-2xl">
      <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />

      {/* Floating Canvas Tag */}
      <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-neutral-300">
        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
        Live Ecosystem Intelligence Topology
      </div>

      <div className="absolute bottom-4 right-4 text-[10px] text-neutral-400">
        Hover nodes to inspect connected pipelines
      </div>
    </div>
  );
};
