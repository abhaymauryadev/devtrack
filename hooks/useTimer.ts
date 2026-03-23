import { useState } from "react";
import { startSession, stopSession } from "@/services/tracker.services";

export const useTimer = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  const start = async () => {
    const data = await startSession();
    setSessionId(data.id);
    setRunning(true);
  };

  const stop = async () => {
    if (!sessionId) return;
    await stopSession(sessionId);
    setRunning(false);
    setSessionId(null);
  };

  return { start, stop, running };
};