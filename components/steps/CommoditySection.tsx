/* eslint-disable @typescript-eslint/no-explicit-any */
// CommoditySection.tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const CommoditySection = ({ formData, setFormData }: any) => {
  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="shipper">Shipper</Label>
        <Input
          id="shipper"
          value={formData.shipper}
          onChange={(e) =>
            setFormData({ ...formData, shipper: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="consignee">Consignee</Label>
        <Input
          id="consignee"
          value={formData.consignee}
          onChange={(e) =>
            setFormData({ ...formData, consignee: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default CommoditySection;
