import { auth } from "@/auth"; // Your NextAuth auth() wrapper
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  { path: "/bco", roles: ["beneficial_cargo_owner"] },
  { path: "/ff", roles: ["freight_forwarder"] },
  { path: "/lsp", roles: ["logistics_service_provider"] },
];

export async function middleware(request: NextRequest) {
  const session = await auth(); // ✅ This line was missing
  const currentPath = request.nextUrl.pathname;

  const route = protectedRoutes.find(({ path }) =>
    currentPath.startsWith(path)
  );

  if (route) {
    // If no session, redirect to login
    if (!session) {
      const signInUrl = new URL("/login", request.url);
      signInUrl.searchParams.set("callbackUrl", currentPath);
      return NextResponse.redirect(signInUrl);
    }

    // If role is not allowed
    if (!route.roles.includes(session.user.role)) {
      return NextResponse.redirect(new URL("/login", request.url)); // or "/unauthorized"
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/bco/:path*", "/ff/:path*", "/lsp/:path*"],
};
