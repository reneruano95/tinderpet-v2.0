import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { data, error } = await getUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1>Home Page</h1>
      <p>{data?.user?.email}</p>
      <LogoutButton label="Logout" variant="destructive" className="mt-4" />
    </div>
  );
}
