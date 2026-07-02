"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
} from "lucide-react";

export default function MobileSidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Agent",
      href: "/agent",
      icon: Bot,
    },
    {
      name: "New Jobs",
      href: "/new-jobs",
      icon: Globe,
    },
    {
      name: "YC Jobs",
      href: "/hackernews",
      icon: Newspaper,
    },
    {
      name: "Applications",
      href: "/applications",
      icon: FileText,
    },
    {
      name: "Gmail",
      href: "/gmail",
      icon: Mail,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
    {
      name: "Resume",
      href: "/resume",
      icon: FileBadge,
    },
  ];

  return (
    <>
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-[60] flex h-16 items-center justify-between border-b border-white/10 bg-[#050816]/90 px-4 backdrop-blur-xl lg:hidden">

        <button
          onClick={() => setOpen(true)}
          className="rounded-xl border border-white/10 bg-white/5 p-2"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600">
            <Sparkles size={20} />
          </div>

          <div>
            <h1 className="font-bold text-lg">oneXjob</h1>

            <p className="text-[10px] text-zinc-400">
              AI Career Assistant
            </p>
          </div>
        </div>

        <div className="w-8" />
      </div>

      {/* Overlay */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[65] bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Drawer */}

      <aside
        className={`
        fixed
        top-0
        left-0
        z-[70]
        h-screen
        w-72
        border-r
        border-white/10
        bg-[#050816]
        backdrop-blur-2xl
        transition-transform
        duration-300
        lg:hidden

        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600">

              <Sparkles />

            </div>

            <div>

              <h1 className="font-bold text-xl">
                oneXjob
              </h1>

              <p className="text-xs text-zinc-400">
                AI Career Assistant
              </p>

            </div>

          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 hover:bg-white/10"
          >
            <X />
          </button>

        </div>

        <nav className="p-4 space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all

                ${
                  active
                    ? "bg-cyan-500/20 border border-cyan-500/30"
                    : "hover:bg-white/5"
                }
                `}
              >
                <div className="flex items-center gap-4">

                  <div
                    className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl

                    ${
                      active
                        ? "bg-cyan-500/20"
                        : "bg-zinc-800"
                    }
                  `}
                  >
                    <Icon size={18} />
                  </div>

                  <span>{item.name}</span>

                </div>

                <ChevronRight size={18} />

              </Link>
            );
          })}

        </nav>
      </aside>
    </>
  );
}