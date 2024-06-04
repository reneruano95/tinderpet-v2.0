import { FetchAllUsers, LogoutButton } from "@/components/logout-button";
import PetCard from "@/components/pet-card";
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
    <div className="flex flex-1 flex-col items-center justify-center ">
      <h1>Home Page</h1>
      <p>{user?.email}</p>

      <FetchAllUsers />
      <PetCard />
    </div>
  );
}
