"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ExternalLink, Code2, CheckCircle2 } from "lucide-react";
import { Problem } from "@/lib/api";
import { useSession } from "next-auth/react";

export default function ProblemCard({ problem }: { problem: Problem }) {
  const { data: session } = useSession();
  const [isSolving, setIsSolving] = useState(false);
  const [solved, setSolved] = useState(false);

  const difficultyColor = {
    Easy: "text-green-400 bg-green-400/10 border-green-400/20",
    Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    Hard: "text-red-400 bg-red-400/10 border-red-400/20",
  }[problem.difficulty] || "text-blue-400 bg-blue-400/10 border-blue-400/20";

  const handleFinish = async () => {
    if (!session?.accessToken) return;
    setIsSolving(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/user/solve/${problem.id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session.accessToken}`,
        },
      });
      if (response.ok) {
        setSolved(true);
      }
    } catch (error) {
      console.error("Error solving problem:", error);
    } finally {
      setIsSolving(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, borderColor: "rgba(155, 81, 224, 0.5)" }}
      className={`p-5 rounded-2xl bg-foreground/5 border transition-all group ${solved ? 'border-green-500/50 grayscale-[0.5]' : 'border-foreground/10'}`}
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
        {solved && <CheckCircle2 className="inline ml-2 text-green-500" size={20} />}
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

      <div className="flex flex-col gap-3">
        <a
          href={problem.external_link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary hover:text-white text-primary text-sm font-bold transition-all flex items-center justify-center gap-2"
        >
          <Code2 size={16} />
          Solve Now
        </a>
        
        {session && !solved && (
          <button 
            onClick={handleFinish}
            disabled={isSolving}
            className="w-full py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500 hover:text-white text-green-500 text-sm font-bold transition-all flex items-center justify-center gap-2"
          >
            {isSolving ? "Updating Stats..." : "Mark as Solved"}
          </button>
        )}
      </div>
    </motion.div>
  );
}
