import { PageTopbar } from "@/components/layout/page-topbar";

export default function AboutPage() {
  const values = [
    "Escucha activa para comprender tu contexto real.",
    "Objetivos claros y medibles en cada etapa.",
    "Explicaciones sencillas para que entiendas tu proceso.",
  ];

  return (
    <main className="mx-auto min-safe-screen w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-12 pb-safe">
      <PageTopbar />
      <p className="text-xs tracking-[0.3em] uppercase text-teal-700">Sobre mi</p>
      <h1 className="mt-4 text-5xl font-semibold text-slate-950 sm:text-6xl">Fisioterapia basada en confianza y evidencia</h1>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">Hola, soy Tatiana Arguedas Aguilar</h2>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            Acompano a personas con dolor musculoesqueletico, lesiones deportivas y molestias recurrentes para que recuperen movimiento y seguridad en su dia a dia.
          </p>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            Mi forma de trabajar combina valoracion clinica, terapia manual y ejercicio terapeutico para que cada sesion tenga un objetivo claro y una progresion real.
          </p>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="text-xs tracking-[0.22em] uppercase text-teal-700">Principios</p>
          <ul className="mt-4 grid gap-3 text-sm text-slate-700">
            {values.map((value) => (
              <li key={value} className="flex gap-3 border-l-2 border-teal-100 py-2 pl-3">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-700" />
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
