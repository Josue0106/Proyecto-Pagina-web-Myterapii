import { PageTopbar } from "@/components/layout/page-topbar";

export default function ContactPage() {
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
      <p className="text-xs tracking-[0.3em] uppercase text-teal-700">Preguntas frecuentes</p>
      <h1 className="mt-4 text-5xl font-semibold text-slate-950 sm:text-6xl">Resolvemos tus dudas antes de reservar</h1>
      <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
        Aqui encontraras respuestas claras a las dudas mas habituales sobre las sesiones y el proceso de reserva.
      </p>

      <section className="mt-10 max-w-3xl">
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((item) => (
            <article key={item.question} className="py-6">
              <h2 className="text-lg font-semibold text-slate-950">{item.question}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
