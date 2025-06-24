"use client";

import { ArrowLeft, Building, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RequestDetailsPage() {
  return (
    <div className="container mx-auto py-6 max-w-5xl mt-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/ff/request"
          className="flex items-center text-lg font-medium"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Request Details
        </Link>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="bg-black text-white hover:bg-gray-800 border-0"
          >
            DECLINE REQUEST
          </Button>
          <Button
            variant="outline"
            className="bg-sky-200 text-sky-800 hover:bg-sky-300 border-0"
          >
            ACCEPT REQUEST
          </Button>
        </div>
      </div>

      {/* Export Type */}
      <div className="flex items-center gap-4 mb-6">
        <span className="font-medium">Export</span>
        <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
          SEA FREIGHT LCL
        </div>
      </div>

      {/* Shipping Information */}
      <div className="bg-sky-100 rounded-lg p-6 mb-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 pointer-events-none"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {/* Origin Port */}
          <div className="flex items-start">
            <div className="bg-white p-2 rounded-full mr-3">
              <MapPin className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500 uppercase mb-1">
                ORIGIN PORT
              </div>
              <div className="font-medium">Kaduna, Nigeria</div>
            </div>
          </div>

          {/* Destination Port */}
          <div className="flex items-start">
            <div className="bg-white p-2 rounded-full mr-3">
              <MapPin className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500 uppercase mb-1">
                DESTINATION PORT
              </div>
              <div className="font-medium">Marrakech, Morocco</div>
            </div>
          </div>

          {/* Shipper */}
          <div className="flex items-start">
            <div className="bg-white p-2 rounded-full mr-3">
              <Building className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500 uppercase mb-1">
                Shipper
              </div>
              <div className="font-medium">LORRI EXPORT</div>
            </div>
          </div>

          {/* Consignee */}
          <div className="flex items-start">
            <div className="bg-white p-2 rounded-full mr-3">
              <Building className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500 uppercase mb-1">
                Consignee
              </div>
              <div className="font-medium">BERNELAD IMPORT</div>
            </div>
          </div>
        </div>

        {/* Network Diagram */}
        <div className="absolute right-0 top-0 h-full w-1/3 pointer-events-none">
          <div className="relative h-full w-full">
            {/* Connection Lines (simplified) */}
            <div className="absolute top-0 right-0 h-full w-full opacity-20">
              <svg
                width="330"
                height="245"
                viewBox="0 0 330 445"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M272.767 324.232C266.932 326.926 262.229 331.426 259.426 336.997C256.624 342.568 255.887 348.88 257.337 354.902C258.787 360.923 262.338 366.298 267.41 370.147C272.481 373.996 278.772 376.092 285.256 376.091C289.563 376.092 293.815 375.166 297.696 373.385C301.577 371.603 304.986 369.01 307.67 365.799C310.354 362.589 312.243 358.843 313.199 354.84C314.154 350.837 314.15 346.681 313.187 342.68C312.224 338.679 310.326 334.937 307.636 331.731C304.946 328.525 301.531 325.939 297.647 324.164C293.763 322.389 289.509 321.471 285.202 321.479C280.894 321.487 276.644 322.42 272.767 324.21L246.81 267.788C236.721 273.096 225.382 275.876 213.857 275.866C205.559 275.878 197.329 274.444 189.572 271.634M189.572 271.634L144.131 373.85M189.572 271.634C174.162 266.026 161.413 255.275 153.698 241.381C145.983 227.486 143.826 211.394 147.629 196.098M223.588 146.913C206.312 144.505 188.726 148.539 174.493 158.177M144.131 373.85C139.411 372.224 134.402 371.501 129.389 371.72C124.376 371.939 119.458 373.097 114.914 375.127C110.371 377.158 106.292 380.022 102.909 383.554C99.5274 387.087 96.9086 391.22 95.2027 395.718C93.4968 400.215 92.7372 404.989 92.9672 409.766C93.1972 414.543 94.4123 419.23 96.5432 423.559C98.6741 427.889 101.679 431.776 105.386 434.999C109.094 438.222 113.431 440.717 118.15 442.343C127.683 445.626 138.194 445.166 147.371 441.064C156.548 436.962 163.639 429.554 167.084 420.47C170.53 411.385 170.047 401.369 165.742 392.624C161.438 383.879 153.664 377.133 144.131 373.85ZM147.629 196.098L88.7554 186.689M147.629 196.098C151.454 180.772 161.003 167.296 174.493 158.188L152.572 130.745M88.7554 186.689C86.9376 197.12 81.0673 206.516 72.3115 213.011C63.5558 219.506 52.5558 222.623 41.4986 221.743C30.4413 220.863 20.1366 216.05 12.633 208.261C5.12946 200.471 0.976612 190.277 1.0001 179.703C1.01302 173.887 2.29051 168.137 4.75202 162.814C7.21352 157.492 10.8056 152.714 15.3018 148.781C19.7979 144.848 25.1006 141.845 30.8753 139.962C36.65 138.079 42.7715 137.357 48.8537 137.841C54.9359 138.325 60.8468 140.005 66.2136 142.775C71.5805 145.545 76.2869 149.344 80.0359 153.934C83.7849 158.523 86.4952 163.804 87.996 169.441C89.4967 175.079 89.7553 180.951 88.7554 186.689ZM152.572 130.745C146.975 135.187 139.756 137.328 132.502 136.698C125.249 136.067 118.555 132.717 113.894 127.383C109.233 122.05 106.986 115.17 107.648 108.258C108.309 101.346 111.825 94.9675 117.422 90.5257C123.019 86.0839 130.238 83.9427 137.492 84.5732C141.083 84.8854 144.575 85.8687 147.768 87.4669C150.961 89.0651 153.792 91.2469 156.1 93.8877C158.408 96.5286 160.148 99.5768 161.219 102.858C162.291 106.14 162.674 109.59 162.347 113.013C162.019 116.435 160.987 119.763 159.31 122.806C157.633 125.848 155.343 128.546 152.572 130.745ZM286.414 164.844C289.484 168.874 293.365 172.281 297.83 174.868C302.296 177.454 307.257 179.169 312.424 179.911C317.592 180.653 322.862 180.408 327.929 179.19C332.997 177.973 337.759 175.807 341.939 172.819C346.12 169.831 349.634 166.08 352.279 161.785C354.923 157.49 356.645 152.736 357.343 147.801C358.041 142.866 357.702 137.848 356.346 133.038C354.99 128.229 352.643 123.725 349.442 119.789C343.173 111.823 333.839 106.556 323.494 105.148C313.15 103.74 302.642 106.305 294.282 112.28C285.922 118.254 280.396 127.149 278.918 137.007C277.44 146.864 280.144 156.878 286.414 164.844ZM286.414 164.844L270.081 174.515M270.081 174.515C277.817 185.278 281.948 198.021 281.925 211.06C281.925 216.919 281.089 222.597 279.572 228.012M270.081 174.515C264.763 167.095 257.897 160.809 249.896 156.055C241.895 151.302 232.944 148.185 223.612 146.902L233.534 71.0131M333.658 245.113C331.615 251.888 331.251 259.024 332.595 265.956C333.94 272.889 336.956 279.429 341.406 285.061C345.856 290.692 351.619 295.262 358.239 298.409C364.859 301.556 372.156 303.195 379.554 303.195C385.964 303.411 392.353 302.395 398.342 300.206C404.33 298.018 409.795 294.703 414.41 290.458C419.024 286.213 422.695 281.126 425.201 275.5C427.708 269.875 429 263.825 429 257.713C429 251.602 427.708 245.552 425.201 239.926C422.695 234.301 419.024 229.214 414.41 224.969C409.795 220.724 404.33 217.409 398.342 215.22C392.353 213.032 385.964 212.016 379.554 212.232C369.195 212.226 359.115 215.431 350.834 221.362C342.554 227.293 336.533 235.629 333.658 245.113ZM333.658 245.113L279.56 228.001C277.176 236.382 273.049 244.221 267.426 251.054C261.802 257.886 254.796 263.573 246.822 267.777M233.534 71.0131C235.086 71.2028 236.662 71.2976 238.262 71.2976C245.582 71.2976 252.738 69.229 258.825 65.3534C264.911 61.4779 269.655 55.9694 272.457 49.5245C275.258 43.0797 275.991 35.988 274.563 29.1462C273.135 22.3044 269.61 16.0198 264.434 11.0871C259.257 6.15443 252.662 2.79524 245.483 1.43432C238.303 0.0734008 230.861 0.771874 224.098 3.44141C217.335 6.11095 211.554 10.6317 207.487 16.4319C203.42 22.2321 201.249 29.0512 201.249 36.0271V36.0498C201.254 44.6189 204.531 52.8935 210.47 59.3277C216.41 65.7619 224.615 69.9157 233.534 71.0131Z"
                  stroke="#042f66"
                  stroke-width="0.514312"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Commodity Details */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="4"
              y="4"
              width="16"
              height="16"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M9 12H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <h2 className="font-medium">Commodity Details</h2>
        </div>

        {/* Commodity Table */}
        <div className="space-y-6">
          {/* First Commodity */}
          <div className="border-b pb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  Commercial/Package Name
                </div>
                <div className="font-medium">Cashew Nuts</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Package Type</div>
                <div className="font-medium">Pallets</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  Package Weight (NET)
                </div>
                <div className="font-medium">25.000 kg</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  Package Weight (GROSS)
                </div>
                <div className="font-medium">25.200 kg</div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Cargo Value</div>
              <div className="font-medium">45.00 USD</div>
            </div>
          </div>

          {/* Second Commodity */}
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  Commercial/Package Name
                </div>
                <div className="font-medium">Cashew Nuts</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Package Type</div>
                <div className="font-medium">Pallets</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  Package Weight (NET)
                </div>
                <div className="font-medium">25.000 kg</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  Package Weight (GROSS)
                </div>
                <div className="font-medium">25.200 kg</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
