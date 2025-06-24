import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export default function WorkflowUI() {
  return (
    <div className="mt-10 min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="workflows" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <TabsList className="bg-transparent border-b w-auto h-auto p-0 space-x-6">
                <TabsTrigger
                  value="workflows"
                  className="text-sky-400 font-medium data-[state=active]:border-b-2 data-[state=active]:border-sky-400 rounded-none px-0 py-2 h-auto bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Workflows
                </TabsTrigger>
                <TabsTrigger
                  value="draft"
                  className="text-gray-500 font-medium data-[state=active]:border-b-2 data-[state=active]:border-sky-400 rounded-none px-0 py-2 h-auto bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Draft
                </TabsTrigger>
                <TabsTrigger
                  value="archeive"
                  className="text-gray-500 font-medium data-[state=active]:border-b-2 data-[state=active]:border-sky-400 rounded-none px-0 py-2 h-auto bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Archeive
                </TabsTrigger>
              </TabsList>
              <h1 className="text-gray-700 font-medium text-lg">
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
                    <form className="space-y-2">
                      <Label htmlFor="name"> Workflow Name</Label>
                      <Input id="name" placeholder="Workflow Name" />
                      <div></div>
                      <Label htmlFor="description"> Workflow Description</Label>
                      <Input
                        id="description"
                        placeholder="Workflow Description"
                      />
                    </form>
                  </TabsContent>
                  <TabsContent value="Shipment">
                    <form className="space-y-2">
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
                      <div></div>
                      <Label>Total Anticipated Amount</Label>
                      <Input
                        type="amount"
                        placeholder="$ Total Anticipated Amount "
                      />
                    </form>
                  </TabsContent>
                  <TabsContent value="ModeandType">Mode and Type</TabsContent>
                  <TabsContent value="AddOn">Add On</TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>

            {/* <Link href="/workflows/create">
              <Button className="bg-sky-200 hover:bg-sky-300 text-sky-700 rounded-md">
                <Plus className="h-4 w-4 mr-1" /> Add Workflow
              </Button>
            </Link> */}
          </div>

          <TabsContent value="workflows">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-1 bg-white shadow-sm rounded-lg p-6 border-0">
                <h2 className="text-gray-700 font-medium text-xl mb-6 text-center">
                  My Workflows
                </h2>

                <div className="space-y-4">
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
                      <span className="text-blue-600 font-medium">
                        {workflow}
                      </span>
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                        Specified Workflow
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="col-span-1 lg:col-span-2 bg-white shadow-sm rounded-lg border border-blue-400 p-0 overflow-hidden">
                <div className="border-b p-4 flex justify-between items-center">
                  <span className="font-medium">Export</span>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                    SPECIFIED WORKFLOW
                  </span>
                </div>

                <div className="p-4 border-b">
                  <div className="mb-1 font-medium">Sugar Imports</div>
                  <div className="text-xs text-gray-500 mb-4">
                    Specified workflow type
                  </div>

                  <div className="flex space-x-4">
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded text-sm">
                      Trade FINANCE
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
                      SEA FREIGHT FCL
                    </span>
                  </div>
                </div>

                <div className="border-b p-4 flex justify-between items-center">
                  <span className="font-medium">Import</span>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                    SPECIFIED WORKFLOW
                  </span>
                </div>

                <div className="p-4 border-b">
                  <div className="mb-1 font-medium">Sugar Imports</div>
                  <div className="text-xs text-gray-500 mb-4">
                    Specified workflow type
                  </div>

                  <div className="flex space-x-4">
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded text-sm">
                      Trade FINANCE
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
                      SEA FREIGHT FCL
                    </span>
                  </div>
                </div>

                <div className="border-b p-4 flex justify-between items-center">
                  <span className="font-medium">Export</span>
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                    SPECIFIED WORKFLOW
                  </span>
                </div>

                <div className="p-4">
                  <div className="mb-1 font-medium">Sugar Imports</div>
                  <div className="text-xs text-gray-500 mb-4">
                    Specified workflow type
                  </div>

                  <div className="flex space-x-4">
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded text-sm">
                      Trade FINANCE
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
                      SEA FREIGHT FCL
                    </span>
                  </div>
                </div>
              </Card>
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
