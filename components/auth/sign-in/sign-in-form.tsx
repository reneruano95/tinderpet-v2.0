"use client";

import Link from "next/link";

import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signInSchema } from "@/lib/types/schemas";
import { SignInSchemaType } from "@/lib/types";
import { cn, isEmpty, toggleShowPassword } from "@/lib/utils";
import { signIn } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const { showPassword, showPasswordHandler } = toggleShowPassword();

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInSchemaType) => {
    // console.log(data);

    const { error } = await signIn(data);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Login successful");
      form.reset();

      router.push("/");
    }
  };

  return (
    <>
      <div className="mx-auto flex flex-col">
        <div className="flex flex-col space-y-1.5 p-6">
          <h1 className="text-2xl font-semibold leading-none tracking-tight">
            Login
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 pt-0">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Email</FormLabel>
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
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline hover:text-foreground/50"
                      >
                        Forgot your password?
                      </Link>
                    </div>

                    <FormControl>
                      <div className="flex items-center !mt-0">
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
                    <FormDescription className="!mt-0">
                      Contact us if you forgot your password.
                    </FormDescription>

                    {/* <FormMessage className="!mt-0" /> */}
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full" type="button">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </div>

      {/* Error message*/}
      <div className="mx-auto flex flex-col">
        <div
          className={cn(
            "hidden p-6 pt-0",
            form.formState.isSubmitSuccessful && "hidden",
            !isEmpty(form.formState.errors) && "block"
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
