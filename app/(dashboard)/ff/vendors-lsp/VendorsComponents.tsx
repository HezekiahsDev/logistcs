"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Loader, Edit, Trash2 } from "lucide-react";

interface Vendor {
  id: number;
  name: string;
  email: string;
  payment_timing: string;
  days_due: string;
  percentage_due: string;
  payment_method: string;
  date_created: string;
  service_ids: number[];
}

export const VendorsButton = () => {
  return (
    <Link
      className="mt-20 text-xs float-right bg-[#A5C4D4] hover:bg-[#6d95a9] text-black rounded-md px-6 py-4 flex items-center justify-center space-x-2"
      href="/ff/vendors-lsp/add-vendor"
    >
      <Image src="/plus.png" width={15} height={15} alt="plus sign" />
      <h6 className="font-bold">Add Vendor</h6>
    </Link>
  );
};

export const VendorForm = () => {
  return (
    <form className="mt-40 space-y-4 font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-normal mb-2 text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            className="w-full px-4 text-xs py-3 mt-1 border rounded-xs focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-normal mb-2 text-gray-700">
            ID
          </label>
          <input
            type="text"
            placeholder="Enter ID"
            className="w-full px-4 text-xs py-3 mt-1 border rounded-xs focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-normal mb-2 text-gray-700">
            Service
          </label>
          <input
            type="text"
            placeholder="Service"
            className="w-full px-4 text-xs py-3 mt-1 border rounded-xs focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-normal mb-2 text-gray-700">
            Date
          </label>
          <input
            type="text"
            placeholder="Date"
            className="w-full px-4 text-xs py-3 mt-1 border rounded-xs focus:outline-none"
          />
        </div>
      </div>
    </form>
  );
};

export const VendorTable = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const session = useSession();

  useEffect(() => {
    const fetchVendors = async () => {
      const token = session.data?.user?.accessToken;
      if (!token) {
        toast.error("Authentication required");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOGISTICS_BACKEND_API_URL}/api/vendors/vendors/create/`,
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
        setVendors(data);
      } catch (error) {
        console.error("Failed to fetch vendors:", error);
        toast.error("Failed to load vendors");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVendors();
  }, [session.data?.user?.accessToken]);

  // const handleView = (vendorId: string) => {
  //   // Navigate to preview page
  //   console.log(`Viewing vendor ${vendorId}`);
  //   // Example: router.push(`/vendors/preview/${vendorId}`);
  // };

  const handleEdit = (vendorId: string) => {
    // Navigate to edit page
    console.log(`Editing vendor ${vendorId}`);
    // Example: router.push(`/vendors/edit/${vendorId}`);
  };

  const handleRemove = async (vendorId: string) => {
    // Handle vendor removal
    console.log(`Removing vendor ${vendorId}`);
    // Add confirmation dialog and API call here
    if (window.confirm("Are you sure you want to remove this vendor?")) {
      // API call to remove vendor
      // setVendors(vendors.filter(vendor => vendor.id !== vendorId));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-8 relative">
      <table className="table-fixed h-auto w-full mt-2 bg-[#FFFFFF]">
        <thead>
          <tr className="border-b border-[#F2F2F2] text-[#000000]">
            <th className="text-left px-2 md:px-4 py-4 font-semibold w-8 md:w-1/12 bg-[#FFFFFF]">
              <input
                type="checkbox"
                title="Select"
                className="w-3 h-3 md:w-4 md:h-4"
              />
            </th>
            <th className="font-lato text-left py-2 px-2 md:py-0 md:px-0 font-semibold text-xs bg-[#FFFFFF]">
              Vendor ID
            </th>
            <th className="font-lato text-left py-2 px-2 md:py-0 md:px-0 font-semibold text-xs bg-[#FFFFFF]">
              Payment Term
            </th>
            <th className="font-lato text-left py-2 px-2 md:py-0 md:px-0 font-semibold text-xs bg-[#FFFFFF]">
              Name
            </th>
            <th className="font-lato text-left py-2 px-2 md:py-0 md:px-0 font-semibold text-xs bg-[#FFFFFF]">
              Service
            </th>
            <th className="font-lato text-left py-2 px-2 md:py-0 md:px-0 font-semibold text-xs bg-[#FFFFFF]">
              N of days
            </th>
            <th className="font-lato text-left py-2 px-2 md:py-0 md:px-0 font-semibold text-xs bg-[#FFFFFF]">
              Due
            </th>
          </tr>
        </thead>
        <tbody className="scrollbar-hide">
          {vendors.map(
            ({ id, name, payment_timing, days_due, percentage_due }, index) => (
              <tr
                key={index}
                className="border-b border-[#F2F2F2] smallerText md:text-xs font-semibold md:font-bold font-poppins text-[#000000] scrollbar-hide hover:bg-gray-50 transition-colors duration-200 relative"
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="text-left px-2 md:px-4 py-4 w-8 md:w-1/12 bg-[#FFFFFF]">
                  <input
                    type="checkbox"
                    id="select"
                    title="Select all"
                    className="w-3 h-3 md:w-4 md:h-4"
                  />
                </td>
                <td className="text-left py-4 bg-[#FFFFFF] text-[#0B63F8]">
                  #AHGA68
                </td>
                <td className="text-left px-2 md:px-0 py-4 bg-[#FFFFFF]">
                  {payment_timing === "AFTER"
                    ? "After Service"
                    : "Before Service"}
                </td>
                <td className="text-left px-2 md:px-0 py-4 bg-[#FFFFFF]">
                  {name}
                </td>
                <td className="text-left px-2 md:px-0 py-4 bg-[#FFFFFF]">
                  Port-To-Port
                  {/* {service_ids[0] === 1 ? "Port-To-Port" : "Land-To-Port"} */}
                </td>
                <td className="text-left px-2 md:px-0 py-4 bg-[#FFFFFF]">
                  {days_due}
                </td>
                <td className="text-left px-2 md:px-0 py-4 bg-[#FFFFFF]">
                  {Math.min(Math.round(Number(percentage_due)))}%
                </td>

                {/* Hover Popup */}
                {hoveredRow === index && (
                  <td className="absolute right-0 top-0 h-full">
                    <div className="flex items-center h-full bg-white shadow-lg border border-gray-200 rounded-l-md px-2 py-2 space-x-2 z-10">
                      {/* <button
                        onClick={() =>
                          handleView(String(id) || `vendor-${index}`)
                        }
                        className="flex items-center justify-center w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200"
                        title="View Vendor"
                      >
                        <Eye size={14} />
                      </button> */}
                      <Link
                        href={`/ff/vendors-lsp/preview/${index + 1}`}
                        className="flex items-center justify-center w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200"
                      >
                        View
                      </Link>
                      <button
                        onClick={() =>
                          handleEdit(String(id) || `vendor-${index}`)
                        }
                        className="flex items-center justify-center w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded transition-colors duration-200"
                        title="Edit Vendor"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() =>
                          handleRemove(String(id) || `vendor-${index}`)
                        }
                        className="flex items-center justify-center w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-200"
                        title="Remove Vendor"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
