"use client";

import { SenhaComponent } from "@/app/componentes/Senha";
import {
  Input,
  FormControl,
  FormLabel,
  Button,
  useToast
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const FormLogin = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const toast = useToast();
  const router = useRouter();

  const handlesubmit = async () => {
    const res: any = await signIn("credentials", {
      email: username,
      password: password,
      redirect: false
    });
    if (res.status !== 200) {
      toast({
        title: "Usuário ou Senha Incorreto",
        status: "error",
        duration: 5000,
      });
    } else {
      router.replace("/home");
    }
  };

  return (
    <>
      <FormControl>
        <FormLabel>Usuario</FormLabel>
        <Input
          type="text"
          size={"lg"}
          onChange={(e: any) => setUsername(e.target.value)}
        />
        <FormLabel> Senha</FormLabel>
        <SenhaComponent
          setvalue={password}
          onvalue={(e: any) => setPassword(e)}
        />
      </FormControl>
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
        ACESSAR
      </Button>
    </>
  );
};
