import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const session = await getServerSession(auth);

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const reqest = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/user/update/pass2/${id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.token}`,
                },
            }
        );

        const data = await reqest.json();
  
        if (!reqest.ok) {
            return new NextResponse("Invalid credentials", { status: 401 });
        }
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}