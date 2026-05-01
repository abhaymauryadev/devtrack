"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import Image from "next/image";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

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

interface CharacterPos {
  faceX: number;
  faceY: number;
  bodySkew: number;
}

type RegisteredUser = {
  name: string;
  email: string;
  password: string;
};

// ─────────────────────────────────────────────
// Storage helpers
// ─────────────────────────────────────────────

const STORAGE_KEY = "registered-users";

const readUsers = (): RegisteredUser[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RegisteredUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveUsers = (users: RegisteredUser[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

const setAuthCookie = () => {
  document.cookie =
    "auth-token=logged-in; path=/; max-age=2592000; samesite=lax";
};

// ─────────────────────────────────────────────
// Pupil (standalone)
// ─────────────────────────────────────────────

const Pupil = ({
  size = 12,
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY,
}: PupilProps) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePosition = () => {
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }
    if (!pupilRef.current) return { x: 0, y: 0 };
    const rect = pupilRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = mouseX - cx;
    const dy = mouseY - cy;
    const dist = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
    const angle = Math.atan2(dy, dx);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  };

  const pos = calculatePosition();

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    />
  );
};

// ─────────────────────────────────────────────
// EyeBall (standalone — NOT inside another component)
// ─────────────────────────────────────────────

const EyeBall = ({
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY,
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePosition = () => {
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }
    if (!eyeRef.current) return { x: 0, y: 0 };
    const rect = eyeRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = mouseX - cx;
    const dy = mouseY - cy;
    const dist = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
    const angle = Math.atan2(dy, dx);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  };

  const pos = calculatePosition();

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? "2px" : `${size}px`,
        backgroundColor: eyeColor,
        overflow: "hidden",
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Default character position
// ─────────────────────────────────────────────

const defaultPos = (): CharacterPos => ({ faceX: 0, faceY: 0, bodySkew: 0 });

// ─────────────────────────────────────────────
// SignupPage
// ─────────────────────────────────────────────

export default function SignupPage() {
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Animation state
  const [isTyping, setIsTyping] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const [isPurplePeeking, setIsPurplePeeking] = useState(false);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [purplePos, setPurplePos] = useState<CharacterPos>(defaultPos());
  const [blackPos, setBlackPos] = useState<CharacterPos>(defaultPos());
  const [orangePos, setOrangePos] = useState<CharacterPos>(defaultPos());
  const [yellowPos, setYellowPos] = useState<CharacterPos>(defaultPos());

  // Character refs
  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);

  // Idle sway animation
  useEffect(() => {
    const interval = setInterval(() => {
      const sway = () => ({
        faceX: (Math.random() - 0.5) * 4,
        faceY: (Math.random() - 0.5) * 4,
        bodySkew: (Math.random() - 0.5) * 3,
      });
      setPurplePos(sway());
      setBlackPos(sway());
      setOrangePos(sway());
      setYellowPos(sway());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Purple blink
  useEffect(() => {
    const interval = setInterval(
      () => {
        setIsPurpleBlinking(true);
        setTimeout(() => setIsPurpleBlinking(false), 120);
      },
      3200 + Math.random() * 2000,
    );
    return () => clearInterval(interval);
  }, []);

  // Black blink
  useEffect(() => {
    const interval = setInterval(
      () => {
        setIsBlackBlinking(true);
        setTimeout(() => setIsBlackBlinking(false), 120);
      },
      4000 + Math.random() * 1500,
    );
    return () => clearInterval(interval);
  }, []);

  // Characters look at each other occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLookingAtEachOther(true);
      setTimeout(() => setIsLookingAtEachOther(false), 1500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Purple peeks when password is shown
  useEffect(() => {
    if (showPassword && password.length > 0) {
      const timeout = setTimeout(() => setIsPurplePeeking(true), 400);
      return () => clearTimeout(timeout);
    } else {
      setIsPurplePeeking(false);
    }
  }, [showPassword, password]);

  // ─── Handlers ───────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password and confirm password must match.");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const users = readUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const emailTaken = users.some(
      (u) => u.email.toLowerCase() === normalizedEmail,
    );

    if (emailTaken) {
      setError("This email is already registered. Please log in.");
      setIsLoading(false);
      return;
    }

    users.push({ name: name.trim(), email: normalizedEmail, password });
    saveUsers(users);
    setAuthCookie();
    router.replace("/screen");
  };

  const handleGoogleSignup = async () => {
    setError("");
    setIsGoogleLoading(true);
    await signIn("google", { callbackUrl: "/screen" });
    setIsGoogleLoading(false);
  };

  // ─── Derived booleans for character poses ───

  const passwordHidden = password.length > 0 && !showPassword;
  const passwordVisible = password.length > 0 && showPassword;

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* ── Left illustration panel ── */}
      <div className="relative hidden lg:flex flex-col justify-between bg-[#f6f5f4] p-12 text-black/95 border-r border-black/10">
        {/* Brand */}
        <div className="relative z-20">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <div className="size-8 rounded-lg bg-[#f2f9ff] border border-black/10 flex items-center justify-center">
              <Image
                src="/icons/favicon.svg"
                width={500}
                height={500}
                alt="Picture of the author"
              />
            </div>
            <span className="text-black/95">DevTrack</span>
          </div>
        </div>

        {/* Characters */}
        <div className="relative z-20 flex items-end justify-center h-125">
          <div className="relative" style={{ width: "550px", height: "400px" }}>
            {/* Purple — back layer */}
            <div
              ref={purpleRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: "70px",
                width: "180px",
                height: isTyping || passwordHidden ? "440px" : "400px",
                backgroundColor: "#6C3FF5",
                borderRadius: "10px 10px 0 0",
                zIndex: 1,
                transform: passwordVisible
                  ? "skewX(0deg)"
                  : isTyping || passwordHidden
                    ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
                    : `skewX(${purplePos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-8 transition-all duration-700 ease-in-out"
                style={{
                  left: passwordVisible
                    ? "20px"
                    : isLookingAtEachOther
                      ? "55px"
                      : `${45 + purplePos.faceX}px`,
                  top: passwordVisible
                    ? "35px"
                    : isLookingAtEachOther
                      ? "65px"
                      : `${40 + purplePos.faceY}px`,
                }}
              >
                {(["left", "right"] as const).map((side) => (
                  <EyeBall
                    key={side}
                    size={18}
                    pupilSize={7}
                    maxDistance={5}
                    eyeColor="white"
                    pupilColor="#2D2D2D"
                    isBlinking={isPurpleBlinking}
                    forceLookX={
                      passwordVisible
                        ? isPurplePeeking
                          ? 4
                          : -4
                        : isLookingAtEachOther
                          ? 3
                          : undefined
                    }
                    forceLookY={
                      passwordVisible
                        ? isPurplePeeking
                          ? 5
                          : -4
                        : isLookingAtEachOther
                          ? 4
                          : undefined
                    }
                  />
                ))}
              </div>
            </div>

            {/* Black — middle layer */}
            <div
              ref={blackRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: "240px",
                width: "120px",
                height: "310px",
                backgroundColor: "#2D2D2D",
                borderRadius: "8px 8px 0 0",
                zIndex: 2,
                transform: passwordVisible
                  ? "skewX(0deg)"
                  : isLookingAtEachOther
                    ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                    : isTyping || passwordHidden
                      ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)`
                      : `skewX(${blackPos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                style={{
                  left: passwordVisible
                    ? "10px"
                    : isLookingAtEachOther
                      ? "32px"
                      : `${26 + blackPos.faceX}px`,
                  top: passwordVisible
                    ? "28px"
                    : isLookingAtEachOther
                      ? "12px"
                      : `${32 + blackPos.faceY}px`,
                }}
              >
                {(["left", "right"] as const).map((side) => (
                  <EyeBall
                    key={side}
                    size={16}
                    pupilSize={6}
                    maxDistance={4}
                    eyeColor="white"
                    pupilColor="#2D2D2D"
                    isBlinking={isBlackBlinking}
                    forceLookX={
                      passwordVisible
                        ? -4
                        : isLookingAtEachOther
                          ? 0
                          : undefined
                    }
                    forceLookY={
                      passwordVisible
                        ? -4
                        : isLookingAtEachOther
                          ? -4
                          : undefined
                    }
                  />
                ))}
              </div>
            </div>

            {/* Orange — front left */}
            <div
              ref={orangeRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: "0px",
                width: "240px",
                height: "200px",
                zIndex: 3,
                backgroundColor: "#FF9B6B",
                borderRadius: "120px 120px 0 0",
                transform: passwordVisible
                  ? "skewX(0deg)"
                  : `skewX(${orangePos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-8 transition-all duration-200 ease-out"
                style={{
                  left: passwordVisible
                    ? "50px"
                    : `${82 + (orangePos.faceX || 0)}px`,
                  top: passwordVisible
                    ? "85px"
                    : `${90 + (orangePos.faceY || 0)}px`,
                }}
              >
                {(["left", "right"] as const).map((side) => (
                  <Pupil
                    key={side}
                    size={12}
                    maxDistance={5}
                    pupilColor="#2D2D2D"
                    forceLookX={passwordVisible ? -5 : undefined}
                    forceLookY={passwordVisible ? -4 : undefined}
                  />
                ))}
              </div>
            </div>

            {/* Yellow — front right */}
            <div
              ref={yellowRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: "310px",
                width: "140px",
                height: "230px",
                backgroundColor: "#E8D754",
                borderRadius: "70px 70px 0 0",
                zIndex: 4,
                transform: passwordVisible
                  ? "skewX(0deg)"
                  : `skewX(${yellowPos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-6 transition-all duration-200 ease-out"
                style={{
                  left: passwordVisible
                    ? "20px"
                    : `${52 + (yellowPos.faceX || 0)}px`,
                  top: passwordVisible
                    ? "35px"
                    : `${40 + (yellowPos.faceY || 0)}px`,
                }}
              >
                {(["left", "right"] as const).map((side) => (
                  <Pupil
                    key={side}
                    size={12}
                    maxDistance={5}
                    pupilColor="#2D2D2D"
                    forceLookX={passwordVisible ? -5 : undefined}
                    forceLookY={passwordVisible ? -4 : undefined}
                  />
                ))}
              </div>
              {/* Mouth */}
              <div
                className="absolute w-20 h-1 bg-[#2D2D2D] rounded-full transition-all duration-200 ease-out"
                style={{
                  left: passwordVisible
                    ? "10px"
                    : `${40 + (yellowPos.faceX || 0)}px`,
                  top: passwordVisible
                    ? "88px"
                    : `${88 + (yellowPos.faceY || 0)}px`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div className="relative z-20 flex items-center gap-8 text-sm text-[#615d59]">
          <a href="#" className="hover:text-black/95 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-black/95 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-black/95 transition-colors">
            Contact
          </a>
        </div>

        {/* Decorative blobs */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,117,222,0.08),transparent_45%)]" />
        <div className="absolute top-1/4 right-1/4 size-64 bg-[#0075de]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-[#0075de]/5 rounded-full blur-3xl" />
      </div>

      {/* ── Right signup form ── */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 text-lg font-semibold mb-12">
            <div className="size-8 rounded-lg bg-[#f2f9ff] border border-black/10 flex items-center justify-center">
              <Image
                src="/icons/favicon.svg"
                width={500}
                height={500}
                alt="Picture of the author"
              />
            </div>
            <span className="text-black/95">DevTrack</span>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-black/95">
              Create your account
            </h1>
            <p className="text-sm text-[#615d59]">
              Register with email/password or continue with Google.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2 text-white dark:text-black">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="h-12 bg-white border-black/10 focus:border-[#0075de] rounded-sm"
              />
            </div>

            <div className="space-y-2 text-white dark:text-black">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-12 bg-white border-black/10 focus:border-[#0075de] rounded-sm"
              />
            </div>

            <div className="space-y-2 text-white dark:text-black">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  className="h-12 pr-10 bg-white border-black/10 focus:border-[#0075de] rounded-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#615d59] hover:text-black/95 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2 text-white dark:text-black">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
                className="h-12 bg-white border-black/10 focus:border-[#0075de] rounded-sm"
              />
            </div>

            {error && (
              <div className="rounded-sm border border-[#f3c9ac] bg-[#fff6ef] p-3 text-sm text-[#dd5b00]">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold rounded-sm bg-[#0075de] hover:bg-[#005bab] text-white"
              size="lg"
              disabled={isLoading || isGoogleLoading}
            >
              {isLoading ? "Creating account…" : "Sign up"}
            </Button>
          </form>

          {/* Google */}
          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 bg-white border-black/10 hover:bg-[#f6f5f4] rounded-sm text-black/95"
              onClick={handleGoogleSignup}
              disabled={isLoading || isGoogleLoading}
            >
              <Mail className="mr-2 size-5" />
              {isGoogleLoading ? "Connecting Google…" : "Sign up with Google"}
            </Button>
          </div>

          {/* Link to login */}
          <p className="mt-8 text-center text-sm text-[#615d59]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-black/95 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
