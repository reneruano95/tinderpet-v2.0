"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { getUser, getUserById, signOut } from "@/lib/actions/auth";

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
