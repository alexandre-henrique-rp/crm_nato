import { getServerSession } from "next-auth";
import NextAuSessionProvider from "./componentes/providers/session_provaiders";
import { Providers } from "./providers";
import { auth } from "@/lib/auth_confg";
import { signOut } from "next-auth/react";

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
      const session = await getServerSession(auth);
      const expiration = session ? session.expiration : 0;
      const user = session?.user;
      const expired = Date.now() > expiration * 1000;

      if (user) {
        if (expired) {
          signOut();
        }
      }
  return (
    <html lang="pt-br">
      <body>
        <NextAuSessionProvider>
          <Providers>{children}</Providers>
        </NextAuSessionProvider>
      </body>
    </html>
  );
}
