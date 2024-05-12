import { useState } from "react";

export function useMultiStepForm(steps: string[] = []) {
  const [currentStep, setCurrentStep] = useState(1);

  const goTo = (step: number) => {
    if (step < 0 || step > steps.length) return;
    setCurrentStep(step);
  };
  const nextStep = () => goTo(currentStep + 1);
  const prevStep = () => goTo(currentStep - 1);

  return {
    steps,
    currentStep,
    nextStep,
    prevStep,
    goTo,
  };
}
