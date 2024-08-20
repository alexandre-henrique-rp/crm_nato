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

  const expiration = session ? session.expiration : 0;
  const expired = Date.now() > expiration * 1000;

  if (!user)
    return (
      <>
        <Loading />
      </>
    );


  if(user) {
    if (expired) {
       route.push("/login");
       signOut({ redirect: false });
    }
  }
  return (
    <Box overflowY={"auto"} h={"100vh"} w={"100vw"}>
      <BotaoJuncao />
      {user && children}
      <FooterComponent />
    </Box>
  );
}
