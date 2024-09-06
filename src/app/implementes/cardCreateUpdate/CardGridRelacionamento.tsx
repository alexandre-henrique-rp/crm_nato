import { Box, BoxProps, FormLabel, chakra, Link, Text } from "@chakra-ui/react";
import { InputRelacionamento } from "./inputRelacionamento";

interface CardGridRelacionamentoProps extends BoxProps {
  DataSolicitacao: solictacao.SolicitacaoGetType;
}

export default function CardGridRelacionamento({
  DataSolicitacao,
  ...props
}: CardGridRelacionamentoProps) {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md">
          Relacionamento
        </FormLabel>
        <InputRelacionamento
        //   name="relacionamento"
          variant="flushed"
          setValueRelacionamento={DataSolicitacao.relacionamento}
        />
      </Box>
    </>
  );
}
