"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Background from "../assets/icons/bg-vector.svg";
import Consignee from "../assets/icons/consignee-icon.svg";
import Destination from "../assets/icons/destination-port.svg";
import OriginPort from "../assets/icons/origin-port.svg";
import Shiper from "../assets/icons/shiper-icon.svg";
import { Truck } from "lucide-react";

const Shipments = () => {
  interface FlowItems {
    name: string;
    time: string;
  }

  const flow: FlowItems[] = [
    { name: "Request Received ", time: "08:00 AM" },
    { name: "Request Accepted", time: "10:50 AM" },
    { name: "Workflow Applied ", time: "06:50 AM" },
    { name: "Quote Sent to BCO", time: "11:25 AM" },
    { name: "Review Quote Received from BCO", time: "03:50 PM" },
  ];
  return (
    <div className="mt-16">
      <Card className="w-full min-h-screen mx-auto space-x-10 space-y-10 py-10 px-10">
        {/* Shipping Details */}
        <div className="w-full grid grid-cols-2 bg-[#8BC5E326] relative rounded-3xl p-10 sm:grid-cols-3 gap-8 mb-10">
          <div className="absolute right-0 top-1/2 opacity-50 translate-y-[-50%] lg:opacity-100 lg:translate-y-0 lg:-top-14 w-full  lg:w-1/4">
            <Image src={Background} alt="Background Side Image" />
          </div>

          {/* Origin Port */}
          <div className="flex p-5 items-center gap-3">
            <Image
              src={OriginPort}
              alt="Origin Port Icon"
              className="w-10 h-10 mt-1"
            />
            <div>
              <div className="uppercase text-[19px] font-[600] text-[#000000]">
                Origin Port
              </div>
              <div className="text-[23px] font-[800]">Kaduna, Nigeria</div>
            </div>
          </div>
          <div className="flex p-5 items-center gap-3">
            <Image
              src={Destination}
              alt="Destination Port Icon"
              className="w-10 h-10 mt-1"
            />
            <div>
              <div className="uppercase text-[19px] font-[600] text-[#000000]">
                Destination Port
              </div>
              <div className="text-[23px] font-[800]">Marrakech, Morocco</div>
            </div>
          </div>

          <div className="flex p-5 items-center gap-3">
            <Truck />
            <div>
              <div className="uppercase text-[19px] font-[600] text-[#000000]">
                Shipper
              </div>
              <div className="text-[23px] font-[800]">Ubuntu Shipping LLC</div>
            </div>
          </div>

          <div className="flex p-5 items-center gap-3">
            <Image
              src={Shiper}
              alt="Shiper Details icon"
              className="w-10 h-10 mt-1"
            />
            <div>
              <div className="text-[19px] uppercase font-medium text-[#000000]">
                Consignee
              </div>
              <div className="text-[23px] text-[#000000] font-bold">
                Afiim Shippers
              </div>
            </div>
          </div>
          <div className="flex p-5 items-center gap-3">
            <Image
              src={Consignee}
              alt="Consignee Icon"
              className="w-10 h-10 mt-1"
            />
            <div>
              <div className="text-[19px] uppercase font-medium text-[#000000]">
                Booking Date
              </div>
              <div className="text-[23px] text-[#000000] font-bold">
                Feb 3, 2025
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-6">
          <div className="grid">
            <ul className="flex justify-between items-center gap-4 mb-6">
              <li>Shipment Overview</li>
              <li>Vendor Payments</li>
              <li>Invoices</li>
              <li>Documents</li>
            </ul>

            <div className="flex items-center gap-3 mb-6">
              <Image
                src={Consignee}
                alt="Commodity Details Icon"
                className="w-10 h-10"
              />
              <span className="font-[600] text-[#000000] text-[19px]">
                Invoice Info
              </span>
            </div>
            <CardHeader>
              <p className="text-[16px] font-medium text-[#000000]">
                Recipient
              </p>
              <h3 className="text-[20px] font-medium text-[#000000]">
                Morocco Souks
              </h3>
            </CardHeader>
            <Card className="p-5 border-none bg-[#8BC5E326]">
              <CardContent>
                <CardTitle className="text-[20px] text-[#000000] mb-6">
                  Import of Bags of Beans form Nigeria{" "}
                  <hr className="w-full border-[#4299FF] mt-2" />
                </CardTitle>
                <CardDescription>
                  {/* Insurance Policy */}
                  <div className=" uppercase gap-16 mb-6">
                    <div className="flex justify-between items-center">
                      <p className="text-[16px] font-[400] text-[#000000]">
                        Insurance Policy
                      </p>

                      <p className="text-[16px] font-[400] text-[#000000]">
                        Invoice ID
                      </p>
                    </div>
                  </div>

                  {/* Goods in Transit */}
                  <div className=" uppercase gap-16 mb-6">
                    <div className="flex justify-between items-center">
                      <p className="text-[20px] font-[800] text-[#000000]">
                        Goods in Transit (GIT)
                      </p>

                      <p className="text-[20px] font-[800] text-[#000000]">
                        #657890
                      </p>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="w-full uppercase gap-16 bg-white rounded-full py-2 px-6 mb-6">
                    <div className="flex justify-between items-center">
                      <p className="text-[16px] font-[400] text-[#000000]">
                        Service
                      </p>

                      <p className="text-[16px] font-[400] text-[#000000]">
                        Amount
                      </p>
                    </div>
                  </div>

                  {/* Freight Details */}
                  <div className="gap-16  mb-4">
                    <div className="flex justify-between items-center ml-2 mb-2">
                      <p className="text-[16px] font-[400] text-[#000000]">
                        Freight Cost
                      </p>

                      <p className="text-[16px] font-[400] text-[#000000]">
                        $14,098.00
                      </p>
                    </div>
                    <hr className="w-full border-[#4299FF]" />
                  </div>

                  <div className="gap-16 mb-8">
                    <div className="flex justify-between items-center ml-2 mb-2">
                      <p className="text-[16px] font-[400] text-[#000000]">
                        Freight Cost
                      </p>

                      <p className="text-[16px] font-[400] text-[#000000]">
                        $14,098.00
                      </p>
                    </div>
                    <hr className="w-full border-[#4299FF]" />
                  </div>

                  {/* Total Amount */}
                  <div className="gap-16  ">
                    <div className="flex justify-between items-center ml-2">
                      <p className="text-[16px] font-[800] text-[#000000]">
                        Total Amount
                      </p>

                      <p className="text-[16px] font-[800] text-[#000000]">
                        $28,196.00
                      </p>
                    </div>
                  </div>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="border-none bg-[#8BC5E326]">
              <CardHeader>
                <CardTitle className="text-[#192A3E] text-[20px] mb-4 font-[800] leading-[32px] tracking-[-4%]">
                  Quote Timeline
                </CardTitle>
                <CardContent>
                  <div>
                    {flow.map((item, key) => {
                      return (
                        <div key={key}>
                          <div className="flex gap-4 items-center">
                            <div className="w-10 h-10 p-4 rounded-full bg-gray-500">
                              <div className="w-full h-full rounded-full bg-white"></div>
                            </div>
                            <div>
                              <h1 className="text-lg text-blue-950 font-bold">
                                {item.name}
                              </h1>
                              <p className="text-sm text-gray-400">
                                {item.time}
                              </p>
                            </div>
                          </div>
                          {key !== flow.length - 1 && (
                            <div className="flex flex-col gap-2 w-3 items-center justify-center">
                              {flow.map((val) => {
                                return (
                                  <div
                                    key={val.name}
                                    className="w-2 h-2 border-black border-l-6"
                                  ></div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Shipments;
