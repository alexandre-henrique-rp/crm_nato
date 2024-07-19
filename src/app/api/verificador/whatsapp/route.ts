import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { telefone } = data;
    const req = await fetch(
      `${process.env.NEXT_API_WHATSAPP_URL}/wa-number-check/55${telefone}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": `${process.env.NEXT_API_WHATSAPP_KEY}`,
        },
      }
    );

    const res = await req.json();

    if (req.ok) {
      return NextResponse.json(res, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
