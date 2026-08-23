import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { getDb } from "@/lib/db/client";
import { leads } from "@/lib/db/schema";
import { rateLimited } from "@/lib/rate-limit";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos incompletos o inválidos." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos incompletos o inválidos." }, { status: 400 });
  }

  if (parsed.data.web) {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiados envíos. Inténtalo de nuevo en unos minutos." },
      { status: 429 }
    );
  }

  try {
    const db = getDb();
    await db.insert(leads).values({
      nombre: parsed.data.nombre,
      email: parsed.data.email,
      empresa: parsed.data.empresa ?? null,
      mensaje: parsed.data.mensaje,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact insert failed", err);
    return NextResponse.json(
      { error: "No pudimos enviar tu mensaje. Intenta nuevamente en unos minutos." },
      { status: 500 }
    );
  }
}
