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

const MODES = {
  FOCUS: 25 * 60,
  SHORT_BREAK: 5 * 60,
  LONG_BREAK: 10 * 60,
};

export default function Timer() {
  const { time, setTime, start, stop, reset, running } = useTimer();
  const router = useRouter();

  const [mode, setMode] = useState<"FOCUS" | "SHORT_BREAK" | "LONG_BREAK">(
    "FOCUS"
  );
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWallpaper, setShowWallpaper] = useState(false);

  const { selected } = useWallpaperStore();
  const bgStyle = buildBackground(selected);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleReset = () => {
    reset();
    if (mode === "FOCUS") setTime(MODES.FOCUS);
    if (mode === "SHORT_BREAK") setTime(MODES.SHORT_BREAK);
    if (mode === "LONG_BREAK") setTime(MODES.LONG_BREAK);
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

  return (
    <>
      <div
        className="relative flex flex-col gap-4 justify-center items-center min-h-screen text-white"
        style={bgStyle}
      >
        {/* dark overlay for photo wallpapers */}
        {selected.type === "image" && (
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        )}

        {/* wallpaper toggle — top-right corner */}
        <button
          onClick={() => setShowWallpaper(true)}
          title="Change wallpaper"
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ImageIcon size={20} />
        </button>

        {/* content sits above overlay */}
        <div className="relative z-10 flex flex-col gap-4 justify-center items-center">
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

          {/* Timer */}
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
