"use client";

import { useTimer } from "@/hooks/useTimer";
import { useState, useEffect, useRef } from "react";
import Streak from "./Streak";
import { useRouter } from "next/navigation";
import {
  PictureInPicture2,
  TimerReset,
  Maximize,
  Minimize,
  LayoutDashboard,
  ImageIcon,
  Tag,
  X,
  Check,
} from "lucide-react";
import { useWallpaperStore, buildBackground } from "@/store/wallpaperStore";
import WallpaperSelector from "./WallpaperSelector";
import { DURATIONS, TimerMode } from "@/context/TimerContext";
import QuoteDisplay from "./QuoteDisplay";
import { updateSessionMeta } from "@/services/tracker.services";

const SUGGESTED_TAGS = [
  "React", "Node.js", "Python", "DevOps", "UI/UX", "DSA",
  "TypeScript", "CSS", "API", "Database", "Testing", "Debugging",
];

export default function Timer() {
  const { time, setTime, start, stop, reset, running, mode, setMode, completedPomodoros, sessionId } =
    useTimer();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWallpaper, setShowWallpaper] = useState(false);
  const [breakBanner, setBreakBanner] = useState<string | null>(null);

  const [showTagPanel, setShowTagPanel] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const tagInputRef = useRef<HTMLInputElement>(null);

  const { selected } = useWallpaperStore();
  const bgStyle = buildBackground(selected);

  useEffect(() => { setMounted(true); }, []);

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

  const handleSetMode = (m: TimerMode) => setMode(m);

  const openPopup = () => {
    window.open("/popup", "TimerPopup", "width=400,height=300,top=200,left=800");
    setHidden(true);
  };

  if (hidden) return <div />;

  const addTag = (raw: string) => {
    const t = raw.trim();
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput("");
  };

  const removeTag = (t: string) => setTags((prev) => prev.filter((x) => x !== t));

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const handleSaveMeta = async () => {
    if (!sessionId) return;
    setSaving(true);
    await updateSessionMeta(sessionId, tags, note);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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

        <QuoteDisplay />

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
            <button onClick={handleReset} className="px-4 py-2 text-white cursor-pointer">
              <TimerReset />
            </button>
            <button onClick={openPopup} className="px-4 py-2 text-white rounded cursor-pointer">
              <PictureInPicture2 />
            </button>
            <button
              onClick={() => { setShowTagPanel((v) => !v); setTimeout(() => tagInputRef.current?.focus(), 100); }}
              title="Add tags & note"
              className={`px-4 py-2 rounded cursor-pointer transition-colors ${showTagPanel ? "bg-indigo-500 text-white" : "text-white hover:bg-white/10"}`}
            >
              <Tag size={20} />
            </button>
          </div>

          <div className="flex justify-center items-center gap-3">
            <Streak />
            {!isFullscreen ? (
              <button
                onClick={() => { document.documentElement.requestFullscreen(); setIsFullscreen(true); }}
                className="border px-4 py-2 cursor-pointer"
              >
                <Maximize />
              </button>
            ) : (
              <button
                onClick={() => { document.exitFullscreen(); setIsFullscreen(false); }}
                className="border px-4 py-2"
              >
                <Minimize />
              </button>
            )}
            <button onClick={() => router.push("/dashboard")} className="px-4 py-2 text-white rounded">
              <LayoutDashboard />
            </button>
          </div>

          {/* Tags & Note Panel */}
          {showTagPanel && (
            <div className="w-full max-w-md rounded-2xl border border-white/20 bg-black/50 backdrop-blur-sm p-5 mt-2">
              <p className="text-sm font-semibold text-white/80 mb-3">Tags & Note</p>

              {/* Tag chips */}
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1 rounded-full bg-indigo-500/80 px-2.5 py-0.5 text-xs text-white"
                  >
                    {t}
                    <button onClick={() => removeTag(t)} className="opacity-70 hover:opacity-100">
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>

              {/* Tag input */}
              <input
                ref={tagInputRef}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={() => tagInput && addTag(tagInput)}
                placeholder="Type a tag and press Enter…"
                className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-indigo-400 mb-3"
              />

              {/* Suggested tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {SUGGESTED_TAGS.filter((t) => !tags.includes(t)).map((t) => (
                  <button
                    key={t}
                    onClick={() => addTag(t)}
                    className="rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 text-xs text-white/60 hover:bg-indigo-500/60 hover:text-white transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Note */}
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note about this session…"
                rows={3}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-indigo-400 resize-none mb-3"
              />

              <button
                onClick={handleSaveMeta}
                disabled={!sessionId || saving}
                className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:opacity-40"
              >
                {saved ? <Check size={16} /> : null}
                {saving ? "Saving…" : saved ? "Saved!" : "Save to session"}
              </button>

              {!sessionId && (
                <p className="mt-2 text-xs text-white/40">Start a session to save tags & notes.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {showWallpaper && (
        <WallpaperSelector onClose={() => setShowWallpaper(false)} />
      )}
    </>
  );
}
