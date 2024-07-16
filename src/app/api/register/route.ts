import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { nextAuthOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("🚀 ~ POST ~ data:", data)
    const session = await getServerSession(nextAuthOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error("Erro ao criar o registro");
    };
    const retorno = await response.json();

    return NextResponse.json(
      {
        message: "Registro criado com sucesso",
        data: { response: retorno.data },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
