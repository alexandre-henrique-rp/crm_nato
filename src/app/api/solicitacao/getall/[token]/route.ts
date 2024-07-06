import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string; token: string } }
) {
  try {
    const { token } = params;

    const user = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!user.ok) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }
    const data = await user.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
