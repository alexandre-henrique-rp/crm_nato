"use client";

import { Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { BotoesFunction } from "../botoes/bt_group_function";

export const Tabela = () => {
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
      <Table id="tabelaSolicita" variant="Simple">
        <Thead>
          <Tr>
            <Th>FUNÇÕES</Th>
            <Th>ID</Th>
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
  );
};
