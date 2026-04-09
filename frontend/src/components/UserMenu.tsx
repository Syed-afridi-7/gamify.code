"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { User, LogIn, LogOut, ShieldCheck } from "lucide-react";

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-bold hover:scale-105 transition-all shadow-lg shadow-primary/20"
      >
        <LogIn size={18} />
        Join Arena
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4 p-2 pl-4 rounded-2xl bg-foreground/5 border border-foreground/10">
      <div className="flex flex-col items-end">
        <span className="text-sm font-black tracking-tight">{session.user?.name}</span>
        <span className="text-[10px] text-primary font-bold uppercase tracking-widest flex items-center gap-1">
          <ShieldCheck size={10} />
          PRO PLAYER
        </span>
      </div>
      <motion.div 
        whileHover={{ scale: 1.1 }}
        className="relative group cursor-pointer"
      >
        <img 
          src={session.user?.image || ""} 
          alt="Avatar" 
          className="w-10 h-10 rounded-xl border-2 border-primary/20 group-hover:border-primary transition-all"
        />
        <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
        
        {/* Dropdown Placeholder */}
        <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-foreground/10 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all transform scale-95 group-hover:scale-100 p-2 z-50">
           <button 
             onClick={() => signOut()}
             className="w-full flex items-center gap-2 p-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-all font-bold text-sm"
           >
             <LogOut size={16} />
             Leave Arena
           </button>
        </div>
      </motion.div>
    </div>
  );
}
