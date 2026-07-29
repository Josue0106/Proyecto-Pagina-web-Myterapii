import Link from "next/link";
import { ArrowLeft, CalendarDays, CircleHelp, Home, NotebookPen, User } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/sobre", label: "Sobre mí", icon: User },
  { href: "/articulos", label: "Artículos", icon: NotebookPen },
  { href: "/contacto", label: "Preguntas frecuentes", icon: CircleHelp },
  { href: "/reservar", label: "Reservar", icon: CalendarDays },
];

export function PageTopbar() {
  return (
    <div className="mb-10 rounded-3xl border border-slate-200/80 bg-white/90 px-4 py-4 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 self-start rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <nav className="flex flex-wrap gap-2">
          {quickLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
