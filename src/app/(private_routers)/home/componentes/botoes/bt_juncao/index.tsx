import { Box, Flex } from "@chakra-ui/react";
import BotaoCadastro from "../bt_cadastro";
import BotaoNovaSolicita from "../bt_nvsolicita";
import BotaoSair from "../bt_sair";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function BotaoJuncao() {
  const session = await getServerSession(nextAuthOptions);
  const but = session?.user?.hierarquia;
  return (
    <Flex w={"100%"}>
      <Box h={"100%"} borderRadius={"15px"} display={"flex"} gap={"20px"}>
        <BotaoNovaSolicita />
        {but !== "USER" && <BotaoCadastro />}
        <BotaoSair />
      </Box>
    </Flex>
  );
}
