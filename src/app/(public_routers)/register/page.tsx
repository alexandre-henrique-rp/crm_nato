import { Stack, Text, Box, Button } from "@chakra-ui/react";
import FormRegister from "./_components/form";

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
        <Text
          fontFamily="Poppins"
          fontWeight="regular"
          fontSize="32px"
          color="#333333"
        >
          Cadastro de Usuarios
        </Text>
        <FormRegister />
      </Box>
    </Stack>
  );
}
