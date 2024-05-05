"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Eye, EyeOff } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toggleShowConfirmPassword, toggleShowPassword } from "@/lib/utils";
import { signUpSchema } from "@/lib/types/schemas";
import { SignUpSchemaType } from "@/lib/types";

export default function SignUpForm() {
  const { showPassword, showPasswordHandler } = toggleShowPassword();
  const { showConfirmPassword, showConfirmPasswordHandler } =
    toggleShowConfirmPassword();

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    console.log(data);
    // signUp(data)
    form.reset();
  };

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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 pt-0">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="first-name">First name</FormLabel>
                    <FormControl>
                      <Input
                        id="first-name"
                        placeholder=""
                        {...field}
                        type="text"
                        className="!mt-0"
                      />
                    </FormControl>
                    <FormMessage className="!mt-0" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="last-name">Last name</FormLabel>
                    <FormControl>
                      <Input
                        id="last-name"
                        placeholder=""
                        {...field}
                        type="text"
                        className="!mt-0"
                      />
                    </FormControl>
                    <FormMessage className="!mt-0" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder=""
                      {...field}
                      type="email"
                      className="!mt-0"
                    />
                  </FormControl>
                  <FormMessage className="!mt-0" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Input
                        id="password"
                        {...field}
                        className="rounded-e-none"
                        type={showPassword ? "text" : "password"}
                      />
                      <Button
                        asChild
                        onClick={() => showPasswordHandler()}
                        className="text-muted-foreground p-0 h-10 w-10 m-0 rounded-s-none bg-transparent hover:bg-muted border border-input border-s-0"
                      >
                        <div>
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 m-0" />
                          ) : (
                            <Eye className="h-5 w-5 m-0" />
                          )}
                        </div>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="!mt-0" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="confirm-password">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Input
                        id="confirm-password"
                        {...field}
                        className="rounded-e-none"
                        type={showConfirmPassword ? "text" : "password"}
                      />
                      <Button
                        asChild
                        onClick={() => showConfirmPasswordHandler()}
                        className="text-muted-foreground p-0 h-10 w-10 m-0 rounded-s-none bg-transparent hover:bg-muted border border-input border-s-0"
                      >
                        <div>
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 m-0" />
                          ) : (
                            <Eye className="h-5 w-5 m-0" />
                          )}
                        </div>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="!mt-0" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Create an account
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link href="/sign-in" className="underline">
              Sign in
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
