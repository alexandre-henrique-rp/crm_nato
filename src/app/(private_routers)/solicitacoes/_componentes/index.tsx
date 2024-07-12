"use client";

import { cpf } from "cpf-cnpj-validator";
import CpfMask from "@/app/componentes/cpf_mask";
import { SelectComponent } from "@/app/componentes/select";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Icon,
  Input,
  Select,
  SimpleGrid,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { mask, unMask } from "remask";

interface relacionamentoProps {
  onvalue: any;
  ishidden: any;
}

export default function SolicitacaoForm({
  onvalue,
  ishidden,
}: relacionamentoProps) {
  const [nome, setnome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfdois, setCpfdois] = useState("");
  const [cpfdoismask, setCpfdoismask] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [ConstrutoraID, setConstrutoraID] = useState(0);
  const [empreendimento, setempreendimento] = useState(0);
  const [email, setemail] = useState("");
  const [uploadCnh, setCnhFile] = useState<string>("");
  const [uploadRg, setRgFile] = useState<string>("");
  const [Corretor, setCorretor] = useState<string>("");
  const [CorretorId, setCorretorId] = useState<number>(0);
  const [relacionamento, setrelacionamento] = useState<string>("nao");
  const [Voucher, setVoucher] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [teldois, SetTeldois] = useState<string>("");
  const [Whatapp, setWhatapp] = useState<string>("");
  const [Whatappdois, setWhatappdois] = useState<string>("");
  const [DataNascimento, setDataNascimento] = useState<Date | string | any>();

  // const [base64String, setBase64String] = useState("");
  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handlesubmit = async () => {
    console.log(handlesubmit);
    if (!nome || !cpf || !email || !relacionamento) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const data = {
        nome: nome,
        telefone: tel,
        cpf: cpf,
        telefone2: teldois,
        email: email,
        foto_rg: uploadRg,
        foto_cnh: uploadCnh,
        corretor: CorretorId,
        construtora: Number(ConstrutoraID),
        empreendimento: Number(empreendimento),
        data_nascimento: DataNascimento,
        relacionamento: cpfdois ? [cpfdois] : [],
        token: session?.token,
      };

      const response = await fetch("/api/solicitacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Solicitacao enviada com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/home");
      }
    }
  };

  if (user?.empreendimento.length === 1 && !empreendimento) {
    setempreendimento(user.empreendimento[0].id);
  }

  if (user?.construtora.length === 1 && !ConstrutoraID) {
    setConstrutoraID(user.construtora[0].id);
  }

  // Função para converter arquivo em base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          const result = reader.result as string;
          const base64String = result.split(",")[1];
          resolve(base64String);
        } else {
          reject(new Error("O resultado do FileReader é null ou undefined"));
        }
      };

      reader.onerror = () => {
        reject(new Error("Erro ao ler o arquivo"));
      };

      reader.readAsDataURL(file);
    });
  };

  // Função chamada quando um arquivo RG é selecionado
  const handleRgChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setRgFile(base64);
      } catch (error) {
        console.error("Erro ao processar o arquivo RG:", error);
      }
    }
  };

  // Função chamada quando um arquivo CNH é selecionado
  const handleCnhChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setCnhFile(base64);
      } catch (error) {
        console.error("Erro ao processar o arquivo CNH:", error);
      }
    }
  };

  const WhatsAppMask = (e: any) => {
    const valor = e.target.value;
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ["(99) 9999-9999", "(99) 9 9999-9999"]);
    setTel(valorLinpo);
    setWhatapp(masked);
  };
  const WhatsAppMask2 = (e: any) => {
    const valor = e.target.value;
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ["(99) 9999-9999", "(99) 9 9999-9999"]);
    SetTeldois(valorLinpo);
    setWhatappdois(masked);
  };

  if (relacionamento === "sim" && cpfdois.length === 11) {
    ishidden("sim");
    const data: solictacao.SolicitacaoPost = {
      nome: nome,
      cpf: cpf,
      telefone: tel,
      telefone2: teldois,
      dt_nascimento: DataNascimento,
      email: email,
      foto_rg: uploadRg,
      foto_cnh: uploadCnh,
      empreendimento: empreendimento,
      construtora: ConstrutoraID,
      relacionamento: [cpfdois],
      cpfdois: cpfdois,
      rela_quest: relacionamento === "sim" ? true : false,
    };
    onvalue(data);
  }

  if (relacionamento === "nao" || cpfdois.length < 11) {
    ishidden("nao");
  }

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
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

        <Box>
          <FormLabel>Whatsapp com DDD</FormLabel>
          <Input type="text" onChange={WhatsAppMask} value={Whatapp} />
        </Box>
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={6}
        w="full"
        mt={6}
      >
        <Box>
          <FormLabel>Whatsapp com DDD 2</FormLabel>
          <Input type="text" onChange={WhatsAppMask2} value={Whatappdois} />
        </Box>
        <Box>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            onChange={(e) => setemail(e.target.value.replace(/\s/g, ""))}
            value={email}
          />
        </Box>
        <Box>
          <FormLabel>CPF</FormLabel>
          <CpfMask setvalue={cpf} onvalue={setCpf} />
        </Box>
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={6}
        w="full"
        mt={6}
      >
        {user?.empreendimento && (
          <Box>
            <FormLabel>Empreendimento</FormLabel>
            <SelectComponent
              hierarquia={user.hierarquia}
              tag="empreendimento"
              SetValue={user.empreendimento}
              onValue={(e) => setempreendimento(e)}
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
              onValue={(e) => setConstrutoraID(e)}
            />
          </Box>
        )}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full" mt={6}>
        <FormControl as={GridItem} colSpan={[6, 2]}>
          <FormLabel>CNH</FormLabel>
          <Input type="file" variant="flushed" onChange={handleRgChange} />
        </FormControl>

        <FormControl as={GridItem} colSpan={[6, 2]}>
          <FormLabel>RG</FormLabel>
          <Input type="file" variant="flushed" onChange={handleCnhChange} />
        </FormControl>
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={6}
        w="full"
        mt={6}
      >
        <Box>
          <FormLabel>
            Relacionamento
            <Tooltip
              label="Preencha este campo caso o Contrato contenha mais de um proprietário"
              aria-label="A tooltip"
            >
              <Icon ml={2} color="black" cursor="pointer" boxSize={3} />
            </Tooltip>
          </FormLabel>
          <Select
            onChange={(e) => setrelacionamento(e.target.value)}
            value={relacionamento}
          >
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </Select>
        </Box>

        {relacionamento === "sim" && (
          <Box>
            <FormLabel>CPF do relacionado</FormLabel>
            <CpfMask setvalue={cpfdois} onvalue={setCpfdois} />
          </Box>
        )}

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
      </SimpleGrid>

      <Button
        mt={5}
        mb={5}
        variant="outline"
        width="250px"
        height="50px"
        maxWidth="100%"
        textColor="black"
        onClick={handlesubmit}
        hidden={relacionamento === "sim"}
      >
        CRIAR CONTA
      </Button>
    </>
  );
}
