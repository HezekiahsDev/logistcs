"use client";
import React, { useState } from "react";
import Header from "@/components/Dashboard/Layouts/Header";
import Sidebar from "@/components/Dashboard/Layouts/Sidebar";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import {
  ChartColumn,
  User,
  HomeIcon,
  ShoppingCart,
  ShipWheel,
  Map,
  ChartBarIncreasing,
  SlidersHorizontalIcon,
  Cable,
  MessageSquareText,
} from "lucide-react";

export default function Rootayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const pathname = usePathname();

  const excludePaths = ["/ff/vendors-lsp/add-vendor"];
  const shouldExclude = excludePaths.includes(pathname);

  const menuItems = [
    { name: "Dashboard", icon: HomeIcon, href: "/ff" },
    { name: "Request", icon: User, href: "/ff/request" },
    { name: "Chartering", icon: ChartBarIncreasing, href: "/ff/chartering" },
    { name: "Shipments", icon: ShipWheel, href: "/ff/shipments" },
    { name: "Tracking", icon: Map, href: "/ff/tracking" },
    { name: "Vendors/LSPs", icon: ShoppingCart, href: "/ff/vendors-lsp" },
    { name: "Workflows", icon: Cable, href: "/ff/workflow" },
    { name: "Analytics", icon: ChartColumn, href: "/ff/analytics" },
    { name: "Settings", icon: SlidersHorizontalIcon, href: "/ff/settings" },
    { name: "Help Center", icon: MessageSquareText, href: "/ff/help-center" },
  ];

  return (
    <main className="bg-gray-100 min-h-screen">
      <div className="h-screen flex">
        {!shouldExclude && (
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            menuItems={menuItems}
            isCollapsed={isCollapsed}
            onToggleCollapse={toggleCollapse}
          />
        )}
        <div className="w-full overflow-hidden flex flex-col">
          {!shouldExclude && <Header toggleSidebar={toggleSidebar} role="ff" />}
          <section className="overflow-auto flex-1 hide-scrollbar">
            {children}
            <Toaster />
          </section>
        </div>
      </div>
    </main>
  );
}
