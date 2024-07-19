"use client";

import CheckEmail from "@/app/componentes/checkEmail";
import CpfMask from "@/app/componentes/cpf_mask";
import { SenhaComponent } from "@/app/componentes/Senha";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mask, unMask } from "remask";

export default function FormRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Telefone, setTelefone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [Empreendimento, setEmpreendimento] = useState<number | undefined>();
  const [EmpreendimentoData, setEmpreendimentoData] = useState<any>([]);
  const [Construtora, setConstrutora] = useState<number | undefined>();
  const [ConstrutoraData, setConstrutoraData] = useState<any>([]);
  const [Cargo, setCargo] = useState("");
  const [Hierarquia, setHierarquia] = useState("");
  const [Email, setEmail] = useState("");
  const [Nome, setNome] = useState("");
  const toast = useToast();
  const route = useRouter();

  useEffect(() => {
    const getConstrutora = async () => {
      const response = await fetch("/api/construtora/getall");
      const data = await response.json();
      setConstrutoraData(data);
    };
    getConstrutora();
  }, []);

  const handlesubmit = async () => {
    if (
      !username ||
      !Email ||
      !Nome ||
      !Empreendimento ||
      !Construtora ||
      !password ||
      !confirmPassword
    ) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "Senhas diferentes",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const data = {
        username: username,
        password: password,
        telefone: Telefone,
        email: Email,
        cpf: cpf,
        nome: Nome,
        cargo: Cargo,
        construtora: Construtora ? [Number(Construtora)] : [],
        empreendimento: Empreendimento ? [Number(Empreendimento)] : [],
        hierarquia: Hierarquia,
      };
      try {
        const response = await fetch("/api/register", {
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
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const GetConstrutora = (e: any) => {
    const value = e.target.value;
    (async () => {
      const response = await fetch(
        `/api/empreendimento/getall/filter/${Number(value)}`
      );
      const data = await response.json();
      setEmpreendimentoData(data);
    })();
    setConstrutora(Number(value));
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        w="full"
      >
        <Box w={{ base: "100%", md: "48%" }} mb={{ base: 4, md: 0 }}>
          <FormLabel>Nome Completo</FormLabel>
          <Input
            type="text"
            border="1px solid #b8b8b8cc"
            onChange={(e: any) => setNome(e.target.value)}
          />
        </Box>

        <Box w={{ base: "100%", md: "48%" }}>
          <FormLabel>Usuario</FormLabel>
          <Input
            type="text"
            border="1px solid #b8b8b8cc"
            onChange={(e: any) => setUsername(e.target.value)}
          />
        </Box>
      </Box>

      <Box
        mt={6}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        w="full"
        alignItems="end"
      >
        <Box w={{ base: "100%", md: "40%" }} mb={{ base: 4, md: 0 }}>
          <FormLabel>CPF</FormLabel>
          <CpfMask setvalue={cpf} onvalue={(e: any) => setCpf(e)} />
        </Box>
        <Box w={{ base: "100%", md: "40%" }}>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            border="1px solid #b8b8b8cc"
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </Box>
        <CheckEmail email={Email} nome={Nome} />
      </Box>

      <Box
        mt={6}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        w="full"
      >
        <Box w={{ base: "100%", md: "48%" }} mb={{ base: 4, md: 0 }}>
          <FormLabel>Telefone</FormLabel>
          <Input
            type="text"
            border="1px solid #b8b8b8cc"
            onChange={(e: any) => setTelefone(e.target.value)}
          />
        </Box>
      </Box>

      <Box
        mt={6}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        w="full"
      >
        <Box w={{ base: "100%", md: "48%" }} mb={{ base: 4, md: 0 }}>
          <FormLabel>Construtora</FormLabel>
          <Select
            placeholder="Selecione uma construtora"
            border="1px solid #b8b8b8cc"
            onChange={GetConstrutora}
            value={Construtora}
          >
            {ConstrutoraData.length > 0 &&
              ConstrutoraData.map((construtora: any) => (
                <option key={construtora.id} value={construtora.id}>
                  {construtora.razaosocial}
                </option>
              ))}
          </Select>
        </Box>
        <Box w={{ base: "100%", md: "48%" }}>
          <FormLabel>Empreendimento</FormLabel>
          <Select
            placeholder="Selecione uma construtora"
            border="1px solid #b8b8b8cc"
            isDisabled={!Construtora}
            onChange={(e: any) => setEmpreendimento(e.target.value)}
            value={Empreendimento}
          >
            {EmpreendimentoData.length > 0 &&
              EmpreendimentoData.map((empreedimento: any) => (
                <option key={empreedimento.id} value={empreedimento.id}>
                  {empreedimento.nome}
                </option>
              ))}
          </Select>
        </Box>
      </Box>

      <Box
        mt={6}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        w="full"
      >
        <Box w={{ base: "100%", md: "48%" }} mb={{ base: 4, md: 0 }}>
          <FormLabel>Cargo</FormLabel>
          <Select
            placeholder="Selecione um Cargo"
            border="1px solid #b8b8b8cc"
            onChange={(e: any) => setCargo(e.target.value)}
          >
            <option value="vendedor">Vendedor</option>
            <option value="construtor">Construtor</option>
            <option value="gerente">Gerente</option>
            <option value="financeiro">Finaceiro</option>
            <option value="admin">Admin</option>
          </Select>
        </Box>
        <Box w={{ base: "100%", md: "48%" }}>
          <FormLabel>Hierarquia</FormLabel>
          <Select
            placeholder="Selecione uma Hierarquia"
            border="1px solid #b8b8b8cc"
            onChange={(e: any) => setHierarquia(e.target.value)}
          >
            <option value="USER">Vendedor</option>
            <option value="CONST">Construtora</option>
            <option value="CONST">Financeira</option>
            <option value="ADM">Administrador</option>
          </Select>
        </Box>
      </Box>

      <Box
        mt={6}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
        w="full"
      >
        <Box w={{ base: "100%", md: "48%" }} mb={{ base: 4, md: 0 }}>
          <FormLabel>Senha</FormLabel>
          <SenhaComponent
            setvalue={password}
            onvalue={(e: any) => setPassword(e)}
          />
        </Box>
        <Box w={{ base: "100%", md: "48%" }}>
          <FormLabel>Confirme Sua Senha</FormLabel>
          <SenhaComponent
            setvalue={confirmPassword}
            onvalue={(e: any) => setConfirmPassword(e)}
          />
        </Box>
      </Box>
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
      >
        CRIAR CONTA
      </Button>
    </>
  );
}
