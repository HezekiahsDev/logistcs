"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface UIContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
  activeNavItem: string
  setActiveNavItem: (item: string) => void
  notificationsOpen: boolean
  setNotificationsOpen: (open: boolean) => void
  settingsOpen: boolean
  setSettingsOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export function UIProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState("vendor-payments")
  const [activeNavItem, setActiveNavItem] = useState("Shipments")
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <UIContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeNavItem,
        setActiveNavItem,
        notificationsOpen,
        setNotificationsOpen,
        settingsOpen,
        setSettingsOpen,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider")
  }
  return context
}
