import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Session Logs",
  description: "Browse all your past coding sessions, durations, and activity history in DevTrack.",
  robots: { index: false, follow: false },
};

export default function LogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
