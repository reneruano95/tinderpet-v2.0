"use server";

import {
  AuthResponse,
  AuthTokenResponsePassword,
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
  } catch (error: any) {
    throw error;
  }

  return result;
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
          first_name: firstName,
          last_name: lastName,
          app: "tinderpet-v2.0",
        },
      },
    });
  } catch (error: any) {
    throw error;
  }

  return result;
}

export async function signOut() {
  return null;
}

export async function getSession() {
  return null;
}

export async function getUser(): Promise<UserResponse> {
  const supabase = createClient();

  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }

  let result;
  try {
    result = await supabase.auth.getUser();
  } catch (error) {
    throw error;
  }

  return result;
}
