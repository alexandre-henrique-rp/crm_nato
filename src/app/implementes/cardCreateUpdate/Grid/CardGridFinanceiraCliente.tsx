import { Box, BoxProps, FormLabel, Text } from "@chakra-ui/react";
import DropFinanceiro from "../dropdow/dropFinanceiro";
import SelectFinanceiro from "../dropdow/selectfinanceiro";

interface CardGridFinanceiraProps extends BoxProps {
  DataSolicitacao: solictacao.SolicitacaoGetType;
}

export default function CardGridFinanceiraCliente({
  DataSolicitacao,
  ...props
}: CardGridFinanceiraProps): JSX.Element {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md">
          Financeira
        </FormLabel>
        {DataSolicitacao.empreedimento && (
          <Text pt={3}>{DataSolicitacao.financeiro.fantasia}</Text>
        )}
        {DataSolicitacao.empreedimento && <DropFinanceiro value={DataSolicitacao.financeiro.id} />}
        {!DataSolicitacao && <SelectFinanceiro />}
      </Box>
    </>
  );
}
