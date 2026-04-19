"use client";

import { useEffect, useState } from "react";

export default function LogsPage() {
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/v1/session")
      .then((res) => res.json())
      .then((data) => setSessions(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Session Logs</h1>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="p-4 border rounded-lg shadow-sm"
          >
            <p>
              <strong>Start:</strong>{" "}
              {new Date(session.startTime).toLocaleString()}
            </p>

            <p>
              <strong>End:</strong>{" "}
              {session.endTime
                ? new Date(session.endTime).toLocaleString()
                : "Running"}
            </p>

            <p>
              <strong>Duration:</strong>{" "}
              {session.duration ? `${session.duration}s` : "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}