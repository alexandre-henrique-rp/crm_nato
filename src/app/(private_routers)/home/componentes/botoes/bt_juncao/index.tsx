"use client";
import { Box, Flex } from "@chakra-ui/react";
import BotaoCadastro from "../bt_cadastro";
import BotaoNovaSolicita from "../bt_nvsolicita";
import BotaoSair from "../bt_sair";
import { useSession } from "next-auth/react";

export default function BotaoJuncao() {
 const {data: session} = useSession()
  console.log(session?.user);
  const but = session?.user?.hierarquia;
  return (
    <Flex w={"100%"}>
      <Box h={"100%"} borderRadius={"15px"} display={"flex"} gap={"20px"}>
        <BotaoNovaSolicita />
        {but !== "USER" && <BotaoCadastro />}
        <BotaoSair />
      </Box>
    </Flex>
  );
}
