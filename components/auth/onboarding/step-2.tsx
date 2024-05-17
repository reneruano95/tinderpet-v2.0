import { useFormContext } from "react-hook-form";
import { OnboardingFormValues } from "@/lib/types";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const traits: Option[] = [
  { label: "Friendly", value: "friendly" },
  { label: "Playful", value: "playful" },
  { label: "Well-behaved", value: "well-behaved" },
  { label: "Energetic", value: "energetic" },
  { label: "Affectionate", value: "affectionate" },
  { label: "Adaptive", value: "adaptive" },
  { label: "Healthy", value: "healthy" },
  { label: "Intelligent", value: "intelligent" },
  { label: "Independent", value: "independent" },
  { label: "Curious", value: "curious" },
];
const interests: Option[] = [
  { label: "Outdoor Adventures", value: "outdoor adventures" },
  { label: "Interactive Toys", value: "interactive toys" },
  { label: "Treat Time", value: "treat time" },
  { label: "Nap Time", value: "nap time" },
  { label: "Socializing", value: "socializing" },
  { label: "Grooming", value: "grooming" },
  { label: "Training", value: "training" },
  { label: "Pet-friendly Events", value: "pet-friendly events" },
  { label: "Relaxing Activities", value: "relaxing activities" },
  { label: "Exploration", value: "exploration" },
];

export default function Step2() {
  const form = useFormContext<OnboardingFormValues>();
  return (
    <div className="w-full flex flex-col h-full">
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Traits & Interests
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          Add more details to find the perfect match.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-4 gap-2">
          <FormField
            control={form.control}
            name="traits"
            render={({ field }) => (
              <FormItem className="col-span-4 sm:col-span-2 space-y-1 sm:mt-2">
                <FormLabel className="font-semibold text-base">
                  Traits:
                </FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    badgeClassName="text-xs"
                    defaultOptions={traits}
                    hidePlaceholderWhenSelected
                    placeholder="Select traits (Up to 5)"
                    emptyIndicator={
                      <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem className="col-span-4 sm:col-span-2 space-y-1 sm:mt-2">
                <FormLabel className="font-semibold text-base">
                  Interests:
                </FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    defaultOptions={interests}
                    hidePlaceholderWhenSelected
                    placeholder="Select interests (Up to 5)"
                    emptyIndicator={
                      <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1 sm:mt-2 w-full">
                  <FormLabel>Description:</FormLabel>
                  <FormControl>
                    <Textarea
                      className="w-full resize-none px-2 py-1"
                      placeholder="Tell us more about your pet"
                      maxLength={50}
                      {...field}
                    />
                  </FormControl>
                  <div className="flex items-center justify-between">
                    <FormMessage className="text-xs" />
                    <FormDescription
                      className={cn(
                        "text-xs",
                        field.value?.length > 50
                          ? "text-destructive"
                          : "text-gray-500 dark:text-gray-400"
                      )}
                    >
                      {field.value?.length || 0} / 50
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
