"use client";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function BotaoSair() {
  const router = useRouter();

  const sair = () => {
    localStorage.clear();
    router.push("/login");
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
          onClick={() => sair()}
        >
          Sair
        </Button>
      </Box>
    </Flex>
  );
}
