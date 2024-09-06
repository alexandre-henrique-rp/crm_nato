import { auth } from "@/lib/auth_confg";
import { Box, BoxProps, FormLabel, Text } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import InputCpf from "./inputCpf";

interface CardGridCpfProps extends BoxProps {
  CpfSolicitacao: solictacao.SolicitacaoGetType;
}


export default async function CardGridCpf({ CpfSolicitacao, ...props }: CardGridCpfProps) {
  const session = await getServerSession(auth);
  const user = session?.user;
  const input = user?.hierarquia;
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md">
          CPF
        </FormLabel>
        {input === "USER" && <Text pt={3}>{CpfSolicitacao.cpf}</Text>}
        {input !== "USER" && (
          <InputCpf
            variant="flushed"
            setValueCpf={CpfSolicitacao.cpf}
            name="cpf"
          />
        )}
      </Box>
    </>
  );
}