import { useEffect, useState } from "react";
import { startSession, stopSession } from "@/services/tracker.services";

export const useTimer = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(1500);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (running && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running, time]);

  // Start session
  const start = async () => {
    const data = await startSession();
    setSessionId(data.id);
    setRunning(true);
  };

  // Stop session
  const stop = async () => {
    if (!sessionId) return;
    await stopSession(sessionId);
    setRunning(false);
    setSessionId(null);
  };

  //  Reset (fixed)
  const reset = async () => {
    if (sessionId) {
      await stopSession(sessionId); // stop backend session
    }

    setRunning(false);
    setSessionId(null);
    setTime(1500); // you can override from UI later
  };

  //  RETURN reset
  return { time, setTime, start, stop, reset, running };
};