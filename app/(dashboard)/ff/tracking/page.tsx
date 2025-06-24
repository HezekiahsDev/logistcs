"use client";

import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function HomePage() {
  const [trackingNumber, setTrackingNumber] = useState("");

  return (
    <div className="flex h-screen mt-20">
      {/* Left Panel */}
      <div className="w-full md:w-1/3 bg-sky-100 p-8 flex flex-col relative">
        <div className="relative mb-12">
          <Input
            type="text"
            placeholder="Enter tracking number"
            className="pl-10 pr-4 py-2 rounded-md"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex-grow flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-4">Tracking Starts Here</h2>
          <p className="text-sm mb-8">
            Track your shipments with the most convenient tool. Want more
            visibility of deliveries? Just enter the tracking number. Or explore
            more opportunities with us
          </p>

          <div className="flex space-x-4">
            <Button className="bg-white text-black hover:bg-gray-100">
              BOOK NOW
            </Button>
            <Link
              href="/request-quote"
              className="flex items-center text-sm font-medium"
            >
              Request a quote <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Background Image - Semi-transparent truck */}
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=800')",
            backgroundSize: "cover",
          }}
        ></div>
      </div>

      {/* Right Panel - Map */}
      <div className="hidden md:block w-2/3 bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12615.223732917!2d-122.42072221533728!3d37.77639597966253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858093edc7c0ad%3A0x3cdf80b5d4887cf4!2sCivic%20Center%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1715694967!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
