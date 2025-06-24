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
    // service: "",

    // Finance Info (Step 2)
    payment_timing: "before",
    days_due: "",
    percentage_due: "",
    payment_method: "bank",
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
      [name]: value,
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
      console.error("No access token found in session data");
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

      const data = await response.json();
      console.log("Data:", data);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Add vendor failed:", errorText);
        toast.error(`Add vendor failed: ${response.statusText}`);
        return {
          success: false,
          error:
            data.message ||
            data.error ||
            `Server returned ${response.status}: ${response.statusText}`,
        };
      }

      toast.success("Vendor Added");
      router.push("/bco/vendors-lsp");

      return {
        success: true,
        message: data.message,
      };
    } catch (error) {
      console.error("Error adding vendor:", {
        error: error instanceof Error ? error.message : "Unknown error",
        url,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AddVendorHeader />
      <div className="flex h-[90vh]">
        <div className="w-[400px] shrink-0">
          <AddVendorSideNav
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
        <main className="flex-1 overflow-auto">
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
        </main>
      </div>
    </>
  );
};

export default AddVendorPage;
