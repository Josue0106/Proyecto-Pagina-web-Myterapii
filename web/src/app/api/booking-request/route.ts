import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase-admin";

type BookingPayload = {
  fullName: string;
  email: string;
  phone?: string;
  preferredDate?: string;
  painArea: string;
  notes?: string;
};

function sanitize(value: unknown): string {
  return String(value ?? "").trim();
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<BookingPayload>;

  const payload: BookingPayload = {
    fullName: sanitize(body.fullName),
    email: sanitize(body.email),
    phone: sanitize(body.phone),
    preferredDate: sanitize(body.preferredDate),
    painArea: sanitize(body.painArea),
    notes: sanitize(body.notes),
  };

  if (!payload.fullName || !payload.email || !payload.painArea) {
    return NextResponse.json(
      { message: "Completa nombre, correo y motivo principal." },
      { status: 400 },
    );
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({
      message:
        "Solicitud recibida. Para guardarla automáticamente en la base de datos, configura Supabase.",
      stored: false,
    });
  }

  const supabase = createAdminClient();

  const { error } = await supabase.from("booking_requests").insert({
      full_name: payload.fullName,
      email: payload.email,
      phone: payload.phone || null,
      preferred_date: payload.preferredDate || null,
      pain_area: payload.painArea,
      notes: payload.notes || null,
  });

  if (error) {
    return NextResponse.json(
      { message: `No se pudo guardar en Supabase: ${error.message}` },
      { status: 500 },
    );
  }

  return NextResponse.json({
    message: "Solicitud enviada y guardada correctamente.",
    stored: true,
  });
}
