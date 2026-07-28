import { PageTopbar } from "@/components/layout/page-topbar";

export default function ServicesPage() {
  const services = [
    {
      title: "Valoracion inicial",
      summary:
        "Primera sesion para entender tu dolor, revisar movilidad y definir un plan de trabajo realista.",
      points: ["Historia clinica y objetivos", "Evaluacion funcional", "Plan personalizado"],
    },
    {
      title: "Terapia manual",
      summary:
        "Intervenciones para aliviar dolor, reducir tension y recuperar movimiento de forma progresiva.",
      points: ["Movilizaciones", "Tratamiento de tejido blando", "Control de sintomas"],
    },
    {
      title: "Ejercicio terapeutico",
      summary:
        "Rutinas adaptadas a tu nivel para consolidar la recuperacion entre sesiones.",
      points: ["Fortalecimiento", "Movilidad y control", "Progresion semanal"],
    },
    {
      title: "Prevencion y readaptacion",
      summary:
        "Acompanamiento para volver a entrenar o a tu rutina diaria con seguridad.",
      points: ["Prevencion de recaidas", "Educacion en carga", "Seguimiento de avance"],
    },
  ];

  return (
    <main className="mx-auto min-safe-screen w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-12 pb-safe">
      <PageTopbar />
      <p className="text-xs tracking-[0.3em] uppercase text-teal-700">Servicios</p>
      <h1 className="mt-4 text-5xl font-semibold text-slate-950 sm:text-6xl">Servicios de fisioterapia</h1>
      <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
        Trabajo con un enfoque clinico y cercano para ayudarte a recuperar movimiento, reducir dolor y mantener resultados en el tiempo.
      </p>

      <section className="mt-12 grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">{service.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{service.summary}</p>
            <ul className="mt-5 grid gap-2 text-sm text-slate-700">
              {service.points.map((point) => (
                <li key={point} className="rounded-xl bg-slate-50 px-3 py-2">
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
