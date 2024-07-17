"use client";
import { Box, Flex, Stack } from "@chakra-ui/react";
import BotaoJuncao from "./componentes/botoes/bt_juncao";
import PerfilHome from "./componentes/perfil_home";
import { Tabela } from "./componentes/tabela";
import { FiltroComponent } from "./componentes/filter/filtro_geral";
import { SetStateAction, useState } from "react";
import { ModalPrimeAsses } from "@/app/componentes/prime_asses";

export default function HomePage() {
  const [Data, setData] = useState<any>([]);

  const HandleFilter = (e: SetStateAction<any>) => {
    if (e) {
      setData(e);
    }
  };

  return (
    <Flex
      minH="100vh"
      w="100%"
      overflowY="auto"
      justifyContent="center"
      alignItems="center"
      bg="#F8F8F8"
      py="2rem"
    >
      <ModalPrimeAsses />
      <Box
        w={{ base: "90%", md: "80%", lg: "70%" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack spacing={4} w="100%" bg="#F8F8F8" padding="10px">
          <Box>
            <BotaoJuncao />
          </Box>
          <Box justifyContent="center" alignItems="center">
            <PerfilHome />
          </Box>
          <Box justifyContent="center" alignItems="center">
            <FiltroComponent onData={HandleFilter} />
          </Box>
          <Box justifyContent="center" alignItems="center">
            <Tabela onDados={Data} />
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}
