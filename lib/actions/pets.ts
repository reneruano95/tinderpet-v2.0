"use server";

import { createClient } from "../supabase/server";

// export function createPet() {
//   return;
// }

// export function updatePet() {
//   return;
// }

// export function deletePet() {
//   return;
// }

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
