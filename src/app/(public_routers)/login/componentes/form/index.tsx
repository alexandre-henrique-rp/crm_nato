"use client";

import { SenhaComponent } from "@/app/componentes/Senha";
import { Input, FormControl, FormLabel, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const FormLogin = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  console.log(password);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const router = useRouter();

  const handlesubmit = async () => {
    try {
      const data = {
        password: password,
        username: username,
      };
      const response = await fetch("/api/auth", {
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
        const user = JSON.stringify(data.user);
        localStorage.setItem("user", user);
        const id = data.user.id;
        localStorage.setItem("id", id);
        const hierarquia = data.user.hierarquia;
        localStorage.setItem("hierarquia", hierarquia);
        console.log(data);

        router.push("/home");
      }
    } catch (error) {
      console.error(error);
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
