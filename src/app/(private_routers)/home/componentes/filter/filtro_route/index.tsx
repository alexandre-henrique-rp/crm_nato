"use client";

import { FiltroComponent } from "../filtro_geral";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Tabela } from "../../tabela";


interface FiltroRouteProps {
  DataRequest: any;
}

export const FilterRoute = ({ DataRequest }: FiltroRouteProps) => {
  const [Data, setData] = useState<any>([]);
  const [DadosClientes, setDadosClientes] = useState<any>([]);

  const HandleFilter = (e: any) => {
    console.log(e);
      setData(e);
  };

  useEffect(() => {
    const Filter = DataRequest.filter((item: solictacao.SolicitacaoGetType) => {
      const matchNome = Data.nome
        ? item.nome.toLowerCase().includes(Data.nome.toLowerCase())
        : true;

      const matchAndamento =
        Data.andamento === "VAZIO"
          ? !item.fcweb
          : Data.andamento
          ? item.fcweb?.andamento
              .toLowerCase()
              .includes(Data.andamento.toLowerCase())
          : true;

      const matchEmpreendimento = Data.empreendimento
        ? item.empreedimento?.id === Data.empreendimento
        : true;

      const matchConstrutora = Data.construtora
        ? item.construtora?.id == Data.construtora
        : true;
      const matchFinanceiro = Data.financeiro
        ? item.Financeira?.id == Data.financeiro
        : true;

      return matchNome && matchAndamento && matchEmpreendimento && matchConstrutora && matchFinanceiro;
    });

    setDadosClientes(Filter);
  }, [Data]);

  return (
    <>
      <Box w={"100%"} py={5}>
        <FiltroComponent onData={HandleFilter} />
      </Box>
      <Flex justifyContent="center" alignItems="center">
        {DataRequest.length > 0 && <Tabela ClientData={DadosClientes} />}
      </Flex>
    </>
  );
};
