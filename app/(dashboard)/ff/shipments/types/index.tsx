export interface ShipmentData {
    origin: string
    destination: string
    shipper: string
    consignee: string
    bookingDate: string
    recipient: string
    importDetails: string
    insurancePolicy: string
    invoiceId: string
    services: Service[]
  }
  
  export interface Service {
    name: string
    amount: string
  }

  
  
  export interface TimelineItemType {
    title: string
    time: string
    active: boolean
    hasAction?: boolean
    isLast?: boolean
  }
  
  export type TabType = "Shipment Overview" | "Vendor Payments" | "Invoices" | "Documents"
  export type NavItemType =
    | "Dashboard"
    | "Request"
    | "Shipments"
    | "Vendors/LSPs"
    | "Workflows"
    | "Analytics"
    | "Settings"
    | "Help Center"