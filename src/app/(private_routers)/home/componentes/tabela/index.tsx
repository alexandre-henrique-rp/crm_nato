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
  Text,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BotoesFunction } from "../botoes/bt_group_function";
import { ImClock } from "react-icons/im";

interface TabelaProps {
  ClientData: solictacao.SolicitacaoGetType[];
}

export const Tabela = ({ ClientData }: TabelaProps) => {
  const [data, setData] = useState<solictacao.SolicitacaoGetType[]>([]);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
      setData(ClientData);
  }, [ClientData]);

  const update = async (id: number) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const downTimeInDays = (item: solictacao.SolicitacaoGetType) => {
    if (!item || !item.dt_solicitacao) return null;

    const dtSolicitacao = new Date(item.dt_solicitacao).getTime();
    const dtAprovacao = item.fcweb?.dt_aprovacao
      ? new Date(item.fcweb.dt_aprovacao).getTime()
      : Date.now();

    const diffInMs = dtAprovacao - dtSolicitacao;
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  };

  const tabela = data.map((item) => {
    const dtAgenda = item.fcweb?.dt_agenda
      ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(
          new Date(
            new Date(item.fcweb.dt_agenda).getTime() +
              (new Date().getTimezoneOffset() - 3 * 60) * 60000
          )
        )
      : null;

    const horaAgenda = item.fcweb?.hr_agenda?.split("T")[1].split(".")[0];
    const andamento = item.fcweb?.andamento;
    const statusPg = item.fcweb?.estatos_pgto;
    const colors = !item.ativo
      ? "red.400"
      : item.distrato && user?.hierarquia === "ADM"
      ? "gray.600"
      : "transparent";

    const fontColor = colors === "red.400" ? "white" : colors === "gray.600" ? "white" : "black";


    return (
      <Tr key={item.id} bg={colors} color={fontColor}>
        <Td>
          <BotoesFunction
            id={item.id}
            onUpdate={update}
            distrato={item.distrato ? true : false}
            exclude={!item.ativo ? true : false}
          />
        </Td>
        <Td>{item.id}</Td>
        <Td>{item.nome}</Td>
        <Td>
          <Box>{dtAgenda}</Box>
          <Box>{horaAgenda}</Box>
          <Box>{item.fcweb?.validacao}</Box>
        </Td>
        <Td>{andamento}</Td>
        <Td>{item.ativo && downTimeInDays(item)}</Td>
        {user?.hierarquia === "ADM" && (
          <>
            <Td>{statusPg}</Td>
            <Td>{item.fcweb?.valorcd}</Td>
          </>
        )}
        {user?.hierarquia === "CONT" && (
          <>
            <Td>{statusPg}</Td>
            <Td>{item.fcweb?.valorcd}</Td>
          </>
        )}
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
          {data.length > 0 ? (
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>FUNÇÕES</Th>
                  <Th>ID</Th>
                  <Th>NOME</Th>
                  <Th>AGENDAMENTO</Th>
                  <Th>CERTIFICADO</Th>
                  <Th fontSize={"20px"}>
                    <ImClock />
                  </Th>
                  {user?.hierarquia === "CONT" && (
                    <>
                      <Th>STATUS PG</Th>
                      <Th>VALOR</Th>
                    </>
                  )}
                  {user?.hierarquia === "ADM" && (
                    <>
                      <Th>STATUS PG</Th>
                      <Th>VALOR</Th>
                    </>
                  )}
                </Tr>
              </Thead>
              <Tbody>{tabela}</Tbody>
              <Tfoot>
                <Tr>
                  <Td colSpan={user?.hierarquia !== "USER" ? 8 : 6}>
                    Total de registros: {data.length}
                  </Td>
                </Tr>
              </Tfoot>
            </Table>
          ) : (
            <Text fontSize="lg" color="red.500">
              Nenhum registro encontrado.
            </Text>
          )}
        </Flex>
      )}
    </>
  );
};
