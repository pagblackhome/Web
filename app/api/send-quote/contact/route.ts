import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message, phone } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Black Home Web" <${process.env.EMAIL_USER}>`,
      to: "kathy.gsb16@gmail.com",
      subject: "Nuevo mensaje desde formulario Black Home",
      html: `
        <div style="font-family: Arial; padding: 10px;">
          <h2>Nuevo contacto</h2>
          <p><b>Nombre:</b> ${name}</p>
          <p><b>Correo:</b> ${email}</p>
          <p><b>Teléfono:</b> ${phone || "No ingresado"}</p>
          <p><b>Mensaje:</b><br/>${message}</p>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false }, { status: 500 });
  }
}