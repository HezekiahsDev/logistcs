"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BookText,
  Banknote,
  ChevronDown,
  Loader,
} from "lucide-react";

export const AddVendorHeader = () => {
  return (
    <div className="w-[100%] bg-[#A5C4D4] px-10 py-4 h-[10vh] md:h-[5vh] lg:h-[10vh]">
      <Image
        src="/ubuntu-logo.png"
        width={100}
        height={100}
        alt="Ubuntu Logo"
      />
    </div>
  );
};

interface AddVendorSideNavProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export const AddVendorSideNav = ({
  currentStep,
  setCurrentStep,
}: AddVendorSideNavProps) => {
  return (
    <div
      className="w-[400px] inset-0 bg-[#000000]/40 h-[90vh] flex py-4 md:py-20 justify-center text-white bg-cover bg-center"
      style={{
        backgroundImage: `url(/96358ff10bd8de071032dbafe45d3a20.png)`,
      }}
    >
      <div>
        <h1 className="font-bold text-2xl underline">Add a Vendor</h1>
        <h6 className="text-xs font-normal font-Be_Vietnam_Pro">
          Create a new vendor profile
        </h6>
        <div className="my-8 md:my-16 text-left flex items-center gap-3">
          <div className="h-14 w-1 flex flex-col rounded-full border-none">
            <div
              className={`h-1/2 ${
                currentStep === 1 ? "bg-[#A5C4D4]" : "bg-white"
              }`}
            ></div>
            <div
              className={`h-1/2 ${
                currentStep === 2 ? "bg-[#A5C4D4]" : "bg-white"
              }`}
            ></div>
          </div>
          <div className="flex flex-col items-start gap-3 font-Be_Vietnam_Pro">
            <div
              className={`flex items-center gap-1 cursor-pointer ${
                currentStep === 1 ? "text-white" : "text-[#969BA0]"
              }`}
              onClick={() => setCurrentStep(1)}
            >
              <BookText
                size={15}
                color={currentStep === 1 ? "#FFF" : "#969BA0"}
              />
              <h6 className="font-normal text-xs">Vendor Details</h6>
            </div>
            <div
              className={`flex items-center gap-1 cursor-pointer ${
                currentStep === 2 ? "text-white" : "text-[#969BA0]"
              }`}
              onClick={() => setCurrentStep(2)}
            >
              <Banknote
                size={15}
                color={currentStep === 2 ? "#FFF" : "#969BA0"}
              />
              <h6 className="font-normal text-xs">Finance Info</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
interface AddVendorDetailsFormProps {
  formData: {
    name: string;
    email: string;
    // service: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  nextStep: () => void;
}

export const AddVendorDetailsForm = ({
  formData,
  handleInputChange,
  nextStep,
}: AddVendorDetailsFormProps) => {
  return (
    <div className="pl-10 md:pl-28 pr-10 py-4">
      <p className="font-normal text-xs text-right">Step 1 of 2</p>
      <h1 className="font-extrabold text-3xl mt-8">Vendor Details</h1>
      <p className="font-normal text-xs">Provide specific vendor information</p>
      <form className="my-12 md:w-[90%] lg:w-[70%] flex flex-col gap-4 font-Be_Vietnam_Pro">
        <div>
          <label className="block text-base font-semibold">Vendor Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Please Enter Name"
            className="w-full px-4 text-xs py-3 mt-1 bg-[#FCFCFD] border rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F1F1F3]"
          />
        </div>
        <div>
          <label className="block text-base font-semibold">
            Email Address
            <span className="font-normal text-xs"> (optional)</span>
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Please Enter Email Address"
            className="w-full px-4 text-xs py-3 mt-1 bg-[#FCFCFD] border rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F1F1F3]"
          />
        </div>
        {/* <div>
          <label htmlFor="service" className="block text-base font-semibold">
            Services
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="w-full px-4 text-xs py-3 mt-1 bg-[#FCFCFD] border rounded-sm focus:outline-none focus:ring-1 focus:ring-[#F1F1F3]"
          >
            <option value="" disabled>
              Select Service
            </option>
            <option value="port to port">Port to Port</option>
            <option value="land to port">Land to Port</option>
          </select>
        </div> */}
        <button
          type="button"
          onClick={nextStep}
          className="flex items-center justify-center gap-2 mt-16 bg-[#A5C4D4] px-12 py-2 text-[#FFF] font-semibold text-xs cursor-pointer md:w-[50%] transition-colors duration-300 hover:bg-[#90afbd]"
        >
          <h6>NEXT</h6>
          <ArrowRight size={15} />
        </button>
      </form>
    </div>
  );
};
interface AddVendorFinanceFormProps {
  formData: {
    payment_timing: string;
    days_due: string;
    percentage_due: string;
    payment_method: string;
    country: string;
    bank_name: string;
    account_number: string;
    mobile_network: string;
    mobile_code: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}
export const AddVendorFinanceForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  isSubmitting,
}: AddVendorFinanceFormProps) => {
  const [paymentTiming, setPaymentTiming] = useState(
    formData.payment_timing || "before"
  );
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    string[]
  >([formData.payment_method || "bank"]);

  const updatePaymentTiming = (value: string) => {
    setPaymentTiming(value);
    handleInputChange({
      target: {
        name: "payment_timing",
        value: value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const updatePaymentMethods = (methods: string[]) => {
    setSelectedPaymentMethods(methods);
    handleInputChange({
      target: {
        name: "payment_method",
        value: methods.join(","),
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const togglePaymentMethod = (method: string) => {
    const newMethods = selectedPaymentMethods.includes(method)
      ? selectedPaymentMethods.filter((m) => m !== method)
      : [...selectedPaymentMethods, method];
    updatePaymentMethods(newMethods);
  };

  return (
    <div className="pl-10 md:pl-28 pr-10 py-4">
      <p className="font-normal text-xs text-right">Step 2 of 2</p>
      <h1 className="font-extrabold text-3xl mt-8">Finance Information</h1>
      <p className="font-normal text-xs">Add Vendor Payment Details</p>
      <form
        onSubmit={handleSubmit}
        className="my-12 md:w-[90%] lg:w-[70%] flex flex-col gap-4 font-Be_Vietnam_Pro"
      >
        <div>
          <h6 className="text-[#656567] text-xs font-semibold mb-3">
            Payment Terms
          </h6>
          <h2 className="font-semibold">Payment Timing</h2>
          <div className="flex mt-2 space-x-2">
            <button
              type="button"
              className={`px-4 py-2 rounded-full text-sm ${
                paymentTiming === "before"
                  ? "bg-teal-100 text-teal-600 border border-teal-200"
                  : "bg-gray-100 text-gray-500"
              }`}
              onClick={() => updatePaymentTiming("before")}
            >
              Before Service
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-full text-sm ${
                paymentTiming === "after"
                  ? "bg-teal-100 text-teal-600 border border-teal-200"
                  : "bg-gray-100 text-gray-500"
              }`}
              onClick={() => updatePaymentTiming("after")}
            >
              After Service
            </button>
          </div>
        </div>

        {/* Number of Days and Percentage Due */}
        <div className="mb-4">
          <div className="flex justify-between items-center gap-8">
            {/* Number of Days */}
            <div className="w-1/2 pr-2">
              <label
                htmlFor="numberOfDays"
                className="block font-semibold mb-2"
              >
                Number of Days
              </label>
              <div className="flex">
                <input
                  type="number"
                  id="days_due"
                  name="days_due"
                  value={formData.days_due}
                  onChange={handleInputChange}
                  placeholder="Please enter"
                  className="flex-grow p-2 border rounded-l"
                  min="0"
                />
                <span className="bg-gray-100 px-3 py-2 border border-l-0 rounded-r flex items-center">
                  Days
                </span>
              </div>
            </div>

            {/* Percentage Due */}
            <div className="w-1/2 pl-2">
              <label
                htmlFor="percentageDue"
                className="block font-semibold mb-2"
              >
                Percentage Due
              </label>
              <div className="flex">
                <input
                  type="number"
                  id="percentage_due"
                  name="percentage_due"
                  value={formData.percentage_due}
                  onChange={handleInputChange}
                  placeholder="Please enter"
                  className="flex-grow p-2 border rounded-l"
                  min="0"
                  max="100"
                />
                <span className="bg-gray-100 px-3 py-2 border border-l-0 rounded-r flex items-center">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <h6 className="text-[#656567] text-xs font-semibold mb-3">
            Payment Method
          </h6>
          <label className="block font-semibold mb-2">Add Payment</label>
          <div className="relative">
            <div className="p-2 border rounded flex flex-wrap">
              {selectedPaymentMethods.includes("bank") && (
                <div className="bg-gray-100 rounded px-3 py-1 mr-2 mb-1 flex items-center">
                  <span className="mr-1 text-sm">Bank Account</span>
                  <button
                    type="button"
                    onClick={() => togglePaymentMethod("bank")}
                    aria-label="Remove Bank Account"
                  >
                    &times;
                  </button>
                </div>
              )}
              {selectedPaymentMethods.includes("mobile") && (
                <div className="bg-gray-100 rounded px-3 py-1 mr-2 mb-1 flex items-center">
                  <span className="mr-1 text-sm">Mobile Money</span>
                  <button
                    type="button"
                    onClick={() => togglePaymentMethod("mobile")}
                    aria-label="Remove Mobile Money"
                  >
                    &times;
                  </button>
                </div>
              )}
              {selectedPaymentMethods.includes("both") && (
                <div className="bg-gray-100 rounded px-3 py-1 mr-2 mb-1 flex items-center">
                  <span className="mr-1 text-sm">Both</span>
                  <button
                    type="button"
                    onClick={() => togglePaymentMethod("both")}
                    aria-label="Remove Both"
                  >
                    &times;
                  </button>
                </div>
              )}
              <div className="flex-grow"></div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h6 className="text-[#656567] text-xs font-semibold mb-3">
            Banking Details
          </h6>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Country</label>
            <div className="relative">
              <label htmlFor="country" className="sr-only">
                Country
              </label>
              <select
                id="country"
                name="country"
                title="Country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full p-2 border rounded appearance-none bg-white"
              >
                <option value="others">Others</option>
                <option value="ghana">Ghana</option>
                <option value="nigeria">Nigeria</option>
                <option value="ivory-coast">Ivory Coast</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3 top-3 text-gray-400"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Bank Name</label>
            <label htmlFor="bank_name" className="sr-only">
              Bank Name
            </label>
            <input
              type="text"
              name="bank_name"
              placeholder="Please enter"
              value={formData.bank_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            {/* <select id="bank_name" className="w-full p-2 border rounded">
              <option>Please select</option>
            </select> */}
          </div>

          <div className="mb-4">
            <label
              htmlFor="account_number"
              className="block font-semibold mb-2"
            >
              Account Number
            </label>
            <input
              type="text"
              name="account_number"
              placeholder="Please enter"
              value={formData.account_number}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <h6 className="text-[#656567] text-xs font-semibold mb-3">
              Mobile Money (optional)
            </h6>
            <div className="mb-4">
              <label
                htmlFor="mobile_network"
                className="block font-semibold mb-2"
              >
                Network
              </label>
              <input
                type="text"
                name="mobile_network"
                placeholder="Please enter"
                value={formData.mobile_network}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              {/* <div className="relative">
                <select
                  className="w-full p-2 border rounded appearance-none bg-white"
                  title="Select a network"
                >
                  <option>Please select</option>
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-3 top-3 text-gray-400"
                />
              </div> */}
            </div>

            <div className="mb-4">
              <label htmlFor="mobile_code" className="block font-semibold mb-2">
                Mobile Money Code
              </label>
              <input
                type="text"
                name="mobile_code"
                placeholder="Please enter"
                value={formData.mobile_code}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 mt-16 bg-[#A5C4D4] px-12 py-2 text-[#FFF] font-semibold text-xs cursor-pointer md:w-[50%] transition-colors duration-300 hover:bg-[#90afbd]"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-4">
                <Loader className="animate-spin" />
              </span>
            ) : (
              "ADD VENDOR"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
