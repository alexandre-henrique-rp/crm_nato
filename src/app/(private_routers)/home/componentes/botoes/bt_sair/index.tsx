"use client";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";

export default function BotaoSair() {
  const router = useRouter();

  const HandleSair = async (e: any) => {
    e.preventDefault();
    signOut({ redirect: false });
    setTimeout(() => {
      router.push("/login");
    }, 100)
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
          textColor={"white"}
          variant="link"
          size="sm"
          leftIcon={<HiOutlineLogout />}
          onClick={HandleSair}
        >
          SAIR
        </Button>
      </Box>
    </Flex>
  );
}
