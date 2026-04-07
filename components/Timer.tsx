"use client";

import { useTimer } from "@/hooks/useTimer";
import { useState } from "react";
import Streak from "./Streak";

const MODES = {
  FOCUS: 25 * 60,
  SHORT_BREAK: 5 * 60,
  LONG_BREAK: 10 * 60,
};

export default function Timer() {
  const { time, setTime, start, stop, running } = useTimer(); 
  const [mode, setMode] = useState<"FOCUS" | "SHORT_BREAK" | "LONG_BREAK">("FOCUS");

  return (
    <>
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen ">

      {/* Mode selection */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            setMode("FOCUS");
            setTime(MODES.FOCUS);
          }}
          className="bg-blue-500 px-3 py-1 text-white"
        >
          Focus
        </button>

        <button
          onClick={() => {
            setMode("SHORT_BREAK");
            setTime(MODES.SHORT_BREAK);
          }}
          className="bg-purple-500 px-3 py-1 text-white"
        >
           Break
        </button>

        <button
          onClick={() => {
            setMode("LONG_BREAK");
            setTime(MODES.LONG_BREAK);
          }}
          className="bg-yellow-500 px-3 py-1 text-white"
        >
         Long Break
        </button>
      </div>

      {/* Timer Display */}
      <div className="text-4xl font-bold">
        {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
      </div>

      {/* Start / Stop */}
      {!running ? (
        <button onClick={start} className="bg-green-500 px-4 py-2 text-white">
          Start
        </button>
      ) : (
        <button onClick={stop} className="bg-red-500 px-4 py-2 text-white">
          Stop
        </button>
      )}   
      <div>
        <Streak/>
      </div>   
    </div>
    </>  
  );
}