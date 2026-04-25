import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Visualize your coding activity trends, session durations, and productivity patterns in DevTrack.",
  robots: { index: false, follow: false },
};

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
