"use client";

import { cn } from "@/utils/utils";
import {
  Home,
  FileText,
  Clock,
  Bookmark,
  Settings,
  MessageCircle,
  Box,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  icon: React.ReactNode;
  isActive?: boolean;
  href: string;
}

function SidebarItem({ icon, isActive, href }: SidebarItemProps) {
  return (
    <Link href={href}>
      <button
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
          "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50",
          isActive &&
            "bg-blue-600 text-white hover:bg-blue-600 hover:text-white",
        )}
      >
        {icon}
      </button>
    </Link>
  );
}

export interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-16 flex-col items-center bg-[#0d1117] py-4",
        className,
      )}
    >
      <div className="mb-6">
        <div className="flex h-10 w-10 items-center justify-center">
          <Box className="h-6 w-6 text-blue-500" />
        </div>
      </div>

      <nav className="flex flex-col items-center gap-2">
        <SidebarItem
          icon={<Home className="h-6 w-6" />}
          isActive={pathname === "/select-teacher"}
          href="/select-teacher"
        />
        <SidebarItem
          icon={<FileText className="h-6 w-6" />}
          isActive={pathname === "/notes"}
          href="/notes"
        />
        <SidebarItem
          icon={<Clock className="h-6 w-6" />}
          isActive={pathname === "/history"}
          href="/history"
        />
        <SidebarItem
          icon={<Bookmark className="h-6 w-6" />}
          isActive={pathname === "/bookmarks"}
          href="/bookmarks"
        />
      </nav>

      <div className="flex-1" />

      <nav className="flex flex-col items-center gap-2">
        <SidebarItem
          icon={<Settings className="h-6 w-6" />}
          isActive={pathname === "/settings"}
          href="/settings"
        />
        <SidebarItem
          icon={<MessageCircle className="h-6 w-6" />}
          isActive={pathname === "/chat"}
          href="/chat"
        />
      </nav>
    </aside>
  );
}
