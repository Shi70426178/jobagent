"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Menu,
  X,
  LayoutDashboard,
  Bot,
  Globe,
  Newspaper,
  FileText,
  Mail,
  User,
  FileBadge,
  Sparkles,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { useAuthStore } from "@/store/authStore";

export default function MobileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/login");
  };

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Job Agent", href: "/agent", icon: Bot },
    { name: "View Jobs", href: "/new-jobs", icon: Globe },
    { name: "Walkin Jobs", href: "/walkins", icon: Newspaper },
    { name: "Applications", href: "/applications", icon: FileText },
    { name: "Gmail", href: "/gmail", icon: Mail },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Resume", href: "/resume", icon: FileBadge },
  ];

  return (
    <>
      {/* Top Mobile Navbar */}
      <div className="fixed top-0 left-0 right-0 z-[60] flex h-16 items-center justify-between border-b border-zinc-800/80 bg-black px-4 lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-white"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">oneXjob</h1>
            <p className="text-[10px] text-zinc-400">AI Career Assistant</p>
          </div>
        </div>

        <div className="w-8" />
      </div>

      {/* Backdrop Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[65] bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 z-[70] flex h-screen w-64 flex-col border-r border-zinc-800/80 bg-black transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">oneXjob</h1>
              <p className="text-[10px] text-zinc-400">AI Career Assistant</p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-all duration-200 ${
                    active
                      ? "border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 to-blue-950/30 text-white"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ${
                        active
                          ? "bg-cyan-500/20 text-cyan-400"
                          : "bg-zinc-900 text-zinc-400 group-hover:bg-zinc-800 group-hover:text-cyan-400"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <span className={`text-sm font-medium ${active ? "font-semibold text-white" : "text-zinc-300"}`}>
                      {item.name}
                    </span>
                  </div>

                  <ChevronRight
                    size={16}
                    className={`transition-all duration-200 ${
                      active
                        ? "translate-x-0 opacity-100 text-cyan-400"
                        : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="group relative flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-zinc-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 transition-all duration-200 group-hover:bg-red-500/20 group-hover:text-red-400">
                  <LogOut size={18} />
                </div>
                <span className="text-sm font-medium">Logout</span>
              </div>
              <ChevronRight
                size={16}
                className="-translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-red-400"
              />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}