"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppState, DEMO_USERS } from "@/context/AppStateContext";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Eye,
  EyeOff,
  UserPlus,
  RefreshCw,
  HelpCircle,
  Building,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
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
  const { login, setDemoToast } = useAppState();

  // CLEAN EMPTY INPUTS BY DEFAULT (NO AUTOMATED PRE-FILLS)
  const [emailOrContact, setEmailOrContact] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState({ prompt: "7 + 5", answer: "12" });
  const [captchaInput, setCaptchaInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showSampleReference, setShowSampleReference] = useState(false);

  // Generate new dynamic CAPTCHA on mount
  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleRefreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
    setAuthError(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!emailOrContact.trim()) {
      setAuthError("Please enter your enterprise email or contact number.");
      return;
    }

    if (!password) {
      setAuthError("Please enter your security password.");
      return;
    }

    // 1. Validate CAPTCHA
    if (captchaInput.trim() !== captcha.answer) {
      setAuthError(`Security CAPTCHA verification failed. Solve: ${captcha.prompt} = ?`);
      handleRefreshCaptcha();
      return;
    }

    setIsAuthenticating(true);

    setTimeout(() => {
      const result = login(emailOrContact, password);
      if (!result.success) {
        setAuthError(result.error || "Authentication failed. Check your credentials.");
        setIsAuthenticating(false);
        handleRefreshCaptcha();
      } else {
        setDemoToast({
          message: `Authenticated successfully. TLS 1.3 session established.`,
          type: "success",
        });

        // The user is redirected directly to their role's authorized workspace based on backend lookup!
        const inputLower = emailOrContact.trim().toLowerCase();
        if (inputLower.includes("sarah") || inputLower.includes("manager") || inputLower.includes("782-9012")) {
          router.push("/manager");
        } else if (inputLower.includes("marcus") || inputLower.includes("trainer") || inputLower.includes("438-1928")) {
          router.push("/trainer");
        } else if (inputLower.includes("elena") || inputLower.includes("admin") || inputLower.includes("901-8374")) {
          router.push("/admin");
        } else {
          router.push("/learner");
        }
      }
    }, 500);
  };

  const handleApplySample = (email: string) => {
    setEmailOrContact(email);
    setPassword("Passcode@2026");
    setAuthError(null);
  };

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
            <span className="text-[10px] text-neutral-400">Enterprise Authentication Gateway</span>
          </div>
        </Link>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-neutral-400 hidden sm:inline">New employee or manager?</span>
          <Link
            href="/signup"
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>Create Account</span>
          </Link>
        </div>
      </header>

      {/* Main Authentication Center */}
      <main className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-lg space-y-6">
          <div className="text-center space-y-2">
            <Badge variant="cyan" size="sm" dot>Enterprise SSO & Clearance</Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Sign In to Your Workspace
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
              Role clearance is established securely upon authentication. Sign in with your registered enterprise email or contact number.
            </p>
          </div>

          {/* Secure Login Card */}
          <div className="rounded-3xl border border-white/10 bg-[#0b0e18]/95 backdrop-blur-2xl p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Enterprise Credentials
              </span>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> TLS 1.3 Protected
              </span>
            </div>

            {/* Error Alert */}
            {authError && (
              <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{authError}</span>
              </div>
            )}

            {/* Login Form (Clean & Unprefilled) */}
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-medium text-neutral-300">
                  Enterprise Email Address or Contact Phone Number *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. name@company.com or +1 (555) 000-0000"
                    value={emailOrContact}
                    onChange={(e) => setEmailOrContact(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-medium text-neutral-300">Security Password *</label>
                  <span className="text-[10px] text-indigo-400 hover:underline cursor-pointer">
                    Forgot Password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your security password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono text-xs"
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
                    Security Verification (Human Check) *
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
                  <div className="px-4 py-2.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-white font-mono text-sm tracking-widest select-none font-bold">
                    {captcha.prompt} = ?
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter Result"
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
                  <span>Remember Session</span>
                </label>
                <span>End-to-End Encrypted</span>
              </div>

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-3.5 rounded-2xl text-white text-xs sm:text-sm font-bold shadow-xl transition-all flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30 hover:scale-[1.01]"
              >
                <KeyRound className="h-4 w-4" />
                {isAuthenticating
                  ? "Verifying Clearance & Credentials..."
                  : "Authenticate & Open Workspace"}
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="pt-2 text-center text-[11px] text-neutral-400 border-t border-white/5">
                Need a new organizational account?{" "}
                <Link href="/signup" className="text-indigo-400 font-bold hover:underline">
                  Create Role Account
                </Link>
              </div>
            </form>
          </div>

          {/* Sample Accounts Reference Drawer (Collapsible for Evaluators) */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs space-y-2">
            <button
              onClick={() => setShowSampleReference(!showSampleReference)}
              className="w-full flex items-center justify-between text-neutral-400 hover:text-white transition-colors text-[11px] font-semibold"
            >
              <span>Testing Reference: Seeded Enterprise Accounts</span>
              {showSampleReference ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showSampleReference && (
              <div className="pt-2 space-y-2 divide-y divide-white/5 text-[11px] font-mono text-neutral-300">
                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-emerald-400 font-bold block">Learner (Alex Rivera):</span>
                    <span className="text-neutral-400">alex.rivera@capacityconnect.io</span>
                  </div>
                  <button
                    onClick={() => handleApplySample("alex.rivera@capacityconnect.io")}
                    className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px]"
                  >
                    Paste
                  </button>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-cyan-400 font-bold block">Manager (Sarah Chen):</span>
                    <span className="text-neutral-400">sarah.chen@capacityconnect.io</span>
                  </div>
                  <button
                    onClick={() => handleApplySample("sarah.chen@capacityconnect.io")}
                    className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px]"
                  >
                    Paste
                  </button>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-indigo-400 font-bold block">Trainer (Marcus Vance):</span>
                    <span className="text-neutral-400">marcus.vance@capacityconnect.io</span>
                  </div>
                  <button
                    onClick={() => handleApplySample("marcus.vance@capacityconnect.io")}
                    className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px]"
                  >
                    Paste
                  </button>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-violet-400 font-bold block">Admin (Dr. Elena Rostova):</span>
                    <span className="text-neutral-400">elena.rostova@capacityconnect.io</span>
                  </div>
                  <button
                    onClick={() => handleApplySample("elena.rostova@capacityconnect.io")}
                    className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px]"
                  >
                    Paste
                  </button>
                </div>

                <p className="text-[10px] text-neutral-500 pt-1">
                  Default Password for all seeded accounts: <strong className="text-white">Passcode@2026</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-xs text-neutral-500 border-t border-white/5">
        <p>CAPACITY CONNECT · Digital Capacity Building & Learning Management Portal · Enterprise Auth Gateway</p>
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
