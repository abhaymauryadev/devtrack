import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your free DevTrack account and start tracking your coding sessions today.",
  openGraph: {
    title: "Sign Up – DevTrack",
    description: "Create your free DevTrack account and start tracking your coding sessions today.",
  },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
