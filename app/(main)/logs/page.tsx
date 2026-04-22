"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Clock3 } from "lucide-react";

type Session = {
  id: string;
  startTime: string;
  endTime?: string | null;
  duration?: number | null;
};

const fallbackTitles = [
  "Building new features",
  "Learning concepts",
  "Bug fixing",
];

const fallbackTags = [
  ["Python", "DevOps"],
  ["UI/UX", "Node.js"],
  ["DevOps", "React"],
];

function formatDuration(seconds?: number | null) {
  if (!seconds) return "0m";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}

function toCSV(sessions: Session[]) {
  const header = ["id", "startTime", "endTime", "durationSeconds"];
  const rows = sessions.map((session) => [
    session.id,
    session.startTime,
    session.endTime ?? "",
    session.duration ?? "",
  ]);
  return [header, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
}

export default function LogsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    fetch("/api/v1/session")
      .then((res) => res.json())
      .then((data) => setSessions(data));
  }, []);

  const sortedSessions = [...sessions].sort(
    (a, b) =>
      new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
  );

  const handleExportCSV = () => {
    const csv = toCSV(sortedSessions);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "daily-logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-100">
            Daily Logs
          </h1>
          <p className="mt-2 text-base text-zinc-400">
            Review your past coding sessions and notes.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d0d10]">
        {sortedSessions.length === 0 && (
          <div className="px-6 py-10 text-sm text-zinc-400">
            No session logs yet. Start your timer to create one.
          </div>
        )}

        {sortedSessions.map((session, index) => {
          const start = new Date(session.startTime);
          const title = fallbackTitles[index % fallbackTitles.length];
          const tags = fallbackTags[index % fallbackTags.length];

          return (
          <div
            key={session.id}
            className="flex items-center gap-4 border-b border-zinc-800 px-5 py-4 last:border-b-0"
          >
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-zinc-700 bg-zinc-950">
                <span className="text-[11px] font-semibold text-indigo-400">
                  {start
                    .toLocaleString("en-US", { month: "short" })
                    .toUpperCase()}
                </span>
                <span className="text-lg font-semibold text-zinc-100">
                  {String(start.getDate()).padStart(2, "0")}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-xl font-medium text-zinc-100">
                    {start.toLocaleDateString("en-US", { weekday: "long" })}
                  </p>
                  <p className="truncate text-xl text-zinc-100">{title}</p>
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-sm text-zinc-400">
                  <Clock3 className="h-4 w-4" />
                  <span>{formatDuration(session.duration)}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <ChevronRight className="h-5 w-5 shrink-0 text-zinc-500" />
          </div>
          );
        })}
      </div>
    </section>
  );
}