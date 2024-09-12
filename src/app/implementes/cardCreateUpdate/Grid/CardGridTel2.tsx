import { Box, BoxProps, FormLabel } from "@chakra-ui/react";
import { InputTel2 } from "../imputs/inputTel2";

interface CardGridTel1Props extends BoxProps {
  DataSolicitacao: solictacao.SolicitacaoGetType;
}
export default function CardGridTel2({
  DataSolicitacao,
  ...props
}: CardGridTel1Props) {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md">
          Telefone 1
        </FormLabel>
        <InputTel2 SetValue={DataSolicitacao} />
      </Box>
    </>
  );
}
