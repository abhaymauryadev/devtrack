import Streak from "@/components/Streak";
import { getAllSessions } from "@/models/session.model";
import type { Session } from "@prisma/client";

function getWeekBounds() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon...
  const diffToMon = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMon);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return { monday, sunday };
}

function calcStreak(sessions: { startTime: Date }[]) {
  const days = [
    ...new Set(
      sessions
        .map((s) => {
          const d = new Date(s.startTime);
          return isNaN(d.getTime()) ? null : d.toISOString().split("T")[0];
        })
        .filter(Boolean) as string[],
    ),
  ].sort((a, b) => b.localeCompare(a));

  let streak = 0;
  let current = new Date();
  current.setHours(0, 0, 0, 0);

  for (const day of days) {
    const sessionDate = new Date(day);
    sessionDate.setHours(0, 0, 0, 0);
    const diff =
      (current.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 0 || diff === 1) {
      streak++;
      current = sessionDate;
    } else {
      break;
    }
  }
  return streak;
}

export default async function page() {
  const allSessions = await getAllSessions();
  const { monday, sunday } = getWeekBounds();

  const weekSessions = allSessions.filter((s: Session) => {
    const t = new Date(s.startTime).getTime();
    return t >= monday.getTime() && t <= sunday.getTime();
  });

  const totalSeconds = weekSessions.reduce(
    (sum: number, s: Session) => sum + (s.duration ?? 0),
    0,
  );
  const totalHours = parseFloat((totalSeconds / 3600).toFixed(1));

  const streak = calcStreak(allSessions);

  const daysWithSession = new Set(
    weekSessions.map((s: Session) => new Date(s.startTime).toISOString().split("T")[0]),
  );
  const consistency = Math.round((daysWithSession.size / 7) * 100);

  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const bars = dayLabels.map((label, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];
    const daySessions = weekSessions.filter(
      (s: Session) => new Date(s.startTime).toISOString().split("T")[0] === dateStr,
    );
    const secs = daySessions.reduce((sum: number, s: Session) => sum + (s.duration ?? 0), 0);
    return { day: label, value: parseFloat((secs / 3600).toFixed(2)) };
  });

  const maxBar = Math.max(...bars.map((b) => b.value), 1);

  const stats = [
    {
      title: "Total Hours",
      value: totalHours.toString(),
      suffix: "hrs",
      note: "This week",
      icon: "🕒",
      iconColor: "text-cyan-400",
    },
    {
      title: "Active Streak",
      value: streak.toString(),
      suffix: "days",
      note: streak > 0 ? "Keep it up!" : "Start coding today!",
      icon: "🔥",
      iconColor: "text-orange-400",
    },
    {
      title: "Sessions",
      value: weekSessions.length.toString(),
      suffix: "logs",
      note: "This week",
      icon: "〰️",
      iconColor: "text-indigo-400",
    },
    {
      title: "Consistency",
      value: consistency.toString(),
      suffix: "%",
      note: `${daysWithSession.size}/7 days active`,
      icon: "📅",
      iconColor: "text-emerald-400",
    },
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
                <span className="pb-1 text-sm text-zinc-400">
                  {item.suffix}
                </span>
              </div>

              <p className="mt-3 text-sm text-zinc-500">{item.note}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-5 xl:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Weekly Progress</h2>
            </div>

            <div className="flex h-70 items-end justify-between gap-3 px-2">
              {bars.map((bar) => (
                <div
                  key={bar.day}
                  className="flex h-full flex-1 flex-col justify-end"
                >
                  <div className="flex justify-center">
                    <div
                      className="w-full max-w-17.5 rounded-t-md bg-indigo-500/90 shadow-[0_0_18px_rgba(99,102,241,0.25)]"
                      style={{ height: `${(bar.value / maxBar) * 240}px` }}
                    />
                  </div>
                  <p className="mt-3 text-center text-xs text-zinc-500">
                    {bar.day}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-6">
            <h2 className="text-xl font-semibold">Recent Badges</h2>

            <div className="flex h-85 flex-col items-center justify-center text-center">
              <h3 className="mt-6 text-lg font-semibold">
                <Streak />
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-400">
                You&apos;re on fire! Code for 7 more days to unlock the Diamond
                badge.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
