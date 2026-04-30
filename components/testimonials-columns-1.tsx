"use client";
import React from "react";
import { motion } from "motion/react";

type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-5 pb-5"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="bg-[#f6f5f4] dark:bg-[#252525] rounded-xl border border-black/10 dark:border-white/8 p-6 max-w-75 w-full transition-colors duration-200"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <p className="text-[16px] font-normal leading-relaxed text-black/95 dark:text-white/85 mb-5">
                  {text}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    width={36}
                    height={36}
                    src={image}
                    alt={name}
                    className="h-9 w-9 rounded-full border border-black/10 dark:border-white/8 object-cover"
                  />
                  <div>
                    <p className="text-[14px] font-semibold leading-[1.43] text-black/95 dark:text-white/90">
                      {name}
                    </p>
                    <p className="text-[14px] font-normal leading-[1.43] text-[#615d59] dark:text-white/45">
                      {role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};
