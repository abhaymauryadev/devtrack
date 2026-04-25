import type { TimerMode } from "@/context/TimerContext";

// Matches the Prisma Session model exactly
export interface Session {
  id: string;
  startTime: Date;
  endTime: Date | null;
  duration: number | null; // seconds
  createdAt: Date;
}

// A session that has been completed (endTime and duration are guaranteed)
export interface CompletedSession extends Session {
  endTime: Date;
  duration: number;
}

// Shape returned by POST /api/v1/tracker (startSession)
export interface StartSessionResponse {
  id: string;
  startTime: Date;
  createdAt: Date;
}

// Shape returned by PUT /api/v1/tracker (stopSession)
export type StopSessionResponse = CompletedSession;

// Aggregated stats used on the dashboard / logs pages
export interface SessionStats {
  totalSessions: number;
  totalFocusTime: number; // seconds
  longestSession: number; // seconds
  averageDuration: number; // seconds
}

// Timer state persisted to localStorage
export interface TimerStorageState {
  sessionId: string | null;
  running: boolean;
  time: number; // seconds remaining
  mode: TimerMode;
  completedPomodoros: number;
}
