"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

// ─── Pupil ────────────────────────────────────────────────────────────────────

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({
  size = 12,
  maxDistance = 5,
  pupilColor = "#2D2D2D",
  forceLookX,
  forceLookY,
}: PupilProps) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const pos = (() => {
    if (forceLookX !== undefined && forceLookY !== undefined)
      return { x: forceLookX, y: forceLookY };
    if (!ref.current) return { x: 0, y: 0 };
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = mouse.x - cx;
    const dy = mouse.y - cy;
    const dist = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
    const angle = Math.atan2(dy, dx);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  })();

  return (
    <div
      ref={ref}
      className="rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: pupilColor,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    />
  );
};

// ─── EyeBall ──────────────────────────────────────────────────────────────────

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({
  size = 18,
  pupilSize = 7,
  maxDistance = 5,
  eyeColor = "white",
  pupilColor = "#2D2D2D",
  isBlinking = false,
  forceLookX,
  forceLookY,
}: EyeBallProps) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const pos = (() => {
    if (forceLookX !== undefined && forceLookY !== undefined)
      return { x: forceLookX, y: forceLookY };
    if (!ref.current) return { x: 0, y: 0 };
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = mouse.x - cx;
    const dy = mouse.y - cy;
    const dist = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
    const angle = Math.atan2(dy, dx);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  })();

  return (
    <div
      ref={ref}
      className="rounded-full flex items-center justify-center"
      style={{
        width: size,
        height: isBlinking ? 2 : size,
        backgroundColor: eyeColor,
        overflow: "hidden",
        transition: "height 0.1s ease",
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: pupilSize,
            height: pupilSize,
            backgroundColor: pupilColor,
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      )}
    </div>
  );
};

// ─── Main 404 Page ────────────────────────────────────────────────────────────

