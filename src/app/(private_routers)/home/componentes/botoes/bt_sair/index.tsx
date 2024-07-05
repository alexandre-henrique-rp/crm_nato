"use client";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

export default function BotaoSair() {

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
          onClick={() => signOut()}
        >
          Sair
        </Button>
      </Box>
    </Flex>
  );
}
