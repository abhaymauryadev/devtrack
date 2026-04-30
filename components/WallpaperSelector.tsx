"use client";

import { useState } from "react";
import { X, ImageIcon, Palette, Layers, LinkIcon, Check } from "lucide-react";
import {
  WALLPAPER_PRESETS,
  useWallpaperStore,
  WallpaperOption,
  WallpaperType,
} from "@/store/wallpaperStore";
import { useTheme } from "@/context/ThemeContext";

const CATEGORY_LABELS: Record<WallpaperType | "all", string> = {
  all: "All",
  color: "Colors",
  gradient: "Gradients",
  image: "Photos",
};

const CATEGORY_ICONS: Record<WallpaperType | "all", React.ReactNode> = {
  all: <Layers size={14} />,
  color: <Palette size={14} />,
  gradient: <Layers size={14} />,
  image: <ImageIcon size={14} />,
};

interface Props {
  onClose: () => void;
}

export default function WallpaperSelector({ onClose }: Props) {
  const { selected, customUrl, setWallpaper, setCustomUrl } =
    useWallpaperStore();
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<
    WallpaperType | "all"
  >("all");
  const [urlInput, setUrlInput] = useState(customUrl);
  const [urlError, setUrlError] = useState("");

  const filtered =
    activeCategory === "all"
      ? WALLPAPER_PRESETS
      : WALLPAPER_PRESETS.filter((w) => w.type === activeCategory);

  function applyCustomUrl() {
    const trimmed = urlInput.trim();
    if (!trimmed) {
      setUrlError("Please enter a URL.");
      return;
    }
    try {
      new URL(trimmed);
    } catch {
      setUrlError("Invalid URL.");
      return;
    }
    setUrlError("");
    const custom: WallpaperOption = {
      id: "custom",
      label: "Custom",
      type: "image",
      value: trimmed,
      preview: trimmed,
    };
    setCustomUrl(trimmed);
    setWallpaper(custom);
  }

  return (
    <div className="fixed inset-0 z-60 flex items-end sm:items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* panel */}
      <div
        className={`relative w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl z-10 flex flex-col max-h-[90vh] ${
          theme === "dark"
            ? "bg-[#1f1f1f] border border-white/10"
            : "bg-white border border-black/10"
        }`}
      >
        {/* header */}
        <div
          className={`flex items-center justify-between px-5 py-4 shrink-0 ${
            theme === "dark" ? "border-b border-white/10" : "border-b border-black/10"
          }`}
        >
          <div className="flex items-center gap-2">
            <ImageIcon size={18} className="text-blue-400" />
            <h2 className={`font-semibold text-sm ${theme === "dark" ? "text-white/90" : "text-black/95"}`}>
              Choose Wallpaper
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`${theme === "dark" ? "text-white/45 hover:text-white/90" : "text-[#615d59] hover:text-black/95"} transition-colors`}
          >
            <X size={18} />
          </button>
        </div>

        {/* category tabs */}
        <div className="flex gap-1 px-5 pt-4 pb-2 shrink-0">
          {(["all", "color", "gradient", "image"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : theme === "dark"
                    ? "bg-[#2a2a2a] text-white/45 hover:text-white/90 hover:bg-[#333333]"
                    : "bg-[#f6f5f4] text-[#615d59] hover:text-black/95 hover:bg-[#ece9e6]"
              }`}
            >
              {CATEGORY_ICONS[cat]}
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* grid */}
        <div className="flex-1 overflow-y-auto px-5 pb-2">
          <div className="grid grid-cols-4 gap-3 py-3">
            {filtered.map((option) => {
              const isActive = selected.id === option.id;
              const previewStyle =
                option.type === "image"
                  ? {
                      backgroundImage: `url("${option.preview}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : { background: option.preview };

              return (
                <button
                  key={option.id}
                  onClick={() => setWallpaper(option)}
                  className="group flex flex-col items-center gap-1.5"
                >
                  <div
                    className={`relative w-full aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                      isActive
                        ? "border-blue-500 scale-105 shadow-lg shadow-blue-500/30"
                        : theme === "dark"
                          ? "border-white/15 hover:border-white/30"
                          : "border-black/10 hover:border-black/20"
                    }`}
                    style={previewStyle}
                  >
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Check size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-[10px] group-hover:text-[#615d59] transition-colors text-center leading-tight truncate w-full ${
                      theme === "dark"
                        ? "text-white/45 group-hover:text-white/80"
                        : "text-[#a39e98] group-hover:text-[#615d59]"
                    }`}
                  >
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* custom URL */}
        <div
          className={`px-5 pb-5 pt-3 shrink-0 ${
            theme === "dark" ? "border-t border-white/10" : "border-t border-black/10"
          }`}
        >
          <p className={`text-xs mb-2 flex items-center gap-1 ${theme === "dark" ? "text-white/45" : "text-[#615d59]"}`}>
            <LinkIcon size={11} /> Custom image URL
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                setUrlError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && applyCustomUrl()}
              placeholder="https://example.com/wallpaper.jpg"
              className={`flex-1 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-500 transition-colors ${
                theme === "dark"
                  ? "bg-[#2a2a2a] border border-white/15 text-white/90 placeholder:text-white/35"
                  : "bg-white border border-black/10 text-black/95 placeholder:text-[#a39e98]"
              }`}
            />
            <button
              onClick={applyCustomUrl}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
            >
              Apply
            </button>
          </div>
          {urlError && (
            <p className="text-[#dd5b00] text-xs mt-1">{urlError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
