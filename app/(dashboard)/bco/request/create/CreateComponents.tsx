"use client";
import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Image from "next/image";
interface UploadDocumentProps {
  nextStep: () => void;
  onSuccessToggle: () => void;
}

interface SuccessUploadProps {
  nextStep: () => void;
  onSuccessToggle: () => void;
}

interface ShippingFormProps {
  onSubmit?: (formData: ShippingFormData) => void;

  nextStep: () => void;
}

interface ShippingFormData {
  originPort: string;
  destinationPort: string;
  shipper: string;
  consignee: string;
  shipmentType: "Import" | "Export";
  shipmentMode: (
    | "Air Freight"
    | "Land Freight"
    | "Sea Freight SSL"
    | "Sea Freight LCL"
  )[];
}

interface commodityInfo {
  id: number;
  commodityTitle: string;
  commodityName: string;
  commodityType: string;
  commodityNetWeight: number;
  commodityGrossWeight: number;
  commodityCargoValue: number;
}

interface documentSections {
  id: number;
  title: string;
  document: string;
  date: string;
  progress: number;
  fields: string[];
}

const documentSections: documentSections[] = [
  {
    id: 1,
    title: "COMMERCIAL INVOICE",
    document: "document-teams.jpg",
    date: "7 August 2023",
    progress: 50,
    fields: ["Origin port", "Destination port", "Shipper", "Consignee"],
  },
  {
    id: 2,
    title: "PACKING LIST",
    document: "document-teams.jpg",
    date: "7 August 2023",
    progress: 50,
    fields: ["Origin port", "Destination port", "Shipper", "Consignee"],
  },
  {
    id: 3,
    title: "BILL OF LADING",
    document: "document-teams.jpg",
    date: "7 August 2023",
    progress: 50,
    fields: ["Origin port", "Destination port", "Shipper", "Consignee"],
  },
];

const commodityInfo: commodityInfo[] = [
  {
    id: 1,
    commodityTitle: "Commodity 1",
    commodityName: "Bag of Beans",
    commodityType: "Sack",
    commodityNetWeight: 14,
    commodityGrossWeight: 17,
    commodityCargoValue: 14.0,
  },
  {
    id: 2,
    commodityTitle: "Commodity 2",
    commodityName: "Bag of Rice",
    commodityType: "Sack",
    commodityNetWeight: 16,
    commodityGrossWeight: 19,
    commodityCargoValue: 17.0,
  },
  {
    id: 3,
    commodityTitle: "Commodity 3",
    commodityName: "Bag of Sugar",
    commodityType: "Sack",
    commodityNetWeight: 12,
    commodityGrossWeight: 15,
    commodityCargoValue: 13.0,
  },
  {
    id: 4,
    commodityTitle: "Commodity 4",
    commodityName: "Bag of Flour",
    commodityType: "Sack",
    commodityNetWeight: 14,
    commodityGrossWeight: 17,
    commodityCargoValue: 14.0,
  },
  {
    id: 5,
    commodityTitle: "Commodity 5",
    commodityName: "Bag of Corn",
    commodityType: "Sack",
    commodityNetWeight: 14,
    commodityGrossWeight: 17,
    commodityCargoValue: 14.0,
  },
  {
    id: 6,
    commodityTitle: "Commodity 6",
    commodityName: "Bag of Wheat",
    commodityType: "Sack",
    commodityNetWeight: 14,
    commodityGrossWeight: 17,
    commodityCargoValue: 14.0,
  },
];

