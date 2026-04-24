"use client";

import { useEffect, useState } from "react";

const themes: any = {
  focus: "from-purple-700 via-pink-600 to-orange-500",
  break: "from-green-700 via-teal-600 to-blue-500",
  deep: "from-slate-900 via-black to-slate-800",
};

export default function TimerPreview({
  minutes,
  seconds,
  theme,
}: any) {
  const [time, setTime] = useState(minutes * 60);
  const [running, setRunning] = useState(false);

  // Sync when minutes change
  useEffect(() => {
    setTime(minutes * 60);
  }, [minutes]);

  // Timer logic
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime((prev: number) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const mins = Math.floor(time / 60);
  const secs = time % 60;

  return (
    <div className="relative h-full flex items-center justify-center overflow-hidden">

      {/* 🔥 Background */}
      <div className={`absolute inset-0 bg-linear-to-br ${themes[theme]}`} />

      {/* Glow */}
      <div className="absolute w-125 h-125 bg-white/10 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-7xl font-bold">
          {String(mins).padStart(2, "0")}:
          {String(secs).padStart(2, "0")}
        </h1>

        {/* Controls */}
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={() => setRunning(true)}
            className="px-6 py-2 bg-green-500 rounded-lg"
          >
            Start
          </button>

          <button
            onClick={() => setRunning(false)}
            className="px-6 py-2 bg-red-500 rounded-lg"
          >
            Stop
          </button>

          <button
            onClick={() => {
              setTime(minutes * 60);
              setRunning(false);
            }}
            className="px-6 py-2 bg-slate-700 rounded-lg"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}