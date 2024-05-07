import { redirect } from "next/navigation";
import { getSession, getUser } from "@/lib/actions/auth";
import { revalidatePath } from "next/cache";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { user },
    error,
  } = await getUser();

  if (user) {
    revalidatePath("/home");
    redirect("/home");
  }
  return <>{children}</>;
}
