import { Flex } from "@chakra-ui/react";
import { DadosPessoaisComponent } from "./components/dados-pessoais";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth_confg";

const Requestes = async (id: string) => {
  try {
    const url = `http://189.5.194.55:3031/solicitacao/${id}`;
    const session = await getServerSession(auth);
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      cache: "no-store",
    });
    if (!request.ok) {
      throw new Error("Erro");
    }
    const data = await request.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default async function perfilPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const data = await Requestes(id);

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-evenly"
        pt={10}
        pb={10}
        borderWidth={0}
        overflowX="auto"
        flexDir={{ base: "column", md: "row" }} // Coluna em telas pequenas, linha em telas médias ou maiores
        h={{ base: "auto", md: "100vh" }} // Altura automática em telas pequenas, 100vh em telas maiores
      >
        <DadosPessoaisComponent SetData={data} />
      </Flex>
    </>
  );
}
