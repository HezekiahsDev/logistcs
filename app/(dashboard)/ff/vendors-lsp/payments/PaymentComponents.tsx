import Image from "next/image";
import { shipmentDetails, vendorPaymentsData } from "../vendorData";

export const ShippingDetails = () => {
  return (
    <div className="bg-[#8BC5E326]/15 rounded-xl">
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-10 md:col-span-8 p-4 md:p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {shipmentDetails.map((detail) => (
            <div key={detail.id}>
              <div className="flex items-center gap-1 md:gap-2">
                {detail.icon}
                <p className="text-xs md:text-sm text-[#000000] font-semibold">
                  {detail.title}
                </p>
              </div>
              <p className="text-sm md:text-lg font-bold">{detail.content}</p>
            </div>
          ))}
        </div>
        <div className="hidden md:block col-span-2 p-2 text-white">
          <Image
            src="/payment-vector.png"
            className="w-full h-full object-cover"
            width={100}
            height={100}
            alt="card background"
          />
        </div>
      </div>
    </div>
  );
};

export const PaymentsData = () => {
  return (
    <div className="my-6">
      <div className="flex items-center gap-4 md:gap-10">
        <h3 className="text-xs md:text-sm font-normal cursor-pointer hover:underline">
          Shipment Overview
        </h3>
        <h3 className="text-xs md:text-sm font-bold underline cursor-pointer hover:underline">
          Vendors Payments
        </h3>
        <h3 className="text-xs md:text-sm font-normal cursor-pointer hover:underline">
          Invoice
        </h3>
        <h3 className="text-xs md:text-sm font-normal cursor-pointer hover:underline">
          Documents
        </h3>
      </div>

      <div className="mt-6">
        <table className="w-full">
          <thead>
            <tr className="text-[#000000] bg-[#8BC5E326]/15 text-sm font-normal p-2 rounded-xl">
              <th className="py-4 text-left font-normal p-2 rounded-l-xl">
                Services
              </th>
              <th className="text-left font-normal py-2">Amount</th>
              <th className="text-left font-normal py-2">Vendor</th>
              <th className="text-left font-normal py-2">Status</th>
              <th className="text-left font-normal py-2 hidden md:block">
                Trade Force
              </th>
              <th className="text-left font-normal py-2 rounded-r-xl md:rounded-none">
                Date
              </th>
              <th className="text-left font-normal py-2 rounded-r-xl hidden md:block"></th>
            </tr>
          </thead>
          <tbody>
            {vendorPaymentsData.map((data) => (
              <tr
                key={data.id}
                className="text-[#000000] text-sm font-normal border-b-2 border-[#4299FF]"
              >
                <td className="py-4 text-xs md:text-sm text-left">
                  {data.services}
                </td>
                <td className="py-4 text-xs md:text-sm text-left">
                  {data.amount}
                </td>
                <td className="py-4 text-xs md:text-sm text-left">
                  {data.vendor.length > 15
                    ? data.vendor.substring(0, 15) + "..."
                    : data.vendor}
                </td>
                <td>
                  <h6
                    className={`text-left inline-block px-2 py-1 rounded-xl text-xs ${
                      data.status === "Pending"
                        ? "bg-[#FB5B0126]/15 text-[#FB5B01]"
                        : "text-[#81D17C] bg-[#81D17C33]/20"
                    }`}
                  >
                    {data.status}
                  </h6>
                </td>
                <td className="py-4 text-center hidden md:block">
                  <Image
                    src={data.force}
                    height={20}
                    width={20}
                    alt="force icon"
                  />
                </td>
                <td className="py-4 text-xs md:text-sm text-left">
                  {data.paymentDate}
                </td>
                <td className="py-4 text-xs md:text-sm text-left hidden md:block">
                  ...
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
