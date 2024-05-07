"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { signOut } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

export function LogoutButton({ className, variant, label }: any) {
  const router = useRouter();
  const handleLogout = async () => {
    const error = await signOut();

    if (error) {
      console.log(error);
    }

    router.refresh();
  };
  return (
    <Button variant={variant} className={cn(className)} onClick={handleLogout}>
      {label}
    </Button>
  );
}
