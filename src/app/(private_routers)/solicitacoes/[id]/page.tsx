import { Flex } from "@chakra-ui/react";
import { DadosPessoaisComponent } from "./components/dados-pessoais";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";

const Requestes = async (id: string) => {
  try {
    const url = `http://189.5.194.55:3031/solicitacao/${id}`;
    const session = await getServerSession(nextAuthOptions);
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`
      }
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
  params
}: {
  params: { id: string };
}) {
  const { id } = params;

  const data = await Requestes(id );

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-evenly"
        pt={10}
        pb={10}
        borderWidth={0}
        overflowX="auto"
        flexDir={"column"}
      >
        < DadosPessoaisComponent SetData={data}/>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Flex>
    </>
  );
}
