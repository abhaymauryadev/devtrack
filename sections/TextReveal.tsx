"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const panels = [
  {
    cls: "fill-span",
    bg: "bg-white dark:bg-[#191919]",
    imgSide: "left",
    title: "Home Dashboard",
    lines: [
      "A bold clock, encouraging quote, and personalized",
      "greetings that evolve with your day — the Home",
      "dashboard syncs perfectly with your daily rhythm.",
    ],
  },
  {
    cls: "fill-span-1",
    bg: "bg-[#f6f5f4] dark:bg-[#1f1f1f]",
    imgSide: "right",
    title: "Session Tracker",
    lines: [
      "Log every coding session with tags and notes.",
      "Review your work history and identify the",
      "patterns that drive your best output.",
    ],
  },
  {
    cls: "fill-span_2",
    bg: "bg-white dark:bg-[#191919]",
    imgSide: "left",
    title: "Analytics View",
    lines: [
      "Interactive charts reveal your peak hours,",
      "streaks, and total time invested — so you",
      "can double down on what works.",
    ],
  },
];

export default function TextReveal() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    panels.forEach(({ cls }) => {
      const spans = gsap.utils.toArray(`.${cls}`);
      spans.forEach((el: any, i: any) => {
        gsap.to(el, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
          delay: i * 0.2,
        });
      });
    });
  }, []);

  return (
    <section className="transition-colors duration-200">
      {panels.map(({ cls, bg, imgSide, title, lines }) => (
        <div key={cls} className={`${bg} py-20 md:py-24 transition-colors duration-200`}>
          <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 items-center gap-16 min-h-[480px]">
            {/* Image */}
            <div
              className={`flex justify-center ${
                imgSide === "left" ? "order-2 lg:order-1" : "order-2"
              }`}
            >
              <img
                src="/images.jpeg"
                alt={title}
                className="w-70 sm:w-90 md:w-105 rounded-[12px] border border-black/10 dark:border-white/8"
                style={{ boxShadow: "var(--shadow-card)" }}
              />
            </div>

            {/* Text */}
            <div
              className={`space-y-6 ${
                imgSide === "left" ? "order-1 lg:order-2" : "order-1"
              }`}
            >
              <h2
                className="font-bold leading-[1.23] text-black/95 dark:text-white/90"
                style={{ fontSize: "40px", letterSpacing: "-0.625px" }}
              >
                {title}
              </h2>

              <div
                className="relative leading-[1.4]"
                style={{ fontSize: "clamp(18px, 2vw, 20px)", letterSpacing: "-0.125px" }}
              >
                {/* Ghost text */}
                <p className="text-black/10 dark:text-white/10">
                  {lines.map((line, li) => (
                    <span key={li} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                {/* Fill text */}
                <p className="absolute inset-0 text-black/95 dark:text-white/90">
                  {lines.map((line, li) => (
                    <span
                      key={li}
                      className={`${cls} block overflow-hidden w-0 whitespace-nowrap`}
                    >
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
