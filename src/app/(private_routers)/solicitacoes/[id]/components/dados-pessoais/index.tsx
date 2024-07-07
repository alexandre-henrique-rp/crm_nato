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
  useToast
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { mask, unMask } from "remask";

interface DadosPessoaisProps {
  SetData: any;
}

interface SetDataType {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  dt_solicitacao: Date | string | any;
  corretor: {
    id: number;
    nome: string;
  };
  construtora: number;
  telefone: string;
  dt_nascimento: Date | string | any;
  ass_doc: boolean;
  link_doc: string;
  id_fcw: number;
  obs: string;
  alert: string;
  empreedimento: number;
  cnh: string;
  ativo: boolean;
  uploadCnh: string;
  relacionamento: string[];
  createdAt: Date | string | any;
  updatedAt: Date | string | any;
  telefone2: string;
  uploadRg: string;
}

interface SetDataTypePost {
  nome: string;
  cpf: string;
  email: string;
  corretor: number;
  construtora: number;
  telefone: string;
  dt_nascimento: Date | string | any;
  ass_doc: boolean;
  link_doc: string;
  id_fcw: number | null;
  obs: string;
  alert: string;
  empreedimento: number;
  cnh: string;
  uploadCnh: string;
  relacionamento: string[];
  telefone2: string;
  uploadRg: string;
}

export const DadosPessoaisComponent = ({ SetData }: DadosPessoaisProps) => {
  const [Name, setName] = useState<string>("");
  const [Cpf, setCpf] = useState<string>("");
  const [Cnh, setCnh] = useState<string>("");
  const [Whatsapp, setWhatsapp] = useState<string>("");
  const [Whatsapp2, setWhatsapp2] = useState<string>("");
  const [CnhFile, setCnhFile] = useState<string>("");
  const [RgFile, setRgFile] = useState<string>("");
  const [Email, setEmail] = useState<string>("");
  const [LinkDoc, setLinkDoc] = useState<string>("");
  const [Construtora, setsetConstrutora] = useState<number>(0);
  const [IdFcweb, setsetIdFcweb] = useState<number | null>(null);
  const [Empreendimento, setEmpreendimento] = useState<number>(0);
  const [DataNascimento, setDataNascimento] = useState<Date | string | any>();
  const [Relacionamento, setRelacionamento] = useState<string[]>([]);
  const [AssDoc, setAssDoc] = useState<boolean>(false);
  const [Corretor, setCorretor] = useState<number>(0);
  const [Obs, setObs] = useState<string>("");
  const [AlertDb, setAlertDb] = useState<string>("");
  const [Looad, setLooad] = useState<boolean>(false);
  const toast = useToast();

  console.log(SetData);

  if (
    SetData &&
    !Name &&
    !Cpf &&
    !Cnh &&
    !Whatsapp &&
    !CnhFile &&
    !RgFile &&
    !Email &&
    !Construtora &&
    !Empreendimento &&
    !DataNascimento &&
    !Relacionamento
  ) {
    setName(SetData.nome);
    setCpf(SetData.cpf);
    setCnh(SetData.cnh);
    setWhatsapp(SetData.telefone);
    setCnhFile(SetData.uploadCnh);
    setRgFile(SetData.uploadRg);
    setEmail(SetData.email);
    setsetConstrutora(SetData.construtora);
    setEmpreendimento(SetData.empreedimento);
    setDataNascimento(SetData.dt_nascimento);
    setRelacionamento(SetData.relacionamento);
  }

  const handleSubmit: FormEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setLooad(true);
    try {
      const data: SetDataTypePost = {
        cnh: Cnh,
        cpf: Cpf,
        nome: Name,
        telefone: Whatsapp,
        telefone2: "",
        email: Email,
        uploadRg: RgFile,
        uploadCnh: CnhFile,
        construtora: Construtora,
        empreedimento: Empreendimento,
        relacionamento: Relacionamento,
        corretor: Corretor,
        dt_nascimento: DataNascimento,
        ass_doc: AssDoc,
        link_doc: LinkDoc,
        id_fcw: IdFcweb,
        obs: Obs,
        alert: AlertDb,
      };
      const rest = await fetch(`/api/User/put/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
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
    setWhatsapp(masked);
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
              bg: "#141517"
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
                    color: "gray.50"
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
                    color: "gray.50"
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
                    color: "gray.50"
                  }}
                >
                  Telefone Celular
                </FormLabel>
                <Input
                  type="text"
                  variant="flushed"
                  onChange={WhatsAppMask}
                  value={Whatsapp}
                />
              </FormControl>

              <FormControl isRequired as={GridItem} colSpan={[6, 2]}>
                <FormLabel
                  htmlFor="email_address"
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50"
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
                    color: "gray.50"
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
                    color: "gray.50"
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
                    color: "gray.50"
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
                    color: "gray.50"
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
                    color: "gray.50"
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
