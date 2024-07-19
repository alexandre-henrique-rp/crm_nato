
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { signOut } from "next-auth/react";;
import { redirect  } from "next/navigation";
import { destroyCookie } from "nookies";

export default async function BotaoSair() {

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
          onClick={() => {
            redirect("/login");
            // signOut();
          }}
        >
          Sair
        </Button>
      </Box>
    </Flex>
  );
}
