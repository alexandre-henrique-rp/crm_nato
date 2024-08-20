import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth_confg";


export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sms = searchParams.get("sms");
    const vendedor = searchParams.get("vendedor");
    const body = await request.json();
    const session = await getServerSession(auth);
    if (!session) {
      return new Response("Unauthorized2", { status: 401 });
    }
    const Msg = `Ola *${body.nome}*, tudo bem?!\n\nSomos a *Rede Brasil RP*, e à pedido de ${session.user.hierarquia === "ADM" ? vendedor : session.user.name} estamos entrando em contato referente ao seu novo empreendimento.\nPrecisamos fazer o seu certificado digital para que você possa assinar o contrato e assim prosseguir para a próxima etapa.\n\nPara mais informações, responda essa mensagem, ou aguarde segundo contato.`;


    // if (sms == "true") {
    //   if (body.telefone) {
    //     await SendWhatsapp(body.telefone, Msg);
    //   }
    //   if (body.telefone2) {
    //     await SendWhatsapp(body.telefone2, Msg);
    //   }
    // }

    const user = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.token}`
        },
        body: JSON.stringify(body)
      }
    );

    const data = await user.json();

    if (!user.ok) {
      return new Response("Invalid credentials", { status: 401 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}

const SendWhatsapp = async (number: string, message: string) => {
  try {
    const response = await fetch(
      `https://api.inovstar.com/core/v2/api/chats/create-new`,

      {
        headers: {
          "access-token": `${process.env.NEXT_API_WHATSAPP_KEY}`,
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          number: '55' + number,
          message: message,
          sectorId: "60de0c8bb0012f1e6ac55473",
        },),
      }
    );
    console.log(await response.json());
    return await response.json();
  } catch (error) {
    console.log("error send sms", error);
    // throw error;
  }
}