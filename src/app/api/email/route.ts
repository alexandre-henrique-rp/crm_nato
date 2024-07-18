import { NextResponse } from "next/server";
import { EmailHtml } from "./html";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const emailBody = EmailHtml(data.nome);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "redebrasilrp@gmail.com",
        pass: "qhwp rkii sses ezwm"
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const emailOptions: any = {
      from: "redebrasilrp@gmail.com",
      to: data.email,
      subject: `Comfirmação de email`,
      html: emailBody
    };

    const emailResult = await transporter.sendMail(emailOptions); // Adicione "await" aqui

    return NextResponse.json(emailResult, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
