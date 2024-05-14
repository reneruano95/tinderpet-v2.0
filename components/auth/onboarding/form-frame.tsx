import { ChevronLeft, ChevronRight } from "lucide-react";

import Stepper from "./stepper";
import { Button } from "@/components/ui/button";
import { StepperProps } from "@/lib/types";

interface FormFrameProps extends StepperProps {
  children: React.ReactNode
}

export function FormFrame({
  steps,
  currentStep,
  goTo,
  nextStep,
  prevStep,
  children,
}:
  FormFrameProps
) {
  return (
    <div className="flex justify-between h-[500px] w-11/12 max-w-2xl m-1 relative rounded-lg border border-neutral-700  p-4">
      <Stepper steps={steps} currentStep={currentStep} goTo={goTo} />
      <div className="w-full flex flex-col md:w-[75%] bg-white rounded-lg border border-neutral-700">
        {children}
        <div className="flex h-[10%] justify-between items-center gap-x-2">
          <Button
            type="button"
            variant="outline"
            className="inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            disabled={currentStep === 1}
            onClick={currentStep === 1 ? undefined : prevStep}
          >
            <ChevronLeft className="size-4" />
            Back
          </Button>
          <Button
            type="button"
            variant="default"
            className="inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
            onClick={nextStep}
          >
            {currentStep === steps.length ? "Finish" : "Next"}
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
