"use client";

export default function TimerControls({
  minutes,
  setMinutes,
  setTheme,
}: any) {
  return (
    <div className="space-y-6 text-white">
      <h2 className="text-xl font-bold">Customize Timer</h2>

      {/* Duration */}
      <div>
        <label className="block mb-2 text-sm">Focus Minutes</label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
        />
      </div>

      {/* Theme */}
      <div>
        <label className="block mb-2 text-sm">Theme</label>
        <select
          onChange={(e) => setTheme(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
        >
          <option value="focus">Focus</option>
          <option value="break">Break</option>
          <option value="deep">Deep Work</option>
        </select>
      </div>
    </div>
  );
}