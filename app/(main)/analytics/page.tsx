"use client";

import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useEffect, useState } from "react";

type Session = {
  startTime: string;
  endTime: string | null;
  duration: number | null;
};

type DayData = {
  date: string;
  hours: number;
};

function getLevel(hours: number) {
  if (hours === 0) return 0;
  if (hours < 2) return 1;
  if (hours < 5) return 2;
  return 3;
}

function buildDayMap(sessions: Session[], days: number): DayData[] {
  const map: Record<string, number> = {};
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    map[d.toISOString().split("T")[0]] = 0;
  }

  for (const s of sessions) {
    const key = new Date(s.startTime).toISOString().split("T")[0];
    if (key in map) {
      map[key] = parseFloat(((map[key] * 3600 + (s.duration ?? 0)) / 3600).toFixed(2));
    }
  }

  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, hours]) => ({ date, hours }));
}

const techData = [
  { name: "React", value: 30 },
  { name: "Node.js", value: 25 },
  { name: "DevOps", value: 15 },
  { name: "DSA", value: 10 },
  { name: "UI/UX", value: 10 },
  { name: "Python", value: 10 },
];

const COLORS = [
  "#6366F1",
  "#06B6D4",
  "#EF4444",
  "#22C55E",
  "#A855F7",
  "#F59E0B",
];

export default function AnalyticsPage() {
  const [activityData, setActivityData] = useState<DayData[]>([]);
  const [heatmapDays, setHeatmapDays] = useState<DayData[]>([]);

  useEffect(() => {
    fetch("/api/v1/session")
      .then((r) => r.json())
      .then((sessions: Session[]) => {
        const thirtyDay = buildDayMap(sessions, 30);
        setActivityData(
          thirtyDay.map((d) => ({
            date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            hours: d.hours,
          }))
        );
        setHeatmapDays(buildDayMap(sessions, 90));
      });
  }, []);

  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-white">
      <div>
        <h1 className="text-2xl font-bold">Deep Analytics</h1>
        <p className="text-slate-400">
          Detailed breakdown of your development time.
        </p>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="mb-4 text-lg font-semibold">30-Day Activity</h2>

        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={activityData}>
            <XAxis dataKey="date" stroke="#64748B" />
            <Tooltip />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#6366F1"
              fill="url(#colorGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="mb-4 text-lg font-semibold">Time by Tech Stack</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={techData}
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
              >
                {techData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-wrap gap-3 mt-4 text-sm">
            {techData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: COLORS[i] }}
                />
                {item.name}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="mb-4 text-lg font-semibold">Consistency Map</h2>

          {heatmapDays.length > 0 && (
            <div className="flex gap-1 overflow-x-auto">
              {Array.from({
                length: Math.ceil(heatmapDays.length / 7),
              }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {heatmapDays
                    .slice(weekIndex * 7, weekIndex * 7 + 7)
                    .map((day, i) => {
                      const level = getLevel(day.hours);
                      return (
                        <div
                          key={i}
                          title={`${day.date} — ${day.hours}h`}
                          className={`w-3 h-3 rounded-sm ${
                            level === 0
                              ? "bg-slate-800"
                              : level === 1
                              ? "bg-indigo-900"
                              : level === 2
                              ? "bg-indigo-600"
                              : "bg-indigo-400"
                          }`}
                        />
                      );
                    })}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-4 text-xs text-slate-400">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-slate-800 rounded-sm" />
              <div className="w-3 h-3 bg-indigo-900 rounded-sm" />
              <div className="w-3 h-3 bg-indigo-600 rounded-sm" />
              <div className="w-3 h-3 bg-indigo-400 rounded-sm" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
