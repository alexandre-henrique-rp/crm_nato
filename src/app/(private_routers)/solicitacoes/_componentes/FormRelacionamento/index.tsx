"use client";

import CpfMask from "@/app/componentes/cpf_mask";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { mask, unMask } from "remask";

interface RelacionadoProps {
  SetValue: any;
}

export default function RelacionadoForm({ SetValue }: RelacionadoProps) {
  const [Name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [Empreendimento, setEmpreendimento] = useState("");
  const [Corretor, setCorretor] = useState("");
  const [Email, setEmail] = useState("");
  const [CnhFile, setCnhFile] = useState<string>("");
  const [RgFile, setRgFile] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [Whatapp, setWhatapp] = useState<string>("");
  const [Nome, setNome] = useState("");
  const toast = useToast();
  const router = useRouter();

  const handlesubmit = () => {
    if (!Name || !Email || !Empreendimento) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const dados = {
        Name: Name,
        whatsapp: Whatapp,
        email: Email,
        foto_rg: RgFile,
        foto_cnh: CnhFile,
        Corretor: Corretor,
        Empreendimento: Empreendimento,
      };

      const data = [dados, SetValue];
      data.map(async (item: any) => {
        const response = await fetch("", {
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
          router.push("/");
        }
      });
    }
  };

  const WhatsAppMask = (e: any) => {
    const valor = e.target.value;
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ["(99) 9999-9999", "(99) 9 9999-9999"]);
    setTel(valorLinpo);
    setWhatapp(masked);
  };

  return (
    <>
      <Box display={"Flex"} justifyContent={"space-between"} w={"full"}>
        <Box w="48%">
          <FormLabel>Nome Completo</FormLabel>
          <Input type="text" onChange={(e: any) => setName(e.target.value)} />
        </Box>

        <Box w="48%">
          <FormLabel>Whatsapp com DDD</FormLabel>
          <Input type="text" onChange={WhatsAppMask} value={Whatapp} />
        </Box>
      </Box>

      <Box mt={6} display={"Flex"} justifyContent={"space-between"} w={"full"}>
        <Box w="33%">
          <CpfMask setvalue={cpf} onvalue={(e: any) => setCpf(e)} />
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
      >
        CRIAR CONTA
      </Button>
    </>
  );
}
