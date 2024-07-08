"use client";

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
    const data: solictacao.SolicitacaoPost  = {
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
      <Box display={"Flex"} justifyContent={"space-between"} w={"full"}>
        <Box w="33%">
          <FormLabel>Nome Completo</FormLabel>
          <Input type="text" onChange={(e: any) => setnome(e.target.value)} />
        </Box>

        <Box w="33%">
          <FormLabel>Data de Nascimento</FormLabel>
          <Input
            type="Date"
            onChange={(e: any) => setDataNascimento(e.target.value)}
          />
        </Box>

        <Box w="33%">
          <FormLabel>Whatsapp com DDD</FormLabel>
          <Input type="text" onChange={WhatsAppMask} value={Whatapp} />
        </Box>
      </Box>

      <Box mt={6} display={"Flex"} justifyContent={"space-between"} w={"full"}>
        <Box w="48%">
          <FormLabel> Whatsapp com DDD 2</FormLabel>
          <Input type="text" onChange={WhatsAppMask2} value={Whatappdois} />
        </Box>
        <Box w="48%">
          <FormLabel>email</FormLabel>
          <Input type="text" onChange={(e: any) => setemail(e.target.value.replace(/\s/g, ''))} value={email}/>
        </Box>
        <Box w="33%">
          <FormLabel>CPF</FormLabel>
          <CpfMask setvalue={cpf} onvalue={(e: any) => setCpf(e)} />
        </Box>
      </Box>

      <Box mt={6} display={"Flex"} justifyContent={"space-between"} w={"full"}>
        {user?.empreendimento && (
          <Box w="48%">
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
          <Box w="48%">
            <FormLabel>Construtora</FormLabel>
            <SelectComponent
              hierarquia={user.hierarquia}
              tag="construtora"
              SetValue={user.construtora.map((item: any) => {
                return { id: item.id, nome: item.razaosocial };
              })}
              onValue={(e: any) => setConstrutoraID(e)}
            />
          </Box>
        )}
        
      </Box>
      <Box mt={6} display={"Flex"} justifyContent={"space-between"} w={"full"}>
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
            onChange={(e) => handleRgChange(e)}
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
            onChange={(e) => handleCnhChange(e)}
          ></Input>
        </FormControl>
      </Box>

      <Box mt={6} display={"Flex"} justifyContent={"space-between"} w={"full"}>
        <Box w="33%">
          <FormLabel>
            Relacionamento
            <Tooltip
              label="Preencha este campo caso o Contrato contenha mais de um proprietário"
              aria-label="A tooltip"
            >
              <Icon ml={1} color="black" cursor="pointer" boxSize={3} />
            </Tooltip>
          </FormLabel>

          <Select
            onChange={(e: any) => setrelacionamento(e.target.value)}
            value={relacionamento}
          >
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </Select>
        </Box>

        <Box w="33%">
          {relacionamento === "sim" ? (
            <>
              <FormLabel>CPF do relacionado</FormLabel>
              <CpfMask setvalue={cpfdois} onvalue={(e: any) => setCpfdois(e)} />
            </>
          ) : (
            ""
          )}
        </Box>
      </Box>
      <Button
        mt={5}
        mb={5}
        variant="outline"
        width="250px"
        height="50px"
        maxWidth="100%"
        textColor={"Black"}
        onClick={handlesubmit}
        hidden={relacionamento === "sim" ? true : false}
      >
        CRIAR CONTA
      </Button>
    </>
  );
}
