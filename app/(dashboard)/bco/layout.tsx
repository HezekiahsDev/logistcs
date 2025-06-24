"use client";
import React, { useState } from "react";
import Header from "@/components/Dashboard/Layouts/Header";
import Sidebar from "@/components/Dashboard/Layouts/Sidebar";
import { usePathname } from "next/navigation";
import {
  ChartColumn,
  User,
  HomeIcon,
  ShoppingCart,
  ShipWheel,
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

  const excludePaths = ["/bco/vendors-lsp/add-vendor", "/bco/request/create"];
  const shouldExclude = excludePaths.includes(pathname);

  const menuItems = [
    { name: "Dashboard", icon: HomeIcon, href: "/bco" },
    { name: "Request", icon: User, href: "/bco/request" },
    { name: "Shipments", icon: ShipWheel, href: "/bco/shipments" },
    { name: "Vendors/LSPs", icon: ShoppingCart, href: "/bco/vendors-lsp" },
    { name: "Workflows", icon: Cable, href: "/bco/workflows" },
    { name: "Analytics", icon: ChartColumn, href: "/bco/analytics" },
    { name: "Settings", icon: SlidersHorizontalIcon, href: "/bco/settings" },
    { name: "Help Center", icon: MessageSquareText, href: "/bco/help-center" },
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
          {!shouldExclude && (
            <Header toggleSidebar={toggleSidebar} role="bco" />
          )}
          <section className="overflow-auto flex-1 hide-scrollbar">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
