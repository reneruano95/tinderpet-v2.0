import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";
import { getPetsByUser } from "./lib/actions/pets";

export async function middleware(request: NextRequest) {
  const { supabase, response } = await updateSession(request);

  if (!supabase) {
    console.log("Supabase client not initialized");
  }
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (user) {
    const { data: petsByUser, error: errorPet } = await getPetsByUser({
      userId: user?.id,
      supabase,
    });
    console.log(`pets found with user.id: ${user?.id}`, petsByUser);
  }

  if (!user) console.log('no user & no pets')

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/sign") &&
    !request.nextUrl.pathname.startsWith("/onboarding")
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (user) {
    if (request.nextUrl.pathname.startsWith("/sign") || request.nextUrl.pathname.startsWith("/onboarding")) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next()
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
