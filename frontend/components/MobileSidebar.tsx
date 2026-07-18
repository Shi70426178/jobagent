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
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Job Agent",
      href: "/agent",
      icon: Bot,
    },
    {
      name: "View Jobs",
      href: "/new-jobs",
      icon: Globe,
    },
    // {
    //   name: "YC Jobs",
    //   href: "/hackernews",
    //   icon: Newspaper,
    // },
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

            <h1 className="text-lg font-bold">
              oneXjob
            </h1>

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
          flex
          h-screen
          w-72
          flex-col
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

        {/* Header */}

        <div className="flex items-center justify-between border-b border-white/10 p-5">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600">

              <Sparkles />

            </div>

            <div>

              <h1 className="text-xl font-bold">
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

                {/* Navigation */}

        <div className="flex-1 overflow-y-auto p-4">

          <div className="space-y-2">

            {menuItems.map((item) => {

              const Icon = item.icon;

              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`
                    group
                    relative
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    px-4
                    py-3
                    transition-all
                    duration-300

                    ${
                      active
                        ? "border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
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
                        transition-all
                        duration-300

                        ${
                          active
                            ? "bg-cyan-500/20 text-cyan-300"
                            : "bg-zinc-800 text-zinc-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-300"
                        }
                      `}
                    >

                      <Icon size={18} />

                    </div>

                    <span className="font-medium">
                      {item.name}
                    </span>

                  </div>

                  <ChevronRight
                    size={18}
                    className={`
                      transition-all
                      duration-300

                      ${
                        active
                          ? "opacity-100 translate-x-0 text-cyan-300"
                          : "opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100"
                      }
                    `}
                  />

                </Link>
              );

            })}

            {/* Logout */}

            <button
              onClick={handleLogout}
              className="
                group
                relative
                flex
                w-full
                items-center
                justify-between
                rounded-2xl
                px-4
                py-3
                text-zinc-400
                transition-all
                duration-300
                hover:bg-white/5
                hover:text-red-400
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-zinc-800
                    text-zinc-400
                    transition-all
                    duration-300
                    group-hover:bg-red-500/10
                    group-hover:text-red-400
                  "
                >

                  <LogOut size={18} />

                </div>

                <span className="font-medium">
                  Logout
                </span>

              </div>

              <ChevronRight
                size={18}
                className="
                  opacity-0
                  -translate-x-2
                  transition-all
                  duration-300
                  group-hover:translate-x-0
                  group-hover:opacity-100
                  group-hover:text-red-400
                "
              />

            </button>

          </div>

        </div>

          

      </aside>

    </>
  );
}