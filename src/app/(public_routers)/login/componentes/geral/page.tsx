"use client";

import { Stack, Text, Box, Button, Link } from "@chakra-ui/react";
import { FormLogin } from "../form/Page";

export const LoginComponent = () => (
  <Stack
    h={"100vh"}
    background="#F8F8F8"
    justifyContent={"center"}
    alignItems={"center"}
  >
    <Box
      border={"3px solid #E8E8E8"}
      borderRadius={"8px"}
      padding={"32px"}
      w={"35em"}
      textAlign={"center"}
    >
      <Text
        fontFamily="Poppins"
        fontWeight="regular"
        fontSize="32px"
        color="#333333"
      >
        LOGIN
      </Text>
      <Box>
        <FormLogin />
      </Box>
      <Box>
        <Text
          fontFamily="Poppins"
          fontWeight="regular"
          fontSize="15px"
          textDecoration="underline"
          color="#111111"
          mb={5}
          mt={-2}
        >
          <Link>Esqueci a Senha </Link>
        </Text>

        <Text
          fontFamily="Poppins"
          fontWeight="regular"
          fontSize="13px"
          color="#333333"
        >
          Ao continuar, você concorda com os <br></br>
          <Link>Termos de uso </Link>e<Link> Política de Privacidade.</Link>
        </Text>
      </Box>
    </Box>
    <Box
      border={"3px solid #E8E8E8"}
      borderRadius={"8px"}
      padding={"32px"}
      w={"35em"}
      textAlign={"center"}
    >
      <Button
        variant="outline"
        width="400px"
        height="50px"
        maxWidth="100%"
        textColor={"Black"}
      >
        VERIFICAR STATUS DO CERTIFICADO
      </Button>
    </Box>
  </Stack>
);
