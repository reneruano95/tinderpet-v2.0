"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn, isEmpty } from "@/lib/utils";
import { useTtoggleShowPassword } from "@/lib/hooks/useToggleShowPassword";
import { signUpSchema } from "@/lib/types/schemas";
import { SignUpSchemaType } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { signUp } from "@/lib/actions/auth";
import { ToastError } from "@/components/toast-error";

export default function SignUpForm() {
  const router = useRouter();
  const { showPassword, showPasswordHandler } = useTtoggleShowPassword();

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    // console.log(data);

    const { error } = await signUp(data);

    if (error) {
      toast.error(<ToastError error={error} />);
    } else {
      toast.success("Sign up successful");
      form.reset();

      router.push("/home");
    }
  };

  return (
    <>
      <div className="mx-auto max-w-sm flex flex-col">
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
                      {/* <FormMessage className="!mt-0" /> */}
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
                      {/* <FormMessage className="!mt-0" /> */}
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
                    {/* <FormMessage className="!mt-0" /> */}
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
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Create an account
              </Button>
              <Button variant="outline" type="button" className="w-full">
                Sign up with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/sign-in" className="underline">
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      </div>

      {/* Error message */}
      <div className="mx-auto w-full max-w-sm flex flex-col">
        <div
          className={cn(
            "hidden",
            form.formState.isSubmitSuccessful && "hidden",
            !isEmpty(form.formState.errors) && "block px-6"
          )}
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {Object.values(form.formState.errors).map((error) => (
                <p key={error.message}>{error.message}</p>
              ))}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </>
  );
}
