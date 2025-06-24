"use client";

import { useState } from "react";
import {
  Search,
  Phone,
  MessageSquare,
  Clock,
  Package,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface TrackingStep {
  date: string;
  time: string;
  location: string;
  status: string;
  completed: boolean;
}

export default function TrackingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [trackingNumber, setTrackingNumber] = useState(params.id || "5878390");

  const otherTrackings = [
    { id: "5407775", status: "Awaiting Pickup" },
    { id: "2201896", status: "In Transit" },
    { id: "6886766", status: "Delivered" },
  ];

  const trackingSteps: TrackingStep[] = [
    {
      date: "Dec 10, 2023",
      time: "09:30 AM",
      location: "Shanghai, China",
      status: "Shipment picked up",
      completed: true,
    },
    {
      date: "Dec 12, 2023",
      time: "11:45 AM",
      location: "In Transit Center",
      status: "Processing at facility",
      completed: true,
    },
    {
      date: "Dec 15, 2023",
      time: "02:15 PM",
      location: "San Francisco, CA",
      status: "Out for delivery",
      completed: false,
    },
    {
      date: "Dec 17, 2023",
      time: "03:50 PM",
      location: "Destination",
      status: "Estimated delivery",
      completed: false,
    },
  ];

  return (
    <div className="container mx-auto mt-20 py-6 px-4 max-w-6xl">
      {/* Search Bar */}
      <div className="relative mb-8">
        <Input
          type="text"
          placeholder="Enter tracking number"
          className="pl-10 pr-4 py-2 rounded-md w-full md:w-1/3"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 py-0 px-3">
          Track
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Tracking Info */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">#</span>
                  <span className="font-bold">{trackingNumber}</span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold">03:50</h2>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Estimated Delivery Time</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <div className="h-2 w-2 rounded-full bg-gray-300 mr-2"></div>
                  <span className="text-sm text-gray-500">
                    FCL Express, Asia
                  </span>
                </div>
              </div>
              <div className="text-right">
                <Badge
                  variant="outline"
                  className="bg-yellow-50 text-yellow-700 border-yellow-200"
                >
                  In Transit
                </Badge>
                <div className="mt-2 text-sm text-gray-500">Dec 17, 2023</div>
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-gray-100">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                <span className="font-medium">Supplier XY</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full w-8 h-8 p-0"
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full w-8 h-8 p-0"
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button variant="default" className="w-full mt-4">
              Track
            </Button>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="h-64 bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d6122065.651254484!2d-132.6449429078125!3d37.39460349999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x808f7e8a54f9d273%3A0xaa7d6d15e89d301!2sSan%20Francisco%2C%20CA!3m2!1d37.7749295!2d-122.4194155!4m5!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!3m2!1d34.0522342!2d-118.2436849!5e0!3m2!1sen!2sus!4v1715695012!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Shipping Info and Route Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold mb-4">Shipping Info</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-500 mb-1">Method</div>
                  <div className="font-medium">FCL Express</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Packages</div>
                  <div className="font-medium">1</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Weight</div>
                  <div className="font-medium">250.00 kg</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold mb-4">Driver Info</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium">Mohammed Ali</div>
                    <div className="text-sm text-gray-500">ID #12345</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full w-8 h-8 p-0"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full w-8 h-8 p-0"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-1">
          {/* Other Trackings */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="font-bold mb-4">Other Trackings</h3>
            <div className="space-y-4">
              {otherTrackings.map((tracking) => (
                <div
                  key={tracking.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <Package className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="font-medium">#{tracking.id}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      tracking.status === "Delivered"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : tracking.status === "In Transit"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }
                  >
                    {tracking.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Route Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold mb-4">Route Details</h3>
            <div className="relative">
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex mb-8 last:mb-0">
                  <div className="mr-4 relative">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        step.completed ? "bg-green-500" : "bg-gray-200"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="h-6 w-6 text-white" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      )}
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div
                        className={`absolute top-6 left-3 w-0.5 h-16 ${
                          step.completed && trackingSteps[index + 1].completed
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      ></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium">{step.date}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {step.time}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {step.location}
                    </div>
                    <div className="text-sm font-medium mt-1">
                      {step.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
