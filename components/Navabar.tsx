"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Shrink/blur navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#171717]/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="">
                <Image
                  src="/icons/favicon.svg"
                  alt="DevTrack Logo"
                  width={20}
                  height={20}
                />
              </div>

              <span className="font-semibold text-white tracking-tight">
                DevTrack
              </span>
            </Link>

            {/* ── Desktop Actions ── */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => router.push("/login")}
                className="relative px-5 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                Log in
              </button>

              <button
                onClick={() => router.push("/signup")}
                className="relative px-5 py-2 text-sm font-medium text-white rounded-lg bg-[#6C3FF5] hover:bg-[#5a30d4] transition-all duration-200 shadow-md shadow-[#6C3FF5]/30 hover:shadow-[#6C3FF5]/50 hover:-translate-y-px active:translate-y-0"
              >
                Get started
                <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10" />
              </button>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className="sm:hidden flex items-center justify-center size-9 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div
        className={`fixed inset-x-0 top-16 z-40 sm:hidden transition-all duration-300 ease-in-out ${
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="mx-4 mt-1 rounded-xl bg-[#1e1e1e] border border-white/10 shadow-xl shadow-black/40 overflow-hidden">
          <div className="p-3 flex flex-col gap-2">
            <button
              onClick={() => router.push("/login")}
              className="w-full px-4 py-3 text-sm font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors text-left"
            >
              Log in
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-[#6C3FF5] hover:bg-[#5a30d4] transition-colors text-left"
            >
              Get started →
            </button>
          </div>
        </div>
      </div>

      {/* Spacer so content doesn't hide under fixed navbar */}
      <div className="h-16" />
    </>
  );
}
