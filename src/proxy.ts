import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// export async function proxy(request: NextRequest) {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   console.log(session);

//   if (!session && !request.nextUrl.pathname.startsWith("/signin")) {
//     return NextResponse.redirect(new URL("/signin", request.url));
//   }

//   return NextResponse.next();
// }

// Checks if a session cookie exists, redirects to signin page if it doesn't
// NOTE: DOES NOT VALIDATE THE SESSION
export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: "forge_session",
  });

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:path((?!api|auth/signin|auth/signup|_next/static|_next/image|favicon.ico).*)",
  ],
};
