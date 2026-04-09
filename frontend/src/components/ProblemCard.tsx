"use client";

import { motion } from "framer-motion";
import { Sparkles, ExternalLink, CheckCircle2, Lock } from "lucide-react";
import { Problem } from "@/lib/api";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const DIFF_STYLES: Record<string, string> = {
  Easy: "text-success bg-success/10 border-success/30",
  Medium: "text-warning bg-warning/10 border-warning/30",
  Hard: "text-danger bg-danger/10 border-danger/30",
};

const XP_COLOR: Record<string, string> = {
  Easy: "text-success",
  Medium: "text-warning",
  Hard: "text-danger",
};

export default function ProblemCard({ problem }: { problem: Problem }) {
  const { data: session } = useSession();
  const [solved, setSolved] = useState(false);
  const [loading, setLoading] = useState(false);

  const diffStyle = DIFF_STYLES[problem.difficulty] || "text-primary bg-primary/10 border-primary/30";
  const xpColor = XP_COLOR[problem.difficulty] || "text-primary";

  const handleMarkSolved = async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/user/solve/${problem.id}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${session.accessToken}` },
      });
      if (res.ok) setSolved(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={cn(
        "flex flex-col h-full p-5 rounded-2xl glass border transition-all group",
        solved ? "border-success/30 bg-success/3" : "border-white/8 hover:border-primary/30"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <span className={cn("px-2.5 py-1 rounded-lg text-xs font-bold border", diffStyle)}>
          {problem.difficulty}
        </span>
        <div className={cn("flex items-center gap-1 text-xs font-bold", xpColor)}>
          <Sparkles size={12} />
          +{problem.xp_reward} XP
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug flex-shrink-0">
        {solved && <CheckCircle2 size={16} className="inline mr-1.5 text-success mb-0.5" />}
        {problem.title}
      </h3>

      {/* Description */}
      <p className="text-foreground/40 text-sm line-clamp-2 mb-4 leading-relaxed flex-1">
        {problem.description || "Solve this algorithmic challenge to earn XP."}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {(problem.topic_tags || []).slice(0, 3).map((tag) => (
          <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-foreground/30 bg-white/5 px-2 py-0.5 rounded-md">
            {tag}
          </span>
        ))}
      </div>

      {/* Source badge */}
      {problem.source && (
        <div className="text-[10px] uppercase font-bold text-foreground/25 tracking-widest mb-4">
          {problem.source}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 mt-auto">
        <Link
          href={`/problems/${problem.id}`}
          className="flex-1 py-2.5 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary hover:border-primary text-primary hover:text-white text-sm font-semibold transition-all text-center"
        >
          Solve Now
        </Link>
        <a
          href={problem.external_link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-foreground/40 hover:text-foreground"
          title="Open on source platform"
        >
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Mark Solved (only when logged in, links to internal problem page) */}
      {session && !solved && (
        <button
          onClick={handleMarkSolved}
          disabled={loading}
          className="mt-2 w-full py-2 rounded-xl border border-success/20 bg-success/5 text-success text-xs font-semibold hover:bg-success/10 transition-all"
        >
          {loading ? "Saving..." : "Mark as Solved"}
        </button>
      )}
    </motion.div>
  );
}
