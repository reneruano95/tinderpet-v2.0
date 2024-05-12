import { FC } from "react";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepperProps {
  steps: string[];
  currentStep: number;
  goTo: (step: number) => void;
}

export const Stepper: FC<StepperProps> = ({ steps, currentStep, goTo }) => (
  <div className="absolute -top-20 left-0 w-full md:w-[20%] md:relative md:top-0 md:left-0">
    <ul className="relative flex md:flex-col flex-row gap-2 h-full">
      {/* <!-- Item --> */}
      {steps.map((step, index) => {
        const isActive = index + 1 === currentStep;
        const isLastStep = index + 1 === steps.length;

        const divider = () => {
          if (!isLastStep) {
            return (
              <div
                className={cn(
                  "md:mt-2 md:ms-0 md:w-px md:h-full mt-0 ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700",
                  isActive && "bg-gray-200",
                  currentStep > index + 1 && "bg-green-500"
                )}
              ></div>
            );
          }
          return null;
        };

        return (
          <li
            key={step}
            className={cn(
              "shrink md:shrink-0 basis-0 group md:flex gap-x-2 block",
              !isLastStep && "flex-1"
            )}
          >
            <div className="md:min-w-7 md:min-h-7 md:w-6 md:flex md:flex-col items-center w-full inline-flex flex-wrap flex-row text-xs align-middle">
              <span
                className={cn(
                  "size-8 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full dark:bg-neutral-700 dark:text-white",
                  isActive &&
                    "bg-gray-100 text-gray-800 border-2 border-gray-800",
                  currentStep < index + 1 && "bg-gray-100 text-gray-800",
                  currentStep > index + 1 && "bg-green-500 text-white"
                )}
              >
                {index + 1 >= currentStep ? (
                  index + 1
                ) : (
                  <Check className="w-4 h-4" />
                )}
              </span>
              {divider()}
            </div>

            <div className="md:grow grow-0 mt-3 md:ms-3 ms-0 md:mt-1 pb-5">
              <span className="block text-sm font-medium text-gray-800 dark:text-white">
                Step
              </span>
            </div>
          </li>
        );
      })}
      {/* <!-- End Item --> */}
    </ul>
  </div>
);
