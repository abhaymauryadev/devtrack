"use client";

import { useTimer } from "@/hooks/useTimer";

export default function Timer() {
  const { start, stop, running } = useTimer();

  return (
    <div className="flex gap-4">
      {!running ? (
        <button onClick={start} className="bg-green-500 px-4 py-2 text-white">
          Start
        </button>
      ) : (
        <button onClick={stop} className="bg-red-500 px-4 py-2 text-white">
          Stop
        </button>
      )}
    </div>
  );
}