"use client";
import { Box, Flex } from "@chakra-ui/react";
import BotaoCadastro from "../bt_cadastro";
import BotaoNovaSolicita from "../bt_nvsolicita";
import BotaoSair from "../bt_sair";
import { useSession } from "next-auth/react";
import { ModalFormComponent } from "@/app/componentes/modal";

export default function BotaoJuncao() {
  const { data: session } = useSession();
  const but = session?.user?.hierarquia;
  return (
    <Flex w={"100%"}>
      <Box h={"100%"} borderRadius={"15px"} display={"flex"} gap={"20px"}>
        {but === "ADM" && <ModalFormComponent rota={"geral"}  />}

        <BotaoNovaSolicita />
        {/* {but !== "USER" && <BotaoCadastro />} */}
        <BotaoSair />
      </Box>
    </Flex>
  );
}
