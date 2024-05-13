import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { OnboardingFormValues } from "@/lib/types";

export default function Step1() {
  const form = useFormContext<OnboardingFormValues>();

  return (
    <div className="w-full flex flex-col h-full">
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Create Pet Profile
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          Add your pet&apos;s details to find the perfect match.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-4 gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1 space-y-1">
                <FormLabel className="font-semibold text-base">Name:</FormLabel>
                <FormControl>
                  <Input className="px-2 py-1" placeholder="" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1 space-y-1">
                <FormLabel className="font-semibold text-base">
                  Gender:
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="px-2 py-1">
                    <SelectTrigger className="text-left">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="col-span-3 sm:col-span-2 space-y-1">
                <FormLabel className="font-semibold text-base">Age:</FormLabel>
                <FormControl>
                  <Input className="px-2 py-1" placeholder="" {...field} />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specie"
            render={({ field }) => (
              <FormItem className="col-span-2 space-y-1 mt-2">
                <FormLabel className="font-semibold text-base">
                  Specie:
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
            name="breed"
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
