import { redirect } from "next/navigation";
import { getUser } from "@/lib/actions/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, error } = await getUser();

  if (user) {
    return redirect("/home");
  }

  if (error || !user) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}
