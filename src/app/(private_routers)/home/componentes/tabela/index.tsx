"use client";

import { Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BotoesFunction } from "../botoes/bt_group_function";
import { useSession } from "next-auth/react";

export const Tabela = () => {

  const [Data, setData] = useState([]);
  const { data: session } = useSession();
  const user = session?.user;
  const token = session?.token;

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/solicitacao/getall/${token}`);
      const data = await res.json();
      setData(data);
      console.log("Dados", data);
    })();
  }, [token]);

  const tabela =
    Data.length > 0 &&
    Data.map((item: any) => {
      return (
        <Tr key={item.id}>
          <Td>
            <BotoesFunction />
          </Td>
          {user?.hierarquia === "ADM" && <Td>{item.id}</Td>}
          <Td>{item.nome}</Td>
          <Td>{item.data}</Td>
          <Td>{item.andamento}</Td>
          <Td>{item.assdoc}</Td>
          <Td>{item.statuspgmnt}</Td>
        </Tr>
      );
    });

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
          <Table variant="Simple">
            <Thead>
              <Tr>
                <Th>FUNÇÕES</Th>
                {user?.hierarquia === "ADM" && <Th>ID</Th>}
                <Th>NOME</Th>
                <Th>AGENDAMENTO</Th>
                <Th>ANDAMENTO</Th>
                <Th>ASS.DOC</Th>
                <Th>STATUSPGMNT</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* 1ª Coluna */}
              <Tr>
                <Td>
                  <BotoesFunction />
                </Td>
                <Td>33412</Td>
                <Td>Matheus</Td>
                <Td>14/06/2024</Td>
                <Td>Concluido</Td>
                <Td>Assinado</Td>
                <Td>PAGO</Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
      )}
    </>
  );
};
