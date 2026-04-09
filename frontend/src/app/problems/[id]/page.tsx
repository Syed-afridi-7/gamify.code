"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Tag, Clock, Cpu, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  topic_tags: string[];
  source: string;
  external_link: string;
  xp_reward: number;
}

const DIFF_STYLES: Record<string, string> = {
  Easy: "text-success bg-success/10 border-success/20",
  Medium: "text-warning bg-warning/10 border-warning/20",
  Hard: "text-danger bg-danger/10 border-danger/20",
};

export default function ProblemPage({ params }: { params: { id: string } }) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/problems/${params.id}`);
        if (!res.ok) { setLoading(false); return; }
        const data = await res.json();
        setProblem(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-foreground/40 text-lg font-semibold">Problem not found.</p>
        <Link href="/dashboard" className="text-primary text-sm hover:underline">← Back to Practice</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Breadcrumb */}
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-foreground/40 hover:text-foreground transition-colors mb-6 group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Practice Arena
      </Link>

      <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-160px)]">
        {/* LEFT: Problem Description */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="flex flex-col glass rounded-2xl border border-white/8 overflow-hidden"
        >
          {/* Problem Header */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <span className={cn("px-3 py-1 rounded-lg text-xs font-bold border", DIFF_STYLES[problem.difficulty] || DIFF_STYLES.Medium)}>
                {problem.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-accent">
                <Sparkles size={12} />
                +{problem.xp_reward} XP
              </span>
              {problem.source && (
                <span className="text-[10px] uppercase text-foreground/30 font-bold tracking-widest ml-auto">
                  {problem.source}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-black tracking-tight mb-2">{problem.title}</h1>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {(problem.topic_tags || []).map(tag => (
                <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md bg-white/5 border border-white/8 text-foreground/40">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Problem Body */}
          <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-4">Problem Statement</h2>
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-foreground/70 leading-relaxed text-sm whitespace-pre-wrap">{problem.description}</p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="p-4 border-t border-white/5 flex items-center gap-3">
            {problem.external_link && (
              <a
                href={problem.external_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-foreground/40 hover:text-primary transition-colors font-medium"
              >
                <ExternalLink size={14} />
                View on {problem.source || "Platform"}
              </a>
            )}
          </div>
        </motion.div>

        {/* RIGHT: Code Editor (Monaco — Phase 2) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          className="flex flex-col glass rounded-2xl border border-white/8 overflow-hidden"
        >
          {/* Editor Placeholder */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-danger/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <span className="text-xs text-foreground/40 font-mono ml-2">main.py</span>
            </div>
            <div className="flex items-center gap-2">
              <select className="text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-foreground/60 focus:outline-none">
                <option>Python 3</option>
                <option>JavaScript</option>
                <option>C++</option>
                <option>Java</option>
                <option>C</option>
              </select>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 bg-[#0d1117] p-6 font-mono text-sm text-foreground/60 relative">
            <pre className="opacity-50">{`# Write your solution here
def solution():
    pass`}</pre>
            {/* Coming Soon Badge */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="glass border border-primary/30 rounded-2xl p-8 text-center max-w-sm">
                <Cpu size={32} className="text-primary mx-auto mb-4" />
                <h3 className="font-black text-lg mb-2">In-Browser Compiler</h3>
                <p className="text-foreground/50 text-sm leading-relaxed mb-4">
                  Monaco Editor + Judge0 execution engine coming in Phase 2. For now, use the external platform.
                </p>
                {problem.external_link && (
                  <a
                    href={problem.external_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-all"
                  >
                    <ExternalLink size={16} />
                    Open in {problem.source || "Platform"}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Console Output Area */}
          <div className="h-32 bg-[#060d14] border-t border-white/5 p-4">
            <div className="text-xs font-bold uppercase tracking-widest text-foreground/25 mb-2">Console</div>
            <div className="text-xs text-foreground/30 font-mono">Judge0 execution engine ready in Phase 2...</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
