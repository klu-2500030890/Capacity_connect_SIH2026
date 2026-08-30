"use client";

import React, { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Course, ModuleLesson } from "@/data/capacityData";
import { Badge } from "@/components/ui/Badge";
import { AIQuizGeneratorModal } from "@/components/courses/AIQuizGeneratorModal";
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
} from "lucide-react";

export default function TrainerPortal() {
  const { courses, competencies, learningPaths, enrollments, addNewCourse } = useAppState();

  const [showAIQuizModal, setShowAIQuizModal] = useState(false);
  const [showNewCourseModal, setShowNewCourseModal] = useState(false);

  // New Course State
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseDuration, setCourseDuration] = useState("3.0 Hours");
  const [courseCompId, setCourseCompId] = useState(competencies[0]?.id || "comp-k8s");
  const [courseGainLevel, setCourseGainLevel] = useState(3);

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle.trim()) return;

    const newCourse: Course = {
      id: `crs-${Date.now()}`,
      title: courseTitle,
      provider: "Google Cloud",
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
      enrolledCount: 1,
      coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
      modules: [
        {
          id: `mod-${Date.now()}-1`,
          title: "1. Core Foundations & Architectural Invariants",
          order: 1,
          type: "text",
          duration: "30 min",
          textMarkdown: "Lecture overview and code examples for this course.",
        },
      ],
    };

    addNewCourse(newCourse);
    setShowNewCourseModal(false);
    setCourseTitle("");
    setCourseDesc("");
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Welcome Banner */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-950/40 via-[#0b0e18] to-indigo-950/40 p-6 md:p-8 backdrop-blur-2xl shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <Badge variant="purple" size="sm" dot>Trainer & L&D Studio</Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Curriculum & Assessment Engineering
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Author modular courses, synthesize AI assessments from raw documentation, calibrate competency gain scales (L1–L5), and schedule live technical workshops.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAIQuizModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-cyan-600/25 transition-all flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              AI Quiz Synthesizer
            </button>
            <button
              onClick={() => setShowNewCourseModal(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Course
            </button>
          </div>
        </div>
      </div>

      {/* Course Catalog & Module Architect */}
      <section id="builder" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">
              Competency-Mapped Course Catalog
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-indigo-400" />
              Published Courses & Modular Lesson Architect
            </h2>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            {courses.length} Active Enterprise Courses
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const comp = competencies.find((c) => course.competencyIds.includes(c.id));
            return (
              <div
                key={course.id}
                className="rounded-3xl border border-white/10 bg-[#090b14]/90 p-5 flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all shadow-xl group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-mono">
                      {course.category}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      Unlocks Level {course.competencyGainLevel}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/5 text-xs text-neutral-400">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span>Mapped: {comp?.name.split(" ")[0]}</span>
                    <span>{course.modules.length} Lessons</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span>Enrolled: {course.enrolledCount} Engineers</span>
                    <span>⭐ {course.rating}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Learning Path Sequencing */}
      <section id="paths" className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
              Structured Career Tracks
            </span>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-400" />
              Role-Based Learning Paths ({learningPaths.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningPaths.map((path) => (
            <div
              key={path.id}
              className="p-6 rounded-3xl border border-emerald-500/20 bg-[#090b14]/90 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <Badge variant="success" size="sm">Certification Track</Badge>
                <span className="text-xs text-neutral-400 font-mono">~{path.estimatedHours} Hours</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{path.title}</h3>
                <p className="text-xs text-neutral-400 mt-1">{path.description}</p>
              </div>

              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1 text-xs">
                <span className="text-indigo-400 font-mono block">Target Role: {path.targetRoleTitle}</span>
                <span className="text-emerald-400 font-mono block">Reward: {path.certificateTitle}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Quiz Generator Modal */}
      {showAIQuizModal && (
        <AIQuizGeneratorModal onClose={() => setShowAIQuizModal(false)} />
      )}

      {/* Create Course Modal */}
      {showNewCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#090b14] p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="h-4 w-4 text-indigo-400" /> Author New Competency Course
            </h3>

            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-neutral-300 block mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Caching with Redis & Memcached"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-medium text-neutral-300 block mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the architectural objectives and prerequisites..."
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-neutral-300 block mb-1">Target Competency</label>
                  <select
                    value={courseCompId}
                    onChange={(e) => setCourseCompId(e.target.value)}
                    className="w-full bg-[#0e111a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                  >
                    {competencies.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-medium text-neutral-300 block mb-1">Competency Level Unlocked</label>
                  <select
                    value={courseGainLevel}
                    onChange={(e) => setCourseGainLevel(Number(e.target.value))}
                    className="w-full bg-[#0e111a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value={2}>Level 2 (Practitioner)</option>
                    <option value={3}>Level 3 (Advanced)</option>
                    <option value={4}>Level 4 (Expert)</option>
                    <option value={5}>Level 5 (Principal)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewCourseModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold"
                >
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
