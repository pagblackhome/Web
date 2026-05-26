import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { client, items, total } = data;

    const transporter = nodemailer.createTransport({
      host: "mail.blackhome.cl",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // CORREO PARA TI
    await transporter.sendMail({
      from: `"Black Home" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Nueva cotización recibida",
      html: `
        <h2>Nueva cotización</h2>

        <p><b>Cliente:</b> ${client.name} ${client.lastname}</p>
        <p><b>Correo:</b> ${client.email}</p>
        <p><b>Teléfono:</b> ${client.phone}</p>

        <h3>Total:</h3>
        <p>$${Number(total).toLocaleString("es-CL")}</p>
      `,
    });

    // CORREO PARA CLIENTE
    await transporter.sendMail({
      from: `"Black Home" <${process.env.EMAIL_USER}>`,
      to: client.email,
      subject: "Recibimos tu cotización",
      html: `
        <h2>Gracias por cotizar con Black Home</h2>

        <p>Hola ${client.name}, recibimos tu solicitud correctamente.</p>

        <p>Pronto te contactaremos.</p>

        <h3>Total estimado:</h3>

        <p>$${Number(total).toLocaleString("es-CL")}</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Error enviando correo",
      },
      {
        status: 500,
      }
    );
  }
}