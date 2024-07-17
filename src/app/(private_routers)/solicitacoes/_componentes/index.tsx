import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Tooltip,
} from "@chakra-ui/react";

export default function SolicitacaoForm({ onvalue, ishidden }) {
  return (
    <Stack spacing={4} p={4} maxWidth="100%">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <Box>
          <FormLabel>Nome Completo</FormLabel>
          <Input type="text" />
        </Box>
        <Box>
          <FormLabel>Data de Nascimento</FormLabel>
          <Input type="date" />
        </Box>
        <Box>
          <FormLabel>Whatsapp com DDD</FormLabel>
          <Input type="text" />
        </Box>
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        spacing={6}
        mt={6}
        alignItems="end"
      >
        <Box>
          <FormLabel>Whatsapp com DDD 2</FormLabel>
          <Input type="text" />
        </Box>
        <Box>
          <FormLabel>Email</FormLabel>
          <Input type="text" />
        </Box>
        <Box>
          <FormLabel>CPF</FormLabel>
          <Input type="text" />
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={6}>
        <Box>
          <FormLabel>Empreendimento</FormLabel>
          <Select />
        </Box>
        <Box>
          <FormLabel>Construtora</FormLabel>
          <Select />
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={6}>
        <FormControl as={Box} colSpan={[6, 2]}>
          <FormLabel>CNH</FormLabel>
          <Input type="file" />
        </FormControl>
        <FormControl as={Box} colSpan={[6, 2]}>
          <FormLabel>RG</FormLabel>
          <Input type="file" />
        </FormControl>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={6}>
        <Box>
          <FormLabel>Relacionamento</FormLabel>
          <Select />
        </Box>
        <Box>
          <FormLabel>CPF do relacionado</FormLabel>
          <Input type="text" />
        </Box>
        <Box>
          <FormLabel>Voucher</FormLabel>
          <Input type="text" />
        </Box>
      </SimpleGrid>

      <Button
        mt={6}
        variant="outline"
        width="100%"
        maxWidth="250px"
        height="50px"
      >
        CRIAR CONTA
      </Button>
    </Stack>
  );
}
