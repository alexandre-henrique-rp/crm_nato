"use client";

import { Box, Flex, Select } from "@chakra-ui/react";
import { useState } from "react";

interface FiltroAndamentoProps {
  onAndamento: string | any;
}
export const AndamentoFilter = ({ onAndamento }: FiltroAndamentoProps) => {
  const [Andamento, setAndamento] = useState<string>("");

  return (
    <Flex
      w={"100%"}
      justifyContent="start"
      alignItems="center"
      gap="5px"
      flexDirection={{ base: "column", md: "row" }} // Ajusta a direção da flexbox para diferentes tamanhos de tela
    >
      <Box
        w={"full"}
        h="100%"
        bg="#F8F8F8"
        pt={{ base: "10px" }}
        pb={{ base: "10px" }} 
      >
        <Select
          textColor="#00713D"
          _hover={{ borderColor: "#00613C" }}
          borderColor="#00713D"
          placeholder="Andamento"
          size="md"
          value={Andamento}
          onChange={(e) => {
            setAndamento(e.target.value);
            onAndamento(e.target.value);
          }}
        >
          <option value="NOVA FC">NOVA FC</option>
          <option value="AGENDADO">AGENDADO</option>
          <option value="APROVADO">APROVADO</option>
          <option value="CANCELADO">CANCELADO</option>
          <option value="EMITIDO">EMITIDO</option>
          <option value="REVOGADO">REVOGADO</option>
        </Select>
      </Box>
    </Flex>
  );
};
