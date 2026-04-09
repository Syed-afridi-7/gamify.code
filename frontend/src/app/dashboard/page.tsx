"use client";

import { useEffect, useState } from "react";
import { getProblems, Problem } from "@/lib/api";
import ProblemCard from "@/components/ProblemCard";
import { motion } from "framer-motion";
import { Search, Filter, Trophy, Target, Zap } from "lucide-react";
import UserMenu from "@/components/UserMenu";

export default function Dashboard() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getProblems(1, 12, topic, difficulty);
        setProblems(data.items);
      } catch (error) {
        console.error("Error loading problems:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [topic, difficulty]);

  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 max-w-7xl mx-auto pb-20">
      {/* Navbar with User Menu */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-foreground/5 py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-black italic tracking-tighter hover:scale-105 transition-transform cursor-pointer">
           CLASH<span className="text-primary NOT-italic">CODE</span>
        </div>
        <UserMenu />
      </nav>

      {/* Top Stats Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatCard icon={<Trophy className="text-yellow-400" />} label="Solved" value="24" />
        <StatCard icon={<Zap className="text-primary" />} label="Streak" value="12 Days" />
        <StatCard icon={<Target className="text-secondary" />} label="Next Level" value="450 XP" />
        <StatCard icon={<Search className="text-accent" />} label="Rank" value="#1,432" />
      </section>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            DAILY <span className="text-primary">MISSIONS</span>
          </h1>
          <p className="text-foreground/60 font-medium">Complete these to keep your streak alive.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
             <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={16} />
             <select 
               onChange={(e) => setDifficulty(e.target.value)}
               className="w-full bg-foreground/5 border border-foreground/10 rounded-xl py-2.5 pl-10 pr-4 text-sm font-semibold focus:border-primary outline-none transition-all appearance-none"
             >
                <option value="">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
             </select>
          </div>
          <div className="relative flex-1 md:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={16} />
             <input 
               type="text" 
               placeholder="Filte by topic (e.g. Array)"
               onKeyDown={(e) => e.key === 'Enter' && setTopic(e.currentTarget.value)}
               className="w-full bg-foreground/5 border border-foreground/10 rounded-xl py-2.5 pl-10 pr-4 text-sm font-semibold focus:border-primary outline-none transition-all"
             />
          </div>
        </div>
      </div>

      {/* Problems Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-foreground/5 rounded-2xl border border-foreground/10"></div>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProblemCard problem={problem} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {problems.length === 0 && !loading && (
        <div className="text-center py-20 bg-foreground/5 rounded-3xl border border-dashed border-foreground/10">
          <p className="text-xl font-bold text-foreground/40 uppercase tracking-widest">No challenges found in this realm</p>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="p-4 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center gap-4">
      <div className="p-3 rounded-xl bg-background border border-foreground/5 shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-[10px] uppercase font-bold text-foreground/40 tracking-wider">
          {label}
        </div>
        <div className="text-lg font-black tracking-tight">{value}</div>
      </div>
    </div>
  )
}
