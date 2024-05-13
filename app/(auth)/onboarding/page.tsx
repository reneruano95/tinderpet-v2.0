"use client";

import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { FormFrame } from "@/components/auth/onboarding/form-frame";
import { useMultiStepForm } from "@/lib/hooks/useMultiStepForm";
import { onboardingSchema } from "@/lib/schemas/onboarding";
import { OnboardingFormValues } from "@/lib/types";
import Step1 from "@/components/auth/onboarding/step-1";
import Step2 from "@/components/auth/onboarding/step-2";
import Step3 from "@/components/auth/onboarding/step-3";

export default function OnboardingPage() {
  const { steps, currentStep, nextStep, prevStep, goTo } = useMultiStepForm([
    "Pet Details",
    "Traits & Interests",
    "Review",
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

  type FieldName = keyof OnboardingFormValues;
  const fieldNames: FieldName[] = ["name", "gender", "age", "specie", "breed"];

  const handlerNext = useCallback(
    (next: string) => async () => {
      const valid = await form.trigger(fieldNames, {
        shouldFocus: true,
      });

      if (valid) {
        goTo(steps.indexOf(next) + 1);
      }
      if (!valid) {
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
            {currentStep === 3 && <Step3 />}
          </div>
        </FormProvider>
      </FormFrame>
    </div>
  );
}
