"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppState, RoleType } from "@/context/AppStateContext";
import { EcosystemCanvas } from "@/components/landing/EcosystemCanvas";
import { Badge } from "@/components/ui/Badge";
import { SkillRadar } from "@/components/competency/SkillRadar";
import { CompetencyHeatmap } from "@/components/competency/CompetencyHeatmap";
import {
  Sparkles,
  ArrowRight,
  Target,
  BookOpen,
  Grid,
  Zap,
  Award,
  Users,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Compass,
  GraduationCap,
  Building2,
  Share2,
  Calendar,
  Layers,
  Flame,
  HelpCircle,
  BarChart3,
  TrendingUp,
  Search,
  Check,
  X,
  Play,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const { login, competencies, teamMembers, jobRoles, courses } = useAppState();
  const [hoveredNodeInfo, setHoveredNodeInfo] = useState<any>(null);

  // Interactive Sandbox State
  const [sandboxTab, setSandboxTab] = useState<"radar" | "heatmap" | "ai_quiz" | "verify">("radar");
  const [demoSkillLevel, setDemoSkillLevel] = useState<number>(3);
  const [generatedSampleQuiz, setGeneratedSampleQuiz] = useState<boolean>(false);
  const [certInputCode, setCertInputCode] = useState<string>("CERT-CC-84920");

  const handleLaunchRole = (targetRole: RoleType) => {
    login(targetRole);
    router.push(`/${targetRole}`);
  };

  // Mock skills for live landing radar demo
  const sampleUserComps = [
    { competencyId: "comp-react", currentLevel: demoSkillLevel, lastAssessedAt: "Today" },
    { competencyId: "comp-ts", currentLevel: 3, lastAssessedAt: "Today" },
    { competencyId: "comp-api", currentLevel: demoSkillLevel, lastAssessedAt: "Today" },
    { competencyId: "comp-db", currentLevel: 2, lastAssessedAt: "Today" },
    { competencyId: "comp-k8s", currentLevel: Math.max(1, demoSkillLevel - 1), lastAssessedAt: "Today" },
    { competencyId: "comp-cloud-arch", currentLevel: 2, lastAssessedAt: "Today" },
  ];

  return (
    <div className="min-h-screen bg-[#05060a] text-neutral-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Public Navigation */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-[#05060a]/80 backdrop-blur-xl px-6 lg:px-16">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/30">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              Capacity <span className="text-indigo-400 text-xs px-1.5 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/20">CONNECT</span>
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-400">
          <a href="#sandbox" className="hover:text-white transition-colors">Interactive Sandbox</a>
          <a href="#pillars" className="hover:text-white transition-colors">Three Core Pillars</a>
          <a href="#comparison" className="hover:text-white transition-colors">Why Capacity Connect</a>
          <a href="#ecosystem" className="hover:text-white transition-colors">Ecosystem Topology</a>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/login"
            className="rounded-xl px-3.5 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/5 transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/25 transition-all hover:scale-105"
          >
            Get Started <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 lg:px-16 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-medium text-neutral-300 backdrop-blur-xl">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Digital Capacity Building & Learning Management Portal</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Transforming Enterprise Talent with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-400">
              Training, Competency & Knowledge
            </span>
          </h1>

          <p className="text-base sm:text-xl text-neutral-400 max-w-3xl mx-auto font-normal leading-relaxed">
            Most platforms deliver generic video catalogs. <strong>Capacity Connect</strong> builds true organizational capability by uniting modular course workbenches, real-time Level 1–5 Skill Radars, AI career gap planning, and peer knowledge sharing.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
            >
              Start Free Enterprise Trial
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="#sandbox"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 px-6 py-3.5 text-sm font-semibold text-neutral-200 transition-all"
            >
              <Play className="h-4 w-4 text-emerald-400" /> Test-Drive Live Sandbox
            </a>
          </div>

          {/* Quick Role Launcher Strip */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-neutral-500 font-medium mr-2">Instant Role Launchpads:</span>
            <button
              onClick={() => handleLaunchRole("learner")}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Users className="h-3.5 w-3.5" /> Learner Portal
            </button>
            <button
              onClick={() => handleLaunchRole("manager")}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Grid className="h-3.5 w-3.5" /> People Manager
            </button>
            <button
              onClick={() => handleLaunchRole("trainer")}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <GraduationCap className="h-3.5 w-3.5" /> Trainer Studio
            </button>
            <button
              onClick={() => handleLaunchRole("admin")}
              className="px-3.5 py-1.5 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 border border-violet-500/20 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Building2 className="h-3.5 w-3.5" /> Super Admin
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/10 text-center">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-white">15 Skills</span>
            <span className="text-[11px] text-neutral-400 block">Level 1–5 Mastery Scales</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">94.2%</span>
            <span className="text-[11px] text-neutral-400 block">Assessment Pass Rate</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-cyan-300">3.8x ROI</span>
            <span className="text-[11px] text-neutral-400 block">Targeted Upskilling Yield</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-indigo-400">0 Loss</span>
            <span className="text-[11px] text-neutral-400 block">Peer Knowledge Retention</span>
          </div>
        </div>
      </section>

      {/* LIVE INTERACTIVE TEST-DRIVE SANDBOX */}
      <section id="sandbox" className="py-20 px-6 lg:px-16 border-t border-white/5 bg-[#07080f]/70">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <Badge variant="cyan" size="sm" dot>Live Feature Test-Drive</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Try the Core Engine Right Now
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Interact with live competency radar calculations, team heatmap filters, AI quiz generation, and verifiable credentials without logging in.
            </p>
          </div>

          {/* Sandbox Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/10 max-w-2xl mx-auto">
            <button
              onClick={() => setSandboxTab("radar")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                sandboxTab === "radar"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Target className="h-3.5 w-3.5" /> 1. Skill Radar
            </button>
            <button
              onClick={() => setSandboxTab("heatmap")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                sandboxTab === "heatmap"
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Grid className="h-3.5 w-3.5" /> 2. Team Heatmap
            </button>
            <button
              onClick={() => setSandboxTab("ai_quiz")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                sandboxTab === "ai_quiz"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" /> 3. AI Quiz Gen
            </button>
            <button
              onClick={() => setSandboxTab("verify")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                sandboxTab === "verify"
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Award className="h-3.5 w-3.5" /> 4. Cert Verifier
            </button>
          </div>

          {/* Sandbox Content Container */}
          <div className="rounded-3xl border border-white/10 bg-[#090b14]/95 p-6 md:p-8 backdrop-blur-2xl shadow-2xl">
            {sandboxTab === "radar" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 flex justify-center">
                  <SkillRadar
                    competencies={competencies}
                    userCompetencies={sampleUserComps}
                    targetRole={jobRoles[2]}
                    size={320}
                  />
                </div>
                <div className="md:col-span-6 space-y-4">
                  <Badge variant="success" size="sm">Interactive Simulator</Badge>
                  <h3 className="text-xl font-bold text-white">Live Competency Level Tuning</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Adjust the slider to simulate an employee passing assessments. Watch the spider radar polygon expand and the readiness score calculate dynamically.
                  </p>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-neutral-300">Simulate Skill Level:</span>
                      <span className="text-emerald-400 font-bold">Level {demoSkillLevel} / 5</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      value={demoSkillLevel}
                      onChange={(e) => setDemoSkillLevel(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/learner"
                      className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                    >
                      Open Full Learner Portfolio <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {sandboxTab === "heatmap" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div>
                    <h3 className="text-base font-bold text-white">Team Competency Heatmap Matrix (L1–L5)</h3>
                    <p className="text-xs text-neutral-400">Color-coded skill health across direct reports.</p>
                  </div>
                  <Link
                    href="/manager"
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors"
                  >
                    Open Manager Command
                  </Link>
                </div>
                <CompetencyHeatmap
                  members={teamMembers}
                  competencies={competencies}
                />
              </div>
            )}

            {sandboxTab === "ai_quiz" && (
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-400" />
                    AI Assessment Synthesizer
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Instantly extracts 3 multiple-choice questions from raw Kubernetes architecture text.
                  </p>
                </div>

                {!generatedSampleQuiz ? (
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center space-y-4">
                    <p className="text-xs font-mono text-neutral-300 bg-black/40 p-4 rounded-xl text-left border border-white/5">
                      "A Kubernetes Pod is the smallest deployable computing unit. Pods contain one or more containers that share storage and network resources. An Ingress Controller routes Layer 7 HTTP/HTTPS traffic to Services."
                    </p>
                    <button
                      onClick={() => setGeneratedSampleQuiz(true)}
                      className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 mx-auto"
                    >
                      <Zap className="h-4 w-4" /> Synthesize 3-Question Assessment
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 p-4 rounded-2xl bg-black/40 border border-white/10 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" /> 3 Questions Synthesized Successfully
                      </span>
                      <button
                        onClick={() => setGeneratedSampleQuiz(false)}
                        className="text-[11px] text-neutral-400 hover:text-white"
                      >
                        Reset Demo
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-1.5">
                      <span className="font-semibold text-white block">Q1. What is the smallest deployable computing unit in Kubernetes?</span>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <span className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">✓ Pod (Correct)</span>
                        <span className="p-2 rounded-lg bg-black/30 border border-white/5 text-neutral-400">Node</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {sandboxTab === "verify" && (
              <div className="max-w-lg mx-auto space-y-4 text-center">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
                    <Award className="h-5 w-5 text-amber-400" />
                    Public Certificate Cryptographic Lookup
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Verify issued enterprise credentials via immutable SHA-256 ledger IDs.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-black/40 p-2 rounded-2xl border border-white/10">
                  <input
                    type="text"
                    value={certInputCode}
                    onChange={(e) => setCertInputCode(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-white px-3 py-2 focus:outline-none font-mono"
                    placeholder="Enter Code (e.g. CERT-CC-84920)"
                  />
                  <Link
                    href={`/verify/${certInputCode}`}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 text-xs font-bold transition-all shrink-0"
                  >
                    Verify
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* THREE CORE PILLARS SECTION */}
      <section id="pillars" className="py-20 px-6 lg:px-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <Badge variant="purple" size="sm">The Three Pillars</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Not Just Courses — Complete Capacity Building
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Capacity Connect is engineered around three interconnected pillars to drive quantifiable organizational capability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-8 rounded-3xl border border-indigo-500/20 bg-[#090b14]/90 space-y-4 hover:border-indigo-500/40 transition-all shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 w-fit">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">1. Training Delivery</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Modular video, markdown, and PDF lessons. Auto-graded quizzes with instant feedback, prerequisite sequencing, and instructor-led virtual workshops with capacity limits.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-indigo-400">
                10 Modular Courses · Live Assessment Engine
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-3xl border border-emerald-500/20 bg-[#090b14]/90 space-y-4 hover:border-emerald-500/40 transition-all shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">2. Competency Development</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  15 enterprise competencies across 5 proficiency levels. Dynamic Skill Radars comparing current vs role benchmarks, team heatmaps, and automatic level progression upon assessment pass.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-emerald-400">
                Live Skill Radar · L1-L5 Proficiency Scale
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-3xl border border-cyan-500/20 bg-[#090b14]/90 space-y-4 hover:border-cyan-500/40 transition-all shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit">
                  <Share2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">3. Peer Knowledge Sharing</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Peer-to-peer technical wiki authored by employees with upvoting. "Ask an Expert" engine that algorithmically routes complex questions to Level 4+ verified domain experts.
                </p>
              </div>
              <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-cyan-400">
                Peer Wiki · Expert Q&A Routing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CAPACITY CONNECT vs LEGACY LMS COMPARISON TABLE */}
      <section id="comparison" className="py-20 px-6 lg:px-16 border-t border-white/5 bg-[#07080f]/50">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <Badge variant="cyan" size="sm">Architectural Superiority</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Legacy LMS vs Capacity Connect
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Why leading engineering organizations migrate from static course catalogs to intelligent competency systems.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-[#090b14]/90 shadow-2xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-4 font-bold text-neutral-400 uppercase tracking-wider">Capability</th>
                  <th className="p-4 font-bold text-neutral-500">Legacy LMS Platforms</th>
                  <th className="p-4 font-bold text-emerald-400 bg-emerald-500/10 border-l border-emerald-500/20">
                    Capacity Connect
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-4 font-semibold text-white">Competency Mapping</td>
                  <td className="p-4 text-neutral-400">Static tags without proficiency scale</td>
                  <td className="p-4 text-emerald-300 font-semibold bg-emerald-500/5 border-l border-emerald-500/20">
                    Live SVG Radar + Level 1–5 Progression
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Skill Gap Analysis</td>
                  <td className="p-4 text-neutral-400">Manual annual HR performance reviews</td>
                  <td className="p-4 text-emerald-300 font-semibold bg-emerald-500/5 border-l border-emerald-500/20">
                    AI Career Gap Advisor with instant curriculum synthesis
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Assessment Creation</td>
                  <td className="p-4 text-neutral-400">Hours of manual quiz authoring</td>
                  <td className="p-4 text-emerald-300 font-semibold bg-emerald-500/5 border-l border-emerald-500/20">
                    1-Click AI Quiz Synthesizer from raw documentation
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Manager Oversight</td>
                  <td className="p-4 text-neutral-400">Clunky CSV export tables</td>
                  <td className="p-4 text-emerald-300 font-semibold bg-emerald-500/5 border-l border-emerald-500/20">
                    Interactive Team Heatmap + 1-Click Nudge System
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Peer Knowledge Sharing</td>
                  <td className="p-4 text-neutral-400">None (Siloed in Slack/Confluence)</td>
                  <td className="p-4 text-emerald-300 font-semibold bg-emerald-500/5 border-l border-emerald-500/20">
                    Built-in Technical Wiki + Level 4+ Expert Q&A Routing
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Certifications</td>
                  <td className="p-4 text-neutral-400">Unverifiable downloaded PNGs</td>
                  <td className="p-4 text-emerald-300 font-semibold bg-emerald-500/5 border-l border-emerald-500/20">
                    Cryptographic Public Verification (/verify/:code)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM CANVAS VISUALIZATION */}
      <section id="ecosystem" className="py-20 px-6 lg:px-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <Badge variant="purple" size="sm">Ecosystem Topology</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Unified Data & Intelligence Fabric
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Hover over network nodes to observe real-time data flows across Training, Competency, and Knowledge layers.
            </p>
          </div>

          <EcosystemCanvas onNodeHover={(node) => setHoveredNodeInfo(node)} />
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 px-6 lg:px-16 border-t border-white/5 bg-gradient-to-b from-[#05060a] to-[#0c0f1c] text-center space-y-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Build Real Organizational Capacity?
          </h2>
          <p className="text-sm text-neutral-400">
            Join enterprise engineering, product, and leadership teams driving structured competency development today.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
            >
              Get Started Now
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-sm font-semibold border border-white/10 transition-all"
            >
              Judge Fast-Pass Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-16 border-t border-white/5 text-center space-y-3">
        <p className="text-xs font-bold text-white">
          CAPACITY CONNECT · Digital Capacity Building & Learning Management Portal
        </p>
        <p className="text-[11px] text-neutral-500">
          Built for Competition Excellence · Enterprise RBAC, Competency Radar & Knowledge Sharing
        </p>
      </footer>
    </div>
  );
}
