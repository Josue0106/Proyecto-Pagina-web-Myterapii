import { CalendarDays } from "lucide-react";

import { BookingRequestForm } from "@/components/forms/booking-request-form";
import { PageTopbar } from "@/components/layout/page-topbar";
import { getWhatsappUrl, siteSettings } from "@/lib/site-settings";

export default function BookingPage() {
  const whatsappUrl = getWhatsappUrl();

  return (
    <main className="mx-auto min-safe-screen w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-12 pb-safe">
      <PageTopbar />
      <p className="text-xs tracking-[0.3em] uppercase text-teal-700">Reservar cita</p>
      <h1 className="mt-4 text-5xl font-semibold text-slate-950 sm:text-6xl">Agenda tu sesion</h1>
      <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
        Reserva directamente en Google Calendar y, si no encuentras horario, deja tu solicitud para contacto asistido.
      </p>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Calendario de reservas de Google</h2>
            <a
              href={siteSettings.googleBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-teal-700 hover:text-teal-800"
            >
              Abrir agenda
              <CalendarDays className="h-4 w-4" />
            </a>
          </div>

          <p className="text-sm leading-7 text-slate-700">
            Se abrira una nueva pestaña para seleccionar fecha y hora disponibles.
          </p>

          <a
            href={siteSettings.googleBookingUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Reservar en Google Calendar
          </a>

          <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            <p>
              <strong>Zona horaria:</strong> {siteSettings.timezoneLabel}
            </p>
            <p>
              <strong>Duracion:</strong> {siteSettings.bookingDurationLabel}
            </p>
            <p>
              <strong>Horario:</strong> {siteSettings.bookingWindowLabel}
            </p>
            <p>
              <strong>Descanso:</strong> {siteSettings.breakWindowLabel}
            </p>
            <p>
              <strong>Margen:</strong> {siteSettings.bookingBufferLabel}
            </p>
            <p>
              <strong>Antelacion:</strong> {siteSettings.bookingNoticeLabel}
            </p>
            <p>
              <strong>WhatsApp:</strong> {siteSettings.whatsappNumber || "Pendiente de configurar"}
            </p>
          </div>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              No ves horario? Escribenos por WhatsApp
            </a>
          ) : (
            <p className="mt-4 text-sm text-slate-600">
              Para activar el respaldo por WhatsApp, define <strong>NEXT_PUBLIC_WHATSAPP_NUMBER</strong>.
            </p>
          )}
        </article>

        <BookingRequestForm />
      </section>
    </main>
  );
}
