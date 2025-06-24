"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Calendar,
  Edit,
  Eye,
  MapPin,
  MoreHorizontal,
  Trash,
  Users,
} from "lucide-react";

import MultiStepDialog from "./muilti-steps";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface Request {
  id: number;
  dateSent: string;
  originPort: string;
  destinationPort: string;
  requester: string;
  commodity: string;
  shipmentType: string;
  mode: string;
}

const request: Request[] = [
  {
    id: 1,
    dateSent: "2023-10-01",
    originPort: "Origin Port 1",
    destinationPort: "Destination Port 1",
    requester: "Requester 1",
    commodity: "Commodity 1",
    shipmentType: "Shipment Type 1",
    mode: "Mode 1",
  },
  {
    id: 2,
    dateSent: "2023-10-02",
    originPort: "Origin Port 2",
    destinationPort: "Destination Port 2",
    requester: "Requester 2",
    commodity: "Commodity 2",
    shipmentType: "Shipment Type 2",
    mode: "Mode 2",
  },
];

function FFRequest() {
  const RequestActions = ({ request }: { request: Request }) => (
    <div className="flex justify-end gap-2">
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Link href={`/ff/request/${request.id}`}>
          <Eye className="h-4 w-4" />
          <span className="sr-only">View</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        // onClick={() => handleEditClick(event)}
      >
        <Edit className="h-4 w-4" />
        <span className="sr-only">Edit</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="flex items-center">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center"
            // onClick={() => handleEditClick(event)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Event
          </DropdownMenuItem>
          <DropdownMenuItem
            // onClick={() => handleDelete(event.id)}
            className="flex items-center text-destructive"
          >
            <Trash className="mr-2 h-4 w-4" />
            {/* {isDeleting ? "Deleting..." : "Delete Event"} */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  return (
    <div className="mt-24 px-4 md:px-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">FF Requests</h2>
          <MultiStepDialog />
        </div>
        <div className="flex flex-col md:hidden">
          {request.map((request) => (
            <div key={request.id} className="border-b py-2">
              <Card className="px-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">
                      {request.requester}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {request.dateSent}
                    </p>
                  </div>
                  <RequestActions request={request} />
                </div>
                <div className="mt-2">
                  <p className="text-sm">{request.originPort}</p>
                  <p className="text-sm">{request.destinationPort}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:block rounded-md border">
        <ScrollArea className="h-[500px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date Sent</TableHead>
                <TableHead>Origin Port</TableHead>
                <TableHead>Destination Port</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Commodity</TableHead>
                <TableHead>Shipment Type/Mode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {request.length > 0 ? (
                request.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                        <div className="font-medium">{request.dateSent}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                          <span>{request.originPort}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                        {request.destinationPort}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span>{request.requester}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                        <span>{request.commodity}</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <RequestActions request={request} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    No events found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}

export default FFRequest;
