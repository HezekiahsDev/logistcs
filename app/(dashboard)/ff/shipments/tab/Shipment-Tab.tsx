"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useUI } from "../context/UIContext"
import ShipmentOverview from "../components/Shipment-Overview"
import VendorPayments from "../components/Vendors-Payment"
import InvoiceTab from "./Invoice-tab"
import DocumentsTab from "../components/Document"


export default function ShipmentTabs() {
  const { activeTab, setActiveTab } = useUI()

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <Tabs defaultValue="vendor-payments" value={activeTab} onValueChange={handleTabChange} className="w-full p-6">
      <TabsList className="mb-6 bg-transparent w-full justify-start">
        <TabsTrigger
          value="shipment-overview"
          className="px-6 py-3 data-[state=active]:text-[#000] data-[state=active]:border-b-2 data-[state=active]:border-[#000] data-[state=active]:shadow-none rounded-none bg-transparent"
        >
          Shipment Overview
        </TabsTrigger>
        <TabsTrigger
          value="vendor-payments"
          className="px-6 py-3 data-[state=active]:text-[#000] data-[state=active]:border-b-2 data-[state=active]:border-[#000] data-[state=active]:shadow-none rounded-none bg-transparent"
        >
          Vendor Payments
        </TabsTrigger>
        <TabsTrigger
          value="invoice"
          className="px-6 py-3 data-[state=active]:text-[#000] data-[state=active]:border-b-2 data-[state=active]:border-[#000] data-[state=active]:shadow-none rounded-none bg-transparent"
        >
          Invoice
        </TabsTrigger>
        <TabsTrigger
          value="documents"
          className="px-6 py-3 data-[state=active]:text-[#000] data-[state=active]:border-b-2 data-[state=active]:border-[#000] data-[state=active]:shadow-none rounded-none bg-transparent"
        >
          Documents
        </TabsTrigger>
      </TabsList>

      <TabsContent value="shipment-overview" className="mt-0">
        <ShipmentOverview/>
      </TabsContent>

      <TabsContent value="vendor-payments" className="mt-0">
        <VendorPayments />
      </TabsContent>

      <TabsContent value="invoice" className="mt-0">
        <InvoiceTab/>
      </TabsContent>

      <TabsContent value="documents" className="mt-0">
        <DocumentsTab/>
      </TabsContent>
    </Tabs>
  )
}
