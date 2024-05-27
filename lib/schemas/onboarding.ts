import { z } from "zod";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

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
  traits: z
    .array(optionSchema)
    .min(3, "Please select at least 3 traits.")
    .max(5, "No more than 5 traits"),
  interests: z
    .array(optionSchema)
    .min(3, "Please select at least 3 interests.")
    .max(5, "No more than 5 interests"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  photo2: z.string().min(2, "Please add at least one photo."),
});
