"use client";

import { useTimer } from "@/hooks/useTimer";
import { useEffect, useState } from "react";
import { useWallpaperStore, buildBackground } from "@/store/wallpaperStore";
import { DURATIONS, TimerMode } from "@/context/TimerContext";
import { X } from "lucide-react";

const MODE_COLOR: Record<TimerMode, string> = {
  FOCUS: "#6366F1",
  SHORT_BREAK: "#A855F7",
  LONG_BREAK: "#F59E0B",
};

const MODE_LABEL: Record<TimerMode, string> = {
  FOCUS: "Focus",
  SHORT_BREAK: "Short Break",
  LONG_BREAK: "Long Break",
};

const RADIUS = 88;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function PopupPage() {
  const { time, start, stop, running, mode, completedPomodoros } = useTimer();
  const { selected } = useWallpaperStore();
  const [mounted, setMounted] = useState(false);

  const bgStyle = buildBackground(selected);
  const total = DURATIONS[mode];
  const progress = total > 0 ? time / total : 0;
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const color = MODE_COLOR[mode];

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const m = Math.floor(time / 60);
    const s = String(time % 60).padStart(2, "0");
    const status = running ? "🔥" : "⏸";
    document.title = `${status} ${m}:${s} · ${MODE_LABEL[mode]}`;
    return () => { document.title = "DevTrack"; };
  }, [time, running, mode]);

  if (!mounted) return null;

  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen text-white select-none overflow-hidden"
      style={bgStyle}
    >
      {/* Wallpaper overlay */}
      {selected.type === "image" && (
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
      )}

      {/* Close button */}
      <button
        onClick={() => window.close()}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        title="Close popup"
      >
        <X size={14} />
      </button>

      {/* Mode label */}
      <p
        className="relative z-10 text-xs font-semibold tracking-widest uppercase mb-4 opacity-80"
        style={{ color }}
      >
        {MODE_LABEL[mode]}
      </p>

      {/* Progress ring + timer */}
      <div className="relative z-10 flex items-center justify-center">
        <svg width="210" height="210" className="-rotate-90">
          {/* Track */}
          <circle
            cx="105"
            cy="105"
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="6"
          />
          {/* Progress arc */}
          <circle
            cx="105"
            cy="105"
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 0.9s linear" }}
          />
        </svg>

        {/* Timer digits */}
        <div className="absolute flex flex-col items-center gap-1">
          <span className="text-4xl font-bold tabular-nums tracking-tight">
            {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
          </span>
          {/* Pomodoro dots */}
          <div className="flex gap-1.5 mt-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full border border-white/50 transition-colors"
                style={{
                  background: i < completedPomodoros ? "white" : "transparent",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Control button */}
      <div className="relative z-10 mt-5">
        {!running ? (
          <button
            onClick={start}
            className="px-8 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: color }}
          >
            Start
          </button>
        ) : (
          <button
            onClick={stop}
            className="px-8 py-2 rounded-full text-sm font-semibold text-white/80 bg-white/10 hover:bg-white/20 transition-all active:scale-95"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
}
