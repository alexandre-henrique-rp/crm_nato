import { NextResponse } from "next/server";

interface DataUser {
  nome: string;
  username: string;
  password: string;
  cpf: string;
  construtora: string[];
  empreendimento: string[];
  email: string;
}

export async function POST(request: Request) {
  try {
    const data: DataUser = await request.json();
console.log(data)
    // const dados: DataUser = {
    //   nome: data.nome,
    //   username: data.username,
    //   email: data.email,
    //   password: data.password,
    //   cpf: data.cpf,
    //   construtora: data.construtora,
    //   empreendimento: data.empreendimento,
    // };

    // const response = await await fetch(`http://localhost:3000/api/auth/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(dados),
    // });
    // const retorno = await response.json();

    // if (retorno.error) throw retorno.error;

    // return NextResponse.json(
    //   {
    //     message: "Registro criado com sucesso",
    //     data: { response: retorno.data },
    //   },
    //   { status: 200 }
    // );

    return NextResponse.json({ message: "Registro criado com sucesso" }, { status: 200 });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
