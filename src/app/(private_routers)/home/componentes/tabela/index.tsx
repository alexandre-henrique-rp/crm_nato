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
  Icon,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import { BotoesFunction } from "../botoes/bt_group_function";
import { ImClock } from "react-icons/im";
import { IoIosArrowForward } from "react-icons/io";
import { FaFileSignature } from "react-icons/fa6";

interface TabelaProps {
  ClientData: solictacao.SolicitacaoGetType[];
  total: number | null;
  AtualPage: number;
  SetVewPage: (page: number) => any;
}

export function Tabela({
  ClientData,
  total,
  AtualPage,
  SetVewPage,
}: TabelaProps) {
  const [SelectPage, setSelectPage] = useState(1);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    setSelectPage(AtualPage);
  }, [AtualPage]);

  const downTimeInDays = (item: solictacao.SolicitacaoGetType) => {
    if (!item || !item.dt_solicitacao) return null;

    const dtSolicitacao = new Date(item.dt_solicitacao).getTime();
    const dtAprovacao = item.dt_aprovacao
      ? new Date(item.dt_aprovacao).getTime()
      : Date.now();

    const diffInMs = dtAprovacao - dtSolicitacao;
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  };

  const tabela = ClientData.map((item) => {
    const ano = item.dt_agendamento?.split("-")[0];
    const mes = item.dt_agendamento?.split("-")[1];
    const diaBruto = item.dt_agendamento?.split("-")[2];
    const dia = diaBruto?.split("T")[0];

    const dtAgenda = item.dt_agendamento ? `${dia}/${mes}/${ano}` : null;

    const horaAgenda = item.hr_agendamento?.split("T")[1].split(".")[0];
    const andamento = item.Andamento;
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

    const regexAssinado = new RegExp("\\bAssinado\\b");
    const AssDocAss = regexAssinado.test(item.ass_doc);

    const regexExpirado = new RegExp("\\bexpirado\\b");
    const AssDocExp = regexExpirado.test(item.ass_doc);

    return (
      <Tr key={item.id} bg={colors} color={fontColor}>
        <Td>
          <BotoesFunction
            id={item.id}
            distrato={item.distrato ? true : false}
            exclude={!item.ativo ? true : false}
          />
        </Td>
        <Td>{item.id}</Td>
        <Td>{item.nome}</Td>
        <Td>
          <Box>{dtAgenda}</Box>
          <Box>{horaAgenda}</Box>
          <Box>{item.type_validacao}</Box>
        </Td>
        <Td>{andamento}</Td>
        <Td>{item.ativo && downTimeInDays(item)}</Td>
        <Td textAlign={"center"}>
          {AssDocAss && item.ativo && !item.distrato && (
            <Icon
              as={FaFileSignature}
              color={"green.500"}
              fontSize={"1.75rem"}
            />
          )}
          {AssDocExp && item.ativo && !item.distrato && (
            <Icon as={FaFileSignature} color={"red.500"} fontSize={"1.75rem"} />
          )}
          {!AssDocAss &&
            !AssDocExp &&
            item.ativo &&
            !item.distrato &&
            item.link_doc && (
              <Icon
                as={FaFileSignature}
                color={"gray.300"}
                fontSize={"1.75rem"}
              />
            )}
        </Td>
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
    if (!total || !ClientData.length) return null; // Verifica se total e ClientData.length existem
    const TotalPages = Math.ceil(total / ClientData.length);
    const options = [];
    for (let i = 1; i <= TotalPages; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

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
                <Th>ID</Th>
                <Th>NOME</Th>
                <Th>AGENDAMENTO</Th>
                <Th>CERTIFICADO</Th>
                <Th fontSize={"20px"}>
                  <ImClock />
                </Th>
                <Th>ASSINATURA</Th>
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
                  Total de registros: {total} / {ClientData.length}
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
                    name="SelectedPage"
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
                    onClick={() => SetVewPage(SelectPage)}
                  />
                </Td>
              </Tr>
            </Tfoot>
          </Table>
        </Flex>
      )}
    </>
  );
}
