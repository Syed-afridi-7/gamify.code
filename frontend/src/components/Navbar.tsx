"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2, Sword, Zap, LayoutDashboard } from "lucide-react";
import UserMenu from "@/components/UserMenu";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/dashboard", label: "Practice", icon: LayoutDashboard },
  { href: "/arena", label: "Clash Arena", icon: Sword },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:glow-primary transition-all">
            <Zap size={16} className="text-primary" />
          </div>
          <span className="font-black text-lg tracking-tight">
            gamify<span className="text-gradient">code</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
}
