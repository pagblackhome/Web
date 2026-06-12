import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

type Item = {
  type: string;
  qty: number;
  width: number;
  height: number;
};

type Client = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  region: string;
  comuna: string;
};

const curtainPrices: Record<string, number> = {
  Blackout: 24000,
  Sunscreen: 25000,
};
function drawSectionTitle(
  page: any,
  title: string,
  x: number,
  y: number,
  font: any
) 
{
  page.drawRectangle({
    x,
    y: y - 6,
    width: 510,
    height: 26,
    color: rgb(0.95, 0.95, 0.95),
  });

  page.drawText(title, {
    x: x + 10,
    y,
    size: 12,
    font,
  });
}
async function generatePdf(
  client: Client,
  items: Item[],
  total: number,
  quoteNumber: string
) {
  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage([595, 842]);

  const { height } = page.getSize();

  const font = await pdfDoc.embedFont(
    StandardFonts.Helvetica
  );

  const logoPath = path.join(
    process.cwd(),
    "public",
    "images",
    "cotizacion.png"
  );

  const logoBytes = fs.readFileSync(
    logoPath
  );

  const logoImage =
    await pdfDoc.embedPng(logoBytes);

  const logoDims =
    logoImage.scale(0.18);

  page.drawImage(logoImage, {
    x: 40,
    y: height - 140,
    width: logoDims.width,
    height: logoDims.height,
  });

  page.drawText("BLACK HOME", {
    x: 220,
    y: height - 70,
    size: 24,
    font,
  });

  page.drawText("Diseño y Decoración", {
    x: 220,
    y: height - 95,
    size: 12,
    font,
  });

  page.drawText(
    "Teléfono: +56 9 XXXX XXXX",
    {
      x: 220,
      y: height - 115,
      size: 10,
      font,
    }
  );

  page.drawText(
    "Email: contacto@blackhome.cl",
    {
      x: 220,
      y: height - 130,
      size: 10,
      font,
    }
  );

  page.drawText(
    `Cotización Nº ${quoteNumber}`,
    {
      x: 40,
      y: height - 180,
      size: 14,
      font,
    }
  );

  page.drawText(
    `Fecha: ${new Date().toLocaleDateString(
      "es-CL"
    )}`,
    {
      x: 350,
      y: height - 180,
      size: 12,
      font,
    }
  );

  let y = height - 220;

  page.drawRectangle({
    x: 40,
    y: y - 10,
    width: 510,
    height: 28,
    color: rgb(0.9, 0.9, 0.9),
  });

  page.drawText("DATOS CLIENTE", {
    x: 50,
    y,
    size: 12,
    font,
  });

  y -= 35;

  const clientData = [
    `Nombre: ${client.name} ${client.lastname}`,
    `Email: ${client.email}`,
    `Teléfono: ${client.phone}`,
    `Dirección: ${client.address}`,
    `Región: ${client.region}`,
    `Comuna: ${client.comuna}`,
  ];

  clientData.forEach((line) => {
    page.drawText(line, {
      x: 50,
      y,
      size: 11,
      font,
    });

    y -= 18;
  });

  y -= 20;

  page.drawRectangle({
    x: 40,
    y: y - 10,
    width: 510,
    height: 28,
    color: rgb(0.9, 0.9, 0.9),
  });

  page.drawText(
    "DETALLE DE PRODUCTOS",
    {
      x: 50,
      y,
      size: 12,
      font,
    }
  );

  y -= 35;

  page.drawRectangle({
    x: 40,
    y: y - 5,
    width: 510,
    height: 20,
    color: rgb(0.95, 0.95, 0.95),
  });

  page.drawText("Producto", {
    x: 50,
    y,
    size: 10,
    font,
  });

  page.drawText("Cant.", {
    x: 220,
    y,
    size: 10,
    font,
  });

  page.drawText("Área", {
    x: 290,
    y,
    size: 10,
    font,
  });

  page.drawText("Subtotal", {
    x: 430,
    y,
    size: 10,
    font,
  });

  y -= 25;

  items.forEach((item) => {
    const area =
      item.width * item.height;

    const price =
      curtainPrices[item.type] || 0;

    const subtotal =
      area * price * item.qty;

    page.drawText(item.type, {
      x: 50,
      y,
      size: 10,
      font,
    });

    page.drawText(
      String(item.qty),
      {
        x: 225,
        y,
        size: 10,
        font,
      }
    );

    page.drawText(
      `${area.toFixed(2)} m²`,
      {
        x: 290,
        y,
        size: 10,
        font,
      }
    );

    page.drawText(
      `$${subtotal.toLocaleString(
        "es-CL"
      )}`,
      {
        x: 430,
        y,
        size: 10,
        font,
      }
    );

    y -= 20;
  });

  y -= 30;

  page.drawLine({
    start: { x: 40, y },
    end: { x: 550, y },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });

  y -= 25;

  page.drawText(
    `TOTAL: $${Number(
      total
    ).toLocaleString("es-CL")}`,
    {
      x: 330,
      y,
      size: 16,
      font,
    }
  );

  y -= 50;

  page.drawText(
    "Gracias por preferir Black Home",
    {
      x: 40,
      y,
      size: 11,
      font,
    }
  );

  return Buffer.from(
    await pdfDoc.save()
  );
}
export async function POST(req: Request) {
  try {
    const body = await req.json();

console.log(
  "BODY RECIBIDO:",
  JSON.stringify(body, null, 2)
);

const { client, items, total } = body;

    if (
      !client ||
      !client.name ||
      !client.lastname ||
      !client.email ||
      !client.phone ||
      !client.address ||
      !client.region ||
      !client.comuna ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      total == null
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Datos incompletos",
        },
        {
          status: 400,
        }
      );
    }

    const now = new Date();

    const quoteNumber = `BH-${now.getFullYear()}${String(
      now.getMonth() + 1
    ).padStart(2, "0")}${String(
      now.getDate()
    ).padStart(2, "0")}-${String(
      now.getHours()
    ).padStart(2, "0")}${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    const pdfBuffer =
      await generatePdf(
        client,
        items,
        total,
        quoteNumber
      );

    const rows = (
      items as Item[]
    )
      .map((item) => {
        const area =
          item.width * item.height;

        const price =
          curtainPrices[item.type] ||
          0;

        const subtotal =
          area *
          price *
          item.qty;

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
              $${subtotal.toLocaleString(
                "es-CL"
              )}
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

        <p>
          <strong>N° Cotización:</strong>
          ${quoteNumber}
        </p>

        <hr>

        <h2>Datos del Cliente</h2>

        <p>
          <strong>Nombre:</strong>
          ${client.name}
          ${client.lastname}
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

        <h2>
          Detalle Cotización
        </h2>

        <table
          style="
            width:100%;
            border-collapse:collapse;
            margin-top:10px;
          "
        >
          <thead>
            <tr style="background:#000;color:#fff;">
              <th style="padding:10px;">
                Producto
              </th>
              <th style="padding:10px;">
                Cantidad
              </th>
              <th style="padding:10px;">
                Área
              </th>
              <th style="padding:10px;">
                Subtotal
              </th>
            </tr>
          </thead>

          <tbody>
            ${rows}
          </tbody>
        </table>

        <h2 style="margin-top:25px;">
          Total:
          $${Number(
            total
          ).toLocaleString("es-CL")}
        </h2>

      </div>
    `;

    const clientHtml = `
      <div style="font-family:Arial,sans-serif;padding:20px;max-width:800px">

        <h1 style="color:#000;">
          Gracias por cotizar con Black Home
        </h1>

        <p>
          <strong>N° Cotización:</strong>
          ${quoteNumber}
        </p>

        <p>
          Hola ${client.name},
        </p>

        <p>
          Hemos recibido correctamente tu solicitud de cotización.
        </p>

        <p>
          Adjuntamos una copia en PDF para tu referencia.
        </p>

        <table
          style="
            width:100%;
            border-collapse:collapse;
            margin-top:10px;
          "
        >
          <thead>
            <tr style="background:#000;color:#fff;">
              <th style="padding:10px;">
                Producto
              </th>
              <th style="padding:10px;">
                Cantidad
              </th>
              <th style="padding:10px;">
                Área
              </th>
              <th style="padding:10px;">
                Subtotal
              </th>
            </tr>
          </thead>

          <tbody>
            ${rows}
          </tbody>
        </table>

        <h2 style="margin-top:25px;">
          Total estimado:
          $${Number(
            total
          ).toLocaleString("es-CL")}
        </h2>

        <p style="margin-top:30px;">
          Atentamente
          <br />
          <strong>
            Black Home
          </strong>
        </p>

      </div>
    `;

    await transporter.sendMail({
      from: `"Black Home" <${process.env.EMAIL_USER}>`,
      to:
        process.env.EMAIL_USER ||
        "",
      subject: `Nueva Cotización ${quoteNumber}`,
      html: adminHtml,
      attachments: [
        {
          filename: `cotizacion-${quoteNumber}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    await transporter.sendMail({
      from: `"Black Home" <${process.env.EMAIL_USER}>`,
      to: client.email,
      subject: `Cotización ${quoteNumber}`,
      html: clientHtml,
      attachments: [
        {
          filename: `cotizacion-${quoteNumber}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      quoteNumber,
    });
  } catch (error) {
    console.error(
      "ERROR COMPLETO:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}
