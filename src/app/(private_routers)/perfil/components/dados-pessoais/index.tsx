"use client";

import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { mask, unMask } from "remask";

export const DadosPessoaisAdmComponent = () => {
  const [Name, setName] = useState<string>("");
  const [Cpf, setCpf] = useState<string>("");
  const [Cnh, setCnh] = useState<string>("");
  const [Whatapp, setWhatapp] = useState<string>("");
  const [Email, setEmail] = useState<string>("");
  const [Construtora, setConstrutora] = useState<string>("");
  const [Empreendimento, setEmpreendimento] = useState<string>("");
  const [DataNascimento, setDataNascimento] = useState<string>("");
  const [Looad, setLooad] = useState<boolean>(false);
  const toast = useToast();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLooad(true);
    try {
      const data = {
        cnh_number: Cnh,
        Cpf_number: Cpf,
        nome: Name,
        whatsapp: Whatapp,
        email: Email,
        Construtora: Construtora,
        Empreendimento: Empreendimento,
      };
      const rest = await fetch(`/api/User/put/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await rest.json();
      console.log(response);
      setLooad(false);
    } catch (error) {
      setLooad(false);
      console.log(error);
    }
  };
  const WhatsAppMask = (e: any) => {
    const valor = e.target.value;
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ["(99) 9999-9999", "(99) 9 9999-9999"]);
    setWhatapp(masked);
  };

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="center"
        mx={2}
        borderWidth={0}
        overflowX="auto"
        flexDir={"column"}
      >
        {/* Dados pessoais */}
        <Box
          w="70%"
          m={5}
          h="100%"
          p={10}
          bg="white"
          borderRadius={8}
          boxShadow="lg"
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Text fontSize={"2xl"}> Dados Pessoais </Text>
            <Button variant={"link"} leftIcon={<FaPen />}></Button>
          </Box>
          <Divider borderColor={"#00713D"} pt={2} />
          <Stack
            pt={4}
            bg="white"
            _dark={{
              bg: "#141517",
            }}
            spacing={6}
          >
            <SimpleGrid columns={6} spacing={6}>
              <FormControl isRequired as={GridItem} colSpan={[6, 2]}>
                <FormLabel fontSize="sm" fontWeight="md">
                  Nome Completo
                </FormLabel>
                <Input
                  type="text"
                  value={Name}
                  variant="flushed"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired as={GridItem} colSpan={[6, 2]}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Data de Nascimento
                </FormLabel>
                <Input
                  variant="flushed"
                  value={DataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  type="date"
                />
              </FormControl>


              <FormControl isRequired as={GridItem} colSpan={[6, 2]}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Telefone Celular
                </FormLabel>
                <Input
                  type="text"
                  variant="flushed"
                  onChange={WhatsAppMask}
                  value={Whatapp}
                />
              </FormControl>

              <FormControl isRequired as={GridItem} colSpan={[6, 2]}>
                <FormLabel
                  htmlFor="email_address"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Email
                </FormLabel>
                <Input
                  variant="flushed"
                  type="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired as={GridItem} colSpan={[6, 2]}>
                <FormLabel
                  htmlFor="email_address"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Construtora
                </FormLabel>
                <Input type="text" variant="flushed" />
              </FormControl>

              <FormControl isRequired as={GridItem} colSpan={[6, 2]}>
                <FormLabel
                  htmlFor="email_address"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Empreendimento
                </FormLabel>
                <Input type="text" variant="flushed" />
              </FormControl>

              <Button
                // onClick={handleSubmit}
                colorScheme={"green"}
                mt={5}
                mb={5}
                variant="outline"
                width="250px"
                height="50px"
                maxWidth="100%"
                isLoading={Looad}
              >
                Salvar e Enviar
              </Button>
            </SimpleGrid>
          </Stack>
        </Box>
        {/* Fim dados Pessoais */}
      </Flex>
    </>
  );
};
