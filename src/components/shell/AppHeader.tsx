"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppState, RoleType, DEMO_USERS } from "@/context/AppStateContext";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Sparkles,
  Command,
  HelpCircle,
  SlidersHorizontal,
  LogOut,
  User,
  GraduationCap,
  Building2,
  ChevronDown,
  ShieldCheck,
  Grid,
  Zap,
} from "lucide-react";
import { NotificationCenter } from "./NotificationCenter";

export const AppHeader: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    role,
    setRole,
    currentUser,
    logout,
    theme,
    toggleTheme,
    notifications,
    setIsCommandPaletteOpen,
  } = useAppState();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n: any) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push("/login");
  };

  const handleSwitchRole = (newRole: RoleType) => {
    setRole(newRole);
    setShowUserMenu(false);
    router.push(`/${newRole}`);
  };

  // Breadcrumbs title from pathname
  const getPageTitle = () => {
    if (pathname.includes("verify")) return "Public Certificate Cryptographic Verification";
    if (pathname === "/learner") return "Employee Learning & Competency Portfolio";
    if (pathname === "/manager") return "People Leadership & Team Competency Command";
    if (pathname === "/trainer") return "L&D Curriculum & Assessment Studio";
    if (pathname === "/admin") return "Enterprise Competency Framework & Executive ROI";
    return "Capacity Connect";
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-white/10 dark:border-white/5 bg-[#080a10]/80 backdrop-blur-xl px-6">
      {/* Title & Path Status */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 font-mono">
              {role.toUpperCase()} WORKSPACE
            </span>
            <span className="text-neutral-600">/</span>
            <h1 className="text-sm font-bold text-neutral-100">{getPageTitle()}</h1>
          </div>
        </div>
      </div>

      {/* Action Center */}
      <div className="flex items-center gap-3">
        {/* Global Command Palette Trigger */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center gap-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 px-3.5 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 transition-all shadow-inner"
        >
          <Search className="h-3.5 w-3.5 text-neutral-400" />
          <span className="hidden sm:inline">Search competencies, courses, experts...</span>
          <kbd className="inline-flex items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-neutral-300">
            <Command className="h-2.5 w-2.5" /> K
          </kbd>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-xl p-2 text-neutral-400 hover:bg-white/5 hover:text-white border border-white/5 transition-colors"
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-xl p-2 text-neutral-400 hover:bg-white/5 hover:text-white border border-white/5 transition-colors"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Drawer */}
          {showNotifications && (
            <NotificationCenter onClose={() => setShowNotifications(false)} />
          )}
        </div>

        {/* User Profile & Logout Session Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1 pl-2 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all"
          >
            <div className="flex flex-col text-right hidden sm:block">
              <span className="text-xs font-bold text-white leading-none">{currentUser.name}</span>
              <span className="text-[10px] text-neutral-400 leading-tight">{currentUser.clearanceTag}</span>
            </div>
            <div className="w-8 h-8 rounded-xl overflow-hidden border border-white/15 bg-neutral-800 shrink-0">
              <img src={currentUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-neutral-400 mr-1" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/10 bg-[#0e111a]/95 backdrop-blur-2xl shadow-2xl p-2 z-50 animate-in fade-in duration-150 space-y-1">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 mb-1">
                <span className="text-xs font-bold text-white block">{currentUser.name}</span>
                <span className="text-[11px] text-neutral-400 block">{currentUser.email}</span>
                <span className="text-[10px] font-mono text-indigo-400 mt-1 inline-block">
                  {currentUser.title}
                </span>
              </div>

              <div className="text-[10px] uppercase font-bold text-neutral-500 px-2 py-1">
                Switch Role Clearance
              </div>

              <button
                onClick={() => handleSwitchRole("learner")}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all ${
                  role === "learner"
                    ? "bg-emerald-500/15 text-emerald-300 font-bold"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5" /> Learner Portal
                </span>
                {role === "learner" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
              </button>

              <button
                onClick={() => handleSwitchRole("manager")}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all ${
                  role === "manager"
                    ? "bg-cyan-500/15 text-cyan-300 font-bold"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Grid className="h-3.5 w-3.5" /> Manager Portal
                </span>
                {role === "manager" && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
              </button>

              <button
                onClick={() => handleSwitchRole("trainer")}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all ${
                  role === "trainer"
                    ? "bg-indigo-500/15 text-indigo-300 font-bold"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-3.5 w-3.5" /> Trainer Studio
                </span>
                {role === "trainer" && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
              </button>

              <button
                onClick={() => handleSwitchRole("admin")}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all ${
                  role === "admin"
                    ? "bg-violet-500/15 text-violet-300 font-bold"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5" /> Super Admin
                </span>
                {role === "admin" && <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />}
              </button>

              <div className="pt-2 border-t border-white/5 mt-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" /> Log Out Session
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
