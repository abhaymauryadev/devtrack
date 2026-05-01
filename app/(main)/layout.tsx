"use client";

import {
  ChartNoAxesColumnIncreasing,
  LayoutDashboard,
  Logs,
  Timer,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard />,
    path: "/dashboard",
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
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [localUser, setLocalUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("current-user");
    if (stored) setLocalUser(JSON.parse(stored));
  }, []);

  const user = session?.user ?? localUser;

  const handleSignOut = () => {
    if (session?.user) {
      signOut({ callbackUrl: "/login" });
    } else {
      localStorage.removeItem("current-user");
      document.cookie = "auth-token=; path=/; max-age=0";
      router.replace("/login");
    }
  };

  const avatarLetter = user?.name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "?";

  const ProfileSection = () => (
    <div className="mt-auto pt-4 border-t border-black/10 dark:border-white/10">
      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f6f5f4] dark:bg-[#242424] border border-black/10 dark:border-white/10">
        {session?.user?.image ? (
          <img
            src={session.user.image}
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-[#f2f9ff] dark:bg-[#1a2c3d] text-[#097fe8] dark:text-[#62aef0] flex items-center justify-center font-semibold text-sm shrink-0 border border-black/10 dark:border-white/10">
            {avatarLetter}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-black/95 dark:text-white/90 truncate">
            {user?.name ?? "Guest"}
          </p>
          <p className="text-xs text-[#615d59] dark:text-[#a39e98] truncate">{user?.email ?? ""}</p>
        </div>
        <button
          onClick={handleSignOut}
          title="Sign out"
          className="text-[#615d59] dark:text-[#a39e98] hover:text-black/95 dark:hover:text-white/90 transition-colors shrink-0"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );

  const SidebarContent = () => (
    <>
      {menuItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <button
            key={item.id}
            onClick={() => {
              router.push(item.path);
              setOpen(false);
            }}
            className={`
              w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all
              ${isActive ? "bg-[#f2f9ff] dark:bg-[#1a2c3d] text-[#097fe8] dark:text-[#62aef0]" : "text-[#615d59] dark:text-[#a39e98] hover:text-black/95 dark:hover:text-white/90 hover:bg-[#f6f5f4] dark:hover:bg-[#242424]"}
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
    <div className="flex min-h-screen bg-white dark:bg-[#191919] text-black/95 dark:text-white/90">
      {/* ✅ Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white dark:bg-[#191919] flex items-center justify-between px-4 z-50 border-b border-black/10 dark:border-white/10">
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* ✅ Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 gap-2 bg-white dark:bg-[#191919] flex-col p-6 border-r border-black/10 dark:border-white/10 transition-all ease-in-out ">
        <SidebarContent />
        <ProfileSection />
      </aside>

      {/* ✅ Mobile Sidebar Drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* overlay */}
          <div className="absolute inset-0 bg-black/25" onClick={() => setOpen(false)} />

          {/* drawer */}
          <div className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-[#191919] p-6 shadow-2xl flex flex-col border-r border-black/10 dark:border-white/10">
            <button className="mb-6" onClick={() => setOpen(false)}>
              <X />
            </button>

            <SidebarContent />
            <ProfileSection />
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
