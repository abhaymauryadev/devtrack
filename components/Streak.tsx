"use client";

import { useEffect, useState } from "react";
import { calculateStreak } from "../hooks/streak";
import { Maximize, Minimize } from "lucide-react";

export default function Streak() {
  const [streak, setStreak] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      const res = await fetch("/api/v1/tracker");
      const data = await res.json();

      const streakCount = calculateStreak(data);
      setStreak(streakCount);
    };

    fetchSessions();
  }, []);

  return (
    <>
      <section className="flex justify-center items-center">
        <div className="bg-black text-white p-6 rounded-xl text-center">
          <h2 className="text-xl font-semibold">🔥 {streak}</h2>
        </div>

        <div>
          {!isFullscreen ? (
            <button
              onClick={() => {
                document.documentElement.requestFullscreen();
                setIsFullscreen(true);
              }}
              className="border px-4 py-2"
            >
              <Maximize />
            </button>
          ) : (
            <button
              onClick={() => {
                document.exitFullscreen();
                setIsFullscreen(false);
              }}
              className="border px-4 py-2"
            >
              <Minimize />
            </button>
          )}
        </div>
      </section>
    </>
  );
}
