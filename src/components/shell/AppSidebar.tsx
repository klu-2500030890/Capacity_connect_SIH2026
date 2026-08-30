"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppState } from "@/context/AppStateContext";
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
  FileCheck,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  MessageSquare,
  LogOut,
  UserCheck,
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
  const router = useRouter();
  const { role, currentUser, currentProfile, logout, setDemoToast } = useAppState();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    setDemoToast({ message: "Securely logged out. RBAC session cleared.", type: "info" });
    router.push("/login");
  };

  // Learner Navigation Items
  const learnerNav: NavItem[] = [
    { href: "/learner", label: "My Academy", icon: LayoutDashboard, badge: "Daily XP" },
    { href: "/learner#radar", label: "Skill Radar Matrix", icon: Target, badge: "L1-L5 Live" },
    { href: "/learner#advisor", label: "AI Skill Gap Advisor", icon: Sparkles, badge: "Career Path", pulse: true },
    { href: "/learner#paths", label: "30-Day MNC Tracks", icon: Layers, badge: "Google/MSFT" },
    { href: "/learner#courses", label: "Enrolled Courses", icon: BookOpen },
    { href: "/learner#knowledge", label: "Knowledge Sharing Hub", icon: MessageSquare },
    { href: "/learner#sessions", label: "Live Workshops", icon: Calendar },
    { href: "/learner#certificates", label: "Certificates & Badges", icon: Award },
  ];

  // Manager Navigation Items
  const managerNav: NavItem[] = [
    { href: "/manager", label: "Team Command Hub", icon: LayoutDashboard, badge: "Direct Reports" },
    { href: "/manager#heatmap", label: "Competency Heatmap", icon: Grid, badge: "Org Grid", pulse: true },
    { href: "/manager#nudges", label: "At-Risk & Nudges", icon: Zap, alert: true },
    { href: "/manager#nominations", label: "Course Nominations", icon: FileCheck },
    { href: "/manager#analytics", label: "Team Velocity & ROI", icon: BarChart3 },
  ];

  // Trainer Navigation Items
  const trainerNav: NavItem[] = [
    { href: "/trainer", label: "L&D Studio", icon: LayoutDashboard, badge: "Curricula" },
    { href: "/trainer#builder", label: "Course & Path Builder", icon: Layers },
    { href: "/trainer#quiz-ai", label: "AI Quiz Generator", icon: Sparkles, badge: "Auto-Gen", pulse: true },
    { href: "/trainer#cohorts", label: "Cohort Progress", icon: Users },
    { href: "/trainer#workshops", label: "Workshop Scheduler", icon: Calendar },
  ];

  // Admin Navigation Items
  const adminNav: NavItem[] = [
    { href: "/admin", label: "Org Executive Command", icon: LayoutDashboard, badge: "Super Admin" },
    { href: "/admin#directory", label: "Global User Directory", icon: Users, badge: "RBAC Audit", pulse: true },
    { href: "/admin#framework", label: "Competency Framework", icon: Sliders, badge: "15 Skills" },
    { href: "/admin#heatmap", label: "Org-Wide Heatmap", icon: Grid },
    { href: "/admin#analytics", label: "Training ROI & Impact", icon: BarChart3 },
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
      className={`relative flex flex-col border-r border-white/10 bg-[#07080f]/95 backdrop-blur-2xl transition-all duration-300 z-30 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                Capacity <span className="text-indigo-400 text-xs px-1.5 py-0.2 rounded bg-indigo-500/15 border border-indigo-500/20">CONNECT</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-mono capitalize">{role} Workspace</span>
            </div>
          )}
        </Link>

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
        <div className="mx-4 mt-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
              Clearance Level
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {role}
            </span>
          </div>
          <span className="text-xs font-bold text-white block truncate">{currentUser.name}</span>
          <span className="text-[10px] text-neutral-400 font-mono block truncate">{currentUser.title}</span>
          {currentUser.contactNumber && (
            <span className="text-[9px] text-emerald-400 font-mono block truncate">{currentUser.contactNumber}</span>
          )}
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

      {/* Footer Profile & Secure Logout (NO WORKSPACE SWITCHING) */}
      <div className="p-4 border-t border-white/10 bg-black/40">
        {!collapsed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-white/10"
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-white block truncate">{currentUser.name}</span>
                <span className="text-[10px] text-neutral-400 truncate block">{currentUser.department}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-rose-500/20 text-neutral-300 hover:text-rose-300 border border-white/10 hover:border-rose-500/30 text-xs font-semibold transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log Out & Terminate Session</span>
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-300 transition-all flex items-center justify-center"
            title="Log Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </div>
    </aside>
  );
};
