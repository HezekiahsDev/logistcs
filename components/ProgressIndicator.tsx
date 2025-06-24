import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  id: string;
  title: string;
};

type ProgressIndicatorProps = {
  steps: Step[];
  currentStep: number;
};

export function ProgressIndicator({
  steps,
  currentStep,
}: ProgressIndicatorProps) {
  return (
    <div className="flex justify-between mb-4 mt-4">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="relative flex flex-col items-center flex-1"
        >
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
            {currentStep > index ? <Check className="h-4 w-4" /> : index + 1}
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
              className="absolute top-4 left-1/2 w-full h-0.5 bg-muted-foreground"
              style={{ transform: "translateX(0%)" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
