import { FetchUserButton, LogoutButton } from "@/components/logout-button";
import { ToastError } from "@/components/toast-error";
import { Button } from "@/components/ui/button";
import { getUser, getUserById } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function HomePage() {
  const {
    data: { user },
    error,
  } = await getUser();
  const metadata = user?.user_metadata;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1>Home Page</h1>
      <p>{user?.email}</p>
      <pre>{JSON.stringify(metadata, null, 2)}</pre>
      <LogoutButton label="Logout" variant="destructive" className="mt-4" />
      <FetchUserButton label="Fetch User" variant="outline" className="mt-4" />
    </div>
  );
}
