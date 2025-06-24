"use client"
import type React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { User, Home, ShoppingBag, Map, BarChart2, Settings, HelpCircle, Cable } from "lucide-react"

export default function TrackingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)
  const pathname = usePathname()

  const menuItems = [
    { name: "Dashboard", icon: Home, href: "/" },
    { name: "Request", icon: User, href: "/request" },
    { name: "Shipments", icon: ShoppingBag, href: "/shipments" },
    { name: "Tracking", icon: Map, href: "/tracking" },
    { name: "Vendors/LSPs", icon: ShoppingBag, href: "/vendors-lsp" },
    { name: "Workflows", icon: Cable, href: "/workflow" },
    { name: "Analytics", icon: BarChart2, href: "/analytics" },
    { name: "Settings", icon: Settings, href: "/settings" },
    { name: "Help Center", icon: HelpCircle, href: "/help-center" },
  ]

  return <div className="bg-[#f3f2f7] min-h-screen">{children}</div>
}
