import { headers } from "next/headers";
import Link from "next/link";
import { ArrowRight, BookOpenText, CalendarDays, CheckCircle2, HeartPulse, Stethoscope } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { HeroLanding } from "@/components/sections/hero-landing";
import { getSlotImageUrl } from "@/lib/media-assets";
import { getSubstackPosts } from "@/lib/substack";

type PageDeviceVariant = "mobile" | "desktop";

function resolveDeviceVariant(userAgent?: string | null): PageDeviceVariant {
  if (!userAgent) {
    return "desktop";
  }

  const normalized = userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(normalized) || /android/.test(normalized)) {
    return "mobile";
  }

  return "desktop";
}

function isAppleMobileDevice(userAgent?: string | null): boolean {
  if (!userAgent) {
    return false;
  }

  return /iphone|ipad|ipod/.test(userAgent.toLowerCase());
}

export default async function Home() {
  const headerList = await headers();
  const userAgent = headerList.get("user-agent");
  const deviceVariant = resolveDeviceVariant(userAgent);
  const isMobileView = deviceVariant === "mobile";
  const shouldUseLocalHeroImage = isMobileView || isAppleMobileDevice(userAgent);
  const heroImageUrl = shouldUseLocalHeroImage
    ? "/brand/hero-medical.svg"
    : await getSlotImageUrl("hero_background", "/brand/hero-medical.svg", deviceVariant, {
        width: 1920,
        quality: 70,
        format: "jpg",
      });
  const { posts: substackPosts } = shouldUseLocalHeroImage ? { posts: [] } : await getSubstackPosts(3);
  const articlePreviews =
    substackPosts.length > 0
      ? substackPosts
      : [
          {
            id: "home-fallback-lumbar",
            title: "Dolor lumbar: errores comunes al recuperarte",
            url: "/articulos",
          },
          {
            id: "home-fallback-sesiones",
            title: "Qué hacer entre sesiones para mejorar más rápido",
            url: "/articulos",
          },
          {
            id: "home-fallback-movilidad",
            title: "Movilidad y fuerza: cómo prevenir recaídas",
            url: "/articulos",
          },
        ];

  const services = [
    {
      title: "Valoración inicial",
      description:
        "Primera sesión para entender tu dolor, revisar movilidad y definir un plan de trabajo realista.",
      points: ["Historia clínica y objetivos", "Evaluación funcional", "Plan personalizado"],
    },
    {
      title: "Terapia manual",
      description:
        "Intervenciones para aliviar dolor, reducir tensión y recuperar movimiento de forma progresiva.",
      points: ["Movilizaciones", "Tratamiento de tejido blando", "Control de síntomas"],
    },
    {
      title: "Ejercicio terapéutico",
      description:
        "Rutinas adaptadas a tu nivel para consolidar la recuperación entre sesiones.",
      points: ["Fortalecimiento", "Movilidad y control", "Progresión semanal"],
    },
    {
      title: "Prevención y readaptación",
      description:
        "Acompañamiento para volver a entrenar o a tu rutina diaria con seguridad.",
      points: ["Prevención de recaídas", "Educación en carga", "Seguimiento de avance"],
    },
  ];

  return (
    <main className="bg-background text-foreground">
      <SiteHeader deviceVariant={deviceVariant} />
      <HeroLanding backgroundImageUrl={heroImageUrl} deviceVariant={deviceVariant} />

      <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 lg:px-12">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs tracking-[0.3em] uppercase text-teal-700">Método</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
            Tratamiento cercano, estructura profesional.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
            Trabajo con un proceso sencillo: evaluamos tu caso, marcamos objetivos concretos y medimos evolución en cada sesión.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              [CheckCircle2, "Diagnóstico funcional"],
              [HeartPulse, "Terapia manual"],
              [Stethoscope, "Ejercicio terapéutico"],
              [CalendarDays, "Seguimiento continuo"],
            ].map(([Icon, label]) => (
              <div key={label as string} className="flex items-center gap-3 border-l-2 border-teal-100 py-2 pl-3">
                <Icon className="h-4 w-4 text-teal-700" />
                <p className="text-sm text-slate-700">{label as string}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section id="servicios" className="mx-auto w-full max-w-7xl px-6 pb-16 scroll-mt-8 sm:px-10 lg:px-12">
        <header className="max-w-3xl">
          <p className="text-xs tracking-[0.3em] uppercase text-teal-700">Servicios</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">
            Un plan de fisioterapia adaptado a tu recuperación.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Cada servicio se adapta a tus necesidades, objetivos y momento de recuperación.
          </p>
        </header>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-semibold text-slate-950">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
              <ul className="mt-5 grid gap-2 text-sm text-slate-700">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-10 lg:px-12">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-teal-700">Artículos</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
                Recursos y educación para cuidar tu cuerpo fuera de consulta.
              </h2>
            </div>
            <Link
              href="/articulos"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-300 px-5 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Ir a artículos
              <BookOpenText className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {articlePreviews.map((article) => (
              <article key={article.id} className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Substack</p>
                <h3 className="mt-3 text-lg font-semibold text-slate-950">{article.title}</h3>
                <Link
                  href={article.url}
                  target={article.url.startsWith("http") ? "_blank" : undefined}
                  rel={article.url.startsWith("http") ? "noreferrer" : undefined}
                  className="mt-4 inline-flex items-center gap-2 text-sm text-teal-700 hover:text-teal-800"
                >
                  Leer artículo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </article>
      </section>

      <SiteFooter />
    </main>
  );
}
