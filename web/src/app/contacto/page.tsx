import Link from "next/link";

import { PageTopbar } from "@/components/layout/page-topbar";
import { getWhatsappUrl, siteSettings } from "@/lib/site-settings";

export default function ContactPage() {
  const whatsappUrl = getWhatsappUrl();

  const faqs = [
    {
      question: "Cuanto dura una sesion?",
      answer: "La sesion suele durar entre 45 y 60 minutos, segun el caso.",
    },
    {
      question: "Necesito derivacion medica?",
      answer: "No siempre. Si la necesitas para tu caso, te orientare en la primera valoracion.",
    },
    {
      question: "Puedo reservar online?",
      answer: "Si, puedes reservar desde la pagina de Reservar cita en pocos pasos.",
    },
  ];

  return (
    <main className="mx-auto min-safe-screen w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-12 pb-safe">
      <PageTopbar />
      <p className="text-xs tracking-[0.3em] uppercase text-teal-700">Contacto</p>
      <h1 className="mt-4 text-5xl font-semibold text-slate-950 sm:text-6xl">Hablemos de tu recuperacion</h1>
      <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
        Si tienes dudas antes de reservar, puedes escribirme por WhatsApp o por correo. Te respondere con la mejor opcion para tu caso.
      </p>

      <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Canales de contacto</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-700">
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-slate-50 px-4 py-3 transition hover:bg-slate-100"
              >
                WhatsApp: {siteSettings.whatsappNumber}
              </a>
            ) : (
              <p className="rounded-xl bg-slate-50 px-4 py-3">
                WhatsApp pendiente. Configura <strong>NEXT_PUBLIC_WHATSAPP_NUMBER</strong>.
              </p>
            )}
            <a href="mailto:contacto@fisiomarta.com" className="rounded-xl bg-slate-50 px-4 py-3 transition hover:bg-slate-100">
              Correo: contacto@fisiomarta.com
            </a>
            <p className="rounded-xl bg-slate-50 px-4 py-3">Atencion: {siteSettings.bookingWindowLabel}</p>
            <p className="rounded-xl bg-slate-50 px-4 py-3">Zona horaria: {siteSettings.timezoneLabel}</p>
          </div>
          <Link
            href="/reservar"
            className="mt-6 inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
          >
            Ir a Reservar cita
          </Link>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Preguntas frecuentes</h2>
          <div className="mt-5 grid gap-3">
            {faqs.map((item) => (
              <div key={item.question} className="rounded-xl bg-slate-50 px-4 py-3">
                <h3 className="text-sm font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-1 text-sm text-slate-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
