import Streak from '@/components/Streak';
import React from 'react'

export default function page() {
   const stats = [
    {
      title: "Total Hours",
      value: "22.5",
      suffix: "hrs",
      note: "+12% from last week",
      icon: "🕒",
      iconColor: "text-cyan-400",
    },
    {
      title: "Active Streak",
      value: "14",
      suffix: "days",
      note: "Keep it up!",
      icon: "🔥",
      iconColor: "text-orange-400",
    },
    {
      title: "Sessions",
      value: "8",
      suffix: "logs",
      note: "This week",
      icon: "〰️",
      iconColor: "text-indigo-400",
    },
    {
      title: "Consistency",
      value: "92",
      suffix: "%",
      note: "Top 10% users",
      icon: "📅",
      iconColor: "text-emerald-400",
    },
  ];

  const bars = [
    { day: "Mon", value: 2.6 },
    { day: "Tue", value: 3.8 },
    { day: "Wed", value: 1.2 },
    { day: "Thu", value: 4.5 },
    { day: "Fri", value: 3.1 },
    { day: "Sat", value: 5.4 },
    { day: "Sun", value: 2.0 },
  ];

  return (
     <main className="min-h-screen bg-[#070708] text-white">
      <div className="mx-auto max-w-8xl px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back, Developer
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Here&apos;s your coding activity for this week.
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-zinc-800 bg-[#111113] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm text-zinc-400">{item.title}</p>
                <div className={`rounded-xl bg-zinc-950 p-2 ${item.iconColor}`}>
                  <span className="text-lg">{item.icon}</span>
                </div>
              </div>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-3xl font-semibold">{item.value}</span>
                <span className="pb-1 text-sm text-zinc-400">{item.suffix}</span>
              </div>

              <p className="mt-3 text-sm text-zinc-500">{item.note}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Weekly Progress</h2>
              <select className="rounded-lg border border-zinc-800 bg-[#0c0c0d] px-3 py-2 text-sm text-zinc-300 outline-none">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>

            <div className="flex h-70 items-end justify-between gap-3 px-2">
              {bars.map((bar) => (
                <div key={bar.day} className="flex h-full flex-1 flex-col justify-end">
                  <div className="flex justify-center">
                    <div
                      className="w-full max-w-17.5 rounded-t-md bg-indigo-500/90 shadow-[0_0_18px_rgba(99,102,241,0.25)]"
                      style={{ height: `${bar.value * 42}px` }}
                    />
                  </div>
                  <p className="mt-3 text-center text-xs text-zinc-500">{bar.day}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-6">
            <h2 className="text-xl font-semibold">Recent Badges</h2>

            <div className="flex h-85 flex-col items-center justify-center text-center">
              {/* {/* <div className="flex h-24 w-24 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-4xl shadow-[0_0_40px_rgba(249,115,22,0.18)]"> */}
                
               {/* </div>  */}

              <h3 className="mt-6 text-lg font-semibold"><Streak/></h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-400">
                You&apos;re on fire! Code for 7 more days to unlock the Diamond badge.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
