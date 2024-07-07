import { NextRequest, NextResponse } from "next/server";
import { checkIsPublicRoute } from "./functions/check-is public-route";

export default function middleware(req: NextRequest) {
  const session = req.cookies.get("next-auth.session-token")?.value;
  const { pathname } = req.nextUrl;
  const ispublic = checkIsPublicRoute(pathname);

  if (pathname === "/") {
      return NextResponse.redirect(new URL("/home", req.url));
  }
  if (!session) {
    if (ispublic) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (session) {
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/",
    "/home/:path*",
    "/notification/:path*",
    "/perfil-adm/:path*",
    "/perfil-client/:path*",
    "/redefinicao",
    "/solicitacoes",
    "/login",
    "/register",
    "/reset-password",
    "/termos/uso",
    "/termos/privacidade",
    "/enviar-documentos/:path*",
  ],
};
