import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../supabase/server";

export function createPet() {
  return;
}

export function updatePet() {
  return;
}

export function deletePet() {
  return;
}

export function getPet() {
  return;
}

export function getPets() {
  return;
}

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
      .select("* , profiles(*)")
      .eq("profiles.user_id", userId); // get pets by user id;
  } catch (error) {
    throw new Error(`Error getting pets by user ${userId}: ${error}`);
  }

  return result;
}
