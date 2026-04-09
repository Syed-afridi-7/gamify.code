"use client";

import { motion } from "framer-motion";
import { Sparkles, ExternalLink, Code2 } from "lucide-react";
import { Problem } from "@/lib/api";

export default function ProblemCard({ problem }: { problem: Problem }) {
  const difficultyColor = {
    Easy: "text-green-400 bg-green-400/10 border-green-400/20",
    Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    Hard: "text-red-400 bg-red-400/10 border-red-400/20",
  }[problem.difficulty] || "text-blue-400 bg-blue-400/10 border-blue-400/20";

  return (
    <motion.div
      whileHover={{ y: -5, borderColor: "rgba(155, 81, 224, 0.5)" }}
      className="p-5 rounded-2xl bg-foreground/5 border border-foreground/10 transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${difficultyColor}`}>
          {problem.difficulty}
        </span>
        <div className="flex items-center gap-1 text-secondary font-bold text-sm">
          <Sparkles size={14} />
          {problem.xp_reward} XP
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
        {problem.title}
      </h3>
      
      <p className="text-foreground/60 text-sm line-clamp-2 mb-4 leading-relaxed">
        {problem.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {problem.topic_tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-foreground/40 bg-foreground/5 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <a
          href={problem.external_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary hover:text-white text-primary text-sm font-bold transition-all flex items-center justify-center gap-2"
        >
          <Code2 size={16} />
          Solve Now
        </a>
        <button className="p-2.5 rounded-xl bg-foreground/5 border border-foreground/10 hover:border-foreground/30 transition-all text-foreground/60">
          <ExternalLink size={16} />
        </button>
      </div>
    </motion.div>
  );
}
