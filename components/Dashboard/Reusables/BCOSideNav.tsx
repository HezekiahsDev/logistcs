import { LucideIcon } from "lucide-react";
import React from "react";

// Define the step interface
interface Step {
  id: number;
  title: string;
  icon: LucideIcon;
}

interface BCOSideNavProps {
  header: string;
  desc: string;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: Step[];
}

const BCOSideNav = ({
  header,
  desc,
  currentStep,
  setCurrentStep,
  steps,
}: BCOSideNavProps) => {
  return (
    <div
      className="w-[500px] inset-0 bg-[#000000]/40 h-[90vh] flex py-4 md:py-20 justify-center text-white bg-cover bg-center"
      style={{
        backgroundImage: `url(/96358ff10bd8de071032dbafe45d3a20.png)`,
      }}
    >
      <div>
        <h1 className="font-bold text-2xl underline">{header}</h1>
        <h6 className="text-xs font-normal font-Be_Vietnam_Pro mt-2">{desc}</h6>
        <div className="my-8 md:my-16 text-left flex items-center gap-3">
          <div className="h-auto w-1 flex flex-col rounded-full border-none">
            {steps.map((step) => (
              <div
                key={`progress-${step.id}`}
                className={`h-8 ${
                  currentStep === step.id ? "bg-[#A5C4D4]" : "bg-white"
                }`}
              ></div>
            ))}
          </div>
          <div className="flex flex-col items-start gap-3 font-Be_Vietnam_Pro">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={`step-${step.id}`}
                  className={`flex items-center gap-1 cursor-pointer ${
                    currentStep === step.id ? "text-white" : "text-[#969BA0]"
                  }`}
                  onClick={() => setCurrentStep(step.id)}
                >
                  <Icon
                    size={15}
                    color={currentStep === step.id ? "#FFF" : "#969BA0"}
                  />
                  <h6 className="font-normal text-xs">{step.title}</h6>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BCOSideNav;
