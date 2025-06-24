"use client";

import { FileText } from "lucide-react";
import { useState } from "react";
import { TimelineItem } from "./TimelineItem";
import { ShipmentData, TimelineItemType } from "../types";
import { MakePaymentModal, RecordPaymentModal } from "../modals/PaymentModal";

// Import the PaymentFormData type from PaymentModal
interface PaymentFormData {
  paymentType?: string;
  amountPaid?: string;
  email?: string;
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
  rememberMe?: boolean;
}

interface InvoiceContentProps {
  data: ShipmentData;
  timelineData: TimelineItemType[];
  onRecordPayment: () => void;
  onMakePayment: () => void;
  onViewQuoteDetails: () => void;
}

export function InvoiceContent({
  data,
  timelineData,
  onRecordPayment,
  onMakePayment,
  onViewQuoteDetails,
}: InvoiceContentProps) {
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [isMakePaymentOpen, setIsMakePaymentOpen] = useState(false);

  const handleRecordPayment = (data: PaymentFormData) => {
    console.log("Record payment:", data);
    onRecordPayment();
  };

  const handleMakePayment = (data: PaymentFormData) => {
    console.log("Make payment:", data);
    onMakePayment();
  };

  return (
    <div className="flex gap-8">
      <div className="p-6 flex-1 bg-[#8BC5E326]">
        <div className="flex items-center gap-2 mb-6">
          <FileText size={18} className="text-[#464255]" />
          <span className="font-medium text-[#464255]">Invoice Info</span>
        </div>

        <div className="mb-6">
          <div className="text-[#969ba0] text-sm mb-1">Recipient</div>
          <div className="text-[#1e1e1e] font-semibold text-lg">
            {data.recipient}
          </div>
        </div>

        <div className="border-b border-[#e1e5ea] pb-4 mb-4">
          <h3 className="text-[#1e1e1e] font-semibold text-lg mb-1">
            {data.importDetails}
          </h3>
        </div>

        <div className="flex justify-between mb-4">
          <div className="text-[#969ba0] text-sm mb-1">Insurance Policy</div>
          <div className="text-[#969ba0] text-sm">Invoice ID</div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="text-[#1e1e1e] font-semibold text-lg">
            {data.insurancePolicy}
          </div>
          <div className="font-semibold text-[#1e1e1e]">{data.invoiceId}</div>
        </div>

        <div className="flex justify-between items-center mb-4 bg-[#f3f2f7] p-4 rounded-md">
          <div className="font-medium text-[#464255]">SERVICE</div>
          <div className="font-medium text-[#464255]">AMOUNT</div>
        </div>

        {data.services.map((service, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-4 border-b border-[#e1e5ea]"
          >
            <div className="text-[#464255]">{service.name}</div>
            <div className="font-semibold text-[#1e1e1e]">{service.amount}</div>
          </div>
        ))}

        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-[#1e1e1e] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#333] transition-colors"
            onClick={() => setIsRecordPaymentOpen(true)}
          >
            RECORD A PAYMENT
          </button>
          <button
            className="bg-[#a5c4d4] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#8bc5e3] transition-colors"
            onClick={() => setIsMakePaymentOpen(true)}
          >
            MAKE A PAYMENT
          </button>
        </div>
      </div>

      {/* Quote Timeline - Only shown for Invoices tab */}
      <div className="w-80 bg-[#8BC5E326] border-l border-[#e1e5ea]">
        <div className="p-6">
          <h3 className="text-[#1e1e1e] font-bold text-lg mb-6">
            Quote Timeline
          </h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-3 top-3 bottom-0 w-0.5 bg-[#e1e5ea]"></div>

            {/* Timeline Items */}
            {timelineData.map((item, index) => (
              <TimelineItem
                key={index}
                title={item.title ?? ""}
                time={item.time}
                active={item.active ?? false}
                hasAction={item.hasAction ?? false}
                isLast={item.isLast ?? false}
                onActionClick={item.hasAction ? onViewQuoteDetails : undefined}
              />
            ))}
          </div>
        </div>
      </div>
      <RecordPaymentModal
        isOpen={isRecordPaymentOpen}
        onClose={() => setIsRecordPaymentOpen(false)}
        onSubmit={handleRecordPayment}
      />

      <MakePaymentModal
        isOpen={isMakePaymentOpen}
        onClose={() => setIsMakePaymentOpen(false)}
        onSubmit={handleMakePayment}
      />
    </div>
  );
}
