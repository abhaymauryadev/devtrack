"use client";

import {
  ChartNoAxesColumnIncreasing,
  LayoutDashboard,
  Logs,
  Timer,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard />,
    path: "/dashboard",
  },
  {
    id: "preivewtracker",
    label: "Preview Tracker",
    icon: <Timer />,
    path: "/previewtracker",
  },
  {
    id: "logs",
    label: "Logs",
    icon: <Logs />,
    path: "/logs",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <ChartNoAxesColumnIncreasing />,
    path: "/analytics",
  },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <>
      {menuItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <button
            key={item.id}
            onClick={() => {
              router.push(item.path);
              setOpen(false); // close on mobile
            }}
            className={`
              w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all 
              ${
                isActive
                  ? "bg-blue-500/20 text-blue-400"
                  : "text-slate-400 hover:text-white hover:bg-white/10"
              }
            `}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        );
      })}
    </>
  );

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* ✅ Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-slate-900 flex items-center justify-between px-4 z-50 border-b border-slate-800">
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>

        {/* <h1 className="font-semibold">{currentPage}</h1> */}
      </div>

      {/* ✅ Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 gap-2 bg-slate-900 flex-col p-6 border-r border-slate-800 transition-all ease-in-out ">
        <SidebarContent />
      </aside>

      {/* ✅ Mobile Sidebar Drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />

          {/* drawer */}
          <div className="absolute left-0 top-0 h-full w-64 bg-slate-900 p-6 shadow-2xl">
            <button className="mb-6" onClick={() => setOpen(false)}>
              <X />
            </button>

            <SidebarContent />
          </div>
        </div>
      )}

      {/* ✅ Main Content */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-6 p-6">
        {children}
      </main>
    </div>
  );
}
