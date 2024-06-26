"use server";

import {
  AuthError,
  AuthResponse,
  AuthTokenResponsePassword,
  UserResponse,
} from "@supabase/supabase-js";

import { createClient } from "../supabase/server";
import { SignInSchemaType, SignUpSchemaType } from "../types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function signIn(
  data: SignInSchemaType
): Promise<AuthTokenResponsePassword> {
  const supabase = createClient();
  const { email, password } = data;

  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }

  let result;
  try {
    result = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  } catch (error: unknown) {
    throw new Error(`Error signing in:  ${error}`);
  }

  return JSON.parse(JSON.stringify(result));
}

export async function signUp(data: SignUpSchemaType): Promise<AuthResponse> {
  const supabase = createClient();
  const { email, password, firstName, lastName } = data;

  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }
  let result;
  try {
    result = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${firstName} ${lastName}`,
          avatar_url: "",
          first_name: firstName,
          last_name: lastName,
          app: "tinderpet-v2.0",
        },
      },
    });
  } catch (error: unknown) {
    throw new Error(`Error signing up:  ${error}`);
  }

  return JSON.parse(JSON.stringify(result));
}

export async function signOut(): Promise<AuthError | null> {
  const supabase = createClient();

  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }

  let result;
  try {
    result = await supabase.auth.signOut();
  } catch (error: unknown) {
    throw new Error(`Error signing out:  ${error}`);
  }

  let { error } = result;

  return JSON.parse(JSON.stringify(error));
}

// retrieves the current local session on the client side
export async function getSession(): Promise<any> {
  const supabase = createClient();

  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }

  let result;
  try {
    result = await supabase.auth.getSession();
  } catch (error: unknown) {
    throw new Error(`Error getting session:  ${error}`);
  }
  return JSON.parse(JSON.stringify(result));
}

// gets the current user details if there is an existing session
export async function getUser(): Promise<UserResponse> {
  const supabase = createClient();

  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }

  let result;
  try {
    result = await supabase.auth.getUser();
  } catch (error: unknown) {
    throw new Error(`Error getting user:  ${error}`);
  }

  return JSON.parse(JSON.stringify(result));
}
