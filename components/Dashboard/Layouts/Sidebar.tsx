"use client";
import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Define types for the menu items
export interface MenuItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string | number;
}

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  menuItems: MenuItem[];
  logo?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  footerText?: {
    copyright: string;
    rightsReserved: string;
  };
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({
  isOpen,
  toggleSidebar,
  menuItems,
  logo = {
    src: "/placeholder.svg?height=40&width=120",
    alt: "logo",
    width: 120,
    height: 40,
  },
  footerText = {
    copyright: `UbuntuPortal © ${new Date().getFullYear()}`,
    rightsReserved: "All Rights Reserved",
  },
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-white border-r border-gray-200 h-screen flex flex-col fixed z-50 md:static shadow-lg md:shadow-none transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center">
                <Image
                  width={logo.width}
                  height={logo.height}
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  className="h-8 w-auto"
                  priority
                />
              </div>
            )}

            {/* Mobile close button */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 md:hidden transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Desktop collapse button */}
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isItemActive = isActive(item.href);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        toggleSidebar();
                      }
                    }}
                    className={cn(
                      "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                      isItemActive
                        ? "bg-blue-50 text-blue-700 shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 flex-shrink-0 transition-colors",
                        isItemActive
                          ? "text-blue-600"
                          : "text-gray-400 group-hover:text-gray-600",
                        isCollapsed ? "mx-auto" : "mr-3"
                      )}
                    />

                    {!isCollapsed && (
                      <>
                        <span className="truncate">{item.name}</span>
                        {item.badge && (
                          <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-medium">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}

                    {/* Active indicator */}
                    {isItemActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full" />
                    )}

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                        {item.name}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900" />
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-100">
            <div className="text-center text-xs text-gray-500 leading-relaxed">
              <div className="font-medium">{footerText.copyright}</div>
              <div>{footerText.rightsReserved}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
