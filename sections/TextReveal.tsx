"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TextReveal() {
  const fillRef = useRef(null);

  useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const spans = gsap.utils.toArray(".fill-span");

  spans.forEach((el, i) => {
    gsap.to(el, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "top 40%",
        scrub: 1,
      },
      delay: i * 0.2, // 👈 slight delay for sequence feel
    });
  });
}, []);

  return (
    <section className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 grid gap-12 lg:grid-cols-2 items-center min-h-screen">
        {/* LEFT: Image */}
        <div className="flex justify-center">
          <img
            src="/images.jpeg"
            alt="features"
            className="w-70 sm:w-87.5 md:w-105 rounded-2xl shadow-xl"
          />
        </div>

        {/* RIGHT: Text */}
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Home
          </h1>

          {/* Text Reveal */}
          <div className="relative">
            {/* BACK TEXT */}
            <p className="text-gray-400/30 text-sm sm:text-base md:text-[1.5rem] leading-relaxed">
              With a bold clock, encouraging quote, and personalized{" "}
              <span className="block">greetings that evolve with your day, the Home </span>
              <span className="block">dashboard syncs with your daily rhythm.</span>
            </p>

            {/* FRONT TEXT */}
            <p className="absolute inset-0 text-white text-sm sm:text-base md:text-[1.5rem] leading-relaxed whitespace-nowrap ">
              With a bold clock, encouraging quote, and personalized{" "}
              <span className="fill-span block overflow-hidden w-0 whitespace-nowrap">
                greetings that evolve with your day, the Home{" "}
              </span>
              <span className="fill-span block overflow-hidden w-0 whitespace-nowrap">
                dashboard syncs with your daily rhythm.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
