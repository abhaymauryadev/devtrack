"use client";

import { useEffect, useState } from "react";
import { calculateStreak } from "../hooks/streak";


export default function Streak() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchSessions = async () => {
      const res = await fetch("/api/v1/streak");
      const data = await res.json();

      const streakCount = calculateStreak(data);
      setStreak(streakCount);
    };

    fetchSessions();
  }, []);

  return (
    <>
      <section className="flex justify-center items-center">
        <div className=" text-white rounded-xl text-center">
          <h2 className="text-xl font-semibold">🔥 {streak}</h2>
        </div>

      
      </section>
    </>
  );
}
