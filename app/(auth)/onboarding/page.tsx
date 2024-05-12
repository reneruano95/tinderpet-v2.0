"use client";

import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { FormFrame } from "@/components/auth/onboarding/form-frame";
import Step1 from "@/components/auth/onboarding/step-1";
import Step2 from "@/components/auth/onboarding/step-2";
import { useMultiStepForm } from "@/lib/hooks/useMultiStepForm";
import { onboardingSchema } from "@/lib/schemas/onboarding";
import { OnboardingFormValues } from "@/lib/types";

// type FormStep = "Days" | "Shifts" | "Hours";

export default function OnboardingPage() {
  const { steps, currentStep, nextStep, prevStep, goTo } = useMultiStepForm([
    "Days",
    "Shifts",
    "Hours",
  ]);
  const form = useForm<OnboardingFormValues>({
    defaultValues: {
      name: "",
      age: "",
      specie: "",
      breed: "",
      gender: "",
    },
    resolver: zodResolver(onboardingSchema),
  });

  const handlerNext = useCallback(
    (next: string) => async () => {
      const valid = await form.trigger();
      if (valid) {
        goTo(steps.indexOf(next) + 1);
      } else {
        console.log("invalid");
        return;
      }
    },
    [form]
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <FormFrame
        steps={steps}
        currentStep={currentStep}
        goTo={goTo}
        nextStep={handlerNext(steps[currentStep])}
        prevStep={prevStep}
      >
        <FormProvider {...form}>
          <div className="w-full h-[90%]">
            {currentStep === 1 && <Step1 />}
            {currentStep === 2 && <Step2 />}
          </div>
        </FormProvider>
      </FormFrame>
    </div>
  );
}
