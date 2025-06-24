"use client";
import { useState } from "react";
import { BookText, LucideIcon } from "lucide-react";
import BCOHeader from "@/components/Dashboard/Reusables/BCOHeader";
import BCOSideNav from "@/components/Dashboard/Reusables/BCOSideNav";
import {
  CommodityInfo,
  RequestInfo,
  ServiceInfo,
  ShippingInfo,
  SuccessfulUpload,
  UploadDocument,
} from "./CreateComponents";

type Step = {
  id: number;
  title: string;
  icon: LucideIcon;
};

function CreateRequest() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessfulUpload, setShowSuccessfulUpload] = useState(false);

  const steps: Step[] = [
    {
      id: 1,
      title: "Upload Document",
      icon: BookText,
    },
    {
      id: 2,
      title: "Confirm Details",
      icon: BookText,
    },
    {
      id: 3,
      title: "Commodity Info",
      icon: BookText,
    },
    {
      id: 4,
      title: "Shipping Info",
      icon: BookText,
    },
    {
      id: 5,
      title: "Service Info",
      icon: BookText,
    },
  ];

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const onSuccessToggle = () => {
    setShowSuccessfulUpload(!showSuccessfulUpload);
  };

  return (
    <>
      <div className="relative w-full h-screen">
        {showSuccessfulUpload && (
          <div className="absolute inset-0 z-50 w-full h-full flex flex-col">
            <div className="flex-1">
              <SuccessfulUpload
                nextStep={nextStep}
                onSuccessToggle={onSuccessToggle}
              />
            </div>
          </div>
        )}

        <div className="relative z-10 flex flex-col h-full">
          <BCOHeader />
          <div className="flex h-[90vh]">
            <div className="w-[500px] shrink-0">
              <BCOSideNav
                header="Send A New Request"
                desc="Initiate a new shipment request"
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                steps={steps}
              />
            </div>
            <main className="flex-1 overflow-auto">
              {currentStep === 1 && (
                <UploadDocument
                  onSuccessToggle={onSuccessToggle}
                  nextStep={nextStep}
                />
              )}
              {currentStep === 2 && <RequestInfo nextStep={nextStep} />}
              {currentStep === 3 && <CommodityInfo />}
              {currentStep === 4 && <ShippingInfo />}
              {currentStep === 5 && <ServiceInfo />}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateRequest;
