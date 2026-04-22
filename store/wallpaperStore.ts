import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WallpaperType = "gradient" | "color" | "image";

export interface WallpaperOption {
  id: string;
  label: string;
  type: WallpaperType;
  value: string;
  preview: string; // CSS for the tiny preview swatch
}

export const WALLPAPER_PRESETS: WallpaperOption[] = [
  // ── Solid dark colors ─────────────────────────────────────────────
  {
    id: "default",
    label: "Default",
    type: "color",
    value: "#020617",
    preview: "#020617",
  },
  {
    id: "true-black",
    label: "True Black",
    type: "color",
    value: "#000000",
    preview: "#000000",
  },
  {
    id: "dark-navy",
    label: "Dark Navy",
    type: "color",
    value: "#020c1b",
    preview: "#020c1b",
  },
  {
    id: "dark-zinc",
    label: "Zinc",
    type: "color",
    value: "#09090b",
    preview: "#09090b",
  },

  // ── Gradients ─────────────────────────────────────────────────────
  {
    id: "deep-space",
    label: "Deep Space",
    type: "gradient",
    value: "radial-gradient(ellipse at top, #1a1a2e 0%, #000000 100%)",
    preview: "linear-gradient(135deg, #1a1a2e 0%, #000000 100%)",
  },
  {
    id: "purple-night",
    label: "Purple Night",
    type: "gradient",
    value: "linear-gradient(135deg, #1a0533 0%, #0d0d1a 100%)",
    preview: "linear-gradient(135deg, #1a0533 0%, #0d0d1a 100%)",
  },
  {
    id: "ocean-deep",
    label: "Ocean Deep",
    type: "gradient",
    value: "linear-gradient(180deg, #0c2340 0%, #051020 100%)",
    preview: "linear-gradient(180deg, #0c2340 0%, #051020 100%)",
  },
  {
    id: "forest-dark",
    label: "Forest",
    type: "gradient",
    value: "linear-gradient(135deg, #0d1f0d 0%, #020a02 100%)",
    preview: "linear-gradient(135deg, #0d1f0d 0%, #020a02 100%)",
  },
  {
    id: "aurora",
    label: "Aurora",
    type: "gradient",
    value:
      "linear-gradient(135deg, #002233 0%, #001a33 40%, #0d1a3a 70%, #1a0d2e 100%)",
    preview:
      "linear-gradient(135deg, #002233 0%, #001a33 40%, #0d1a3a 70%, #1a0d2e 100%)",
  },
  {
    id: "cyber",
    label: "Cyber",
    type: "gradient",
    value: "linear-gradient(135deg, #000d1a 0%, #001433 50%, #000d1a 100%)",
    preview: "linear-gradient(135deg, #000d1a 0%, #001433 50%, #000d1a 100%)",
  },
  {
    id: "ember",
    label: "Ember",
    type: "gradient",
    value: "linear-gradient(135deg, #1a0500 0%, #2d0a00 50%, #1a0000 100%)",
    preview: "linear-gradient(135deg, #1a0500 0%, #2d0a00 50%, #1a0000 100%)",
  },
  {
    id: "midnight-rose",
    label: "Midnight Rose",
    type: "gradient",
    value: "linear-gradient(135deg, #1a001a 0%, #0d001a 50%, #000d1a 100%)",
    preview: "linear-gradient(135deg, #1a001a 0%, #0d001a 50%, #000d1a 100%)",
  },
  {
    id: "steel-blue",
    label: "Steel Blue",
    type: "gradient",
    value: "linear-gradient(180deg, #0f172a 0%, #1e3a5f 100%)",
    preview: "linear-gradient(180deg, #0f172a 0%, #1e3a5f 100%)",
  },
  {
    id: "teal-dark",
    label: "Teal Dark",
    type: "gradient",
    value: "linear-gradient(135deg, #001a1a 0%, #003333 100%)",
    preview: "linear-gradient(135deg, #001a1a 0%, #003333 100%)",
  },

  // ── Photo images (Unsplash) ────────────────────────────────────────
  {
    id: "img-galaxy",
    label: "Galaxy",
    type: "image",
    value:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=80&fit=crop",
    preview:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=80&q=60&fit=crop",
  },
  {
    id: "img-mountains",
    label: "Mountains",
    type: "image",
    value:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&fit=crop",
    preview:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&q=60&fit=crop",
  },
  {
    id: "img-forest",
    label: "Forest",
    type: "image",
    value:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80&fit=crop",
    preview:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=80&q=60&fit=crop",
  },
  {
    id: "img-ocean",
    label: "Ocean",
    type: "image",
    value:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&q=80&fit=crop",
    preview:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=80&q=60&fit=crop",
  },
  {
    id: "img-city-night",
    label: "City Night",
    type: "image",
    value:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80&fit=crop",
    preview:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=80&q=60&fit=crop",
  },
  {
    id: "img-northern-lights",
    label: "Northern Lights",
    type: "image",
    value:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80&fit=crop",
    preview:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=80&q=60&fit=crop",
  },
  {
    id: "img-desert",
    label: "Desert",
    type: "image",
    value:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=80&fit=crop",
    preview:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=80&q=60&fit=crop",
  },
  {
    id: "img-snow",
    label: "Snowy Peak",
    type: "image",
    value:
      "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=1920&q=80&fit=crop",
    preview:
      "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=80&q=60&fit=crop",
  },
];

export function buildBackground(option: WallpaperOption): React.CSSProperties {
  if (option.type === "image") {
    return {
      backgroundImage: `url("${option.value}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
    };
  }
  return { background: option.value };
}

interface WallpaperState {
  selected: WallpaperOption;
  customUrl: string;
  setWallpaper: (option: WallpaperOption) => void;
  setCustomUrl: (url: string) => void;
}

export const useWallpaperStore = create<WallpaperState>()(
  persist(
    (set) => ({
      selected: WALLPAPER_PRESETS[0],
      customUrl: "",
      setWallpaper: (selected) => set({ selected }),
      setCustomUrl: (customUrl) => set({ customUrl }),
    }),
    { name: "devtrack-wallpaper" }
  )
);
