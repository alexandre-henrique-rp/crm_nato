"use client";

import CpfMask from "@/app/componentes/cpf_mask";
import { SenhaComponent } from "@/app/componentes/Senha";
import { Box, Button, FormLabel, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { mask, unMask } from "remask";

export default function FormRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [Empreendimento, setEmpreendimento] = useState("");
  const [Construtora, setConstrutora] = useState("");
  const [Email, setEmail] = useState("");
  const [Nome, setNome] = useState("");
  const toast = useToast();

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
    }
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "Senhas diferentes",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    const data = {
      username: username,
      password: password,
    };
    console.log(data);
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      const user = data.user;
      localStorage.setItem("user", user);
      const id = data.user.id;
      localStorage.setItem("id", id);
      const hierarquia = data.user.hierarquia;
      localStorage.setItem("hierarquia", hierarquia);
      console.log(data);
    }
  };

  return (
    <>
      <Box display={"Flex"} justifyContent={"space-between"} w={"full"}>
        <Box w="48%">
          <FormLabel>Nome Completo</FormLabel>
          <Input type="text" onChange={(e: any) => setNome(e.target.value)} />
        </Box>

        <Box w="48%">
          <FormLabel>Usuario</FormLabel>
          <Input
            type="text"
            onChange={(e: any) => setUsername(e.target.value)}
          />
        </Box>
      </Box>

      <Box mt={6} display={"Flex"} justifyContent={"space-between"} w={"full"}>
        <CpfMask setvalue={cpf} onvalue={(e: any) => setCpf(e)} />
        <Box w="48%">
          <FormLabel>Construtora</FormLabel>
          <Input
            type="text"
            onChange={(e: any) => setConstrutora(e.target.value)}
          />
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
        <Box w={"48%"}>
          <FormLabel>Senha</FormLabel>
          <SenhaComponent
            setvalue={password}
            onvalue={(e: any) => setPassword(e)}
          />
        </Box>
        <Box w={"48%"}>
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
        maxWidth="100%"
        textColor={"Black"}
        onClick={handlesubmit}
      >
        CRIAR CONTA
      </Button>
    </>
  );
}
