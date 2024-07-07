'use client';
import { useSession } from "next-auth/react";
import NextAuSessionProvider from "./componentes/providers/session_provaiders";
import { Providers } from "./providers";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
 
  return (
    <html lang="pt-br">
      <NextAuSessionProvider>
        <body>
          <Providers>{children}</Providers>
        </body>
      </NextAuSessionProvider>
    </html>
  );
}
