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

export type TimerMode = "FOCUS" | "SHORT_BREAK" | "LONG_BREAK";

export const DURATIONS: Record<TimerMode, number> = {
  FOCUS: 25 * 60,
  SHORT_BREAK: 5 * 60,
  LONG_BREAK: 12 * 60,
};

interface TimerContextValue {
  time: number;
  setTime: (t: number) => void;
  running: boolean;
  sessionId: string | null;
  mode: TimerMode;
  setMode: (m: TimerMode) => void;
  completedPomodoros: number;
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
  const [mode, setModeState] = useState<TimerMode>(
    saved.current?.mode ?? "FOCUS",
  );
  const [completedPomodoros, setCompletedPomodoros] = useState<number>(
    saved.current?.completedPomodoros ?? 0,
  );
  const [time, setTimeState] = useState<number>(
    saved.current?.time ?? DURATIONS.FOCUS,
  );

  useEffect(() => {
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({ sessionId, running, time, mode, completedPomodoros }),
    );
  }, [sessionId, running, time, mode, completedPomodoros]);

  // Countdown — survives navigation
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTimeState((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  // React to timer reaching 0
  useEffect(() => {
    if (time !== 0 || !running) return;

    const handleComplete = async () => {
      if (sessionId) {
        await stopSession(sessionId);
        setSessionId(null);
      }
      setRunning(false);

      if (mode === "FOCUS") {
        const next = completedPomodoros + 1;
        if (next >= 4) {
          setCompletedPomodoros(0);
          setModeState("LONG_BREAK");
          setTimeState(DURATIONS.LONG_BREAK);
        } else {
          setCompletedPomodoros(next);
          setModeState("SHORT_BREAK");
          setTimeState(DURATIONS.SHORT_BREAK);
        }
      } else {
        setModeState("FOCUS");
        setTimeState(DURATIONS.FOCUS);
      }
    };

    handleComplete();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, running]);

  const setTime = useCallback((t: number) => setTimeState(t), []);

  const setMode = useCallback((m: TimerMode) => {
    setModeState(m);
    setTimeState(DURATIONS[m]);
  }, []);

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
    setTimeState(DURATIONS[mode]);
  }, [sessionId, mode]);

  return (
    <TimerContext.Provider
      value={{
        time,
        setTime,
        running,
        sessionId,
        mode,
        setMode,
        completedPomodoros,
        start,
        stop,
        reset,
      }}
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
