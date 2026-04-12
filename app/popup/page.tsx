"use client";

import { useTimer } from "@/hooks/useTimer";

export default function PopupPage() {
  const { time, start, stop, running } = useTimer();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white gap-6">
      
      <h2 className="text-xl">Focus Mode</h2>

      <div className="text-5xl font-bold">
        {Math.floor(time / 60)}:
        {String(time % 60).padStart(2, "0")}
      </div>

      {!running ? (
        <button
          onClick={start}
          className="bg-green-500 px-6 py-2 rounded"
        >
          Start
        </button>
      ) : (
        <button
          onClick={stop}
          className="bg-red-500 px-6 py-2 rounded"
        >
          Stop
        </button>
      )}

      {/* 🔥 Back to main app */}
      {/* <button
        onClick={() => window.location.href = "/tracker"}
        className="text-sm underline"
      >
        Back to App
      </button> */}
    </div>
  );
}