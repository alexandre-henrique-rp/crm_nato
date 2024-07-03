"use client";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function BotaoNovaSolicita() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/register");
  };
  
  return (
    <Flex w={"100%"}>
      <Box
        w={"100%"}
        h={"100%"}
        borderRadius={"15px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"20px"}
      >
        <Button
          colorScheme="green"
          variant="outline"
          size="lg"
          onClick={handleClick}
        >
          Nova Solicitação
        </Button>
      </Box>
    </Flex>
  );
}
