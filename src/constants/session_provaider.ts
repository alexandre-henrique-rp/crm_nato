import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

/**
 * Asynchronously retrieves the server session using the provided NextAuth options and logs it to the console.
 *
 * @return {Promise<boolean>} A boolean indicating whether a session was found.
 */
export default async function SeaaionProviderFunction(): Promise<boolean> {
  const session = await getServerSession(nextAuthOptions);
  return !!session ? true : false;
}
