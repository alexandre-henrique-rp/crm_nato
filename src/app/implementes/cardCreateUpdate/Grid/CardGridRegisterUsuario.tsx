import { Box, BoxProps, FormLabel, GridItem } from "@chakra-ui/react";
import InputUser from "../imputs/imputUsuario";

interface CardGridUsuarioProps extends BoxProps {
  Usuario?: string;
}

export default function CardGridUsuario({ Usuario, ...props }: CardGridUsuarioProps) {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md">
          Usuario
        </FormLabel>
        <InputUser name="usuario" variant="flushed" setValueUser={Usuario} />
      </Box>
    </>
  );
}
