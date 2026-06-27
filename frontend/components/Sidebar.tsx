"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Mail,
  User,
  Settings,
  Bot,
  FileBadge,
  Globe,
  Newspaper,
} from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Jobs",
      href: "/jobs",
      icon: Briefcase,
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
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      name: "Agent",
      href: "/agent",
      icon: Bot,
    },
    {
      name: "LinkedIn Leads",
      href: "/linkedin",
      icon: Globe,
    },
    {
  name: "Hacker News",
  href: "/hackernews",
  icon: Newspaper,
},
    {
      name: "Resume",
      href: "/resume",
      icon: FileBadge,
    },
    
  ];

  return (
    <aside className="w-64 min-h-screen bg-zinc-950 border-r border-zinc-800 text-white">

      <div className="px-6 py-8 border-b border-zinc-800">

        <h1 className="text-xl font-semibold tracking-tight">
          Project22
        </h1>

        <p className="text-zinc-500 text-sm mt-1">
          AI Job Agent
        </p>

      </div>

      <nav className="p-4">

        <div className="flex flex-col gap-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  text-zinc-300
                  hover:bg-zinc-900
                  hover:text-white
                  transition-all
                  duration-200
                "
              >
                <Icon size={18} />

                <span className="text-sm font-medium">
                  {item.name}
                </span>
              </Link>
            );
          })}

        </div>

      </nav>

      <div className="absolute bottom-6 left-6">

        <div className="text-xs text-zinc-600">
          Version 1.0
        </div>

      </div>

    </aside>
  );
}