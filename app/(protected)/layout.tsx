import { getUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, error } = await getUser();

  if (error || !user) {
    redirect("/sign-in");
  }
  return <>{children}</>;
}
