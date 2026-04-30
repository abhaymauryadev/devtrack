"use client";

import { TimerProvider } from "@/context/TimerContext";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/ThemeContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <TimerProvider>{children}</TimerProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
