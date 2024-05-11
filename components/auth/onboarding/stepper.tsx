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
    {/* <!-- Stepper --> */}
    <ul className="relative flex md:flex-col flex-row gap-2 h-full md:items-start">
      {/* <!-- Item --> */}

      {steps.map((step, index) => (
        <li
          key={step}
          className="flex md:flex-col flex-row items-center gap-x-2 shrink basis-0 flex-1 group"
        >
          <div className="min-w-7 min-h-7 inline-flex items-center text-xs align-middle md:grow grow-0">
            <span className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-gray-800 rounded-full">
              {index + 1 >= currentStep ? (
                index + 1
              ) : (
                <Check className="w-4 h-4 text-green-500" />
              )}
            </span>
            <span className="ms-2 block md:grow grow-0 text-sm font-medium text-gray-800">
              {step}
            </span>
          </div>
          <div className="md:mt-2 md:w-px md:h-4 mt-0 md:ms-3.5 ms-0 w-full h-px flex-1 bg-gray-200 group-last:hidden"></div>
        </li>
      ))}
      {/* <!-- End Item --> */}
    </ul>
    {/* <!-- End Stepper --> */}
  </div>
);
