"use client";

import { Card } from "@/components/ui/card";
import { Package, Building2, DollarSign, Wallet } from "lucide-react";
import { MapPin } from "lucide-react";
import WorldMap from "react-svg-worldmap";

const data = [
  { country: "us", value: 1 },
  { country: "cn", value: 1 },
  { country: "in", value: 1 },
  { country: "br", value: 1 },
  { country: "za", value: 1 },
  { country: "ng", value: 1 },
  { country: "gh", value: 1 },
];

const orderRequests = [
  {
    id: "ORDER001",
    location: "41 Sector 15, Gst Casablanca",
    subLocation: "GS, Draft Colony, Lagos",
    date: "17 Jan 2024 16:45",
    status: "SentchAfrican",
  },
  {
    id: "ORDER002",
    location: "41 Sector 15, Gst Casa",
    subLocation: "GS, Draft Colony, Lagos",
    date: "17 Jan 2024 16:45",
    status: "SentchAfrican",
  },
  {
    id: "ORDER003",
    location: "41 Sector 15, Gst Casa",
    subLocation: "GS, Draft Colony, Lagos",
    date: "17 Jan 2024 16:45",
    status: "SentchAfrican",
  },
  {
    id: "ORDER004",
    location: "41 Sector 15, Gst Casa",
    subLocation: "GS, Draft Colony, Lagos",
    date: "17 Jan 2024 16:45",
    status: "SentchAfrican",
  },
];

export default function Dashboard() {
  return (
    <div className="mt-20 p-6 max-w-[1400px] mx-auto">
      <div className="flex gap-10">
        <div className="flex-1">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <Card className="p-6 border-2 border-blue-500">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">75</div>
                  <div className="text-sm text-gray-500">Total Shipments</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">357</div>
                  <div className="text-sm text-gray-500">Total Hubs</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">$128</div>
                  <div className="text-sm text-gray-500">Total Amount</div>
                  <div className="text-xs text-gray-400">v/s $2k Goal</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Wallet className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">$128</div>
                  <div className="text-sm text-gray-500">
                    Total Amount Received
                  </div>
                  <div className="text-xs text-gray-400">25 USD More</div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">
                Countries of operations: <span className="text-2xl">5</span>
              </h2>
            </div>
            <div className="h-[400px] w-full">
              <WorldMap color="rgb(59 130 246)" size="responsive" data={data} />
            </div>
          </Card>
        </div>

        <div className="">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Order Requests</h2>
              <button className="text-sm text-blue-500">See All</button>
            </div>
            <div className="space-y-4">
              {orderRequests.map((order) => (
                <div key={order.id} className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 mt-1 text-gray-500" />
                      <div>
                        <div className="font-medium">{order.location}</div>
                        <div className="text-sm text-gray-500">
                          {order.subLocation}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-sm text-gray-500">{order.date}</div>
                      <button className="text-sm text-blue-500">
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200" />
                    <div className="text-sm">{order.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
