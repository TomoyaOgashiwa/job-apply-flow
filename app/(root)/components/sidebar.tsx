"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  FileText,
} from "lucide-react";
import { cn } from "@/libs/utils";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Applications",
    href: "/apply-list",
    icon: FileText,
  },
  // {
  //   name: "Companies",
  //   href: "/companies",
  //   icon: Building2,
  // },
  // {
  //   name: "Resumes",
  //   href: "/resumes",
  //   icon: FileUser,
  // },
  // {
  //   name: "Interviews",
  //   href: "/interviews",
  //   icon: Calendar,
  // },
  // {
  //   name: "Settings",
  //   href: "/settings",
  //   icon: Settings,
  // },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Toggle button when sidebar is closed */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed left-4 top-4 z-50 rounded-lg bg-white p-2 shadow-lg transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Open sidebar"
          aria-expanded="false"
          aria-controls="sidebar-navigation"
        >
          <ChevronRight className="h-6 w-6" aria-hidden="true" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        id="sidebar-navigation"
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-gray-800",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
      >
        <div className="flex h-full flex-col">
          {/* Header with logo and close button */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-blue-500 p-2">
                <FileText className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Job Apply Flow
              </span>
            </div>
            <button
              onClick={toggleSidebar}
              className="rounded-lg p-2 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:bg-gray-700"
              aria-label="Close sidebar"
              aria-expanded="true"
              aria-controls="sidebar-navigation"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4" aria-label="Main menu">
            <ul className="space-y-2" role="list">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href as never}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                      aria-label={item.name}
                    >
                      <Icon
                        className="h-5 w-5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 dark:border-gray-700">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              © 2025 Job Apply Flow
            </p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}
