"use client";

import { useState } from "react";
import { requestsData } from "@/data/requestsData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const RequestsTable = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const isAllSelected = selectedIds.length === requestsData.length;

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(requestsData.map((item) => item.id));
    }
  };

  const toggleOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const actions: ("decline" | "view" | "accept")[] = [
    "decline",
    "view",
    "accept",
  ];

  return (
    <div className="h-full flex flex-col py-4">
      {/* Fixed header */}
      <div className="px-4 pt-2 pb-2">
        <Table>
          <TableCaption className="sr-only">Table Headers</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="p-2">
                <div className="flex justify-center items-center transition-colors duration-150">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={toggleAll}
                  />
                </div>
              </TableHead>
              <TableHead className="p-2">Date Sent</TableHead>
              <TableHead className="p-2">Origin Port</TableHead>
              <TableHead className="p-2">Destination Port</TableHead>
              <TableHead className="p-2">Requester</TableHead>
              <TableHead className="p-2">Commodity</TableHead>
              <TableHead className="p-2">Shipment Type/Mode</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>

      {/* Scrollable body */}
      <ScrollArea className="flex-1 px-4">
        <Table>
          <TableCaption className="sr-only">
            A list of all request made.
          </TableCaption>

          <TableBody>
            {requestsData.map((requestData) => (
              <TableRow key={requestData.id} className="group">
                <TableCell className="p-2 pt-10">
                  <div className="flex justify-center items-center p-1 rounded-full hover:bg-gray-300/50 transition-colors duration-150">
                    <Checkbox
                      checked={selectedIds.includes(requestData.id)}
                      onCheckedChange={() => toggleOne(requestData.id)}
                      title="Select"
                    />
                  </div>
                </TableCell>
                <TableCell className="p-2 pt-10 text-blue-600 font-medium">
                  {requestData.dateSent}
                </TableCell>
                <TableCell className="p-2 pt-10">
                  {requestData.originPort}
                </TableCell>
                <TableCell className="p-2 pt-10">
                  {requestData.destinationPort}
                </TableCell>
                <TableCell className="p-2 pt-10">
                  {requestData.requester}
                </TableCell>
                <TableCell className="p-2 pt-10">
                  {requestData.commodity}
                </TableCell>
                <TableCell className="relative flex flex-col gap-3 p-2 pt-10">
                  <div className="space-x-2">
                    <Badge
                      variant={
                        requestData.shipmentType.toLowerCase() === "import"
                          ? "import"
                          : "export"
                      }
                    >
                      {requestData.shipmentType}
                    </Badge>
                    <Badge variant="shipmentMode">
                      {requestData.shipmentMode}
                    </Badge>
                  </div>

                  <div className="hidden group-hover:flex gap-3 -mb-5 z-40 bg-[#EEF9FF] w-fit px-3 py-2 rounded-xl">
                    {actions.map((action) => (
                      <Badge
                        key={action}
                        variant={action}
                        className="capitalize cursor-pointer"
                      >
                        {action}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default RequestsTable;
