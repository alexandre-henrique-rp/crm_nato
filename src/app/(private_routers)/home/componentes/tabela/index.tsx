"use client";
import { Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BotoesFunction } from "../botoes/bt_group_function";

interface TabelaProps {
  onDados: {
    nome: string;
    andamento: string;
    data: string;
    empreendimento: number;
  };
}

async function handleGetUpdate() {
  const res = await fetch(`/api/solicitacao/getall`);
  const data = await res.json();
  return data;
}

export const Tabela = ({ onDados }: TabelaProps) => {
  const [Data, setData] = useState<solictacao.SolicitacaoGetType[]>([]);
  const { data: session } = useSession();
  const user = session?.user;
  const token = session?.token;

  useEffect(() => {
    (async () => {
      const data = await handleGetUpdate();
      setData(data);
    })();
  }, [token]);

  const Update = async () => {
    const data = await handleGetUpdate();
    setData(data);
  };

  const { nome, andamento, data, empreendimento } = onDados;

  const Filter = Data.filter((item: solictacao.SolicitacaoGetType) => {
    const itemDate = item.fcweb?.dt_agenda
      ? new Date(item.fcweb.dt_agenda)
      : null;
    const inputDate = data ? new Date(data) : null;

    const matchNome = nome
      ? item.nome.toLowerCase().includes(nome.toLowerCase())
      : true;
    const matchAndamento = andamento
      ? item.fcweb?.andamento.toLowerCase().includes(andamento.toLowerCase())
      : true;
    const matchData =
      inputDate && itemDate
        ? itemDate.toLocaleDateString("pt-BR") ===
          inputDate.toLocaleDateString("pt-BR")
        : true;
    const matchEmpreendimento = empreendimento
      ? item.empreendimento.id === empreendimento
      : true;

    return matchNome && matchAndamento && matchData && matchEmpreendimento;
  });

  const tabela =
    Data.length > 0 &&
    Filter.map((item: solictacao.SolicitacaoGetType) => {
      // const dtAgenda = item.fcweb && new Date(item.fcweb.dt_agenda).toLocaleDateString("pt-BR");
      const dtAgenda =
        item.fcweb &&
        new Date(
          item.fcweb.dt_agenda.toString().split("T")[0]
        ).toLocaleDateString("pt-BR");
      const andamento = item.fcweb && item.fcweb.andamento;
      const statusPg = item.fcweb && item.fcweb.estatos_pgto;
      return (
        <Tr key={item.id}>
          <Td>
            <BotoesFunction id={item.id} onUpdate={Update} />
          </Td>
          {user?.hierarquia === "ADM" && <Td>{item.id}</Td>}
          <Td>{item.nome}</Td>
          <Td>{dtAgenda}</Td>
          <Td>{andamento}</Td>
          <Td>{item.ass_doc && item.ass_doc}</Td>
          {user?.hierarquia !== "USER" && <Td>{statusPg}</Td>}
          {user?.hierarquia !== "USER" && <Td>{item.fcweb?.valorcd}</Td>}
        </Tr>
      );
    });

  return (
    <>
      {!user && null}
      {user && (
        <Flex
          w={"full"}
          bg={"white"}
          shadow={"md"}
          borderRadius={"15px"}
          p={"20px"}
          alignContent={"center"}
          justifyContent={"space-evenly"}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>FUNÇÕES</Th>
                {user?.hierarquia === "ADM" && <Th>ID</Th>}
                <Th>NOME</Th>
                <Th>AGENDAMENTO</Th>
                <Th>ANDAMENTO</Th>
                <Th>ASS.DOC</Th>
                {user?.hierarquia !== "USER" && <Th>STATUS PGMNT</Th>}
                {user?.hierarquia !== "USER" && <Th>VALOR</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {Filter.length === 0 && null}
              {Filter.length > 0 && tabela}
            </Tbody>
          </Table>
        </Flex>
      )}
    </>
  );
};
