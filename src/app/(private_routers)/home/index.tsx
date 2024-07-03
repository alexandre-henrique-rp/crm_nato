"use client";

import { Flex, LinkBox, Box, Text } from "@chakra-ui/react";

export default function PerfilHome() {
  return (
    <Flex
      w={"full"}
      bg={"white"}
      shadow={"md"}
      borderRadius={"15px"}
      p={"20px"}
      alignContent={"center"}
    >
      <Box>
        <Text fontWeight={"bold"}> Home: </Text> 
        <Text fontWeight={"bold"}> Email: </Text>
        <Text fontWeight={"bold"}> Telefone: </Text>
        <Text fontWeight={"bold"}> CPF: </Text>
      </Box>
    </Flex>
  );
}
