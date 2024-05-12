/* eslint-disable no-unused-vars */

import { z } from "zod";
import { signInSchema, signUpSchema } from "../schemas/auth";
import { onboardingSchema } from "../schemas/onboarding";

declare interface SignInSchemaType extends z.infer<typeof signInSchema> {}

declare interface SignUpSchemaType extends z.infer<typeof signUpSchema> {}

declare interface OnboardingFormValues
  extends z.infer<typeof onboardingSchema> {}
