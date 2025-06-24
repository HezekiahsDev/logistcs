"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LineChart, Line, ResponsiveContainer, XAxis } from "recharts";

const data = [
  { name: "1", value: 40 },
  { name: "2", value: 30 },
  { name: "3", value: 45 },
  { name: "4", value: 50 },
  { name: "5", value: 55 },
  { name: "6", value: 65 },
  { name: "7", value: 75 },
];

const unloadingData = [
  {
    id: "SHIP0001",
    origin: "Lagos",
    gate: "Gate A",
    status: "Delivered",
    date: "17 July 2024",
    progress: 100,
  },
  {
    id: "SHIP0002",
    origin: "Lagos",
    gate: "Gate B",
    status: "Delivered",
    date: "17 July 2024",
    progress: 100,
  },
  {
    id: "SHIP0003",
    origin: "Lagos",
    gate: "Gate A",
    status: "Delivered",
    date: "17 July 2024",
    progress: 40,
  },
  {
    id: "SHIP0004",
    origin: "Lagos",
    gate: "Gate C",
    status: "Delivered",
    date: "17 July 2024",
    progress: 40,
  },
  {
    id: "SHIP0005",
    origin: "Lagos",
    gate: "Gate B",
    status: "Delivered",
    date: "17 July 2024",
    progress: 40,
  },
];

export default function Analytics() {
  return (
    <div className="mt-14 py-6 px-6 space-y-6">
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 grid gap-6 md:grid-cols-2">
        {/* Shipment Status */}
        <Card className="bg-transparent border-0 shadow-none">
          <CardHeader className="pb-4 flex flex-col sm:flex-row items-center">
            <div className="relative pt-1 w-full max-w-[180px] md:max-w-[220px] aspect-square mx-auto">
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-3xl md:text-4xl font-bold">27</div>
                <div className="text-xs md:text-sm">Shipment</div>
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="10"
                  strokeDasharray="220"
                  strokeDashoffset="44"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="10"
                  strokeDasharray="220"
                  strokeDashoffset="188"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="10"
                  strokeDasharray="220"
                  strokeDashoffset="207"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center gap-3 md:gap-4 text-sm mt-4 sm:mt-0 sm:ml-4 w-full">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>Complete (20)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span>Pending (5)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>Cancel (2)</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* On Time Status */}
        <Card className="bg-transparent border-0 shadow-none">
          <CardHeader className="pb-4 flex flex-col sm:flex-row items-center">
            <div className="relative pt-1 w-full max-w-[180px] md:max-w-[220px] aspect-square mx-auto">
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-3xl md:text-4xl font-bold">27</div>
                <div className="text-xs md:text-sm">Shipment</div>
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#1e40af"
                  strokeWidth="10"
                  strokeDasharray="220"
                  strokeDashoffset="44"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="10"
                  strokeDasharray="220"
                  strokeDashoffset="188"
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="10"
                  strokeDasharray="220"
                  strokeDashoffset="207"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center gap-3 md:gap-4 text-sm mt-4 sm:mt-0 sm:ml-4 w-full">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-900" />
                <span>On Time (20)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span>Running Late (5)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-500" />
                <span>Transit (2)</span>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
            <select className="text-sm border rounded px-2 py-1">
              <option>July</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                  <XAxis dataKey="name" hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Loading Trucks */}
        <Card className="w-full overflow-hidden">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-3">
            <CardTitle className="text-base font-medium">
              Loading Trucks
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs sm:text-sm"
            >
              View All
            </Button>
          </CardHeader>
          <div className="h-0.5 bg-gray-100 w-full"></div>

          <div className="flex flex-col md:flex-row">
            <CardContent className="pt-4 pb-2 md:pb-6">
              <div className="relative aspect-square w-full max-w-[160px] sm:max-w-[180px] mx-auto">
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-3xl sm:text-4xl font-bold">120</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Total
                  </div>
                </div>
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#1e40af"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset="70"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset="240"
                  />
                </svg>
              </div>
            </CardContent>

            <CardContent className="pt-2 md:pt-6 pb-6">
              <div className="grid grid-cols-2  gap-2 ">
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <div
                    className="flex items-center gap-1 p-2 rounded-md hover:bg-gray-50 transition-colors"
                    key={index}
                  >
                    <div
                      className={`w-1 h-10 rounded-full ${
                        index < 2
                          ? "bg-green-500"
                          : index < 4
                          ? "bg-blue-800"
                          : "bg-red-500"
                      }`}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        Loading {item}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {index < 2
                          ? "Complete"
                          : index < 4
                          ? "In Progress"
                          : "Delayed"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Unloading Cargo Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">Unloading Cargo</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              View All
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SHIPID</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Gate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unloadingData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{row.origin}</TableCell>
                  <TableCell>{row.gate}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell className="w-[200px]">
                    <Progress value={row.progress} className="h-2" />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
