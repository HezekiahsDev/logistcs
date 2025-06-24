"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeatureNews() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const newsItems = [
    {
      title:
        "The THE UBUNTU LOGISTICS cung cấp dịch vụ gom hàng lẻ và chuyển hàng nguyên container",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-25%20155910-cilRVJsMUJ0OE7ZHs6GeXZ3xCWN8vy.png",
      excerpt:
        "The THE UBUNTU LOGISTICS cung cấp dịch vụ gom hàng lẻ và chuyển hàng nguyên container thông là ULC – cam kết Optimized Level Up Hàng",
    },
    {
      title:
        "The THE UBUNTU LOGISTICS cung cấp dịch vụ gom hàng lẻ và chuyển hàng nguyên container",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-25%20155910-cilRVJsMUJ0OE7ZHs6GeXZ3xCWN8vy.png",
      excerpt:
        "The THE UBUNTU LOGISTICS cung cấp dịch vụ gom hàng lẻ và chuyển hàng nguyên container thông là ULC",
    },
  ];

  const testimonials = [
    {
      name: "Trần Quốc Cường",
      title: "Fashion Store",
      rating: 5,
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit voluptatibus et id quaerat nunc eaque dolore maiores, tenetur dolorem Lorem ipsum dolor sit amet consectetur",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4  lg:px-36 py-8">
      {/* Feature News Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8">
            <Image
              src="/LogoU.png"
              alt="Ubuntu Logistics Logo"
              width={60}
              height={60}
              className="mx-auto"
            />
          </div>
          <h2 className="text-2xl font-semibold text-[#722F37]">
            Feature News
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-600">
                <path
                  d="M15 17h5l-1.4-1.4c1-1.2 1.4-2.6 1.4-4.1 0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8c1.5 0 3-.4 4.1-1.4L17 15v5l7-7-7-7v5h-5c-.6-1.2-1.5-2.1-2.7-2.7C14.3 3.7 18 5.8 18 9c0 2.2-1.8 4-4 4s-4-1.8-4-4c0-1.5.8-2.8 2-3.4C10.4 5.3 9 7 9 9c0 3.3 2.7 6 6 6z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              2
            </div>
          </div>
          <Button
            variant="ghost"
            className="text-[#722F37] hover:text-[#722F37]/80 font-medium"
          >
            See all
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="space-y-4">
          {newsItems.slice(0, 1).map((item, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-medium text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.excerpt}</p>
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="/truck.png"
                  alt="News thumbnail"
                  width={280}
                  height={200}
                  className="rounded-lg object-cover w-full h-[200px]"
                />
                <Image
                  src="/container.png"
                  alt="News thumbnail"
                  width={280}
                  height={200}
                  className="rounded-lg object-cover w-full h-[200px]"
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="aspect-[4/3] relative mb-4">
            <Image
              src="/ware.png"
              alt="Featured news image"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <h3 className="font-medium text-gray-900 mb-2">
            The THE UBUNTU LOGISTICS cung cấp dịch vụ gom hàng lẻ và chuyển hàng
            nguyên container
          </h3>
          <p className="text-sm text-gray-600">
            The THE UBUNTU LOGISTICS cung cấp dịch vụ gom hàng lẻ và chuyển hàng
            nguyên container thông là ULC
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 mx-auto mb-4">
          <Image
            src="/LogoU.png"
            alt="Ubuntu Logistics Logo"
            width={60}
            height={60}
            className="mx-auto"
          />
        </div>
        <h2 className="text-2xl font-semibold text-[#722F37] mb-8">
          What client said
        </h2>

        <div className="max-w-2xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-opacity duration-300 ${
                activeTestimonial === index ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6">{testimonial.content}</p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    src="/placeholder.svg"
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                activeTestimonial === index ? "bg-[#722F37]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
