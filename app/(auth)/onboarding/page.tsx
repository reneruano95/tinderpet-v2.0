"use client";

import { FormFrame } from "@/components/auth/onboarding/form-frame";
import Step1 from "@/components/auth/onboarding/step-1";
import Step2 from "@/components/auth/onboarding/step-2";
import { useMultiStepForm } from "@/lib/hooks/useMultiStepForm";

export default function OnboardingPage() {
  const { steps, currentStep, nextStep, prevStep, goTo } = useMultiStepForm([
    "Days",
    "Shifts",
    "Hours",
    "Roles",
  ]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <FormFrame
        steps={steps}
        currentStep={currentStep}
        goTo={goTo}
        nextStep={nextStep}
        prevStep={prevStep}
      >
        <div className="w-full h-[90%]">
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
        </div>
      </FormFrame>
    </div>
  );
}
