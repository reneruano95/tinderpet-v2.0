import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/actions/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, error } = await getUser();

  if (error || !user) {
    revalidatePath("/sign-in");
    redirect("/sign-in");
  }

  return <>{children}</>;
}
