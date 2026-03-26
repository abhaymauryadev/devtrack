"use client";

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
    <>
      {/* <section className="max-w-7xl m-auto border">
      <div
         ref={containerRef}
        className=" relative h-[20rem] w-[90rem] flex items-center justify-center overflow-hidden"
      >
         Image 
        <img
          src="/images.jpeg"
          alt="background"
          className="absolute border object-cover"
        />

         Overlay 
        <h1 className="relative z-10 text-white text-5xl font-bold">
          Center Text
        </h1>
      </div>
    </section> */}

      <section className="max-w-7xl m-auto border min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-7xl font-bold pt-10">
            Everything you need{" "}
          </h1>
          <p className="text-gray-500 pt-3 text-sm sm:text-2xl md:text-3xl lg:text-[1.6rem]">
            Interactive, powerful tools to track your developement journey
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="bg-gray-200 p-4 text-center">1</div>
          <div className="bg-gray-200 p-4 text-center">2</div>
          <div className="bg-gray-200 p-4 text-center">3</div>
          <div className="bg-gray-200 p-4 text-center">4</div>
          <div className="bg-gray-200 p-4 text-center">5</div>
        </div>
      </section>
    </>
  );
}
