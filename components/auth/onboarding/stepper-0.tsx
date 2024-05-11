import { FC } from "react";
import { clsx } from "clsx";
import { Check } from "lucide-react";

export interface StepperProps {
  steps: string[];
  currentStep: number;
  goTo: (step: number) => void;
}

export const Stepper: FC<StepperProps> = ({ steps, currentStep, goTo }) => (
  <div className="absolute -top-28 left-0 w-full md:w-[25%] md:relative md:top-0 md:left-0">
    <ul className="flex flex-row md:flex-col py-5 gap-x-2 justify-center rounded-lg border border-neutral-700">
      {steps.map((step, index) => (
        <li key={step} className="shrink basis-0 flex-1 group">
          <div className="min-w-7 min-h-7 w-full inline-flex md:flex md:flex-col items-center text-xs align-middle">
            <span
              className={clsx(
                "size-7 flex  justify-center items-center flex-shrink-0 font-medium rounded-full",
                currentStep === index + 1 &&
                  "bg-gray-100 text-gray-800 border-2 border-gray-800",
                currentStep < index + 1 && "bg-gray-100 text-gray-800",
                currentStep > index + 1 && "bg-green-500 text-white"
              )}
            >
              {index + 1 >= currentStep ? index + 1 : <Check />}
            </span>
            <div
              className={clsx(
                "ms-2 w-full h-px md:h-10 flex-1 bg-gray-200 group-last:hidden md:rotate-90",
                currentStep > index + 1 && "bg-green-500"
              )}
            />
          </div>
          <div className="mt-3">
            <span className="block text-sm font-medium text-gray-800">
              {step}
            </span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
