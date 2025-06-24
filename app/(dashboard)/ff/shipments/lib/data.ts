import type { TimelineItemType } from "../types/index"
import { Service } from "../types/index"  // or the correct path

// interface ShipmentData {
//     id: string
//     originPort: string
//     destinationPort: string
//     shipper: string
//     consignee: string
//     bookingDate: string
//     estimatedArrival: string
//     cargoType: string
//     weight: string
//     volume: string
//   }

export interface ShipmentData {
  id?: string
  origin: string
  originPort?: string
  destination: string
  destinationPort?: string
  shipper: string
  consignee: string
  bookingDate: string
  recipient: string
  importDetails: string
  insurancePolicy: string
  invoiceId: string
  services: Service[]
  estimatedArrival?: string
  cargoType?: string
  weight?: string
  volume?: string
}
  
  interface VendorPayment {
    service: string
    amount: string
    vendor: string
    status: "Paid" | "Pending"
    paymentDate: string
  }
  
  // Mock data for the shipment
  export const shipmentData: ShipmentData = {
    origin: "Kaduna, Nigeria",
    destination: "Marrakech, Morocco",
    shipper: "Ubuntu Shipping LLC",
    consignee: "Aflim Shippers",
    bookingDate: "Feb 3, 2025",
    recipient: "Morocco Souks",
    importDetails: "Import of Bags of Beans from Nigeria",
    insurancePolicy: "Goods in Transit (GIT)",
    invoiceId: "#657890",
    services: [
      { name: "Freight Cost", amount: "$14,098.00" },
      { name: "Customs Clearance", amount: "$1,200.00" }
    ]
  }
  
  // Mock data for vendor payments
  export const vendorPaymentsData: VendorPayment[] = [
    {
      service: "Shipment Charge",
      amount: "$23,42.00",
      vendor: "Area Logistics",
      status: "Paid",
      paymentDate: "N/A",
    },
    {
      service: "Logistics Fees",
      amount: "$64,63.00",
      vendor: "Ubuntu's Port Inc.",
      status: "Pending",
      paymentDate: "Jan 10, 2025 1:11 PM",
    },
    {
      service: "Procurement",
      amount: "$42,11.09",
      vendor: "Procurement Inc.",
      status: "Pending",
      paymentDate: "Jan 23, 2025 1:24 PM",
    },
    {
      service: "Shipment Charge",
      amount: "$23,42.00",
      vendor: "Area Logistics",
      status: "Paid",
      paymentDate: "N/A",
    },
    {
      service: "Logistics Fees",
      amount: "$64,63.00",
      vendor: "Ubuntu's Port Inc.",
      status: "Pending",
      paymentDate: "Jan 10, 2025 1:11 PM",
    },
    {
      service: "Procurement",
      amount: "$42,11.09",
      vendor: "Procurement Inc.",
      status: "Pending",
      paymentDate: "Jan 23, 2025 1:24 PM",
    },
    {
      service: "Customs Clearance",
      amount: "$15,75.00",
      vendor: "Global Customs Services",
      status: "Paid",
      paymentDate: "N/A",
    },
    {
      service: "Insurance",
      amount: "$8,92.50",
      vendor: "Maritime Insurance Co.",
      status: "Paid",
      paymentDate: "N/A",
    },
    {
      service: "Port Handling",
      amount: "$12,35.00",
      vendor: "Port Authority",
      status: "Pending",
      paymentDate: "Feb 5, 2025 9:30 AM",
    },
    {
      service: "Documentation",
      amount: "$3,50.00",
      vendor: "Document Services Ltd.",
      status: "Paid",
      paymentDate: "N/A",
    },
  ]
  
// export const mockShipmentData: ShipmentData = {
//   origin: "Kaduna, Nigeria",
//   destination: "Marrakech, Morocco",
//   shipper: "Ubuntu Shipping LLC",
//   consignee: "Aflim Shippers",
//   bookingDate: "Feb 3, 2025",
//   recipient: "Morocco Souks",
//   importDetails: "Import of Bags of Beans form Nigeria",
//   insurancePolicy: "Goods in Transit (GIT)",
//   invoiceId: "#657890",
//   services: [
//     { name: "Freight Cost", amount: "$14,098.00" },
//     { name: "Freight Cost", amount: "$14,098.00" },
//   ],
// }

export const mockTimelineData: TimelineItemType[] = [
  { title: "Request Recieved", time: "08:00 AM", active: true },
  { title: "Request Accepted", time: "10:50 AM", active: true },
  { title: "Workflow Applied", time: "06:50 PM", active: true },
  { title: "Quote Sent to BCO", time: "11:25 AM", active: true, hasAction: true },
  { title: "Review Quote Received from BCO", time: "03:50 PM", active: true, isLast: true },
]