"use client";

import { FiltroComponent } from "../filtro_geral";
import { Box, Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Tabela } from "../../tabela";

interface FiltroData {
  id?: number;
  nome?: string;
  andamento?: string;
  empreendimento?: string;
  construtora?: string;
  financeira?: string;
}

export const FilterRoute = () => {
  const [data, setData] = useState<FiltroData>({});
  const [Dados, setDados] = useState<solictacao.SolicitacaoGetType[]>([]);
  const [dadosClientes, setDadosClientes] = useState<
    solictacao.SolicitacaoGetType[]
  >([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
     (async () => {

       const req = await fetch("/api/solicitacao/getall");
       const data = await req.json();
       setDados(data);
     })();
  }, []);



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
    const filteredData = Dados.filter(filterData);
    setDadosClientes(filteredData);
  }, [data, Dados]);



  return (
    <>
      <Box w="100%" py={5}>
        <FiltroComponent onData={handleFilter} />
      </Box>
      <Flex justifyContent="center" alignItems="center">
         <Tabela ClientData={dadosClientes} />
      </Flex>
    </>
  );
};
