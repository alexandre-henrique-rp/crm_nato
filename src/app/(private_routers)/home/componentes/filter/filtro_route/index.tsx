"use client";

import { FiltroComponent } from "../filtro_geral";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Tabela } from "../../tabela";

// Defina tipos para evitar o uso de "any"
interface FiltroRouteProps {
  DataRequest: solictacao.SolicitacaoGetType[];
}

interface FiltroData {
  id?: number;
  nome?: string;
  andamento?: string;
  empreendimento?: string;
  construtora?: string;
  financeira?: string;
}

export const FilterRoute = ({ DataRequest }: FiltroRouteProps) => {
  const [data, setData] = useState<FiltroData>({});
  const [dadosClientes, setDadosClientes] = useState<
    solictacao.SolicitacaoGetType[]
  >([]);

  const handleFilter = (filtroData: FiltroData) => {
    setData(filtroData);
  };

  const filterData = (item: solictacao.SolicitacaoGetType) => {
  
    const { nome, andamento, empreendimento, construtora, financeira, id } = data;

    const matchId = !id || item.id === Number(id);

    const matchNome =
      !nome || item.nome.toLowerCase().includes(nome.toLowerCase());

    const matchAndamento =
      andamento !== "VAZIO"
        ? andamento
          ? item.fcweb?.andamento
              .toLowerCase()
              .includes(andamento.toLowerCase())
          : true
        : !item.fcweb;

    const matchEmpreendimento =
      !empreendimento ||
      item.empreedimento?.id === Number(empreendimento);

    const matchConstrutora =
      !construtora ||
      item.construtora?.id === Number(construtora);

    const matchFinanceiro =
      !financeira ||
      item.financeiro?.id === Number(financeira);
  

    return (
      matchId &&
      matchNome &&
      matchAndamento &&
      matchEmpreendimento &&
      matchConstrutora &&
      matchFinanceiro
    );
  };

  useEffect(() => {
    const filteredData = DataRequest.filter(filterData);
    setDadosClientes(filteredData);
  }, [data, DataRequest]);



  return (
    <>
      <Box w="100%" py={5}>
        <FiltroComponent onData={handleFilter} />
      </Box>
      <Flex justifyContent="center" alignItems="center">
        {DataRequest.length > 0 && <Tabela ClientData={dadosClientes} />}
      </Flex>
    </>
  );
};
