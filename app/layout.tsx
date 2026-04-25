import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevTrack – Personal Dev Activity Tracker",
    template: "%s | DevTrack",
  },
  description:
    "DevTrack helps developers track coding sessions, measure productivity, and build consistent focus habits with a built-in Pomodoro timer.",
  keywords: [
    "developer productivity",
    "pomodoro timer",
    "coding tracker",
    "focus sessions",
    "devtrack",
  ],
  authors: [{ name: "DevTrack" }],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "DevTrack",
    title: "DevTrack – Personal Dev Activity Tracker",
    description:
      "Track your coding sessions, measure productivity, and build focus habits with DevTrack.",
  },
  twitter: {
    card: "summary",
    title: "DevTrack – Personal Dev Activity Tracker",
    description:
      "Track your coding sessions, measure productivity, and build focus habits with DevTrack.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