export default function NotFound() {
  const router = useRouter();

  // Blinking state
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking]   = useState(false);

  // Confused / shaking animation
  const [shake, setShake] = useState(false);

  // Idle float offsets
  const [purpleY, setPurpleY]   = useState(0);
  const [blackY, setBlackY]     = useState(0);
  const [orangeY, setOrangeY]   = useState(0);
  const [yellowY, setYellowY]   = useState(0);

  // ── Blink loops ──
  useEffect(() => {
    const blinkChar = (
      setter: (v: boolean) => void,
      baseInterval: number
    ) => {
      const schedule = () => {
        const wait = baseInterval + Math.random() * 2000;
        return setTimeout(() => {
          setter(true);
          setTimeout(() => {
            setter(false);
            schedule();
          }, 150);
        }, wait);
      };
      return schedule();
    };

    const t1 = blinkChar(setIsPurpleBlinking, 2500);
    const t2 = blinkChar(setIsBlackBlinking, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // ── Idle float ──
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      setPurpleY(Math.sin(t * 0.9) * 6);
      setBlackY(Math.sin(t * 1.1 + 1) * 5);
      setOrangeY(Math.sin(t * 0.7 + 2) * 7);
      setYellowY(Math.sin(t * 1.3 + 0.5) * 5);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // ── Shake on mount ──
  useEffect(() => {
    setShake(true);
    const t = setTimeout(() => setShake(false), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#171717]">

      {/* ── Left: Characters ───────────────────────────────────────── */}
      <div className="relative hidden lg:flex flex-col justify-between bg-linear-to-br from-white/90 via-white to-white/80  p-12 text-white overflow-hidden">

        {/* Logo */}
        <div className="relative z-20 flex items-center gap-2 text-lg font-semibold">
          <div className="size-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Sparkles className="size-4" />
          </div>
          <span>DevTrack</span>
        </div>

        {/* Characters */}
        <div className="relative z-20 flex items-end justify-center h-100">
          <div className="relative" style={{ width: 550, height: 400 }}>

            {/* Purple — tall, confused tilt */}
            <div
              className="absolute bottom-0 transition-all duration-700"
              style={{
                left: 70,
                width: 180,
                height: 400,
                backgroundColor: "#6C3FF5",
                borderRadius: "10px 10px 0 0",
                zIndex: 1,
                transform: `translateY(${purpleY}px) rotate(-6deg)`,
                transformOrigin: "bottom center",
                boxShadow: "inset 0 -8px 0 rgba(0,0,0,0.15)",
              }}
            >
              <div className="absolute flex gap-8" style={{ left: 45, top: 50 }}>
                <EyeBall size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isPurpleBlinking} />
                <EyeBall size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isPurpleBlinking} />
              </div>
              {/* Question mark on body */}
              <div
                className="absolute text-white/30 font-black select-none"
                style={{ fontSize: 80, left: 50, top: 120, lineHeight: 1 }}
              >
                ?
              </div>
            </div>

            {/* Black — shorter, tilts other way */}
            <div
              className="absolute bottom-0 transition-all duration-700"
              style={{
                left: 240,
                width: 120,
                height: 310,
                backgroundColor: "#2D2D2D",
                borderRadius: "8px 8px 0 0",
                zIndex: 2,
                transform: `translateY(${blackY}px) rotate(5deg)`,
                transformOrigin: "bottom center",
                boxShadow: "inset 0 -8px 0 rgba(0,0,0,0.2)",
              }}
            >
              <div className="absolute flex gap-6" style={{ left: 26, top: 32 }}>
                <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isBlackBlinking} />
                <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#2D2D2D" isBlinking={isBlackBlinking} />
              </div>
              {/* Sweat drop */}
              <div
                className="absolute rounded-full bg-[#6C3FF5]/60"
                style={{ width: 10, height: 14, right: 16, top: 28, borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%" }}
              />
            </div>

            {/* Orange — semi-circle, shrugging */}
            <div
              className="absolute bottom-0"
              style={{
                left: 0,
                width: 240,
                height: 200,
                zIndex: 3,
                backgroundColor: "#FF9B6B",
                borderRadius: "120px 120px 0 0",
                transform: `translateY(${orangeY}px)`,
                boxShadow: "inset 0 -6px 0 rgba(0,0,0,0.1)",
              }}
            >
              <div className="absolute flex gap-8" style={{ left: 82, top: 90 }}>
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
              </div>
              {/* Wavy confused mouth */}
              <svg
                className="absolute"
                style={{ left: 70, top: 130, width: 100, height: 20 }}
                viewBox="0 0 100 20"
                fill="none"
              >
                <path
                  d="M5 10 Q20 2 35 10 Q50 18 65 10 Q80 2 95 10"
                  stroke="#2D2D2D"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>

            {/* Yellow — front right */}
            <div
              className="absolute bottom-0"
              style={{
                left: 310,
                width: 140,
                height: 230,
                backgroundColor: "#E8D754",
                borderRadius: "70px 70px 0 0",
                zIndex: 4,
                transform: `translateY(${yellowY}px) rotate(-3deg)`,
                transformOrigin: "bottom center",
                boxShadow: "inset 0 -6px 0 rgba(0,0,0,0.1)",
              }}
            >
              <div className="absolute flex gap-6" style={{ left: 52, top: 40 }}>
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
              </div>
              {/* Sad mouth */}
              <div
                className="absolute rounded-full bg-[#2D2D2D]"
                style={{ width: 40, height: 3, left: 50, top: 96, transform: "rotate(10deg)" }}
              />
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="relative z-20 flex items-center gap-8 text-sm text-white/80">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Decorative bg */}
        {/* <div className="absolute inset-0 bg-[#171717] opacity-5" style={{ backgroundSize: "20px 20px", backgroundImage: "linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)" }} /> */}
        <div className="absolute top-1/4 right-1/4 size-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* ── Right: 404 Message ─────────────────────────────────────── */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md text-center space-y-6">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 text-lg font-semibold mb-8">
            <div className="size-8 rounded-lg bg-[#6C3FF5]/10 flex items-center justify-center">
              <Sparkles className="size-4 text-[#6C3FF5]" />
            </div>
            <span className="text-white">DevTrack</span>
          </div>

          {/* 404 number */}
          <div
            className={`select-none ${shake ? "animate-bounce" : ""}`}
            style={{
              fontSize: "clamp(80px, 18vw, 140px)",
              fontWeight: 900,
              lineHeight: 1,
              background: "linear-gradient(135deg, #6C3FF5 0%, #FF9B6B 50%, #E8D754 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-4px",
            }}
          >
            404
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">
              Oops! Page not found
            </h1>
            <p className="text-sm text-white/50 max-w-xs mx-auto leading-relaxed">
              Looks like our little characters got lost too. The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 px-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/30">where to?</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 rounded-lg border border-white/10 text-sm font-medium text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
            >
              ← Go back
            </button>
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-3 rounded-lg bg-[#6C3FF5] text-sm font-medium text-white hover:bg-[#5a30d4] transition-all duration-200 shadow-lg shadow-[#6C3FF5]/30"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}