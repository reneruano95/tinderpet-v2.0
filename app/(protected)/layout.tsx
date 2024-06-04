import Navbar from "@/components/navbar";
import { getUser } from "@/lib/actions/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { user },
    error: authError,
  } = await getUser();

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar user={user} />
        {children}
      </div>
    </>
  );
}
