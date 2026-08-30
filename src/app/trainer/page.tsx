"use client";

import React, { useState } from "react";
import { useAppState, Course, CalendarSession } from "@/context/AppStateContext";
import { Badge } from "@/components/ui/Badge";
import { AIQuizGeneratorModal } from "@/components/courses/AIQuizGeneratorModal";
import { CoursePlayerModal } from "@/components/courses/CoursePlayerModal";
import {
  Layers,
  Sparkles,
  BookOpen,
  Plus,
  Users,
  Calendar,
  CheckCircle2,
  BarChart3,
  Award,
  Zap,
  Clock,
  ArrowRight,
  AlertTriangle,
  Radio,
  Send,
  MessageSquare,
  PlayCircle,
  Video,
  Terminal,
  UserCheck,
  Key,
  ShieldCheck,
  Check,
  FileCode,
  Sliders,
} from "lucide-react";

export default function TrainerPortal() {
  const {
    role,
    login,
    courses,
    competencies,
    learningPaths,
    enrollments,
    teamMembers,
    sessions,
    addNewCourse,
    broadcastTrainerAnnouncement,
    send1on1MentorFeedback,
    scheduleLiveLabWorkshop,
    passQuizAndLevelUp,
    setDemoToast,
  } = useAppState();

  const [showAIQuizModal, setShowAIQuizModal] = useState(false);
  const [showNewCourseModal, setShowNewCourseModal] = useState(false);
  const [activeCourseToPreview, setActiveCourseToPreview] = useState<Course | null>(null);

  // Live Broadcast State
  const [selectedCourseForBroadcast, setSelectedCourseForBroadcast] = useState(courses[0]?.id || "");
  const [broadcastTitle, setBroadcastTitle] = useState("Live Doubt Resolution & Cloud Sandbox Debug");
  const [broadcastMessage, setBroadcastMessage] = useState(
    "Join the virtual cloud sandbox now on Google Cloud Terminal #4. We will debug Istio 503 sidecar timeouts live."
  );

  // 1:1 Mentor Guidance State
  const [selectedLearnerFor1on1, setSelectedLearnerFor1on1] = useState(teamMembers[0]?.id || "");
  const [mentorFeedbackText, setMentorFeedbackText] = useState(
    "Great progress on Module 1! Review your Cloud Spanner interleaved table keys before attempting the certification exam."
  );

  // Simulated Lab Submissions Review Queue
  const [labSubmissions, setLabSubmissions] = useState([
    {
      id: "sub-1",
      studentName: "Alex Rivera",
      studentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      courseTitle: "Google Cloud: Professional Cloud Architect (30-Day Track)",
      labName: "Shared VPC & Multi-Zone GKE HPA Config",
      submittedAt: "10 mins ago",
      codeSnippet: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: payment-service\nspec:\n  replicas: 5\n  template:\n    spec:\n      containers:\n      - name: payment\n        image: gcr.io/prod/payment:v2.1`,
      status: "pending_review",
    },
    {
      id: "sub-2",
      studentName: "Devon Reed",
      studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      courseTitle: "Microsoft Azure & Dell PowerStore Hybrid (30-Day Track)",
      labName: "Dell Cyber Recovery Vault & Air-Gap Policy",
      submittedAt: "25 mins ago",
      codeSnippet: `cyber_recovery_policy:\n  vault_mode: air_gapped\n  sync_window: "02:00-04:00 UTC"\n  immutability_retention_days: 30`,
      status: "pending_review",
    },
  ]);

  // Workshop Scheduling State
  const [workshopTitle, setWorkshopTitle] = useState("");
  const [workshopType, setWorkshopType] = useState<CalendarSession["type"]>("Hands-On Cloud Lab");
  const [workshopDate, setWorkshopDate] = useState("Tomorrow (3:00 PM IST)");
  const [workshopCapacity, setWorkshopCapacity] = useState(30);

  // New Course State
  const [courseTitle, setCourseTitle] = useState("");
  const [courseProvider, setCourseProvider] = useState<Course["provider"]>("Google Cloud");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseDuration, setCourseDuration] = useState("30-Day Track");
  const [courseCompId, setCourseCompId] = useState(competencies[0]?.id || "comp-k8s");
  const [courseGainLevel, setCourseGainLevel] = useState(3);

  // IF NOT AUTHENTICATED AS TRAINER: Provide direct 1-Click Clearance Activation bridge!
  if (role !== "trainer") {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-[#0e101f] to-[#080911] text-center space-y-6 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/20">
          <Key className="h-7 w-7 animate-pulse" />
        </div>

        <div className="space-y-2">
          <Badge variant="purple" size="sm" dot>L&D Trainer Studio Gateway</Badge>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Trainer & Curriculum Lead Clearance Required
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
            You are currently accessing this workspace with <strong className="text-white">{role.toUpperCase()}</strong> clearance. To broadcast live doubt rooms to enrolled cohorts and author AI quizzes, activate Trainer status.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-neutral-300 space-y-2 text-left">
          <div className="flex items-center justify-between text-neutral-400">
            <span>Trainer Account:</span>
            <span className="text-indigo-300 font-bold">Marcus Vance</span>
          </div>
          <div className="flex items-center justify-between text-neutral-400">
            <span>Corporate Title:</span>
            <span className="font-mono text-white">Principal L&D Architect & Fellow</span>
          </div>
          <div className="flex items-center justify-between text-neutral-400">
            <span>Enterprise Email:</span>
            <span className="font-mono text-emerald-400">marcus.vance@capacityconnect.io</span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => login("marcus.vance@capacityconnect.io", "Passcode@2026")}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>1-Click Activate Trainer Clearance</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) return;
    broadcastTrainerAnnouncement(selectedCourseForBroadcast, broadcastTitle, broadcastMessage);
  };

  const handleSend1on1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorFeedbackText.trim()) return;
    send1on1MentorFeedback(selectedLearnerFor1on1, selectedCourseForBroadcast, mentorFeedbackText);
  };

  const handleGradeSubmission = (submissionId: string, approved: boolean) => {
    setLabSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === submissionId
          ? { ...sub, status: approved ? "approved" : "changes_requested" }
          : sub
      )
    );
    setDemoToast({
      message: approved
        ? "✅ Practical Lab Submission Approved! +150 XP awarded to student."
        : "⚠️ Review comments and retry instructions sent to student.",
      type: approved ? "success" : "warning",
    });
  };

  const handleScheduleWorkshop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workshopTitle.trim()) return;

    const newSess: CalendarSession = {
      id: `sess-${Date.now()}`,
      title: workshopTitle,
      trainerName: "Marcus Vance",
      trainerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      trainerTitle: "Principal L&D Architect & Fellow",
      date: workshopDate,
      time: "3:00 PM – 4:30 PM IST",
      capacity: Number(workshopCapacity),
      enrolled: 1,
      enrolledUserIds: [],
      type: workshopType,
      locationOrUrl: "Google Cloud Sandbox Terminal #4",
      competencyId: courseCompId,
    };

    scheduleLiveLabWorkshop(newSess);
    setWorkshopTitle("");
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle.trim()) return;

    const newCourse: Course = {
      id: `crs-${Date.now()}`,
      title: courseTitle,
      provider: courseProvider,
      description: courseDesc,
      category: "Cloud & Infrastructure",
      competencyIds: [courseCompId],
      competencyGainLevel: Number(courseGainLevel),
      createdBy: "usr-marcus-trainer",
      authorName: "Marcus Vance",
      authorRole: "Principal L&D Architect",
      isMandatory: false,
      duration: courseDuration,
      rating: 5.0,
      enrolledCount: 0,
      coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
      modules: [
        {
          id: `mod-${Date.now()}-1`,
          title: "1. Core Foundations & Architectural Invariants",
          order: 1,
          type: "text",
          duration: "45 min",
          textMarkdown: `### Architectural Principles for ${courseTitle}\n\nComprehensive technical lecture notes authored by L&D Studio.`,
        },
        {
          id: `mod-${Date.now()}-2`,
          title: "2. Practical Lab Workbench",
          order: 2,
          type: "lab",
          duration: "45 min",
          assignment: {
            id: `assign-${Date.now()}`,
            title: `Practical Lab: ${courseTitle}`,
            language: "yaml",
            instructions: "Validate enterprise invariants against security compliance rules.",
            starterCode: `# Configuration\nservice:\n  name: ${courseTitle}\n  replicas: 3`,
            expectedOutput: "3/3 automated test suites passed.",
            testCases: [{ name: "Verify Replicas", input: "replicas", expected: "3" }],
          },
        },
        {
          id: `mod-${Date.now()}-3`,
          title: "3. Certification Honors Assessment",
          order: 3,
          type: "quiz",
          duration: "30 min",
          quiz: [
            {
              id: `q-${Date.now()}-1`,
              question: `What is the primary design pattern required in ${courseTitle}?`,
              options: ["High Availability Active-Active", "Single Point of Failure", "Unbuffered IO", "Disabling Backups"],
              correctIndex: 0,
              explanation: "Active-Active configurations eliminate single points of failure across failure zones.",
              topicTag: "Core Architecture",
            },
          ],
        },
      ],
    };

    addNewCourse(newCourse);
    setShowNewCourseModal(false);
    setCourseTitle("");
    setCourseDesc("");
  };

  const learners = teamMembers.filter((m) => m.role === "learner");

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-950/40 via-[#0b0e18] to-indigo-950/40 p-6 md:p-8 backdrop-blur-2xl shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <Badge variant="purple" size="sm" dot>L&D Curriculum & Mentorship Studio</Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Trainer Studio & Live Cohort Connect
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Inspired by high-impact academies like NxtWave, RaisingBrains & Scaler: broadcast live doubt sessions to cohorts, send 1:1 mentor feedback, grade student code labs, author AI-synthesized certification banks, and inspect all enterprise courses.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAIQuizModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-bold transition-all flex items-center gap-2 shadow-lg"
            >
              <Sparkles className="h-4 w-4" /> AI Quiz Generator
            </button>

            <button
              onClick={() => setShowNewCourseModal(true)}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <Plus className="h-4 w-4" /> Author New Course
            </button>
          </div>
        </div>
      </div>

      {/* 🔴 LIVE LEARNER CONNECT & 1:1 MENTORSHIP MATRIX (NxtWave / Scaler Inspired) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7 Cols): Broadcast Live Doubts & Lab Bridge */}
        <div className="lg:col-span-7 rounded-3xl border border-indigo-500/30 bg-[#090b14]/90 p-6 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold flex items-center gap-1">
                <Radio className="h-3.5 w-3.5 text-rose-400 animate-pulse" /> Live Cohort Broadcast Bridge
              </span>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Video className="h-4 w-4 text-indigo-400" />
                Broadcast Live Session & Doubt Resolution Alert
              </h2>
            </div>
            <Badge variant="purple" size="sm">Live 2-Way Sync</Badge>
          </div>

          <form onSubmit={handleBroadcast} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="font-medium text-neutral-300">Select Target Enrolled Course Cohort</label>
              <select
                value={selectedCourseForBroadcast}
                onChange={(e) => setSelectedCourseForBroadcast(e.target.value)}
                className="w-full bg-[#05060b] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500 font-mono"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{c.provider}] {c.title} ({c.enrolledCount} Enrolled)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-medium text-neutral-300">Broadcast Session Title</label>
              <input
                type="text"
                required
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-indigo-500 font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-neutral-300">Live Announcement / Sandbox Instructions</label>
              <textarea
                rows={3}
                required
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500 font-mono text-xs leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Radio className="h-4 w-4 text-rose-300" /> Broadcast Live Alert to All Enrolled Students
            </button>
          </form>
        </div>

        {/* Right (5 Cols): 1-on-1 Mentor Guidance to Enrolled Students */}
        <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#090b14]/90 p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
              1-on-1 Mentor Guidance
            </span>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-emerald-400" />
              Direct Student Mentor Feedback
            </h2>
            <p className="text-xs text-neutral-400">
              Send personalized technical feedback and exam preparation tips directly to a student.
            </p>
          </div>

          <form onSubmit={handleSend1on1} className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-medium text-neutral-300">Select Student</label>
              <select
                value={selectedLearnerFor1on1}
                onChange={(e) => setSelectedLearnerFor1on1(e.target.value)}
                className="w-full bg-[#05060b] border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
              >
                {learners.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} ({l.jobTitle})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-medium text-neutral-300">Personalized Feedback & Tips</label>
              <textarea
                rows={3}
                required
                value={mentorFeedbackText}
                onChange={(e) => setMentorFeedbackText(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-2.5 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Send className="h-3.5 w-3.5" /> Dispatch 1:1 Mentor Guidance
            </button>
          </form>
        </div>
      </section>

      {/* STUDENT PRACTICAL LAB REVIEW & CODE GRADING QUEUE (Next-Level Feature) */}
      <section id="grading" className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
              Assessment Workflows
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileCode className="h-5 w-5 text-emerald-400" />
              Student Practical Lab Grading & Code Review Queue ({labSubmissions.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {labSubmissions.map((sub) => (
            <div
              key={sub.id}
              className="rounded-3xl border border-white/10 bg-[#090b14]/90 p-6 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={sub.studentAvatar}
                      alt={sub.studentName}
                      className="w-9 h-9 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">{sub.studentName}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">{sub.submittedAt}</span>
                    </div>
                  </div>
                  <Badge
                    variant={sub.status === "approved" ? "success" : sub.status === "changes_requested" ? "warning" : "purple"}
                    size="sm"
                  >
                    {sub.status === "approved"
                      ? "Graded (100% Honors)"
                      : sub.status === "changes_requested"
                      ? "Changes Requested"
                      : "Pending Review"}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-indigo-300 block">{sub.labName}</span>
                  <span className="text-[10px] text-neutral-400 font-mono block truncate">
                    Course: {sub.courseTitle}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-black/60 border border-white/5 font-mono text-[11px] text-emerald-300 overflow-x-auto">
                  <pre className="whitespace-pre">{sub.codeSnippet}</pre>
                </div>
              </div>

              {sub.status === "pending_review" ? (
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleGradeSubmission(sub.id, true)}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all"
                  >
                    <Check className="h-3.5 w-3.5" /> Approve & Award XP
                  </button>
                  <button
                    onClick={() => handleGradeSubmission(sub.id, false)}
                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-neutral-300 hover:text-rose-300 border border-white/10 text-xs font-medium transition-colors"
                  >
                    Request Fixes
                  </button>
                </div>
              ) : (
                <div className="pt-2 text-center text-xs font-mono text-neutral-400">
                  Review finalized. Synchronized to student Skill Radar.
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FULL COURSE CATALOG ACCESS (Trainer can inspect and preview all courses) */}
      <section id="catalog" className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">
              Curriculum Inventory
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-400" />
              All Enterprise Courses & Certification Workbenches ({courses.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="rounded-3xl border border-white/10 bg-[#090b14]/90 overflow-hidden flex flex-col justify-between hover:border-indigo-500/40 transition-all shadow-xl group"
            >
              <div className="relative h-40 overflow-hidden bg-neutral-900">
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b14] via-[#090b14]/40 to-transparent" />
                <div className="absolute top-3 right-3">
                  <Badge variant="purple" size="sm">
                    {course.provider}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-4">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Unlocks Level {course.competencyGainLevel}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                    <span>{course.category}</span>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>Active Cohort</span>
                    <span className="text-white font-bold">{course.enrolledCount} Engineers</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>Modules & Labs</span>
                    <span className="text-indigo-400 font-bold">{course.modules.length} Lessons</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveCourseToPreview(course)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-indigo-600 text-neutral-200 hover:text-white text-xs font-semibold border border-white/10 hover:border-indigo-500/50 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <PlayCircle className="h-4 w-4" />
                    <span>Launch & Preview Workbench</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COHORT PROGRESS ROSTER */}
      <section id="cohorts" className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
              Learner Analytics
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-cyan-400" />
              Live Enrolled Student Cohort Roster
            </h2>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#090b14]/90 overflow-hidden shadow-2xl">
          <div className="divide-y divide-white/5">
            {enrollments.map((enr) => {
              const student = teamMembers.find((m) => m.id === enr.userId);
              const course = courses.find((c) => c.id === enr.courseId);
              if (!student || !course) return null;

              return (
                <div
                  key={enr.id}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{student.name}</span>
                        <span className="text-xs text-neutral-400 font-mono">({student.jobTitle})</span>
                      </div>
                      <span className="text-xs text-indigo-400 font-mono block">
                        Course: {course.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase block">Progress</span>
                      <span className="text-emerald-400 font-bold">{enr.progressPercent}% Completed</span>
                    </div>

                    <button
                      onClick={() =>
                        send1on1MentorFeedback(
                          student.id,
                          course.id,
                          `Keep up the momentum on ${course.title}!`
                        )
                      }
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-600/20 text-neutral-300 hover:text-emerald-300 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="h-3.5 w-3.5" /> 1:1 Connect
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WORKSHOP SCHEDULER */}
      <section id="workshops" className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">
              Live Instruction
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-400" />
              Schedule Hands-On Live Lab or Architecture Workshop
            </h2>
          </div>
        </div>

        <form
          onSubmit={handleScheduleWorkshop}
          className="p-6 rounded-3xl border border-white/10 bg-[#090b14]/90 space-y-4 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1 md:col-span-2">
              <label className="font-medium text-neutral-300">Workshop Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Istio Service Mesh & GKE Failover Live Lab"
                value={workshopTitle}
                onChange={(e) => setWorkshopTitle(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-neutral-300">Session Type</label>
              <select
                value={workshopType}
                onChange={(e) => setWorkshopType(e.target.value as any)}
                className="w-full bg-[#05060b] border border-white/10 rounded-xl px-3 py-2.5 text-white font-mono"
              >
                <option value="Hands-On Cloud Lab">Hands-On Cloud Lab</option>
                <option value="Virtual Workshop">Virtual Workshop</option>
                <option value="Live Q&A">Live Q&A</option>
                <option value="Architecture Review">Architecture Review</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-medium text-neutral-300">Date & Time</label>
              <input
                type="text"
                required
                value={workshopDate}
                onChange={(e) => setWorkshopDate(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium text-neutral-300">Seat Capacity</label>
              <input
                type="number"
                min={5}
                max={100}
                value={workshopCapacity}
                onChange={(e) => setWorkshopCapacity(Number(e.target.value))}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-white font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" /> Publish Workshop to Enterprise Calendar
          </button>
        </form>
      </section>

      {/* AI Quiz Generator Modal */}
      {showAIQuizModal && (
        <AIQuizGeneratorModal onClose={() => setShowAIQuizModal(false)} />
      )}

      {/* Course Workbench Preview Modal */}
      {activeCourseToPreview && (
        <CoursePlayerModal
          course={activeCourseToPreview}
          onClose={() => setActiveCourseToPreview(null)}
          onPassQuiz={(cId, score) => passQuizAndLevelUp(cId, score)}
        />
      )}

      {/* Author New Course Modal */}
      {showNewCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#0c0f1d] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">Author New Enterprise Certification Course</h3>
              <button
                onClick={() => setShowNewCourseModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-neutral-300">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Solutions Architect Professional"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-neutral-300">Provider</label>
                  <select
                    value={courseProvider}
                    onChange={(e) => setCourseProvider(e.target.value as any)}
                    className="w-full bg-[#05060b] border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                  >
                    <option value="Google Cloud">Google Cloud</option>
                    <option value="Microsoft Azure">Microsoft Azure</option>
                    <option value="AWS">AWS</option>
                    <option value="Dell Technologies">Dell Technologies</option>
                    <option value="Meta">Meta</option>
                    <option value="NVIDIA DLI">NVIDIA DLI</option>
                    <option value="Netflix Tech">Netflix Tech</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-neutral-300">Target Competency</label>
                  <select
                    value={courseCompId}
                    onChange={(e) => setCourseCompId(e.target.value)}
                    className="w-full bg-[#05060b] border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                  >
                    {competencies.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-neutral-300">Course Overview</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe curriculum, labs, and certification objectives..."
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl p-3 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewCourseModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Publish Course to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
