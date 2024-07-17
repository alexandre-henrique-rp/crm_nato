import { Stack, Text, Box, Button, Flex } from "@chakra-ui/react";
import FormRegister from "./_components/form";
import { BotaoRetorno } from "@/app/componentes/btm_retorno";

export default function Register() {
  return (
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
        w={"60em"}
        textAlign={"center"}
      >
        <Flex w={"100%"} justifyContent={"center"} mb={5}>
          <Box zIndex={1} position={"initial"}>
            <BotaoRetorno />
          </Box>
          <Box width={"100%"}>
            <Text
              fontWeight="regular"
              fontSize="32px"
              color="#333333"
            >
              Cadastro de Usuarios
            </Text>
          </Box>
        </Flex>

        <FormRegister />
      </Box>
    </Stack>
  );
}
