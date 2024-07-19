import NextAuSessionProvider from "./componentes/providers/session_provaiders";
import { Providers } from "./providers";

export default async function RootLayout({
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
