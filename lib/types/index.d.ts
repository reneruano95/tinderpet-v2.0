/* eslint-disable no-unused-vars */

import { z } from "zod";
import { signInSchema, signUpSchema } from "../schemas/auth";
import { onboardingSchema } from "../schemas/onboarding";
import { Step } from "../hooks/useMultiStepForm";

declare interface SignInSchemaType extends z.infer<typeof signInSchema> {}

declare interface SignUpSchemaType extends z.infer<typeof signUpSchema> {}

declare interface OnboardingFormValues
  extends z.infer<typeof onboardingSchema> {}

declare interface StepperProps {
  steps: Step[];
  currentStep: number;
  goTo: (step: number) => void;
  nextStep?: () => void;
  prevStep?: () => void;
  hasError?: boolean;
}

declare interface Pet {
  name: string;
  specie: string;
  breed: string;
  age: string | undefined;
  description: string;
  photos: {
    photo1: string;
    photo2?: string | undefined;
    photo3?: string | undefined;
    photo4?: string | undefined;
  };
  gender: string;
  traits: string[] | undefined;
  interests: string[] | undefined;
}
