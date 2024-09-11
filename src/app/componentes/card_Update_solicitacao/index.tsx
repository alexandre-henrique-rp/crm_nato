import { CardCreateUpdate } from "@/app/implementes/cardCreateUpdate";
import CardGridRelacionamento from "@/app/implementes/cardCreateUpdate/CardGridRelacionamento";
import { Divider, Flex, SimpleGrid } from "@chakra-ui/react";

type Props = {
  setDadosCard: solictacao.SolicitacaoGetType;
};
export function CardUpdateSolicitacao({ setDadosCard }: Props) {
  async function HandreSubmit(data: FormData) {
    "use server";
    console.log(data);
  }
  
  return (
    <>
      <CardCreateUpdate.Root>
        <CardCreateUpdate.Headers SetDados={setDadosCard} />
        <Divider borderColor="#00713D" my={4} />
        <CardCreateUpdate.Form action={HandreSubmit}>
          <Flex flexDir={{ base: "column", md: "row" }} gap={10} px={4}>
            <CardCreateUpdate.GridCpf
              CpfSolicitacao={setDadosCard}
              w={{ base: "100%", md: "13rem" }}
            />
            <CardCreateUpdate.GridName
              DataSolicitacao={setDadosCard}
              w={{ base: "100%", md: "full" }}
            />
            <CardCreateUpdate.GridDateNasc
              DataSolicitacao={setDadosCard}
              w={{ base: "100%", md: "15rem" }}
            />
          </Flex>
          <Flex flexDir={{ base: "column", md: "row" }} gap={10} px={4}>
            <CardGridRelacionamento
              DataSolicitacao={setDadosCard}
              w={{ base: "100%", md: "15rem" }}
            />
          </Flex>
          <button type="submit">Submit</button>
        </CardCreateUpdate.Form>
      </CardCreateUpdate.Root>
    </>
  );
}
