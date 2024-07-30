"use client";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function BotaoNovaSolicita() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/solicitacoes");
  };

  return (
    <Flex>
      <Box
        h={"100%"}
        borderRadius={"15px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"20px"}
      >
        <Button
          bg={"#00713D"}
          textColor={"white"}
          variant="solid"
          _hover={{ bg: "#00631B" }}
          size="md"
          onClick={handleClick}
        >
          NOVA SOLICITAÇÃO
        </Button>
      </Box>
    </Flex>
  );
}
