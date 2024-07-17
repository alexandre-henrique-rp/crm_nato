"use client";

import { Stack, Text, Box, Button, Link } from "@chakra-ui/react";
import { FormLogin } from "./componentes/form";

export default function LoginPage() {
  const handleClick = () => {
    window.open(
      "https://arredebrasilrp.acsoluti.com.br/site/verificar-situacao-de-emissao",
      "_blank"
    );
  };
  return (
    <Stack
      height="100vh"
      bg={"#dfdfdf"}
      justifyContent="center"
      alignItems="center"
      spacing={8} // Espaçamento entre os elementos dentro do Stack
      padding={{ base: "20px", md: "40px", lg: "80px" }} // Padding responsivo
    >
      {/* Bloco de Login */}
      <Box
        border="3px solid #f1f1f1"
        borderRadius="8px"
        padding="32px"
        width={{ base: "90%", sm: "80%", md: "70%", lg: "50%", xl: "35em" }} // Largura responsiva
        textAlign="center"
        maxWidth="100%"
        bg={"#ffffff"}
        boxShadow="lg"
      >
        <Text
          fontFamily="Poppins"
          fontWeight="regular"
          fontSize={{ base: "24px", sm: "28px", md: "32px" }} // Tamanho de fonte responsivo
          color="#333333"
        >
          LOGIN
        </Text>
        <Box>
          {/* Componente de formulário de login */}
          <FormLogin />
        </Box>
        <Box>
          {/* <Text
            fontFamily="Poppins"
            fontWeight="regular"
            fontSize={{ base: "12px", sm: "14px", md: "15px" }} // Tamanho de fonte responsivo
            textDecoration="underline"
            color="#111111"
            marginBottom={5}
            marginTop={{ base: -2, sm: -1 }} // Margem superior responsiva
          >
            <Link href="/reset-password">Esqueci a Senha</Link>
          </Text> */}

          <Text
            fontFamily="Poppins"
            fontWeight="regular"
            fontSize={{ base: "10px", sm: "12px", md: "13px" }} // Tamanho de fonte responsivo
            color="#333333"
          >
            Ao continuar, você concorda com os <br></br>
            <Link href="/termos/uso">Termos de uso</Link> e
            <Link href="/termos/privacidade"> Política de Privacidade.</Link>
          </Text>
        </Box>
      </Box>

      {/* Bloco de Verificar Status do Certificado */}
      <Box
        border="3px solid #E8E8E8"
        borderRadius="8px"
        padding="32px"
        width={{ base: "90%", sm: "80%", md: "70%", lg: "50%", xl: "35em" }} // Largura responsiva
        textAlign="center"
        maxWidth="100%"
          bg={"#ffffff"}
        boxShadow="lg"
      >
        <Button
          variant="outline"
          width={{ base: "100%", sm: "400px" }} // Largura responsiva
          height="50px"
          onClick={handleClick}
          border="1px solid #b8b8b8cc"
          maxWidth="100%"
          color="black"
        >
          VERIFICAR STATUS DO CERTIFICADO
        </Button>
      </Box>
    </Stack>
  );
}
