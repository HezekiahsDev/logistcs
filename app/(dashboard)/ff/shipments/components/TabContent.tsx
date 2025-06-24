import { ShipmentData, TabType, TimelineItemType } from "../types"
import { InvoiceContent } from "./InvoiceContent"


interface TabContentProps {
  activeTab: TabType
  shipmentData: ShipmentData
  timelineData: TimelineItemType[]
  onRecordPayment: () => void
  onMakePayment: () => void
  onViewQuoteDetails: () => void
}

export function TabContent({
    activeTab,
    shipmentData,
    timelineData,
    onRecordPayment,
    onMakePayment,
    onViewQuoteDetails,
  }: TabContentProps) {
    if (activeTab === "Invoices") {
      return (
        <InvoiceContent
          data={shipmentData}
          timelineData={timelineData}
          onRecordPayment={onRecordPayment}
          onMakePayment={onMakePayment}
          onViewQuoteDetails={onViewQuoteDetails}
        />
      )
    }
}