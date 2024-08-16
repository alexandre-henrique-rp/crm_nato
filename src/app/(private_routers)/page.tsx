"use client";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { SetStateAction, useEffect, useState } from "react";
import { ModalPrimeAsses } from "@/app/componentes/prime_asses";
import { FiltroComponent } from "./home/componentes/filter/filtro_geral";
import PerfilHome from "./home/componentes/perfil_home";
import { Tabela } from "./home/componentes/tabela";


async function handleGetUpdate() {
  const res = await fetch(`/api/solicitacao/getall`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 2 },
  });
  const data = await res.json();
  return data;
}


export default function HomePage() {
  const [Data, setData] = useState<any>([]);
  const [DadosClientes, setDadosClientes] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const data = await handleGetUpdate();
      setDadosClientes(data);
    })();
  }, []);

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
          <Box justifyContent="center" alignItems="center">
            <PerfilHome />
          </Box>
          <Box justifyContent="center" alignItems="center">
            <FiltroComponent onData={HandleFilter} />
          </Box>
          <Box justifyContent="center" alignItems="center">
            <Tabela onDados={Data} ClientData={DadosClientes} />
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}
