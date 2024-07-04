"use client";

import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { NomeFilter } from "../filtro_nome";
import { EmpreendimentoFilter } from "../filtro_empreend";
import { DateFilter } from "../Filtro_data";
import { AndamentoFilter } from "../filtro_andamento";

export const FiltroComponent = () => {
  const filter = localStorage.getItem("hierarquia");
  return (
    <Flex w={"100%"} justifyContent={"start"} alignItems={"center"} gap={"5px"}>
      <Box w={"35%"} h={"100%"} bg={"#F8F8F8"}>
        <NomeFilter />
      </Box>
      <Box w={"30%"} h={"100%"} bg={"#F8F8F8"}>
        {filter !== "USER" && <EmpreendimentoFilter />}
      </Box>
      <Box w={"20%"} h={"100%"} bg={"#F8F8F8"}>
        <AndamentoFilter />
      </Box>
      <Box w={"15%"} h={"100%"} bg={"#F8F8F8"}>
        <DateFilter />
      </Box>
      <Button
        bg={"#00713D"}
        textColor={"white"}
        variant="solid"
        _hover={{ bg: "#00631B" }}
        size="md"
      >
        Filtrar
      </Button>
    </Flex>
  );
};
