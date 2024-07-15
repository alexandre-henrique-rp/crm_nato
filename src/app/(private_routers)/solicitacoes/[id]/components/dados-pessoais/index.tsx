"use client";

import BotaoSair from "@/app/(private_routers)/home/componentes/botoes/bt_sair";
import BotaoVoltar from "@/app/(private_routers)/home/componentes/botoes/bt_voltar";
import { DownloadDoc } from "@/app/componentes/DowloadDoc";
import { ModalFormComponent } from "@/app/componentes/modal";
import { Link } from "@chakra-ui/next-js";
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
  Heading,
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

interface DadosPessoaisProps {
  SetData: solictacao.SolicitacaoGetType;
}

export const DadosPessoaisComponent = ({ SetData }: DadosPessoaisProps) => {
  const { data: session } = useSession();
  const input = session?.user?.hierarquia;
  const [Name, setName] = useState<string>("");
  const [Cpf, setCpf] = useState<string>("");
  const [Cnh, setCnh] = useState<string>("");
  const [Whatsapp, setWhatsapp] = useState<string>("");
  const [WhatsAppMask, setWhatsAppMask] = useState<string>("");
  const [Whatsappdois, setWhatsappdois] = useState<string>("");
  const [WhatsAppMaskdois, setWhatsAppMaskdois] = useState<string>("");
  const [CnhFile, setCnhFile] = useState<string>("");
  const [RgFile, setRgFile] = useState<string>("");
  const [Email, setEmail] = useState<string>("");
  const [LinkDoc, setLinkDoc] = useState<string>("");
  const [IdFcweb, setsetIdFcweb] = useState<number | null>(null);
  const [Construtora, setConstrutora] = useState<string>("");
  const [ConstrutoraId, setConstrutoraId] = useState<number>(0);
  const [EmpreendimentoId, setEmpreendimentoId] = useState<number>(0);
  const [Empreendimento, setEmpreendimento] = useState<string>("");
  const [DataNascimento, setDataNascimento] = useState<Date | string | any>();
  const [Relacionamento, setRelacionamento] = useState<string[]>([]);
  const [AssDoc, setAssDoc] = useState<boolean>(false);
  const [Corretor, setCorretor] = useState<string>("");
  const [CorretorId, setCorretorId] = useState<number>(0);
  const [ClientId, setClientId] = useState<number>(0);
  const [Obs, setObs] = useState<string>("");
  const [AlertDb, setAlertDb] = useState<any>([]);
  const [Looad, setLooad] = useState<boolean>(false);
  const toast = useToast();

  // Matheus
  // crira campos faltantes no formulario
  //       cpf: Cpf,
  //       nome: Name,
  //       telefone: Whatsapp,
  //       telefone2: Whatsapp2,
  //       email: Email,
  //       uploadRg: RgFile,
  //       uploadCnh: CnhFile,
  //       construtora: Construtora,
  //       empreedimento: Empreendimento,
  //       relacionamento: Relacionamento,
  //       corretor: CorretorId,
  //       dt_nascimento: DataNascimento,
  //       ass_doc: AssDoc,
  //       link_doc: LinkDoc,
  //       id_fcw: IdFcweb,
  //       obs: Obs,
  //       alert: AlertDb,
  // verifique essa liste e acresente o que falta, não esqueça de fazer a verificação da hiearquia do usuario e apresentar o nessesarios campos
  // não esquer de carregar os dados nos seus inputs
  // verificar Layout componet DownloadDoc
  //allertas em 80%

  useEffect(() => {
    if (SetData && Name == "") {
      setClientId(SetData.id);
      setName(SetData.nome);
      setCpf(SetData.cpf);
      setCnh(SetData.cnh);
      setWhatsapp(SetData.telefone);
      setWhatsAppMask(
        SetData.telefone &&
          mask(SetData.telefone, ["(99) 9999-9999", "(99) 9 9999-9999"])
      );
      setWhatsappdois(SetData.telefone2);
      setWhatsAppMaskdois(
        SetData.telefone2 &&
          mask(SetData.telefone2, ["(99) 9999-9999", "(99) 9 9999-9999"])
      );
      setCnhFile(SetData.uploadCnh);
      setRgFile(SetData.uploadRg);
      setEmail(SetData.email);
      setConstrutoraId(SetData.construtora && SetData.construtora.id);
      setConstrutora(SetData.construtora && SetData.construtora.razaosocial);
      setEmpreendimento(SetData.empreendimento && SetData.empreendimento.nome);
      setEmpreendimentoId(SetData.empreendimento && SetData.empreendimento.id);
      const date = new Date(SetData.dt_nascimento);
      const formattedDate =
        SetData.dt_nascimento && date.toISOString().split("T")[0];
      setDataNascimento(formattedDate);
      setRelacionamento(SetData.relacionamento);
      // setAssDoc();
      setCorretor(SetData.corretor && SetData.corretor.nome);
      setCorretorId(SetData.corretor && SetData.corretor.id);
      setObs(SetData.obs);
      setAlertDb(SetData.alert == null ? [] : SetData.alert);
      setsetIdFcweb(SetData.id_fcw);
    }
  }, [Name, SetData]);

  const handleSubmit: FormEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setLooad(true);
    try {
      const data: solictacao.SolicitacaoPutType = {
        cnh: Cnh,
        cpf: Cpf,
        nome: Name,
        telefone: Whatsapp,
        telefone2: Whatsappdois,
        email: Email,
        uploadRg: RgFile,
        uploadCnh: CnhFile,
        construtora: ConstrutoraId,
        empreedimento: EmpreendimentoId,
        relacionamento: Relacionamento,
        corretor: CorretorId,
        dt_nascimento: DataNascimento,
        ass_doc: AssDoc,
        link_doc: LinkDoc,
        id_fcw: IdFcweb,
        obs: Obs,
      };
      const rest = await fetch(`/api/User/put/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await rest.json();

      setLooad(false);
    } catch (error) {
      setLooad(false);
    }
  };
  const MascaraZap = (e: any) => {
    const valor = e.target.value;
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ["(99) 9999-9999", "(99) 9 9999-9999"]);
    setWhatsapp(valorLinpo);
    setWhatsAppMask(masked);
  };

  const MascaraZap2 = (e: any) => {
    const valor = e.target.value;
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ["(99) 9999-9999", "(99) 9 9999-9999"]);
    setWhatsappdois(valorLinpo);
    setWhatsAppMaskdois(masked);
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
        overflowX="auto"
        flexDir={"column"}
      >
        {/* Dados pessoais */}
        <Box w="80%" h="100%" p={10} bg="white" borderRadius={8} boxShadow="lg">
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box alignItems={"center"} gap={2}>
              <Text fontSize={"2xl"}>Dados Pessoais</Text>
              {input !== "USER" && (
                <Text fontSize={"md"}>Corretor: {Corretor} </Text>
              )}
            </Box>
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
                  onChange={MascaraZap}
                  value={WhatsAppMask}
                />
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 2]}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Telefone 2
                </FormLabel>
                <Input
                  type="text"
                  variant="flushed"
                  onChange={MascaraZap2}
                  value={WhatsAppMaskdois}
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
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Construtora
                </FormLabel>
                <Input
                  value={Construtora}
                  onChange={(e) => setConstrutora(e.target.value)}
                  type="text"
                  variant="flushed"
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
                  Empreendimento
                </FormLabel>
                <Input
                  value={Empreendimento}
                  onChange={(e) => setEmpreendimento(e.target.value)}
                  type="text"
                  variant="flushed"
                />
              </FormControl>
              {input !== "USER" && (
                <FormControl isRequired as={GridItem} colSpan={[6, 2]}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    ID FCWEB
                  </FormLabel>
                  <Input
                    value={IdFcweb || ""}
                    onChange={(e) => setsetIdFcweb(Number(e.target.value))}
                    type="text"
                    variant="flushed"
                  />
                </FormControl>
              )}

              <FormControl isRequired as={GridItem} colSpan={[6, 2]}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Link Contrato
                </FormLabel>
                <Input
                  value={LinkDoc}
                  onChange={(e) => setLinkDoc(e.target.value)}
                  type="text"
                  variant="flushed"
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
                  Link Planilha
                </FormLabel>
                <Input
                  value={LinkDoc}
                  onChange={(e) => setLinkDoc(e.target.value)}
                  type="text"
                  variant="flushed"
                />
              </FormControl>

              <FormControl as={GridItem} colSpan={[6, 2]}>
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

              <FormControl as={GridItem} colSpan={[6, 2]}>
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

              {input !== "USER" && (
                <FormControl isRequired as={GridItem} colSpan={[6, 2]}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Downloads da CNH
                  </FormLabel>
                  <DownloadDoc base64={CnhFile} name="Cnh" />
                </FormControl>
              )}
              {input !== "USER" && (
                <FormControl isRequired as={GridItem} colSpan={[6, 2]}>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    Download do Rg
                  </FormLabel>
                  <DownloadDoc base64={RgFile} name="Rg" />
                </FormControl>
              )}

              <FormControl isRequired as={GridItem} colSpan={[6, 6]}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Observações
                </FormLabel>
                <Input
                  value={Obs}
                  onChange={(e) => setObs(e.target.value)}
                  type="text"
                  variant="flushed"
                />
              </FormControl>

              <Box justifyContent={"space-between"} alignItems={"center"}>
                <Button
                  onClick={handleSubmit}
                  colorScheme={"green"}
                  variant="outline"
                  height="50px"
                  isLoading={Looad}
                >
                  Salvar e Enviar
                </Button>

                {input !== "USER" && (
                  <ModalFormComponent
                    rota={"CORRETROR"}
                    clienteId={ClientId}
                    empreedimento={EmpreendimentoId}
                  />
                )}
              </Box>
            </SimpleGrid>
          </Stack>
        </Box>
        {/* Fim dados Pessoais */}

        {/* Inicio Dados de contato */}
        <Box
          mt={10}
          w="80%"
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
                {AlertDb.length > 0 &&
                  AlertDb.map((item: solictacao.AlertProps) => {
                    const status =
                      item.tipo === "success" ? "success" : "error";
                    return (
                      <>
                        <Alert status={status}>
                          <AlertIcon />
                          <Heading size="sm">{item.titulo}</Heading>
                          <Text>{item.texto}</Text>
                          <Text>{item.tag}</Text>
                        </Alert>
                      </>
                    );
                  })}
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
