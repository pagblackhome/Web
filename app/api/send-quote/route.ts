import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type Item = {
  type: string;
  qty: number;
  width: number;
  height: number;
};

const curtainPrices: Record<string, number> = {
  Blackout: 24000,
  Sunscreen: 25000,
};

export async function POST(req: Request) {
  try {
    const { client, items, total } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "mail.blackhome.cl",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const rows = (items as Item[])
      .map((item) => {
        const area = item.width * item.height;

        const price =
          curtainPrices[item.type] || 0;

        const subtotal =
          area * price * item.qty;

        return `
          <tr>
            <td style="padding:10px;border:1px solid #ddd;">
              ${item.type}
            </td>

            <td style="padding:10px;border:1px solid #ddd;text-align:center;">
              ${item.qty}
            </td>

            <td style="padding:10px;border:1px solid #ddd;text-align:center;">
              ${area.toFixed(2)} m²
            </td>

            <td style="padding:10px;border:1px solid #ddd;text-align:right;">
              $${subtotal.toLocaleString("es-CL")}
            </td>
          </tr>
        `;
      })
      .join("");

    const adminHtml = `
      <div style="font-family:Arial,sans-serif;padding:20px;max-width:800px">

        <h1 style="color:#000;">
          Nueva Cotización Black Home
        </h1>

        <hr>

        <h2>Datos del Cliente</h2>

        <p>
          <strong>Nombre:</strong>
          ${client.name} ${client.lastname}
        </p>

        <p>
          <strong>Correo:</strong>
          ${client.email}
        </p>

        <p>
          <strong>Teléfono:</strong>
          ${client.phone}
        </p>

        <p>
          <strong>Dirección:</strong>
          ${client.address}
        </p>

        <p>
          <strong>Región:</strong>
          ${client.region}
        </p>

        <p>
          <strong>Comuna:</strong>
          ${client.comuna}
        </p>

        <br>

        <h2>Detalle Cotización</h2>

        <table
          style="
            width:100%;
            border-collapse:collapse;
            margin-top:10px;
          "
        >
          <thead>
            <tr style="background:#000;color:white;">
              <th style="padding:10px;">Producto</th>
              <th style="padding:10px;">Cantidad</th>
              <th style="padding:10px;">Área</th>
              <th style="padding:10px;">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            ${rows}
          </tbody>
        </table>

        <h2 style="margin-top:25px;">
          Total:
          $${Number(total).toLocaleString("es-CL")}
        </h2>

      </div>
    `;

    const clientHtml = `
      <div style="font-family:Arial,sans-serif;padding:20px;max-width:800px">

        <h1 style="color:#000;">
          Gracias por cotizar con Black Home
        </h1>

        <p>
          Hola ${client.name},
        </p>

        <p>
          Hemos recibido correctamente tu solicitud
          de cotización.
        </p>

        <p>
          Nuestro equipo revisará la información
          y se pondrá en contacto contigo.
        </p>

        <br>

        <table
          style="
            width:100%;
            border-collapse:collapse;
            margin-top:10px;
          "
        >
          <thead>
            <tr style="background:#000;color:white;">
              <th style="padding:10px;">Producto</th>
              <th style="padding:10px;">Cantidad</th>
              <th style="padding:10px;">Área</th>
              <th style="padding:10px;">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            ${rows}
          </tbody>
        </table>

        <h2 style="margin-top:25px;">
          Total estimado:
          $${Number(total).toLocaleString("es-CL")}
        </h2>

        <p style="margin-top:30px;">
          Atentamente,
          <br>
          <strong>Black Home</strong>
          <br>
          Diseño y Decoración
        </p>

      </div>
    `;

    await transporter.sendMail({
      from: `"Black Home" <${process.env.EMAIL_USER}>`,
      to: "kathy.gsb16@gmail.com",
      subject: "Nueva Cotización Black Home",
      html: adminHtml,
    });

    if (client.email) {
      await transporter.sendMail({
        from: `"Black Home" <${process.env.EMAIL_USER}>`,
        to: client.email,
        subject: "Recibimos tu cotización",
        html: clientHtml,
      });
    }

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