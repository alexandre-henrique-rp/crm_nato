import { Box, BoxProps, FormLabel, Text, Textarea } from "@chakra-ui/react";

interface CardGridUpdateCnhProps extends BoxProps {
  DataSolicitacao?: solictacao.SolicitacaoGetType;
}

export default function CardGridObs({
  DataSolicitacao,
  ...props
}: CardGridUpdateCnhProps) {

  return (
    <Box {...props}>
      <FormLabel fontSize="sm" fontWeight="md">
        Observações
      </FormLabel>
      <Textarea
        value={DataSolicitacao?.obs && DataSolicitacao.obs}
        w={"100%"}
        h={"10rem"}
        readOnly
        resize={"none"}
        name="Obs"
        pt={3}
        boxShadow="lg"
      />
    </Box>
  );
}
