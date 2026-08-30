"use client";

import React, { useState } from "react";
import { KnowledgeArticle, ExpertQuestion, Competency } from "@/data/capacityData";
import { Badge } from "@/components/ui/Badge";
import {
  BookOpen,
  ThumbsUp,
  MessageSquare,
  Eye,
  Plus,
  HelpCircle,
  Sparkles,
  Search,
  Filter,
  UserCheck,
  Send,
  CheckCircle2,
  Tag,
} from "lucide-react";

interface KnowledgeHubProps {
  articles: KnowledgeArticle[];
  questions: ExpertQuestion[];
  competencies: Competency[];
  onUpvote: (articleId: string) => void;
  onAskQuestion: (title: string, desc: string, compId: string) => void;
  onNewArticle: (title: string, body: string, tags: string[]) => void;
}

export const KnowledgeHub: React.FC<KnowledgeHubProps> = ({
  articles,
  questions,
  competencies,
  onUpvote,
  onAskQuestion,
  onNewArticle,
}) => {
  const [activeTab, setActiveTab] = useState<"articles" | "ask_expert">("articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // New Article Modal
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [artTitle, setArtTitle] = useState("");
  const [artBody, setArtBody] = useState("");
  const [artTag, setArtTag] = useState("React & Next.js Architecture");

  // Ask Question Form
  const [showAskModal, setShowAskModal] = useState(false);
  const [qTitle, setQTitle] = useState("");
  const [qDesc, setQDesc] = useState("");
  const [qCompId, setQCompId] = useState("comp-k8s");

  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.body.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "All" || art.competencyTags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handlePostArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle.trim() || !artBody.trim()) return;
    onNewArticle(artTitle, artBody, [artTag]);
    setArtTitle("");
    setArtBody("");
    setShowArticleModal(false);
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qTitle.trim()) return;
    onAskQuestion(qTitle, qDesc, qCompId);
    setQTitle("");
    setQDesc("");
    setShowAskModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Action & Tab Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-white/[0.02] border border-white/5">
        {/* Left Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab("articles")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "articles"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Peer Knowledge Base ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("ask_expert")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "ask_expert"
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Ask an Expert ({questions.length})</span>
          </button>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2.5">
          {activeTab === "articles" ? (
            <button
              onClick={() => setShowArticleModal(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" /> Share Article
            </button>
          ) : (
            <button
              onClick={() => setShowAskModal(true)}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/25 transition-all flex items-center gap-1.5"
            >
              <HelpCircle className="h-3.5 w-3.5" /> Ask a Question
            </button>
          )}
        </div>
      </div>

      {activeTab === "articles" ? (
        /* Tab 1: Peer Articles */
        <div className="space-y-4">
          {/* Search & Tag Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="text"
                placeholder="Search knowledge articles, architectures, incident learnings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {["All", "React & Next.js Architecture", "Kubernetes & Container Orchestration", "PostgreSQL & Database Performance"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-xl border text-[11px] font-medium whitespace-nowrap transition-all ${
                    selectedTag === tag
                      ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40 font-bold"
                      : "bg-white/[0.02] text-neutral-400 border-white/5 hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Article Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="rounded-3xl border border-white/10 bg-[#090b14]/90 p-5 flex flex-col justify-between space-y-4 hover:border-indigo-500/30 transition-all group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {art.competencyTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-mono font-medium truncate max-w-[180px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] text-neutral-500">{art.createdAt}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                    {art.body.replace(/[#*`]/g, "")}
                  </p>
                </div>

                {/* Author Info & Upvotes Footer */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={art.authorAvatar}
                      alt={art.authorName}
                      className="w-6 h-6 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <span className="text-[11px] font-semibold text-white block leading-none">{art.authorName}</span>
                      <span className="text-[9px] text-neutral-500 leading-tight">{art.authorRole}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onUpvote(art.id)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-indigo-500/20 hover:text-indigo-300 text-neutral-300 text-[11px] font-bold border border-white/5 transition-colors"
                      title="Upvote technical article"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      <span>{art.upvotes}</span>
                    </button>
                    <span className="flex items-center gap-1 text-[11px] text-neutral-500">
                      <MessageSquare className="h-3 w-3" /> {art.commentsCount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Tab 2: Ask an Expert */
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 flex items-center gap-3 text-xs text-cyan-300">
            <UserCheck className="h-4 w-4 shrink-0 text-cyan-400" />
            <span>
              Questions are algorithmically dispatched to employees holding <strong>Level 4 (Expert)</strong> or <strong>Level 5 (Principal)</strong> verified ratings in the tagged competency.
            </span>
          </div>

          <div className="space-y-4">
            {questions.map((q) => (
              <div
                key={q.id}
                className="rounded-3xl border border-white/10 bg-[#090b14]/90 p-6 space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono">
                        {q.competencyName}
                      </span>
                      <span className="text-[10px] text-neutral-500">{q.createdAt}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white">{q.title}</h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">{q.description}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <img
                      src={q.askerAvatar}
                      alt={q.askerName}
                      className="w-7 h-7 rounded-full object-cover border border-white/10"
                    />
                    <span className="text-xs text-neutral-400 font-medium hidden sm:inline">{q.askerName}</span>
                  </div>
                </div>

                {/* Top Answer if present */}
                {q.topAnswer && (
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Verified Expert Response
                      </span>
                      <span className="text-[10px] text-neutral-500">{q.topAnswer.answeredAt}</span>
                    </div>
                    <p className="text-xs text-neutral-200 font-mono leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">
                      {q.topAnswer.text}
                    </p>
                    <span className="text-[10px] text-neutral-400 block text-right font-medium">
                      Answered by {q.topAnswer.authorName} ({q.topAnswer.authorRole})
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share Article Modal */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#090b14] p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-400" /> Share Technical Knowledge Article
            </h3>
            <form onSubmit={handlePostArticle} className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-neutral-300 block mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Best Practices for Kafka Consumer Lag Monitoring"
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-medium text-neutral-300 block mb-1">Competency Tag</label>
                <select
                  value={artTag}
                  onChange={(e) => setArtTag(e.target.value)}
                  className="w-full bg-[#0e111a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                >
                  {competencies.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-medium text-neutral-300 block mb-1">Markdown Body</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write code snippets, architectural trade-offs, or incident learnings..."
                  value={artBody}
                  onChange={(e) => setArtBody(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowArticleModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ask Question Modal */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#090b14] p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-cyan-400" /> Route Question to Verified Domain Experts
            </h3>
            <form onSubmit={handlePostQuestion} className="space-y-3 text-xs">
              <div>
                <label className="font-medium text-neutral-300 block mb-1">Question Summary</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to prevent N+1 query loops with DataLoader in federated GraphQL?"
                  value={qTitle}
                  onChange={(e) => setQTitle(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="font-medium text-neutral-300 block mb-1">Target Competency</label>
                <select
                  value={qCompId}
                  onChange={(e) => setQCompId(e.target.value)}
                  className="w-full bg-[#0e111a] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500"
                >
                  {competencies.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} ({c.category})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-medium text-neutral-300 block mb-1">Detailed Technical Context</label>
                <textarea
                  rows={4}
                  placeholder="Describe your error logs, attempted configurations, or environment constraints..."
                  value={qDesc}
                  onChange={(e) => setQDesc(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAskModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 text-white font-bold"
                >
                  Dispatch to Experts
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
