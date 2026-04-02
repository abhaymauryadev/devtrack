"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Timer } from "lucide-react";

export default function Features() {
  const containerRef = useRef(null);

  const features = [
    {
      title: "Smart Timer",
      description:
        "One-click time tracking with automatic session saving. Never lose track of your coding hours again.",
      icon: <Timer />,
    },
    {
      title: "Smart Timer",
      description:
        "One-click time tracking with automatic session saving. Never lose track of your coding hours again.",
      icon: <Timer />,
    },
    {
      title: "Smart Timer",
      description:
        "One-click time tracking with automatic session saving. Never lose track of your coding hours again.",
      icon: <Timer />,
    },
    {
      title: "Smart Timer",
      description:
        "One-click time tracking with automatic session saving. Never lose track of your coding hours again.",
      icon: <Timer />,
    },
    {
      title: "Smart Timer",
      description:
        "One-click time tracking with automatic session saving. Never lose track of your coding hours again.",
      icon: <Timer />,
    },
    {
      title: "Smart Timer",
      description:
        "One-click time tracking with automatic session saving. Never lose track of your coding hours again.",
      icon: <Timer />,
    },
    {
      title: "Smart Timer",
      description:
        "One-click time tracking with automatic session saving. Never lose track of your coding hours again.",
      icon: <Timer />,
    },
    {
      title: "Smart Timer",
      description:
        "One-click time tracking with automatic session saving. Never lose track of your coding hours again.",
      icon: <Timer />,
    },
  ];
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

      <section className="max-w-7xl m-auto  min-h-screen">
        <div className="text-center pb-10">
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-7xl font-bold pt-10">
            Everything you need{" "}
          </h1>
          <p className="text-gray-500 pt-3 text-sm sm:text-2xl md:text-3xl lg:text-[1.6rem]">
            Interactive, powerful tools to track your developement journey
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 p-5 ">
          {features.map((item, index) => (
            <div
              key={index}
              className="border p-5 rounded-xl shadow-sm space-y-4 hover:shadow-md transition  lg:text"
            >
              <span className="inline-flex items-center justify-center border rounded-2xl p-3">
                {item.icon}
              </span>

              <h2 className="font-semibold text-xl">{item.title}</h2>

              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
