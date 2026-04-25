import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tracker",
  description: "Start a focused coding session with DevTrack's Pomodoro timer. Track time and build productive habits.",
  robots: { index: false, follow: false },
};

export default function TrackerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
