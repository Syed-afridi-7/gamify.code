"use client";

import { motion } from "framer-motion";
import { Code2, Sword, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col pt-20 px-4 md:px-8 max-w-6xl mx-auto relative overflow-hidden">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-20 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Early Access Alpha
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Coding Skills</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
        >
          Master Data Structures and Algorithms through gamified solo practice, real-time 1v1 Clash Mode battles, and personalized AI mentorship.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
        >
          <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(155,81,224,0.4)]">
            <Code2 size={20} />
            Start Practicing
          </Link>
          <Link href="/arena" className="px-8 py-4 rounded-xl bg-secondary/10 border border-secondary/30 hover:bg-secondary/20 text-foreground font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2">
            <Sword size={20} className="text-secondary" />
            Enter the Arena
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-6 py-20 z-10 relative">
        <FeatureCard 
          icon={<Cpu className="text-primary" size={32} />}
          title="AI Mentor"
          description="Get dynamic hints, error analysis, and 'Explain like I'm 5' mode without spoiling the solution."
          delay={0.4}
        />
        <FeatureCard 
          icon={<Sword className="text-accent" size={32} />}
          title="Clash Mode"
          description="Compete in real-time 1v1 battle arrays. Both see the same problem, race against the clock."
          delay={0.5}
        />
        <FeatureCard 
          icon={<Code2 className="text-secondary" size={32} />}
          title="Smart Practice"
          description="A personalized practice engine that detects your weak topics and recommends daily challenges."
          delay={0.6}
        />
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10 hover:border-primary/50 transition-colors backdrop-blur-sm"
    >
      <div className="mb-4 bg-background w-14 h-14 rounded-xl flex items-center justify-center border border-foreground/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-foreground/60">{description}</p>
    </motion.div>
  )
}
