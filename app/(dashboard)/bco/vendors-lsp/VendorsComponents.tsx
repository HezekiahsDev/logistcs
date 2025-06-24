// import Image from "next/image";
import Link from "next/link";
import { vendorTableData } from "./vendorData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

export const VendorsButton = () => {
  return (
    <Button className="mt-10 float-right bg-[#A5C4D4] hover:bg-[#6d95a9] text-white rounded-md px-6 py-4 flex items-center justify-center space-x-2">
      <Link
        className="flex items-center justify-end space-x-2"
        href="/bco/vendors-lsp/add-vendor"
      >
        <Plus size={24} />
        <span className="font-semibold">Add Vendor</span>
      </Link>
    </Button>
  );
};

export const VendorForm = async () => {
  return (
    <form className="mt-24 space-y-3 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-normal mb-2 text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            className="w-full px-4 text-sm py-3 mt-1 border rounded-sm focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-normal mb-2 text-gray-700">
            ID
          </label>
          <input
            type="text"
            placeholder="Enter ID"
            className="w-full px-4 text-sm py-3 mt-1 border rounded-sm focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-normal mb-2 text-gray-700">
            Service
          </label>
          <input
            type="text"
            placeholder="Service"
            className="w-full px-4 text-sm py-3 mt-1 border rounded-sm focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-normal mb-2 text-gray-700">
            Date
          </label>
          <input
            type="text"
            placeholder="Date"
            className="w-full px-4 text-sm py-3 mt-1 border rounded-sm focus:outline-none"
          />
        </div>
      </div>
    </form>
  );
};

export const VendorTable = () => {
  return (
    <div className="mt-8">
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[#F2F2F2]">
              <TableHead className="w-8 md:w-1/12 px-2 md:px-4 py-6">
                <Checkbox
                  id="select-all"
                  aria-label="Select all"
                  className="w-3 h-3 md:w-4 md:h-4"
                />
              </TableHead>
              <TableHead className=" text-left py-2 px-2 md:py-0 md:px-0 font-semibold text-sm ">
                Invoice ID
              </TableHead>
              <TableHead className=" text-left py-2 px-2 md:py-0 md:px-0 font-semibold text-sm ">
                Date
              </TableHead>
              <TableHead className=" text-left py-2 px-2 md:py-0 md:px-0 font-semibold text-sm ">
                Name
              </TableHead>
              <TableHead className=" text-left py-2 px-2 md:py-0 md:px-0 font-semibold text-sm ">
                Service
              </TableHead>
              <TableHead className=" text-left py-2 px-2 md:py-0 md:px-0 font-semibold text-sm  w-10 md:w-1/12">
                N of days
              </TableHead>
              <TableHead className=" text-left py-2 px-2 md:py-0 md:px-0 font-semibold text-sm  w-10 md:w-1/12">
                Due
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendorTableData.map(
              ({ invoiceID, date, name, service, days, due }) => (
                <TableRow
                  key={invoiceID}
                  className="border-b border-[#F2F2F2] hover:bg-gray-50/50"
                >
                  <TableCell className="w-8 md:w-1/12 px-2 md:px-4 py-4">
                    <Checkbox
                      id={`select-${invoiceID}`}
                      aria-label={`Select ${invoiceID}`}
                      className="w-3 h-3 md:w-4 md:h-4"
                    />
                  </TableCell>
                  <TableCell className="py-4 text-sm font-semibold  text-[#0B63F8]">
                    {invoiceID}
                  </TableCell>
                  <TableCell className="px-2 md:px-0 py-4 text-sm font-semibold ">
                    {date}
                  </TableCell>
                  <TableCell className="px-2 md:px-0 py-4 text-sm font-semibold  ">
                    {name}
                  </TableCell>
                  <TableCell className="px-2 md:px-0 py-4 text-sm font-semibold  ">
                    {service}
                  </TableCell>
                  <TableCell className="px-2 md:px-0 py-4 text-sm font-semibold   w-10 md:w-1/12">
                    {days}
                  </TableCell>
                  <TableCell className="py-4 text-sm font-semibold   w-10 md:w-1/12">
                    {due}%
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
