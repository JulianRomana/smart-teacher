"use client";

import { cn } from "@/lib/utils";
import {
  Home,
  FileText,
  Clock,
  Bookmark,
  Settings,
  MessageCircle,
  Box,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  label: string;
}

function SidebarItem({ icon, isActive, onClick, label }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
        "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50",
        isActive && "bg-blue-600 text-white hover:bg-blue-600 hover:text-white"
      )}
    >
      {icon}
    </button>
  );
}

export interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
  className?: string;
}

export function Sidebar({ activeItem = "notes", onItemClick, className }: SidebarProps) {
  const handleClick = (item: string) => {
    onItemClick?.(item);
  };

  return (
    <aside
      className={cn(
        "flex h-full w-16 flex-col items-center bg-[#0d1117] py-4",
        className
      )}
    >
      {/* Logo */}
      <div className="mb-6">
        <div className="flex h-10 w-10 items-center justify-center">
          <Box className="h-6 w-6 text-blue-500" />
        </div>
      </div>

      {/* Top navigation items */}
      <nav className="flex flex-col items-center gap-2">
        <SidebarItem
          icon={<Home className="h-6 w-6" />}
          isActive={activeItem === "home"}
          onClick={() => handleClick("home")}
          label="Home"
        />
        <SidebarItem
          icon={<FileText className="h-6 w-6" />}
          isActive={activeItem === "notes"}
          onClick={() => handleClick("notes")}
          label="Notes"
        />
        <SidebarItem
          icon={<Clock className="h-6 w-6" />}
          isActive={activeItem === "history"}
          onClick={() => handleClick("history")}
          label="History"
        />
        <SidebarItem
          icon={<Bookmark className="h-6 w-6" />}
          isActive={activeItem === "bookmarks"}
          onClick={() => handleClick("bookmarks")}
          label="Bookmarks"
        />
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom navigation items */}
      <nav className="flex flex-col items-center gap-2">
        <SidebarItem
          icon={<Settings className="h-6 w-6" />}
          isActive={activeItem === "settings"}
          onClick={() => handleClick("settings")}
          label="Settings"
        />
        <SidebarItem
          icon={<MessageCircle className="h-6 w-6" />}
          isActive={activeItem === "chat"}
          onClick={() => handleClick("chat")}
          label="Chat"
        />
      </nav>
    </aside>
  );
}
