import { FetchAllUsers, LogoutButton } from "@/components/logout-button";
import StackCardPet from "@/components/stack-card-pet";
import { getUser } from "@/lib/actions/auth";

export default async function HomePage() {
  const {
    data: { user },
    error,
  } = await getUser();

  return (
    <div className="flex flex-1 flex-col items-center justify-center ">
      <h1>Home Page</h1>
      <p>{user?.email}</p>

      <FetchAllUsers />
      <StackCardPet />
    </div>
  );
}
