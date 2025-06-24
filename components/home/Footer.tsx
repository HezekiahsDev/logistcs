import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-[#4A3A3A] text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/WhiteLogoUbuntu.png"
              alt="Ubuntu Portal"
              width={200}
              height={50}
              className="mb-4"
            />
            <div className="space-y-2">
              <h3 className="font-semibold">Customer Support:</h3>
              <p className="text-lg">(629) 555-0129</p>
              <p>4517 Ave. Abidjan, Kentucky 39495</p>
              <p>info@Ubuntu Portal.com</p>
            </div>
          </div>

          {/* Top Category */}
          <div>
            <h2 className="text-white font-semibold mb-4">TOP CATEGORY</h2>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  Computer & Laptop
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  SmartPhone
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Headphone
                </Link>
              </li>
              <li>
                <Link href="#" className="text-yellow-400">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Camera & Photo
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  TV & Homes
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="inline-flex items-center text-yellow-400 hover:text-yellow-300"
                >
                  Browse All Product
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-white font-semibold mb-4">QUICK LINKS</h2>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white">
                  Shop Product
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Compare
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Customer Help
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Tags & Subscribe */}
          <div className="space-y-6">
            <div>
              <h2 className="text-white font-semibold mb-4">POPULAR TAG</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Game",
                  "iPhone",
                  "TV",
                  "Asus Laptops",
                  "Macbook",
                  "SSD",
                  "Graphics Card",
                  "Power Bank",
                  "Smart TV",
                  "Speaker",
                  "Tablet",
                  "Microwave",
                  "Samsung",
                ].map((tag) => (
                  <Link
                    key={tag}
                    href="#"
                    className="inline-block px-3 py-1 bg-[#5C4848] hover:bg-[#6C5858] rounded text-sm"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-white font-semibold mb-4">Subscribe Us</h2>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Info@yourgmail.com"
                  className="bg-transparent border-gray-600 text-gray-300"
                />
                <Button size="icon" className="bg-[#5C4848] hover:bg-[#6C5858]">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-4 border-t border-gray-700 text-center text-sm">
          Ubuntu Portal © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
