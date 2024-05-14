import { z } from "zod";

export const onboardingSchema = z.object({
  name: z.string().min(1, "Name is required."),
  age: z.string().min(1, "Age is required."),
  specie: z.string().min(1, "Specie is required."),
  breed: z.string().min(1, "Breed is required."),
  gender: z
    .string({
      required_error: "Please select a gender",
    })
    .refine((val) => val === "male" || val === "female", {
      message: "Select a gender",
    }),
  traits: z.string().array().min(5),
  interests: z.array(z.string().min(1, "Please select at least one interest.")),
});
