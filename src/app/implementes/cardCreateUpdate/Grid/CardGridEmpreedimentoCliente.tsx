import { Box, BoxProps, FormLabel, Text } from "@chakra-ui/react";
import DropEmpreendimento from "../dropdow/dropEmpreendimento";
import SelectEmpreedimento from "../dropdow/selectEmpreedimento";

interface CardGridEmpreedimentoProps extends BoxProps {
  DataSolicitacao: solictacao.SolicitacaoGetType;
}

export default function CardGridEmpreedimentoCliente({
  DataSolicitacao,
  ...props
}: CardGridEmpreedimentoProps): JSX.Element {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md">
          Empreendimento
        </FormLabel>
        {DataSolicitacao.empreedimento && (
          <Text pt={3}>{DataSolicitacao.empreedimento.nome}</Text>
        )}
        {DataSolicitacao.empreedimento && <DropEmpreendimento id={DataSolicitacao.id} value={DataSolicitacao.empreedimento.id}/>}
        {!DataSolicitacao && <SelectEmpreedimento />}
      </Box>
    </>
  );
}
