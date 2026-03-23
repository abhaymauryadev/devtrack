"use client";

import { useTimer } from "@/hooks/useTimer";

export default function TrackerPage() {
  const { start, stop, running } = useTimer();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold">Tracker</h1>

      {!running ? (
        <button
          onClick={start}
          className="px-6 py-3 bg-green-500 text-white rounded-xl"
        >
          Start Session
        </button>
      ) : (
        <button
          onClick={stop}
          className="px-6 py-3 bg-red-500 text-white rounded-xl"
        >
          Stop Session
        </button>
      )}
    </div>
  );
}