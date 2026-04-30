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
  tags: string[];
};

type DayData = {
  date: string;
  hours: number;
};

type TagData = {
  name: string;
  value: number;
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
      map[key] = parseFloat(
        ((map[key] * 3600 + (s.duration ?? 0)) / 3600).toFixed(2),
      );
    }
  }

  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, hours]) => ({ date, hours }));
}

function buildTagData(sessions: Session[]): TagData[] {
  const totals: Record<string, number> = {};

  for (const s of sessions) {
    if (!s.tags || s.tags.length === 0) continue;
    const durationPerTag = (s.duration ?? 0) / s.tags.length;
    for (const tag of s.tags) {
      totals[tag] = (totals[tag] ?? 0) + durationPerTag;
    }
  }

  const entries = Object.entries(totals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  if (entries.length === 0) return [];

  return entries.map(([name, secs]) => ({
    name,
    value: Math.round(secs / 60),
  }));
}

const COLORS = [
  "#0075DE", "#62AEF0", "#2A9D99", "#1AAE39",
  "#391C57", "#DD5B00", "#FF64C8", "#523410",
];

const FALLBACK_TAG_DATA: TagData[] = [
  { name: "React", value: 30 },
  { name: "Node.js", value: 25 },
  { name: "DevOps", value: 15 },
  { name: "DSA", value: 10 },
  { name: "UI/UX", value: 10 },
  { name: "Python", value: 10 },
];

export default function AnalyticsPage() {
  const [activityData, setActivityData] = useState<DayData[]>([]);
  const [heatmapDays, setHeatmapDays] = useState<DayData[]>([]);
  const [tagData, setTagData] = useState<TagData[]>([]);
  const [hasRealTags, setHasRealTags] = useState(false);

  useEffect(() => {
    fetch("/api/v1/session")
      .then((r) => r.json())
      .then((sessions: Session[]) => {
        const thirtyDay = buildDayMap(sessions, 30);
        setActivityData(
          thirtyDay.map((d) => ({
            date: new Date(d.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            hours: d.hours,
          })),
        );
        setHeatmapDays(buildDayMap(sessions, 90));

        const computed = buildTagData(sessions);
        if (computed.length > 0) {
          setTagData(computed);
          setHasRealTags(true);
        } else {
          setTagData(FALLBACK_TAG_DATA);
          setHasRealTags(false);
        }
      });
  }, []);

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen text-black/95">
      <div>
        <h1 className="text-4xl font-bold tracking-tight" style={{ letterSpacing: "-1.5px" }}>Deep Analytics</h1>
        <p className="text-[#615d59] mt-1">
          Detailed breakdown of your development time.
        </p>
      </div>

      <div className="bg-[#f6f5f4] p-6 rounded-2xl border border-black/10" style={{ boxShadow: "var(--shadow-card)" }}>
        <h2 className="mb-4 text-lg font-semibold">30-Day Activity</h2>

        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={activityData}>
            <XAxis dataKey="date" stroke="#615d59" />
            <Tooltip />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0075DE" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#0075DE" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#0075DE"
              fill="url(#colorGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-black/10" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Time by Tag</h2>
            {!hasRealTags && (
              <span className="text-xs text-[#097fe8] bg-[#f2f9ff] px-2 py-1 rounded-full border border-black/10">
                Sample data — add tags in the timer
              </span>
            )}
          </div>

          {tagData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={tagData}
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {tagData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) =>
                      hasRealTags ? [`${value} min`, ""] : [`${value}%`, ""]
                    }
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="flex flex-wrap gap-3 mt-4 text-sm">
                {tagData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ background: COLORS[i % COLORS.length] }}
                    />
                    <span className="text-black/95">{item.name}</span>
                    <span className="text-[#615d59] text-xs">
                      {hasRealTags ? `${item.value}m` : `${item.value}%`}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-62.5 text-[#615d59] text-sm">
              No tag data yet. Add tags to your sessions from the timer.
            </div>
          )}
        </div>

        <div className="bg-[#f6f5f4] p-6 rounded-2xl border border-black/10" style={{ boxShadow: "var(--shadow-card)" }}>
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
                              ? "bg-[#ece9e6]"
                              : level === 1
                              ? "bg-[#cce6fa]"
                              : level === 2
                              ? "bg-[#62aef0]"
                              : "bg-[#0075de]"
                          }`}
                        />
                      );
                    })}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-4 text-xs text-[#615d59]">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-[#ece9e6] rounded-sm" />
              <div className="w-3 h-3 bg-[#cce6fa] rounded-sm" />
              <div className="w-3 h-3 bg-[#62aef0] rounded-sm" />
              <div className="w-3 h-3 bg-[#0075de] rounded-sm" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
