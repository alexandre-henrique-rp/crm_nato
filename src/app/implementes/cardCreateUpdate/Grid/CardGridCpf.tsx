import { Box, BoxProps, FormLabel, Text } from "@chakra-ui/react";
import InputCpf from "../imputs/inputCpf";

interface CardGridCpfProps extends BoxProps {
  CPF?: string;
}


export default async function CardGridCpf({ CPF, ...props }: CardGridCpfProps) {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md">
          CPF
        </FormLabel>
        {CPF && <Text pt={3}>{CPF}</Text>}
        {!CPF && (
          <InputCpf variant="flushed" setValueCpf={CPF} />
        )}
      </Box>
    </>
  );
}