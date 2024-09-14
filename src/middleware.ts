import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret });
  const hasSession = !!token;
  const pathname = request.nextUrl.pathname;

  if (pathname === "/auth/signIn" && hasSession) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if ((pathname === "/" || pathname.startsWith("/home")) && !hasSession) {
    const queryParams = new URLSearchParams({ redirect: pathname });
    return NextResponse.redirect(
      new URL(`/auth/signIn?${queryParams.toString()}`, request.url)
    );
  }

  if (pathname === "/" && hasSession) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/signIn", "/home/:path*", "/website/:path*"],
};
