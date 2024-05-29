import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { OnboardingFormValues } from "@/lib/types";

import { PawPrint } from "lucide-react";
import UploadImageInput from "./upload-image-input";

export default function Step3() {
  const {
    control,
    formState: { errors },
  } = useFormContext<OnboardingFormValues>();

  return (
    <div className="w-full flex flex-col h-full">
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Photos</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          Add photos of your pet.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-4 gap-2">
          <FormField
            control={control}
            name="photos.photo1"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <UploadImageInput
                    bucket="temp"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="photos.photo2"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <UploadImageInput
                    bucket="temp"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="photos.photo3"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <UploadImageInput
                    bucket="temp"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="photos.photo4"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <UploadImageInput
                    bucket="temp"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        {errors.photos && (
          <p className="text-sm text-center font-medium text-destructive mt-2">
            {errors.photos?.photo1?.message}
          </p>
        )}
      </div>
    </div>
  );
}
