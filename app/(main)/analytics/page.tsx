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

type DayData = {
  date: string;
  hours: number;
};

// 🔹 Convert hours → intensity
function getLevel(hours: number) {
  if (hours === 0) return 0;
  if (hours < 2) return 1;
  if (hours < 5) return 2;
  return 3;
}

// 🔹 Generate last 90 days (TEMP data)
function generateDays(): DayData[] {
  const days: DayData[] = [];
  const today = new Date();

  for (let i = 0; i < 90; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);

    days.push({
      date: d.toISOString().split("T")[0],
      hours: Math.floor(Math.random() * 6), // replace with real data later
    });
  }

  return days.reverse();
}

// 🔹 Chart data
const activityData = [
  { date: "Mar 22", hours: 2 },
  { date: "Mar 23", hours: 5 },
  { date: "Mar 24", hours: 3 },
  { date: "Mar 25", hours: 6 },
  { date: "Mar 26", hours: 2 },
  { date: "Mar 27", hours: 1 },
  { date: "Mar 28", hours: 4 },
  { date: "Mar 29", hours: 5 },
  { date: "Mar 30", hours: 6 },
  { date: "Mar 31", hours: 3 },
  { date: "Apr 01", hours: 5 },
  { date: "Apr 02", hours: 2 },
  { date: "Apr 03", hours: 6 },
  { date: "Apr 04", hours: 3 },
  { date: "Apr 05", hours: 2 },
  { date: "Apr 06", hours: 4 },
  { date: "Apr 07", hours: 4 },
  { date: "Apr 08", hours: 3 },
  { date: "Apr 09", hours: 2 },
  { date: "Apr 10", hours: 2 },
  { date: "Apr 11", hours: 3 },
  { date: "Apr 12", hours: 5 },
  { date: "Apr 13", hours: 4 },
  { date: "Apr 14", hours: 5 },
  { date: "Apr 15", hours: 2 },
  { date: "Apr 16", hours: 3 },
  { date: "Apr 17", hours: 4 },
  { date: "Apr 18", hours: 6 },
];

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
  const [days, setDays] = useState<DayData[]>([]);

  //  FIX hydration issue
  useEffect(() => {
    setDays(generateDays());
  }, []);

  return (
    <div className="p-6 space-y-6 bg-slate-950 min-h-screen text-white">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Deep Analytics</h1>
        <p className="text-slate-400">
          Detailed breakdown of your development time.
        </p>
      </div>

      {/* Activity Chart */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="mb-4 text-lg font-semibold">30-Day Activity</h2>

        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={activityData}>
            <XAxis dataKey="date" stroke="#64748B" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#6366F1"
              fill="url(#colorGradient)"
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/*  Donut Chart */}
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
                {techData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
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

        {/* 🟦 Heatmap */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h2 className="mb-4 text-lg font-semibold">Consistency Map</h2>

          {days.length > 0 && (
            <div className="flex gap-1 overflow-x-auto">
              {Array.from({
                length: Math.ceil(days.length / 7),
              }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1 ">
                  {days
                    .slice(weekIndex * 7, weekIndex * 7 + 7)
                    .map((day, i) => {
                      const level = getLevel(day.hours);

                      return (
                        <div
                          key={i}
                          title={`${day.date} - ${day.hours}h`}
                          className={`
                            w-3 h-3 rounded-sm
                            ${
                              level === 0
                                ? "bg-slate-800"
                                : level === 1
                                ? "bg-indigo-900"
                                : level === 2
                                ? "bg-indigo-600"
                                : "bg-indigo-400"
                            }
                          `}
                        />
                      );
                    })}
                </div>
              ))}
            </div>
          )}

          {/* Legend */}
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