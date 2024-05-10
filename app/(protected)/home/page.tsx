import { FetchAllUsers, LogoutButton } from "@/components/logout-button";
import { getUser } from "@/lib/actions/auth";
import { getUserById } from "@/lib/actions/users";

export default async function HomePage() {
  const {
    data: { user },
    error,
  } = await getUser();

  const metadata = user?.user_metadata;

  const { data: userById } = await getUserById({ id: user?.id });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1>Home Page</h1>
      <p>{user?.email}</p>

      <pre>{JSON.stringify(userById, null, 2)}</pre>
      <LogoutButton label="Logout" variant="destructive" className="mt-4" />
      <FetchAllUsers />
    </div>
  );
}
