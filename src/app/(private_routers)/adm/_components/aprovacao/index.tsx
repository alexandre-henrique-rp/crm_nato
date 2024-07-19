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

  const [Name, setName] = useState<string>("");
  const [Construtora, setConstrutora] = useState<string>("");
  const [ConstrutoraId, setConstrutoraId] = useState<number>(0);
  const [Id, setId] = useState<number>(0);

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
        {Aprovacao.map((solicitacao: any) => {
          console.log(solicitacao.status.toString());
          return (
            <Box
              key={solicitacao.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              justifyContent={"space-between"}
            >
              <Box display="flex" justifyContent="space-between">
                <Box w={"50%"}>
                  <Text fontWeight="bold" fontSize="md">
                    NOME:
                  </Text>
                  {solicitacao.nome}
                </Box>
                <Box w={"25%"}>
                  <Text fontWeight="bold" fontSize="md">
                    FUNÇÃO:{" "}
                  </Text>
                  {solicitacao.cargo}
                </Box>
                <Box w={"25%"}>
                  <Text fontWeight="bold" fontSize="md">
                    STATUS:{" "}
                  </Text>
                  {solicitacao.status.toString()}
                </Box>

                <Box w={"25%"}>
                  <Text fontWeight="bold" fontSize="md">
                    APROVAR:{" "}
                  </Text>
                  <Box display="flex">
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
                  </Box>
                </Box>
              </Box>
              <Table variant="simple"></Table>
            </Box>
          );
        })}
      </Stack>
    </Container>
  );
}
function setData(newData: any) {
  throw new Error("Function not implemented.");
}
