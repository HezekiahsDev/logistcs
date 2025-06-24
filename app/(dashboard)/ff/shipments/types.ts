export interface ShipmentData {
  origin: string;
  destination: string;
  shipper: string;
  consignee: string;
  bookingDate: string;
  recipient: string;
  importDetails: string;
  insurancePolicy: string;
  invoiceId: string;
  services: string[];
}

export interface TimelineItemType {
  date: string;
  time: string;
  status: string;
  location: string;
}

export interface VendorPayment {
  service: string;
  amount: string;
  status: string;
  paymentDate: string;
}
