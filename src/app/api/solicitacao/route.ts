export async function POST(request: Request) {
  try {
    const body = await request.json();
console.log(body)
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${body.token}`,
        },
        body: JSON.stringify({
          nome: body.name,
          email: body.email,
          whatsapp: body.whatsapp,
          cpf: body.cpf,
          tel: body.tel,
          construtora: body.construtora,
          empreendimento: body.empreendimento,
          Relacionamento: body.Relacionamento,
        }),
      }
    );

    if (!user.ok) {
      return new Response("Invalid credentials", { status: 401 });
    }

    const data = await user.json();
    console.log(data);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
