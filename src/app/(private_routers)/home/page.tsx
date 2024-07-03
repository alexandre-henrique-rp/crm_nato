import { Box, Flex } from "@chakra-ui/react";
import BotaoJuncao from "./componentes/botoes/bt_juncao";
import PerfilHome from ".";

export default function HomePage() {
  return (
    // [pendentes, analise, finalizados]
    <Flex
      w={"100%"}
      h={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      p={"20px"}

    >
        <Box
          alignItems={"center"}
          justifyContent={"center"}
        >
          <BotaoJuncao />
          <PerfilHome />
        </Box>
      </Flex>
  );
}
