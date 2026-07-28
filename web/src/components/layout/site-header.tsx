import Link from "next/link";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre", label: "Sobre mi" },
  { href: "/articulos", label: "Articulos" },
  { href: "/contacto", label: "Contacto" },
];

type SiteHeaderProps = {
  deviceVariant?: "mobile" | "desktop";
};

export async function SiteHeader({ deviceVariant = "desktop" }: SiteHeaderProps) {
  const isMobileView = deviceVariant === "mobile";

  return (
    <header className="absolute inset-x-0 top-0 z-30 pt-safe px-safe">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-12">
        <Link
          href="/"
          aria-label="Ir al inicio"
          className={`font-semibold uppercase tracking-[0.34em] text-white/90 ${isMobileView ? "text-xs" : "text-sm"}`}
        >
          Myterapii
        </Link>

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
          className={`inline-flex items-center rounded-full border border-white/60 bg-transparent font-medium text-white transition hover:bg-white hover:text-slate-900 ${isMobileView ? "h-9 px-4 text-xs" : "h-10 px-5 text-sm"}`}
        >
          Reservar cita
        </Link>
      </div>
    </header>
  );
}
