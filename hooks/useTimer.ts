import { useEffect, useState } from "react";
import { startSession, stopSession } from "@/services/tracker.services";

export const useTimer = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(1500); // 25 min default

  //  Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (running && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running, time]);

  // Start session + timer
  const start = async () => {
    const data = await startSession();
    setSessionId(data.id);
    setRunning(true);
  };

  // Stop session + timer
  const stop = async () => {
    if (!sessionId) return;
    await stopSession(sessionId);
    setRunning(false);
    setSessionId(null);
  };

  return { time, setTime, start, stop, running };
};