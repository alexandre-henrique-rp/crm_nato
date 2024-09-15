import { Box, BoxProps, FormLabel, Input } from "@chakra-ui/react";

interface CardGridDateNascimento extends BoxProps {
  DataSolicitacao: solictacao.SolicitacaoGetType;
}

export default function CardGridDateNascimento({
  DataSolicitacao,
  ...props
}: CardGridDateNascimento) {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md">
          Data de Nascimento
        </FormLabel>
        <Input
          type="date"
          name="DataNascimento"
          variant="flushed"
          value={
            DataSolicitacao?.dt_nascimento &&
            DataSolicitacao?.dt_nascimento.split("T")[0]
          }
        />
      </Box>
    </>
  );
}
