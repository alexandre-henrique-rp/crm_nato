"use client";

import { Flex, Box, useDisclosure } from "@chakra-ui/react";
import TextHome from "./text";
import { ModalComponent } from "@/app/(private_routers)/notification/component";
import { useSession } from "next-auth/react";
import { use } from "react";

export default function PerfilHome() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <>
      {!user && null}
      {user && (
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
            <TextHome SetName={"NOME"} SetValue={user.name} />
            <TextHome SetName={"EMAIL"} SetValue={user.email} />
            <TextHome SetName={"TELEFONE"} SetValue={user.telefone} />
            <TextHome SetName={"CPF"} SetValue={user.cpf} />
          </Box>

          <Box w={"50%"}>
            <TextHome SetName={"CARGO"} SetValue={user.cargo} />
            
            <TextHome SetName={"EMPREENDIMENTO"} SetValue={"Nome"} />
            <TextHome SetName={"CONSTRUTORA"} SetValue={"Nome"} />
          </Box>
        </Flex>
      )}
    </>
  );
}
