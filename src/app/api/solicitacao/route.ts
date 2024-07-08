export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${body.token}`,
        },
        body: JSON.stringify({
          nome: body.nome,
          email: body.email,
          telefone: body.telefone,
          cpf: body.cpf,
          telefone2: body.tel,
          fotos_rg: body.fotos_rg,
          fotos_cnh: body.fotos_cnh,
          construtora: body.construtora,
          empreendimento: body.empreendimento,
          relacionamento: body.relacionamento,
        }),
      }
    );
    if (!user.ok) {
      return new Response("Invalid credentials", { status: 401 });
    }

    const data = await user.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
