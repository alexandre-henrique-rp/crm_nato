import { Box, BoxProps, FormLabel, Text } from "@chakra-ui/react";
import DropFinanceiro from "../dropdow/dropFinanceiro";
import SelectFinanceiro from "../dropdow/selectfinanceiro";
import UserCompraProvider from "@/provider/UserCompra";

interface CardGridFinanceiraProps extends BoxProps {
  DataSolicitacao: solictacao.SolicitacaoGetType;
}

export default function CardGridFinanceiraCliente({
  DataSolicitacao,
  ...props
}: CardGridFinanceiraProps): JSX.Element {
  console.log("financeiro", DataSolicitacao);
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md" m={0}>
          Financeira
        </FormLabel>
        {DataSolicitacao.financeiro?.fantasia && (
          <Text>{DataSolicitacao.financeiro.fantasia}</Text>
        )}
        {DataSolicitacao.financeiro?.id && (
          <DropFinanceiro
            value={DataSolicitacao.financeiro.id}
            Id={DataSolicitacao.id}
          />
        )}
        {!DataSolicitacao.financeiro && <SelectFinanceiro />}
      </Box>
    </>
  );
}
