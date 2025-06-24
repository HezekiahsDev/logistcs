"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import {
  Check,
  ChevronRight,
  FileText,
  X,
  PlusCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { useRequestStore } from "@/stores/requestStore";
import { RequestResponse } from "@/types/requests";
import { getSession, signIn } from "next-auth/react";

// --- Types and Helper Components ---

type Commodity = {
  id: string;
  commodity_name: string;
  package_type: string;
  package_weight_net: string;
  package_weight_gross: string;
  cargo_value: string;
};

type FileUploadFieldProps = {
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
};

const FileUploadField = ({
  label,
  onChange,
  error,
  disabled,
}: FileUploadFieldProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    onChange(file);
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor={label.replace(" ", "-").toLowerCase()}>{label}</Label>
      <Input
        id={label.replace(" ", "-").toLowerCase()}
        type="file"
        className={cn("text-sm", error && "border-red-500")}
        onChange={handleFileChange}
        disabled={disabled}
      />
      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
};

type CommoditySectionProps = {
  commodities: Commodity[];
  setCommodities: React.Dispatch<React.SetStateAction<Commodity[]>>;
  errors: z.inferFormattedError<typeof commoditiesSchema> | null;
};

const CommoditySection = ({
  commodities,
  setCommodities,
  errors,
}: CommoditySectionProps) => {
  const addCommodity = () => {
    setCommodities([
      ...commodities,
      {
        id: `commodity-${Date.now()}`,
        commodity_name: "",
        package_type: "",
        package_weight_net: "",
        package_weight_gross: "",
        cargo_value: "",
      },
    ]);
  };

  const removeCommodity = (id: string) => {
    setCommodities(commodities.filter((c) => c.id !== id));
  };

  const handleCommodityChange = (
    id: string,
    field: keyof Omit<Commodity, "id">,
    value: string
  ) => {
    setCommodities(
      commodities.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Commodity Information</h3>
      {commodities.map((commodity, index) => {
        const commodityErrors = errors?.[index]?._errors;
        return (
          <div
            key={commodity.id}
            className="p-4 border rounded-md space-y-4 relative"
          >
            {commodities.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                onClick={() => removeCommodity(commodity.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <div className="grid gap-2">
              <Label htmlFor={`commodity-name-${index}`}>Commodity Name</Label>
              <Input
                id={`commodity-name-${index}`}
                placeholder="e.g., Electronics"
                value={commodity.commodity_name}
                onChange={(e) =>
                  handleCommodityChange(
                    commodity.id,
                    "commodity_name",
                    e.target.value
                  )
                }
                className={cn(
                  errors?.[index]?.commodity_name && "border-red-500"
                )}
              />
              {errors?.[index]?.commodity_name && (
                <p className="text-sm font-medium text-red-500">
                  {errors?.[index]?.commodity_name?._errors[0]}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor={`package-type-${index}`}>Package Type</Label>
                <Input
                  id={`package-type-${index}`}
                  placeholder="e.g., Boxes, Pallets"
                  value={commodity.package_type}
                  onChange={(e) =>
                    handleCommodityChange(
                      commodity.id,
                      "package_type",
                      e.target.value
                    )
                  }
                  className={cn(
                    errors?.[index]?.package_type && "border-red-500"
                  )}
                />
                {errors?.[index]?.package_type && (
                  <p className="text-sm font-medium text-red-500">
                    {errors?.[index]?.package_type?._errors[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`cargo-value-${index}`}>Cargo Value ($)</Label>
                <Input
                  id={`cargo-value-${index}`}
                  placeholder="e.g., 5000"
                  value={commodity.cargo_value}
                  onChange={(e) =>
                    handleCommodityChange(
                      commodity.id,
                      "cargo_value",
                      e.target.value
                    )
                  }
                  className={cn(
                    errors?.[index]?.cargo_value && "border-red-500"
                  )}
                />
                {errors?.[index]?.cargo_value && (
                  <p className="text-sm font-medium text-red-500">
                    {errors?.[index]?.cargo_value?._errors[0]}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor={`net-weight-${index}`}>Net Weight (kg)</Label>
                <Input
                  id={`net-weight-${index}`}
                  type="number"
                  placeholder="e.g., 100"
                  value={commodity.package_weight_net}
                  onChange={(e) =>
                    handleCommodityChange(
                      commodity.id,
                      "package_weight_net",
                      e.target.value
                    )
                  }
                  className={cn(
                    errors?.[index]?.package_weight_net && "border-red-500"
                  )}
                />
                {errors?.[index]?.package_weight_net && (
                  <p className="text-sm font-medium text-red-500">
                    {errors?.[index]?.package_weight_net?._errors[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`gross-weight-${index}`}>
                  Gross Weight (kg)
                </Label>
                <Input
                  id={`gross-weight-${index}`}
                  type="number"
                  placeholder="e.g., 110"
                  value={commodity.package_weight_gross}
                  onChange={(e) =>
                    handleCommodityChange(
                      commodity.id,
                      "package_weight_gross",
                      e.target.value
                    )
                  }
                  className={cn(
                    errors?.[index]?.package_weight_gross && "border-red-500"
                  )}
                />
                {errors?.[index]?.package_weight_gross && (
                  <p className="text-sm font-medium text-red-500">
                    {errors?.[index]?.package_weight_gross?._errors[0]}
                  </p>
                )}
              </div>
            </div>
            {commodityErrors && commodityErrors.length > 0 && (
              <p className="text-sm font-medium text-red-500">
                {commodityErrors.join(", ")}
              </p>
            )}
          </div>
        );
      })}
      <Button
        variant="outline"
        size="sm"
        onClick={addCommodity}
        className="flex items-center gap-2"
      >
        <PlusCircle className="h-4 w-4" />
        Add another commodity
      </Button>
    </div>
  );
};

const steps = [
  { id: "upload", title: "Upload Docs" },
  { id: "request", title: "Request Info" },
  { id: "commodity", title: "Commodity Info" },
  { id: "shipping", title: "Shipping Info" },
  { id: "service", title: "Service Info" },
];

// --- Form Data and Schema Definitions ---

type SelectedFiles = {
  credentialInvoice: File | null;
  packingList: File | null;
  billOfLading: File | null;
};

// --- NEW: Type for Request Information Step ---
type RequestInfoData = {
  originPort: string;
  destinationPort: string;
  shipper: string;
  consignee: string;
  shipmentType: string;
  shipmentMode: string;
  shipmentDate: string;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

const fileUploadSchema = z.object({
  credentialInvoice: z
    .instanceof(File, { message: "Credential Invoice is required." })
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 10MB.")
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Unsupported file format. Please use PDF, DOC, DOCX, JPG, or PNG."
    ),
  packingList: z
    .instanceof(File, { message: "Packing List is required." })
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 10MB.")
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Unsupported file format. Please use PDF, DOC, DOCX, JPG, or PNG."
    ),
  billOfLading: z
    .instanceof(File, { message: "Bill of Lading is required." })
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 10MB.")
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Unsupported file format. Please use PDF, DOC, DOCX, JPG, or PNG."
    ),
});

// --- NEW: Zod schema for Request Information Step ---
const requestInfoSchema = z.object({
  originPort: z.string().min(1, "Origin Port is required."),
  destinationPort: z.string().min(1, "Destination Port is required."),
  shipper: z.string().min(1, "Shipper is required."),
  consignee: z.string().min(1, "Consignee is required."),
  shipmentType: z.string().min(1, "Shipment Type is required."),
  shipmentMode: z.string().min(1, "Shipment Mode is required."),
  shipmentDate: z.string().min(1, "Shipment date is required."),
});

// --- NEW: Zod schema for Shipping Information --
const shippingInfoSchema = z.object({
  bl_number: z.string().min(1, "BL Number is required."),
  container_numbers: z.string().min(1, "Container Number is required."),
  shipping_line: z.string().min(1, "Shipping Line is required."),
  vessel_name: z.string().min(1, "Vessel Name is required."),
});

// --- NEW: Zod schema for Commodity Information ---
const commoditySchema = z.object({
  commodity_name: z.string().min(1, "Commodity name is required."),
  package_type: z.string().min(1, "Package type is required."),
  package_weight_net: z.coerce
    .number()
    .positive("Net weight must be a positive number."),
  package_weight_gross: z.coerce
    .number()
    .positive("Gross weight must be a positive number."),
  cargo_value: z.string().min(1, "Cargo value is required."),
});

const commoditiesSchema = z.array(commoditySchema);

// --- NEW: Zod schema for Service Information ---
const serviceInfoSchema = z.object({
  service_type: z.string().min(1, "Service type is required."),
  bco_type: z.string().min(1, "BCO type is required."),
});

type FileUploadErrors = z.inferFormattedError<typeof fileUploadSchema>;
// --- NEW: Error type for Request Information Step ---
type RequestInfoErrors = z.inferFormattedError<typeof requestInfoSchema>;
// --- NEW: Error type for Shipping Information Step ---
type ShippingInfoErrors = z.inferFormattedError<typeof shippingInfoSchema>;
// --- NEW: Error type for Commodity Information Step ---
type CommodityErrors = z.inferFormattedError<typeof commoditiesSchema>;
// --- NEW: Error type for Service Information Step ---
type ServiceInfoErrors = z.inferFormattedError<typeof serviceInfoSchema>;

export default function MultiStepDialog() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);
  const [isUpdatingCommodity, setIsUpdatingCommodity] = useState(false);
  const [isUpdatingShipping, setIsUpdatingShipping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<SelectedFiles>({
    credentialInvoice: null,
    packingList: null,
    billOfLading: null,
  });

  // --- NEW: State for Request Information data ---
  const [requestInfo, setRequestInfo] = useState<RequestInfoData>({
    originPort: "",
    destinationPort: "",
    shipper: "",
    consignee: "",
    shipmentType: "",
    shipmentMode: "",
    shipmentDate: "",
  });

  // --- NEW: State for Shipping Information data ---
  const [shippingInfo, setShippingInfo] = useState({
    bl_number: "",
    container_numbers: "",
    shipping_line: "",
    vessel_name: "",
  });

  // --- NEW: State for Service Information data ---
  const [serviceInfo, setServiceInfo] = useState({
    service_type: "",
    bco_type: "",
  });

  const [fileErrors, setFileErrors] = useState<FileUploadErrors | null>(null);
  // --- NEW: State for Request Information errors ---
  const [requestInfoErrors, setRequestInfoErrors] =
    useState<RequestInfoErrors | null>(null);
  // --- NEW: State for Shipping Information errors ---
  const [shippingInfoErrors, setShippingInfoErrors] =
    useState<ShippingInfoErrors | null>(null);
  // --- NEW: State for Commodity errors ---
  const [commodityErrors, setCommodityErrors] =
    useState<CommodityErrors | null>(null);
  // --- NEW: State for Service Information errors ---
  const [serviceInfoErrors, setServiceInfoErrors] =
    useState<ServiceInfoErrors | null>(null);

  const [commodities, setCommodities] = useState<Commodity[]>([
    {
      id: "commodity-1",
      commodity_name: "",
      package_type: "",
      package_weight_net: "",
      package_weight_gross: "",
      cargo_value: "",
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

  const setRequestData = useRequestStore((state) => state.setRequestData);

  const handleCreateRequest = async () => {
    setIsCreatingRequest(true);
    try {
      const session = await getSession();
      const token = session?.user.accessToken;

      if (!token) {
        await signIn();
        return;
      }

      const response = await axios.post<RequestResponse>(
        "https://request-service-4jey.onrender.com/api/create/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { id, status } = response.data;

      setRequestData(id, status);
      setRequestId(id);
      setIsDialogOpen(true);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        await signIn();
      }
      if (error.response?.status === 403) {
        await signIn();
      }
    } finally {
      setIsCreatingRequest(false);
    }
    // await signIn();
  };

  const handleSubmitRequest = async () => {
    const validationResult = serviceInfoSchema.safeParse(serviceInfo);
    if (!validationResult.success) {
      setServiceInfoErrors(validationResult.error.format());
      return;
    }

    setServiceInfoErrors(null);
    setIsSubmitting(true);

    try {
      const session = await getSession();
      const token = session?.user.accessToken;
      if (!token) {
        await signIn();
        setIsSubmitting(false);
        return;
      }

      if (!requestId) {
        setIsSubmitting(false);
        return;
      }

      const endpoint = `https://request-service-4jey.onrender.com/api/request/${requestId}/service-info/`;

      await axios.put(
        endpoint,
        {
          service_type: serviceInfo.service_type,
          bco_type: serviceInfo.bco_type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setIsSubmitted(true);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        await signIn();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublishRequest = async () => {
    setIsPublishing(true);
    try {
      const session = await getSession();
      const token = session?.user.accessToken;
      if (!token) {
        await signIn();
        setIsPublishing(false);
        return;
      }

      if (!requestId) {
        setIsPublishing(false);
        return;
      }

      const endpoint = `https://request-service-4jey.onrender.com/api/request/${requestId}/submit/`;

      await axios.put(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // All steps are done, close the dialog
      setIsDialogOpen(false);
      setCurrentStep(0);
      setRequestId(null);
      setIsSubmitted(false); // reset state
      // Maybe show a success toast here
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        await signIn();
      }
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSingleFileChange = (
    fileType: keyof SelectedFiles,
    file: File | null
  ) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [fileType]: file,
    }));
    if (fileErrors && fileErrors[fileType]) {
      setFileErrors((prev) => {
        if (!prev) return null;
        const newErrors = { ...prev };
        delete newErrors[fileType];
        return newErrors;
      });
    }
  };

  // --- NEW: Handler for Request Information form changes ---
  const handleRequestInfoChange = (
    field: keyof RequestInfoData,
    value: string
  ) => {
    setRequestInfo((prev) => ({ ...prev, [field]: value }));
    if (requestInfoErrors && requestInfoErrors[field]) {
      setRequestInfoErrors((prev) => {
        if (!prev) return null;
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // --- NEW: Handler for Shipping Information form changes ---
  const handleShippingInfoChange = (
    field: keyof typeof shippingInfo,
    value: string
  ) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
    if (shippingInfoErrors && shippingInfoErrors[field]) {
      setShippingInfoErrors((prev) => {
        if (!prev) return null;
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // --- NEW: Handler for Service Information form changes ---
  const handleServiceInfoChange = (
    field: keyof typeof serviceInfo,
    value: string
  ) => {
    setServiceInfo((prev) => ({ ...prev, [field]: value }));
    if (serviceInfoErrors && serviceInfoErrors[field]) {
      setServiceInfoErrors((prev) => {
        if (!prev) return null;
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const removeFile = (fileType: keyof SelectedFiles) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [fileType]: null,
    }));
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const nextStep = async () => {
    if (currentStep === 0) {
      const validationResult = fileUploadSchema.safeParse(selectedFiles);

      if (!validationResult.success) {
        setFileErrors(validationResult.error.format());
        return;
      }

      setFileErrors(null);

      setIsUploading(true);
      try {
        const session = await getSession();
        const token = session?.user.accessToken;
        if (!token) {
          await signIn();
          setIsUploading(false);
          return;
        }

        if (!requestId) {
          setIsUploading(false);
          return;
        }

        const formData = new FormData();

        if (selectedFiles.credentialInvoice) {
          formData.append(
            "credential_invoice",
            selectedFiles.credentialInvoice
          );
        }
        if (selectedFiles.packingList) {
          formData.append("packing_list", selectedFiles.packingList);
        }
        if (selectedFiles.billOfLading) {
          formData.append("bill_of_landing", selectedFiles.billOfLading);
        }

        const endpoint = `https://request-service-4jey.onrender.com/api/request/${requestId}/documents/`;

        await axios.put(endpoint, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setCurrentStep(currentStep + 1);
      } catch (err) {
        const error = err as AxiosError;

        if (error.response?.status === 401) {
          await signIn();
        }
      } finally {
        setIsUploading(false);
      }
      return;
    }

    // --- NEW: Validation for Step 2 (Request Info) ---
    if (currentStep === 1) {
      const validationResult = requestInfoSchema.safeParse(requestInfo);

      if (!validationResult.success) {
        setRequestInfoErrors(validationResult.error.format());
        return;
      }

      setRequestInfoErrors(null);
      setIsUpdatingInfo(true);
      try {
        const session = await getSession();
        const token = session?.user.accessToken;
        if (!token) {
          await signIn();
          setIsUpdatingInfo(false);
          return;
        }

        if (!requestId) {
          setIsUpdatingInfo(false);
          return;
        }

        const payload = {
          origin_port: requestInfo.originPort,
          destination_port: requestInfo.destinationPort,
          shipper: requestInfo.shipper,
          consignee: requestInfo.consignee,
          shipment_type: requestInfo.shipmentType,
          shipment_mode: requestInfo.shipmentMode,
          shipment_date: requestInfo.shipmentDate,
        };

        const endpoint = `https://request-service-4jey.onrender.com/api/request/${requestId}/info/`;

        await axios.put(endpoint, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setCurrentStep(currentStep + 1);
      } catch (err) {
        const error = err as AxiosError;

        if (error.response?.status === 401) {
          await signIn();
        }
      } finally {
        setIsUpdatingInfo(false);
      }
      return;
    }

    // --- NEW: Validation for Step 3 (Commodity Info) ---
    if (currentStep === 2) {
      const validationResult = commoditiesSchema.safeParse(commodities);

      if (!validationResult.success) {
        setCommodityErrors(validationResult.error.format());
        return;
      }

      setCommodityErrors(null);
      setIsUpdatingCommodity(true);

      try {
        const session = await getSession();
        const token = session?.user.accessToken;
        if (!token) {
          await signIn();
          setIsUpdatingCommodity(false);
          return;
        }

        if (!requestId) {
          setIsUpdatingCommodity(false);
          return;
        }

        const endpoint = `https://request-service-4jey.onrender.com/api/request/${requestId}/commodity-info/`;

        // Send a request for each commodity
        await Promise.all(
          commodities.map((commodity) => {
            const payload = {
              commodity_name: commodity.commodity_name,
              package_type: commodity.package_type,
              package_weight_net: parseFloat(commodity.package_weight_net),
              package_weight_gross: parseFloat(commodity.package_weight_gross),
              cargo_value: commodity.cargo_value,
            };
            return axios.put(endpoint, payload, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
          })
        );

        setCurrentStep(currentStep + 1);
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.status === 401) {
          await signIn();
        }
      } finally {
        setIsUpdatingCommodity(false);
      }
      return;
    }

    // --- NEW: Validation for Step 4 (Shipping Info) ---
    if (currentStep === 3) {
      const validationResult = shippingInfoSchema.safeParse(shippingInfo);

      if (!validationResult.success) {
        setShippingInfoErrors(validationResult.error.format());
        return;
      }
      setShippingInfoErrors(null);
      setIsUpdatingShipping(true);

      try {
        const session = await getSession();
        const token = session?.user.accessToken;
        if (!token) {
          await signIn();
          setIsUpdatingShipping(false);
          return;
        }

        if (!requestId) {
          setIsUpdatingShipping(false);
          return;
        }

        const endpoint = `https://request-service-4jey.onrender.com/api/request/${requestId}/shipping-info/`;
        const payload = {
          bl_number: shippingInfo.bl_number,
          container_numbers: shippingInfo.container_numbers,
          shipping_line: shippingInfo.shipping_line,
          vessel_name: shippingInfo.vessel_name,
        };

        await axios.put(endpoint, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setCurrentStep(currentStep + 1);
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.status === 401) {
          await signIn();
        }
      } finally {
        setIsUpdatingShipping(false);
      }
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Upload Documents</h3>
            <div className="text-sm text-muted-foreground mb-4">
              Please upload the required documents for your shipment request.
            </div>

            <div className="space-y-6">
              <FileUploadField
                label="Credential Invoice"
                value={selectedFiles.credentialInvoice}
                onChange={(file) =>
                  handleSingleFileChange("credentialInvoice", file)
                }
                error={fileErrors?.credentialInvoice?._errors[0]}
                disabled={isUploading}
              />

              <FileUploadField
                label="Packing List"
                value={selectedFiles.packingList}
                onChange={(file) => handleSingleFileChange("packingList", file)}
                error={fileErrors?.packingList?._errors[0]}
                disabled={isUploading}
              />

              <FileUploadField
                label="Bill of Lading"
                value={selectedFiles.billOfLading}
                onChange={(file) =>
                  handleSingleFileChange("billOfLading", file)
                }
                error={fileErrors?.billOfLading?._errors[0]}
                disabled={isUploading}
              />
            </div>

            {hasSelectedFiles && (
              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-medium">Selected Documents</h4>
                <div className="border rounded-md p-3 space-y-2">
                  {selectedFiles.credentialInvoice && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center truncate">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">
                          {selectedFiles.credentialInvoice.name}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFile("credentialInvoice")}
                        disabled={isUploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {selectedFiles.packingList && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center truncate">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">
                          {selectedFiles.packingList.name}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFile("packingList")}
                        disabled={isUploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {selectedFiles.billOfLading && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center truncate">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">
                          {selectedFiles.billOfLading.name}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFile("billOfLading")}
                        disabled={isUploading}
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
        );
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Request Information</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="origin-port">Origin Port</Label>
                <Input
                  id="origin-port"
                  placeholder="Enter Origin Port"
                  value={requestInfo.originPort}
                  onChange={(e) =>
                    handleRequestInfoChange("originPort", e.target.value)
                  }
                  className={cn(
                    requestInfoErrors?.originPort && "border-red-500"
                  )}
                />
                {requestInfoErrors?.originPort && (
                  <p className="text-sm font-medium text-red-500">
                    {requestInfoErrors.originPort._errors[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="destination-port">Destination Port</Label>
                <Input
                  id="destination-port"
                  placeholder="Enter Destination Port"
                  value={requestInfo.destinationPort}
                  onChange={(e) =>
                    handleRequestInfoChange("destinationPort", e.target.value)
                  }
                  className={cn(
                    requestInfoErrors?.destinationPort && "border-red-500"
                  )}
                />
                {requestInfoErrors?.destinationPort && (
                  <p className="text-sm font-medium text-red-500">
                    {requestInfoErrors.destinationPort._errors[0]}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Shipper</Label>
                  <Select
                    value={requestInfo.shipper}
                    onValueChange={(value) =>
                      handleRequestInfoChange("shipper", value || "")
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        requestInfoErrors?.shipper && "border-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Shipper" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shipper-a">Shipper A</SelectItem>
                      <SelectItem value="shipper-b">Shipper B</SelectItem>
                      <SelectItem value="shipper-c">Shipper C</SelectItem>
                    </SelectContent>
                  </Select>
                  {requestInfoErrors?.shipper && (
                    <p className="text-sm font-medium text-red-500">
                      {requestInfoErrors.shipper._errors[0]}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label>Consignee</Label>
                  <Select
                    value={requestInfo.consignee}
                    onValueChange={(value) =>
                      handleRequestInfoChange("consignee", value || "")
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        requestInfoErrors?.consignee && "border-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Consignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consignee-a">Consignee A</SelectItem>
                      <SelectItem value="consignee-b">Consignee B</SelectItem>
                      <SelectItem value="consignee-c">Consignee C</SelectItem>
                    </SelectContent>
                  </Select>
                  {requestInfoErrors?.consignee && (
                    <p className="text-sm font-medium text-red-500">
                      {requestInfoErrors.consignee._errors[0]}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Shipment Type</Label>
                  <Select
                    value={requestInfo.shipmentType}
                    onValueChange={(value) =>
                      handleRequestInfoChange("shipmentType", value || "")
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        requestInfoErrors?.shipmentType && "border-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="import">Import</SelectItem>
                      <SelectItem value="export">Export</SelectItem>
                    </SelectContent>
                  </Select>
                  {requestInfoErrors?.shipmentType && (
                    <p className="text-sm font-medium text-red-500">
                      {requestInfoErrors.shipmentType._errors[0]}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label>Shipment Mode</Label>
                  <Select
                    value={requestInfo.shipmentMode}
                    onValueChange={(value) =>
                      handleRequestInfoChange("shipmentMode", value || "")
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        requestInfoErrors?.shipmentMode && "border-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select Mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="air freight">Air Freight</SelectItem>
                      <SelectItem value="land freight">Land Freight</SelectItem>
                      <SelectItem value="sea freight ssl">
                        Sea Freight SSL
                      </SelectItem>
                      <SelectItem value="sea freight lcl">
                        Sea Freight LCL
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {requestInfoErrors?.shipmentMode && (
                    <p className="text-sm font-medium text-red-500">
                      {requestInfoErrors.shipmentMode._errors[0]}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="shipment-date">Shipment Date</Label>
                <Input
                  id="shipment-date"
                  type="date"
                  value={requestInfo.shipmentDate}
                  onChange={(e) =>
                    handleRequestInfoChange("shipmentDate", e.target.value)
                  }
                  className={cn(
                    requestInfoErrors?.shipmentDate && "border-red-500"
                  )}
                />
                {requestInfoErrors?.shipmentDate && (
                  <p className="text-sm font-medium text-red-500">
                    {requestInfoErrors.shipmentDate._errors[0]}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <CommoditySection
            commodities={commodities}
            setCommodities={setCommodities}
            errors={commodityErrors}
          />
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Shipping Information</h3>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="bl-number">BL Number</Label>
                <Input
                  id="bl-number"
                  placeholder="Enter BL Number"
                  value={shippingInfo.bl_number}
                  onChange={(e) =>
                    handleShippingInfoChange("bl_number", e.target.value)
                  }
                  className={cn(
                    shippingInfoErrors?.bl_number && "border-red-500"
                  )}
                />
                {shippingInfoErrors?.bl_number && (
                  <p className="text-sm font-medium text-red-500">
                    {shippingInfoErrors.bl_number._errors[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="container-number">Container Number</Label>
                <Input
                  id="container-number"
                  placeholder="Enter container number"
                  value={shippingInfo.container_numbers}
                  onChange={(e) =>
                    handleShippingInfoChange(
                      "container_numbers",
                      e.target.value
                    )
                  }
                  className={cn(
                    shippingInfoErrors?.container_numbers && "border-red-500"
                  )}
                />
                {shippingInfoErrors?.container_numbers && (
                  <p className="text-sm font-medium text-red-500">
                    {shippingInfoErrors.container_numbers._errors[0]}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="shipping-line">Shipping line</Label>
                  <Input
                    id="shipping-line"
                    placeholder="Enter shipping line"
                    value={shippingInfo.shipping_line}
                    onChange={(e) =>
                      handleShippingInfoChange("shipping_line", e.target.value)
                    }
                    className={cn(
                      shippingInfoErrors?.shipping_line && "border-red-500"
                    )}
                  />
                  {shippingInfoErrors?.shipping_line && (
                    <p className="text-sm font-medium text-red-500">
                      {shippingInfoErrors.shipping_line._errors[0]}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="vessel-name">Vessel Name</Label>
                  <Input
                    id="vessel-name"
                    placeholder="Enter vessel name"
                    value={shippingInfo.vessel_name}
                    onChange={(e) =>
                      handleShippingInfoChange("vessel_name", e.target.value)
                    }
                    className={cn(
                      shippingInfoErrors?.vessel_name && "border-red-500"
                    )}
                  />
                  {shippingInfoErrors?.vessel_name && (
                    <p className="text-sm font-medium text-red-500">
                      {shippingInfoErrors.vessel_name._errors[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Service Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>What Services do you require</Label>
                <Select
                  value={serviceInfo.service_type}
                  onValueChange={(value) =>
                    handleServiceInfoChange("service_type", value || "")
                  }
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    className={cn(
                      serviceInfoErrors?.service_type && "border-red-500"
                    )}
                  >
                    <SelectValue placeholder="Please select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sea_shipping">Sea Shipping</SelectItem>
                    <SelectItem value="air_shipping">Air Shipping</SelectItem>
                    <SelectItem value="land_shipping">Land Shipping</SelectItem>
                  </SelectContent>
                </Select>
                {serviceInfoErrors?.service_type && (
                  <p className="text-sm font-medium text-red-500">
                    {serviceInfoErrors.service_type._errors[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label>What is your role</Label>
                <Select
                  value={serviceInfo.bco_type}
                  onValueChange={(value) =>
                    handleServiceInfoChange("bco_type", value || "")
                  }
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    className={cn(
                      serviceInfoErrors?.bco_type && "border-red-500"
                    )}
                  >
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="importer">Importer</SelectItem>
                    <SelectItem value="exporter">Exporter</SelectItem>
                  </SelectContent>
                </Select>
                {serviceInfoErrors?.bco_type && (
                  <p className="text-sm font-medium text-red-500">
                    {serviceInfoErrors.bco_type._errors[0]}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Button
        variant="default"
        className="ml-4"
        onClick={handleCreateRequest}
        disabled={isCreatingRequest}
      >
        {isCreatingRequest ? "Creating..." : "Create Request"}
      </Button>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mt-2 items-center">
          <DialogTitle>Send a new request</DialogTitle>
          <DialogDescription>Initiate a new shipment request</DialogDescription>
        </DialogHeader>

        <div className="flex justify-between mb-4 mt-4 relative">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-center z-10 w-1/5"
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-medium bg-background",
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
                  "text-xs text-center mt-1 hidden sm:block",
                  currentStep >= index
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
          ))}
          <div
            className="absolute top-4 left-0 w-full h-px bg-muted-foreground sm:block hidden"
            style={{ transform: "translateY(-50%)", zIndex: 0 }}
          >
            <div
              className="h-full bg-primary"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="pb-4">{renderStepContent()}</div>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={
              currentStep === 0 ||
              isUploading ||
              isUpdatingInfo ||
              isUpdatingCommodity ||
              isUpdatingShipping ||
              isSubmitting ||
              isSubmitted
            }
          >
            Previous
          </Button>
          <Button
            onClick={
              currentStep === steps.length - 1
                ? isSubmitted
                  ? handlePublishRequest
                  : handleSubmitRequest
                : nextStep
            }
            disabled={
              isUploading ||
              isUpdatingInfo ||
              isUpdatingCommodity ||
              isUpdatingShipping ||
              isSubmitting ||
              isPublishing
            }
            className={cn(
              "flex items-center",
              isSubmitted &&
                currentStep === steps.length - 1 &&
                "bg-green-600 hover:bg-green-700"
            )}
          >
            {currentStep === 4 && isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : currentStep === 4 && isPublishing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : currentStep === 3 && isUpdatingShipping ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : currentStep === 2 && isUpdatingCommodity ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : currentStep === 1 && isUpdatingInfo ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : currentStep === 0 && isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : currentStep === steps.length - 1 ? (
              isSubmitted ? (
                "Publish"
              ) : (
                "Submit Request"
              )
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
