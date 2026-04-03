"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TextReveal() {
  const fillRef = useRef(null);
  

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      fillRef.current,
      { width: "0%" },
      {
        width: "100%",
        ease: "none",
        stagger: 0.3, 
        scrollTrigger: {
          trigger: fillRef.current,
          start: "top center",
          end: " bottom top",
          scrub: 1,
          markers:true,
        },
      }
    );
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
            <p className="text-gray-400/30  border text-sm sm:text-base md:text-[1.5rem] leading-relaxed ">
              With a bold clock, encouraging quote, and personalized greetings
              that evolve with your day, the Home dashboard syncs with your
              daily rhythm.
            </p>

            {/* FRONT TEXT */}
            <p
              ref={fillRef}
              className="absolute border inset-0 text-white overflow-hidden whitespace-nowrap text-sm sm:text-base md:text-[1.5rem] leading-relaxed"
              style={{ width: "0%" }}
            >
              With a bold clock, encouraging quote, and personalized greetings
              that evolve with your day, the Home dashboard syncs with your
              daily rhythm.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}