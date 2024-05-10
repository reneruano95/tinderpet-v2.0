"use server";

import {
  PostgrestResponseFailure,
  PostgrestResponseSuccess,
} from "@supabase/postgrest-js";
import {
  PostgrestResponse,
  PostgrestSingleResponse,
} from "@supabase/supabase-js";

import { createClient } from "../supabase/server";

export async function getAllUsers(): Promise<PostgrestResponse<any>> {
  const supabase = createClient();
  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }

  let result: PostgrestResponse<any[]>;
  try {
    result = await supabase.from("profiles").select("*");

    if (result.data?.length === 0) {
      console.log("no users found");
    }
  } catch (error: any) {
    throw new Error(`Error getting users ${error.message}`);
  }
  return result;
}

export async function getUserById({
  id,
}: {
  id: string | undefined;
}): Promise<PostgrestSingleResponse<any>> {
  const supabase = createClient();

  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }

  let result;
  try {
    result = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", id)
      .single();
  } catch (error: any) {
    throw new Error(`Error getting user: ${error}`);
  }

  return result;
}
