// UploadDocsStep.tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

const UploadDocsStep = ({ formData, setFormData }: any) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, document: e.target.files?.[0] || null });
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="document">Upload Document</Label>
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.jpg,.png"
      />
    </div>
  );
};

export default UploadDocsStep;
