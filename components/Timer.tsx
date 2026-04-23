"use client";

import { useTimer } from "@/hooks/useTimer";
import { useState, useEffect } from "react";
import Streak from "./Streak";
import { useRouter } from "next/navigation";
import {
  PictureInPicture2,
  TimerReset,
  Maximize,
  Minimize,
  LayoutDashboard,
  ImageIcon,
} from "lucide-react";
import { useWallpaperStore, buildBackground } from "@/store/wallpaperStore";
import WallpaperSelector from "./WallpaperSelector";
import { DURATIONS, TimerMode } from "@/context/TimerContext";

export default function Timer() {
  const { time, setTime, start, stop, reset, running, mode, setMode, completedPomodoros } =
    useTimer();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWallpaper, setShowWallpaper] = useState(false);
  const [breakBanner, setBreakBanner] = useState<string | null>(null);

  const { selected } = useWallpaperStore();
  const bgStyle = buildBackground(selected);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a banner when mode changes to a break
  useEffect(() => {
    if (mode === "LONG_BREAK") {
      setBreakBanner("Great work! Time for a long break (12 min).");
    } else if (mode === "SHORT_BREAK") {
      setBreakBanner("Session done! Take a short break (5 min).");
    } else {
      setBreakBanner(null);
    }
  }, [mode]);

  if (!mounted) return null;

  const handleReset = () => {
    reset();
    setTime(DURATIONS[mode]);
  };

  const handleSetMode = (m: TimerMode) => {
    setMode(m);
  };

  const openPopup = () => {
    window.open(
      "/popup",
      "TimerPopup",
      "width=400,height=300,top=200,left=800"
    );
    setHidden(true);
  };

  if (hidden) return <div />;

  const modeLabel: Record<TimerMode, string> = {
    FOCUS: "Focus",
    SHORT_BREAK: "Break",
    LONG_BREAK: "Long Break",
  };

  return (
    <>
      <div
        className="relative flex flex-col gap-4 justify-center items-center min-h-screen text-white"
        style={bgStyle}
      >
        {selected.type === "image" && (
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        )}

        <button
          onClick={() => setShowWallpaper(true)}
          title="Change wallpaper"
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ImageIcon size={20} />
        </button>

        <div className="relative z-10 flex flex-col gap-4 justify-center items-center">
          {/* Mode selection */}
          <div className="flex gap-2">
            {(["FOCUS", "SHORT_BREAK", "LONG_BREAK"] as TimerMode[]).map((m) => (
              <button
                key={m}
                onClick={() => handleSetMode(m)}
                className={`px-3 py-1 text-white transition-opacity ${
                  m === "FOCUS"
                    ? "bg-blue-500"
                    : m === "SHORT_BREAK"
                    ? "bg-purple-500"
                    : "bg-yellow-500"
                } ${mode === m ? "opacity-100 ring-2 ring-white/60" : "opacity-60"}`}
              >
                {modeLabel[m]}
              </button>
            ))}
          </div>

          {/* Pomodoro progress dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full border-2 border-white transition-colors ${
                  i < completedPomodoros ? "bg-white" : "bg-transparent"
                }`}
                title={`Pomodoro ${i + 1}`}
              />
            ))}
            <span className="text-xs text-white/70 ml-1">
              {completedPomodoros}/4
            </span>
          </div>

          {/* Break banner */}
          {breakBanner && (
            <div className="px-4 py-2 rounded-lg bg-yellow-500/80 text-white text-sm font-medium text-center max-w-xs">
              {breakBanner}
            </div>
          )}

          {/* Timer display */}
          <div className="text-4xl font-bold lg:text-9xl md:text-7xl sm:text-5xl">
            {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
          </div>

          <div className="flex justify-center items-center gap-3">
            {!running ? (
              <button
                onClick={start}
                className="bg-purple-500 px-4 py-2 text-white cursor-pointer"
              >
                Start
              </button>
            ) : (
              <button
                onClick={stop}
                className="bg-purple-900 px-4 py-2 text-white cursor-pointer"
              >
                Stop
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-4 py-2 text-white cursor-pointer"
            >
              <TimerReset />
            </button>

            <button
              onClick={openPopup}
              className="px-4 py-2 text-white rounded cursor-pointer"
            >
              <PictureInPicture2 />
            </button>
          </div>

          <div className="flex justify-center items-center gap-3">
            <Streak />
            {!isFullscreen ? (
              <button
                onClick={() => {
                  document.documentElement.requestFullscreen();
                  setIsFullscreen(true);
                }}
                className="border px-4 py-2 cursor-pointer"
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

            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 text-white rounded"
            >
              <LayoutDashboard />
            </button>
          </div>
        </div>
      </div>

      {showWallpaper && (
        <WallpaperSelector onClose={() => setShowWallpaper(false)} />
      )}
    </>
  );
}