export const UploadDocument = ({ onSuccessToggle }: UploadDocumentProps) => {
  const [documents, setDocuments] = useState({
    credential: null,
    packingList: null,
    billOfLading: null,
  });

  const handleFileSelect = (type: keyof typeof documents) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png";
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target && target.files && target.files.length > 0) {
        const file = target.files[0];
        setDocuments((prev) => ({
          ...prev,
          [type]: file,
        }));
      }
    };
    input.click();
  };

  const getFileName = (file: File | null): string => {
    if (!file) return "Please Enter";
    return file.name.length > 20
      ? `${file.name.substring(0, 17)}...`
      : file.name;
  };

  const handleNext = () => {
    const missingDocuments = [];

    if (!documents.credential) {
      missingDocuments.push("Credential Invoice");
    }
    if (!documents.packingList) {
      missingDocuments.push("Packing List");
    }
    if (!documents.billOfLading) {
      missingDocuments.push("Bill of Lading");
    }

    if (missingDocuments.length > 0) {
      alert(
        `Please upload the following documents:\n- ${missingDocuments.join(
          "\n- "
        )}`
      );
      return;
    }

    onSuccessToggle();
  };

  return (
    <div className="pl-10 md:pl-28 pr-10 py-4">
      <p className="font-normal text-xs text-right">Step 1 of 05</p>
      <h1 className="font-extrabold text-4xl mt-8">Upload Document</h1>
      <p className="font-normal text-xs">
        Upload required document for your shipment
      </p>
      <form className="my-12 md:w-[90%] lg:w-[70%] flex flex-col gap-4 font-Be_Vietnam_Pro">
        {/* Credential Invoice */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#262626]">
            Credential Invoice
          </label>
          <div className="flex">
            <div className="flex-1 border border-gray-300 rounded-l-md py-5 px-4 bg-[#FCFCFD]">
              <span className="text-[#656567]">
                {getFileName(documents.credential)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleFileSelect("credential")}
              className={`flex items-center justify-center text-sm rounded-r-md transition-colors ${
                documents.credential
                  ? "bg-[#F0F0F0] hover:bg-[#d4d4d4] text-[#A5C4D4] px-4 border-gray-500"
                  : "bg-[#A5C4D4] hover:bg-[#84a1b0] text-[#FFFFFF] px-8"
              }`}
            >
              <span className="font-bold">
                {documents.credential ? "RE-UPLOAD" : "SELECT"}
              </span>
            </button>
          </div>
        </div>

        {/* Packing List */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#262626]">
            Packing List
          </label>
          <div className="flex">
            <div className="flex-1 border border-gray-300 rounded-l-md py-5 px-4 bg-[#FCFCFD]">
              <span className="text-[#656567]">
                {getFileName(documents.packingList)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleFileSelect("packingList")}
              className={`flex items-center justify-center text-sm rounded-r-md transition-colors ${
                documents.packingList
                  ? "bg-[#F0F0F0] hover:bg-[#d4d4d4] text-[#A5C4D4] px-4 border-gray-500"
                  : "bg-[#A5C4D4] hover:bg-[#84a1b0] text-[#FFFFFF] px-8"
              }`}
            >
              <span className="font-bold">
                {documents.packingList ? "RE-UPLOAD" : "SELECT"}
              </span>
            </button>
          </div>
        </div>

        {/* Bill of Loading */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#262626]">
            Bill of Lading
          </label>
          <div className="flex">
            <div className="flex-1 border border-gray-300 rounded-l-md py-5 px-4 bg-[#FCFCFD]">
              <span className="text-[#656567]">
                {getFileName(documents.billOfLading)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleFileSelect("billOfLading")}
              className={`flex items-center justify-center text-sm rounded-r-md transition-colors ${
                documents.billOfLading
                  ? "bg-[#F0F0F0] hover:bg-[#d4d4d4] text-[#A5C4D4] px-4 border-gray-500"
                  : "bg-[#A5C4D4] hover:bg-[#84a1b0] text-[#FFFFFF] px-8"
              }`}
            >
              <span className="font-bold">
                {documents.billOfLading ? "RE-UPLOAD" : "SELECT"}
              </span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="flex items-center justify-center gap-2 mt-14 bg-[#A5C4D4] px-12 py-3 text-[#FFF] font-semibold text-xs cursor-pointer md:w-[50%] transition-colors duration-300 hover:bg-[#90afbd]"
        >
          <h6>NEXT</h6>
          <ArrowRight size={15} />
        </button>
      </form>
    </div>
  );
};

export const SuccessfulUpload = ({
  nextStep,
  onSuccessToggle,
}: SuccessUploadProps) => {
  const handleNext = () => {
    onSuccessToggle();
    nextStep();
  };
  return (
    <div className="mx-auto flex items-center justify-center w-full h-screen bg-[#000] bg-opacity-50">
      <div className="bg-[#D9D9D9] rounded-2xl w-full max-w-sm overflow-hidden p-2">
        <div className="bg-[#FFFFFF] py-2 px-1 flex items-center justify-center flex-col rounded-2xl">
          <h1 className="text-[#81D17C] text-xs font-extrabold">Successful</h1>
          <p className="text-[#81D17C] smallerText font-normal">
            Shipment details successfully fetched.
          </p>
          <p className="text-[#D9D9D9] smallerText font-normal text-center leading-3">
            Your document has been verified and pre -filled correctly <br />
            Here’s a breakdown of your document
          </p>
          <div className="mt-2 flex flex-col gap-3 w-full">
            {documentSections.map((section) => (
              <div key={section.id} className="relative">
                <div className="absolute top-0 left-0 w-full h-full">
                  <Image
                    className="w-full object-cover"
                    src="/Subtract.png"
                    alt="image background"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="relative py-1 px-4">
                  <div className="flex items-center justify-between font-bold text-[#000000E0] smallerText pt-1">
                    <h1 className="uppercase">{section.title}</h1>
                    <h1>Shipment Date</h1>
                  </div>
                  <svg
                    className="my-1"
                    width="330"
                    height="2"
                    viewBox="0 0 543 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="0.516602"
                      y1="0.928938"
                      x2="542.753"
                      y2="0.928938"
                      stroke="black"
                      strokeOpacity="0.12"
                      strokeWidth="0.810092"
                      strokeDasharray="2.43 2.43"
                    />
                  </svg>
                  <div className="flex items-center justify-between font-medium text-[#000000] smallerText">
                    <div className="flex gap-1 pt-1 items-center">
                      <svg
                        width="13"
                        height="16"
                        viewBox="0 0 13 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.15009 1.52197H3.53345C2.17633 1.52197 1.07617 2.62213 1.07617 3.97925V12.0532C1.07617 13.4103 2.17633 14.5104 3.53345 14.5104H9.15009C10.5072 14.5104 11.6074 13.4103 11.6074 12.0532V3.97925C11.6074 2.62213 10.5072 1.52197 9.15009 1.52197Z"
                          stroke="black"
                          strokeWidth="1.21514"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3.88477 4.3335H8.79932M3.88477 7.14182H8.79932M3.88477 9.95013H6.34204"
                          stroke="black"
                          strokeWidth="1.21514"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <h5>{section.document}</h5>
                    </div>
                    <div className="flex flex-col items-start">
                      <h5 className="text-[#00000073] smallerText font-normal">
                        {section.date}
                      </h5>
                      <h5 className="text-[#000000E0] smallerText font-medium">
                        {section.progress}%
                      </h5>
                    </div>
                  </div>
                  <p className="smallerText text-[#00000073] font-normal mt-2">
                    Entries Covered
                  </p>
                  <svg
                    width="330"
                    height="2"
                    viewBox="0 0 543 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="0.516602"
                      y1="0.928938"
                      x2="542.753"
                      y2="0.928938"
                      stroke="black"
                      strokeOpacity="0.12"
                      strokeWidth="0.810092"
                      strokeDasharray="2.43 2.43"
                    />
                  </svg>
                  <div className="flex items-center gap-3">
                    {section.fields.map((field, index) => (
                      <div
                        key={index}
                        className="inline-block font-medium text-[#000000] smallerText bg-[#D9D9D9] border border-[#00000033] rounded-lg py-1 px-2 my-1"
                      >
                        <h5>{field}</h5>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="my-2 px-6 py-2 bg-[#EBEBEB] rounded-lg text-center">
            <h6 className="smallerText text-[#000000] font-normal">
              Fill in the filed that require attention, they’re indicated in
              red. If you don’t have them, you can fill them in any time during
              the shipment.
            </h6>
          </div>
        </div>
        <div className="flex items-center justify-center my-4">
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center justify-center bg-[#A5C4D4] px-12 py-2 text-[#FFF] font-semibold smallerText cursor-pointer md:w-[50%] transition-colors duration-300 hover:bg-[#90afbd]"
          >
            <h6>NEXT</h6>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const RequestInfo: React.FC<ShippingFormProps> = () => {
  const [formData, setFormData] = useState<ShippingFormData>({
    originPort: "",
    destinationPort: "",
    shipper: "",
    consignee: "",
    shipmentType: "Import",
    shipmentMode: ["Air Freight"],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShipmentTypeChange = (type: "Import" | "Export") => {
    setFormData((prev) => ({ ...prev, shipmentType: type }));
  };

  const handleShipmentModeToggle = (
    mode: "Air Freight" | "Land Freight" | "Sea Freight SSL" | "Sea Freight LCL"
  ) => {
    setFormData((prev) => {
      if (prev.shipmentMode.includes(mode)) {
        return {
          ...prev,
          shipmentMode: prev.shipmentMode.filter((m) => m !== mode),
        };
      } else {
        return {
          ...prev,
          shipmentMode: [...prev.shipmentMode, mode],
        };
      }
    });
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (onSubmit) {
  //     onSubmit(formData);
  //   }
  // };

  return (
    <div className="pl-10 md:pl-28 pr-10 py-4">
      <p className="font-normal text-xs text-right">Step 2 of 05</p>
      <h1 className="font-extrabold text-4xl mt-8">Request Info</h1>
      <p className="font-normal text-xs">
        Provide the specifics of your shipment request
      </p>
      <form className="my-12 md:w-[90%] lg:w-[70%] flex flex-col gap-4 font-Be_Vietnam_Pro">
        {/* Origin Port */}
        <div className="space-y-2">
          <label
            htmlFor="originPort"
            className="block text-sm font-semibold text-[#262626]"
          >
            Origin Port
          </label>
          <div className="relative">
            <input
              type="text"
              id="originPort"
              name="originPort"
              value={formData.originPort}
              onChange={handleInputChange}
              placeholder="Please Enter"
              className="w-full p-4 bg-[#FCFCFD] border border-[#F1F1F3] text-sm rounded-md"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-icon lucide-circle text-[#C0DBFB]"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
          </div>
        </div>

        {/* Destination Port */}
        <div className="space-y-2">
          <label
            htmlFor="destinationPort"
            className="block text-sm font-semibold text-[#262626]"
          >
            Destination Port
          </label>
          <div className="relative">
            <input
              type="text"
              id="destinationPort"
              name="destinationPort"
              value={formData.destinationPort}
              onChange={handleInputChange}
              placeholder="Please Enter"
              className="w-full p-4 bg-[#FCFCFD] border border-[#F1F1F3] text-sm rounded-md"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-icon lucide-circle text-[#C0DBFB]"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
          </div>
        </div>

        {/* Shipper and Consignee Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Shipper */}
          <div className="space-y-2">
            <label
              htmlFor="shipper"
              className="block text-sm font-semibold text-[#262626]"
            >
              Shipper
            </label>
            <div className="relative">
              <input
                type="text"
                id="shipper"
                name="shipper"
                value={formData.shipper}
                onChange={handleInputChange}
                placeholder="Please Enter"
                className="w-full py-3 px-4 bg-[#FCFCFD] border border-[#F1F1F3] text-sm rounded-md pr-10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <ChevronDown className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Consignee */}
          <div className="space-y-2">
            <label
              htmlFor="consignee"
              className="block text-sm font-semibold text-[#262626]"
            >
              Consignee
            </label>
            <div className="relative">
              <input
                type="text"
                id="consignee"
                name="consignee"
                value={formData.consignee}
                onChange={handleInputChange}
                placeholder="Please Enter"
                className="w-full py-3 px-4 bg-[#FCFCFD] border border-[#F1F1F3] text-sm rounded-md pr-10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <ChevronDown className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Shipment Type */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#262626]">
            Shipment type
          </label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => handleShipmentTypeChange("Import")}
              className={`px-4 py-1 rounded-md border ${
                formData.shipmentType === "Import"
                  ? "bg-blue-100 border-[#C0DBFB] text-[#4299FF]"
                  : "bg-white border-gray-300 text-gray-600"
              }`}
            >
              Import {formData.shipmentType === "Import" && "✓"}
            </button>
            <button
              type="button"
              onClick={() => handleShipmentTypeChange("Export")}
              className={`px-4 py-1 rounded-md border ${
                formData.shipmentType === "Export"
                  ? "bg-blue-100 border-[#C0DBFB] text-[#4299FF]"
                  : "bg-white border-gray-300 text-gray-600"
              }`}
            >
              Export {formData.shipmentType === "Export" && "✓"}
            </button>
          </div>
        </div>

        {/* Shipment Mode */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#262626]">
            Shipment Mode
          </label>
          <div className="flex flex-wrap gap-2">
            {(
              [
                "Air Freight",
                "Land Freight",
                "Sea Freight SSL",
                "Sea Freight LCL",
              ] as const
            ).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => handleShipmentModeToggle(mode)}
                className={`px-4 py-1 rounded-md border ${
                  formData.shipmentMode.includes(mode)
                    ? "bg-blue-100 border-[#C0DBFB] text-[#4299FF]"
                    : "bg-white border-gray-300 text-gray-600"
                }`}
              >
                {mode} {formData.shipmentMode.includes(mode) && "✓"}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          // onClick={handleNext}
          className="flex items-center justify-center gap-2 mt-14 bg-[#A5C4D4] px-12 py-3 text-[#FFF] font-semibold text-xs cursor-pointer md:w-[50%] transition-colors duration-300 hover:bg-[#90afbd]"
        >
          <h6>NEXT</h6>
          <ArrowRight size={15} />
        </button>
      </form>
    </div>
  );
};

export const CommodityInfo = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="pl-10 md:pl-28 pr-10 py-4">
      <p className="font-normal text-xs text-right">Step 3 of 05</p>
      <h1 className="font-extrabold text-4xl mt-8">Commodity Info</h1>
      <p className="font-normal text-xs">
        Share details of the commodity(ies) to be shipped
      </p>
      <div className="my-4 bg-[#C0DBFB2B] rounded-2xl md:w-[90%] lg:w-[70%] px-2 py-2 font-Be_Vietnam_Pro">
        <div className="w-full">
          {commodityInfo.map((commodity, index) => (
            <div
              key={index}
              className="px-2 bg-[#FFFFFF] mb-4 first:rounded-t-2xl"
            >
              <button
                className={`flex items-center w-full text-left text-lg font-medium py-3 gap-x-4 ${
                  openIndex === index && "border-b-2 border-[#A5C4D426]"
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-bold text-left text-sm flex-1">
                  {commodity.commodityTitle}
                </span>
                <div className="flex items-center gap-x-2">
                  {openIndex === index && (
                    <span className="text-xs cursor-pointer font-normal text-[#A5C4D4] transition-opacity duration-300">
                      Edit Commodity Info
                    </span>
                  )}
                  <span
                    className={`cursor-pointer transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    {openIndex === index ? (
                      <FaMinus size={15} />
                    ) : (
                      <FaPlus size={15} />
                    )}
                  </span>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 grid grid-cols-3 justify-items-center w-full gap-4 mt-2 pb-2 ${
                  openIndex === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col text-[#000000]">
                  <span className="smallerText font-normal">
                    Commodity/Package Name
                  </span>
                  <span className="text-xs font-semibold text-[#262626]">
                    {commodity.commodityName}
                  </span>
                </div>
                <div className="flex flex-col text-[#000000]">
                  <span className="smallerText font-normal">Package Type</span>
                  <span className="text-xs font-semibold text-[#262626]">
                    {commodity.commodityType}
                  </span>
                </div>
                <div className="flex flex-col text-[#000000]">
                  <span className="smallerText font-normal">
                    Package Weight (Net)
                  </span>
                  <span className="text-xs font-semibold text-[#262626]">
                    {commodity.commodityNetWeight} Tons
                  </span>
                </div>
                <div className="flex flex-col text-[#000000]">
                  <span className="smallerText font-normal">
                    Package Weight (Gross)
                  </span>
                  <span className="text-xs font-semibold text-[#262626]">
                    {commodity.commodityGrossWeight} Tons
                  </span>
                </div>
                <div className="flex flex-col text-[#000000]">
                  <span className="smallerText font-normal">Cargo Value</span>
                  <span className="text-xs font-semibold text-[#262626]">
                    ${commodity.commodityCargoValue}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center flex-col">
          <button className="flex items-center justify-center gap-2 mt-4 py-3 text-[#000000] font-semibold text-xs cursor-pointer transition-colors duration-300 hover:text-[#90afbd]">
            <FaPlus /> ADD NEW COMMODITY
          </button>
          <button
            type="button"
            // onClick={handleNext}
            className="flex items-center justify-center gap-2 my-6 bg-[#A5C4D4] px-12 py-3 text-[#FFF] font-semibold text-xs cursor-pointer md:w-[50%] transition-colors duration-300 hover:bg-[#90afbd]"
          >
            <h6>NEXT</h6>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ShippingInfo = () => {
  return (
    <div className="pl-10 md:pl-28 pr-10 py-4">
      <p className="font-normal text-xs text-right">Step 4 of 05</p>
      <h1 className="font-extrabold text-4xl mt-8">Shipping Info</h1>
      <p className="font-normal text-xs">Specify Shipping details</p>
      <form className="my-12 md:w-[90%] lg:w-[70%] flex flex-col gap-4 font-Be_Vietnam_Pro">
        <div className="space-y-2">
          <label
            htmlFor="originPort"
            className="block text-sm font-semibold text-[#262626]"
          >
            BL Number
          </label>
          <div>
            <input
              type="text"
              id="BLNumber"
              name="BLNumber"
              placeholder="Please Enter"
              className="w-full p-4 bg-[#FCFCFD] border border-[#F1F1F3] text-sm rounded-md"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex flex-col items-start">
            <label
              htmlFor="originPort"
              className="block text-sm font-semibold text-[#262626]"
            >
              Container Number(s)
            </label>
            <span className="text-xs">
              Separate multiple with the <strong>Enter/Return</strong> key
            </span>
          </div>
          <div>
            <input
              type="text"
              id="containerNumber"
              name="containerNumber"
              placeholder="Please Enter"
              className="w-full p-4 bg-[#FCFCFD] border border-[#F1F1F3] text-sm rounded-md"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="originPort"
            className="block text-sm font-semibold text-[#262626]"
          >
            Shipping Line
          </label>
          <div>
            <input
              type="text"
              id="shippingLine"
              name="BLNumber"
              placeholder="Please Enter"
              className="w-full p-4 bg-[#FCFCFD] border border-[#F1F1F3] text-sm rounded-md"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="originPort"
            className="block text-sm font-semibold text-[#262626]"
          >
            Vessel Name
          </label>
          <div>
            <input
              type="text"
              id="vesselName"
              name="vesselName"
              placeholder="Please Enter"
              className="w-full p-4 bg-[#FCFCFD] border border-[#F1F1F3] text-sm rounded-md"
            />
          </div>
        </div>
        <button
          type="button"
          // onClick={handleNext}
          className="flex items-center justify-center gap-2 mt-14 bg-[#A5C4D4] px-12 py-3 text-[#FFF] font-semibold text-xs cursor-pointer md:w-[50%] transition-colors duration-300 hover:bg-[#90afbd]"
        >
          <h6>NEXT</h6>
          <ArrowRight size={15} />
        </button>
      </form>
    </div>
  );
};

export const ServiceInfo = () => {
  return (
    <div className="pl-10 md:pl-28 pr-10 py-4">
      <p className="font-normal text-xs text-right">Step 5 of 05</p>
      <h1 className="font-extrabold text-4xl mt-8">Service Info</h1>
      <p className="font-normal text-xs">
        Choose your preferred service option
      </p>
      <form className="my-12 md:w-[90%] lg:w-[70%] flex flex-col gap-4 font-Be_Vietnam_Pro">
        <div className="space-y-2">
          <label
            htmlFor="originPort"
            className="block text-sm font-semibold text-[#262626]"
          >
            What Service(s) do you require?
          </label>
          <div className="relative">
            <input
              type="text"
              id="requiredService"
              name="requiredService"
              placeholder="Please Select"
              className="w-full p-4 bg-[#FCFCFD] border border-[#F1F1F3] text-sm rounded-md"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                width="15"
                height="10"
                viewBox="0 0 15 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0L7.5 10L15 0H0Z" fill="#0A0B0A" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="originPort"
            className="block text-sm font-semibold text-[#262626]"
          >
            Select your freight forwarder
          </label>
          <div className="relative">
            <input
              type="text"
              id="freightForwarder"
              name="freightForwarder"
              placeholder="Please Select"
              className="w-full p-4 bg-[#FCFCFD] border border-[#F1F1F3] text-sm rounded-md"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                width="15"
                height="10"
                viewBox="0 0 15 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0L7.5 10L15 0H0Z" fill="#0A0B0A" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="originPort"
            className="block text-sm font-semibold text-[#262626]"
          >
            What BCO is the shipment for?
          </label>
          <div className="relative">
            <input
              type="text"
              id="BCOShipment"
              name="BCOShipment"
              placeholder="Please Select"
              className="w-full p-4 bg-[#FCFCFD] border border-[#F1F1F3] text-sm rounded-md"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                width="15"
                height="10"
                viewBox="0 0 15 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0L7.5 10L15 0H0Z" fill="#0A0B0A" />
              </svg>
            </div>
          </div>
        </div>
        <button
          type="button"
          // onClick={handleNext}
          className="flex items-center justify-center gap-2 mt-14 bg-[#A5C4D4] px-12 py-3 text-[#FFF] font-semibold text-xs cursor-pointer md:w-[50%] transition-colors duration-300 hover:bg-[#90afbd]"
        >
          <h6>SEND REQUEST</h6>
        </button>
      </form>
    </div>
  );
};
