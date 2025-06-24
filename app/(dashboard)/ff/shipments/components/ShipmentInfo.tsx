import { MapPin, Truck, Package, Calendar } from "lucide-react"
import { ShipmentData } from "../types"


interface ShipmentInfoProps {
  data: ShipmentData
}

export function ShipmentInfo({ data }: ShipmentInfoProps) {
  return (
    <div className="bg-[#f2f5f3] h-full rounded-lg p-6 mb-6 relative">
      {/* Background Network Graphic */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
        <div className="relative w-full h-full">
          <div className="absolute w-16 h-16 rounded-full border border-[#8bc5e3] top-20 right-20"></div>
          <div className="absolute w-24 h-24 rounded-full border border-[#8bc5e3] top-40 right-40"></div>
          <div className="absolute w-12 h-12 rounded-full border border-[#8bc5e3] top-60 right-10"></div>
          <div className="absolute w-20 h-20 rounded-full border border-[#8bc5e3] top-10 right-60"></div>
          <div className="absolute w-8 h-8 rounded-full border border-[#8bc5e3] top-80 right-30"></div>
          <div className="absolute w-4 h-4 rounded-full bg-[#8bc5e3] top-30 right-50"></div>
          <div className="absolute w-4 h-4 rounded-full bg-[#8bc5e3] top-50 right-20"></div>
          <div className="absolute w-4 h-4 rounded-full bg-[#8bc5e3] top-70 right-60"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[#969ba0] text-sm mb-1">
            <MapPin size={16} />
            <span>ORIGIN PORT</span>
          </div>
          <div className="text-[#1e1e1e] font-semibold text-lg">{data.origin}</div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-[#969ba0] text-sm mb-1">
            <MapPin size={16} />
            <span>DESTINATION PORT</span>
          </div>
          <div className="text-[#1e1e1e] font-semibold text-lg">{data.destination}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#969ba0] text-sm mb-1">
            <Truck size={16} />
            <span>SHIPPER</span>
          </div>
          <div className="text-[#1e1e1e] font-semibold text-lg">{data.shipper}</div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-[#969ba0] text-sm mb-1">
            <Calendar size={16} />
            <span>BOOKING DATE</span>
          </div>
          <div className="text-[#1e1e1e] font-semibold text-lg">{data.bookingDate}</div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 text-[#969ba0] text-sm mb-1">
          <Package size={16} />
          <span>CONSIGNEE</span>
        </div>
        <div className="text-[#1e1e1e] font-semibold text-lg">{data.consignee}</div>
      </div>
    </div>
  )
}
