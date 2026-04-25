import type { Metadata } from "next";
import Hero from "@/sections/Hero";

export const metadata: Metadata = {
  title: "DevTrack – Personal Dev Activity Tracker",
  description:
    "DevTrack helps developers track coding sessions, build consistent focus habits, and measure productivity with a built-in Pomodoro timer.",
  openGraph: {
    title: "DevTrack – Personal Dev Activity Tracker",
    description:
      "Track coding sessions, build focus habits, and measure productivity with DevTrack.",
    url: "/",
  },
};
import Navabar from "@/components/Navabar";
import Features from "@/sections/Features";
import Testimonials from "@/sections/Testimonials";
import TextReveal from "@/sections/TextReveal";
import FooterNewsletter from "@/components/FooterNewsletter";
import Screen from "./screen/page"

export default function Home() {
  return (
    <div>
      <Navabar />
      <Hero />
      <Features/>
      <Testimonials/>
      <TextReveal/>
      <FooterNewsletter/>
    </div>
  );
}
