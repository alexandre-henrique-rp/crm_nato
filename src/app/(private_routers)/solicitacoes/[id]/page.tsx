import { Flex } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth_confg";
import { revalidateTag } from "next/cache";
import { CardUpdateSolicitacao } from "@/app/componentes/card_Update_solicitacao";
import CardListAlertCliente from "@/app/componentes/card_list_alert_cliente";

const Requestes = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao/${id}`;
    const session = await getServerSession(auth);
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      cache: "no-store",
      next: {
        tags: ["get_solicitacao_id"],
      },

      // para atualizar essa requisição utilize o método -revalidateTag()- passando o nome da tag e o nome da requisição (ex:  "revalidateTag('get_solicitacao_id')")
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

const RequestAlert = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/alerts/get/cadastro/${id}`;
    const session = await getServerSession(auth);
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      cache: "no-store",
      next: {
        tags: ["get_Alert"],
      },
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
}

export default async function perfilPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const data = await Requestes(id);
  const dataAlert = await RequestAlert(id);


  return (
    <Flex
      alignItems={{ base: "center", md: "start" }}
      justifyContent={{ base: "center", md: "space-evenly" }}
      pt={{ base: 5, md: 10 }}
      pb={{ base: 5, md: 10 }}
      borderWidth={{ base: 0, md: 1 }}
      overflowX="auto"
      flexDir={"column"}
      gap={{ base: 5, md: 10 }}
    >
      <Flex w={"100%"} alignItems="center" flexDir="column" minH="100vh" p={4}>
        <CardUpdateSolicitacao setDadosCard={data} />
        <CardListAlertCliente Id={Number(id)} DataAlert={dataAlert} />
      </Flex>
    </Flex>
  );
}
