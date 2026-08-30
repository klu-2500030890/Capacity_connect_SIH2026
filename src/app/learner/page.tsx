"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppState } from "@/context/AppStateContext";
import { Badge } from "@/components/ui/Badge";
import { SkillRadar } from "@/components/competency/SkillRadar";
import { SkillGapAdvisor } from "@/components/ai/SkillGapAdvisor";
import { KnowledgeHub } from "@/components/knowledge/KnowledgeHub";
import { CoursePlayerModal } from "@/components/courses/CoursePlayerModal";
import {
  Sparkles,
  Target,
  BookOpen,
  Zap,
  Flame,
  Award,
  Calendar,
  Clock,
  PlayCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Share2,
  ExternalLink,
  Milestone,
  Check,
  Layers,
} from "lucide-react";

export default function LearnerPortal() {
  const {
    role,
    learner,
    competencies,
    jobRoles,
    courses,
    learningPaths,
    enrollments,
    articles,
    questions,
    certificates,
    badges,
    sessions,
    notifications,
    dismissNudge,
    passQuizAndLevelUp,
    submitAssignment,
    enrollInCourse,
    upvoteArticle,
    askExpertQuestion,
    addNewArticle,
    bookCalendarSession,
  } = useAppState();

  const [activeCourseToPlay, setActiveCourseToPlay] = useState<any>(null);

  // Match target role
  const targetRole = jobRoles.find((r) => r.id === "role-sr-cloud-arch") || jobRoles[2];

  // Pending Manager Nudges addressed to this learner
  const pendingNudges = notifications.filter(
    (n) => (n.targetUserId === learner.id || n.targetUserId === "usr-alex-learner") && n.isNudge
  );

  // Calculate enrolled courses data
  const userEnrollments = enrollments
    .filter((e) => e.userId === learner.id)
    .map((e) => {
      const course = courses.find((c) => c.id === e.courseId);
      return { ...e, course };
    })
    .filter((e) => e.course !== undefined);

  if (role !== "learner") {
    return (
      <div className="p-8 rounded-3xl border border-rose-500/30 bg-rose-950/20 text-center space-y-4 my-12">
        <AlertTriangle className="h-10 w-10 text-rose-400 mx-auto" />
        <h2 className="text-lg font-bold text-white">403 Forbidden: Insufficient Role Clearance</h2>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          You are currently authenticated with <strong>{role.toUpperCase()}</strong> clearance. Please log out and sign in with a verified Employee Learner account to access the Learner Academy.
        </p>
        <Link
          href={`/${role}`}
          className="inline-block px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
        >
          Return to Authorized {role.toUpperCase()} Workspace
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* 🚨 TWO-WAY INTERVENTION: Active Manager Nudge Alert Banner */}
      {pendingNudges.length > 0 && (
        <div className="space-y-3">
          {pendingNudges.map((nudge) => {
            const course = courses.find((c) => c.id === nudge.courseId) || courses[0];
            return (
              <div
                key={nudge.id}
                className="p-4 sm:p-5 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-[#0d0f1a] to-amber-950/40 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl animate-in fade-in duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                    <Zap className="h-5 w-5 fill-amber-400 text-amber-400 animate-bounce" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                      {nudge.title}
                    </span>
                    <p className="text-xs text-white font-medium">{nudge.message}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      dismissNudge(nudge.id);
                      setActiveCourseToPlay(course);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5"
                  >
                    <PlayCircle className="h-3.5 w-3.5" /> Acknowledge & Open Workbench
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* Top Welcome & Gamification Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#0b0e18] via-[#0d1222] to-[#0b0e18] p-6 md:p-8 backdrop-blur-2xl shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="success" size="sm" dot>Active Learner</Badge>
              <span className="text-xs text-neutral-400 font-mono">ID: {learner.id}</span>
              {learner.contactNumber && (
                <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
                  • {learner.contactNumber}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {learner.name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Targeting career transition to <strong className="text-cyan-300 font-semibold">{targetRole.title}</strong>. Your competency radar is synchronized with live assessment evaluations.
            </p>
          </div>

          {/* Gamification Stats Strip */}
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center min-w-[90px]">
              <span className="flex items-center justify-center gap-1 text-[10px] font-bold text-amber-400 uppercase">
                <Flame className="h-3.5 w-3.5 fill-amber-400" /> Streak
              </span>
              <span className="text-xl font-black text-white">{learner.streakDays} Days</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center min-w-[90px]">
              <span className="flex items-center justify-center gap-1 text-[10px] font-bold text-emerald-400 uppercase">
                <Zap className="h-3.5 w-3.5 fill-emerald-400" /> Total XP
              </span>
              <span className="text-xl font-black text-white">{learner.points}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center min-w-[90px]">
              <span className="flex items-center justify-center gap-1 text-[10px] font-bold text-indigo-400 uppercase">
                <Award className="h-3.5 w-3.5" /> Certified
              </span>
              <span className="text-xl font-black text-white">{certificates.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* PILLAR 2: Live Skill Radar Matrix & Competency Breakdown */}
      <section id="radar" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Radar Visual (6 Cols) */}
        <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-[#090b14]/90 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                Competency Framework
              </span>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="h-4 w-4 text-emerald-400" />
                Live Skill Radar vs Target Role
              </h2>
            </div>
            <Badge variant="cyan" size="sm">Level 1–5 Live</Badge>
          </div>

          <SkillRadar
            competencies={competencies}
            userCompetencies={learner.competencies}
            targetRole={targetRole}
            size={340}
          />
        </div>

        {/* Competency Level Cards (6 Cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-white">Active Verified Competencies</h3>
            <span className="text-xs text-neutral-400 font-mono">{learner.competencies.length} Assessed Skills</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {learner.competencies.slice(0, 6).map((uc) => {
              const comp = competencies.find((c) => c.id === uc.competencyId);
              if (!comp) return null;
              const isHigh = uc.currentLevel >= 3;

              return (
                <div
                  key={uc.competencyId}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate max-w-[140px]">{comp.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        isHigh
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      }`}
                    >
                      L{uc.currentLevel}/5
                    </span>
                  </div>

                  <div className="w-full bg-black/40 rounded-full h-1.5 overflow-hidden flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <div
                        key={lvl}
                        className={`flex-1 h-full rounded-full ${
                          lvl <= uc.currentLevel ? "bg-emerald-400" : "bg-white/5"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[9px] text-neutral-500 font-mono">
                    <span>{comp.category.split(" ")[0]}</span>
                    <span>Last: {uc.lastAssessedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PILLAR 1: AI Skill Gap Advisor */}
      <section id="advisor">
        <SkillGapAdvisor
          user={learner}
          jobRoles={jobRoles}
          targetRole={targetRole}
          competencies={competencies}
          courses={courses}
          onStartCourse={(cId) => {
            const course = courses.find((c) => c.id === cId);
            if (course) setActiveCourseToPlay(course);
          }}
        />
      </section>

      {/* REAL 30-DAY LEARNING PATHS FROM TOP MNCS */}
      <section id="paths" className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">
              Global MNC Industry Curricula
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Milestone className="h-5 w-5 text-indigo-400" />
              Real 30-Day Certification Learning Paths
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {learningPaths.map((path) => (
            <div
              key={path.id}
              className="p-6 rounded-3xl border border-white/10 bg-[#090b14]/90 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {path.provider}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">{path.durationDays} Days · {path.estimatedHours} Hours</span>
                </div>

                <h3 className="text-base font-bold text-white">{path.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{path.description}</p>

                {/* 4-Week Milestone Timeline */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">
                    Syllabus Milestones:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {path.milestones.map((m, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-indigo-400 font-bold">{m.dayRange}</span>
                          <span className="text-neutral-500">{m.skillsUnlocked[0]}</span>
                        </div>
                        <span className="font-semibold text-white block text-[11px] truncate">{m.title}</span>
                        <p className="text-[10px] text-neutral-400 truncate">{m.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <Award className="h-3.5 w-3.5" /> Reward: {path.badgeReward}
                </span>

                <button
                  onClick={() => {
                    const firstCourse = courses.find((c) => path.courseIds.includes(c.id)) || courses[0];
                    setActiveCourseToPlay(firstCourse);
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
                >
                  <PlayCircle className="h-3.5 w-3.5" /> Start 30-Day Track
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enrolled Courses & Lab Workbenches */}
      <section id="courses" className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">
              Active Learning Curricula
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-400" />
              MNC Courses & Hands-On Lab Workbenches
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const userEnr = enrollments.find((e) => e.courseId === course.id && e.userId === learner.id);
            const isEnrolled = !!userEnr;
            const isCompleted = userEnr?.status === "completed";
            const progress = userEnr ? userEnr.progressPercent : 0;

            return (
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
                    <Badge variant={isCompleted ? "success" : isEnrolled ? "cyan" : "neutral"} size="sm">
                      {isCompleted ? "Completed 100%" : isEnrolled ? `${progress}% In Progress` : "Available"}
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
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {course.provider}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {course.duration}
                      </span>
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
                      <span>Progress</span>
                      <span className="text-white font-bold">{progress}%</span>
                    </div>
                    <div className="w-full bg-black/40 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        if (!isEnrolled) {
                          enrollInCourse(course.id);
                        }
                        setActiveCourseToPlay(course);
                      }}
                      className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-indigo-600 text-neutral-200 hover:text-white text-xs font-semibold border border-white/10 hover:border-indigo-500/50 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <PlayCircle className="h-4 w-4" />
                      <span>{isCompleted ? "Review & Retake Workbench" : isEnrolled ? "Resume Workbench" : "Enroll & Start (0%)"}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PILLAR 3: Peer Knowledge Hub & Expert Help */}
      <section id="knowledge">
        <KnowledgeHub
          articles={articles}
          questions={questions}
          competencies={competencies}
          onUpvote={upvoteArticle}
          onAskQuestion={askExpertQuestion}
          onNewArticle={addNewArticle}
        />
      </section>

      {/* Live Workshops & Instructor-Led Sessions */}
      <section id="sessions" className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">
              Capacity Building Calendar
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-400" />
              Live Virtual Workshops & Cloud Sandboxes
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              className="p-5 rounded-3xl border border-white/10 bg-[#090b14]/90 space-y-4 hover:border-purple-500/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-mono">
                    {sess.type}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    Seats: <strong className="text-white">{sess.enrolled}/{sess.capacity}</strong>
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{sess.title}</h3>
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {sess.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {sess.time}</span>
                </div>
                <p className="text-[11px] text-neutral-500 font-mono">{sess.locationOrUrl}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <img
                    src={sess.trainerAvatar}
                    alt={sess.trainerName}
                    className="w-6 h-6 rounded-full object-cover border border-white/10"
                  />
                  <span className="text-xs text-neutral-300 font-medium">{sess.trainerName}</span>
                </div>

                <button
                  onClick={() => bookCalendarSession(sess.id)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-all"
                >
                  Reserve Seat ({sess.capacity - sess.enrolled} Left)
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificates & Badges Portfolio */}
      <section id="certificates" className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
              Verifiable Credentials
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-400" />
              Certificates & Badges Portfolio
            </h2>
          </div>
        </div>

        {certificates.length === 0 ? (
          <div className="p-8 rounded-3xl border border-dashed border-white/10 bg-[#090b14]/50 text-center space-y-3">
            <Award className="h-10 w-10 text-amber-400/50 mx-auto" />
            <h3 className="text-sm font-bold text-white">No Verifiable Certificates Issued Yet</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              Complete a course workbench above and pass the certification exam with 70%+ honors to generate your first tamper-proof credential on the ledger!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-3xl border border-amber-500/20 bg-gradient-to-r from-amber-950/20 via-[#090b14] to-[#090b14] flex items-center justify-between gap-4 shadow-xl"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                    {cert.issuerOrg}
                  </span>
                  <h3 className="text-sm font-bold text-white">{cert.pathTitle}</h3>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                    <span>Issued: {cert.issuedAt}</span>
                    <span>•</span>
                    <span>Score: {cert.score}%</span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400 block pt-1">
                    Code: {cert.verificationCode}
                  </span>
                </div>

                <Link
                  href={`/verify/${cert.verificationCode}`}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <span>Verify Publicly</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Course Player Modal Overlay */}
      {activeCourseToPlay && (
        <CoursePlayerModal
          course={activeCourseToPlay}
          onClose={() => setActiveCourseToPlay(null)}
          onPassQuiz={(cId, score) => passQuizAndLevelUp(cId, score)}
          onSubmitAssignment={(cId, aId, code, passed) =>
            submitAssignment(cId, aId, code, passed)
          }
        />
      )}
    </div>
  );
}
