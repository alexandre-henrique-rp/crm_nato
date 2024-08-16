"use client";

import { signOut, useSession } from "next-auth/react";
import Loading from "../loading";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import BotaoJuncao from "./home/componentes/botoes/bt_juncao";
import FooterComponent from "../componentes/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const user = session?.user;
  const route = useRouter();

  if (!user)
    return (
      <>
        <Loading />
      </>
    );

  if (!user) {
    route.push("/login");
    signOut({ redirect: false });
  }
  return (
    <Box overflowY={"auto"} h={"100vh"} w={"100vw"}>
      <BotaoJuncao />
      {user && children}
      <FooterComponent />
    </Box>
  );
}
