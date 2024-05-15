import { useCallback, useEffect, useMemo } from "react";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { StepperProps } from "@/lib/types";
import { Step } from "@/lib/hooks/useMultiStepForm";

export default function Stepper({ steps, currentStep, goTo }: StepperProps) {
  const renderIcon = useCallback((step: Step, index: number) => {
    const hasError = step.hasError;
    const isComplete = step.isComplete;
    return hasError ? (
      <X className="size-4" />
    ) : isComplete ? (
      <Check className="size-4" />
    ) : (
      index + 1
    );
  }, []);

  return (
    <div className="absolute -top-20 left-0 w-full md:w-[20%] md:relative md:top-0 md:left-0">
      <ul className="relative flex md:flex-col flex-row gap-2 h-full">
        {steps.map((step, index) => {
          const isActive = index + 1 === currentStep;
          const isLastStep = index + 1 === steps.length;
          const divider = isLastStep ? null : (
            <div
              className={cn(
                "md:mt-2 md:ms-0 md:w-px md:h-full mt-0 ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700",
                isActive && "bg-gray-200 dark:bg-neutral-700",
                step.isComplete && "bg-green-500",
                step.hasError && "bg-red-500"
              )}
            />
          );

          return (
            <li
              key={index}
              className={cn(
                "shrink md:shrink-0 basis-0 group md:flex gap-x-2 block",
                !isLastStep && "flex-1"
              )}
              onClick={() => goTo(index + 1)}
            >
              <div className="md:min-w-7 md:min-h-7 md:w-6 md:flex md:flex-col items-center w-full inline-flex flex-wrap flex-row text-xs align-middle">
                <span
                  className={cn(
                    "size-8 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white",
                    isActive &&
                      "bg-gray-100 text-gray-800 border-2 border-gray-800",
                    currentStep < index + 1 && "bg-gray-100 text-gray-800",
                    step.isComplete && "bg-green-500 text-white",
                    "hover:cursor-pointer",
                    step.hasError && "bg-red-500 text-white"
                  )}
                >
                  {renderIcon(step, index)}
                </span>
                {divider}
              </div>

              <div className="hidden md:block md:grow md:ms-3 ms-0 md:mt-1 pb-5">
                <span className="block text-sm font-medium text-gray-800 dark:text-white">
                  {step.description}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="block md:hidden mt-2 font-medium text-gray-800 dark:text-white">
        Step {currentStep}: {steps[currentStep - 1].description}
      </div>
    </div>
  );
}
