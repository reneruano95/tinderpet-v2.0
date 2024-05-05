"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signInSchema } from "@/lib/types/schemas";
import { SignInSchemaType } from "@/lib/types";
import { toggleShowPassword } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export default function SignInForm() {
  const { showPassword, showPasswordHandler } = toggleShowPassword();
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  return (
    <div className="mx-auto max-w-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          Login
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="p-6 pt-0">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <div className="flex items-center">
              <Input
                id="password"
                className="rounded-e-none"
                type={showPassword ? "text" : "password"}
              />
              <Button
                onClick={() => showPasswordHandler()}
                className="text-muted-foreground p-0 h-10 w-10 m-0 rounded-s-none bg-transparent hover:bg-muted border border-input border-s-0"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 m-0" />
                ) : (
                  <Eye className="h-5 w-5 m-0" />
                )}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
