"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAppState, RoleType, DEMO_USERS } from "@/context/AppStateContext";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  User,
  GraduationCap,
  Building2,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Grid,
  Zap,
  Target,
  BookOpen,
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRoleParam = searchParams?.get("role") as RoleType | null;

  const { login } = useAppState();

  const [activeRole, setActiveRole] = useState<RoleType>(
    initialRoleParam === "manager" ||
      initialRoleParam === "trainer" ||
      initialRoleParam === "admin"
      ? initialRoleParam
      : "learner"
  );

  const [emailOrId, setEmailOrId] = useState(DEMO_USERS[activeRole].email);
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleRoleChange = (role: RoleType) => {
    setActiveRole(role);
    setEmailOrId(DEMO_USERS[role].email);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      login(activeRole);
      router.push(`/${activeRole}`);
    }, 600);
  };

  const handleFastPass = (role: RoleType) => {
    setActiveRole(role);
    setIsAuthenticating(true);
    setTimeout(() => {
      login(role);
      router.push(`/${role}`);
    }, 350);
  };

  const roleDetails = {
    learner: {
      title: "Employee Learner Account",
      description: "Track live skill gaps on your Skill Radar, complete modular courses, take auto-graded assessments, and earn verifiable certificates.",
      badge: "Learner Clearance",
      badgeColor: "success" as const,
      color: "from-emerald-500/20 to-indigo-500/10 border-emerald-500/30",
      accentBtn: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30",
      icon: User,
      demoName: "Alex Rivera",
      demoMeta: "Fullstack Developer (L2) · Engineering",
      features: [
        { icon: Target, text: "Live Skill Radar comparing Current vs Required Levels" },
        { icon: Sparkles, text: "AI-Powered Skill Gap Career Advisor" },
        { icon: BookOpen, text: "Peer Knowledge Hub & Ask an Expert Q&A" },
      ],
    },
    manager: {
      title: "People Leadership Account",
      description: "Inspect team-wide competency heatmaps, send 1-click reminders to at-risk employees, nominate employees for training, and track skill growth.",
      badge: "People Lead Clearance",
      badgeColor: "cyan" as const,
      color: "from-cyan-500/20 to-indigo-500/10 border-cyan-500/30",
      accentBtn: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/30",
      icon: Grid,
      demoName: "Sarah Chen",
      demoMeta: "Director of Engineering · 4 Direct Reports",
      features: [
        { icon: Grid, text: "Interactive Team Competency Heatmap (L1-L5)" },
        { icon: Zap, text: "Manager 1-Click Nudge System for Overdue Members" },
        { icon: CheckCircle2, text: "Training Nomination & Request Approval Engine" },
      ],
    },
    trainer: {
      title: "L&D Trainer Studio Account",
      description: "Author modular courses and learning paths, synthesize 5-question assessments with AI, track cohort pass rates, and schedule live workshops.",
      badge: "L&D Trainer Clearance",
      badgeColor: "purple" as const,
      color: "from-indigo-500/20 to-cyan-500/10 border-indigo-500/30",
      accentBtn: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30",
      icon: GraduationCap,
      demoName: "Marcus Vance",
      demoMeta: "Principal L&D Architect · Talent Development",
      features: [
        { icon: Sparkles, text: "AI Quiz Generator from Raw Lecture Content" },
        { icon: BookOpen, text: "Modular Course & Competency Path Builder" },
        { icon: User, text: "Cohort Analytics & Live Virtual Workshop Scheduler" },
      ],
    },
    admin: {
      title: "Super Admin Command Account",
      description: "Define organizational competency frameworks (1-5 proficiency scales), monitor department-wide heatmaps, and track enterprise training ROI.",
      badge: "Super Admin Clearance",
      badgeColor: "purple" as const,
      color: "from-violet-500/20 to-indigo-500/10 border-violet-500/30",
      accentBtn: "bg-violet-600 hover:bg-violet-500 shadow-violet-600/30",
      icon: Building2,
      demoName: "Dr. Elena Rostova",
      demoMeta: "Chief Learning Officer · Enterprise Admin",
      features: [
        { icon: Target, text: "Master Competency Framework Engine" },
        { icon: Grid, text: "Org-Wide Department Heatmap & Skill Distribution" },
        { icon: Building2, text: "Enterprise Training ROI & Engagement Analytics" },
      ],
    },
  }[activeRole];

  const CurrentIcon = roleDetails.icon;

  return (
    <div className="min-h-screen bg-[#05060a] text-neutral-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navbar */}
      <header className="flex h-16 items-center justify-between px-6 lg:px-16 border-b border-white/5 bg-[#05060a]/80 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/30">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              Capacity <span className="text-indigo-400 text-xs px-1.5 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/20">CONNECT</span>
            </span>
            <span className="text-[10px] text-neutral-400">Enterprise Capacity Building Gateway</span>
          </div>
        </Link>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-neutral-400 hidden sm:inline">New to Capacity Connect?</span>
          <Link
            href="/signup"
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>Create Account</span>
          </Link>
        </div>
      </header>

      {/* Main Authentication Card Center */}
      <main className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Role Details & Fast-Pass Switchers (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <Badge variant={roleDetails.badgeColor} size="sm" dot>
                {roleDetails.badge}
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {roleDetails.title}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {roleDetails.description}
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-2.5 pt-2">
              {roleDetails.features.map((feat, idx) => {
                const FeatIcon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-neutral-300"
                  >
                    <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                      <FeatIcon className="h-4 w-4" />
                    </div>
                    <span>{feat.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Fast-Pass 1-Click Login Cards for Judges */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Judge 1-Click Fast-Pass Access:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handleFastPass("learner")}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    activeRole === "learner"
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                      : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="text-[9px] font-bold uppercase block">Learner</span>
                  <span className="text-[11px] font-semibold text-white truncate block">Alex R.</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleFastPass("manager")}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    activeRole === "manager"
                      ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                      : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="text-[9px] font-bold uppercase block">Manager</span>
                  <span className="text-[11px] font-semibold text-white truncate block">Sarah C.</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleFastPass("trainer")}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    activeRole === "trainer"
                      ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300"
                      : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="text-[9px] font-bold uppercase block">Trainer</span>
                  <span className="text-[11px] font-semibold text-white truncate block">Marcus V.</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleFastPass("admin")}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    activeRole === "admin"
                      ? "bg-violet-500/20 border-violet-500/40 text-violet-300"
                      : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="text-[9px] font-bold uppercase block">Admin</span>
                  <span className="text-[11px] font-semibold text-white truncate block">Dr. Elena</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Login Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className={`rounded-3xl border bg-[#0b0e18]/95 backdrop-blur-2xl p-8 shadow-2xl space-y-6 ${roleDetails.color}`}>
              {/* Role Switcher Tabs */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-black/40 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => handleRoleChange("learner")}
                  className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                    activeRole === "learner"
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <User className="h-3 w-3" />
                  <span>Learner</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange("manager")}
                  className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                    activeRole === "manager"
                      ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Grid className="h-3 w-3" />
                  <span>Manager</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange("trainer")}
                  className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                    activeRole === "trainer"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <GraduationCap className="h-3 w-3" />
                  <span>Trainer</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange("admin")}
                  className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                    activeRole === "admin"
                      ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Building2 className="h-3 w-3" />
                  <span>Admin</span>
                </button>
              </div>

              {/* Verified Demo Identity Banner */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 border border-white/10">
                    <CurrentIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{roleDetails.demoName}</span>
                    <span className="text-[10px] text-neutral-400">{roleDetails.demoMeta}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Pre-Authorized
                </span>
              </div>

              {/* Login Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-medium text-neutral-300">
                    Enterprise SSO Email / Employee ID
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input
                      type="text"
                      required
                      value={emailOrId}
                      onChange={(e) => setEmailOrId(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-neutral-300">Security Passcode</label>
                    <span className="text-[10px] text-indigo-400 cursor-pointer hover:underline">
                      Forgot Password?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-10 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-neutral-400 pt-1 text-[11px]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded bg-white/5 border-white/10 text-indigo-600 focus:ring-0"
                    />
                    <span>Remember SSO Session</span>
                  </label>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" /> TLS 1.3 Enterprise RBAC
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className={`w-full py-3.5 rounded-2xl text-white text-xs sm:text-sm font-bold shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02] ${roleDetails.accentBtn}`}
                >
                  <KeyRound className="h-4 w-4" />
                  {isAuthenticating
                    ? "Authenticating Session..."
                    : `Enter ${roleDetails.title}`}
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="pt-2 text-center text-[11px] text-neutral-400 border-t border-white/5">
                  Need a new organizational role?{" "}
                  <Link href="/signup" className="text-indigo-400 font-bold hover:underline">
                    Create a Role Account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-xs text-neutral-500 border-t border-white/5">
        <p>CAPACITY CONNECT · Digital Capacity Building & Learning Management Portal · RBAC v2.4</p>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#05060a] flex items-center justify-center text-xs text-neutral-400 gap-2">
          <Sparkles className="h-4 w-4 animate-spin text-indigo-400" />
          Loading Capacity Connect Gateway...
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
