"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";

type RegisteredUser = {
  name: string;
  email: string;
  password: string;
};

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
  document.cookie = "auth-token=logged-in; path=/; max-age=2592000; samesite=lax";
};

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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
    const emailTaken = users.some((user) => user.email.toLowerCase() === normalizedEmail);

    if (emailTaken) {
      setError("This email is already registered. Please log in.");
      setIsLoading(false);
      return;
    }

    users.push({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-border/60 bg-background p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Register with email/password or continue with Google.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>

          {error && (
            <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
            {isLoading ? "Creating account..." : "Sign up"}
          </Button>
        </form>

        <Button
          type="button"
          variant="outline"
          className="mt-4 w-full"
          onClick={handleGoogleSignup}
          disabled={isLoading || isGoogleLoading}
        >
          <Mail className="mr-2 size-4" />
          {isGoogleLoading ? "Connecting Google..." : "Sign up with Google"}
        </Button>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-foreground hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
