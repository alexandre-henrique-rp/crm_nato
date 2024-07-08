import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
   const session = await getServerSession(nextAuthOptions); 
   if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify(body),
      }
    );
    if (!user.ok) {
      return new Response("Invalid credentials", { status: 401 });
    }

    const data = await user.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
