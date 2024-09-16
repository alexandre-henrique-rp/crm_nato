import { Box, BoxProps, FormLabel } from "@chakra-ui/react";
import { InputTel2 } from "../imputs/inputTel2";

interface CardGridTel1Props extends BoxProps {
  DataSolicitacao: string;
  index: number;
}
export default function CardGridTel({
  DataSolicitacao,
  index,
  ...props
}: CardGridTel1Props) {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md">
          Telefone {index > 0 && index}
        </FormLabel>
        <InputTel2 index={index > 0 ? index : 0} SetValue={DataSolicitacao} />
      </Box>
    </>
  );
}