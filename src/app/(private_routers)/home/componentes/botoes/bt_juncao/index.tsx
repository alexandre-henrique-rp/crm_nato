"use client";

import { Box, Flex } from "@chakra-ui/react";
import BotaoCadastro from "../bt_cadastro";
import BotaoNovaSolicita from "../bt_nvsolicita";
import BotaoProcesso from "../bt_processo/index ";
import BotaoSair from "../bt_sair";







export default function BotaoJuncao() {

  const but = localStorage.getItem("hierarquia");

  return (
    <Flex w={"100%"}>
      <Box
        w={"100%"}
        h={"100%"}
        borderRadius={"15px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"20px"}
      >
        <BotaoNovaSolicita />
        <BotaoProcesso />
        {but !== "USER" && <BotaoCadastro />}
        <BotaoSair />
      </Box>
    </Flex>
  );
}
