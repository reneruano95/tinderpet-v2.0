"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { FormFrame } from "@/components/auth/onboarding/form-frame";
import { Step, useMultiStepForm } from "@/lib/hooks/useMultiStepForm";
import { onboardingSchema } from "@/lib/schemas/onboarding";
import { OnboardingFormValues } from "@/lib/types";
import Step1 from "@/components/auth/onboarding/step-1";
import Step2 from "@/components/auth/onboarding/step-2";
import Step3 from "@/components/auth/onboarding/step-3";
import { useCallback, useState } from "react";

const stepsTest = [
  {
    title: "Step 1",
    description: "Pet Details",
    fields: ["name", "specie", "breed", "age", "gender"],
    hasError: false,
    isComplete: false,
  },
  {
    title: "Step 2 ",
    description: "Traits & Interests",
    fields: ["traits", "interests", "description"],
    hasError: false,
    isComplete: false,
  },
  { title: "Step 3", description: "Review" },
];

export default function OnboardingPage() {
  const { steps, currentStep, nextStep, prevStep, goTo } =
    useMultiStepForm(stepsTest);

  const form = useForm<OnboardingFormValues>({
    defaultValues: {
      name: "",
      age: "",
      specie: "",
      breed: "",
      gender: "",
      interests: [],
      traits: [],
    },
    resolver: zodResolver(onboardingSchema),
  });

  const handlerCreatePet = useCallback(
    async (data: OnboardingFormValues) => {
      console.log(data);
    },
    [form]
  );

  type FieldName = keyof OnboardingFormValues;

  const [stepsWithErrors, setStepsWithError] = useState<object>({});

  const handlerNext = useCallback(async () => {
    const fields = steps[currentStep - 1].fields;
    const valid = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (valid) {
      steps[currentStep - 1].hasError = false;
      steps[currentStep - 1].isComplete = true;
      nextStep();
    }

    if (!valid) {
      if (currentStep === 3) return;
      steps[currentStep - 1].hasError = true;
      steps[currentStep - 1].isComplete = false;
      console.log("current step:", currentStep);
      console.log("fields to validate:", fields);
      return;
    }

    if (currentStep === 3) {
      return await form.handleSubmit(handlerCreatePet)();
    }
  }, [currentStep, form, nextStep, steps]);

  const handlerPrev = useCallback(() => {
    prevStep();
  }, [prevStep]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <FormFrame
        steps={stepsTest}
        currentStep={currentStep}
        goTo={goTo}
        nextStep={handlerNext}
        prevStep={handlerPrev}
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
