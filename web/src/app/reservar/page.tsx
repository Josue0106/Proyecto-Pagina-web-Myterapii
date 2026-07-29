import { CalendarDays, MessageCircle } from "lucide-react";

import { PageTopbar } from "@/components/layout/page-topbar";
import { getWhatsappUrl, siteSettings } from "@/lib/site-settings";

export default function BookingPage() {
  const whatsappUrl = getWhatsappUrl();

  return (
    <main className="mx-auto min-safe-screen w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-12 pb-safe">
      <PageTopbar />
      <p className="text-xs tracking-[0.3em] uppercase text-teal-700">Reservar cita</p>
      <h1 className="mt-4 text-5xl font-semibold text-slate-950 sm:text-6xl">Agenda tu sesión</h1>
      <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
        Reserva directamente en Google Calendar y, si no encuentras horario, contáctanos por WhatsApp para ayudarte.
      </p>

      <section className="mt-10">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
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
            Se abrirá una nueva pestaña para seleccionar fecha y hora disponibles.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <a
              href={siteSettings.googleBookingUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-24 flex-col items-start justify-center gap-1 rounded-2xl bg-slate-900 px-6 py-5 text-left text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
            >
              <span className="inline-flex items-center gap-2 text-base font-semibold">
                <CalendarDays className="h-5 w-5" />
                Reservar en Google Calendar
              </span>
              <span className="text-sm text-slate-200">Elige fecha y hora disponible en menos de 2 minutos.</span>
            </a>

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-24 flex-col items-start justify-center gap-1 rounded-2xl border border-teal-300 bg-teal-50 px-6 py-5 text-left text-teal-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-100 hover:shadow-lg"
              >
                <span className="inline-flex items-center gap-2 text-base font-semibold">
                  <MessageCircle className="h-5 w-5" />
                  Escribir por WhatsApp
                </span>
                <span className="text-sm text-teal-800">Te ayudamos a encontrar horario si no aparece en agenda.</span>
              </a>
            ) : (
              <p className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600 sm:col-span-2">
                Para activar el respaldo por WhatsApp, define <strong>NEXT_PUBLIC_WHATSAPP_NUMBER</strong>.
              </p>
            )}
          </div>

          <p className="mt-5 text-sm text-slate-600">
            Si no encuentras un espacio en agenda, contáctanos por WhatsApp y te ayudamos a coordinar.
          </p>
        </article>
      </section>

      <section className="relative mt-10 overflow-hidden rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 via-white to-slate-50 p-6 shadow-sm sm:p-8">
        <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-teal-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-12 bottom-0 h-44 w-44 rounded-full bg-slate-200/60 blur-3xl" />

        <div className="relative">
          <p className="text-xs tracking-[0.24em] uppercase text-teal-700">Políticas</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950 sm:text-3xl">Políticas y cancelaciones</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          Esta sección está preparada para que puedas pegar aquí tus políticas definitivas de reserva, reprogramación y
          cancelación.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-700">Política general</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                [Pegar aquí la política general: confirmación de cita, puntualidad, forma de pago y condiciones de
                atención.]
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-700">Política de cancelación</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                [Pegar aquí la política de cancelación y reprogramación: tiempos mínimos de aviso, cargos aplicables y
                excepciones.]
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
