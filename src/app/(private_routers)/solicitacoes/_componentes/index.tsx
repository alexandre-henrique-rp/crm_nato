"use client";

import CpfMask from "@/app/componentes/cpf_mask";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { mask, unMask } from "remask";

interface RelacionamentoProps {
  onvalue: any;
  ishidden: any;
}

export default function SolicitacaoForm({
  onvalue,
  ishidden,
}: RelacionamentoProps) {
  const [Name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfdois, setCpfdois] = useState("");
  const [Empreendimento, setEmpreendimento] = useState("");
  const [Email, setEmail] = useState("");
  const [CnhFile, setCnhFile] = useState<string>("");
  const [RgFile, setRgFile] = useState<string>("");
  const [Relacionamento, setRelacionamento] = useState<string>("nao");
  const [tel, setTel] = useState<string>("");
  const [teldois, SetTeldois] = useState<string>("");
  const [Whatapp, setWhatapp] = useState<string>("");
  const [Whatappdois, setWhatappdois] = useState<string>("");
  const toast = useToast();
  const router = useRouter();

  const handlesubmit = async () => {
    if (!Name || !cpf || !Email || !Empreendimento || !Relacionamento) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const data = {
        Name: Name,
        whatsapp: Whatapp,
        cpf: cpf,
        email: Email,
        foto_rg: RgFile,
        foto_cnh: CnhFile,
        Empreendimento: Empreendimento,
        Relacionamento: Relacionamento,
      };
      const response = await fetch("", {
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
        router.push("/");
      }
    }
  };

  console.log(Relacionamento);

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

  if (Relacionamento === "sim" && cpfdois.length === 11) {
    ishidden("sim");
    const data = {
      Name: Name,
      whatsapp: Whatapp,
      email: Email,
      foto_rg: RgFile,
      foto_cnh: CnhFile,
      Empreendimento: Empreendimento,
      Relacionamento: Relacionamento,
      cpfdois: cpfdois,
    };
    onvalue(data);
  }

  if (Relacionamento === "nao" || cpfdois.length < 11) {
    ishidden("nao");
  }

  return (
    <>
      <Box display={"Flex"} justifyContent={"space-between"} w={"full"}>
        <Box w="33%">
          <FormLabel>Nome Completo</FormLabel>
          <Input type="text" onChange={(e: any) => setName(e.target.value)} />
        </Box>

        <Box w="33%">
          <FormLabel>Whatsapp com DDD</FormLabel>
          <Input type="text" onChange={WhatsAppMask} value={Whatapp} />
        </Box>
        <Box w="33%">
          <FormLabel> Whatsapp com DDD 2</FormLabel>
          <Input type="text" onChange={WhatsAppMask2} value={Whatappdois} />
        </Box>
      </Box>

      <Box mt={6} display={"Flex"} justifyContent={"space-between"} w={"full"}>
        <Box w="33%">
          <FormLabel>CPF</FormLabel>
          <CpfMask setvalue={cpf} onvalue={(e: any) => setCpf(e)} />
        </Box>
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
            onChange={(e: any) => setRelacionamento(e.target.value)}
            value={Relacionamento}
          >
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </Select>
        </Box>

        <Box w="33%">
          {Relacionamento === "sim" ? (
            <>
              <FormLabel>CPF do relacionado</FormLabel>
              <CpfMask setvalue={cpfdois} onvalue={(e: any) => setCpfdois(e)} />
            </>
          ) : (
            ""
          )}
        </Box>
      </Box>

      <Box mt={6} display={"Flex"} justifyContent={"space-between"} w={"full"}>
        <Box w="48%">
          <FormLabel>Email</FormLabel>
          <Input type="text" onChange={(e: any) => setEmail(e.target.value)} />
        </Box>
        <Box w="48%">
          <FormLabel>Empreendimento</FormLabel>
          <Input
            type="text"
            onChange={(e: any) => setEmpreendimento(e.target.value)}
          />
        </Box>
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
        hidden={Relacionamento === "sim" ? true : false}
      >
        CRIAR CONTA
      </Button>
    </>
  );
}
