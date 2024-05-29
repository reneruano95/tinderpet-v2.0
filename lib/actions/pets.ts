"use server";
import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../supabase/server";
import { spec } from "node:test/reporters";

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
  supabase,
}: {
  userId: string | undefined;
  supabase: SupabaseClient<any, "public", any>;
}) {
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
