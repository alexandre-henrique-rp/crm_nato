import { NextRequest, NextResponse } from "next/server";
import { APP_ROUTES } from "./constants/app-routes";
import { createRouteMatch } from "./lib/route";

export default function middleware(req: NextRequest) {
    const cookiesAll = req.cookies.getAll();
    const filtro = cookiesAll.filter((cookie) => cookie.name.includes("next-auth.session-token"));
    const session = filtro[0]?.value;
    

    const { pathname } = req.nextUrl;

    const { isPlublicRoute, isPrivateRoute, isBlockRoute } = createRouteMatch(
        APP_ROUTES,
        req
    );

    if (pathname === "/home") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (!session) {
        if (isBlockRoute) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        if (isPrivateRoute) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        if (isPlublicRoute) {
            return NextResponse.next();
        }
    }

    if (session) {
        if (isPlublicRoute) {
            return NextResponse.redirect(new URL("/", req.url));
        }
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
