"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Features() {
  const containerRef = useRef(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const el = containerRef.current;

//     gsap.fromTo(
//       el,
//       { scale: 0.1 },
//       {
//         scale: 1.8, // zoom level
//         ease: "none",
//         scrollTrigger: {
//           trigger: el,
//           start: "top top",
//           end: "+=1000", // scroll distance
//           scrub: true, // smooth scroll-linked animation
//           pin: true, // keeps section fixed
//         },
//       }
//     );

//   }, []);

  return (
    <section className="max-w-7xl m-auto border">
      <div
        // ref={containerRef}
        className=" relative h-[20rem] w-[90rem] flex items-center justify-center overflow-hidden"
      >
        {/* Image */}
        <img
          src="/images.jpeg"
          alt="background"
          className="absolute border object-cover"
        />

        {/* Overlay */}
        <h1 className="relative z-10 text-white text-5xl font-bold">
          Center Text
        </h1>
      </div>
    </section>
  );
}