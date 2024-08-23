import { Box, Flex, Stack } from "@chakra-ui/react";
import { ModalPrimeAsses } from "@/app/componentes/prime_asses";
import PerfilHome from "./home/componentes/perfil_home";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth_confg";
import { FilterRoute } from "./home/componentes/filter/filtro_route";

export default async function HomePage() {
  const session = await getServerSession(auth);
  
  const reqest = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    }
  );
  const res = await reqest.json();

  

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
          <FilterRoute DataRequest={res} />
        </Box>
      </Box>
    </Flex>
  );
}
