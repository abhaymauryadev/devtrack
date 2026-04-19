"use client";

import TimerControls from "@/components/TimerControls";
import TimerPreview from "@/components/TimerPreview";
import { useState } from "react";



export default function PreviewTrackerPage() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [theme, setTheme] = useState("focus");

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      {/* LEFT: Controls */}
      <div className="w-full md:w-1/3 p-6 bg-slate-900 border-r border-slate-800">
        <TimerControls
          minutes={minutes}
          setMinutes={setMinutes}
          setTheme={setTheme}
        />
      </div>

      {/* RIGHT: Live Preview */}
      <div className="flex-1">
        <TimerPreview
          minutes={minutes}
          seconds={seconds}
          theme={theme}
        />
      </div>

    </div>
  );
}