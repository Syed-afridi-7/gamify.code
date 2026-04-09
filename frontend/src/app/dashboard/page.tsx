"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getProblems, Problem } from "@/lib/api";
import ProblemCard from "@/components/ProblemCard";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Trophy, Flame, Target, BarChart3, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TOPICS = ["All", "Array", "String", "Dynamic Programming", "Graph", "Tree", "Greedy", "Binary Search", "Stack"];
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

export default function Dashboard() {
  const { data: session } = useSession();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const PAGE_SIZE = 12;

  useEffect(() => {
    loadData();
  }, [topic, difficulty, page]);

  async function loadData() {
    setLoading(true);
    try {
      const data = await getProblems(page, PAGE_SIZE, topic || undefined, difficulty || undefined);
      setProblems(data.items);
      setTotal(data.total);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="border-b border-white/5 glass">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight mb-1">
                Practice Arena
              </h1>
              <p className="text-foreground/50">
                {total.toLocaleString()} problems • Solve daily to maintain your streak
              </p>
            </div>
            {session && (
              <Link
                href="/arena"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-secondary/30 bg-secondary/10 text-secondary font-semibold text-sm hover:bg-secondary/20 transition-all"
              >
                Challenge Someone
                <ChevronRight size={16} />
              </Link>
            )}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: <Trophy size={18} className="text-accent" />, label: "Solved", value: "—" },
              { icon: <Flame size={18} className="text-orange-400" />, label: "Streak", value: "—" },
              { icon: <BarChart3 size={18} className="text-primary" />, label: "Level", value: "—" },
              { icon: <Target size={18} className="text-secondary" />, label: "ELO", value: "1200" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 p-4 rounded-xl bg-white/3 border border-white/5">
                <div className="p-2 rounded-lg bg-white/5">{stat.icon}</div>
                <div>
                  <div className="text-xs text-foreground/40 font-medium">{stat.label}</div>
                  <div className="text-lg font-black">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/30" />
            <input
              type="text"
              placeholder="Filter by topic (press Enter)"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter") { setTopic(e.currentTarget.value); setPage(1); }
              }}
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex gap-2">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => { setDifficulty(d === "All" ? "" : d); setPage(1); }}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-semibold transition-all border",
                  difficulty === (d === "All" ? "" : d)
                    ? d === "Easy" ? "bg-success/10 border-success/30 text-success"
                    : d === "Medium" ? "bg-warning/10 border-warning/30 text-warning"
                    : d === "Hard" ? "bg-danger/10 border-danger/30 text-danger"
                    : "bg-primary/10 border-primary/30 text-primary"
                    : "bg-white/5 border-white/10 text-foreground/50 hover:border-white/20"
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {TOPICS.map((t) => (
            <button
              key={t}
              onClick={() => { setTopic(t === "All" ? "" : t); setPage(1); }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
                topic === (t === "All" ? "" : t)
                  ? "bg-primary/15 border-primary/40 text-primary"
                  : "bg-white/3 border-white/8 text-foreground/40 hover:border-white/15"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Problem Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-52 bg-white/3 rounded-2xl border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {problems.map((problem, i) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <ProblemCard problem={problem} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {total > PAGE_SIZE && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold disabled:opacity-30 hover:border-primary/30 transition-all"
            >
              Previous
            </button>
            <span className="text-sm text-foreground/40">
              Page <span className="text-foreground font-bold">{page}</span> of{" "}
              <span className="text-foreground font-bold">{Math.ceil(total / PAGE_SIZE)}</span>
            </span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page >= Math.ceil(total / PAGE_SIZE)}
              className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold disabled:opacity-30 hover:border-primary/30 transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
