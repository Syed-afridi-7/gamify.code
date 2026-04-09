import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GamifyCode — Competitive DSA Arena",
  description: "Master DSA through gamified practice, 1v1 battles, and AI mentorship. The arena where coders level up.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen antialiased">
        <Providers>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
