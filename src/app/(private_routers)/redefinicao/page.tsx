"use client";

import { SenhaComponent } from "@/app/componentes/Senha";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

export default function RedefinicaoPage() {
  const [username, setUsername] = useState("");
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();
  const handlesubmit = async () => {
    if (!username || !password || !confirmPassword) {
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
    <Container maxW="lg" py={12} px={6}>
      <Stack spacing={4}>
        <Heading fontSize="3xl">Redefinir nome de usuário e senha</Heading>
        <Text fontSize="lg" color="gray.600">
          Adicione seu novo nome de usuario e sua nova senha.
        </Text>
        <Box
          as="form"
          mt={10}
          p={8}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
          onSubmit={handlesubmit}
        >
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Novo Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <Box
              mt={6}
              display={"Flex"}
              justifyContent={"space-between"}
              w={"full"}
            >
              <Box w={"48%"}>
                <FormLabel>Senha</FormLabel>
                <SenhaComponent
                  setvalue={password}
                  onvalue={(e: any) => setNewPassword(e)}
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
            <Button type="submit" colorScheme="teal" size="lg" fontSize="md">
              Reset Password
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
