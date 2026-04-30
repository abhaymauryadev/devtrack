import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white dark:bg-[#191919] flex items-center justify-center min-h-[calc(100vh-56px)] px-6 py-28 md:py-32 transition-colors duration-200">
      <div className="flex flex-col items-center text-center max-w-[800px] mx-auto">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[9999px] bg-[#f2f9ff] dark:bg-[#0075de]/12 text-[#097fe8] dark:text-[#5eabff] text-[12px] font-semibold tracking-[0.125px] mb-9">
          <span className="w-1.5 h-1.5 rounded-full bg-[#097fe8] dark:bg-[#5eabff]" />
          Built for developers
        </span>

        {/* Headline */}
        <h1
          className="font-bold leading-none text-black/95 dark:text-white/90 mb-7"
          style={{
            fontSize: "clamp(40px, 6.2vw, 64px)",
            letterSpacing: "clamp(-1.125px, -0.33vw, -2.125px)",
          }}
        >
          Track your dev hours.
          <br />
          Build your streak.
        </h1>

        {/* Subtitle */}
        <p
          className="text-[20px] font-semibold leading-[1.4] text-[#615d59] dark:text-white/55 max-w-[560px] mb-11"
          style={{ letterSpacing: "-0.125px" }}
        >
          A minimalist productivity tracker for developers. Monitor coding
          time, maintain streaks, and visualize your progress.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 justify-center">
          <Link
            href="/signup"
            className="px-5 py-2 text-[15px] font-semibold text-white bg-[#0075de] hover:bg-[#005bab] active:scale-95 rounded-sm border border-transparent"
          >
            Get started free
          </Link>
          <Link
            href="#features"
            className="px-5 py-2 text-[15px] font-semibold text-black/95 dark:text-white/80 underline-offset-4 hover:underline"
          >
            Explore features →
          </Link>
        </div>
      </div>
    </section>
  );
}
