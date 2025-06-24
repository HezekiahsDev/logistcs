"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AddVendorHeader,
  AddVendorSideNav,
  AddVendorDetailsForm,
  AddVendorFinanceForm,
} from "./components";

const AddVendorPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const session = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Vendor Details (Step 1)
    name: "",
    email: "",
    service_ids: [1],

    // Finance Info (Step 2)
    payment_timing: "BEFORE",
    days_due: "",
    percentage_due: "",
    payment_method: "BANK",
    country: "",
    bank_name: "",
    account_number: "",
    mobile_network: "",
    mobile_code: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "service_ids" ? JSON.parse(value) : value,
    });
  };

  const nextStep = () => {
    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    const token = session.data?.user?.accessToken;
    if (!token) {
      toast.error("You must be logged in to add a vendor.");
      setIsSubmitting(false);
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_LOGISTICS_BACKEND_API_URL}/api/vendors/vendors/create/`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.error("Failed to parse response:", error);
      }

      if (!response.ok) {
        toast.error(data?.message || `Failed with status: ${response.status}`);
        return;
      }

      toast.success("Vendor Added Successfully");
      router.push("/ff/vendors-lsp");
    } catch (error) {
      console.error("Error adding vendor:", error);
      toast.error("Failed to add vendor. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AddVendorHeader />
      <div className="flex h-[90vh]">
        <div className="w-[100px] md:w-[250px] lg:w-[400px] shrink-0">
          <AddVendorSideNav
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
        <div className="flex-grow overflow-y-auto">
          {currentStep === 1 ? (
            <AddVendorDetailsForm
              formData={formData}
              handleInputChange={handleInputChange}
              nextStep={nextStep}
            />
          ) : (
            <AddVendorFinanceForm
              formData={formData}
              handleInputChange={handleInputChange}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AddVendorPage;
