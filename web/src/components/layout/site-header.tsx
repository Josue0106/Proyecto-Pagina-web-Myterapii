"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/sobre", label: "Sobre mi" },
  { href: "/articulos", label: "Articulos" },
  { href: "/contacto", label: "Preguntas frecuentes" },
];

type SiteHeaderProps = {
  deviceVariant?: "mobile" | "desktop";
};

export function SiteHeader({ deviceVariant = "desktop" }: SiteHeaderProps) {
  const isMobileView = deviceVariant === "mobile";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        <div className="flex items-center gap-2">
          {isMobileView ? (
            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/10 text-white transition hover:bg-white/20"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          ) : null}

          <Link
            href="/reservar"
            className={`inline-flex items-center rounded-full border border-white/60 bg-transparent font-medium text-white transition hover:bg-white hover:text-slate-900 ${isMobileView ? "h-9 px-4 text-xs" : "h-10 px-5 text-sm"}`}
          >
            Reservar cita
          </Link>
        </div>
      </div>

      {isMobileView && isMenuOpen ? (
        <div
          id="mobile-nav-panel"
          className="mx-auto mb-2 flex w-[calc(100%-1.5rem)] max-w-7xl flex-col gap-2 rounded-2xl border border-white/20 bg-slate-950/80 px-4 py-3 shadow-lg backdrop-blur sm:px-10"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-3 py-2 text-sm text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
