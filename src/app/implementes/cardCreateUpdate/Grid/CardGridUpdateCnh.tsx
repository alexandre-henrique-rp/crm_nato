import { Box, BoxProps, FormLabel, Text } from "@chakra-ui/react";
import InputUpdateCnh from "../imputs/inputUpdateCnh";

interface CardGridUpdateCnhProps extends BoxProps {
  DataSolicitacao: solictacao.SolicitacaoGetType;
}

export default function CardGridUpdateCnh({
  DataSolicitacao,
  ...props
}: CardGridUpdateCnhProps): JSX.Element {
    const Dados: any = []

    

  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md">
          CNH
        </FormLabel>
        {DataSolicitacao.link_doc && (
          <Text pt={3}>
            {DataSolicitacao.link_doc && DataSolicitacao.link_doc.length > 45
              ? DataSolicitacao.link_doc.slice(0, 45) + "........"
              : DataSolicitacao.link_doc}
          </Text>
        )}
        <InputUpdateCnh onFileUploaded={(data)=> Dados.push(data) } />

      </Box>
    </>
  );
}
