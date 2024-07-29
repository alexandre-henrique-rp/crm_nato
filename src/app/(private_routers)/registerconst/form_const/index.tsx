"use client";

import { Whatsapp } from "@/app/componentes/whatsapp";
import {
  Button,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { mask, unMask } from "remask";
// @ts-ignore
import consultarCNPJ from "consultar-cnpj";

export default function FormConstutora() {
  const [tel, setTel] = useState<string>("");
  const [Cnpj, setCnpj] = useState("");
  const [Email, setEmail] = useState("");
  const [RazaoSocial, setRazaoSocial] = useState("");
  const [Disabled, setDisabled] = useState(false);
  const toast = useToast();
  const route = useRouter();

  const checkCnpj = async (e: any) => {
    setDisabled(true);
    const value = e.target.value;
    const Cnpjlimpo = unMask(value);
    const masked = mask(Cnpjlimpo, ["99.999.999/9999-99"]);
    const cpnjmasklimpo = unMask(masked);

    try {
      const empresa = await consultarCNPJ(cpnjmasklimpo);
      if (empresa && empresa.razao_social) {
        setRazaoSocial(empresa.razao_social);
      } else {
        toast({
          title: "Erro",
          description: "CNPJ inválido ou não encontrado",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setDisabled(false);
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "CNPJ inválido ou não encontrado",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setDisabled(false);
    }
  };

  const handlesubmit = async () => {
    if (!Email || !Cnpj || !RazaoSocial) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      try {
        setDisabled(true);
        const data = {
          tel: tel,
          email: Email,
          cnpj: Cnpj,
          razaosocial: RazaoSocial,
        };
        const response = await fetch("/api/construtora/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const dados = await response.json();
        toast({
          title: "Sucesso",
          description: "Cadastrado com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        route.back();
      } catch (error: any) {
        toast({
          title: "Erro ao cadastrar",
          description: error.message || "Ocorreu um erro",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setDisabled(false);
      }
    }
  };

  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2 }}
        spacing={6}
        mt={6}
        alignItems={"end"}
      >
        <GridItem>
          <FormLabel>Razão Social</FormLabel>
          <Input
            type="text"
            border="1px solid #b8b8b8cc"
            value={RazaoSocial}
            onChange={(e: any) => setRazaoSocial(e.target.value)}
          />
        </GridItem>
        <GridItem>
          <FormLabel>CNPJ</FormLabel>
          <Input
            type="text"
            border="1px solid #b8b8b8cc"
            value={Cnpj}
            onChange={(e: any) => setCnpj(e.target.value)}
            onBlur={checkCnpj}
          />
        </GridItem>
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2 }}
        spacing={6}
        mt={6}
        alignItems={"end"}
      >
        <GridItem>
          <FormLabel>Whatsapp com DDD</FormLabel>
          <Whatsapp onValue={setTel} setValue={tel} />
        </GridItem>

        <GridItem>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            border="1px solid #b8b8b8cc"
            value={Email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </GridItem>
      </SimpleGrid>

      <Button
        mt={5}
        mb={5}
        variant="outline"
        width="250px"
        height="50px"
        border="1px solid #b8b8b8cc"
        maxWidth="100%"
        textColor="Black"
        onClick={handlesubmit}
        disabled={Disabled}
      >
        CRIAR CONTA
      </Button>
    </>
  );
}
