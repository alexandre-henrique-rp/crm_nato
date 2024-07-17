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

export const FiltroComponent = ({ onData }: FiltroGeralProps) => {
  const [FilterNome, setFilterNome] = useState<string>("");
  const [FilterAndamento, setFilterAndamento] = useState<string>("");
  const [FilterData, setFilterData] = useState<Date | string>("");
  const [FilterEmpreendimento, setFilterEmpreendimento] = useState<string>("");
  const [StatusNome, setStatusNome] = useState<boolean>(false);
  const [StatusAndamento, setStatusAndamento] = useState<boolean>(false);
  const [StatusData, setStatusData] = useState<boolean>(false);
  const [StatusEmpreendimento, setStatusEmpreendimento] =
    useState<boolean>(false);
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
    console.log(FilterData);
    const data = {
      nome: FilterNome,
      andamento: FilterAndamento,
      data: FilterData,
      empreendimento: FilterEmpreendimento
    };

    onData(data);
  };

  const HandleFilterBlank = () => {
    const data = {
      nome: undefined,
      andamento: undefined,
      data: undefined,
      empreendimento: undefined
    };
    setStatusData(true);
    setStatusAndamento(true);
    setStatusNome(true);
    setStatusEmpreendimento(true);
    setTimeout(() => {
      setStatusData(false);
      setStatusAndamento(false);
      setStatusNome(false);
      setStatusEmpreendimento(false);
    }, 50);

    onData(data);
  };

  return (
    <Flex
      w="100%"
      justifyContent="start"
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }} // Ajusta a direção da flexbox para diferentes tamanhos de tela
    >
      <Box w="full" h="100%" bg="#F8F8F8" mr={{ base: "0", md: "10px" }}>
        <NomeFilter onNome={SetNomeEvent} setBlank={StatusNome} />
      </Box>
      <Box w="full" h="100%" bg="#F8F8F8" mr={{ base: "0", md: "10px" }}>
        {user?.hierarquia !== "USER" && (
          <EmpreendimentoFilter
            onEmpreendimento={SetEmpreendimentoEvent}
            setBlank={StatusEmpreendimento}
          />
        )}
      </Box>
      <Box w="full" h="100%" bg="#F8F8F8" mr={{ base: "0", md: "10px" }}>
        <AndamentoFilter
          onAndamento={SetAndamentoEvent}
          setBlank={StatusAndamento}
        />
      </Box>

      <Flex w="full" h="100%" bg="#F8F8F8" mr={{ base: "0", md: "10px" }}>
        <Box w="full" h="100%" bg="#F8F8F8" mr={{ base: "0", md: "10px" }}>
          <DateFilter onData={SetDataEvent} setBlank={StatusData} />
        </Box>
      </Flex>
      <Flex
        w="full"
        h="100%"
        bg="#F8F8F8"
        gap={"1rem"}
        mr={{ base: "0", md: "10px" }}
      >
        <Button
          bg="#00713D"
          w={{ base: "100%", md: "auto" }}
          textColor="white"
          variant="solid"
          _hover={{ bg: "#00631B" }}
          size="md"
          onClick={HandleFilter}
        >
          Filtrar
        </Button>
        <Button
          bg="#00713D"
          w={{ base: "100%", md: "auto" }}
          textColor="white"
          variant="solid"
          _hover={{ bg: "#00631B" }}
          size="md"
          onClick={HandleFilterBlank}
        >
          Limpar
        </Button>
      </Flex>
    </Flex>
  );
};
