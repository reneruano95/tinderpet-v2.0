"use client";

import { useQuery } from "@tanstack/react-query";
import PetCard from "./pet-card";
import { getAllPets } from "@/lib/actions/pets";

export default function StackCardPet() {
  const petQuery = useQuery({
    queryKey: ["pets"],
    queryFn: async () => await getAllPets(),
  });

  if (petQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (petQuery.isError) {
    return <div>Error: {petQuery.error.message}</div>;
  }

  if (petQuery.data?.data) {
    console.log("data", petQuery.data.data);
  }
  return <PetCard />;
}
