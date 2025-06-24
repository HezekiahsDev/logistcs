/* eslint-disable @typescript-eslint/no-explicit-any */
// ShippingInfoStep.tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ShippingInfoStep = ({ formData, setFormData }: any) => {
  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="originPort">Origin Port</Label>
        <Input
          id="originPort"
          value={formData.originPort}
          onChange={(e) =>
            setFormData({ ...formData, originPort: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="destinationPort">Destination Port</Label>
        <Input
          id="destinationPort"
          value={formData.destinationPort}
          onChange={(e) =>
            setFormData({ ...formData, destinationPort: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default ShippingInfoStep;
