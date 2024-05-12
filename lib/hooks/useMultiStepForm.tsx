import { useState } from "react";

export function useMultiStepForm(steps: string[] = []) {
  const [currentStep, setCurrentStep] = useState(0);

  const goTo = (step: number) => {
    if (step < 0 || step > steps.length) return;
    setCurrentStep(step);
  };

  return {
    steps,
    currentStep,
    goTo,
  };
}
