"use client";

import React, { useState } from "react";
import { Course, ModuleLesson } from "@/data/capacityData";
import { Badge } from "@/components/ui/Badge";
import {
  X,
  PlayCircle,
  FileText,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Award,
  Zap,
} from "lucide-react";

interface CoursePlayerModalProps {
  course: Course;
  onClose: () => void;
  onPassQuiz: (courseId: string, score: number) => void;
}

export const CoursePlayerModal: React.FC<CoursePlayerModalProps> = ({
  course,
  onClose,
  onPassQuiz,
}) => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const activeModule = course.modules[activeModuleIndex] || course.modules[0];

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleSelectOption = (qIndex: number, optionIndex: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    if (!activeModule.quiz) return;
    let correct = 0;
    activeModule.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / activeModule.quiz.length) * 100);
    setQuizScore(scorePct);
    setIsQuizSubmitted(true);

    if (scorePct >= 66) {
      onPassQuiz(course.id, scorePct);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl h-[85vh] flex flex-col rounded-3xl border border-white/10 bg-[#090b14] shadow-2xl overflow-hidden">
        {/* Modal Top Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <PlayCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white truncate max-w-lg">{course.title}</h3>
              <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                <span>{course.authorName}</span>
                <span>•</span>
                <span className="text-emerald-400 font-mono">Unlocks Level {course.competencyGainLevel}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body: Sidebar (3 Cols) + Content Player (9 Cols) */}
        <div className="flex-1 flex overflow-hidden">
          {/* Module Navigation List */}
          <div className="w-72 border-r border-white/10 bg-black/30 p-4 space-y-2 overflow-y-auto hidden md:block">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block px-2">
              Course Curriculum ({course.modules.length} Modules)
            </span>

            {course.modules.map((mod, i) => {
              const isActive = i === activeModuleIndex;
              return (
                <button
                  key={mod.id}
                  onClick={() => {
                    setActiveModuleIndex(i);
                    setIsQuizSubmitted(false);
                    setQuizScore(null);
                  }}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-2.5 ${
                    isActive
                      ? "bg-indigo-600/20 border-indigo-500/40 text-white"
                      : "bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="mt-0.5">
                    {mod.type === "quiz" ? (
                      <HelpCircle className="h-4 w-4 text-emerald-400" />
                    ) : mod.type === "video" ? (
                      <PlayCircle className="h-4 w-4 text-cyan-400" />
                    ) : (
                      <FileText className="h-4 w-4 text-indigo-400" />
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold block truncate">{mod.title}</span>
                    <span className="text-[10px] text-neutral-500 block font-mono">{mod.duration}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Content Viewer */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#07080f]">
            {activeModule.type === "quiz" && activeModule.quiz ? (
              /* Quiz Player */
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <Badge variant="purple" size="sm" dot>Assessment Engine</Badge>
                    <h2 className="text-lg font-bold text-white mt-1">
                      {activeModule.title}
                    </h2>
                    <p className="text-xs text-neutral-400">
                      Score 66%+ to immediately level up your competency matrix and earn +250 XP.
                    </p>
                  </div>
                </div>

                {/* Question List */}
                <div className="space-y-6">
                  {activeModule.quiz.map((q, qIndex) => (
                    <div key={qIndex} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                      <h4 className="text-xs sm:text-sm font-semibold text-white">
                        <span className="text-indigo-400 font-mono mr-2">Q{qIndex + 1}.</span>
                        {q.question}
                      </h4>

                      <div className="space-y-2 pt-1">
                        {q.options.map((opt, optIndex) => {
                          const isSelected = selectedAnswers[qIndex] === optIndex;
                          const isCorrect = q.correctIndex === optIndex;
                          const showSuccess = isQuizSubmitted && isCorrect;
                          const showWrong = isQuizSubmitted && isSelected && !isCorrect;

                          return (
                            <button
                              key={optIndex}
                              onClick={() => handleSelectOption(qIndex, optIndex)}
                              className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
                                showSuccess
                                  ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-200"
                                  : showWrong
                                  ? "bg-rose-500/20 border-rose-500/50 text-rose-200"
                                  : isSelected
                                  ? "bg-indigo-600/30 border-indigo-500/60 text-white font-medium"
                                  : "bg-black/30 border-white/5 text-neutral-300 hover:bg-white/5"
                              }`}
                            >
                              <span>{opt}</span>
                              {showSuccess && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                              {showWrong && <AlertCircle className="h-4 w-4 text-rose-400" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation on submit */}
                      {isQuizSubmitted && (
                        <div className="p-3 rounded-xl bg-white/[0.03] text-[11px] text-neutral-300 border border-white/5 flex items-start gap-2">
                          <Sparkles className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{q.explanation}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Score & Submit Action */}
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-4">
                  {isQuizSubmitted ? (
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${quizScore! >= 66 ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                        <Award className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-white block">
                          Final Score: {quizScore}% ({quizScore! >= 66 ? "PASSED 🎉" : "RETRY REQUIRED"})
                        </span>
                        <span className="text-xs text-neutral-400">
                          {quizScore! >= 66
                            ? "Competency Matrix updated! Level upgraded on your Skill Radar."
                            : "Review the course materials and try again to unlock your level."}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-neutral-400">
                      Answer all questions to finalize your assessment score.
                    </span>
                  )}

                  {!isQuizSubmitted ? (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(selectedAnswers).length < activeModule.quiz.length}
                      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
                    >
                      <Zap className="h-4 w-4" />
                      Submit Assessment & Level Up
                    </button>
                  ) : (
                    <button
                      onClick={onClose}
                      className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition-all"
                    >
                      Return to Dashboard
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Text / Markdown / Lab Reader */
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-indigo-400">Module {activeModuleIndex + 1}</span>
                  <h2 className="text-xl font-bold text-white">{activeModule.title}</h2>
                </div>

                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 prose prose-invert max-w-none text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-4">
                  {activeModule.textMarkdown ? (
                    <div className="whitespace-pre-line font-sans">
                      {activeModule.textMarkdown}
                    </div>
                  ) : (
                    <p>Course lecture notes and interactive terminal sandbox are loading...</p>
                  )}
                </div>

                {/* Next Module Button */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    onClick={() => setActiveModuleIndex(Math.max(0, activeModuleIndex - 1))}
                    disabled={activeModuleIndex === 0}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-xs text-neutral-300 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Previous
                  </button>

                  <button
                    onClick={() => setActiveModuleIndex(Math.min(course.modules.length - 1, activeModuleIndex + 1))}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
                  >
                    Next Lesson <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
