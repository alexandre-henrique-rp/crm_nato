import { CardCreateUpdate } from "@/app/implementes/cardCreateUpdate";
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
          <Flex flexDir={"column"} gap={6}>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              gap={10}
              px={4}
              justifyContent={{ base: "center", md: "space-between" }}
            >
              <CardCreateUpdate.GridCpf
                CpfSolicitacao={setDadosCard}
                w={{ base: "100%", md: "13rem" }}
              />
              <CardCreateUpdate.GridName
                DataSolicitacao={setDadosCard}
                w={{ base: "100%", md: "30rem" }}
              />
              <CardCreateUpdate.GridDateNasc
                DataSolicitacao={setDadosCard}
                w={{ base: "100%", md: "15rem" }}
              />
            </Flex>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              gap={10}
              px={4}
              justifyContent={{ base: "center", md: "space-between" }}
            >
              <CardCreateUpdate.GridRelacionamento
                DataSolicitacao={setDadosCard}
                w={{ base: "100%", md: "15rem" }}
              />
              <CardCreateUpdate.GridTel
                index={1}
                DataSolicitacao={setDadosCard.telefone}
                w={{ base: "100%", md: "15rem" }}
              />
              <CardCreateUpdate.GridTel
                index={2}
                DataSolicitacao={setDadosCard.telefone2}
                w={{ base: "100%", md: "15rem" }}
              />
            </Flex>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              gap={10}
              px={4}
              justifyContent={{ base: "center", md: "space-between" }}
            >
              <CardCreateUpdate.GridEmail
                type="register"
                DataSolicitacao={setDadosCard}
                w={{ base: "100%", md: "25rem" }}
              />
              <CardCreateUpdate.GridConstrutora
                DataSolicitacao={setDadosCard}
                w={{ base: "100%", md: "15rem" }}
              />
              <CardCreateUpdate.GridTel
                index={2}
                DataSolicitacao={setDadosCard.telefone2}
                w={{ base: "100%", md: "15rem" }}
              />
            </Flex>
          </Flex>
          <button type="submit">Submit</button>
        </CardCreateUpdate.Form>
      </CardCreateUpdate.Root>
    </>
  );
}
