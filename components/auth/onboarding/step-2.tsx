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
import MultipleSelector, { Option } from "@/components/ui/multi-select";

const OPTIONS: Option[] = [
  { label: "Nextjs", value: "nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Ember", value: "ember", disable: true },
  { label: "Gatsby", value: "gatsby", disable: true },
  { label: "Astro", value: "astro" },
];

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
                  <MultipleSelector
                    {...field}
                    defaultOptions={traits}
                    hidePlaceholderWhenSelected
                    placeholder="Select traits (Up to 5)"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
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
              <FormItem className="col-span-2 space-y-1 mt-2">
                <FormLabel className="font-semibold text-base">
                  Breed:
                </FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    defaultOptions={interests}
                    hidePlaceholderWhenSelected
                    placeholder="Select interests (Up to 5)"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
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
