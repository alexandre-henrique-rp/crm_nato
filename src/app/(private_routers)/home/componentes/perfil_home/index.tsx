"use client";

import { Flex, Box, useDisclosure, Text } from "@chakra-ui/react";
import TextHome from "./text";
import { ModalComponent } from "@/app/(private_routers)/notification/component";
import { useSession } from "next-auth/react";
import { SelectComponent } from "@/app/componentes/select";
import { useState } from "react";

export default function PerfilHome() {
  const [IdEmpreedimento, setIdEmpreedimento] = useState(0);
  const [IdConstrutora, setIdConstrutora] = useState(0);
  const { data: session } = useSession();
  const user = session?.user;

  const SetIdEmpreedimento = (id: number) => {
    setIdEmpreedimento(id);
  };
  const SetIdConstrutora = (id: number) => {
    setIdConstrutora(id);
  };
  if (user?.construtora.length === 1 && !IdConstrutora) {
    setIdConstrutora(user.construtora[0].id);
  }
  if (user?.empreendimento.length === 1 && !IdEmpreedimento) {
    setIdEmpreedimento(user.empreendimento[0].id);
  }
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
            {user.empreendimento.length > 1 ? (
              <>
                <Text textColor={"#00713D"} fontWeight={"bold"}>
                  EMPREENDIMENTO
                </Text>
                <SelectComponent
                  SetValue={user.empreendimento}
                  onValue={SetIdEmpreedimento}
                />
              </>
            ) : (
              user.empreendimento.length === 1 && (
                <TextHome
                  SetName={"EMPREENDIMENTO"}
                  SetValue={user.empreendimento[0].nome}
                />
              )
            )}

            {user.construtora.length > 1 ? (
              <>
                <Text textColor={"#00713D"} fontWeight={"bold"}>
                CONSTRUTORA
                </Text>
                <SelectComponent
                  SetValue={user.construtora.map((item: any) => {
                    return { id: item.id, nome: item.razaosocial };})}
                  onValue={SetIdConstrutora}
                />
              </>
            ) : (
              user.construtora.length === 1 && (
                <TextHome
                  SetName={"CONSTRUTORA"}
                  SetValue={user.construtora[0].razaosocial}
                />
              )
            )}
          </Box>
        </Flex>
      )}
    </>
  );
}
