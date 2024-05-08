"use server";

import {
  AuthError,
  AuthResponse,
  AuthTokenResponsePassword,
  PostgrestSingleResponse,
  UserResponse,
} from "@supabase/supabase-js";

import { createClient } from "../supabase/server";
import { SignInSchemaType, SignUpSchemaType } from "../types";

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
  } catch (error: AuthError | any) {
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
  } catch (error: AuthError | any) {
    throw new Error(`Error signing up :  ${error.message}`);
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
  } catch (error: AuthError | any) {
    throw new Error(`Error signing out :  ${error}`);
  }

  let { error } = result;

  return JSON.parse(JSON.stringify(error));
}

export async function getSession(): Promise<any> {
  const supabase = createClient();

  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }

  let result;
  try {
    result = await supabase.auth.getSession();
  } catch (error) {
    throw new Error(`Error getting session :  ${error}`);
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
  } catch (error: AuthError | any) {
    throw new Error(`Error getting user :  ${error}`);
  }

  return JSON.parse(JSON.stringify(result));
}

export async function getUserById(): Promise<PostgrestSingleResponse<any[]>> {
  const supabase = createClient();

  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }

  let result;
  try {
    result = await supabase.from("profiles").select("*");
  } catch (error: AuthError | any) {
    throw new Error(`Error getting user :  ${error}`);
  }

  return JSON.parse(JSON.stringify(result));
}
