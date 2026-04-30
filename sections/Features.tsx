import { Timer, BookOpen, Flame, BarChart2, Image as ImageIcon, Zap } from "lucide-react";

const features = [
  {
    icon: <Timer className="w-5 h-5 text-[#0075de] dark:text-[#5eabff]" />,
    title: "Pomodoro Timer",
    description:
      "One-click countdown timer with auto-save. Focus in 25-minute sprints and build deep work habits that stick.",
  },
  {
    icon: <BookOpen className="w-5 h-5 text-[#0075de] dark:text-[#5eabff]" />,
    title: "Session Logging",
    description:
      "Tag every session with context. Add notes, label technologies, and review your full work history at a glance.",
  },
  {
    icon: <Flame className="w-5 h-5 text-[#0075de] dark:text-[#5eabff]" />,
    title: "Streak Tracking",
    description:
      "Visualize your daily coding consistency. Watch your streak grow day after day and never break the chain.",
  },
  {
    icon: <BarChart2 className="w-5 h-5 text-[#0075de] dark:text-[#5eabff]" />,
    title: "Visual Analytics",
    description:
      "Interactive charts reveal your peak hours, total time logged, and productivity trends over weeks and months.",
  },
  {
    icon: <ImageIcon className="w-5 h-5 text-[#0075de] dark:text-[#5eabff]" />,
    title: "Focus Wallpapers",
    description:
      "Choose a distraction-free background that matches your mood and sets the tone for a productive session.",
  },
  {
    icon: <Zap className="w-5 h-5 text-[#0075de] dark:text-[#5eabff]" />,
    title: "Instant Start",
    description:
      "No setup required. Sign in with Google and start tracking your first session in under 30 seconds.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-[#f6f5f4] dark:bg-[#1f1f1f] py-24 md:py-28 px-6 transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2
            className="font-bold leading-none text-black/95 dark:text-white/90 mb-4"
            style={{ fontSize: "48px", letterSpacing: "-1.5px" }}
          >
            Everything you need
          </h2>
          <p className="text-[20px] font-semibold leading-[1.40] text-[#615d59] dark:text-white/55 max-w-[620px] mx-auto">
            Powerful tools to track your development journey
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#252525] rounded-xl border border-black/10 dark:border-white/8 p-6 space-y-4 transition-colors duration-200 hover:-translate-y-0.5"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#f2f9ff] dark:bg-[#0075de]/10">
                {feature.icon}
              </span>
              <h3
                className="font-bold leading-[1.27] text-black/95 dark:text-white/90"
                style={{ fontSize: "22px", letterSpacing: "-0.25px" }}
              >
                {feature.title}
              </h3>
              <p className="text-[16px] font-normal leading-relaxed text-[#615d59] dark:text-white/55">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
