"use client";

import { motion } from "framer-motion";
import { Sword, Users, Timer, Zap, ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function ArenaPage() {
  const { data: session } = useSession();
  const [roomCode, setRoomCode] = useState("");
  const [copied, setCopied] = useState(false);

  const generateRoom = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!session) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass border border-white/10 rounded-3xl p-12 max-w-md">
          <Sword size={48} className="text-secondary mx-auto mb-6 animate-float" />
          <h2 className="text-3xl font-black mb-3">Enter the Clash Arena</h2>
          <p className="text-foreground/50 text-sm leading-relaxed mb-8">
            Real-time 1v1 coding battles. You'll need an account to track your ELO rating and match history.
          </p>
          <button
            onClick={() => signIn("google")}
            className="w-full py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-all glow-primary"
          >
            Sign In to Battle
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 md:px-8 py-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
          </span>
          Clash Mode — BETA
        </div>
        <h1 className="text-5xl font-black tracking-tight mb-4">
          The <span className="text-gradient">Battle Arena</span>
        </h1>
        <p className="text-foreground/50 text-lg max-w-lg mx-auto">
          Challenge a friend to a real-time 1v1 coding duel. Same problem. Best coder wins.
        </p>
      </motion.div>

      {/* Battle Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {/* Create Room Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="p-8 glass rounded-2xl border border-white/8 hover:border-secondary/30 transition-all"
        >
          <div className="w-14 h-14 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-6">
            <Zap size={26} className="text-secondary" />
          </div>
          <h2 className="text-xl font-black mb-2">Create a Room</h2>
          <p className="text-foreground/50 text-sm mb-6 leading-relaxed">
            Generate a room code and share it with your opponent. You'll both receive the same problem.
          </p>

          {roomCode ? (
            <div className="mb-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                <span className="font-mono text-2xl font-black text-secondary tracking-widest flex-1">{roomCode}</span>
                <button onClick={copyCode} className="p-2 rounded-lg hover:bg-secondary/20 transition-all text-secondary">
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
              <p className="text-xs text-foreground/30 mt-2">Share this code with your opponent to start the battle</p>
            </div>
          ) : null}

          <button
            onClick={generateRoom}
            className="w-full py-3.5 rounded-xl bg-secondary/10 border border-secondary/30 text-secondary font-bold hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2"
          >
            {roomCode ? "Generate New Room" : "Create Battle Room"}
            <ArrowRight size={18} />
          </button>
        </motion.div>

        {/* Join Room Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="p-8 glass rounded-2xl border border-white/8 hover:border-primary/30 transition-all"
        >
          <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
            <Sword size={26} className="text-primary" />
          </div>
          <h2 className="text-xl font-black mb-2">Join a Room</h2>
          <p className="text-foreground/50 text-sm mb-6 leading-relaxed">
            Got a room code? Enter it below to join your opponent's battle room and start coding.
          </p>
          <input
            type="text"
            placeholder="Enter room code (e.g. AB2X9K)"
            maxLength={6}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm font-mono uppercase tracking-widest focus:outline-none focus:border-primary/50 transition-all mb-4 placeholder:normal-case placeholder:tracking-normal"
          />
          <button className="w-full py-3.5 rounded-xl bg-primary/10 border border-primary/30 text-primary font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
            Join Battle
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>

      {/* Coming Soon Notice */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl border border-dashed border-white/10 text-center"
      >
        <Timer size={24} className="text-foreground/30 mx-auto mb-3" />
        <h3 className="font-bold text-foreground/60 mb-1">Real-time WebSocket Engine</h3>
        <p className="text-sm text-foreground/30">
          Live battle sync, countdown timers, and ELO tracking are coming in <strong>Phase 4</strong> of our roadmap. Stay tuned!
        </p>
      </motion.div>
    </div>
  );
}
