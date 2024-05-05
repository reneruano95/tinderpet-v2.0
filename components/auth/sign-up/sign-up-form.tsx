"use client";

import Link from "next/link";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toggleShowConfirmPassword, toggleShowPassword } from "@/lib/utils";

export default function SignUpForm() {
  const { showPassword, showPasswordHandler } = toggleShowPassword();
  const { showConfirmPassword, showConfirmPasswordHandler } =
    toggleShowConfirmPassword();

  return (
    <div className="mx-auto max-w-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          Sign Up
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your information to create an account
        </p>
      </div>

      <div className="p-6 pt-0">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
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

          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <div className="flex items-center">
              <Input
                id="confirm-password"
                className="rounded-e-none"
                type={showConfirmPassword ? "text" : "password"}
              />
              <Button
                onClick={() => showConfirmPasswordHandler()}
                className="text-muted-foreground p-0 h-10 w-10 m-0 rounded-s-none bg-transparent hover:bg-muted border border-input border-s-0"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 m-0" />
                ) : (
                  <Eye className="h-5 w-5 m-0" />
                )}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
