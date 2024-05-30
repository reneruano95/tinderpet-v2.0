import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

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
import { getBreeds, getSpecies } from "@/lib/actions/pets";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

export default function Step1() {
  const form = useFormContext<OnboardingFormValues>();

  const [breeds, setBreeds] = useState([]);

  const speciesQuery = useQuery({
    queryKey: ["species"],
    queryFn: async () => await getSpecies(),
  });

  const breedsQuery = useQuery({
    queryKey: ["breeds"],
    queryFn: async () => await getBreeds(),
  });

  useEffect(() => {
    if (speciesQuery.data) {
      console.log(speciesQuery.data);
    }

    if (breedsQuery.data) {
      breedsQuery.data?.data?.map((breed) => {
        console.log(breed.breed_name);
      });
    }
  }, [speciesQuery.data, breedsQuery.data]);

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
              <FormItem className="col-span-3 sm:col-span-2 space-y-1">
                <FormLabel className="font-semibold text-sm sm:text-base">
                  Age:
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
              <FormItem className="flex flex-col col-span-2 space-y-1 mt-2">
                <FormLabel className="font-semibold text-sm sm:text-base">
                  Breed:
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? breedsQuery.data?.data?.find((breed) =>
                              breed.breed_name.names.map(
                                (breedName: string) => breedName === field.value
                              )
                            )?.label
                          : "Select breed"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search breed..." />
                      <CommandEmpty>No breed found.</CommandEmpty>
                      <CommandGroup>
                        {breedsQuery.data?.data?.map((breed) =>
                          breed.breed_name.names.map((breedName: string) => {
                            // console.log(breedName);
                            return (
                              <CommandItem
                                value={breedName}
                                key={breed.id}
                                onSelect={() => {
                                  form.setValue("breed", breedName);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    breedName === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {breedName}
                              </CommandItem>
                            );
                          })
                        )}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
