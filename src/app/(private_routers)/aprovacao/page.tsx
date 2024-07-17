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
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { METHODS } from "http";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function Aprovacao({ onDados }: any) {
  const [Aprovacao, setAprovacao] = useState<any>([]);
  // const [Data, setData] = useState([]);
  // const [id, setid] = useState([]);
  const [Name, setName] = useState<string>("");
  const [Construtora, setConstrutora] = useState<string>("");
  const [ConstrutoraId, setConstrutoraId] = useState<number>(0);
  const [Id, setId] = useState<number>(0);

  // const aprovacao = [
  //   {
  //     id: 1,
  //     Criador: "John Doe",
  //     Função: "Developer",
  //     status: "Pending",
  //     Construtora: "Construtora 1",
  //   },
  // ];

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/usuario/getall`);
      const data = await response.json();
      console.log("🚀 ~ file: page.tsx:useEffect ~ data:", data);
      setAprovacao(data);
    })();
  }, []);

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" mb={8} textAlign="center">
        Aprovação de Solicitações
      </Heading>
      <Stack spacing={4}>
        {Aprovacao.map((solicitacao: any) => (
          <Box
            key={solicitacao.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
          >
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Text>CRIADOR: {solicitacao.Criador}</Text>
              </Box>
              <Box>
                <Text>CRIADOR: {solicitacao.Criador}</Text>
              </Box>
              <Box>
                <Text>CRIADOR: {solicitacao.Criador}</Text>
              </Box>
              <Box>
                <Text>CRIADOR: {solicitacao.Criador}</Text>
              </Box>
              <Box>
                <Text>CRIADOR: {solicitacao.Criador}</Text>
              </Box>
            </Box>

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
