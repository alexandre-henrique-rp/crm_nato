import { Box, BoxProps, FormLabel } from "@chakra-ui/react";
import { InputRegisterTel } from "../imputs/inputRegisterTel";

interface CardGridTel1Props extends BoxProps {
  index: number;
}
export default function CardGridRegisterTel({
  index,
  ...props
}: CardGridTel1Props) {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md">
          Telefone {index > 0 && index}
        </FormLabel>
        <InputRegisterTel index={index > 0 ? index : 0} />
      </Box>
    </>
  );
}
