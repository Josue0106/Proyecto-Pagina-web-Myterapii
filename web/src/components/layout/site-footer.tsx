import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12">
        <p>Atención personalizada de fisioterapia en consulta y seguimiento.</p>
        <div className="flex items-center gap-4">
          <Link href="/" className="transition hover:text-slate-900">
            Inicio
          </Link>
          <Link href="/articulos" className="transition hover:text-slate-900">
            Artículos
          </Link>
          <Link href="/reservar" className="transition hover:text-slate-900">
            Reservar
          </Link>
        </div>
      </div>
    </footer>
  );
}
