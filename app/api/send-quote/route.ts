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

// ─── COLORES ────────────────────────────────────────────────
const GOLD        = rgb(0.776, 0.655, 0.482); // #c6a77b
const GOLD_DARK   = rgb(0.545, 0.424, 0.259); // #8b6c42
const BLACK       = rgb(0.07, 0.07, 0.07);
const DARK_BG     = rgb(0.10, 0.10, 0.10);    // header/footer
const ACCENT_RED  = rgb(0.835, 0.290, 0.173); // #d54a2c
const WHITE       = rgb(1, 1, 1);
const GRAY_LIGHT  = rgb(0.97, 0.96, 0.94);    // filas alternas
const GRAY_MID    = rgb(0.88, 0.85, 0.80);    // bordes suaves
const GRAY_TEXT   = rgb(0.45, 0.45, 0.45);

// ─── HELPERS ────────────────────────────────────────────────
function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

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
    page.drawRectangle({
      x, y, width: w, height: h,
      borderColor,
      borderWidth,
      color: undefined,
    });
  }
}

function text(
  page: PDFPage,
  str: string,
  x: number, y: number,
  size: number,
  font: PDFFont,
  color: RGB = BLACK
) {
  page.drawText(str, { x, y, size, font, color });
}

function safeText(str: string, maxLen = 40): string {
  if (!str) return "-";
  return str.length > maxLen ? str.slice(0, maxLen - 1) + "…" : str;
}

function clp(amount: number): string {
  return `$${Math.round(amount).toLocaleString("es-CL")}`;
}

