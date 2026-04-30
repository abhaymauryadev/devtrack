"use client";

import { TestimonialsColumn } from "@/components/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "DevTrack completely changed how I approach my coding sessions. The streak feature alone kept me coding every single day for 90+ days.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Alex Rivera",
    role: "Full Stack Developer",
  },
  {
    text: "I finally know where my time actually goes. The session logs with tags are exactly what I needed to understand my productivity patterns.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Priya Nair",
    role: "Software Engineer",
  },
  {
    text: "The Pomodoro timer keeps me honest. 25 minutes of real focus, then a break — DevTrack makes it effortless to stick to.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "James Liu",
    role: "Frontend Developer",
  },
  {
    text: "As a freelancer, tracking billable hours used to be a pain. DevTrack turned it into a habit I actually enjoy maintaining.",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Sara Kowalski",
    role: "Freelance Developer",
  },
  {
    text: "The analytics view is eye-opening. I had no idea I was most productive at 10pm — now I schedule my hardest tasks for then.",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Marcus Thompson",
    role: "Backend Engineer",
  },
  {
    text: "Simple, fast, and gets out of my way. DevTrack is the one productivity tool that doesn't become a procrastination tool itself.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Yuki Tanaka",
    role: "DevOps Engineer",
  },
  {
    text: "I use DevTrack every day. Seeing my coding streak grow is genuinely motivating — it made me 30% more consistent.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Daniel Osei",
    role: "Mobile Developer",
  },
  {
    text: "The focus wallpapers are a nice touch. Picking the right background actually helps me get into the zone faster.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Chloe Dubois",
    role: "UI Engineer",
  },
  {
    text: "I recommended DevTrack to my entire team during our hackathon. Clean UI, zero friction, works perfectly.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Raj Patel",
    role: "Tech Lead",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
  return (
    <section className="bg-white dark:bg-[#191919] py-24 md:py-28 px-6 transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-14"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-[9999px] bg-[#f2f9ff] dark:bg-[#0075de]/12 text-[#097fe8] dark:text-[#5eabff] text-[12px] font-semibold tracking-[0.125px] mb-6">
            Testimonials
          </span>
          <h2
            className="font-bold leading-none text-black/95 dark:text-white/90 mb-4"
            style={{ fontSize: "48px", letterSpacing: "-1.5px" }}
          >
            What developers say
          </h2>
          <p
            className="text-[20px] font-semibold leading-[1.40] text-[#615d59] dark:text-white/55 max-w-[540px]"
            style={{ letterSpacing: "-0.125px" }}
          >
            Thousands of developers use DevTrack to build consistent coding
            habits.
          </p>
        </motion.div>

        <div className="flex justify-center gap-5 mask-[linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-185 overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
