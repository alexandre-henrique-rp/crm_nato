import type { ConfigRoutes } from "@/types/route"
import { NextRequest } from "next/server"


/**
 * função responsavel por fazer um match de rotas, retornando se a rota é publica ou privada
 * @param {import("@/types/route").ConfigRoutes}route 
 * @param {import("next/server").NextRequest}req 
 * @returns {{
 *  isBlockRoute: boolean
 *  isPlublicRoute: boolean
 *  isPrivateRoute: boolean
 * }}
 */
export const createRouteMatch = (route: ConfigRoutes, req: NextRequest): {
  isBlockRoute: boolean;
  isPlublicRoute: boolean;
  isPrivateRoute: boolean;
} => {
  const { publicRoutes, privateRoutes, blockRoutes } = route;
  const pathName = req.nextUrl.pathname;

  const publicRouteSet = new Set(publicRoutes.flat());
  const privateRouteSet = new Set(privateRoutes.flat());
  const blockRouteSet = new Set(blockRoutes.flat());

  return{
  isBlockRoute: blockRouteSet.has(pathName),
    isPlublicRoute: publicRouteSet.has(pathName),
    isPrivateRoute: privateRouteSet.has(pathName)
  }
}