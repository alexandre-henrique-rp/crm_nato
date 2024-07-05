"use client";

import { Flex } from "@chakra-ui/react";
import { DadosPessoaisAdmComponent } from "./components/dados-pessoais";

export default function perfilPage() {
  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-evenly"
        pt={10}
        pb={10}
        borderWidth={0}
        overflowX="auto"
        flexDir={"column"}
      >
        <DadosPessoaisAdmComponent />
      </Flex>
    </>
  );
}
