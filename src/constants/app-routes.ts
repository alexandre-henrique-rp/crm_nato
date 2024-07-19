import type { ConfigRoutes } from "@/types/route";

export const APP_ROUTES: ConfigRoutes = {
  blockRoutes: ["/"],
  publicRoutes: ["/login", "/reset-password", "/termos/uso"],
  privateRoutes: [
    "/home",
    "/solicitacoes",
    "/solicitacoes/:id",
    "/aprovacao",
    "/aprovacao/:id",
    "/perfil",
    "/perfil/:id",
    "/redefinica",
    "/register"
  ]
};
