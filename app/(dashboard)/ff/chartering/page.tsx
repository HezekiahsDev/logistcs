"use client";

import { useState } from "react";
import { Search, ChevronDown, Calendar } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function ShippingRoutesPage() {
  const [transitDays, setTransitDays] = useState([10]);

  const routes = [
    {
      id: 1,
      carrier: "African",
      origin: "LAGOS, NG",
      destination: "CASA, MOR",
      days: "2 days",
      dateRange: "10 Apr 2025-15Apr 2025",
    },
    {
      id: 2,
      carrier: "African",
      origin: "LAGOS, NG",
      destination: "CASA, MOR",
      days: "2 days",
      dateRange: "10 Apr 2025-15Apr 2025",
    },
    {
      id: 3,
      carrier: "African",
      origin: "LAGOS, NG",
      destination: "CASA, MOR",
      days: "3 days",
      dateRange: "10 Apr 2025-13Apr 2025",
    },
    {
      id: 4,
      carrier: "African",
      origin: "LAGOS, NG",
      destination: "CASA, MOR",
      days: "2 days",
      dateRange: "10 Apr 2025-15Apr 2025",
    },
    {
      id: 5,
      carrier: "African",
      origin: "LAGOS, NG",
      destination: "CASA, MOR",
      days: "2 days",
      dateRange: "10 Apr 2025-15Apr 2025",
    },
    {
      id: 6,
      carrier: "African",
      origin: "LAGOS, NG",
      destination: "CASA, MOR",
      days: "2 days",
      dateRange: "10 Apr 2025-15Apr 2025",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 mt-20">
      {/* Filter Sidebar */}
      <div className="w-64 border-r border-gray-200 p-4">
        <div className="border border-blue-500 rounded bg-white p-4">
          <h2 className="text-gray-400 text-sm mb-4">FILTER</h2>

          {/* Mode/Transshipment */}
          <div className="mb-6">
            <p className="text-gray-500 text-xs mb-2">Mode/Transshipment</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Checkbox id="direct" className="mr-2 h-4 w-4" />
                <Label htmlFor="direct" className="text-sm">
                  Direct
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="transshipment" className="mr-2 h-4 w-4" />
                <Label htmlFor="transshipment" className="text-sm">
                  Transshipment
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="2andmore" className="mr-2 h-4 w-4" />
                <Label htmlFor="2andmore" className="text-sm">
                  2 and More
                </Label>
              </div>
            </div>
          </div>

          {/* Transit Time */}
          <div className="mb-6">
            <p className="text-gray-500 text-xs mb-2">Transit Time</p>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>1 Day</span>
              <span>50 Days</span>
            </div>
            <Slider
              defaultValue={[10]}
              max={50}
              min={1}
              step={1}
              value={transitDays}
              onValueChange={setTransitDays}
              className="my-4"
            />
            <div className="h-2"></div>
          </div>

          {/* Shipment Line */}
          <div className="mb-6">
            <p className="text-gray-500 text-xs mb-2">Shipment Line</p>
            <div className="flex justify-between items-center border rounded p-2">
              <span className="text-sm">Select</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* Date Range */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="start-date" className="text-xs text-gray-500">
                  7 MAR 2020
                </Label>
                <div className="h-8 border rounded flex items-center justify-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="end-date" className="text-xs text-gray-500">
                  19 MAR 2020
                </Label>
                <div className="h-8 border rounded flex items-center justify-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Port of Loading */}
          <div className="mb-6">
            <p className="text-gray-500 text-xs mb-2">Port of Loading</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Checkbox id="istanbul" className="mr-2 h-4 w-4" />
                <Label htmlFor="istanbul" className="text-sm">
                  Istanbul TR
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="mersin" className="mr-2 h-4 w-4" />
                <Label htmlFor="mersin" className="text-sm">
                  Mersin TR
                </Label>
              </div>
            </div>
          </div>

          {/* Port of Discharge */}
          <div className="mb-6">
            <p className="text-gray-500 text-xs mb-2">Port of Discharge</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Checkbox id="portsaid" className="mr-2 h-4 w-4" />
                <Label htmlFor="portsaid" className="text-sm">
                  Port Said EG
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="sokhna" className="mr-2 h-4 w-4" />
                <Label htmlFor="sokhna" className="text-sm">
                  Sokhna EG
                </Label>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-gray-500 text-xs mb-2">Services</p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Checkbox id="med" className="mr-2 h-4 w-4" />
                <Label htmlFor="med" className="text-sm">
                  MEDITERRANEAN I 20
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="asia" className="mr-2 h-4 w-4" />
                <Label htmlFor="asia" className="text-sm">
                  ASIA-SOUTH EUROPE 3 20
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="blacksea" className="mr-2 h-4 w-4" />
                <Label htmlFor="blacksea" className="text-sm">
                  BLACK SEA EXPRESS
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox id="wemed" className="mr-2 h-4 w-4" />
                <Label htmlFor="wemed" className="text-sm">
                  WEMED-JEDDAH LOOP 2 20
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Search Bar */}
        <div className="flex mb-6">
          <div className="grid grid-cols-4 gap-0 flex-1">
            <div className="border p-2">
              <div className="text-xs text-gray-500">Origin</div>
              <div className="font-medium">Casablanca</div>
            </div>
            <div className="border p-2">
              <div className="text-xs text-gray-500">Destination</div>
              <div className="font-medium">Lagos</div>
            </div>
            <div className="border p-2">
              <div className="text-xs text-gray-500">Date</div>
              <div className="font-medium">10 Apr 2025</div>
            </div>
            <div className="border p-2">
              <div className="text-xs text-gray-500">Container</div>
              <div className="font-medium">FCL 40&apos; ST</div>
            </div>
          </div>
          <Button variant="outline" className="border ml-2 px-3">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Week Info */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="font-bold">Week 15</span>
            <span className="text-gray-500 text-sm ml-4">
              Transit time 10 days
            </span>
          </div>
          <div className="text-sm text-gray-500">SORT BY: TRANSIT TIME</div>
        </div>

        {/* Routes */}
        <div className="space-y-4">
          {routes.map((route) => (
            <div key={route.id} className="bg-white border rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span className="font-medium">{route.carrier}</span>
                </div>
                <div className="text-right">
                  <div className="text-gray-500 text-sm">{route.days}</div>
                  <div className="text-xs">{route.dateRange}</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="font-medium">{route.origin}</div>
                <div className="font-medium">{route.destination}</div>
              </div>

              <div className="mt-2 relative">
                <div className="h-1 bg-gray-200 rounded-full w-full"></div>
                <div
                  className="absolute left-0 top-0 h-1 bg-green-500 rounded-full"
                  style={{ width: "100%" }}
                ></div>
                <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-green-500 -mt-0.5"></div>
                <div className="absolute right-0 top-0 w-2 h-2 rounded-full bg-green-500 -mt-0.5"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
