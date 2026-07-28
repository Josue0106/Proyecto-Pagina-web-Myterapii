import Image from "next/image";
import Link from "next/link";

import { getMediaAssetUrl } from "@/lib/media-assets";
import { siteSettings } from "@/lib/site-settings";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre", label: "Sobre mi" },
  { href: "/articulos", label: "Articulos" },
  { href: "/contacto", label: "Contacto" },
];

export async function SiteHeader() {
  const logoUrl = await getMediaAssetUrl("brand_logo", siteSettings.logoPath);
  const logoAlt = siteSettings.logoAlt;

  return (
    <header className="absolute inset-x-0 top-0 z-30 pt-safe px-safe">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-12">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            aria-label="Ir al inicio"
            className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-white/25 bg-white/10"
          >
            <Image src={logoUrl} alt={logoAlt} fill priority sizes="56px" className="object-contain p-1.5" />
          </Link>
          <div>
            <p className="text-xs tracking-[0.34em] uppercase text-white/70">Myterapii</p>
            <p className="text-sm font-medium text-white">Tatiana Arguedas Aguilar</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/85 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/reservar"
          className="inline-flex h-10 items-center rounded-full border border-white/60 bg-transparent px-5 text-sm font-medium text-white transition hover:bg-white hover:text-slate-900"
        >
          Reservar cita
        </Link>
      </div>
    </header>
  );
}
