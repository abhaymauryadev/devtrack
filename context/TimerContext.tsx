"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { startSession, stopSession } from "@/services/tracker.services";

interface TimerContextValue {
  time: number;
  setTime: (t: number) => void;
  running: boolean;
  sessionId: string | null;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  reset: () => Promise<void>;
}

const TimerContext = createContext<TimerContextValue | null>(null);

const LS_KEY = "devtrack-timer";

function loadFromStorage() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const saved = useRef(loadFromStorage());

  const [sessionId, setSessionId] = useState<string | null>(
    saved.current?.sessionId ?? null,
  );
  const [running, setRunning] = useState<boolean>(
    saved.current?.running ?? false,
  );
  const [time, setTimeState] = useState<number>(
    saved.current?.time ?? 1500,
  );

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ sessionId, running, time }));
  }, [sessionId, running, time]);

  // Countdown interval — lives at the app level, survives navigation
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTimeState((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Auto-complete session when timer hits 0
          if (sessionId) {
            stopSession(sessionId).then(() => {
              setRunning(false);
              setSessionId(null);
            });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, sessionId]);

  const setTime = useCallback((t: number) => setTimeState(t), []);

  const start = useCallback(async () => {
    const data = await startSession();
    setSessionId(data.id);
    setRunning(true);
  }, []);

  const stop = useCallback(async () => {
    if (!sessionId) return;
    await stopSession(sessionId);
    setRunning(false);
    setSessionId(null);
  }, [sessionId]);

  const reset = useCallback(async () => {
    if (sessionId) await stopSession(sessionId);
    setRunning(false);
    setSessionId(null);
    setTimeState(1500);
  }, [sessionId]);

  return (
    <TimerContext.Provider
      value={{ time, setTime, running, sessionId, start, stop, reset }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimerContext() {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error("useTimerContext must be used inside TimerProvider");
  return ctx;
}
