"use client";
import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BotoesFunction } from "../botoes/bt_group_function";

interface TabelaProps {
  ClientData: any;
}

export const Tabela = ({ ClientData }: TabelaProps) => {
  const [Data, setData] = useState<solictacao.SolicitacaoGetType[]>([]);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (ClientData.length > 0) {
      setData(ClientData);
    }
  }, [ClientData]);

  const Update = async (id: number) => {
    const newData = Data.filter((item: any) => {
      return item.id !== id;
    });
    setData(newData);
  };

  const tabela =
    Data.length > 0 &&
    Data.map((item: solictacao.SolicitacaoGetType) => {
      const dtAgenda =
        item &&
        item.fcweb &&
        item.fcweb.dt_agenda &&
        (() => {
          const originalDate = new Date(item.fcweb.dt_agenda);

          const saoPauloOffset = -3 * 60; // Em minutos (UTC-3)

          const currentOffset = originalDate.getTimezoneOffset(); // Em minutos

          const adjustedDate = new Date(
            originalDate.getTime() + (currentOffset - saoPauloOffset) * 60000
          );

          return new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short",
          }).format(adjustedDate);
        })();

      const TypeValid = item.fcweb && item.fcweb.validacao;
      const HoraAgenda = item.fcweb?.hr_agenda?.split("T")[1].split(".")[0];
      const andamento = item.fcweb && item.fcweb.andamento;
      const statusPg = item.fcweb && item.fcweb.estatos_pgto;
      const colors = item.ativo ? "transparent" : "red.400";

    //  const DownTimeInDays = () => {
    //    // Verifica se item e item.dt_solicitacao existem
    //    if (!item || !item.dt_solicitacao) return null;

    //    // Converte dt_solicitacao para o tempo em milissegundos
    //    const dt_solicitacao = new Date(item.dt_solicitacao).getTime();
  
    //    if (item.fcweb?.dt_aprovacao){
    //    }

    //    // Verifica se item.fcweb.dt_aprovacao existe
    //    const dt_aprovacao = item.fcweb?.dt_aprovacao
    //      ? new Date(item.fcweb.dt_aprovacao).getTime()
    //      : Date.now(); // Se não existir, usa a data atual

    //    // Calcula a diferença em milissegundos
    //    const diffInMs = dt_aprovacao - dt_solicitacao;

    //    // Converte a diferença para dias
    //    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    //    return diffInDays;
    //  };

     console.log(item);
      return (
        <Tr key={item.id} bg={colors}>
          <Td>
            <BotoesFunction id={item.id} onUpdate={Update} />
          </Td>
          {user?.hierarquia === "ADM" && <Td>{item.id}</Td>}
          <Td>{item.nome}</Td>
          <Td>
            <Box>{dtAgenda}</Box>
            <Box>{HoraAgenda}</Box>
            <Box>{TypeValid}</Box>
          </Td>
          <Td>{andamento}</Td>
          {/* <Td>{item.ativo && DownTimeInDays()}</Td> */}
          {user?.hierarquia === "ADM" && <Td>{statusPg}</Td>}
          {user?.hierarquia === "CONT" && <Td>{statusPg}</Td>}
          {user?.hierarquia === "ADM" && <Td>{item.fcweb?.valorcd}</Td>}
          {user?.hierarquia === "CONT" && <Td>{item.fcweb?.valorcd}</Td>}
        </Tr>
      );
    });

  return (
    <>
      {user && (
        <Flex
          w={"full"}
          bg={"white"}
          shadow={"md"}
          borderRadius={"15px"}
          p={{ base: "10px", md: "20px" }}
          alignContent={"center"}
          justifyContent={"space-evenly"}
          overflowX={{ base: "auto", md: "hidden" }}
        >
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>FUNÇÕES</Th>
                {user?.hierarquia === "ADM" && <Th>ID</Th>}
                <Th>NOME</Th>
                <Th>AGENDAMENTO</Th>
                <Th>CERTIFICADO</Th>
                {/* <Th>CCA</Th> */}
                {user?.hierarquia !== "USER" && <Th>STATUS PGMNT</Th>}
                {user?.hierarquia !== "USER" && <Th>VALOR</Th>}
              </Tr>
            </Thead>
            <Tbody>{Data.length > 0 && tabela}</Tbody>
            <Tfoot>
              <Flex>{Data.length}</Flex>
            </Tfoot>
          </Table>
        </Flex>
      )}
    </>
  );
};
