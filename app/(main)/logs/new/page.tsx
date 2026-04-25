import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Log",
  description: "Create a new session log entry in DevTrack.",
  robots: { index: false, follow: false },
};

export default function NewLogPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">New Log</h1>
      <p className="text-gray-600">Create a new session log here.</p>
    </div>
  );
}