// ─── GENERADOR PRINCIPAL ────────────────────────────────────
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

  // ── HEADER NEGRO ──────────────────────────────────────────
  const HEADER_H = 110;
  drawRect(page, 0, H - HEADER_H, W, HEADER_H, DARK_BG);

  // Franja dorada superior
  drawRect(page, 0, H - 4, W, 4, GOLD);

  // Logo (si existe)
  try {
    const logoPath = path.join(process.cwd(), "public", "images", "cotizacion.png");
    if (fs.existsSync(logoPath)) {
      const logoBytes = fs.readFileSync(logoPath);
      const logoImage = await pdfDoc.embedPng(logoBytes);
      const dim = logoImage.scale(0.11);
      page.drawImage(logoImage, {
        x: 36,
        y: H - HEADER_H + (HEADER_H - dim.height) / 2,
        width: dim.width,
        height: dim.height,
      });
    }
  } catch (_) { /* sin logo, continúa */ }

  // Nombre empresa
  text(page, "BLACK HOME", 175, H - 52, 22, fontB, WHITE);

  // Línea dorada decorativa bajo nombre
  page.drawLine({
    start: { x: 175, y: H - 60 },
    end:   { x: 370, y: H - 60 },
    thickness: 1,
    color: GOLD,
    dashArray: [3, 3],
  });

  text(page, "DISEÑO Y DECORACIÓN", 175, H - 76, 9, fontR, GOLD);
  text(page, "contacto@blackhome.cl", 175, H - 92, 8, fontR, GRAY_MID);
  text(page, "+56 9 3400 7366", 175, H - 104, 8, fontR, GRAY_MID);

  // Número cotización — parte derecha del header
  const qLabel = "N° COTIZACIÓN";
  const qLabelW = fontR.widthOfTextAtSize(qLabel, 8);
  text(page, qLabel, W - 160, H - 48, 8, fontR, GOLD);
  text(page, quoteNumber, W - 160, H - 64, 11, fontB, WHITE);
  const dateStr = new Date().toLocaleDateString("es-CL", {
    day: "2-digit", month: "long", year: "numeric",
  });
  text(page, `Fecha: ${dateStr}`, W - 160, H - 80, 8, fontR, GRAY_MID);

  // ── TÍTULO COTIZACIÓN ─────────────────────────────────────
  let y = H - HEADER_H - 30;
  text(page, "COTIZACIÓN", 36, y, 20, fontB, BLACK);

  // Línea separadora
  y -= 14;
  page.drawLine({
    start: { x: 36, y },
    end:   { x: W - 36, y },
    thickness: 0.8,
    color: GOLD,
  });

  // ── DOS COLUMNAS: CLIENTE + RESUMEN ───────────────────────
  y -= 18;
  const colLeft  = 36;
  const colRight = 310;
  const colW     = 240;
  const sectionH = 130;

  // Fondo secciones
  drawRect(page, colLeft,  y - sectionH, colW, sectionH, GRAY_LIGHT, GRAY_MID);
  drawRect(page, colRight, y - sectionH, colW, sectionH, GRAY_LIGHT, GRAY_MID);

  // Cabeceras de sección con franja dorada
  drawRect(page, colLeft,  y - 22, colW, 22, GOLD);
  drawRect(page, colRight, y - 22, colW, 22, GOLD);

  text(page, "DATOS DEL CLIENTE",        colLeft  + 10, y - 15, 9, fontB, DARK_BG);
  text(page, "DETALLE DE LA COTIZACIÓN", colRight + 10, y - 15, 9, fontB, DARK_BG);

  // Datos cliente
  const clientLines = [
    ["Nombre:",    `${safeText(client.name)} ${safeText(client.lastname)}`],
    ["Correo:",    safeText(client.email, 34)],
    ["Teléfono:", safeText(client.phone)],
    ["Dirección:", safeText(client.address, 30)],
    ["Región:",   safeText(client.region)],
    ["Comuna:",   safeText(client.comuna)],
  ];

  let ly = y - 34;
  for (const [label, value] of clientLines) {
    text(page, label, colLeft + 10, ly, 8, fontB, GOLD_DARK);
    text(page, value, colLeft + 65, ly, 8, fontR, BLACK);
    ly -= 16;
  }

  // Detalle cotización (lado derecho)
  const totalItems = items.length;
  const totalQty   = items.reduce((s, i) => s + i.qty, 0);

  let ry = y - 34;
  text(page, "Validez:",         colRight + 10, ry,      8, fontB, GOLD_DARK);
  text(page, "15 días desde emisión", colRight + 65, ry, 8, fontR, BLACK);
  ry -= 16;
  text(page, "Productos:",       colRight + 10, ry,      8, fontB, GOLD_DARK);
  text(page, `${totalItems} tipo(s) — ${totalQty} unidad(es)`, colRight + 65, ry, 8, fontR, BLACK);
  ry -= 16;
  text(page, "Moneda:",          colRight + 10, ry,      8, fontB, GOLD_DARK);
  text(page, "CLP (Pesos Chilenos)", colRight + 65, ry,  8, fontR, BLACK);
  ry -= 20;

  // Mini badge de monto
  drawRect(page, colRight + 10, ry - 12, colW - 20, 26, DARK_BG);
  text(page, "TOTAL ESTIMADO", colRight + 20, ry - 2,  7, fontR, GOLD);
  const totalStr = clp(total);
  text(page, totalStr, colRight + 20, ry - 15, 13, fontB, WHITE);

  // ── TABLA DE PRODUCTOS ────────────────────────────────────
  y -= sectionH + 24;

  // Cabecera tabla
  const TABLE_L = 36;
  const TABLE_W = W - 72;
  const ROW_H   = 20;

  drawRect(page, TABLE_L, y - ROW_H, TABLE_W, ROW_H, DARK_BG);

  // Columnas (x, label, ancho, align)
  const cols: Array<{ x: number; label: string; w: number; align: "left" | "right" | "center" }> = [
    { x: TABLE_L + 6,   label: "PRODUCTO",          w: 80,  align: "left"   },
    { x: TABLE_L + 92,  label: "MODELO",            w: 65,  align: "left"   },
    { x: TABLE_L + 163, label: "COLOR",             w: 55,  align: "left"   },
    { x: TABLE_L + 224, label: "CANT.",             w: 32,  align: "center" },
    { x: TABLE_L + 263, label: "MEDIDAS",           w: 72,  align: "center" },
    { x: TABLE_L + 343, label: "ÁREA m²",           w: 48,  align: "center" },
    { x: TABLE_L + 399, label: "P. UNIT.",          w: 58,  align: "right"  },
    { x: TABLE_L + 465, label: "SUBTOTAL",          w: 58,  align: "right"  },
  ];

  // Cabeceras
  for (const col of cols) {
    const lw = fontB.widthOfTextAtSize(col.label, 7);
    let tx = col.x;
    if (col.align === "right")  tx = col.x + col.w - lw - 4;
    if (col.align === "center") tx = col.x + (col.w - lw) / 2;
    text(page, col.label, tx, y - 14, 7, fontB, WHITE);
  }

  // Línea divisoria bajo cabecera
  y -= ROW_H;

  // Filas
  items.forEach((item, idx) => {
    const area     = item.width * item.height;
    const price    = curtainPrices[item.type] || 0;
    const subtotal = area * price * item.qty;
    const rowColor = idx % 2 === 0 ? WHITE : GRAY_LIGHT;

    drawRect(page, TABLE_L, y - ROW_H, TABLE_W, ROW_H, rowColor);

    // Línea inferior de fila
    page.drawLine({
      start: { x: TABLE_L, y: y - ROW_H },
      end:   { x: TABLE_L + TABLE_W, y: y - ROW_H },
      thickness: 0.3,
      color: GRAY_MID,
    });

    const rowValues = [
      { col: cols[0], val: safeText(item.type,  12) },
      { col: cols[1], val: safeText(item.model, 10) },
      { col: cols[2], val: safeText(item.color, 9)  },
      { col: cols[3], val: String(item.qty)         },
      { col: cols[4], val: `${item.width}×${item.height}` },
      { col: cols[5], val: area.toFixed(2)           },
      { col: cols[6], val: clp(price)                },
      { col: cols[7], val: clp(subtotal)             },
    ];

    for (const { col, val } of rowValues) {
      const vw = fontR.widthOfTextAtSize(val, 8);
      let tx = col.x;
      if (col.align === "right")  tx = col.x + col.w - vw - 4;
      if (col.align === "center") tx = col.x + (col.w - vw) / 2;
      text(page, val, tx, y - 14, 8, fontR, BLACK);
    }

    // Subtotal en dorado
    const svw = fontB.widthOfTextAtSize(clp(subtotal), 8);
    const sc = cols[7];
    const stx = sc.x + sc.w - svw - 4;
    text(page, clp(subtotal), stx, y - 14, 8, fontB, GOLD_DARK);

    y -= ROW_H;
  });

  // ── TOTAL FINAL ───────────────────────────────────────────
  y -= 10;

  // Bloque negro total
  drawRect(page, TABLE_L, y - 30, TABLE_W, 30, DARK_BG);

  text(page, "TOTAL ESTIMADO", TABLE_L + 12, y - 19, 10, fontB, GOLD);

  const totalFinalStr = clp(total);
  const tfW = fontB.widthOfTextAtSize(totalFinalStr, 16);
  text(page, totalFinalStr, TABLE_L + TABLE_W - tfW - 12, y - 21, 16, fontB, WHITE);

  // Franja roja decorativa al final del total
  drawRect(page, TABLE_L + TABLE_W - 6, y - 30, 6, 30, ACCENT_RED);

  // ── NOTAS ─────────────────────────────────────────────────
  y -= 52;

  // Fondo nota
  drawRect(page, TABLE_L, y - 72, (TABLE_W / 2) - 8, 72, GRAY_LIGHT, GRAY_MID);
  drawRect(page, TABLE_L + (TABLE_W / 2) + 8, y - 72, (TABLE_W / 2) - 8, 72, DARK_BG);

  // Títulos
  text(page, "NOTAS", TABLE_L + 10, y - 14, 8, fontB, GOLD_DARK);

  const notes = [
    "• Valores son referenciales e incluyen IVA.",
    "• Instalación no incluida en el precio.",
    "• Colores y texturas según disponibilidad.",
    "• Medidas verificadas antes de fabricar.",
    "• Cotización válida por 15 días.",
  ];
  let ny = y - 28;
  for (const note of notes) {
    text(page, note, TABLE_L + 10, ny, 7.5, fontR, GRAY_TEXT);
    ny -= 13;
  }

  // Caja derecha — mensaje
  const rx2 = TABLE_L + (TABLE_W / 2) + 18;
  text(page, "¡Gracias por confiar en", rx2, y - 18, 9, fontB, GOLD);
  text(page, "Black Home!",             rx2, y - 32, 9, fontB, GOLD);
  text(page, "Nuestro equipo se pondrá",  rx2, y - 48, 8, fontR, GRAY_MID);
  text(page, "en contacto a la brevedad.", rx2, y - 61, 8, fontR, GRAY_MID);

  // ── FOOTER ────────────────────────────────────────────────
  const FOOTER_H = 44;
  drawRect(page, 0, 0, W, FOOTER_H, DARK_BG);
  drawRect(page, 0, FOOTER_H, W, 2, GOLD);

  // Footer info
  text(page, "Las Condes, Santiago — Región Metropolitana", 36, 26, 7.5, fontR, GRAY_MID);
  text(page, "contacto@blackhome.cl", 36, 13, 7.5, fontR, GRAY_MID);

  const site = "www.blackhome.cl";
  const siteW = fontB.widthOfTextAtSize(site, 8);
  text(page, site, (W - siteW) / 2, 18, 8, fontB, GOLD);

  text(page, "+56 9 3400 7366", W - 130, 26, 7.5, fontR, GRAY_MID);
  text(page, "BLACK HOME",       W - 130, 13, 8,   fontB, WHITE);

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

    // ── HTML filas ──
    const rows = items
      .map((item) => {
        const area     = item.width * item.height;
        const price    = curtainPrices[item.type] || 0;
        const subtotal = area * price * item.qty;
        const tdStyle  = `padding:10px 12px;border:1px solid #e0d8cc;font-size:13px;`;
        return `
          <tr>
            <td style="${tdStyle}font-weight:600;">${item.type}</td>
            <td style="${tdStyle}">${item.model}</td>
            <td style="${tdStyle}">${item.color}</td>
            <td style="${tdStyle}text-align:center;">${item.qty}</td>
            <td style="${tdStyle}text-align:center;">${item.width} × ${item.height} m</td>
            <td style="${tdStyle}text-align:center;">${area.toFixed(2)} m²</td>
            <td style="${tdStyle}text-align:right;">$${(price).toLocaleString("es-CL")}</td>
            <td style="${tdStyle}text-align:right;font-weight:700;color:#8b6c42;">$${subtotal.toLocaleString("es-CL")}</td>
          </tr>`;
      })
      .join("");

    const thStyle = `padding:10px 12px;color:#fff;font-size:12px;font-weight:600;text-align:left;`;

    const adminHtml = `
      <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:820px;margin:0 auto;background:#f7f4ee;">
        <div style="background:#111;padding:24px 32px;border-bottom:3px solid #c6a77b;">
          <h1 style="margin:0;color:#fff;font-size:22px;letter-spacing:2px;">BLACK HOME</h1>
          <p style="margin:4px 0 0;color:#c6a77b;font-size:11px;letter-spacing:3px;">DISEÑO Y DECORACIÓN</p>
        </div>
        <div style="padding:28px 32px;background:#fff;">
          <h2 style="color:#111;font-size:18px;margin:0 0 4px;">Nueva Cotización</h2>
          <p style="margin:0;color:#8b6c42;font-weight:700;">${quoteNumber}</p>
          <hr style="border:none;border-top:1px solid #e0d8cc;margin:20px 0;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
            <div>
              <h3 style="color:#c6a77b;font-size:13px;letter-spacing:1px;margin:0 0 12px;">DATOS DEL CLIENTE</h3>
              <table style="font-size:13px;border-collapse:collapse;width:100%;">
                <tr><td style="padding:4px 0;color:#666;width:90px;">Nombre</td><td style="padding:4px 0;font-weight:600;">${client.name} ${client.lastname}</td></tr>
                <tr><td style="padding:4px 0;color:#666;">Correo</td><td style="padding:4px 0;">${client.email}</td></tr>
                <tr><td style="padding:4px 0;color:#666;">Teléfono</td><td style="padding:4px 0;">${client.phone}</td></tr>
                <tr><td style="padding:4px 0;color:#666;">Dirección</td><td style="padding:4px 0;">${client.address}</td></tr>
                <tr><td style="padding:4px 0;color:#666;">Región</td><td style="padding:4px 0;">${client.region}</td></tr>
                <tr><td style="padding:4px 0;color:#666;">Comuna</td><td style="padding:4px 0;">${client.comuna}</td></tr>
              </table>
            </div>
          </div>
          <h3 style="color:#c6a77b;font-size:13px;letter-spacing:1px;margin:28px 0 12px;">DETALLE DE PRODUCTOS</h3>
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <thead>
              <tr style="background:#111;">
                <th style="${thStyle}">Producto</th>
                <th style="${thStyle}">Modelo</th>
                <th style="${thStyle}">Color</th>
                <th style="${thStyle}text-align:center;">Cant.</th>
                <th style="${thStyle}text-align:center;">Medidas</th>
                <th style="${thStyle}text-align:center;">Área m²</th>
                <th style="${thStyle}text-align:right;">P. Unit.</th>
                <th style="${thStyle}text-align:right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <div style="margin-top:16px;background:#111;padding:14px 20px;display:flex;justify-content:space-between;align-items:center;border-radius:4px;">
            <span style="color:#c6a77b;font-size:13px;font-weight:700;letter-spacing:1px;">TOTAL ESTIMADO</span>
            <span style="color:#fff;font-size:22px;font-weight:800;">$${Number(total).toLocaleString("es-CL")}</span>
          </div>
        </div>
        <div style="background:#111;padding:16px 32px;text-align:center;">
          <p style="margin:0;color:#c6a77b;font-size:11px;letter-spacing:2px;">BLACK HOME — contacto@blackhome.cl — +56 9 3400 7366</p>
        </div>
      </div>`;

    const clientHtml = `
      <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:820px;margin:0 auto;background:#f7f4ee;">
        <div style="background:#111;padding:24px 32px;border-bottom:3px solid #c6a77b;">
          <h1 style="margin:0;color:#fff;font-size:22px;letter-spacing:2px;">BLACK HOME</h1>
          <p style="margin:4px 0 0;color:#c6a77b;font-size:11px;letter-spacing:3px;">DISEÑO Y DECORACIÓN</p>
        </div>
        <div style="padding:28px 32px;background:#fff;">
          <h2 style="color:#111;font-size:18px;margin:0 0 4px;">Hola ${client.name},</h2>
          <p style="color:#555;font-size:14px;">Hemos recibido tu solicitud de cotización. Adjuntamos el PDF con el detalle completo.</p>
          <p style="margin:0;color:#8b6c42;font-weight:700;">${quoteNumber}</p>
          <hr style="border:none;border-top:1px solid #e0d8cc;margin:20px 0;">
          <h3 style="color:#c6a77b;font-size:13px;letter-spacing:1px;margin:0 0 12px;">RESUMEN DE TU COTIZACIÓN</h3>
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <thead>
              <tr style="background:#111;">
                <th style="${thStyle}">Producto</th>
                <th style="${thStyle}">Modelo</th>
                <th style="${thStyle}">Color</th>
                <th style="${thStyle}text-align:center;">Cant.</th>
                <th style="${thStyle}text-align:center;">Medidas</th>
                <th style="${thStyle}text-align:center;">Área m²</th>
                <th style="${thStyle}text-align:right;">P. Unit.</th>
                <th style="${thStyle}text-align:right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <div style="margin-top:16px;background:#111;padding:14px 20px;border-radius:4px;display:flex;justify-content:space-between;align-items:center;">
            <span style="color:#c6a77b;font-size:13px;font-weight:700;letter-spacing:1px;">TOTAL ESTIMADO</span>
            <span style="color:#fff;font-size:22px;font-weight:800;">$${Number(total).toLocaleString("es-CL")}</span>
          </div>
          <div style="margin-top:24px;background:#faf7f2;border:1px solid #e0d8cc;border-radius:6px;padding:16px 20px;">
            <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#8b6c42;">Notas importantes</p>
            <ul style="margin:0;padding-left:18px;font-size:12px;color:#666;line-height:1.8;">
              <li>Esta cotización tiene una validez de 15 días desde la fecha de emisión.</li>
              <li>Los precios son referenciales e incluyen IVA.</li>
              <li>Instalación no incluida en el precio.</li>
              <li>Las medidas serán verificadas por nuestro equipo antes de fabricar.</li>
            </ul>
          </div>
          <p style="margin-top:28px;font-size:13px;color:#555;">Nuestro equipo se pondrá en contacto contigo a la brevedad.<br><br>Atentamente,<br><strong>Black Home</strong></p>
        </div>
        <div style="background:#111;padding:16px 32px;text-align:center;">
          <p style="margin:0;color:#c6a77b;font-size:11px;letter-spacing:2px;">BLACK HOME — contacto@blackhome.cl — +56 9 3400 7366</p>
        </div>
      </div>`;

    await transporter.sendMail({
      from: `"Black Home" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER || "",
      subject: `Nueva Cotización ${quoteNumber}`,
      html: adminHtml,
      attachments: [{ filename: `cotizacion-${quoteNumber}.pdf`, content: pdfBuffer }],
    });

    await transporter.sendMail({
      from: `"Black Home" <${process.env.EMAIL_USER}>`,
      to: client.email,
      subject: `Tu Cotización Black Home — ${quoteNumber}`,
      html: clientHtml,
      attachments: [{ filename: `cotizacion-${quoteNumber}.pdf`, content: pdfBuffer }],
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
