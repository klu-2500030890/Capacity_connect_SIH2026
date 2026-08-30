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
  Briefcase,
  Building,
} from "lucide-react";

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRoleParam = searchParams?.get("role") as RoleType | null;

  const { login, setDemoToast } = useAppState();

  const [selectedRole, setSelectedRole] = useState<RoleType>(
    initialRoleParam === "manager" ||
      initialRoleParam === "trainer" ||
      initialRoleParam === "admin"
      ? initialRoleParam
      : "learner"
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [jobTitle, setJobTitle] = useState("Junior Software Engineer");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
    if (role === "learner") {
      setJobTitle("Junior Software Engineer");
      setDepartment("Engineering");
    } else if (role === "manager") {
      setJobTitle("Engineering Manager / Team Lead");
      setDepartment("Engineering & Platform");
    } else if (role === "trainer") {
      setJobTitle("Technical Curriculum Architect");
      setDepartment("Talent Development");
    } else if (role === "admin") {
      setJobTitle("Enterprise Learning Administrator");
      setDepartment("People Operations");
    }
  };

  const handlePreFill = (role: RoleType) => {
    setSelectedRole(role);
    if (role === "learner") {
      setFullName("Maya Patel");
      setEmail("maya.patel@capacityconnect.io");
      setDepartment("Engineering");
      setJobTitle("Fullstack Developer");
      setPassword("Passcode@2026");
    } else if (role === "manager") {
      setFullName("David Miller");
      setEmail("david.miller@capacityconnect.io");
      setDepartment("Product & Design");
      setJobTitle("Director of Product");
      setPassword("Passcode@2026");
    } else if (role === "trainer") {
      setFullName("Clara Hughes");
      setEmail("clara.hughes@capacityconnect.io");
      setDepartment("Talent Development");
      setJobTitle("Lead L&D Specialist");
      setPassword("Passcode@2026");
    } else {
      setFullName("Arthur Vance");
      setEmail("arthur.vance@capacityconnect.io");
      setDepartment("Executive & People Operations");
      setJobTitle("Chief People Officer");
      setPassword("Passcode@2026");
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login(selectedRole);
      setDemoToast({
        message: `Welcome to Capacity Connect, ${fullName || DEMO_USERS[selectedRole].name}! Your ${selectedRole.toUpperCase()} account has been provisioned.`,
        type: "success",
      });
      router.push(`/${selectedRole}`);
    }, 700);
  };

  const roleMeta = {
    learner: {
      title: "Employee Learner Account",
      desc: "Gain instant access to personal Skill Radars, AI gap analysis, course workbenches, and verifiable certificates.",
      badge: "Learner RBAC",
      badgeColor: "success" as const,
      color: "from-emerald-500/20 to-indigo-500/10 border-emerald-500/30",
      btnColor: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30",
      icon: User,
      perks: [
        "Live 1-5 Skill Radar baseline assessment",
        "Personalized AI Career Gap Advisor",
        "Auto-issued cryptographic certificates",
      ],
    },
    manager: {
      title: "People Leadership Account",
      desc: "Oversee team proficiency distribution, send 1-click reminders to at-risk employees, and approve training requests.",
      badge: "Manager RBAC",
      badgeColor: "cyan" as const,
      color: "from-cyan-500/20 to-indigo-500/10 border-cyan-500/30",
      btnColor: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/30",
      icon: Grid,
      perks: [
        "Team-wide competency heatmap access",
        "1-Click Manager Nudge system",
        "Course nomination & budget approvals",
      ],
    },
    trainer: {
      title: "L&D Trainer / Creator Account",
      desc: "Design modular courses, auto-generate quiz assessments with AI, track cohort pass rates, and host live workshops.",
      badge: "Trainer RBAC",
      badgeColor: "purple" as const,
      color: "from-indigo-500/20 to-cyan-500/10 border-indigo-500/30",
      btnColor: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30",
      icon: GraduationCap,
      perks: [
        "AI Quiz Generator from raw documentation",
        "Curriculum & learning path authoring",
        "Virtual lab & live session scheduler",
      ],
    },
    admin: {
      title: "Super Admin Governance Account",
      desc: "Define master competency scales, configure organizational job roles, and monitor enterprise training ROI.",
      badge: "Super Admin RBAC",
      badgeColor: "purple" as const,
      color: "from-violet-500/20 to-indigo-500/10 border-violet-500/30",
      btnColor: "bg-violet-600 hover:bg-violet-500 shadow-violet-600/30",
      icon: Building2,
      perks: [
        "Master Competency Framework editor (L1-L5)",
        "Enterprise-wide heatmap & ROI analytics",
        "User directory & role permission control",
      ],
    },
  }[selectedRole];

  const RoleIcon = roleMeta.icon;

  return (
    <div className="min-h-screen bg-[#05060a] text-neutral-100 flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navigation */}
      <header className="flex h-16 items-center justify-between px-6 lg:px-16 border-b border-white/5 bg-[#05060a]/80 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/30">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              Capacity <span className="text-indigo-400 text-xs px-1.5 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/20">CONNECT</span>
            </span>
            <span className="text-[10px] text-neutral-400">Enterprise Registration Gateway</span>
          </div>
        </Link>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-neutral-400 hidden sm:inline">Already registered?</span>
          <Link
            href="/login"
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 font-semibold transition-colors border border-white/10"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Registration Layout */}
      <main className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Role Details & Fast Pre-fills (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <Badge variant={roleMeta.badgeColor} size="sm" dot>
                {roleMeta.badge}
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {roleMeta.title}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {roleMeta.desc}
              </p>
            </div>

            {/* Perks checklist */}
            <div className="space-y-2 pt-2">
              {roleMeta.perks.map((perk, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-neutral-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* Judge 1-Click Fast Pre-Fill */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                1-Click Demo Pre-Fill:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handlePreFill("learner")}
                  className="p-2 rounded-xl bg-white/[0.02] hover:bg-emerald-500/20 text-neutral-300 hover:text-emerald-300 border border-white/5 text-left text-[11px] font-semibold transition-all"
                >
                  <span className="text-[9px] text-neutral-500 block">Learner</span>
                  Maya P.
                </button>
                <button
                  type="button"
                  onClick={() => handlePreFill("manager")}
                  className="p-2 rounded-xl bg-white/[0.02] hover:bg-cyan-500/20 text-neutral-300 hover:text-cyan-300 border border-white/5 text-left text-[11px] font-semibold transition-all"
                >
                  <span className="text-[9px] text-neutral-500 block">Manager</span>
                  David M.
                </button>
                <button
                  type="button"
                  onClick={() => handlePreFill("trainer")}
                  className="p-2 rounded-xl bg-white/[0.02] hover:bg-indigo-500/20 text-neutral-300 hover:text-indigo-300 border border-white/5 text-left text-[11px] font-semibold transition-all"
                >
                  <span className="text-[9px] text-neutral-500 block">Trainer</span>
                  Clara H.
                </button>
                <button
                  type="button"
                  onClick={() => handlePreFill("admin")}
                  className="p-2 rounded-xl bg-white/[0.02] hover:bg-violet-500/20 text-neutral-300 hover:text-violet-300 border border-white/5 text-left text-[11px] font-semibold transition-all"
                >
                  <span className="text-[9px] text-neutral-500 block">Admin</span>
                  Arthur V.
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className={`rounded-3xl border bg-[#0b0e18]/95 backdrop-blur-2xl p-8 shadow-2xl space-y-6 ${roleMeta.color}`}>
              {/* Role Selection Tabs */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                  Select Role Clearance
                </label>
                <div className="grid grid-cols-4 gap-1 p-1 bg-black/40 rounded-2xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("learner")}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                      selectedRole === "learner"
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <User className="h-3 w-3" />
                    <span>Learner</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect("manager")}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                      selectedRole === "manager"
                        ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Grid className="h-3 w-3" />
                    <span>Manager</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect("trainer")}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                      selectedRole === "trainer"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <GraduationCap className="h-3 w-3" />
                    <span>Trainer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect("admin")}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                      selectedRole === "admin"
                        ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Building2 className="h-3 w-3" />
                    <span>Admin</span>
                  </button>
                </div>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSignupSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-medium text-neutral-300">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya Patel"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-neutral-300">Enterprise Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-medium text-neutral-300">Department</label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full bg-[#0e111a] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Product & Design">Product & Design</option>
                        <option value="Operations & Security">Operations & Security</option>
                        <option value="Talent Development">Talent Development</option>
                        <option value="People Operations">People Operations</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-neutral-300">Job Role / Title</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                      <input
                        type="text"
                        required
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-neutral-300">Security Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Minimum 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-10 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
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

                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" /> RBAC Policy v2.4 Compliant
                  </span>
                  <span>Instant Setup · No Credit Card Required</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-2xl text-white text-xs sm:text-sm font-bold shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02] ${roleMeta.btnColor}`}
                >
                  <UserPlus className="h-4 w-4" />
                  {isSubmitting
                    ? "Provisioning RBAC Clearance..."
                    : `Create ${roleMeta.title}`}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-xs text-neutral-500 border-t border-white/5">
        <p>CAPACITY CONNECT · Digital Capacity Building & Learning Management Portal · Role-Based Security</p>
      </footer>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#05060a] flex items-center justify-center text-xs text-neutral-400 gap-2">
          <Sparkles className="h-4 w-4 animate-spin text-indigo-400" />
          Loading Capacity Connect Registration...
        </div>
      }
    >
      <SignupContent />
    </Suspense>
  );
}
