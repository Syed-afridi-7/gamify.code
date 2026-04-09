"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Zap, ArrowRight, ShieldCheck, Globe, Trophy } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative z-10"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 mb-4 glow-primary">
            <Zap size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">
            Welcome to <span className="text-gradient">GamifyCode</span>
          </h1>
          <p className="text-foreground/50 text-sm">
            The arena where elite coders are born.
          </p>
        </div>

        {/* Auth Buttons */}
        <div className="space-y-4 mb-8">
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full group flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white text-black font-bold text-base transition-all hover:scale-[1.02] active:scale-95"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Continue with Google
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform ml-auto" />
          </button>
        </div>

        {/* Trust Markers */}
        <div className="grid grid-cols-3 gap-2 py-6 border-t border-white/5">
          <div className="flex flex-col items-center gap-1 text-center">
            <ShieldCheck size={18} className="text-primary/60" />
            <span className="text-[10px] uppercase font-bold text-foreground/40">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center border-x border-white/5">
            <Globe size={18} className="text-secondary/60" />
            <span className="text-[10px] uppercase font-bold text-foreground/40">Global</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <Trophy size={18} className="text-accent/60" />
            <span className="text-[10px] uppercase font-bold text-foreground/40">Arena</span>
          </div>
        </div>

        <p className="text-center text-[10px] text-foreground/30 mt-6 leading-relaxed">
          By continuing, you agree to our Terms of Service<br />and Privacy Policy.
        </p>

        <div className="mt-8 text-center text-sm">
          <Link href="/" className="text-foreground/40 hover:text-primary transition-colors">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
