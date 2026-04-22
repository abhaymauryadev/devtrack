import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const AUTH_ROUTES = ["/login", "/signup"];
const PROTECTED_ROUTES = [
  "/screen",
  "/dashboard",
  "/previewtracker",
  "/logs",
  "/analytics",
  "/tracker",
  "/popup",
];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const hasLegacyCookie = Boolean(request.cookies.get("auth-token")?.value);
  const isLoggedIn = Boolean(token) || hasLegacyCookie;
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/screen", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/screen/:path*",
    "/dashboard/:path*",
    "/previewtracker/:path*",
    "/logs/:path*",
    "/analytics/:path*",
    "/tracker/:path*",
    "/popup/:path*",
  ],
};
