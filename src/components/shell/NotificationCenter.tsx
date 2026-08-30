"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useAppState } from "@/context/AppStateContext";
import {
  Bell,
  AlertTriangle,
  Sparkles,
  FileCheck,
  Building,
  Check,
  ExternalLink,
  X,
} from "lucide-react";

export const NotificationCenter: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { notifications, markNotificationAsRead } = useAppState();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "attendance":
        return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      case "ai":
        return <Sparkles className="h-4 w-4 text-indigo-400" />;
      case "assignment":
        return <FileCheck className="h-4 w-4 text-emerald-400" />;
      default:
        return <Building className="h-4 w-4 text-cyan-400" />;
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-3 w-96 rounded-2xl border border-white/10 bg-[#0e111a]/95 backdrop-blur-2xl shadow-2xl shadow-black/80 z-50 overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-bold text-neutral-200">Intelligence Notifications</span>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-neutral-400 hover:bg-white/5 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="max-h-[380px] overflow-y-auto divide-y divide-white/5">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-xs text-neutral-400">
            No notifications available
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3.5 transition-colors ${
                notif.read ? "bg-transparent opacity-75" : "bg-white/[0.03]"
              } hover:bg-white/[0.06]`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg p-1.5 bg-white/5 border border-white/5">
                  {getCategoryIcon(notif.category)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-semibold text-neutral-100">{notif.title}</h5>
                    <span className="text-[10px] text-neutral-400">{notif.timestamp}</span>
                  </div>

                  <p className="text-[11px] text-neutral-300 leading-relaxed">
                    {notif.description}
                  </p>

                  <div className="flex items-center gap-2 pt-1.5">
                    {notif.actionUrl && (
                      <Link
                        href={notif.actionUrl}
                        onClick={() => {
                          markNotificationAsRead(notif.id);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-400 hover:text-indigo-300"
                      >
                        Open Action <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    )}

                    {!notif.read && (
                      <button
                        onClick={() => markNotificationAsRead(notif.id)}
                        className="inline-flex items-center gap-1 text-[10px] text-neutral-400 hover:text-neutral-200"
                      >
                        <Check className="h-2.5 w-2.5" /> Mark read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="px-4 py-2 bg-white/[0.02] border-t border-white/5 text-center">
        <span className="text-[10px] text-neutral-400">
          Smart Campus Event Notification Bus
        </span>
      </div>
    </div>
  );
};
