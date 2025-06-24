"use client"

import { useShipment } from "../context/ShipmentContext"
import ShipmentTabs from "../tab/Shipment-Tab"
import ShipmentHeader from "./Shipment-header"

export default function ShipmentContent() {
  const { shipmentData } = useShipment()

  return (
    <>
      <ShipmentHeader shipmentData={shipmentData} />
      <ShipmentTabs />
    </>
  )
}
