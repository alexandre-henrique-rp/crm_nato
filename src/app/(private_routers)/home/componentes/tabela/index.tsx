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
  Select,
  IconButton,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import { BotoesFunction } from "../botoes/bt_group_function";
import { ImClock } from "react-icons/im";
import { IoIosArrowForward } from "react-icons/io";

interface TabelaProps {
  ClientData: solictacao.SolicitacaoGetType[];
  total: number | null;
  Pages: any;
  AtualPage: number;
}

export const Tabela = ({ ClientData, total, Pages , AtualPage}: TabelaProps) => {
  const [data, setData] = useState<solictacao.SolicitacaoGetType[]>([]);
  const [DataNull, setDataNull] = useState(false);
  const [SelectPage, setSelectPage] = useState(1);
  const { data: session } = useSession();
  const user = session?.user;
  useEffect(() => {
    if (ClientData.length > 0) {
      setDataNull(true);
    }
    setData(ClientData);
    setSelectPage(AtualPage);
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
    const ano = item.fcweb?.dt_agenda?.split("-")[0];
    const mes = item.fcweb?.dt_agenda?.split("-")[1];
    const diaBruto = item.fcweb?.dt_agenda?.split("-")[2];
    const dia = diaBruto?.split("T")[0];

    const dtAgenda = item.fcweb?.dt_agenda ? `${dia}/${mes}/${ano}` : null;

    const horaAgenda = item.fcweb?.hr_agenda?.split("T")[1].split(".")[0];
    const andamento = item.fcweb?.andamento;
    const statusPg = item.fcweb?.estatos_pgto;
    const colors = !item.ativo
      ? "red.400"
      : item.distrato && user?.hierarquia === "ADM"
      ? "gray.600"
      : item.distrato && user?.hierarquia === "CONST"
      ? "gray.600"
      : item.distrato && user?.hierarquia === "GRT"
      ? "gray.600"
      : "transparent";

    const fontColor =
      colors === "red.400"
        ? "white"
        : colors === "gray.600"
        ? "white"
        : "black";

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
 
const OptionsSelect = () => {
  if (!total || !data.length) return null; // Verifica se total e data.length existem

  const TotalPages = Math.ceil(total / data.length);
  // Armazena as opções em um array
  const options = [];
  for (let i = 1; i <= TotalPages; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  // Retorna as opções acumuladas
  return options;
};


  return (
    <>
      <Suspense fallback={<Text>Carregando...</Text>}>
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
            {DataNull ? (
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
                    <Td>
                      Total de registros: {total} / {data.length}
                    </Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td>paginas:</Td>
                    <Td>
                      <Select
                        size={"xs"}
                        borderRadius={"5px"}
                        value={SelectPage}
                        onChange={(e) => {
                          setSelectPage(Number(e.target.value));
                        }}
                      >
                        <OptionsSelect />
                      </Select>
                    </Td>
                    <Td>
                      <IconButton
                        icon={<IoIosArrowForward />}
                        size={"xs"}
                        colorScheme="green"
                        aria-label={""}
                        onClick={() => Pages(SelectPage)}
                      />
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
      </Suspense>
    </>
  );
};
