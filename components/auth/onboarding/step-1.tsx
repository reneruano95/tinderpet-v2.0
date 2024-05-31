import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

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
import { getBreeds, getBreedsBySpecies, getSpecies } from "@/lib/actions/pets";
import { AutoComplete } from "@/components/ui/autocomplete";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

const FRAMEWORKS = ["Angular", "React", "Vue", "Svelte", "Next.js", "Gatsby"];

export default function Step1() {
  const form = useFormContext<OnboardingFormValues>();

  const [selectedBreeds, setSelectedBreeds] = useState<string[] | undefined>(
    undefined
  );

  const speciesQuery = useQuery({
    queryKey: ["species"],
    queryFn: async () => await getSpecies(),
  });

  const specieValue = form.watch("specie");
  let id: string | undefined;
  if (specieValue) {
    // console.log("specieValue", specieValue);
    id = speciesQuery.data?.data?.find(
      (species) => species.species_name === specieValue
    )?.id;
  }

  const breedsQuery = useQuery({
    queryKey: ["breedsBySpecies"],
    queryFn: async () => await getBreedsBySpecies(id),
    queryHash: id ? `breedsBySpecies-${id}` : undefined,
  });

  // useEffect(() => {
  //   if (speciesQuery.data) {
  //     console.log("speciesQuery.data", speciesQuery.data);
  //   }
  // }, [speciesQuery.data]);

  useEffect(() => {
    if (breedsQuery.isSuccess && id) {
      // console.log("breedsQuery.data", breedsQuery.data);
      const breedsBySpecies = breedsQuery.data?.data?.map((breed) => {
        return breed.breed_name?.names;
      });
      // console.log("specieId", id);
      // console.log("breedsBySpecies", breedsBySpecies?.[0]);
      return setSelectedBreeds(breedsBySpecies?.[0]);
    }

    // if (selectedBreeds) {
    //   console.log("selectedBreeds", selectedBreeds);
    // }
  }, [breedsQuery.data, id]);

  if (speciesQuery.isError || breedsQuery.isError) {
    console.log(speciesQuery.error);
    console.log(breedsQuery.error);
  }

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
                <FormLabel className="font-semibold text-sm sm:text-base">
                  Name:
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
            name="gender"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1 space-y-1">
                <FormLabel className="font-semibold text-sm sm:text-base">
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
              <FormItem className="flex flex-col col-span-3 sm:col-span-2 space-y-1">
                <FormLabel className="font-semibold text-sm sm:text-base">
                  Date of birth
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-xs">
                  Date of birth is used to calculate the age of your pet.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specie"
            render={({ field }) => (
              <FormItem className="col-span-2 space-y-1 mt-2">
                <FormLabel className="font-semibold text-sm sm:text-base">
                  Specie:
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="px-2 py-1">
                    <SelectTrigger className="text-left">
                      <SelectValue placeholder="Select specie" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {speciesQuery.isSuccess &&
                      speciesQuery.data?.data?.map((specie) => {
                        const newValue = specie.species_name
                          .split("")[0]
                          .toUpperCase()
                          .concat(specie.species_name.slice(1));
                        return (
                          <SelectItem
                            key={specie.id}
                            value={specie.species_name}
                          >
                            {newValue}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem className="col-span-2 space-y-1 mt-2">
                <FormLabel className="font-semibold text-sm sm:text-base">
                  Breed:
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="px-2 py-1">
                    <AutoComplete
                      options={selectedBreeds}
                      emptyMessage="No results."
                      placeholder="Select breed"
                      isLoading={breedsQuery.isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                </Select>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
