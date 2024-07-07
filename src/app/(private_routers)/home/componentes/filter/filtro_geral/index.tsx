"use client";

import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { NomeFilter } from "../filtro_nome";
import { DateFilter } from "../Filtro_data";
import { AndamentoFilter } from "../filtro_andamento";
import { SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { EmpreendimentoFilter } from "../filtro_empreend";

interface FiltroGeralProps {
  onData: any;
}

export const FiltroComponent = ({
  onData
}: FiltroGeralProps) => {
  const [FilterNome, setFilterNome] = useState<string>("");
  const [FilterAndamento, setFilterAndamento] = useState<string>("");
  const [FilterData, setFilterData] = useState<Date | string>("");
  const [FilterEmpreendimento, setFilterEmpreendimento] = useState<string>("");
  const { data: session } = useSession();
  const user = session?.user;
  

  const SetNomeEvent = (e: SetStateAction<string>) => {
    if (e !== "") {
      setFilterNome(e);
    }
  };

  const SetAndamentoEvent = (e: SetStateAction<string>) => {
    if (e !== "") {
      setFilterAndamento(e);
    }
  };

  const SetDataEvent = (e: SetStateAction<Date | string | any>) => {
    if (e) {
      setFilterData(e);
    } else {
      setFilterData("");
    }
  };

  const SetEmpreendimentoEvent = (e: SetStateAction<string>) => {
    if (e !== "") {
      setFilterEmpreendimento(e);
    }
  };

  const HandleFilter = () => {
    console.log(FilterData)
    const data = {
      nome: FilterNome,
      andamento: FilterAndamento,
      data: FilterData,
      empreendimento: FilterEmpreendimento
    }

    onData(data);
  };

  // const HandleFilterBlank = () => {
  //   const data = {
  //     nome: FilterNome,
  //     andamento: FilterAndamento,
  //     data: FilterData,
  //     empreendimento: FilterEmpreendimento
  //   }

  //   onData(data);
  // };

  return (
    <Flex w={"100%"} justifyContent={"start"} alignItems={"center"} gap={"5px"}>
      <Box w={"35%"} h={"100%"} bg={"#F8F8F8"}>
        <NomeFilter onNome={SetNomeEvent} />
      </Box>
      <Box w={"30%"} h={"100%"} bg={"#F8F8F8"}>
        {user?.hierarquia !== "USER" && <EmpreendimentoFilter onEmpreendimento={SetEmpreendimentoEvent}/>}
      </Box>
      <Box w={"20%"} h={"100%"} bg={"#F8F8F8"}>
        <AndamentoFilter onAndamento={SetAndamentoEvent} />
      </Box>
      <Box w={"15%"} h={"100%"} bg={"#F8F8F8"}>
        <DateFilter onData={SetDataEvent} />
      </Box>
      <Button
        bg={"#00713D"}
        textColor={"white"}
        variant="solid"
        _hover={{ bg: "#00631B" }}
        size="md"
        onClick={HandleFilter}
      >
        Filtrar
      </Button>
      {/* <Button
        bg={"#00713D"}
        textColor={"white"}
        variant="solid"
        _hover={{ bg: "#00631B" }}
        size="md"
        onClick={HandleFilter}
      >
        Limpar
      </Button> */}
    </Flex>
  );
};
