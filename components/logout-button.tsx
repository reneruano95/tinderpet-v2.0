"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { getUser, signOut } from "@/lib/actions/auth";
import { getAllUsers } from "@/lib/actions/users";
import { useState } from "react";
import { getAllPets } from "@/lib/actions/pets";

export function LogoutButton({ className, variant, label }: any) {
  const router = useRouter();
  const handleLogout = async () => {
    // Check if we have a user
    const {
      data: { user },
      error: authError,
    } = await getUser();

    if (user) {
      await signOut();
    }

    router.push("/sign-in");
  };
  return (
    <Button variant={variant} className={cn(className)} onClick={handleLogout}>
      {label}
    </Button>
  );
}

export function FetchAllUsers() {
  const handleFnTest = async () => {
    const { data, error } = await getAllUsers();
    const { data: pets, error: petsError } = await getAllPets();

    if (data === null) {
      console.log("no users found");
    }

    if (data) {
      console.log("data", data);
    }
    if (pets) {
      console.log("pets", pets);
    }
  };

  return (
    <>
      <Button variant="outline" onClick={handleFnTest}>
        Fetch All Users
      </Button>
    </>
  );
}
