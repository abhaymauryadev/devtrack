import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-[#191919] transition-colors duration-200">
        {/* Runs before hydration to apply the stored theme without flash */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('devtrack-theme');var p=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';if((t??p)==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
