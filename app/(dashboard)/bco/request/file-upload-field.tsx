//file-upload-field
"use client";

import type React from "react";

import { useRef } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface FileUploadFieldProps {
  label: string;
  optional?: boolean;
  value: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
}

export function FileUploadField({
  label,
  optional = false,
  value,
  onChange,
  accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectClick = () => {
    // Use the ref to trigger the file input click
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    onChange(e.target.files[0]);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <Label className="text-base font-medium">
          {label}
          {optional && (
            <span className="text-sm font-normal text-muted-foreground ml-1">
              (Optional)
            </span>
          )}
        </Label>
        <div className="text-sm text-muted-foreground">
          {value ? (
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              {value.name}
            </div>
          ) : (
            "Please Enter"
          )}
        </div>
      </div>
      <Button
        variant="outline"
        className="bg-sky-200 hover:bg-sky-300 border-0 text-sky-800 w-24"
        onClick={handleSelectClick}
        type="button"
      >
        SELECT
      </Button>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
      />
    </div>
  );
}
