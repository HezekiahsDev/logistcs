"use client"

import { useState } from "react"
import { NavItemType, TabType, TimelineItemType, } from "../types"
import { mockTimelineData } from "../lib/data"


export function useShipment() {
//   const [shipmentData, setShipmentData] = useState<ShipmentData>(mockShipmentData)
  const [timelineData, setTimelineData] = useState<TimelineItemType[]>(mockTimelineData)
  const [activeTab, setActiveTab] = useState<TabType>("Invoices")
  const [activeNavItem, setActiveNavItem] = useState<NavItemType>("Shipments")

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab)
  }

  const handleNavItemClick = (item: NavItemType) => {
    setActiveNavItem(item)
  }

  const handleRecordPayment = () => {
    alert("Recording payment...")
    // In a real application, this would call an API to record the payment
  }

  const handleMakePayment = () => {
    alert("Making payment...")
    // In a real application, this would navigate to a payment page or open a payment modal
  }

  const handleViewQuoteDetails = () => {
    alert("Viewing quote details...")
    // In a real application, this would navigate to a quote details page or open a modal
  }

  return {
    // shipmentData,
    timelineData,
    activeTab,
    activeNavItem,
    handleTabClick,
    handleNavItemClick,
    handleRecordPayment,
    handleMakePayment,
    handleViewQuoteDetails,
  }
}
