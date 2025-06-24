import type { ShipmentData, TimelineItemType, VendorPayment } from "../types";
// import { Service } from "../types";

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
    { name: "Customs Clearance", amount: "$1,200.00" },
  ],
};

export const mockTimelineData: TimelineItemType[] = [
  {
    date: "2023-07-20",
    time: "10:00",
    status: "Goods picked up from shipper",
    location: "Lagos, Nigeria",
  },
  {
    date: "2023-07-21",
    time: "14:00",
    status: "Goods loaded on vessel",
    location: "Lagos Port",
  },
  {
    date: "2023-08-05",
    time: "08:00",
    status: "Vessel departed from origin port",
    location: "Lagos Port",
  },
  {
    date: "2023-08-25",
    time: "16:00",
    status: "Vessel arrived at destination port",
    location: "Mombasa Port",
  },
  {
    date: "2023-08-26",
    time: "11:00",
    status: "Goods unloaded from vessel",
    location: "Mombasa Port",
  },
  {
    date: "2023-08-27",
    time: "09:00",
    status: "Goods cleared from customs",
    location: "Mombasa, Kenya",
  },
  {
    date: "2023-08-28",
    time: "15:00",
    status: "Goods delivered to consignee",
    location: "Nairobi, Kenya",
    isLatest: true,
  },
];

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
];
