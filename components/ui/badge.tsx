import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow",
        outline: "text-foreground",
        import: "border-transparent bg-[#6EED834D] text-[#36C04D]",
        export:
          "border-transparent bg-[#FB5B017D] text-black-foreground shadow",
        shipmentMode: "border-transparent bg-[#A5C4D4] text-white",
        decline: "p-1 rounded-sm text-[#FF2D55] border-[#FB5B01]",
        view: "p-1 rounded-sm text-[#1F2933] border-black",
        accept: "p-1 rounded-sm text-[#43CC6F] border-[#81D17C]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
