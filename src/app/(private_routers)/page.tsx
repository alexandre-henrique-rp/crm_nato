import { Box, Flex, Stack } from "@chakra-ui/react";
import { ModalPrimeAsses } from "@/app/componentes/prime_asses";
import PerfilHome from "./home/componentes/perfil_home";
import { FilterRoute } from "./home/componentes/filter/filtro_route";

export default async function HomePage() {

  return (
    <Flex
      minH="100vh"
      w="100%"
      overflowY="auto"
      justifyContent="center"
      alignItems="center"
      bg="#F8F8F8"
      py="2rem"
    >
      <ModalPrimeAsses />
      <Box
        w={{ base: "90%", md: "80%", lg: "70%" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box justifyContent="center" alignItems="center">
          <PerfilHome />
        </Box>
        <Box>
          <FilterRoute />
        </Box>
      </Box>
    </Flex>
  );
}
