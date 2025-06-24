import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Using React.ComponentProps to perfectly match the internal typing of the Input component.
type FormFieldProps = React.ComponentProps<"input"> & {
  label: string;
  id: string;
};

export function FormField({ label, id, ...props }: FormFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} />
    </div>
  );
}
