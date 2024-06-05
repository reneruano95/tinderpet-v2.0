"use server";

import { createClient } from "../supabase/server";
import { Pet } from "../types";
import { getUserById } from "./users";

export async function createPet(data: Pet) {
  const supabase = createClient();
  let result;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const userById = await getUserById({ id: user?.id });

  try {
    result = await supabase
      .from("pet_tinderpet")
      .insert({
        pet_name: data.name,
        specie_name: data.specie,
        breed_name: data.breed,
        age: data.age,
        description: data.description,
        gender: data.gender,
        profile_id: userById?.data?.id,
        photos: data.photos,
        traits: data.traits,
        interests: data.interests,
      })
      .select();
  } catch (error) {
    throw error;
  }
  return result;
}

// export function updatePet() {
//   return;
// }

// export function deletePet() {
//   return;
// }

export async function getAllPets() {
  const supabase = createClient();
  let result;
  try {
    result = await supabase.from("pet_tinderpet").select("*");
  } catch (error) {
    throw error;
  }

  return result;
}

export async function getPetsByUser({
  userId,
}: {
  userId: string | undefined;
}) {
  const supabase = createClient();
  let result;
  try {
    result = await supabase
      .from("pet_tinderpet")
      .select("* , profiles!inner(user_id)")
      .eq("profiles.user_id", userId); // get pets by user id;
  } catch (error) {
    throw new Error(`Error getting pets by user ${userId}: ${error}`);
  }

  return result;
}

export async function getSpecies() {
  const supabase = createClient();

  let result;
  try {
    result = await supabase.from("species_tinderpet").select("*");
  } catch (error) {
    throw error;
  }

  return result;
}

export async function getBreeds() {
  const supabase = createClient();

  let result;
  try {
    result = await supabase
      .from("breed_tinderpet")
      .select("*, species_tinderpet!inner(*)");
  } catch (error) {
    throw error;
  }

  return result;
}

export async function getBreedsBySpecies(speciesId: string | undefined) {
  const supabase = createClient();

  let result;
  try {
    result = await supabase
      .from("breed_tinderpet")
      .select("*, species_tinderpet!inner(id)")
      .eq("species_tinderpet.id", speciesId);
  } catch (error) {
    throw error;
  }

  return result;
}
