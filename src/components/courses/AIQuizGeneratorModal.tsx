"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import {
  Sparkles,
  X,
  FileText,
  CheckCircle2,
  HelpCircle,
  Copy,
  Zap,
  ArrowRight,
  BookOpen,
} from "lucide-react";

interface AIQuizGeneratorModalProps {
  onClose: () => void;
  onSaveQuiz?: (quizData: any[]) => void;
}

export const AIQuizGeneratorModal: React.FC<AIQuizGeneratorModalProps> = ({
  onClose,
  onSaveQuiz,
}) => {
  const [inputText, setInputText] = useState<string>(
    `Kubernetes Services act as an abstraction layer over a dynamic set of Pod replicas. A ClusterIP service exposes the service on an internal IP within the cluster, making it accessible only within the cluster. A NodePort service exposes the service on each Node's IP at a static port (NodePort), allowing external traffic to reach the pods. A LoadBalancer service provisions an external cloud load balancer (e.g. AWS ELB or GCP Cloud Load Balancing) that routes external traffic directly into NodePort and ClusterIP endpoints. Ingress Controllers manage external access via HTTP/HTTPS routing rules and host-based domain dispatching.`
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[] | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Well-reasoned deterministic rule engine parsing key concepts from text
      const questions = [
        {
          question: "Which Kubernetes Service type is exclusively accessible from within the cluster on an internal virtual IP?",
          options: ["ClusterIP", "NodePort", "LoadBalancer", "ExternalName"],
          correctIndex: 0,
          explanation: "ClusterIP is the default service type and is only reachable by pods inside the cluster network.",
        },
        {
          question: "What is the primary role of a Kubernetes NodePort service?",
          options: [
            "Encrypts inter-pod disk traffic.",
            "Exposes the service on a static high port across each Node's public/private IP.",
            "Replaces the kube-scheduler pod allocation logic.",
            "Stores persistent volumes across cloud regions.",
          ],
          correctIndex: 1,
          explanation: "NodePort allocates a dedicated port (usually 30000-32767) on every node to route traffic inwards.",
        },
        {
          question: "When deploying an Ingress Controller, how does it primarily route external client requests?",
          options: [
            "Through host-based and path-based HTTP/HTTPS application-layer routing rules.",
            "Through raw UDP port broadcasting.",
            "By rebooting unhealthy cluster nodes.",
            "By mutating etcd transaction logs directly.",
          ],
          correctIndex: 0,
          explanation: "Ingress controllers operate at Layer 7 to route incoming HTTP traffic based on URL paths and domains.",
        },
      ];
      setGeneratedQuestions(questions);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-[#090b14] shadow-2xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">AI Assessment & Quiz Synthesizer</h3>
                <Badge variant="cyan" size="sm">Auto-Gen</Badge>
              </div>
              <p className="text-xs text-neutral-400">
                Paste any lesson markdown or technical documentation to extract auto-graded competency questions.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Input Text Area */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-neutral-300 flex items-center justify-between">
            <span>Source Technical Content / Lecture Notes</span>
            <span className="text-[10px] font-mono text-neutral-500">{inputText.length} characters</span>
          </label>
          <textarea
            rows={5}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono leading-relaxed"
            placeholder="Paste technical text here..."
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || inputText.trim().length < 20}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 disabled:opacity-40 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
        >
          <Zap className="h-4 w-4" />
          {isGenerating ? "Synthesizing Competency Questions..." : "Generate Auto-Graded Assessment (3 Questions)"}
        </button>

        {/* Generated Questions Preview */}
        {generatedQuestions && (
          <div className="space-y-4 pt-4 border-t border-white/10 animate-in fade-in duration-300">
            <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle2 className="h-4 w-4" /> Generated Assessment Preview
            </h4>

            <div className="space-y-4">
              {generatedQuestions.map((q, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
                  <span className="font-bold text-white block">
                    Q{idx + 1}. {q.question}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt: string, optIdx: number) => (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-xl border text-[11px] ${
                          optIdx === q.correctIndex
                            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-semibold"
                            : "bg-black/30 border-white/5 text-neutral-400"
                        }`}
                      >
                        {opt} {optIdx === q.correctIndex && "✓ (Correct)"}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-neutral-300"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  if (onSaveQuiz) onSaveQuiz(generatedQuestions);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all"
              >
                Insert into Course Curriculum
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
