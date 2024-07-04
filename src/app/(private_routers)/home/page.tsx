import { Box, Flex } from "@chakra-ui/react";
import BotaoJuncao from "./componentes/botoes/bt_juncao";
import PerfilHome from "./componentes/perfil_home";
import { Tabela } from "./componentes/tabela";
import { FiltroComponent } from "./componentes/filter/filtro_geral";

export default function HomePage() {
  return (
    <Flex
      h={"100vh"}
      w={"100%"}
      overflowY={"auto"}
      justifyContent={"center"}
      alignItems={"center"}
      bg={"#F8F8F8"}
    >
      <Box w={"70%"} alignItems={"center"} justifyContent={"spac-between"}>
        <Box
          w={"100%"}
          h={"100%"}
          bg={"#F8F8F8"}
          padding={"10px"}
        >
          <BotaoJuncao />
        </Box>
        <Box
          w={"100%"}
          h={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          bg={"#F8F8F8"}
          padding={"10px"}
        >
          <PerfilHome />
        </Box>
        <Box
          w={"100%"}
          h={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          bg={"#F8F8F8"}
          padding={"10px"}
        >
          <FiltroComponent />
        </Box>

        <Box
          w={"100%"}
          h={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          bg={"#F8F8F8"}
          padding={"10px"}
        >
          <Tabela />
        </Box>
      </Box>
    </Flex>
  );
}
