"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { ShipmentData, TimelineItemType, VendorPayment } from "../types";
import { shipmentApi } from "../services/shipmentApi";

interface ShipmentContextType {
  shipmentData: ShipmentData;
  timelineData: TimelineItemType[];
  vendorPayments: VendorPayment[];
  loading: boolean;
  error: string | null;
  handleRecordPayment: () => void;
  handleMakePayment: () => void;
  handleViewQuoteDetails: () => void;
  markAsPaid: (index: number) => void;
  deletePayment: (index: number) => void;
}

const ShipmentContext = createContext<ShipmentContextType | undefined>(
  undefined
);

export function ShipmentProvider({ children }: { children: ReactNode }) {
  const [shipmentData, setShipmentData] = useState<ShipmentData>({
    origin: "",
    destination: "",
    shipper: "",
    consignee: "",
    bookingDate: "",
    recipient: "",
    importDetails: "",
    insurancePolicy: "",
    invoiceId: "",
    services: [],
  });
  const [timelineData, setTimelineData] = useState<TimelineItemType[]>([]);
  const [vendorPayments, setVendorPayments] = useState<VendorPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [shipmentResponse, timelineResponse, paymentsResponse] =
          await Promise.all([
            shipmentApi.getShipmentData(),
            shipmentApi.getTimelineData(),
            shipmentApi.getVendorPayments(),
          ]);

        setShipmentData(shipmentResponse);
        setTimelineData(timelineResponse);
        setVendorPayments(paymentsResponse);
        setError(null);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRecordPayment = () => {
    alert("Recording payment...");
    // In a real application, this would call an API to record the payment
  };

  const handleMakePayment = () => {
    alert("Making payment...");
    // In a real application, this would navigate to a payment page or open a payment modal
  };

  const handleViewQuoteDetails = () => {
    alert("Viewing quote details...");
    // In a real application, this would navigate to a quote details page or open a modal
  };

  const markAsPaid = (index: number) => {
    const updatedPayments = [...vendorPayments];
    updatedPayments[index] = {
      ...updatedPayments[index],
      status: "Paid",
      paymentDate: "N/A",
    };
    setVendorPayments(updatedPayments);
    alert(`Marked ${updatedPayments[index].service} as paid`);
  };

  const deletePayment = (index: number) => {
    const updatedPayments = [...vendorPayments];
    const deletedItem = updatedPayments[index];
    updatedPayments.splice(index, 1);
    setVendorPayments(updatedPayments);
    alert(`Deleted ${deletedItem.service}`);
  };

  return (
    <ShipmentContext.Provider
      value={{
        shipmentData,
        timelineData,
        vendorPayments,
        loading,
        error,
        handleRecordPayment,
        handleMakePayment,
        handleViewQuoteDetails,
        markAsPaid,
        deletePayment,
      }}
    >
      {children}
    </ShipmentContext.Provider>
  );
}

export function useShipmentContext() {
  const context = useContext(ShipmentContext);
  if (context === undefined) {
    throw new Error(
      "useShipmentContext must be used within a ShipmentProvider"
    );
  }
  return context;
}
