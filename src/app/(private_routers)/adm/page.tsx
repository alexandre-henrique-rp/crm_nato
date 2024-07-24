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
import BotaoJuncao from "../home/componentes/botoes/bt_juncao";
import BotaoNovaSolicita from "../home/componentes/botoes/bt_nvsolicita";
import { ModalFormComponent } from "@/app/componentes/modal";

export default function PainelAdministrativo() {
  return (
    <Flex
      flexDir="column"
      h="100%"
      background="#F8F8F8"
      overflowY={"auto"}
      alignItems="center"
      py={10}
      px={4} // Adicionei um padding lateral para melhorar o espaçamento em telas menores
    >
      <Box
        border="3px solid #E8E8E8"
        borderRadius="8px"
        p={8}
        w={useBreakpointValue({ base: "100%", md: "80%", lg: "60em" })}
        textAlign="center"
        flexDir="column"
        alignItems="center"
        mb={8}
      >
        <Flex mb={8} justifyContent="center" alignItems="center">
          <Box zIndex={1} position="initial">
            <BotaoRetorno />
          </Box>
          <Box ml={4}>
            <Text fontSize="32px" fontWeight="bold" color="#333333">
              PAINEL ADMINISTRATIVO
            </Text>
          </Box>
        </Flex>

        <Flex justifyContent="center" gap={10}>
          <Box>
            <BotaoCadastro />
          </Box>
          <Box>
            <BotaoNovaSolicita />
          </Box>
          <Box>
            <ModalFormComponent rota={"geral"} />
          </Box>
        </Flex>
      </Box>

      <Box
        border="3px solid #E8E8E8"
        borderRadius="8px"
        p={8}
        w={useBreakpointValue({ base: "100%", md: "80%", lg: "60em" })}
        textAlign="center"
        display={{ base: "block", md: "flex" }} // Mudança de 'none' para 'block' para garantir que o componente seja exibido em telas menores
        flexDir="column"
        alignItems="center"
        mt={8}
      >
        <Aprovacao />
      </Box>
    </Flex>
  );
}
