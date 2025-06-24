// RequestInfoStep.tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface RequestInfoFormData {
  shipmentType: string;
  shipmentMode: string;
}

interface RequestInfoStepProps {
  formData: RequestInfoFormData;
  setFormData: (formData: RequestInfoFormData) => void;
}

const RequestInfoStep = ({ formData, setFormData }: RequestInfoStepProps) => {
  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="shipmentType">Shipment Type</Label>
        <Input
          id="shipmentType"
          value={formData.shipmentType}
          onChange={(e) =>
            setFormData({ ...formData, shipmentType: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="shipmentMode">Shipment Mode</Label>
        <Input
          id="shipmentMode"
          value={formData.shipmentMode}
          onChange={(e) =>
            setFormData({ ...formData, shipmentMode: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default RequestInfoStep;
