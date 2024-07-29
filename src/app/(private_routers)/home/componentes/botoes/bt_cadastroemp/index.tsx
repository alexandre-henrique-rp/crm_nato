"use client";
import { Flex, Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function BotaoCadastroemp() {
  const router = useRouter();

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
          bg={"#00713D"}
          textColor={"white"}
          variant="solid"
          _hover={{ bg: "#00631B" }}
          size="lg"
          onClick={() => router.push("/registeremp")}
        >
          CADASTRAR EMPREENDIMENTO
        </Button>
      </Box>
    </Flex>
  );
}
