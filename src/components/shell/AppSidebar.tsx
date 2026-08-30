"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppState, RoleType, DEMO_USERS } from "@/context/AppStateContext";
import {
  LayoutDashboard,
  Target,
  BookOpen,
  Sparkles,
  Users,
  Grid,
  Zap,
  GraduationCap,
  Calendar,
  Award,
  Layers,
  BarChart3,
  Sliders,
  Radio,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: any;
  badge?: string;
  pulse?: boolean;
  alert?: boolean;
}

export const AppSidebar: React.FC = () => {
  const pathname = usePathname();
  const { role, setRole, learner, currentUser } = useAppState();
  const [collapsed, setCollapsed] = useState(false);

  // Learner Navigation Items
  const learnerNav: NavItem[] = [
    { href: "/learner", label: "My Academy", icon: LayoutDashboard, badge: "Daily XP" },
    { href: "/learner#radar", label: "Skill Radar Matrix", icon: Target, badge: "L1-L5 Live" },
    { href: "/learner#advisor", label: "AI Skill Gap Advisor", icon: Sparkles, badge: "Career Path", pulse: true },
    { href: "/learner#courses", label: "Enrolled Courses", icon: BookOpen, badge: "2 Active" },
    { href: "/learner#knowledge", label: "Knowledge Sharing Hub", icon: MessageSquare },
    { href: "/learner#sessions", label: "Live Workshops", icon: Calendar, badge: "Pod 3" },
    { href: "/learner#certificates", label: "Certificates & Badges", icon: Award },
  ];

  // Manager Navigation Items
  const managerNav: NavItem[] = [
    { href: "/manager", label: "Team Command Hub", icon: LayoutDashboard, badge: "4 Engineers" },
    { href: "/manager#heatmap", label: "Competency Heatmap", icon: Grid, badge: "Org Grid", pulse: true },
    { href: "/manager#nudges", label: "At-Risk & Nudges", icon: Zap, badge: "1 Overdue", alert: true },
    { href: "/manager#nominations", label: "Course Nominations", icon: FileCheck },
    { href: "/manager#analytics", label: "Team Velocity & ROI", icon: BarChart3 },
  ];

  // Trainer Navigation Items
  const trainerNav: NavItem[] = [
    { href: "/trainer", label: "L&D Studio", icon: LayoutDashboard, badge: "10 Courses" },
    { href: "/trainer#builder", label: "Course & Path Builder", icon: Layers },
    { href: "/trainer#quiz-ai", label: "AI Quiz Generator", icon: Sparkles, badge: "Auto-Gen", pulse: true },
    { href: "/trainer#cohorts", label: "Cohort Progress", icon: Users, badge: "68 Active" },
    { href: "/trainer#workshops", label: "Workshop Scheduler", icon: Calendar },
  ];

  // Admin Navigation Items
  const adminNav: NavItem[] = [
    { href: "/admin", label: "Org Executive Command", icon: LayoutDashboard, badge: "Enterprise" },
    { href: "/admin#framework", label: "Competency Framework", icon: Sliders, badge: "15 Skills" },
    { href: "/admin#heatmap", label: "Org-Wide Heatmap", icon: Grid },
    { href: "/admin#analytics", label: "Training ROI & Impact", icon: BarChart3 },
    { href: "/admin#directory", label: "User Directory", icon: Users, badge: "25 Users" },
  ];

  const currentNav =
    role === "learner"
      ? learnerNav
      : role === "manager"
      ? managerNav
      : role === "trainer"
      ? trainerNav
      : adminNav;

  return (
    <aside
      className={`relative flex flex-col border-r border-white/10 dark:border-white/5 bg-[#07080f]/95 backdrop-blur-2xl transition-all duration-300 z-30 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-white/10 dark:border-white/5">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                Capacity <span className="text-indigo-400 text-xs px-1.5 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/20">CONNECT</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">
                {currentUser.clearanceTag}
              </span>
            </div>
          )}
        </Link>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/5 hover:text-white transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Role Badge Indicator */}
      {!collapsed && (
        <div className="mx-4 mt-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
              Active Clearance
            </span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="text-xs font-bold text-white block truncate">{currentUser.name}</span>
          <span className="text-[10px] text-indigo-400 font-mono block truncate">{currentUser.title}</span>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {currentNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href.split("#")[0];

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-xs font-semibold transition-all group ${
                isActive
                  ? "bg-indigo-600/20 text-white border border-indigo-500/30 shadow-sm"
                  : "text-neutral-400 hover:bg-white/[0.04] hover:text-neutral-200 border border-transparent"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? "text-indigo-400" : "text-neutral-400"
                }`}
              />

              {!collapsed && (
                <div className="flex flex-1 items-center justify-between truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-semibold font-mono ${
                        item.alert
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : item.pulse
                          ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 animate-pulse"
                          : "bg-white/5 text-neutral-400 border border-white/10"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Role Switcher helper */}
      {!collapsed && (
        <div className="p-4 border-t border-white/10 dark:border-white/5 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
            Switch Workspace
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setRole("learner")}
              className={`p-2 rounded-xl text-[11px] font-semibold border transition-all text-left truncate ${
                role === "learner"
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                  : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white"
              }`}
            >
              Learner
            </button>
            <button
              onClick={() => setRole("manager")}
              className={`p-2 rounded-xl text-[11px] font-semibold border transition-all text-left truncate ${
                role === "manager"
                  ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                  : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white"
              }`}
            >
              Manager
            </button>
            <button
              onClick={() => setRole("trainer")}
              className={`p-2 rounded-xl text-[11px] font-semibold border transition-all text-left truncate ${
                role === "trainer"
                  ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300"
                  : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white"
              }`}
            >
              Trainer
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`p-2 rounded-xl text-[11px] font-semibold border transition-all text-left truncate ${
                role === "admin"
                  ? "bg-violet-500/20 border-violet-500/40 text-violet-300"
                  : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white"
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
