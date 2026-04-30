"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Clock3, FileText } from "lucide-react";

type Session = {
  id: string;
  startTime: string;
  endTime?: string | null;
  duration?: number | null;
  tags: string[];
  note?: string | null;
};

function formatDuration(seconds?: number | null) {
  if (!seconds) return "0m";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}

function toCSV(sessions: Session[]) {
  const header = ["id", "startTime", "endTime", "durationSeconds", "tags", "note"];
  const rows = sessions.map((s) => [
    s.id,
    s.startTime,
    s.endTime ?? "",
    s.duration ?? "",
    (s.tags ?? []).join(";"),
    s.note ?? "",
  ]);
  return [header, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
}

export default function LogsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

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
          <h1 className="text-4xl font-bold tracking-tight text-black/95">
            Daily Logs
          </h1>
          <p className="mt-2 text-base text-[#615d59]">
            Review your past coding sessions and notes.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="rounded-sm bg-[#0075de] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#005bab]"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white" style={{ boxShadow: "var(--shadow-card)" }}>
        {sortedSessions.length === 0 && (
          <div className="px-6 py-10 text-sm text-[#615d59]">
            No session logs yet. Start your timer to create one.
          </div>
        )}

        {sortedSessions.map((session) => {
          const start = new Date(session.startTime);
          const isOpen = expanded === session.id;
          const hasTags = session.tags && session.tags.length > 0;
          const hasNote = !!session.note;

          return (
            <div key={session.id} className="border-b border-black/10 last:border-b-0">
              <button
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
                onClick={() => setExpanded(isOpen ? null : session.id)}
              >
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-black/10 bg-[#f6f5f4]">
                  <span className="text-[11px] font-semibold text-[#097fe8]">
                    {start.toLocaleString("en-US", { month: "short" }).toUpperCase()}
                  </span>
                  <span className="text-lg font-semibold text-black/95">
                    {String(start.getDate()).padStart(2, "0")}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-xl font-semibold text-black/95">
                      {start.toLocaleDateString("en-US", { weekday: "long" })}
                    </p>
                    <p className="truncate text-sm text-[#615d59]">
                      {start.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  <div className="mt-1 flex items-center gap-3 text-sm text-[#615d59]">
                    <span className="flex items-center gap-1.5">
                      <Clock3 className="h-4 w-4" />
                      {formatDuration(session.duration)}
                    </span>
                    {hasNote && (
                      <span className="flex items-center gap-1 text-[#097fe8]">
                        <FileText className="h-3.5 w-3.5" />
                        <span className="text-xs">Note</span>
                      </span>
                    )}
                  </div>

                  {hasTags && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {session.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-black/10 bg-[#f2f9ff] px-2.5 py-0.5 text-xs text-[#097fe8]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {!hasTags && (
                    <p className="mt-2 text-xs text-[#a39e98] italic">No tags — add them from the timer screen.</p>
                  )}
                </div>

                <ChevronRight
                  className={`h-5 w-5 shrink-0 text-[#615d59] transition-transform ${isOpen ? "rotate-90" : ""}`}
                />
              </button>

              {/* Expanded note */}
              {isOpen && hasNote && (
                <div className="border-t border-black/10 px-5 pb-4 pt-3">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#615d59]">Session Note</p>
                  <p className="whitespace-pre-wrap text-sm text-black/95">{session.note}</p>
                </div>
              )}
              {isOpen && !hasNote && (
                <div className="border-t border-black/10 px-5 pb-4 pt-3">
                  <p className="text-xs text-[#a39e98] italic">No note for this session.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
