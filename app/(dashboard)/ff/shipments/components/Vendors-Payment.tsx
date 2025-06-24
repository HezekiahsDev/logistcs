"use client"

import { useState, useEffect } from "react"
import { MoreHorizontal } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"
import { useShipment } from "../context/ShipmentContext"


export default function VendorPayments() {
  const { vendorPayments, markAsPaid, deletePayment } = useShipment()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPayments, setFilteredPayments] = useState(vendorPayments)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter payments based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPayments(vendorPayments)
    } else {
      const lowercaseQuery = searchQuery.toLowerCase()
      const filtered = vendorPayments.filter(
        (payment) =>
          payment.service.toLowerCase().includes(lowercaseQuery) ||
          payment.vendor.toLowerCase().includes(lowercaseQuery) ||
          payment.amount.toLowerCase().includes(lowercaseQuery) ||
          payment.status.toLowerCase().includes(lowercaseQuery),
      )
      setFilteredPayments(filtered)
    }
  }, [searchQuery, vendorPayments])

  // Calculate pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
  const paginatedPayments = filteredPayments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#8BC5E326]">
            <TableHead className="text-[#464255] font-medium">Services</TableHead>
            <TableHead className="text-[#464255] font-medium">Amount</TableHead>
            <TableHead className="text-[#464255] font-medium">Vendor</TableHead>
            <TableHead className="text-[#464255] font-medium">Status</TableHead>
            <TableHead className="text-[#464255] font-medium">Trade Force</TableHead>
            <TableHead className="text-[#464255] font-medium">Payment Date</TableHead>
            <TableHead className="text-[#464255] font-medium"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedPayments.map((payment, index) => (
            <TableRow key={index} className="border-b-2 border-[#C0DBFB5E]">
              <TableCell className="py-4 text-[#464255]">{payment.service}</TableCell>
              <TableCell className="py-4 text-[#464255]">{payment.amount}</TableCell>
              <TableCell className="py-4 text-[#464255]">{payment.vendor}</TableCell>
              <TableCell className="py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    payment.status === "Paid" ? "bg-[#f2f5f3] text-[#81d17c]" : "bg-[#fff8f3] text-[#fb5b01]"
                  }`}
                >
                  {payment.status}
                </span>
              </TableCell>
              <TableCell className="py-4">
                <div className="w-6 h-6 rounded-full flex items-center justify-center">
                  {payment.status === "Paid" ? (
                    <div className="w-6 h-6 rounded-full bg-[#81d17c] flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#fb5b01] flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="py-4 text-[#464255]">{payment.paymentDate}</TableCell>
              <TableCell className="py-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-[#969ba0] hover:text-[#464255] transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => alert(`View details for ${payment.service}`)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => alert(`Edit ${payment.service}`)}>Edit</DropdownMenuItem>
                    {payment.status === "Pending" && (
                      <DropdownMenuItem onClick={() => markAsPaid(index)}>Mark as Paid</DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500" onClick={() => deletePayment(index)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink onClick={() => handlePageChange(page)} isActive={page === currentPage}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
