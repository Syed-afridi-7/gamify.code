"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { LogIn, LogOut, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-all glow-primary"
      >
        <LogIn size={16} />
        Sign In
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-3 py-2 rounded-xl border border-white/10 hover:border-primary/30 bg-white/5 hover:bg-white/8 transition-all"
      >
        {session.user?.image ? (
          <img src={session.user.image} alt="" className="w-7 h-7 rounded-full ring-2 ring-primary/30" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
            <User size={14} className="text-primary" />
          </div>
        )}
        <span className="text-sm font-medium hidden sm:block max-w-[120px] truncate">
          {session.user?.name?.split(" ")[0]}
        </span>
        <ChevronDown size={14} className={cn("text-foreground/40 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 glass rounded-xl border border-white/10 shadow-xl overflow-hidden z-50">
          <div className="p-3 border-b border-white/5">
            <p className="text-sm font-semibold truncate">{session.user?.name}</p>
            <p className="text-xs text-foreground/40 truncate">{session.user?.email}</p>
          </div>
          <div className="p-2">
            <button
              onClick={() => { signOut(); setOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-danger hover:bg-danger/10 transition-all font-medium"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
