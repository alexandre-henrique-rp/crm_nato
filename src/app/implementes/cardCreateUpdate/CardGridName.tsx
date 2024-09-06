import { Box, BoxProps, FormLabel, GridItem } from "@chakra-ui/react";
import InputName from "./inputName";


interface CardGridNameProps extends BoxProps {
  DataSolicitacao: solictacao.SolicitacaoGetType;
};

export default function CardGridName({ DataSolicitacao, ...props }: CardGridNameProps) {
    return (
      <>
        <Box {...props}>
          <FormLabel fontSize="sm" fontWeight="md">
            Nome Completo
          </FormLabel>
          <InputName
            name="nome"
            variant="flushed"
            setValueName={DataSolicitacao.nome}
          />
        </Box>
      </>
    );
}