import { Box, BoxProps, FormLabel } from "@chakra-ui/react";
import { InputTel1 } from "../imputs/inputTel1";

interface CardGridTel1Props extends BoxProps {
  DataSolicitacao: solictacao.SolicitacaoGetType;
}
export default function CardGridTel1({ DataSolicitacao, ...props }: CardGridTel1Props) {
    return (
      <>
        <Box {...props}>
          <FormLabel fontSize="sm" fontWeight="md">
            Telefone 1
          </FormLabel>
          <InputTel1 SetValue={DataSolicitacao}/>
        </Box>
      </>
    );
}