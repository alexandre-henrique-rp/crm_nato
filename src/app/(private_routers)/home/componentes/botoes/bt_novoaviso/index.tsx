"use cliente";

import { useRouter } from "next/navigation";
import { Flex, Box, Button } from "@chakra-ui/react";

export default function BotaoCadastro() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/avisos");
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
          bg={"#00713D"}
          textColor={"white"}
          variant="solid"
          _hover={{ bg: "#00631B" }}
          size="lg"
          onClick={handleClick}
        >
          Novo Aviso
        </Button>
      </Box>
    </Flex>
  );
}
