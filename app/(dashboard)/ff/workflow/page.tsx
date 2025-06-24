"use client";

import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { getSession } from "next-auth/react";

interface WorkflowFormData {
  workflow_name: string;
  description: string;
  shipment_duration: string;
  anticipated_amount: string;
  currency: string;
  shipment_type: "IMPORT" | "EXPORT" | "";
  shipment_mode: "AIR" | "LOAD" | "EXPRESS" | "SEA" | "";
  track_finance: boolean;
  premium_support: boolean;
}

export default function WorkflowUI() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("Description");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<WorkflowFormData>({
    workflow_name: "",
    description: "",
    shipment_duration: "",
    anticipated_amount: "",
    currency: "USD",
    shipment_type: "",
    shipment_mode: "",
    track_finance: false,
    premium_support: false,
  });

  const updateFormData = (field: keyof WorkflowFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const tabs = ["Description", "Shipment", "ModeandType", "AddOn"];
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex < tabs.length - 1) {
      setCurrentTab(tabs[currentIndex + 1]);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.workflow_name.trim()) {
      toast({
        title: "Validation Error",
        description: "Workflow name is required",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Description is required",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.shipment_duration) {
      toast({
        title: "Validation Error",
        description: "Shipment duration is required",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.anticipated_amount) {
      toast({
        title: "Validation Error",
        description: "Anticipated amount is required",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.shipment_type) {
      toast({
        title: "Validation Error",
        description: "Shipment type is required",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.shipment_mode) {
      toast({
        title: "Validation Error",
        description: "Shipment mode is required",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const session = await getSession();
      if (!session) {
        throw new Error("No Session Found");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOGISTICS_BACKEND_API_URL}/api/workflow/workflows/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast({
          title: "Success",
          description: "Workflow created successfully!",
        });
        // Reset form
        setFormData({
          workflow_name: "",
          description: "",
          shipment_duration: "",
          anticipated_amount: "",
          currency: "USD",
          shipment_type: "",
          shipment_mode: "",
          track_finance: false,
          premium_support: false,
        });
        setCurrentTab("Description");
        setDialogOpen(false);
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to create workflow",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: `Error ${error instanceof Error ? error.message : "Unknown"}`,
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-20 min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="workflows" className="w-full">
          <div className="flex flex-col gap-3 justify-between md:flex-row md:items-center mb-6">
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
                  Archive
                </TabsTrigger>
              </TabsList>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger className="flex items-center justify-center bg-blue-300 p-2 rounded-md">
                <Plus className="h-4 w-4 mr-1" /> Add Workflow
              </DialogTrigger>
              <DialogContent className="max-w-2xl h-96">
                <DialogHeader className="items-center">
                  <DialogTitle>Workflow Details</DialogTitle>
                  <DialogDescription>Create a new workflow</DialogDescription>
                </DialogHeader>
                <Tabs
                  value={currentTab}
                  onValueChange={setCurrentTab}
                  className="h-96"
                >
                  <TabsList className="text-xs">
                    <TabsTrigger value="Description">Description</TabsTrigger>
                    <TabsTrigger value="Shipment">Shipment</TabsTrigger>
                    <TabsTrigger value="ModeandType">Mode & Type</TabsTrigger>
                    <TabsTrigger value="AddOn">AddOn</TabsTrigger>
                  </TabsList>

                  <TabsContent value="Description">
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="name">Workflow Name</Label>
                        <Input
                          id="name"
                          placeholder="Workflow Name"
                          value={formData.workflow_name}
                          onChange={(e) =>
                            updateFormData("workflow_name", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">
                          Workflow Description
                        </Label>
                        <Input
                          id="description"
                          placeholder="Workflow Description"
                          value={formData.description}
                          onChange={(e) =>
                            updateFormData("description", e.target.value)
                          }
                        />
                      </div>
                      <Button onClick={handleNext}>
                        Next <MoveRightIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="Shipment">
                    <div className="space-y-6">
                      <div>
                        <Label>Shipment Duration</Label>
                        <Select
                          value={formData.shipment_duration}
                          onValueChange={(value) =>
                            updateFormData("shipment_duration", value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Shipment Duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Duration</SelectLabel>
                              <SelectItem value="1 month">1 Month</SelectItem>
                              <SelectItem value="2 months">2 Months</SelectItem>
                              <SelectItem value="3 months">3 Months</SelectItem>
                              <SelectItem value="6 months">6 Months</SelectItem>
                              <SelectItem value="1 year">1 Year</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Total Anticipated Amount</Label>
                        <Input
                          type="number"
                          placeholder="Total Anticipated Amount"
                          value={formData.anticipated_amount}
                          onChange={(e) =>
                            updateFormData("anticipated_amount", e.target.value)
                          }
                        />
                      </div>
                      <Button onClick={handleNext}>
                        Next <MoveRightIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="ModeandType">
                    <div className="space-y-6">
                      <div>
                        <Label>Shipment Type</Label>
                        <div className="flex gap-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="import"
                              checked={formData.shipment_type === "IMPORT"}
                              onCheckedChange={(checked) => {
                                if (checked)
                                  updateFormData("shipment_type", "IMPORT");
                              }}
                            />
                            <label htmlFor="import">Import</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="export"
                              checked={formData.shipment_type === "EXPORT"}
                              onCheckedChange={(checked) => {
                                if (checked)
                                  updateFormData("shipment_type", "EXPORT");
                              }}
                            />
                            <label htmlFor="export">Export</label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label>Shipment Mode</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="air"
                              checked={formData.shipment_mode === "AIR"}
                              onCheckedChange={(checked) => {
                                if (checked)
                                  updateFormData("shipment_mode", "AIR");
                              }}
                            />
                            <label htmlFor="air">Air Freight</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="land"
                              checked={formData.shipment_mode === "LOAD"}
                              onCheckedChange={(checked) => {
                                if (checked)
                                  updateFormData("shipment_mode", "LOAD");
                              }}
                            />
                            <label htmlFor="land">Land Freight</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="seafcl"
                              checked={formData.shipment_mode === "SEA"}
                              onCheckedChange={(checked) => {
                                if (checked)
                                  updateFormData("shipment_mode", "SEA");
                              }}
                            />
                            <label htmlFor="seafcl">Sea FCL</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="sealcl"
                              checked={formData.shipment_mode === "EXPRESS"}
                              onCheckedChange={(checked) => {
                                if (checked)
                                  updateFormData("shipment_mode", "EXPRESS");
                              }}
                            />
                            <label htmlFor="sealcl">Sea LCL</label>
                          </div>
                        </div>
                      </div>
                      <Button onClick={handleNext}>
                        Next <MoveRightIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="AddOn">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tradefinance"
                          checked={formData.track_finance}
                          onCheckedChange={(checked) =>
                            updateFormData("track_finance", checked)
                          }
                        />
                        <label htmlFor="tradefinance">Trade Finance</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="premium"
                          checked={formData.premium_support}
                          onCheckedChange={(checked) =>
                            updateFormData("premium_support", checked)
                          }
                        />
                        <label htmlFor="premium">Premium Support</label>
                      </div>
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? "Creating..." : "Submit"}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
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
