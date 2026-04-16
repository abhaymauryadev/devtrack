"use client";

import {
  ChartNoAxesColumnIncreasing,
  LayoutDashboard,
  Logs,
  Timer,
} from "lucide-react";

import { useRouter, usePathname } from "next/navigation";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
  { id: "tracker", label: "Tracker", icon: <Timer />, path: "/tracker" },
  { id: "logs", label: "Logs", icon: <Logs />, path: "/logs" },
  { id: "analytics", label: "Analytics", icon: <ChartNoAxesColumnIncreasing />, path: "/analytics" },
];

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section>
      <aside className="fixed left-0 top-0 h-screen gap-2 w-64 bg-linear-to-b from-slate-900 to-slate-950 shadow-2xl z-50 flex flex-col p-8 border-r border-slate-800">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className={`
                w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 ease-out
                ${
                  isActive
                    ? "bg-blue-500/20 text-blue-400 border-blue-500"
                    : "text-slate-400 hover:text-white hover:bg-white/10 hover:shadow-md"
                }
                group
              `}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </aside>

      <div className="ml-64 p-6">
        {/* Your page content */}
      </div>
    </section>
  );
}