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

  if (isBlockRoute) {
    if (session) {
      return NextResponse.redirect(new URL("/home", req.url));
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
  if (session) {
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/",
    "/home",
    "/solicitacoes/:path*",
    "/redefinicao",
    "/solicitacoes",
    "/login",
    "/register",
    "/reset-password",
    "/termos/uso"
  ]
};
