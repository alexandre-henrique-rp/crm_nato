import { NextResponse } from "next/server";

export default async function GET({ params }: { params: { id: string } }) {
  try {
    const { id } = params;
    console.log("id api",id);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/solicitacao/${id}`;
    const request = await fetch(url);
    if (!request.ok)
      return NextResponse.json(
        { message: "Solicitação não encontrada" },
        { status: 404 }
      );
    const data = await request.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
