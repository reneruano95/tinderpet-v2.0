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
  const { control, formState } = useFormContext<OnboardingFormValues>();

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
          <div className="col-span-2">
            {/* <UploadImageInput bucket="temp" value="" onChange={() => {}} /> */}
          </div>
          <FormField
            control={control}
            name="photo2"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <UploadImageInput
                    bucket="temp"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <div className="col-span-2 p-6 bg-slate-300 h-32 rounded-lg border-zinc-600 border-dashed border-2 dark:bg-slate-700 flex items-center justify-center text-slate-600">
            <PawPrint className="size-full text-slate-600" />
          </div>
          <div className="col-span-2 p-6 bg-slate-300 h-32 rounded-lg border-zinc-600 border-dashed border-2 dark:bg-slate-700 flex items-center justify-center text-slate-600">
            <PawPrint className="size-full text-slate-600" />
          </div>
        </div>
        <div className="text-left text-xs"> Add photos </div>
      </div>
    </div>
  );
}
