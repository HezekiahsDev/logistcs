"use client";

import { useState, useEffect } from "react";
import { Check, ChevronRight, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FileUploadField } from "./file-upload-field";
import { CommoditySection } from "./commodity-section";

const steps = [
  { id: "upload", title: "Upload Docs" },
  { id: "request", title: "Request Info" },
  { id: "commodity", title: "Commodity Info" },
  { id: "shipping", title: "Shipping Info" },
  { id: "service", title: "Service Info" },
];

type SelectedFiles = {
  credentialInvoice: File | null;
  packingList: File | null;
  billOfLading: File | null;
};

interface Commodity {
  id: string;
  type: string;
  weight: string;
  value: string;
  description: string;
}

export default function MultiStepDialog() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFiles>({
    credentialInvoice: null,
    packingList: null,
    billOfLading: null,
  });

  const [commodities, setCommodities] = useState<Commodity[]>([
    {
      id: "commodity-1",
      type: "",
      weight: "",
      value: "",
      description: "",
    },
  ]);

  const [hasSelectedFiles, setHasSelectedFiles] = useState(false);

  useEffect(() => {
    const hasFiles =
      selectedFiles.credentialInvoice !== null ||
      selectedFiles.packingList !== null ||
      selectedFiles.billOfLading !== null;

    setHasSelectedFiles(hasFiles);
  }, [selectedFiles]);

  const handleSingleFileChange = (
    fileType: "credentialInvoice" | "packingList" | "billOfLading",
    file: File | null
  ) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [fileType]: file,
    }));
  };

  const removeFile = (fileType: keyof SelectedFiles) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [fileType]: null,
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" className="ml-4">
          Create Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mt-2 items-center">
          <DialogTitle>Send a new request</DialogTitle>
          <DialogDescription>Initiate a new shipment request</DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex justify-between mb-4 mt-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-medium",
                  currentStep > index
                    ? "bg-primary text-primary-foreground border-primary"
                    : currentStep === index
                    ? "border-primary text-primary"
                    : "border-muted-foreground text-muted-foreground"
                )}
              >
                {currentStep > index ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-1 hidden sm:block",
                  currentStep >= index
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div
                  className="w-[calc(100%-2rem)] border-t border-muted absolute left-[calc(1rem+4px)] hidden sm:block"
                  style={{
                    top: "1.6rem",
                    width: `calc((100% - ${steps.length * 2}rem) / ${
                      steps.length - 1
                    })`,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="pb-4">
          {currentStep === 0 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Upload Documents</h3>
              <div className="text-sm text-muted-foreground mb-4">
                Please upload the required documents for your shipment request
              </div>

              <div className="space-y-6">
                {/* Credential Invoice */}
                <FileUploadField
                  label="Credential Invoice"
                  value={selectedFiles.credentialInvoice}
                  onChange={(file) =>
                    handleSingleFileChange("credentialInvoice", file)
                  }
                />

                {/* Packing List */}
                <FileUploadField
                  label="Packing List"
                  value={selectedFiles.packingList}
                  onChange={(file) =>
                    handleSingleFileChange("packingList", file)
                  }
                />

                {/* Bill of Lading */}
                <FileUploadField
                  label="Bill of Loading"
                  value={selectedFiles.billOfLading}
                  onChange={(file) =>
                    handleSingleFileChange("billOfLading", file)
                  }
                />
              </div>

              {/* Selected Files Preview */}
              {hasSelectedFiles && (
                <div className="mt-6 space-y-3">
                  <h4 className="text-sm font-medium">Selected Documents</h4>
                  <div className="border rounded-md p-3 space-y-2">
                    {selectedFiles.credentialInvoice && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{selectedFiles.credentialInvoice.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFile("credentialInvoice")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {selectedFiles.packingList && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{selectedFiles.packingList.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFile("packingList")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {selectedFiles.billOfLading && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{selectedFiles.billOfLading.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFile("billOfLading")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                Supported file types: PDF, DOC, DOCX, JPG, PNG (Max size: 10MB)
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Request Information</h3>
              <div className="grid gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="request-name">Origin Port</Label>
                  <Input id="request-name" placeholder="Enter Origin Port" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="request-type">Destination Port</Label>
                  <Input
                    id="request-type"
                    placeholder="Enter Destination Port"
                  />
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label>Shipper</Label>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Shipper" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Consignee</Label>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Consignee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label>Shipment Type</Label>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="import">Import</SelectItem>
                        <SelectItem value="export">Export</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Shipment Mode</Label>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="airFreight">Air Freight</SelectItem>
                        <SelectItem value="landFreight">
                          Land Freight
                        </SelectItem>
                        <SelectItem value="seaFreightssl">
                          Sea Freight SSL
                        </SelectItem>
                        <SelectItem value="seaFreightlcl">
                          Sea Freight LCL
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <CommoditySection
              commodities={commodities}
              setCommodities={setCommodities}
            />
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Shipping Information</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="origin">BL Number</Label>
                  <Input id="origin" placeholder="Enter BL Number" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="destination">Container Number</Label>
                  <Input
                    id="destination"
                    placeholder="Enter container number"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="shipping-date">Shipping line</Label>
                    <Input
                      id="shipping-date"
                      placeholder="Enter shipping line"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="delivery-date">Vessel Name</Label>
                    <Input id="delivery-date" placeholder="Enter vessel name" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Service Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>What Services do you require</Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="import">Import</SelectItem>
                      <SelectItem value="export">Export</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Select your freight forwarder</Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="import">Import</SelectItem>
                      <SelectItem value="export">Export</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>What BCO is the shipment for</Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="import">Import</SelectItem>
                      <SelectItem value="export">Export</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </Button>

          <Button
            onClick={
              currentStep === steps.length - 1
                ? () => console.log("Submit form")
                : nextStep
            }
            className="flex items-center"
          >
            {currentStep === steps.length - 1 ? (
              "Submit Request"
            ) : (
              <>
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
