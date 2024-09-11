"use client";

import BotaoSair from "@/app/(private_routers)/home/componentes/botoes/bt_sair";
import BotaoVoltar from "@/app/componentes/bt_voltar";
import { DownloadDoc } from "@/app/componentes/DowloadDoc";
import { AlertComponent } from "@/app/componentes/alerts";
import { ModalFormComponent } from "@/app/componentes/modal";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Divider,
  Flex,
  chakra,
  FormLabel,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useToast,
  GridItem,
  Alert,
  AlertIcon,
  Icon,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FormEventHandler, use, useEffect, useState } from "react";
import { mask, unMask } from "remask";
import { BotaoRetorno } from "@/app/componentes/btm_retorno";

import { FaRegCopy } from "react-icons/fa";
import VerificadorFileComponent from "@/app/componentes/file";
import DistratoAlertPrint from "@/app/componentes/Distrato_alert_print";
import BtRemoverDistrato from "@/app/componentes/bt_Remover_Distrato";
import { MdSimCardAlert } from "react-icons/md";


interface DadosPessoaisProps {
  SetData: solictacao.SolicitacaoGetType;
}

export const DadosPessoaisComponent = ({ SetData }: DadosPessoaisProps) => {
  const { data: session } = useSession();
  const user = session?.user;
  const input = session?.user?.hierarquia;
  const [Name, setName] = useState<string>("");
  const [Cpf, setCpf] = useState<string>("");
  const [Whatsapp, setWhatsapp] = useState<string>("");
  const [WhatsAppMask, setWhatsAppMask] = useState<string>("");
  const [Whatsappdois, setWhatsappdois] = useState<string>("");
  const [WhatsAppMaskdois, setWhatsAppMaskdois] = useState<string>("");
  const [CnhFile64, setCnhFile64] = useState<string>("");
  const [RgFile64, setRgFile64] = useState<string>("");
  const [Email, setEmail] = useState<string>("");
  const [LinkDoc, setLinkDoc] = useState<string>("");
  const [LinkDocMask, setLinkDocMask] = useState<string>("");
  const [IdFcweb, setsetIdFcweb] = useState<number | null>(null);
  const [EmpreendimentoId, setEmpreendimentoId] = useState<number>(0);
  const [DataNascimento, setDataNascimento] = useState<Date | string | any>();
  const [Relacionamento, setRelacionamento] = useState<string>("");
  const [CreatedDate, setCreatedDate] = useState<string>("");
  const [Voucher, setVoucher] = useState<string>("");
  const [DataAprovacao, setDataAprovacao] = useState<string>("");
  const [RelacionamentoID, setRelacionamentoID] = useState<number>(0);
  const [AssDoc, setAssDoc] = useState<string>("");
  const [AssDocMask, setAssDocMask] = useState<string>("");
  const [Corretor, setCorretor] = useState<string>("");
  const [CorretorId, setCorretorId] = useState<number>(0);
  const [ClientId, setClientId] = useState<number>(0);
  const [Obs, setObs] = useState<string>("");
  const [AlertDb, setAlertDb] = useState<any>([]);
  const [Looad, setLooad] = useState<boolean>(false);
  const toast = useToast();

  const RequesteAlert = async () => {
    const req = await fetch(`/api/alerts/solicitacao/${SetData.id}`);
    if (req.ok) {
      const res = await req.json();
      setAlertDb(res);
    }
  };

  useEffect(() => {
    if (SetData && Name == "") {
      setClientId(SetData.id);
      setName(SetData.nome);
      setCpf(SetData.cpf && mask(SetData.cpf, ["999.999.999-99"]));
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
      setEmail(SetData.email);
      setEmpreendimentoId(SetData.empreedimento && SetData.empreedimento.id);
      const date = new Date(SetData.dt_nascimento);
      const formattedDate =
        SetData.dt_nascimento && date.toISOString().split("T")[0];
      setDataNascimento(formattedDate);
      setRelacionamento(
        SetData.relacionamento.map(
          (item: any) => item.cpf && mask(item.cpf, ["999.999.999-99"])
        )[0]
      );
      setRelacionamentoID(
        SetData.relacionamento.map((item: any) => item.id)[0]
      );
      setCorretor(SetData.corretor && SetData.corretor.nome);
      setCorretorId(SetData.corretor && SetData.corretor.id);
      setObs(SetData.obs);
      const Ficha: any = SetData.fcweb;
      if (Ficha) {
        setsetIdFcweb(Ficha.id);
      }
      setCreatedDate(new Date(SetData.createdAt).toLocaleString("pt-BR"));
      setDataAprovacao(
        SetData.fcweb?.dt_aprovacao
          ? new Date(SetData.fcweb?.dt_aprovacao).toLocaleDateString("pt-BR")
          : ""
      );
      setAssDoc(SetData.ass_doc);
      const Docmask =
        SetData.ass_doc && SetData.ass_doc.length > 45
          ? SetData.ass_doc.slice(0, 45) + "........"
          : SetData.ass_doc;
      setLinkDocMask(Docmask);
      setLinkDoc(SetData.link_doc);
      const AssDocmask =
        SetData.link_doc && SetData.link_doc.length > 45
          ? SetData.link_doc.slice(0, 45) + "........"
          : SetData.link_doc;
      setAssDocMask(AssDocmask);
      setVoucher(SetData.fcweb?.vouchersoluti);
      setCnhFile64(SetData.uploadCnh);
      setRgFile64(SetData.uploadRg);
      RequesteAlert();
    }
  }, [Name, SetData]);

  console.log("SetData", SetData);

  const handleCreateFC = async () => {
    try {
      const date = new Date();
      const dia = date.getDate();
      const mes = date.getMonth() + 1;
      const ano = date.getFullYear();
      const hora = date.getHours();
      const minuto = date.getMinutes();
      const segundo = date.getSeconds(); 
      const ref = `${dia}-${mes}-${ano}.${hora}:${minuto}:${segundo}`
      const NameUserLength = user?.name.split(" ").length;
      const NameUser: any = NameUserLength === 1 ? user?.name : user?.name.split(" ")[0];

      const data = {
        cpf: Cpf.replace(/\W+/g, ""),
        nome: Name,
        telefone: Whatsapp.replace(/\W+/g, ""),
        telefone2: Whatsappdois.replace(/\W+/g, ""),
        email: Email.replace(/\s+/g, "").toLowerCase(),
        dtnascimento: DataNascimento,
        cidade: SetData.empreedimento.cidade && SetData.empreedimento.cidade,
        uf: SetData.empreedimento.uf && SetData.empreedimento.uf,
        andamento: "NOVA FC",
        unidade: "1",
        s_alerta: "ATIVADO",
        referencia: ref,
        obscont: `Criado Por: ${user?.name} - Empreendimento: ${
          SetData.empreedimento.nome
        } - vendedor: ${
          SetData.corretor && SetData.corretor.nome
        } - ( ${ref} )  `,
        tipocd: "A3PF Bird5000",
        valorcd: "100,00",
        criou_fc: NameUser.toUpperCase(),
        historico: `${ref}-${user?.name}:Criou a FC através do sisnato.\n`,
        contador: SetData.empreedimento.tag,
      };

      const register = await fetch("/api/fcweb/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if(register.ok) {
        toast({
          title: "Sucesso!",
          description: "FC criada com sucesso!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        window.location.reload();
      } else {
        toast({
          title: "Não foi possível criar o FC",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Não foi possível criar o FC",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSubmit: FormEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setLooad(true);

    try {
      const data = !SetData.ativo
        ? {
            ativo: true,
            cpf: Cpf.replace(/\W+/g, ""),
            nome: Name,
            telefone: Whatsapp.replace(/\W+/g, ""),
            telefone2: Whatsappdois.replace(/\W+/g, ""),
            email: Email.replace(/\s+/g, "").toLowerCase(),
            uploadRg: RgFile64 ? RgFile64 : SetData.uploadRg,
            uploadCnh: CnhFile64 ? CnhFile64 : SetData.uploadCnh,
            dt_nascimento: DataNascimento,
            ass_doc: AssDoc,
            link_doc: LinkDoc,
            id_fcw: IdFcweb,
            obs: Obs,
          }
        : {
            cpf: Cpf.replace(/\W+/g, ""),
            nome: Name,
            telefone: Whatsapp.replace(/\W+/g, ""),
            telefone2: Whatsappdois.replace(/\W+/g, ""),
            email: Email.replace(/\s+/g, "").toLowerCase(),
            uploadRg: RgFile64 ? RgFile64 : SetData.uploadRg,
            uploadCnh: CnhFile64 ? CnhFile64 : SetData.uploadCnh,
            dt_nascimento: DataNascimento,
            ass_doc: AssDoc,
            link_doc: LinkDoc,
            id_fcw: IdFcweb,
            obs: Obs,
          };

      const rest = await fetch(`/api/solicitacao/update/${ClientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!rest.ok) {
        toast({
          title: "Erro ao Atualizar o Registro",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setLooad(false);
        return;
      }

      toast({
        title: "Cliente Atualizado Com Sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      window.location.reload();
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

  const handleCopy = () => {
    navigator.clipboard.writeText(AssDoc);
    toast({
      title: "Copiado",
      description: "Link copiado para a area de transferência",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const HandleDownloads = async (url: string) => {
    window.open(url, "_blank");
  };

  const handleFileUploadedRg = (result: any) => {
    setRgFile64(result.url);
  };
  const handleFileUploadedCnh = (result: any) => {
    setCnhFile64(result.url);
  };

  const handleCopy2 = () => {
    navigator.clipboard.writeText(LinkDoc);
    toast({
      title: "Copiado",
      description: "Link copiado para a area de transferência",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const AtualizarAlert = (e: number) => {
    if (e === 1) RequesteAlert();
  };

  return (
    <Flex
      w={"100%"}
      alignItems="center"
      flexDir="column"
      minH="100vh"
      p={4} // Padding ao redor do Flex
    >
      {/* Dados pessoais */}
      <Box
        w={{ base: "95%", md: "65%" }}
        p={6} // Padding interno
        bg="white"
        borderRadius={8}
        boxShadow="lg"
        mb={12} // Margin-bottom para espaçamento inferior
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <BotaoRetorno rota="/" />
          <Box>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Criado: {CreatedDate}
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Aprovação: {DataAprovacao}
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }}>Id: {SetData.id}</Text>
          </Box>
          <Box alignItems="center" textAlign={{ base: "center", md: "left" }}>
            <Text fontSize={{ base: "lg", md: "2xl" }}>Dados Pessoais</Text>
            {input !== "USER" && (
              <Text fontSize={{ base: "sm", md: "md" }}>
                Corretor: {Corretor}
              </Text>
            )}
          </Box>
        </Box>
        <Divider borderColor="#00713D" my={4} />
        <Stack spacing={6}>
          <chakra.form>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              <GridItem>
                <FormLabel fontSize="sm" fontWeight="md">
                  CPF
                </FormLabel>
                {input === "USER" && <Text pt={3}>{Cpf}</Text>}
                {input !== "USER" && (
                  <Input
                    type="text"
                    value={Cpf}
                    variant="flushed"
                    onChange={(e) => setCpf(e.target.value)}
                  />
                )}
              </GridItem>
              <GridItem>
                <FormLabel fontSize="sm" fontWeight="md">
                  Nome Completo
                </FormLabel>
                <Input
                  type="text"
                  value={Name}
                  variant="flushed"
                  onChange={(e) => setName(e.target.value)}
                />
              </GridItem>

              <GridItem>
                <FormLabel fontSize="sm" fontWeight="md">
                  Data de Nascimento
                </FormLabel>
                <Input
                  variant="flushed"
                  value={DataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  type="date"
                />
              </GridItem>
            </SimpleGrid>
          </chakra.form>
          {/* <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                CPF
              </FormLabel>
              {input === "USER" && <Text pt={3}>{Cpf}</Text>}
              {input !== "USER" && (
                <Input
                  type="text"
                  value={Cpf}
                  variant="flushed"
                  onChange={(e) => setCpf(e.target.value)}
                />
              )}
            </GridItem>
            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Nome Completo
              </FormLabel>
              <Input
                type="text"
                value={Name}
                variant="flushed"
                onChange={(e) => setName(e.target.value)}
              />
            </GridItem>

            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Data de Nascimento
              </FormLabel>
              <Input
                variant="flushed"
                value={DataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                type="date"
              />
            </GridItem>
          </SimpleGrid> */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Relacionamento
              </FormLabel>
              <chakra.p fontSize="xs" color={"red.500"}>
                * cpf do relacionamento
              </chakra.p>

              {SetData.relacionamento.length === 0 && (
                <Text>Não tem relacionamento</Text>
              )}
              {SetData.relacionamento.length > 0 && (
                <Link
                  href={`/solicitacoes/${RelacionamentoID}`}
                  color="teal.600"
                  fontWeight="bold"
                >
                  {Relacionamento}
                </Link>
              )}
            </GridItem>

            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Telefone Celular
              </FormLabel>
              <Input
                type="text"
                variant="flushed"
                onChange={MascaraZap}
                value={WhatsAppMask}
              />
            </GridItem>

            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Telefone 2
              </FormLabel>
              <Input
                type="text"
                variant="flushed"
                onChange={MascaraZap2}
                value={WhatsAppMaskdois}
              />
            </GridItem>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Email
              </FormLabel>
              <Input
                variant="flushed"
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </GridItem>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Construtora
              </FormLabel>
              <Text pt={3}>{SetData.construtora.fantasia}</Text>
            </GridItem>

            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Empreendimento
              </FormLabel>
              <Text pt={3}>{SetData.empreedimento.nome}</Text>
            </GridItem>

            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Financeira
              </FormLabel>
              <Text pt={3}>{SetData.financeiro.fantasia}</Text>
            </GridItem>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={10}>
            {input !== "USER" && (
              <GridItem>
                <FormLabel fontSize="sm" fontWeight="md">
                  ID FCWEB
                </FormLabel>
                <Link
                  pt={3}
                  ps={3}
                  href={`https://redebrasilrp.com.br/fcw2/abrir_ficha.php?fc=${IdFcweb}`}
                  target="_blank"
                  fontWeight={"bold"}
                  color="teal.600"
                >
                  {IdFcweb}
                </Link>
              </GridItem>
            )}
            {input !== "USER" && (
              <GridItem>
                <FormLabel fontSize="sm" fontWeight="md">
                  VOUCHER
                </FormLabel>
                <Text ps={3} fontSize={{ base: "sm", md: "md", lg: "md" }}>
                  {Voucher}
                </Text>
              </GridItem>
            )}
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={10}>
            {input !== "USER" && (
              <GridItem>
                <FormLabel fontSize="sm" fontWeight="md">
                  LINK CONTRATO
                </FormLabel>
                <Flex gap={3}>
                  <Input
                    value={AssDocMask}
                    onChange={(e) => setLinkDoc(e.target.value)}
                    type="text"
                    variant="flushed"
                  />
                  <Button
                    size="sm"
                    onClick={handleCopy2}
                    leftIcon={<FaRegCopy />}
                  />
                </Flex>
              </GridItem>
            )}
            {/* {input !== "USER" && (
              <GridItem>
                <FormLabel fontSize="sm" fontWeight="md">
                  LINK CONTRATO
                </FormLabel>
                <Flex gap={3}>
                  <Input
                    value={LinkDocMask}
                    onChange={(e) => setAssDoc(e.target.value)}
                    type="text"
                    variant="flushed"
                  />
                  <Button
                    size="sm"
                    onClick={handleCopy}
                    leftIcon={<FaRegCopy />}
                  />
                </Flex>
              </GridItem>
            )} */}
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={10}>
            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                CNH
              </FormLabel>
              <VerificadorFileComponent
                onFileUploaded={handleFileUploadedCnh}
              />
            </GridItem>

            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                RG
              </FormLabel>
              <VerificadorFileComponent onFileUploaded={handleFileUploadedRg} />
            </GridItem>

            {input !== "USER" && (
              <GridItem>
                <FormLabel fontSize="sm" fontWeight="md">
                  Downloads da CNH
                </FormLabel>
                {!CnhFile64.startsWith("data:") && CnhFile64 && (
                  <Button
                    bg={"#00713D"}
                    textColor={"white"}
                    variant="solid"
                    _hover={{ bg: "#00631B" }}
                    size="lg"
                    onClick={() => HandleDownloads(CnhFile64)}
                  >
                    Download
                  </Button>
                )}
              </GridItem>
            )}
            {input !== "USER" && (
              <GridItem>
                <FormLabel fontSize="sm" fontWeight="md">
                  Download do RG
                </FormLabel>
                {!RgFile64.startsWith("data:") && RgFile64 && (
                  <Button
                    bg={"#00713D"}
                    textColor={"white"}
                    variant="solid"
                    _hover={{ bg: "#00631B" }}
                    size="lg"
                    onClick={() => HandleDownloads(RgFile64)}
                  >
                    Download
                  </Button>
                )}
              </GridItem>
            )}
            {input !== "USER" && CnhFile64.startsWith("data:") && (
              <GridItem>
                <FormLabel fontSize="sm" fontWeight="md">
                  Downloads da CNH 64
                </FormLabel>
                <DownloadDoc base64={CnhFile64} name="Cnh" clienteName={Name} />
              </GridItem>
            )}
            {input !== "USER" && RgFile64.startsWith("data:") && (
              <GridItem>
                <FormLabel fontSize="sm" fontWeight="md">
                  Download do RG 64
                </FormLabel>
                <DownloadDoc base64={RgFile64} name="Rg" clienteName={Name} />
              </GridItem>
            )}
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 1 }} spacing={6}>
            <GridItem>
              <FormLabel fontSize="sm" fontWeight="md">
                Observações
              </FormLabel>
              <Textarea value={Obs} onChange={(e) => setObs(e.target.value)} />
            </GridItem>
            {SetData.distrato && (
              <Box>
                <DistratoAlertPrint
                  userId={SetData.distrato_id}
                  userDateTime={SetData.distrato_dt}
                />
              </Box>
            )}
          </SimpleGrid>

          {SetData.logDelete && input === "ADM" && (
            <SimpleGrid columns={{ base: 1 }}>
              <Flex
                w={"100%"}
                px={5}
                py={2}
                bg={"blue.50"}
                gap={3}
                alignItems={"center"}
                borderTop={"4px solid #001FAB"}
              >
                <Icon
                  as={MdSimCardAlert}
                  color={"#001FAB"}
                  fontSize={"1.8rem"}
                />
                Ficha excluída ={">"} {SetData.logDelete}
              </Flex>
            </SimpleGrid>
          )}

          <GridItem>
            <Flex gap={"10px"} justifyContent={"flex-end"} mt={"20px"}>
              {input === "ADM" && SetData.distrato && (
                <>
                  <BtRemoverDistrato id={SetData.id} />
                </>
              )}
              {input === "ADM" && !IdFcweb && (
                <>
                  <Button
                    onClick={handleCreateFC}
                    colorScheme="teal"
                    textAlign="center"
                    isLoading={Looad}
                  >
                    Criar Fcweb
                  </Button>
                </>
              )}
              <Button
                onClick={handleSubmit}
                colorScheme="green"
                variant="outline"
                textAlign="center"
                isLoading={Looad}
              >
                Salvar e Enviar
              </Button>
              {input === "ADM" && (
                <ModalFormComponent
                  atualizar={AtualizarAlert}
                  rota={"CORRETROR"}
                  clienteId={ClientId}
                  empreedimento={EmpreendimentoId}
                  PostName={Name}
                  CorretorName={Corretor}
                  CorretorId={CorretorId}
                />
              )}
              {input === "CCA" && (
                <ModalFormComponent
                  atualizar={AtualizarAlert}
                  rota={"CORRETROR"}
                  clienteId={ClientId}
                  empreedimento={EmpreendimentoId}
                  PostName={Name}
                  CorretorName={Corretor}
                  CorretorId={CorretorId}
                />
              )}
            </Flex>
          </GridItem>
        </Stack>
      </Box>
      {/* Fim dados Pessoais */}

      {/* Inicio Dados de contato */}
      <Box
        w={{ base: "95%", md: "65%" }} // Ajuste a largura conforme necessário
        p={6} // Padding interno
        bg="white"
        borderRadius={8}
        boxShadow="lg"
      >
        <Text fontSize={{ base: "xl", md: "2xl" }}>Alertas</Text>
        <Divider borderColor="#00713D" my={4} />
        <Stack spacing={6}>
          {AlertDb.length > 0 &&
            AlertDb.map((item: solictacao.AlertProps) => {
              const fakeStatus = true;
              return (
                <AlertComponent
                  atualizar={AtualizarAlert}
                  key={item.id}
                  msg={item.texto}
                  titulo={item.titulo}
                  status={item.tag}
                  ID={item.id}
                  DeleteAlertStatus={
                    input === "USER" ? fakeStatus : item.status
                  }
                />
              );
            })}
        </Stack>
      </Box>
      {/* Fim dados de contato */}
    </Flex>
  );
};
