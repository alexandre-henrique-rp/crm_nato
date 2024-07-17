"use client";

import {
  Box,
  Container,
  Heading,
  IconButton,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { METHODS } from "http";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function Aprovacao({ onDados }: any) {
  const [Data, setData] = useState<any>([]);

  const solicitacoes = [
    {
      id: 1,
      Criador: "John Doe",
      Função: "Developer",
      status: "Pending",
      Construtora: "Construtora 1",
    },
  ];

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/usuario/getall`);
      const data = await response.json();
      console.log("🚀 ~ file: page.tsx:useEffect ~ data:", data);
    })();
  }, []);

  const Update = async (id: number) => {
    const newData = Data.filter((item: any) => {
      return item.id !== id;
    });
    setData(newData);
  };

  const { id, nome, cargo, status, construtora } = onDados;

  const Filter = Data.filter((item: solictacao.SolicitacaoGetType) => {
    const itemid = item.id;
    const nome = nome;
    const cargo = cargo;
    const construtora = construtora;
    const status = status;
    return itemid, nome, cargo, construtora;
  });

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" mb={8} textAlign="center">
        Aprovação de Solicitações
      </Heading>
      <Stack spacing={4}>
        {solicitacoes.map((solicitacao) => (
          <Box
            key={solicitacao.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>CRIADOR</Th>
                  <Th>FUNÇÃO</Th>
                  <Th>STATUS</Th>
                  <Th>CONSTRUTORA</Th>
                  <Th>AÇÕES</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{solicitacao.Criador}</Td>
                  <Td>{solicitacao.Função}</Td>
                  <Td>{solicitacao.status}</Td>
                  <Td>{solicitacao.Construtora}</Td>
                  <Td>
                    <IconButton
                      aria-label="Aprovar"
                      icon={<FaCheck />}
                      colorScheme="green"
                      size="sm"
                      mr={2}
                    />
                    <IconButton
                      aria-label="Rejeitar"
                      icon={<FaTimes />}
                      colorScheme="red"
                      size="sm"
                    />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
function setData(newData: any) {
  throw new Error("Function not implemented.");
}
