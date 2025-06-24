"use client"

import { InvoiceContent } from "../components/InvoiceContent"
import { useShipment } from "../context/ShipmentContext"


export default function InvoiceTab() {
  const { shipmentData, timelineData, handleRecordPayment, handleMakePayment, handleViewQuoteDetails } = useShipment()

  return (
    <InvoiceContent
      data={shipmentData}
      timelineData={timelineData}
      onRecordPayment={handleRecordPayment}
      onMakePayment={handleMakePayment}
      onViewQuoteDetails={handleViewQuoteDetails}
    />
  )
}
