import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";

import { PageTopbar } from "@/components/layout/page-topbar";
import { formatPublishedDate, getSubstackPosts, type SubstackPost } from "@/lib/substack";

function getFallbackArticles(publicationUrl: string): SubstackPost[] {
  return [
    {
      id: "fallback-lumbar",
      title: "Dolor lumbar: como avanzar sin recaidas",
      excerpt:
        "Habitos simples para mejorar la recuperacion y evitar picos de dolor en el dia a dia.",
      url: publicationUrl,
    },
    {
      id: "fallback-cadera",
      title: "Movilidad de cadera para personas activas",
      excerpt:
        "Rutina base para mantener movimiento, control y confianza entre sesiones.",
      url: publicationUrl,
    },
    {
      id: "fallback-primera-sesion",
      title: "Que esperar en tu primera sesion",
      excerpt:
        "Asi es una valoracion moderna: objetivos claros, indicadores y plan de trabajo.",
      url: publicationUrl,
    },
  ];
}

export default async function ArticlesPage() {
  const { posts, configured, publicationUrl } = await getSubstackPosts(6);
  const visiblePosts = posts.length > 0 ? posts : getFallbackArticles(publicationUrl);

  return (
    <main className="mx-auto min-safe-screen w-full max-w-7xl px-6 py-24 sm:px-10 lg:px-12 pb-safe">
      <PageTopbar />
      <header className="max-w-3xl">
        <p className="text-xs tracking-[0.3em] uppercase text-teal-700">Articulos</p>
        <h1 className="mt-4 text-5xl font-semibold text-slate-950 sm:text-6xl">Educacion para tu recuperacion</h1>
        <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
          Publicaciones de fisioterapia para entender tu proceso y tomar mejores decisiones fuera de consulta.
        </p>
      </header>

      {!configured && (
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          Para activar la sincronizacion automatica, define la variable <strong>NEXT_PUBLIC_SUBSTACK_URL</strong> con la URL publica de la newsletter.
        </div>
      )}

      {configured && posts.length === 0 && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700">
          La cuenta de Substack esta conectada pero aun no hay articulos publicados. Mientras tanto, mostramos tarjetas guia para la seccion.
        </div>
      )}

      <section className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((article) => (
          <article key={article.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <BookOpenText className="h-5 w-5 text-teal-700" />
            {article.publishedAt && (
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                {formatPublishedDate(article.publishedAt) ?? "Publicado en Substack"}
              </p>
            )}
            <h2 className="mt-4 text-xl font-semibold text-slate-950">{article.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{article.excerpt}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800"
            >
              Leer en Substack
              <ArrowRight className="h-4 w-4" />
            </a>
          </article>
        ))}
      </section>

      <div className="mt-12 flex items-center gap-4">
        <a
          href={publicationUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
        >
          Ir a la newsletter
          <ArrowRight className="h-4 w-4" />
        </a>
        <Link href="/" className="text-sm text-slate-600 transition hover:text-slate-900">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
