"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/shell/AppSidebar";
import { AppHeader } from "@/components/shell/AppHeader";
import { CommandPalette } from "@/components/shell/CommandPalette";
import { DemoControlBar } from "@/components/shell/DemoControlBar";

export const AppLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isStandalonePage =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/verify");

  return (
    <div className="min-h-screen bg-[#06070b] text-neutral-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette />

      {/* Floating Demo Control Bar for Judges & Evaluators */}
      <DemoControlBar />

      {isStandalonePage ? (
        <main className="flex-1">{children}</main>
      ) : (
        <div className="flex h-screen overflow-hidden">
          {/* Role-Adaptive Sidebar */}
          <AppSidebar />

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <AppHeader />
            <main className="flex-1 overflow-y-auto px-6 py-8 bg-[#06070b]">
              <div className="mx-auto max-w-7xl">{children}</div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};
