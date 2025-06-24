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

  const excludePaths = ["/vendors-lsp/add-vendor"];
  const shouldExclude = excludePaths.includes(pathname);

  const menuItems = [
    { name: "Dashboard", icon: HomeIcon, href: "/lsp" },
    { name: "Request", icon: User, href: "/lsp/request" },
    { name: "Shipments", icon: ShipWheel, href: "/lsp/shipments" },
    { name: "Vendors/LSPs", icon: ShoppingCart, href: "/lsp/vendors-lsp" },
    { name: "Workflows", icon: Cable, href: "/lsp/workflows" },
    { name: "Analytics", icon: ChartColumn, href: "/lsp/analytics" },
    { name: "Settings", icon: SlidersHorizontalIcon, href: "/lsp/settings" },
    { name: "Help Center", icon: MessageSquareText, href: "/lsp/help-center" },
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
            <Header toggleSidebar={toggleSidebar} role="lsp" />
          )}
          <section className="overflow-auto flex-1 hide-scrollbar">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
