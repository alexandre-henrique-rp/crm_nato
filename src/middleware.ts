import { NextRequest, NextResponse } from "next/server";
import { APP_ROUTES } from "./constants/app-routes";
import { createRouteMatch } from "./lib/route";

export default function middleware(req: NextRequest) {
  const session = req.cookies.get("next-auth.session-token")?.value;
  const { pathname } = req.nextUrl;

  const { isPlublicRoute, isPrivateRoute, isBlockRoute } = createRouteMatch(
    APP_ROUTES,
    req
  );

  if (pathname === "/home") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (pathname === "/login") {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }
  if (pathname === "/") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }
  if (isBlockRoute) {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPrivateRoute) {
    if (session) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (!session) {
    if (isPlublicRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/home",
    "/solicitacoes/:path*",
    "/solicitacoes",
    "/redefinicao",
    "/solicitacoes",
    "/login",
    "/register",
    "/reset-password",
    "/termos/uso"
  ]
};
