"use client"

import { ShipmentData } from "../types"


interface ShipmentHeaderProps {
  shipmentData: ShipmentData
}

export default function ShipmentHeader({ shipmentData }: ShipmentHeaderProps) {
  return (
    <div className="flex-1 p-6 mt-16">
    <div className="w-full bg-[#C0DBFB5E] rounded-lg  px-6 py-6 pt-10  mb-6 relative" style={{ backgroundImage: "url('/shippingbgimg.svg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <img src="/icons/map.svg" alt="" />
            <span className="text-[#464255] font-medium">ORIGIN PORT</span>
          </div>
          <div className="text-[#1e1e1e] text-lg font-semibold">{shipmentData.origin}</div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <img src="/icons/Destination.svg" alt="" />
            <span className="text-[#464255] font-medium">DESTINATION PORT</span>
          </div>
          <div className="text-[#1e1e1e] text-lg font-semibold">{shipmentData.destination}</div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <img src="/icons/shipper.svg" alt="" />
            <span className="text-[#464255] font-medium">SHIPPER</span>
          </div>
          <div className="text-[#1e1e1e] text-lg font-semibold">{shipmentData.shipper}</div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <img src="/icons/profile-sharing.svg" alt="" />
            <span className="text-[#464255] font-medium">CONSIGNEE</span>
          </div>
          <div className="text-[#1e1e1e] text-lg font-semibold">{shipmentData.consignee}</div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <img src="/icons/info.svg" alt="" />
            <span className="text-[#464255] font-medium">BOOKING DATE</span>
          </div>
          <div className="text-[#1e1e1e] text-lg font-semibold">{shipmentData.bookingDate}</div>
        </div>
      </div>

      {/* Network Diagram (simplified) */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20">
        <div className="relative h-full w-full">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-[#8bc5e3] bg-white"
              style={{
                width: `${Math.random() * 40 + 20}px`,
                height: `${Math.random() * 40 + 20}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}
