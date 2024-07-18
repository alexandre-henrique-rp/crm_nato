"use client";

import {
  Stack,
  Text,
  Box,
  Flex,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import SolicitacaoForm from "./_componentes";
import { useState } from "react";
import RelacionadoForm from "./_componentes/FormRelacionamento";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { BotaoRetorno } from "@/app/componentes/btm_retorno";

export default function Solicitacao() {
  const [onvalue, setOnvalue] = useState<any>();
  const [isHidden, setIsHidden] = useState<Boolean>(true); // Inicialmente, defina como true
  const route = useRouter();

  const handleIshiddenChange = (e: any) => {
    console.log("ishidden", e);
    // Só atualize o estado se o valor de 'e' for diferente do estado atual
    if (e === "sim") {
      setIsHidden(false); // Atualize o estado conforme necessário
    } else {
      setIsHidden(true); // Atualize o estado conforme você desejar
    }
  };

  const handleOnvalueChange = (e: any) => {
    console.log("onvalue", e);
    // Só atualize o estado se o valor de 'e' for diferente do estado atual
    if (e && !onvalue) {
      setOnvalue(e); // Atualize o estado conforme necessário
    }
  };

  return (
    <Box
      h="100vh"
      overflowY="auto"
      background="#F8F8F8"
      alignItems="center"
      justifyContent="center"
      p={8}
      gap={4}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        <Stack>
          <Box
            border="3px solid #E8E8E8"
            borderRadius="8px"
            p={8}
            w={useBreakpointValue({ base: "100%", md: "80%", lg: "60em" })}
            textAlign="center"
          >
            <Flex>
              <Box zIndex={1} position="initial">
                <BotaoRetorno />
              </Box>
              <Box w="100%">
                <Text
                  fontFamily="Poppins"
                  fontWeight="regular"
                  fontSize="32px"
                  color="#333333"
                  mb={8}
                >
                  Nova Solicitação
                </Text>
              </Box>
            </Flex>

            <SolicitacaoForm
              onvalue={handleOnvalueChange}
              ishidden={handleIshiddenChange} // Passa a função para atualizar isHidden
            />
          </Box>
        </Stack>

        {!isHidden ? (
          <Stack>
            <Box
              border="3px solid #E8E8E8"
              borderRadius="8px"
              p={8}
              // w={useBreakpointValue({ base: "100%", md: "80%", lg: "60em" })}
              textAlign="center"
            >
              <RelacionadoForm SetValue={onvalue} />
            </Box>
          </Stack>
        ) : null}
      </Flex>
    </Box>
  );
}
