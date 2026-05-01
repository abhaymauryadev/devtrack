"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#191919] border-b border-black/10 dark:border-white/8 transition-all duration-200 ${
          scrolled
            ? "shadow-[rgba(0,0,0,0.04)_0px_4px_18px,rgba(0,0,0,0.027)_0px_2.025px_7.85px] dark:shadow-[rgba(0,0,0,0.4)_0px_4px_18px]"
            : ""
        }`}
      >
        <div className="max-w-300 mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[15px] font-bold tracking-tight text-black/95 dark:text-white/90">
                DevTrack
              </span>
            </Link>

            <div className="hidden sm:flex items-center gap-1">
              {/* Theme toggle */}
              <button
                onClick={toggle}
                aria-label="Toggle theme"
                className="flex items-center justify-center size-9 rounded-sm text-black/50 dark:text-white/50 hover:text-black/95 dark:hover:text-white/90 hover:bg-black/5 dark:hover:bg-white/6"
              >
                {mounted ? (
                  theme === "dark" ? (
                    <Sun className="size-4" />
                  ) : (
                    <Moon className="size-4" />
                  )
                ) : (
                  <span className="size-4" />
                )}
              </button>

              <Link
                href="/login"
                className="px-4 py-1.75 text-[15px] font-semibold text-black/60 dark:text-white/50 hover:text-black/95 dark:hover:text-white/90 hover:bg-black/5 dark:hover:bg-white/6 rounded-sm"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="px-4 py-1.75 text-[15px] font-semibold text-white bg-[#0075de] hover:bg-[#005bab] active:scale-95 rounded-sm"
              >
                Get started free
              </Link>
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="sm:hidden flex items-center gap-1">
              <button
                onClick={toggle}
                aria-label="Toggle theme"
                className="flex items-center justify-center size-9 rounded-sm text-black/50 dark:text-white/50 hover:text-black/95 dark:hover:text-white/90 hover:bg-black/5 dark:hover:bg-white/6 transition-colors"
              >
                {mounted ? (
                  theme === "dark" ? (
                    <Sun className="size-4" />
                  ) : (
                    <Moon className="size-4" />
                  )
                ) : (
                  <span className="size-4" />
                )}
              </button>
              <button
                className="flex items-center justify-center size-9 rounded-sm text-black/50 dark:text-white/50 hover:text-black/95 dark:hover:text-white/90 hover:bg-black/5 dark:hover:bg-white/6 transition-colors"
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
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-x-0 top-14 z-40 sm:hidden transition-all duration-200 ${
          mobileOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        <div
          className="mx-4 mt-1 rounded-xl bg-white dark:bg-[#252525] border border-black/10 dark:border-white/8 overflow-hidden"
          style={{ boxShadow: "var(--shadow-deep)" }}
        >
          <div className="p-3 flex flex-col gap-1">
              <Link
                href="/login"
                className="block w-full px-4 py-3 text-[15px] font-semibold text-black/70 dark:text-white/60 hover:text-black/95 dark:hover:text-white/90 rounded-lg hover:bg-black/5 dark:hover:bg-white/6 text-left"
              >
              Log in
              </Link>
              <Link
                href="/signup"
                className="block w-full px-4 py-3 text-[15px] font-semibold text-white bg-[#0075de] hover:bg-[#005bab] rounded-sm text-left"
              >
                Get started free
              </Link>
          </div>
        </div>
      </div>

      <div className="h-14" />
    </>
  );
}
