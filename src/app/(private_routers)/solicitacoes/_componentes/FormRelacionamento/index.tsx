"use client";

import CheckEmail from "@/app/componentes/checkEmail";
import CpfMask from "@/app/componentes/cpf_mask";
import VerificadorFileComponent from "@/app/componentes/file";
import { SelectComponent } from "@/app/componentes/select";
import { SelectCorretor } from "@/app/componentes/select_user";
import { Whatsapp } from "@/app/componentes/whatsapp";
import Loading from "@/app/loading";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  SimpleGrid,
  Stack,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SetStateAction, use, useEffect, useState } from "react";
import { IconBase } from "react-icons";

import { mask, unMask } from "remask";

interface RelacionadoProps {
  SetValue: solictacao.SolicitacaoPost;
}

export default function RelacionadoForm({ SetValue }: RelacionadoProps) {
  const [nome, setnome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfdois, setCpfdois] = useState("");
  const [cpfdoismask, setCpfdoismask] = useState("");
  const [ConstrutoraID, setConstrutoraID] = useState(0);
  const [empreendimento, setempreendimento] = useState(0);
  const [email, setemail] = useState("");
  const [uploadCnh, setCnhFile] = useState<string>("");
  const [uploadRg, setRgFile] = useState<string>("");
  const [Corretor, setCorretor] = useState<string>("");
  const [CorretorId, setCorretorId] = useState<number>(0);
  const [relacionamento, setrelacionamento] = useState<string>("nao");
  const [tel, setTel] = useState<string>("");
  const [teldois, SetTeldois] = useState<string>("");
  const [Whatapp, setWhatapp] = useState<string>("");
  const [Whatappdois, setWhatappdois] = useState<string>("");
  const [Voucher, setVoucher] = useState<string>("");
  const [DataNascimento, setDataNascimento] = useState<Date | string | any>();
  const [Load, setLoad] = useState<boolean>(false);
  const [checkEmail, setcheckEmail] = useState<string>("");
  const [codigo, setcodigo] = useState<boolean>(false);
  // const [base64String, setBase64String] = useState("");
  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    (() => {
      if (SetValue.cpfdois) {
        const cpf = SetValue.cpfdois;
        const masked = mask(cpf, ["999.999.999-99"]);
        setCpfdoismask(masked);
        setCpfdois(cpf);
      }
    })();
  }, [SetValue.cpfdois]);

  const handlesubmit = () => {
    if (!codigo) {
      toast({
        title: "Erro",
        description: "Falha na verificação de Email",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (!nome || !email) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const dadossuperior: solictacao.SolicitacaoPost = {
        nome: SetValue.nome,
        telefone: SetValue.telefone,
        cpf: SetValue.cpf,
        telefone2: SetValue.telefone2,
        email: SetValue.email,
        uploadRg: SetValue.uploadRg,
        uploadCnh: SetValue.uploadCnh,
        corretor: SetValue.corretor,
        construtora: SetValue.construtora,
        empreedimento: SetValue.empreedimento,
        dt_nascimento: SetValue.dt_nascimento,
        relacionamento: SetValue.relacionamento,
        rela_quest: SetValue.rela_quest,
        voucher: SetValue.voucher,
      };
      const dados: solictacao.SolicitacaoPost = {
        nome: nome,
        telefone: tel,
        cpf: SetValue.cpfdois ? SetValue.cpfdois : "",
        telefone2: teldois,
        email: email,
        uploadRg: uploadRg,
        uploadCnh: uploadCnh,
        corretor: user?.hierarquia === "ADM" ? CorretorId : Number(user?.id),
        construtora: Number(ConstrutoraID),
        empreedimento: Number(empreendimento),
        dt_nascimento: DataNascimento,
        relacionamento: SetValue.cpf ? [SetValue.cpf] : [],
        rela_quest: SetValue.rela_quest ? true : false,
        voucher: Voucher,
      };

      const data = [dados, dadossuperior];
      data.map(async (item: any, index: number) => {
        const response = await fetch("/api/solicitacao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        if (response.ok) {
          toast({
            title: "Sucesso",
            description: "Solicitações enviadas com sucesso",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          if (data.length === index + 1) {
            router.push("/home");
          }
        }
      });
    }
  };

  if (user?.empreendimento.length === 1 && !empreendimento) {
    setempreendimento(user.empreendimento[0].id);
  }

  if (user?.construtora.length === 1 && !ConstrutoraID) {
    setConstrutoraID(user.construtora[0].id);
  }

  const VerificadorEmail = (e: any) => {
    const value = e.target.value;
    if ("NT-" + value === checkEmail) {
      setcheckEmail("");
      setcodigo(true);
    } else {
      setcheckEmail(value);
      setcodigo(false);
    }
  };

  if (Load) {
    return <Loading />;
  }

  return (
    <Stack spacing={4} p={4} maxWidth="900px" mx="auto">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={6}>
        <Box>
          <FormLabel>Nome Completo</FormLabel>
          <Input type="text" onChange={(e) => setnome(e.target.value)} />
        </Box>

        <Box>
          <FormLabel>Data de Nascimento</FormLabel>
          <Input
            type="date"
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </Box>
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        spacing={6}
        mt={6}
        alignItems={"end"}
      >
        <GridItem>
          <FormLabel>Whatsapp com DDD</FormLabel>
          <Whatsapp setValue={tel} onValue={setTel} />
        </GridItem>
        <GridItem>
          <FormLabel>Whatsapp com DDD 2</FormLabel>
          <Whatsapp setValue={teldois} onValue={SetTeldois} />
        </GridItem>

        <GridItem>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            onChange={(e) => setemail(e.target.value.replace(/\s/g, ""))}
            value={email}
          />
        </GridItem>

        <GridItem>
          <CheckEmail onvalue={setcheckEmail} email={email} nome={nome} />
        </GridItem>

        <GridItem>
          <FormLabel>Codigo</FormLabel>
          <InputGroup>
            <InputLeftAddon>NT-</InputLeftAddon>
            <Input type="text" onChange={VerificadorEmail} />
          </InputGroup>
        </GridItem>

        {user?.hierarquia === "ADM" && (
          <Box>
            <FormLabel>Corretor</FormLabel>
            <SelectCorretor idcorretor={setCorretorId} />
          </Box>
        )}

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={6}>
          {user?.hierarquia === "ADM" && (
            <Box>
              <FormLabel>
                Voucher
                <Tooltip
                  label="Voucher para Atendimento em qualquer unidade Soluti"
                  aria-label="A tooltip"
                >
                  <Icon ml={1} color="black" cursor="pointer" boxSize={3} />
                </Tooltip>
              </FormLabel>
              <Input type="text" onChange={(e) => setVoucher(e.target.value)} />
            </Box>
          )}
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={6}>
        <Box>
          <FormLabel>CPF</FormLabel>
          <CpfMask desativado setvalue={cpfdois} onvalue={setCpf} />
        </Box>
        {user?.empreendimento && (
          <Box>
            <FormLabel>Empreendimento</FormLabel>
            <SelectComponent
              hierarquia={user.hierarquia}
              tag="empreendimento"
              SetValue={user.empreendimento}
              onValue={(e: any) => setempreendimento(e)}
            />
          </Box>
        )}
        {user?.construtora && (
          <Box>
            <FormLabel>Construtora</FormLabel>
            <SelectComponent
              hierarquia={user.hierarquia}
              tag="construtora"
              SetValue={user.construtora.map((item) => ({
                id: item.id,
                nome: item.razaosocial,
              }))}
              onValue={(e: any) => setConstrutoraID(e)}
            />
          </Box>
        )}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={6} mt={6}>
        <FormControl as={GridItem}>
          <FormLabel>CNH</FormLabel>
          <VerificadorFileComponent onFileConverted={setCnhFile} />
        </FormControl>

        <FormControl as={GridItem}>
          <FormLabel>RG</FormLabel>
          <VerificadorFileComponent onFileConverted={setRgFile} />
        </FormControl>
      </SimpleGrid>

      <Button
        mt={6}
        variant="outline"
        width="100%"
        maxWidth="250px"
        height="50px"
        onClick={handlesubmit}
        hidden={relacionamento === "sim"}
      >
        CRIAR CONTA
      </Button>
    </Stack>
  );
}
