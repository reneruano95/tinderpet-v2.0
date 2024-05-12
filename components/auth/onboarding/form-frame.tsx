"use client";
import { useMultiStepForm } from "@/lib/hooks/useMultiStepForm";
import { Stepper } from "./stepper";

export function FormFrame({ children }: { children: React.ReactNode }) {
  const { steps, currentStep, goTo } = useMultiStepForm([
    "Days",
    "Shifts",
    "Hours",
    "Roles",
  ]);

  return (
    <div className="flex justify-between h-[500px] w-11/12 max-w-4xl m-1 relative rounded-lg border border-neutral-700  p-4">
      <Stepper steps={steps} currentStep={3} goTo={goTo} />
      <div className="w-full md:w-[75%] bg-white rounded-lg border border-neutral-700">
        {children}
      </div>
    </div>
  );
}
