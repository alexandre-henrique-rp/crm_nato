"use client";

import { Flex, Box, useDisclosure } from "@chakra-ui/react";
import TextHome from "./text";
import { ModalComponent } from "@/app/(private_routers)/modal/component";

export default function PerfilHome() {
  return (
    <Flex
      w={"full"}
      bg={"white"}
      shadow={"md"}
      borderRadius={"15px"}
      p={"20px"}
      alignContent={"center"}
      justifyContent={"space-evenly"}
    >
      <Box w={"5%"}>
        <ModalComponent />
      </Box>
      <Box w={"50%"}>
        <TextHome SetName={"NOME"} SetValue={"Nome"} />
        <TextHome SetName={"EMAIL"} SetValue={"Nome"} />
        <TextHome SetName={"TELEFONE"} SetValue={"Nome"} />
        <TextHome SetName={"CPF"} SetValue={"Nome"} />
      </Box>

      <Box w={"50%"}>
        <TextHome SetName={"CARGO"} SetValue={"Nome"} />
        <TextHome SetName={"EMPREENDIMENTO"} SetValue={"Nome"} />
        <TextHome SetName={"CONSTRUTORA"} SetValue={"Nome"} />
      </Box>
    </Flex>
  );
}
