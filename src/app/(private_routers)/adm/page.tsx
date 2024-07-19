"use client";

import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Aprovacao from "./_components/aprovacao";
import { BotaoRetorno } from "@/app/componentes/btm_retorno";
import BotaoCadastro from "../home/componentes/botoes/bt_cadastro";
import BotaoAprovacao from "./_components/aprovacao/bt";

export default function PainelAdministrativo() {
  return (
    <Flex
      h="100vh"
      background="#F8F8F8"
      alignItems="center"
      justifyContent={"center"}
    >
      <Box
        border="3px solid #E8E8E8"
        borderRadius="8px"
        p={8}
        w={useBreakpointValue({ base: "100%", md: "80%", lg: "60em" })}
        textAlign="center"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Flex justifyContent={"center"}>
          <Box zIndex={1} position="initial">
            <BotaoRetorno />
          </Box>
          <Box>
            <Text fontSize="32px" fontWeight="bold" color="#333333" mb={8}>
              PAINEL ADMINISTRATIVO
            </Text>
          </Box>
        </Flex>

        <Flex justifyContent={"center"} gap={10} pt={10}>
          <Box>
            <BotaoCadastro />
          </Box>
          <Box>
            <BotaoAprovacao />
          </Box>

          
        </Flex>
      </Box>
    </Flex>
  );
}
