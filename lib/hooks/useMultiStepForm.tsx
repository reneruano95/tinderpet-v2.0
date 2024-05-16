import { useEffect, useState } from "react";

export type Step = {
  title: string;
  description: string;
  fields?: string[] | undefined;
  hasError?: boolean;
  isComplete?: boolean;
};

export type StepsWithErrors = {
  stepsIncomplete: number[];
  stepsWithError: number[];
  fieldsWithError: string[] | undefined;
};

export function useMultiStepForm(steps: Step[]) {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const stepsWithErrors: StepsWithErrors = {
    stepsIncomplete: [],
    stepsWithError: [],
    fieldsWithError: [],
  };
  const [, setStepsWithErrors] = useState<StepsWithErrors>(stepsWithErrors);

  // useEffect(() => {
  //   steps.forEach((step, index) => {
  //     if (!step.isComplete) {
  //       stepsWithErrors.stepsIncomplete.push(index + 1);
  //     }
  //     if (step.hasError) {
  //       stepsWithErrors.stepsWithError.push(index + 1);
  //       stepsWithErrors.fieldsWithError = step.fields;
  //     }
  //   });
  // }, [steps, currentStep, hasError, isComplete]);

  // if (stepsWithErrors.stepsIncomplete.length === 0) {
  //   setIsComplete(true);
  // }

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
    hasError,
    setHasError,
    isComplete,
    setIsComplete,
  };
}
