"use client";
import { Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BotoesFunction } from "../botoes/bt_group_function";
import { useSession } from "next-auth/react";

interface CompradorProps{
  
}

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
      // const dtAgenda = item.fcweb && new Date(item.fcweb.dt);
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
          {user?.hierarquia !== "USER" && <Td>{item.statuspgmnt}</Td>}
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
                {user?.hierarquia !== "USER" && <Th>STATUS PGMNT</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {Data.length === 0 && null }
              {Data.length > 0 && tabela }
            </Tbody>
          </Table>
        </Flex>
      )}
    </>
  );
};
