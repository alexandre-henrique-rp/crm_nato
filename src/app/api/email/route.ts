import { NextResponse } from "next/server";
import { EmailHtml } from "./html";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const emailBody = EmailHtml(data.nome);

    const transporter = nodemailer.createTransport({
      host: "smtpi.kinghost.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.LOGIN_EMAIL,
        pass: process.env.PASS_EMAIL,
      },
      tls: { rejectUnauthorized: false },
    });

    const emailOptions: any = {
      from: process.env.LOGIN_EMAIL,
      to: data.email,
      subject: `Confirmação de email`,
      html: emailBody.emailcorpo,
    };

    await transporter.sendMail(emailOptions); // Adicione "await" aqui

    console.log("🚀 ~ POST ~ emailBody:", emailBody.codigo)
    return NextResponse.json(emailBody.codigo, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
    return NextResponse.json(error, { status: 500 });
  }
}
