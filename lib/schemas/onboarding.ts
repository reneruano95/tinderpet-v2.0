import { z } from "zod";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const imageSchema = z.object({
  photo1: z.string().min(1, "Add at least one photo."),
  photo2: z.string().optional(),
  photo3: z.string().optional(),
  photo4: z.string().optional(),
});
const FormSchema = z
  .object({
    dob: z.date({
      required_error: "A date of birth is required.",
    }),
  })
  .refine((data) => data.dob < new Date(), {
    message: "Date of birth cannot be in the future.",
    path: ["dob"],
  });

export const onboardingSchema = z.object({
  name: z.string().min(1, "Name is required."),
  age: z
    .date({
      required_error: "A date of birth is required.",
    })
    .refine((data) => data < new Date(), {
      message: "Date of birth cannot be in the future.",
      path: ["age"],
    }),
  specie: z
    .string({
      required_error: "Please select a specie",
    })
    .refine((val) => val !== "", {
      message: "Select a specie",
    }),
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
  photos: imageSchema,
});
