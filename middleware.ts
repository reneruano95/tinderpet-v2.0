import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = await updateSession(request);

  if (!supabase) {
    console.log("Supabase client not initialized");
  }
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user && !request.nextUrl.pathname.startsWith('/sign') && !request.nextUrl.pathname.startsWith('/onboarding')) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (user && request.nextUrl.pathname.startsWith('/sign')) {
    return NextResponse.redirect(new URL('/home', request.url))
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
