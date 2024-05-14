import { useFormContext } from "react-hook-form";
import { OnboardingFormValues } from "@/lib/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger } from "@/components/ui/select";

export default function Step2() {
  const form = useFormContext<OnboardingFormValues>();
  return (
    <div className="w-full flex flex-col h-full">
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Traits & Interests
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          Add your pet&apos;s details to find the perfect match.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-4 gap-2">
          <FormField
            control={form.control}
            name="traits"
            render={({ field }) => (
              <FormItem className="col-span-2 space-y-1 mt-2">
                <FormLabel className="font-semibold text-base">
                  Traits:
                </FormLabel>
                <FormControl>
                  <Input className="px-2 py-1" placeholder="" {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem className="col-span-2 space-y-1 mt-2">
                <FormLabel className="font-semibold text-base">
                  Breed:
                </FormLabel>
                <FormControl>
                  <Input className="px-2 py-1" placeholder="" {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
