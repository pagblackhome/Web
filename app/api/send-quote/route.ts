import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont, RGB } from "pdf-lib";

type Item = {
  type: string;
  model: string;
  color: string;
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

// ─── PALETA ─────────────────────────────────────────────────
const RED         = rgb(0.835, 0.290, 0.173); // #d54a2c  rojo Black Home
const RED_DARK    = rgb(0.65,  0.18,  0.08);  // rojo oscuro labels
const GRAY_900 = rgb(0.42, 0.42, 0.45); // gris elegante — reemplaza negro pesado
const GRAY_700 = rgb(0.55, 0.55, 0.58); // gris medio-oscuro subheaders
const GRAY_400    = rgb(0.62,  0.62,  0.64);  // gris medio labels
const GRAY_200    = rgb(0.88,  0.88,  0.90);  // gris claro texto sobre oscuro
const GRAY_100    = rgb(0.955, 0.955, 0.960); // fondo alternas tabla
const GRAY_BORDER = rgb(0.80,  0.80,  0.82);  // bordes suaves
const WHITE       = rgb(1, 1, 1);
const CREAM       = rgb(0.985, 0.975, 0.965); // fondo general cálido

// ─── HELPERS ────────────────────────────────────────────────
function drawRect(
  page: PDFPage,
  x: number, y: number,
  w: number, h: number,
  color: RGB,
  borderColor?: RGB,
  borderWidth = 0.5
) {
  page.drawRectangle({ x, y, width: w, height: h, color });
  if (borderColor) {
    page.drawRectangle({ x, y, width: w, height: h, color: undefined, borderColor, borderWidth });
  }
}

function txt(
  page: PDFPage,
  str: string,
  x: number, y: number,
  size: number,
  font: PDFFont,
  color: RGB = GRAY_900
) {
  page.drawText(str, { x, y, size, font, color });
}

function safe(str: string, max = 38): string {
  if (!str) return "-";
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

function clp(n: number): string {
  return `$${Math.round(n).toLocaleString("es-CL")}`;
}

// ─── GENERADOR PDF ──────────────────────────────────────────
async function generatePdf(
  client: Client,
  items: Item[],
  total: number,
  quoteNumber: string
): Promise<Buffer> {

  const pdfDoc = await PDFDocument.create();
  const W = 595, H = 842;
  const page = pdfDoc.addPage([W, H]);

  const fontR = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontB = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // ════════════════════════════════════════════════════════════
  // HEADER — logo ocupa todo el ancho, número cotización abajo
  // ════════════════════════════════════════════════════════════
  const HEADER_H = 120;

  // Fondo blanco del header
  drawRect(page, 0, H - HEADER_H, W, HEADER_H, WHITE);

  // Franja roja superior (3px)
  drawRect(page, 0, H - 3, W, 3, RED);

  // Logo centrado ocupando todo el ancho del header
  try {
    const logoPath = path.join(process.cwd(), "public", "images", "cotizacion.png");
    if (fs.existsSync(logoPath)) {
      const logoBytes = fs.readFileSync(logoPath);
      const logoImage = await pdfDoc.embedPng(logoBytes);
      // Escalar para que ocupe todo el ancho (de borde a borde)
      const scale = W / logoImage.width;
      const scaledH = logoImage.height * scale;
      // Si la imagen escalada es más alta que el header, la recortamos al header
      const drawH = Math.min(scaledH, HEADER_H);
      const drawW = W;
      page.drawImage(logoImage, {
        x: 0,
        y: H - HEADER_H + (HEADER_H - drawH) / 2,
        width: drawW,
        height: drawH,
      });
    }
  } catch (_) {
    // Sin logo: mostrar nombre de empresa en su lugar
    txt(page, "BLACK HOME", 36, H - 60, 26, fontB, GRAY_900);
    txt(page, "DISEÑO Y DECORACIÓN", 36, H - 80, 10, fontR, GRAY_400);
  }

  // Línea divisora bajo el header (roja)
  page.drawLine({
    start: { x: 0, y: H - HEADER_H },
    end:   { x: W, y: H - HEADER_H },
    thickness: 2,
    color: RED,
  });

  // ════════════════════════════════════════════════════════════
  // BLOQUE COTIZACIÓN — número + fecha (debajo del header)
  // ════════════════════════════════════════════════════════════
  let y = H - HEADER_H - 16;

  // Fondo crema de página
  drawRect(page, 0, 0, W, H - HEADER_H, CREAM);

  // Encabezado COTIZACIÓN + N° + Fecha en una franja
  drawRect(page, 36, y - 28, W - 72, 28, RED);

  txt(page, "COTIZACIÓN", 48, y - 20, 12, fontB, WHITE);

  const qStr = `N° ${quoteNumber}`;
  const qW   = fontB.widthOfTextAtSize(qStr, 10);
  txt(page, qStr, W - 36 - qW - 10, y - 19, 10, fontB, WHITE);

  const dateStr = new Date().toLocaleDateString("es-CL", {
    day: "2-digit", month: "long", year: "numeric",
  });
  const dStr = `Fecha: ${dateStr}`;
  const dW   = fontR.widthOfTextAtSize(dStr, 8);
  txt(page, dStr, W - 36 - dW - 10, y - 33, 8, fontR, GRAY_400);

  y -= 42;

  // ════════════════════════════════════════════════════════════
  // DOS COLUMNAS: DATOS CLIENTE  |  DETALLE COTIZACIÓN
  // ════════════════════════════════════════════════════════════
  const COL_L    = 36;
  const COL_R    = 316;
  const COL_W    = 243;
  const SEC_H    = 134; // altura total del bloque dos columnas

  // Fondos blancos con borde suave
  drawRect(page, COL_L, y - SEC_H, COL_W, SEC_H, WHITE, GRAY_BORDER);
  drawRect(page, COL_R, y - SEC_H, COL_W, SEC_H, WHITE, GRAY_BORDER);

  // Cabeceras rojas
  drawRect(page, COL_L, y - 22, COL_W, 22, GRAY_900);
drawRect(page, COL_R, y - 22, COL_W, 22, GRAY_900);

  txt(page, "DATOS DEL CLIENTE",        COL_L + 10, y - 15, 8.5, fontB, WHITE);
  txt(page, "DETALLE DE LA COTIZACIÓN", COL_R + 10, y - 15, 8.5, fontB, WHITE);

  // Datos cliente
  const clientRows: [string, string][] = [
    ["Nombre",    safe(`${client.name} ${client.lastname}`, 30)],
    ["Correo",    safe(client.email, 32)],
    ["Teléfono",  safe(client.phone)],
    ["Dirección", safe(client.address, 28)],
    ["Región",    safe(client.region)],
    ["Comuna",    safe(client.comuna)],
  ];

  let ly = y - 36;
  for (const [label, value] of clientRows) {
    txt(page, `${label}:`, COL_L + 10, ly, 7.5, fontB, RED_DARK);
    txt(page, value,       COL_L + 68,  ly, 7.5, fontR, GRAY_900);
    ly -= 15;
  }

  // Detalle cotización — derecha
  const totalItems = items.length;
  const totalQty   = items.reduce((s, i) => s + i.qty, 0);

  let ry = y - 36;
  const detRows: [string, string][] = [
    ["Validez",    "15 días desde emisión"],
    ["Productos",  `${totalItems} tipo(s) — ${totalQty} unidad(es)`],
    ["Moneda",     "CLP (Pesos Chilenos)"],
  ];
  for (const [label, value] of detRows) {
    txt(page, `${label}:`, COL_R + 10, ry, 7.5, fontB, RED_DARK);
    txt(page, value,       COL_R + 68,  ry, 7.5, fontR, GRAY_900);
    ry -= 15;
  }

  // Badge TOTAL dentro del bloque derecho
  ry -= 8;
  drawRect(page, COL_R + 10, ry - 26, COL_W - 20, 26, GRAY_900);
  // Franja roja izquierda del badge
  drawRect(page, COL_R + 10, ry - 26, 4, 26, RED);
  txt(page, "TOTAL ESTIMADO", COL_R + 20, ry - 10, 7, fontB, WHITE);
  const totalStr = clp(total);
  const tsW = fontB.widthOfTextAtSize(totalStr, 13);
  txt(page, totalStr, COL_R + COL_W - tsW - 14, ry - 19, 13, fontB, WHITE);

  y -= SEC_H + 18;

  // ════════════════════════════════════════════════════════════
  // TABLA DE PRODUCTOS
  // ════════════════════════════════════════════════════════════
  const TL  = 36;
  const TW  = W - 72;
  const RH  = 19; // row height

  // Cabecera tabla
  drawRect(page, TL, y - RH, TW, RH, GRAY_900);

  // Columnas: { x relativo a TL, label, ancho, align }
  type Align = "left" | "center" | "right";
  const cols: { rx: number; label: string; w: number; align: Align }[] = [
    { rx: 0,   label: "PRODUCTO",  w: 82,  align: "left"   },
    { rx: 82,  label: "MODELO",    w: 65,  align: "left"   },
    { rx: 147, label: "COLOR",     w: 52,  align: "left"   },
    { rx: 199, label: "CANT.",     w: 30,  align: "center" },
    { rx: 229, label: "MEDIDAS",   w: 68,  align: "center" },
    { rx: 297, label: "ÁREA m²",   w: 46,  align: "center" },
    { rx: 343, label: "P.UNIT.",   w: 58,  align: "right"  },
    { rx: 401, label: "SUBTOTAL",  w: 62,  align: "right"  },
  ];

  // Dibujar cabeceras
  for (const c of cols) {
    const lw  = fontB.widthOfTextAtSize(c.label, 6.5);
    let   tx  = TL + c.rx + 4;
    if (c.align === "right")  tx = TL + c.rx + c.w - lw - 4;
    if (c.align === "center") tx = TL + c.rx + (c.w - lw) / 2;
    txt(page, c.label, tx, y - RH + 6, 6.5, fontB, WHITE);
  }

  // Separadores verticales en cabecera
  for (let i = 1; i < cols.length; i++) {
    const cx = TL + cols[i].rx;
    page.drawLine({
      start: { x: cx, y: y },
      end:   { x: cx, y: y - RH },
      thickness: 0.3,
      color: GRAY_700,
    });
  }

  y -= RH;

  // Filas de productos
  items.forEach((item, idx) => {
    const area     = item.width * item.height;
    const price    = curtainPrices[item.type] || 0;
    const subtotal = area * price * item.qty;
    const bg       = idx % 2 === 0 ? WHITE : GRAY_100;

    drawRect(page, TL, y - RH, TW, RH, bg, GRAY_BORDER, 0.3);

    const vals = [
      safe(item.type,  13),
      safe(item.model, 10),
      safe(item.color, 9),
      String(item.qty),
      `${item.width}x${item.height}m`,
      area.toFixed(2),
      clp(price),
      clp(subtotal),
    ];

    vals.forEach((val, ci) => {
      const c   = cols[ci];
      const vw  = fontR.widthOfTextAtSize(val, 7.5);
      let   tx  = TL + c.rx + 4;
      if (c.align === "right")  tx = TL + c.rx + c.w - vw - 4;
      if (c.align === "center") tx = TL + c.rx + (c.w - vw) / 2;

      // Subtotal en rojo
      const f = ci === vals.length - 1 ? fontB : fontR;
      const color = ci === vals.length - 1 ? RED_DARK : GRAY_900;
      txt(page, val, tx, y - RH + 6, 7.5, f, color);
    });

    y -= RH;
  });

  // Línea cierre tabla
  page.drawLine({ start: { x: TL, y }, end: { x: TL + TW, y }, thickness: 0.5, color: GRAY_BORDER });

  y -= 10;

  // ════════════════════════════════════════════════════════════
  // TOTAL FINAL — barra ancha
  // ════════════════════════════════════════════════════════════
  const TOTAL_H = 34;
  drawRect(page, TL, y - TOTAL_H, TW, TOTAL_H, GRAY_900);
  // acento rojo derecho
  drawRect(page, TL + TW - 6, y - TOTAL_H, 6, TOTAL_H, RED);

  txt(page, "TOTAL ESTIMADO", TL + 14, y - TOTAL_H / 2 - 4, 10, fontB, WHITE);

  const tfStr = clp(total);
  const tfW   = fontB.widthOfTextAtSize(tfStr, 17);
  txt(page, tfStr, TL + TW - tfW - 16, y - TOTAL_H / 2 - 6, 17, fontB, WHITE);

  y -= TOTAL_H + 16;

  // ════════════════════════════════════════════════════════════
  // NOTAS + MENSAJE — dos columnas, altura fija calculada
  // ════════════════════════════════════════════════════════════
  const NOTES = [
    "Valores son referenciales e incluyen IVA.",
    "Instalación no incluida en el precio.",
    "Colores y texturas según disponibilidad.",
    "Medidas verificadas por nuestro equipo antes de fabricar.",
    "Cotización válida por 15 días desde la fecha de emisión.",
  ];

  const NOTE_LINE_H = 13;
  const NOTE_PAD    = 14;
  const NOTE_H      = NOTE_PAD * 2 + 16 + NOTES.length * NOTE_LINE_H; // padding + título + líneas

  const HALF = (TW - 10) / 2;

  // Caja notas (izquierda)
  drawRect(page, TL, y - NOTE_H, HALF, NOTE_H, WHITE, GRAY_BORDER);
  // Acento rojo arriba
  drawRect(page, TL, y - 4, HALF, 4, RED);

  txt(page, "NOTAS", TL + NOTE_PAD, y - NOTE_PAD - 4, 8, fontB, RED_DARK);

  let ny = y - NOTE_PAD - 18;
  for (const note of NOTES) {
    txt(page, `• ${note}`, TL + NOTE_PAD, ny, 7, fontR, GRAY_700);
    ny -= NOTE_LINE_H;
  }

  // Caja mensaje (derecha) — texto centrado dentro del recuadro
  const RX2 = TL + HALF + 10;
  drawRect(page, RX2, y - NOTE_H, HALF, NOTE_H, GRAY_900);
  drawRect(page, RX2, y - 4, HALF, 4, RED);

  // Texto centrado horizontalmente dentro del HALF
const msgLines = [
  {
    text: "¡Gracias por cotizar",
    size: 13,
    font: fontB,
    color: WHITE,
    dy: 85,
  },
  {
    text: "en Black Home!",
    size: 13,
    font: fontB,
    color: WHITE,
    dy: 65,
  },
  {
    text: "Estamos felices de ayudarte",
    size: 8,
    font: fontR,
    color: WHITE,
    dy: 42,
  },
  {
    text: "a encontrar la mejor solución",
    size: 8,
    font: fontR,
    color: WHITE,
    dy: 28,
  },
  {
    text: "para tu hogar.",
    size: 8,
    font: fontR,
    color: WHITE,
    dy: 14,
  },
];
for (const line of msgLines) {
  const textWidth = line.font.widthOfTextAtSize(line.text, line.size);

  txt(
    page,
    line.text,
    RX2 + (HALF - textWidth) / 2,
    y - NOTE_H + line.dy,
    line.size,
    line.font,
    line.color
  );
}
  // ════════════════════════════════════════════════════════════
  // FOOTER
  // ════════════════════════════════════════════════════════════
  const FOOTER_H = 40;
  drawRect(page, 0, 0, W, FOOTER_H, GRAY_900);
  // Franja roja superior del footer
  drawRect(page, 0, FOOTER_H, W, 2, RED);

const emailStr = "contacto@blackhome.cl";
const siteStr = "www.blackhome.cl";
const phoneStr = "+56 9 63653017";

// mismo tamaño y misma fuente para los 3
const footerFont = fontB;
const footerSize = 8;

// ancho de cada texto
const emailW = footerFont.widthOfTextAtSize(emailStr, footerSize);
const siteW = footerFont.widthOfTextAtSize(siteStr, footerSize);
const phoneW = footerFont.widthOfTextAtSize(phoneStr, footerSize);

// 3 columnas iguales
const col1Center = W * (1 / 6);
const col2Center = W * (3 / 6);
const col3Center = W * (5 / 6);

// misma altura para los 3
const footerY = 17;

txt(
  page,
  emailStr,
  col1Center - emailW / 2,
  footerY,
  footerSize,
  footerFont,
  WHITE
);

txt(
  page,
  siteStr,
  col2Center - siteW / 2,
  footerY,
  footerSize,
  footerFont,
  WHITE
);

txt(
  page,
  phoneStr,
  col3Center - phoneW / 2,
  footerY,
  footerSize,
  footerFont,
  WHITE
);
  

  return Buffer.from(await pdfDoc.save());
}

// ─── ROUTE POST ─────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { client, items, total } = body;

    if (
      !client?.name || !client?.lastname || !client?.email ||
      !client?.phone || !client?.address || !client?.region ||
      !client?.comuna || !Array.isArray(items) || items.length === 0 ||
      total == null
    ) {
      return NextResponse.json(
        { success: false, error: "Datos incompletos" },
        { status: 400 }
      );
    }

    const now = new Date();
    const quoteNumber = `BH-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const pdfBuffer = await generatePdf(client, items, total, quoteNumber);

    // ── Filas HTML ──
    const tdBase = `padding:9px 11px;border:1px solid #e2e2e2;font-size:13px;`;
    const rows = items.map((item) => {
      const area     = item.width * item.height;
      const price    = curtainPrices[item.type] || 0;
      const subtotal = area * price * item.qty;
      return `
        <tr>
          <td style="${tdBase}font-weight:600;">${item.type}</td>
          <td style="${tdBase}">${item.model}</td>
          <td style="${tdBase}">${item.color}</td>
          <td style="${tdBase}text-align:center;">${item.qty}</td>
          <td style="${tdBase}text-align:center;">${item.width} × ${item.height} m</td>
          <td style="${tdBase}text-align:center;">${area.toFixed(2)} m²</td>
          <td style="${tdBase}text-align:right;">$${price.toLocaleString("es-CL")}</td>
          <td style="${tdBase}text-align:right;font-weight:700;color:#c0392b;">$${subtotal.toLocaleString("es-CL")}</td>
        </tr>`;
    }).join("");

    const thBase = `padding:9px 11px;color:#fff;font-size:12px;font-weight:600;text-align:left;`;

    const emailBase = (bodyContent: string) => `
<div style="
  font-family:Arial,sans-serif;
  max-width:820px;
  margin:0 auto;
  background:#ffffff;
  border:1px solid #e5e5e5;
">
  <div style="
    height:4px;
    background:#d54a2c;
  "></div>

  <div style="padding:30px;">
    ${bodyContent}
  </div>

  <div style="
    background:#4a4a50;
    padding:14px 20px;
    text-align:center;
  ">
    <span style="
      color:#ffffff;
      font-size:12px;
    ">
      BLACK HOME · contacto@blackhome.cl · www.blackhome.cl
    </span>
  </div>
</div>
`;
   const adminBody = `
<h2 style="color:#222;margin-bottom:5px;">
  Nueva Cotización
</h2>

<p style="
  color:#d54a2c;
  font-weight:bold;
  margin-bottom:20px;
">
  ${quoteNumber}
</p>

<table style="font-size:13px;border-collapse:collapse;">
  <tr><td><strong>Nombre:</strong></td><td>${client.name} ${client.lastname}</td></tr>
  <tr><td><strong>Correo:</strong></td><td>${client.email}</td></tr>
  <tr><td><strong>Teléfono:</strong></td><td>${client.phone}</td></tr>
  <tr><td><strong>Dirección:</strong></td><td>${client.address}</td></tr>
  <tr><td><strong>Región:</strong></td><td>${client.region}</td></tr>
  <tr><td><strong>Comuna:</strong></td><td>${client.comuna}</td></tr>

`;

    const clientBody = `
      <h2 style="color:#222;font-size:18px;margin:0 0 6px;">Hola ${client.name},</h2>
      <p style="color:#555;font-size:14px;margin:0 0 16px;">Gracias por cotizar con Black Home. Adjuntamos tu cotización en PDF.</p>
      <p style="margin:0 0 20px;color:#c0392b;font-weight:700;font-size:14px;">${quoteNumber}</p>
      <h3 style="color:#c0392b;font-size:12px;letter-spacing:1px;margin:0 0 8px;">RESUMEN DE TU COTIZACIÓN</h3>`;

  await transporter.sendMail({
  from: `"Black Home Web" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_USER,

  subject: `Nueva Cotización ${quoteNumber}`,

  html: emailBase(adminBody),

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
  subject: `Tu Cotización Black Home — ${quoteNumber}`,

  html: emailBase(`
    <h2 style="
      margin:0 0 15px;
      color:#222;
    ">
      Hola ${client.name},
    </h2>

    <p style="
      color:#555;
      font-size:15px;
      line-height:1.7;
    ">
      Gracias por cotizar con Black Home.
    </p>

    <p style="
      color:#555;
      font-size:15px;
      line-height:1.7;
    ">
      Adjuntamos tu cotización en formato PDF para que puedas revisarla cuando quieras.
    </p>

    <div style="
      margin-top:25px;
      padding:15px;
      background:#f5f5f5;
      border-left:4px solid #d54a2c;
    ">
      <div style="
        color:#888;
        font-size:12px;
        text-transform:uppercase;
      ">
        Número de cotización
      </div>

      <div style="
        font-size:18px;
        font-weight:bold;
        color:#222;
        margin-top:5px;
      ">
        ${quoteNumber}
      </div>
    </div>

    <p style="
      margin-top:25px;
      color:#777;
      font-size:14px;
    ">
      Si tienes cualquier consulta estaremos encantados de ayudarte.
    </p>
  `),

  attachments: [
    {
      filename: `cotizacion-${quoteNumber}.pdf`,
      content: pdfBuffer,
    },
  ],
});



    return NextResponse.json({ success: true, quoteNumber });

  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
