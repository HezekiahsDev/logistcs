"use client"

export default function ShipmentOverview() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <img src="/icons/info.svg" alt="" />
            <h3 className="text-[#000000] text-lg">Commodity Info</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[#000000] mb-2">Commodity/Package Name</p>
              <p className="text-xl font-semibold">Bag of beans</p>
            </div>
            <div>
              <p className="text-[#000000] mb-2">Package Type</p>
              <p className="text-xl font-semibold">Sack</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <p className="text-[#000000] mb-2">Package Weight in NET</p>
              <p className="text-xl font-semibold">12 Tons</p>
            </div>
            <div>
              <p className="text-[#000000] mb-2">Package Weight in Gross</p>
              <p className="text-xl font-semibold">12 Tons</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/icons/info.svg" alt="" />
            <h3 className="text-[#000000] text-lg">Cargo Info</h3>
          </div>

          <div>
            <p className="text-[#000000] mb-2">Cargo Value</p>
            <p className="text-xl font-semibold">$24,000.02</p>
          </div>
        </div>
      </div>

      <div className="bg-[#C0DBFB5E] rounded-lg p-6">
        <h3 className="font-bold text-lg text-[#1e1e1e] mb-6">Logistics Steps</h3>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[15px] top-[24px] bottom-0 w-[2px] bg-[#d0d6de]"></div>

          {/* Timeline items */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-full bg-[#c0dbfb] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#4299ff]"></div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[#1e1e1e]">Logistics Step Name</h4>
                <p className="text-sm text-[#969ba0]">Step Description</p>
              </div>
              <div className="ml-auto">
                <div className="w-6 h-6 rounded-full bg-[#81d17c]"></div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-full bg-[#c0dbfb] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#4299ff]"></div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[#1e1e1e]">Logistics Step Name</h4>
                <p className="text-sm text-[#969ba0]">Step Description</p>
              </div>
              <div className="ml-auto">
                <p className="text-sm text-[#969ba0]">12:23 hrs</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-full bg-[#c0dbfb] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#4299ff]"></div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[#1e1e1e]">Logistics Step Name</h4>
                <p className="text-sm text-[#969ba0]">Step Description</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="relative z-10">
                <div className="w-8 h-8 rounded-full bg-[#c0dbfb] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#4299ff]"></div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[#1e1e1e]">Logistics Step Name</h4>
                <p className="text-sm text-[#969ba0]">11:25 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
