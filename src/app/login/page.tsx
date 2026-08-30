"use client";

import React, { useState, useEffect, Suspense } from "react";
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
  AlertTriangle,
  Grid,
  Zap,
  Target,
  BookOpen,
  Eye,
  EyeOff,
  UserPlus,
  RefreshCw,
  HelpCircle,
} from "lucide-react";

function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 9) + 2;
  const num2 = Math.floor(Math.random() * 9) + 1;
  const operations = ["+", "-", "*"];
  const op = operations[Math.floor(Math.random() * operations.length)];
  let answer = 0;
  if (op === "+") answer = num1 + num2;
  else if (op === "-") answer = num1 - num2;
  else answer = num1 * num2;

  return { prompt: `${num1} ${op} ${num2}`, answer: String(answer) };
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRoleParam = searchParams?.get("role") as RoleType | null;

  const { login, setDemoToast } = useAppState();

  const [activeRoleTab, setActiveRoleTab] = useState<RoleType>(
    initialRoleParam === "manager" ||
      initialRoleParam === "trainer" ||
      initialRoleParam === "admin"
      ? initialRoleParam
      : "learner"
  );

  const [email, setEmail] = useState(DEMO_USERS[activeRoleTab].email);
  const [password, setPassword] = useState("Passcode@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState({ prompt: "7 + 5", answer: "12" });
  const [captchaInput, setCaptchaInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Generate new dynamic CAPTCHA on mount
  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleRefreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
    setAuthError(null);
  };

  const handleRoleSelect = (role: RoleType) => {
    setActiveRoleTab(role);
    setEmail(DEMO_USERS[role].email);
    setPassword("Passcode@2026");
    setAuthError(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    // 1. Validate CAPTCHA
    if (captchaInput.trim() !== captcha.answer) {
      setAuthError(`Security CAPTCHA verification failed. Solve: ${captcha.prompt} = ?`);
      handleRefreshCaptcha();
      return;
    }

    setIsAuthenticating(true);

    setTimeout(() => {
      const result = login(email, password);
      if (!result.success) {
        setAuthError(result.error || "Authentication failed. Please check your credentials.");
        setIsAuthenticating(false);
        handleRefreshCaptcha();
      } else {
        setDemoToast({
          message: `Authenticated successfully. TLS 1.3 session established for ${email}.`,
          type: "success",
        });
        router.push(`/${activeRoleTab}`);
      }
    }, 500);
  };

  const roleDetails = {
    learner: {
      title: "Employee Learning & Competency Portal",
      description: "Track live skill gaps on your Skill Radar, complete modular MNC courses, take certification-grade assessments, and earn verifiable credentials.",
      badge: "Learner RBAC",
      badgeColor: "success" as const,
      color: "from-emerald-500/20 to-indigo-500/10 border-emerald-500/30",
      accentBtn: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30",
      demoName: "Alex Rivera",
      demoMeta: "Fullstack Developer (L2) · Engineering",
    },
    manager: {
      title: "People Leadership & Team Command",
      description: "Inspect team-wide competency heatmaps, send 1-click reminders to at-risk employees, nominate engineers for training, and track skill growth.",
      badge: "People Lead RBAC",
      badgeColor: "cyan" as const,
      color: "from-cyan-500/20 to-indigo-500/10 border-cyan-500/30",
      accentBtn: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/30",
      demoName: "Sarah Chen",
      demoMeta: "Director of Engineering · 4 Direct Reports",
    },
    trainer: {
      title: "L&D Curriculum & Assessment Studio",
      description: "Author modular courses and learning paths, synthesize 5-question assessments with AI, track cohort pass rates, and schedule live workshops.",
      badge: "L&D Trainer RBAC",
      badgeColor: "purple" as const,
      color: "from-indigo-500/20 to-cyan-500/10 border-indigo-500/30",
      accentBtn: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30",
      demoName: "Marcus Vance",
      demoMeta: "Principal L&D Architect · Talent Development",
    },
    admin: {
      title: "Super Admin Governance & Command",
      description: "Define organizational competency frameworks (1-5 proficiency scales), monitor department-wide heatmaps, and track enterprise training ROI.",
      badge: "Super Admin RBAC",
      badgeColor: "purple" as const,
      color: "from-violet-500/20 to-indigo-500/10 border-violet-500/30",
      accentBtn: "bg-violet-600 hover:bg-violet-500 shadow-violet-600/30",
      demoName: "Dr. Elena Rostova",
      demoMeta: "Chief Learning Officer · Enterprise Admin",
    },
  }[activeRoleTab];

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
          <span className="text-neutral-400 hidden sm:inline">New to the platform?</span>
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
          {/* Left Column: Role Details & Account Switcher (5 Cols) */}
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

            {/* Account Quick-Fill Cards */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Select Enterprise Account Profile:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleRoleSelect("learner")}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    activeRoleTab === "learner"
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                      : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="text-[9px] font-bold uppercase block text-emerald-400">Learner</span>
                  <span className="text-xs font-semibold text-white block">Alex Rivera</span>
                  <span className="text-[10px] text-neutral-500">Fullstack L2</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect("manager")}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    activeRoleTab === "manager"
                      ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                      : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="text-[9px] font-bold uppercase block text-cyan-400">Manager</span>
                  <span className="text-xs font-semibold text-white block">Sarah Chen</span>
                  <span className="text-[10px] text-neutral-500">Director of Eng</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect("trainer")}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    activeRoleTab === "trainer"
                      ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300"
                      : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="text-[9px] font-bold uppercase block text-indigo-400">Trainer</span>
                  <span className="text-xs font-semibold text-white block">Marcus Vance</span>
                  <span className="text-[10px] text-neutral-500">Principal L&D</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect("admin")}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    activeRoleTab === "admin"
                      ? "bg-violet-500/20 border-violet-500/40 text-violet-300"
                      : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="text-[9px] font-bold uppercase block text-violet-400">Admin</span>
                  <span className="text-xs font-semibold text-white block">Dr. Elena Rostova</span>
                  <span className="text-[10px] text-neutral-500">Chief Learning Officer</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Secure Login Form with CAPTCHA (7 Cols) */}
          <div className="lg:col-span-7">
            <div className={`rounded-3xl border bg-[#0b0e18]/95 backdrop-blur-2xl p-8 shadow-2xl space-y-6 ${roleDetails.color}`}>
              {/* Form Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Enterprise Authentication
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> TLS 1.3 Active
                </span>
              </div>

              {/* Error Alert */}
              {authError && (
                <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-medium text-neutral-300">
                    Enterprise Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-neutral-300">Security Password</label>
                    <span className="text-[10px] text-indigo-400 hover:underline cursor-pointer">
                      Reset Password
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
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

                {/* DYNAMIC SECURITY CAPTCHA VERIFICATION */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-neutral-300 flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                      Security Verification (Human Check)
                    </label>
                    <button
                      type="button"
                      onClick={handleRefreshCaptcha}
                      className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <RefreshCw className="h-3 w-3" /> Refresh
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="px-4 py-2.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-white font-mono text-sm tracking-widest select-none">
                      {captcha.prompt} = ?
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Enter Answer"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 font-mono text-center text-sm font-bold"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-neutral-400 pt-1 text-[11px]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded bg-white/5 border-white/10 text-indigo-600 focus:ring-0"
                    />
                    <span>Remember SSO Device</span>
                  </label>
                  <span>Encrypted End-to-End</span>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className={`w-full py-3.5 rounded-2xl text-white text-xs sm:text-sm font-bold shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.01] ${roleDetails.accentBtn}`}
                >
                  <KeyRound className="h-4 w-4" />
                  {isAuthenticating
                    ? "Verifying Credentials & CAPTCHA..."
                    : `Authenticate ${roleDetails.badge}`}
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="pt-2 text-center text-[11px] text-neutral-400 border-t border-white/5">
                  Need a new organizational account?{" "}
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
        <p>CAPACITY CONNECT · Digital Capacity Building & Learning Management Portal · Real-Time Auth Engine</p>
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
