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

export const DadosPessoaisComponent = () => {
  // const { data: session } = useSession ();
  // const User: any = session?.user;
  // const id = User?.id;
  const [Name, setName] = useState<string>("");
  const [Cpf, setCpf] = useState<string>("");
  const [Cnh, setCnh] = useState<string>("");
  const [Whatapp, setWhatapp] = useState<string>("");
  const [CnhFile, setCnhFile] = useState<string>("");
  const [RgFile, setRgFile] = useState<string>("");
  const [Email, setEmail] = useState<string>("");
  const [Construtora, setsetConstrutora] = useState<string>("");
  const [Empreendimento, setEmpreendimento] = useState<string>("");
  const [DataNascimento, setDataNascimento] = useState<string>("");
  const [Relacionamento, setRelacionamento] = useState<string>("");
  const [Looad, setLooad] = useState<boolean>(false);
  const toast = useToast();
  // const router = useRouter();

  //   useEffect(() => {
  //     (async () => {
  //       // const res = await fetch(`/api/User/get/${id}`);
  //       // const resp = await res.json();
  //       // console.log(resp)

  //       const WhatsAppMask = (data: any) => {
  //         const valor = data;
  //         const valorLinpo = unMask(valor);
  //         const masked = mask(valorLinpo, ["(99) 9999-9999", "(99) 9 9999-9999"]);
  //         return masked;
  //       };

  //       const CpfMask = (data: any) => {
  //         const valor = data;
  //         const valorLinpo = unMask(valor);
  //         const masked = mask(valorLinpo, ["999.999.999-99"]);
  //         return masked;
  //       };

  //       setName(resp?.nome);
  //       setCpf(CpfMask(resp?.Cpf_number));
  //       setWhatapp(WhatsAppMask(resp?.whatsapp));
  //       setCnhFile(resp?.fotos_cnh?.url);
  //       setRgFile(resp?.fotos_rg?.url);
  //       setEmail(resp?.email);
  //       setConstrutora(resp?.Relacionamento);
  //       setEmpreendimento(resp?.escolaridade);
  //       setDataNascimento(resp?.data_nascimento);
  //     })();
  //   }, []);
  const handleSubmit: FormEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setLooad(true);
    try {
      const data = {
        cnh_number: Cnh,
        Cpf_number: Cpf,
        nome: Name,
        whatsapp: Whatapp,
        email: Email,
        foto_rg: RgFile,
        foto_cnh: CnhFile,
        Construtora: Construtora,
        Empreendimento: Empreendimento,
        Relacionamento: Relacionamento,
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

  const CnhMask = (e: any) => {
    const valor = e.target.value;
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ["99999999999"]);
    setCnh(masked);
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
                  htmlFor="email_address"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Relacionamento
                </FormLabel>
                <Input type="text" variant="flushed" value={Relacionamento} />
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
                  Numero da CNH
                </FormLabel>
                <Input
                  type="text"
                  variant="flushed"
                  onChange={CnhMask}
                  value={Cnh}
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

              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  CNH
                </FormLabel>
                <Input
                  type="File"
                  variant="flushed"
                  value={CnhFile}
                  onChange={(e) => setCnhFile(e.target.value)}
                ></Input>
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 3]}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  RG
                </FormLabel>
                <Input
                  type="File"
                  variant="flushed"
                  value={RgFile}
                  onChange={(e) => setRgFile(e.target.value)}
                ></Input>
              </FormControl>

              <FormControl isRequired as={GridItem} colSpan={[6, 3]}>
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

              <FormControl isRequired as={GridItem} colSpan={[6, 3]}>
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
                onClick={handleSubmit}
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

        {/* Inicio Dados de contato */}
        <Box
          w="70%"
          m={5}
          h="100%"
          p={10}
          bg="white"
          borderRadius={8}
          boxShadow="lg"
        >
          <Text fontSize={"2xl"}> Alertas </Text>
          <Divider borderColor={"#00713D"} pt={2} />
          <Stack pt={10}>
            <Box>
              <Stack spacing={3}>
                <Alert status="error">
                  <AlertIcon />
                  There was an error processing your request
                </Alert>

                <Alert status="success">
                  <AlertIcon />
                  Data uploaded to the server. Fire on!
                </Alert>

                <Alert status="warning">
                  <AlertIcon />
                  Seems your account is about expire, upgrade now
                </Alert>

                <Alert status="info">
                  <AlertIcon />
                  Chakra is going live on August 30th. Get ready!
                </Alert>
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* Fim dados de contato */}
      </Flex>
    </>
  );
};
