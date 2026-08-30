"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAppState, RoleType, UserProfile } from "@/context/AppStateContext";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  User,
  GraduationCap,
  Building2,
  Lock,
  Mail,
  Phone,
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
  Briefcase,
  Building,
} from "lucide-react";

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRoleParam = searchParams?.get("role") as RoleType | null;

  const { registerUser, setDemoToast, competencies } = useAppState();

  // Strictly ONLY Learner, Manager, or Trainer (Admin is permanently removed from public signup)
  const [selectedRole, setSelectedRole] = useState<"learner" | "manager" | "trainer">(
    initialRoleParam === "manager"
      ? "manager"
      : initialRoleParam === "trainer"
      ? "trainer"
      : "learner"
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [jobTitle, setJobTitle] = useState("Junior Software Engineer");
  const [baselineSkillLevel, setBaselineSkillLevel] = useState<number>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRoleSelect = (role: "learner" | "manager" | "trainer") => {
    setSelectedRole(role);
    setValidationError(null);
    if (role === "learner") {
      setJobTitle("Junior Software Engineer");
      setDepartment("Engineering");
    } else if (role === "manager") {
      setJobTitle("Engineering Manager / People Lead");
      setDepartment("Engineering Leadership");
    } else if (role === "trainer") {
      setJobTitle("Technical Curriculum Architect");
      setDepartment("Curriculum & Talent Development");
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Strict Field Validations
    if (!fullName.trim() || fullName.trim().length < 3) {
      setValidationError("Please enter your full official name (minimum 3 characters).");
      return;
    }

    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setValidationError("Please enter a valid corporate enterprise email address.");
      return;
    }

    if (!contactNumber.trim() || contactNumber.trim().length < 7) {
      setValidationError("Please enter a valid contact phone number with country code.");
      return;
    }

    if (!password || password.length < 6) {
      setValidationError("Password must be at least 6 characters in length.");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match. Please re-enter.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Clean pristine account: 0 completed courses, 0 pre-populated certificates
      const newUserId = `usr-${Date.now()}`;
      const newUser: UserProfile = {
        id: newUserId,
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        contactNumber: contactNumber.trim(),
        password: password,
        avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?w=150&auto=format&fit=crop&q=80`,
        role: selectedRole,
        department,
        jobRoleId: selectedRole === "manager" ? "role-sr-cloud-arch" : "role-fullstack-l2",
        jobTitle,
        organization: "Capacity Connect Enterprise",
        employeeId: `EMP-${department.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        points: 100, // Onboarding starter points
        streakDays: 1,
        completedCoursesCount: 0,
        isNewUser: true,
        competencies: competencies.slice(0, 6).map((c) => ({
          competencyId: c.id,
          currentLevel: Math.max(1, baselineSkillLevel),
          lastAssessedAt: "Baseline Initialized",
          verifiedBy: "Self-Reported Baseline",
          scorePercent: 0,
        })),
      };

      registerUser(newUser);

      setDemoToast({
        message: `Account created for ${newUser.name}! Your ${selectedRole.toUpperCase()} workspace is now provisioned with clean 0% progression.`,
        type: "success",
      });

      router.push(`/${selectedRole}`);
    }, 700);
  };

  const roleMeta = {
    learner: {
      title: "Employee Learner Account",
      desc: "Gain instant access to personal Skill Radars, AI gap analysis, MNC course workbenches, and verifiable certificates.",
      badge: "Learner RBAC",
      badgeColor: "success" as const,
      color: "from-emerald-500/20 to-indigo-500/10 border-emerald-500/30",
      btnColor: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30",
      perks: [
        "Live 1-5 Skill Radar baseline mapping",
        "Personalized AI Career Gap Advisor",
        "Auto-issued cryptographic certificates upon course completion",
      ],
    },
    manager: {
      title: "People Leadership Account",
      desc: "Oversee team proficiency distribution, send 1-click reminders to at-risk employees, and approve training requests.",
      badge: "Manager RBAC",
      badgeColor: "cyan" as const,
      color: "from-cyan-500/20 to-indigo-500/10 border-cyan-500/30",
      btnColor: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/30",
      perks: [
        "Team-wide competency heatmap access",
        "1-Click Manager Nudge system",
        "Course nomination & budget approvals",
      ],
    },
    trainer: {
      title: "L&D Trainer / Instructor Account",
      desc: "Live mentor connection with enrolled cohorts, AI quiz generator from documentation, course catalog authoring, and workshop sandboxes.",
      badge: "Trainer RBAC",
      badgeColor: "purple" as const,
      color: "from-indigo-500/20 to-cyan-500/10 border-indigo-500/30",
      btnColor: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30",
      perks: [
        "Live Cohort Connect & Roster Broadcasts",
        "AI Quiz Generator from raw documentation",
        "Curriculum & learning path authoring",
      ],
    },
  }[selectedRole];

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
          {/* Left Column: Role Details & Clear Information (5 Cols) */}
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

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-neutral-400 space-y-1">
              <span className="font-bold text-white block">Enterprise Role Policy:</span>
              <p className="text-[11px] leading-relaxed">
                Choose your official organizational designation. Super Admin clearance is pre-provisioned via executive LDAP infrastructure and cannot be registered publicly.
              </p>
            </div>
          </div>

          {/* Right Column: Registration Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className={`rounded-3xl border bg-[#0b0e18]/95 backdrop-blur-2xl p-8 shadow-2xl space-y-6 ${roleMeta.color}`}>
              {/* Role Selection Tabs (Learner, Manager, Trainer ONLY) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                  Select Role Clearance
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 rounded-2xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("learner")}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      selectedRole === "learner"
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <User className="h-3.5 w-3.5" />
                    <span>Learner</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect("manager")}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      selectedRole === "manager"
                        ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Grid className="h-3.5 w-3.5" />
                    <span>Manager</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect("trainer")}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      selectedRole === "trainer"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span>Trainer</span>
                  </button>
                </div>
              </div>

              {/* Validation Error Alert */}
              {validationError && (
                <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Signup Form */}
              <form onSubmit={handleSignupSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-medium text-neutral-300">Full Official Name *</label>
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
                    <label className="font-medium text-neutral-300">Contact Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 492-8102"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-neutral-300">Enterprise Corporate Email *</label>
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
                        <option value="Curriculum & Talent Development">Curriculum & Talent Development</option>
                        <option value="Executive & People Operations">Executive & People Operations</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-neutral-300">Job Title / Designation</label>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-medium text-neutral-300">Security Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Min 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-10 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-neutral-300">Confirm Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-10 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 font-mono"
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
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" /> Clean 0% Progression Initialized
                  </span>
                  <span>Instant RBAC Clearance</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-2xl text-white text-xs sm:text-sm font-bold shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.01] ${roleMeta.btnColor}`}
                >
                  <UserPlus className="h-4 w-4" />
                  {isSubmitting
                    ? "Provisioning Account & Establishing Role Clearance..."
                    : `Create & Initialize ${roleMeta.title}`}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-xs text-neutral-500 border-t border-white/5">
        <p>CAPACITY CONNECT · Digital Capacity Building & Learning Management Portal · Enterprise Registration</p>
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
