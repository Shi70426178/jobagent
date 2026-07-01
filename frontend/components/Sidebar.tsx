"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Mail,
  User,
  Bot,
  FileBadge,
  Globe,
  Newspaper,
  Sparkles,
  ChevronRight,
  Cpu,
} from "lucide-react";

export default function Sidebar() {

  const pathname = usePathname();

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
    // {
    //   name: "Agent",
    //   href: "/agent",
    //   icon: Bot,
    // },
    // {
    //   name: "New Jobs",
    //   href: "/new-jobs",
    //   icon: Globe,
    // },
    // {
    //   name: "YC Jobs",
    //   href: "/hackernews",
    //   icon: Newspaper,
    // },
    {
      name: "Resume",
      href: "/resume",
      icon: FileBadge,
    },
  ];
 return (

  <aside className="relative w-72 min-h-screen overflow-hidden border-r border-white/10 bg-black/35 backdrop-blur-2xl">

    {/* Background Glow */}

    <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />

    <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-600/10 blur-[140px]" />

    <div className="relative z-10 flex h-full flex-col">

      {/* Header */}

      <div className="border-b border-white/10 p-7">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 shadow-xl shadow-cyan-500/20">

            <Sparkles className="h-7 w-7 text-white" />

          </div>

          <div>

            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent">

              TalentifyX

            </h1>

            <p className="text-xs text-zinc-400 mt-1">

              AI Career Assistant

            </p>

          </div>

        </div>

        {/* Agent Status */}

        <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">

          <div className="flex items-center gap-3">

            <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>

            <span className="text-sm font-medium text-green-300">

              AI Agent Online

            </span>

          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">

            <Cpu className="h-4 w-4 text-cyan-400" />

            Monitoring Jobs 24×7

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">

        <div className="space-y-2">
          {menuItems.map((item) => {

  const Icon = item.icon;

  const isActive =
    pathname === item.href;

  return (

    <Link
      key={item.href}
      href={item.href}
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
          isActive
            ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 text-white"
            : "text-zinc-400 hover:bg-white/5 hover:text-white"
        }
      `}
    >

      {/* Left */}

      <div className="flex items-center gap-4">

        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            transition-all
            duration-300

            ${
              isActive
                ? "bg-cyan-500/20 text-cyan-300"
                : "bg-zinc-800/60 text-zinc-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-300"
            }
          `}
        >

          <Icon size={19} />

        </div>

        <span className="font-medium">

          {item.name}

        </span>

      </div>

      {/* Right Arrow */}

      <ChevronRight
        size={18}
        className={`
          transition-all
          duration-300

          ${
            isActive
              ? "opacity-100 translate-x-0 text-cyan-300"
              : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
          }
        `}
      />

      {/* Active Indicator */}

      {isActive && (

        <div
          className="
            absolute
            left-0
            top-3
            h-8
            w-1
            rounded-r-full
            bg-gradient-to-b
            from-cyan-400
            to-blue-500
          "
        />

      )}

    </Link>

  );

})}
        </div>
      </nav>{/* Footer */}

<div className="border-t border-white/10 p-5">

  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">

    <div className="flex items-center gap-4">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">

        <Bot className="h-6 w-6 text-white" />

      </div>

      <div>

        <h3 className="font-semibold text-white">
          TalentifyX AI
        </h3>

        <p className="text-xs text-zinc-400">
          Smart Career Assistant
        </p>

      </div>

    </div>

    <div className="mt-5 flex items-center justify-between">

      <div>

        <p className="text-xs text-zinc-500">
          Version
        </p>

        <p className="text-sm font-semibold text-cyan-400">
          v1.0.0
        </p>

      </div>

      <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-2">

        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>

        <span className="text-xs text-green-300">
          Online
        </span>

      </div>

    </div>

  </div>

</div>

</div>

</aside>);

}