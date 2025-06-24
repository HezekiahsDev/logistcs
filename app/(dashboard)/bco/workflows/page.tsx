import { MoveRightIcon, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function WorkflowUI() {
  return (
    <div className="mt-10 min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="workflows" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <TabsList className="bg-transparent w-auto h-auto p-0 space-x-6">
                <TabsTrigger
                  value="workflows"
                  className="text-gray-500 font-medium data-[state=active]:text-blue-300 data-[state=active]:underline data-[state=active]:font-bold rounded-none px-0 py-2 h-auto bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Workflows
                </TabsTrigger>
                <TabsTrigger
                  value="draft"
                  className="text-gray-500 font-medium data-[state=active]:text-blue-300 data-[state=active]:underline data-[state=active]:font-bold rounded-none px-0 py-2 h-auto bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Draft
                </TabsTrigger>
                <TabsTrigger
                  value="archeive"
                  className="text-gray-500 font-medium data-[state=active]:text-blue-300 data-[state=active]:underline data-[state=active]:font-bold rounded-none px-0 py-2 h-auto bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Archeive
                </TabsTrigger>
              </TabsList>
              <h1 className="text-[#5F6C72] font-bold text-lg pt-2">
                UPL Workflows
              </h1>
            </div>
            <Dialog>
              <DialogTrigger className="flex items-center justify-center bg-blue-300 p-2 rounded-md">
                <Plus className="h-4 w-4 mr-1" /> Add Workflow
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="items-center">
                  <DialogTitle>Workflow Details</DialogTitle>
                  <DialogDescription>Create a new workflow</DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="Newworkflow">
                  <TabsList>
                    <TabsTrigger value="Description">Description</TabsTrigger>
                    <TabsTrigger value="Shipment">Shipment</TabsTrigger>
                    <TabsTrigger value="ModeandType">Mode & Type</TabsTrigger>
                    <TabsTrigger value="AddOn">AddOn</TabsTrigger>
                  </TabsList>
                  <TabsContent value="Description">
                    <form className="space-y-6">
                      <div>
                        <Label htmlFor="name"> Workflow Name</Label>
                        <Input id="name" placeholder="Workflow Name" />
                      </div>
                      <div></div>
                      <div>
                        <Label htmlFor="description">
                          Workflow Description
                        </Label>
                        <Input
                          id="description"
                          placeholder="Workflow Description"
                        />
                      </div>
                      <Button>
                        Next <MoveRightIcon />
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="Shipment">
                    <form className="space-y-6">
                      <div>
                        <Label>Shipment Duration</Label>
                        <Select>
                          <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Shipment Duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Duration</SelectLabel>
                              <SelectItem value="apple">2 Month</SelectItem>
                              <SelectItem value="banana">2 Month</SelectItem>
                              <SelectItem value="blueberry">2 Month</SelectItem>
                              <SelectItem value="grapes">2 Month</SelectItem>
                              <SelectItem value="pineapple">2 Month</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div></div>
                      <div>
                        <Label>Total Anticipated Amount</Label>
                        <Input
                          type="amount"
                          placeholder="Total Anticipated Amount "
                        />
                      </div>
                      <Button>
                        {" "}
                        Next <MoveRightIcon />
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="ModeandType">
                    <form className="space-y-6">
                      <div>
                        <Label>Shipment Type</Label>
                        <div className="flex gap-4">
                          <div className="space-x-2">
                            <label htmlFor="import">Import</label>
                            <Checkbox id="import" />
                          </div>
                          <div className="space-x-2">
                            <label htmlFor="export">Export</label>
                            <Checkbox id="export" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <Select>
                          <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Please Select a Duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Duration</SelectLabel>
                              <SelectItem value="apple">2 Month</SelectItem>
                              <SelectItem value="banana">2 Month</SelectItem>
                              <SelectItem value="blueberry">2 Month</SelectItem>
                              <SelectItem value="grapes">2 Month</SelectItem>
                              <SelectItem value="pineapple">2 Month</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Shipment Mode</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-x-2">
                            <label htmlFor="air">Air Freight</label>
                            <Checkbox id="air" />
                          </div>
                          <div className="space-x-2">
                            <label htmlFor="land">Land Freight</label>
                            <Checkbox id="land" />
                          </div>
                          <div className="space-x-2">
                            <label htmlFor="seafcl">Sea FCL</label>
                            <Checkbox id="seafcl" />
                          </div>
                          <div className="space-x-2">
                            <label htmlFor="sealcl">Sea LCL</label>
                            <Checkbox id="sealcl" />
                          </div>
                        </div>
                      </div>
                      <Button>
                        Next <MoveRightIcon />
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="AddOn">
                    <form className="space-y-4">
                      <div className="space-x-2">
                        <Checkbox id="tradefinance" />
                        <label htmlFor="tradefinance">Trade Finance</label>
                      </div>
                      <div className="space-x-2">
                        <Checkbox id="insurance" />
                        <label htmlFor="insurance">Insurance</label>
                      </div>
                      <div className="space-x-2">
                        <Checkbox id="premium" />
                        <label htmlFor="premium">Premium Support</label>
                      </div>
                      <Button>Submit</Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value="workflows">
            <div className="flex justify-around">
              <Card className="col-span-1 bg-white h-max shadow-md rounded-lg p-6 border-0">
                <h2 className="text-[#5F6C72] underline font-bold text-xl py-2 mb-6 text-center">
                  My Workflows
                </h2>

                <div className="space-y-4 py-4">
                  {[
                    "EXPORT (AIRFREIGHT) MOROCCO",
                    "EXPORT (AIRFREIGHT) NIGERIA",
                    "EXPORT (AIRFREIGHT) EGYPT",
                    "EXPORT (AIRFREIGHT) ALGERIA",
                  ].map((workflow, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b pb-3"
                    >
                      <span className="text-[#1D607F] underline font-bold px-2">
                        {workflow}
                      </span>
                      <span className="text-xs bg-blue-100 text-[#464255] px-2 mx-6 py-1 rounded-3xl">
                        Specified Workflow
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="bg-none flex flex-col">
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="bg-white rounded-lg m-2 p-3 hover:border-2 hover:border-black cursor-pointer">
                      <div className="p-4 flex justify-between items-center">
                        <span className="font-medium bg-blue-100 rounded-3xl px-3 py-1 hover:border hover:border-black">
                          Export
                        </span>
                        <span className="text-md text-[#1D607F] px-2 py-1 hover:font-bold">
                          SPECIFIED WORKFLOW
                        </span>
                      </div>

                      <div className="p-4">
                        <div className="mb-1 font-bold">Sugar Imports</div>
                        <div className="text-xs text-gray-500 mb-4">
                          Specified workflow type
                        </div>

                        <div className="flex justify-around space-x-4">
                          <span className="bg-amber-100 text-amber-800 border hover:border-black rounded-3xl px-3 py-1 text-sm">
                            Trade FINANCE
                          </span>
                          <span className="bg-blue-100 text-blue-800 border hover:border-black rounded-3xl px-3 py-1 text-sm">
                            SEA FREIGHT FCL
                          </span>
                        </div>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <Card className="bg-white rounded-lg m-2 p-3 hover:border-2 hover:border-black cursor-pointer">
                      <div className="p-4 flex justify-between items-center">
                        <span className="font-medium bg-blue-100 rounded-3xl px-3 py-1 hover:border hover:border-black">
                          Export
                        </span>
                        <span className="text-md text-[#1D607F] px-2 py-1 hover:font-bold">
                          SPECIFIED WORKFLOW
                        </span>
                      </div>

                      <div className="p-4">
                        <div className="mb-1 font-bold">Sugar Imports</div>
                        <div className="text-xs text-gray-500 mb-4">
                          Specified workflow type
                        </div>

                        <div className="flex justify-around space-x-4">
                          <span className="bg-amber-100 text-amber-800 border hover:border-black rounded-3xl px-3 py-1 text-sm">
                            Trade FINANCE
                          </span>
                          <span className="bg-blue-100 text-blue-800 border hover:border-black rounded-3xl px-3 py-1 text-sm">
                            SEA FREIGHT FCL
                          </span>
                        </div>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <Card className="bg-white rounded-lg m-2 p-3 hover:border-2 hover:border-black cursor-pointer">
                      <div className="p-4 flex justify-between items-center">
                        <span className="font-medium bg-blue-100 rounded-3xl px-3 py-1 hover:border hover:border-black">
                          Export
                        </span>
                        <span className="text-md text-[#1D607F] px-2 py-1 hover:font-bold">
                          SPECIFIED WORKFLOW
                        </span>
                      </div>

                      <div className="p-4">
                        <div className="mb-1 font-bold">Sugar Imports</div>
                        <div className="text-xs text-gray-500 mb-4">
                          Specified workflow type
                        </div>

                        <div className="flex justify-around space-x-4">
                          <span className="bg-amber-100 text-amber-800 border hover:border-black rounded-3xl px-3 py-1 text-sm">
                            Trade FINANCE
                          </span>
                          <span className="bg-blue-100 text-blue-800 border hover:border-black rounded-3xl px-3 py-1 text-sm">
                            SEA FREIGHT FCL
                          </span>
                        </div>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md p-6 my-6">
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span>📦</span> {/*  will add icon later */}
                          <span className="text-sm text-gray-600">
                            Shipment duration
                          </span>
                        </div>
                        <p className="font-bold text-lg">15 days</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span>⭕</span> {/*  will add icon later */}
                          <span className="text-sm text-gray-600">
                            Total anticipated Amount
                          </span>
                        </div>
                        <p className="font-bold text-lg">4000$</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span>🔄</span> {/* will add icon later*/}
                          <span className="text-sm text-gray-600">
                            Shipment Mode
                          </span>
                        </div>
                        <div className="bg-blue-100 text-blue-800 rounded px-2 py-1 inline-flex items-center gap-1">
                          Air Freight <span className="ml-1">✓</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span>📄</span> {/* will add icon later */}
                          <span className="text-sm text-gray-600">
                            Shipment Type
                          </span>
                        </div>
                        <p className="font-bold">Export</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-medium text-gray-800 mb-2">
                        Add ons
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <div className="bg-blue-100 text-blue-800 rounded px-2 py-1 inline-flex items-center gap-1 border border-blue-200">
                          trade finance <span className="ml-1">✓</span>
                        </div>
                        <div className="bg-gray-100 text-gray-800 rounded px-2 py-1 inline-flex items-center gap-1 border border-gray-200">
                          insurance
                        </div>
                        <div className="bg-gray-100 text-gray-800 rounded px-2 py-1 inline-flex items-center gap-1 border border-gray-200">
                          premium support
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                      <div className="flex justify-center mb-4 border-b border-blue-100 pb-2">
                        <div className="font-bold border-b-2 border-black pb-2 mr-4">
                          Logistics Steps
                        </div>
                        <div className="text-gray-600">Finance Steps</div>
                      </div>

                      <div className="space-y-6 relative">
                        <div className="absolute top-4 bottom-0 left-3 w-px bg-blue-200"></div>

                        <div className="flex">
                          <div className="relative">
                            <div className="h-6 w-6 rounded-full bg-blue-200 flex items-center justify-center z-10 relative">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            </div>
                          </div>
                          <div className="ml-4">
                            <p className="font-medium">Logistics Step Name</p>
                            <p className="text-sm text-gray-500">
                              Step Description
                            </p>
                          </div>
                        </div>

                        <div className="flex">
                          <div className="relative">
                            <div className="h-6 w-6 rounded-full bg-blue-200 flex items-center justify-center z-10 relative">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            </div>
                          </div>
                          <div className="ml-4">
                            <p className="font-medium">Logistics Step Name</p>
                            <p className="text-sm text-gray-500">
                              Step Description
                            </p>
                          </div>
                        </div>

                        <div className="flex">
                          <div className="relative">
                            <div className="h-6 w-6 rounded-full bg-blue-200 flex items-center justify-center z-10 relative">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            </div>
                          </div>
                          <div className="ml-4">
                            <p className="font-medium">Logistics Step Name</p>
                            <p className="text-sm text-gray-500">
                              Step Description
                            </p>
                          </div>
                        </div>

                        <div className="flex">
                          <div className="relative">
                            <div className="h-6 w-6 rounded-full bg-blue-200 flex items-center justify-center z-10 relative">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            </div>
                          </div>
                          <div className="ml-4">
                            <p className="font-medium">Logistics Step Name</p>
                            <p className="text-sm text-gray-500">11:25 AM</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <DialogFooter className="sm:justify-center">
                      <DialogClose asChild>
                        <button className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-lg font-medium text-sm uppercase">
                          Apply Workflow
                        </button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="draft">
            <div className="p-4 text-center text-gray-500">
              No draft workflows available.
            </div>
          </TabsContent>

          <TabsContent value="archeive">
            <div className="p-4 text-center text-gray-500">
              No archived workflows available.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
