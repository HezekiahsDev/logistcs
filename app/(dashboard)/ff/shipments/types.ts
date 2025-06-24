export interface Service {
  name: string;
  amount: string;
}

export interface ShipmentData {
  id?: string;
  origin: string;
  originPort?: string;
  destination: string;
  destinationPort?: string;
  shipper: string;
  consignee: string;
  bookingDate: string;
  recipient: string;
  importDetails: string;
  insurancePolicy: string;
  invoiceId: string;
  services: Service[];
  estimatedArrival?: string;
  cargoType?: string;
  weight?: string;
  volume?: string;
}

export interface VendorPayment {
  service: string;
  amount: string;
  vendor: string;
  status: "Paid" | "Pending";
  paymentDate: string;
}

export interface TimelineItemType {
  date: string;
  time: string;
  status: string;
  location: string;
  isLast?: boolean;
  hasAction?: boolean;
  title?: string;
  active?: boolean;
}

export type TabType = "Invoices" | "Documents" | "Timeline" | "Overview";
export type NavItemType = "Shipments" | "Quotes" | "Invoices";
