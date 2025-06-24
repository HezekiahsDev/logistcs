"use client";

import Image from "next/image";
import { BookMarked } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Loader } from "lucide-react";

interface Vendor {
  id: number;
  name: string;
  email: string;
  payment_timing: string;
  days_due: string;
  percentage_due: string;
  payment_method: string;
  date_created: string;
  country: string;
  bank_name: string;
  account_number: string;
  service_ids: number[];
  // Add any additional fields from your API response
}

interface PreviewPageProps {
  params: {
    id: string;
  };
}

const PreviewPage = ({ params: { id } }: PreviewPageProps) => {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    const fetchVendorDetails = async () => {
      const token = session.data?.user?.accessToken;
      if (!token) {
        toast.error("Authentication required");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOGISTICS_BACKEND_API_URL}/api/vendors/vendors/create/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setVendor(data);
      } catch (error) {
        console.error("Failed to fetch vendor details:", error);
        toast.error("Failed to load vendor details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVendorDetails();
  }, [id, session.data?.user?.accessToken]);
  if (!vendor && isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="mt-24 pl-20 pr-6 text-[#000000]">
        <div className="bg-[#8BC5E3]/15 p-6 rounded-xl">
          <p className="text-center">Vendor not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-24 pl-6 lg:pl-20 pr-6 text-[#000000]">
      <div className="bg-[#8BC5E3]/15 grid grid-cols-10 md:gap-10 rounded-xl">
        <div className="col-span-8 p-6">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-[#A5C4D4] text-[#C0DBFB] w-[20] h-[20] p-4 font-extrabold flex items-center justify-center text-xl">
              {vendor?.name?.substring(0, 2).toUpperCase() || "NA"}
            </div>
            <div className="flex items-start flex-col">
              <h1 className="font-extrabold text-sm">{vendor?.name}</h1>
              <h6 className="font-semibold text-xs">{vendor?.email}</h6>
            </div>
          </div>
        </div>
        <div className="col-span-2 p-3">
          <Image
            className="w-[200px] h-[150px] object-cover"
            src="/vendor-svg.png"
            width={200}
            height={200}
            alt="svg background"
          />
        </div>
      </div>

      <div className="py-4">
        <div className="flex items-center gap-2 text-xs">
          <BookMarked />
          <h1 className="font-semibold">Payment Terms</h1>
          <div className="bg-[#C0DBFB]/70 smallHr w-[40%] mt-2"></div>
        </div>
        <div className="grid grid-cols-3 w-[60%] mt-6 ml-8 gap-4">
          <div className="flex flex-col">
            <h6 className="smallerText font-normal">Payment Timing</h6>
            <h3 className="font-extrabold text-xs">{vendor?.payment_timing}</h3>
          </div>
          <div className="flex flex-col">
            <h6 className="smallerText font-normal">Number of Days</h6>
            <h3 className="font-extrabold text-xs">{vendor?.days_due} Days</h3>
          </div>
          <div className="flex flex-col">
            <h6 className="smallerText font-normal">Percentage Due</h6>
            <h3 className="font-extrabold text-xs">
              {Math.min(Math.round(Number(vendor?.percentage_due)))}%
            </h3>
          </div>
        </div>
      </div>

      <div className="py-4">
        <div className="flex items-center gap-2 text-xs">
          <BookMarked />
          <h1 className="font-semibold">Services</h1>
          <div className="bg-[#C0DBFB]/70 smallHr w-[40%] mt-2"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 w-[60%] mt-6 ml-8 gap-4">
          <h3 className="font-medium text-xs">Port to Port Logistics</h3>

          <h3 className="font-medium text-xs">Last Mile</h3>
          <h3></h3>
        </div>
      </div>

      <div className="py-4">
        <div className="flex items-center gap-2 text-xs">
          <h1 className="font-semibold">Banking Details</h1>
          <div className="bg-[#4299FF] smallHr w-[40%] mt-2"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 w-[80%] mt-6 ml-8 gap-4">
          <div className="flex flex-col">
            <h6 className="smallerText font-normal">Country</h6>
            <h3 className="font-extrabold text-xs capitalize">
              {vendor?.country}
            </h3>
          </div>
          <div className="flex flex-col">
            <h6 className="smallerText font-normal">Bank Name</h6>
            <h3 className="font-extrabold text-xs capitalize">
              {vendor?.bank_name}
            </h3>
          </div>
          <div className="flex flex-col">
            <h6 className="smallerText font-normal">Account Number</h6>
            <h3 className="font-extrabold text-xs">{vendor?.account_number}</h3>
          </div>
          <div className="flex flex-col">
            <h6 className="smallerText font-normal">Account Name</h6>
            <h3 className="font-extrabold text-xs">{vendor?.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
