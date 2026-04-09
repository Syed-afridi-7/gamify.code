"use client";

import { motion } from "framer-motion";
import { Code2, Sword, Zap, ArrowRight, Trophy, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative px-4 md:px-8 pt-24 pb-32 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Background glow orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Now with 3,000+ Problems — Open Beta
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="relative z-10 text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6"
        >
          The Arena Where
          <br />
          <span className="text-gradient">Coders Level Up</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Stop grinding alone. GamifyCode turns DSA practice into a competitive sport — earn XP, battle rivals in real-time, and get AI-powered hints when you&apos;re stuck.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-base transition-all glow-primary hover:scale-105"
          >
            <Code2 size={20} />
            Start Practicing Free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/arena"
            className="flex items-center gap-2 px-8 py-4 rounded-xl border border-secondary/30 bg-secondary/10 text-secondary hover:bg-secondary/20 font-bold text-base transition-all hover:scale-105"
          >
            <Sword size={20} />
            Enter Clash Arena
          </Link>
        </motion.div>


        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="relative z-10 mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          {[
            { value: "3,000+", label: "DSA Problems" },
            { value: "10+", label: "Companies Covered" },
            { value: "5", label: "Languages Supported" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-gradient">{stat.value}</div>
              <div className="text-sm text-foreground/50 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="px-4 md:px-8 py-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Everything You Need to<br /><span className="text-gradient">Win Interviews</span></h2>
          <p className="text-foreground/50 text-lg max-w-xl mx-auto">One platform. Three ways to get better.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <BookOpen size={28} className="text-primary" />,
              title: "Smart Practice",
              desc: "3,000+ hand-curated problems from LeetCode, Codeforces & HackerRank. Filter by topic, difficulty, or company.",
              tags: ["Arrays", "DP", "Graphs", "Trees"],
              color: "primary"
            },
            {
              icon: <Sword size={28} className="text-secondary" />,
              title: "1v1 Clash Mode",
              desc: "Challenge a friend or get randomly matched. Both receive the same problem — first to solve wins ELO rating.",
              tags: ["Real-time", "WebSockets", "ELO Rating"],
              color: "secondary"
            },
            {
              icon: <Zap size={28} className="text-accent" />,
              title: "AI Mentor",
              desc: "Stuck? Our AI gives you a step-by-step hint without spoiling the answer. Teaches you to think, not just memorize.",
              tags: ["Hints", "Complexity", "Strategy"],
              color: "accent"
            }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl glass border border-white/5 hover:border-primary/30 transition-all group"
            >
              <div className={`w-14 h-14 rounded-xl bg-${feature.color}/10 border border-${feature.color}/20 flex items-center justify-center mb-5 group-hover:glow-primary transition-all`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground/50 text-sm leading-relaxed mb-5">{feature.desc}</p>
              <div className="flex flex-wrap gap-2">
                {feature.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border border-white/10 text-foreground/40">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="px-4 md:px-8 py-24 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-3xl border border-primary/20 p-12 glow-primary"
        >
          <Trophy size={40} className="text-accent mx-auto mb-6 animate-float" />
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Ready to Enter the Arena?</h2>
          <p className="text-foreground/50 mb-8">Your placement prep just got a whole lot more interesting.</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold transition-all glow-primary hover:scale-105"
          >
            Start for Free
            <ChevronRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
