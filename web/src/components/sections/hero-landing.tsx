"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpenText, CalendarDays } from "lucide-react";

import { supabaseImageLoader } from "@/lib/supabase-image-loader";

type HeroLandingProps = {
  backgroundImageUrl: string;
};

export function HeroLanding({ backgroundImageUrl }: HeroLandingProps) {
  const [currentImageUrl, setCurrentImageUrl] = useState(backgroundImageUrl);
  const [isIosDevice, setIsIosDevice] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const disableHeavyAnimations = prefersReducedMotion || isIosDevice;

  useEffect(() => {
    setCurrentImageUrl(backgroundImageUrl);
  }, [backgroundImageUrl]);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isIphoneOrIpad = /iP(hone|od|ad)/.test(ua);
    const isTouchMac = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    setIsIosDevice(isIphoneOrIpad || isTouchMac);
  }, []);

  return (
    <section className="relative min-safe-screen overflow-hidden px-safe">
      <Image
        src={currentImageUrl}
        alt=""
        fill
        priority={false}
        quality={70}
        sizes="100vw"
        unoptimized={currentImageUrl.startsWith("http")}
        loader={supabaseImageLoader}
        className="absolute inset-0 z-0 object-cover"
        onError={() => setCurrentImageUrl("/brand/hero-medical.svg")}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10"
        style={{
          backgroundImage:
            "linear-gradient(115deg, rgba(8,14,24,0.9) 0%, rgba(8,14,24,0.72) 46%, rgba(8,14,24,0.58) 100%)",
        }}
      />

      <div className="relative z-20 mx-auto flex min-safe-screen w-full max-w-7xl items-center px-6 pt-[calc(6.5rem+var(--safe-top))] pb-[calc(4.5rem+var(--safe-bottom))] sm:px-10 lg:px-12">
        <div className="max-w-2xl">
          <motion.p
            initial={disableHeavyAnimations ? false : { opacity: 0, y: 18 }}
            animate={disableHeavyAnimations ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={disableHeavyAnimations ? { duration: 0.2 } : { delay: 0.12, duration: 0.65 }}
            className="text-xs tracking-[0.38em] uppercase text-white/70"
          >
            Fisioterapia moderna y humana
          </motion.p>

          <motion.h1
            initial={disableHeavyAnimations ? false : { opacity: 0, y: 22 }}
            animate={disableHeavyAnimations ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={disableHeavyAnimations ? { duration: 0.25 } : { delay: 0.2, duration: 0.7 }}
            className="mt-5 text-5xl leading-[1.02] font-heading text-white sm:text-6xl lg:text-7xl"
          >
            Recupera movimiento con un plan claro para cada etapa.
          </motion.h1>

          <motion.p
            initial={disableHeavyAnimations ? false : { opacity: 0, y: 22 }}
            animate={disableHeavyAnimations ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={disableHeavyAnimations ? { duration: 0.25 } : { delay: 0.34, duration: 0.65 }}
            className="mt-8 max-w-xl text-base leading-8 text-white/85 sm:text-lg"
          >
            Te acompano con evaluacion precisa, tratamiento personalizado y seguimiento real para que vuelvas a tu ritmo sin dudas.
          </motion.p>

          <motion.div
            initial={disableHeavyAnimations ? false : { opacity: 0, y: 20 }}
            animate={disableHeavyAnimations ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={disableHeavyAnimations ? { duration: 0.25 } : { delay: 0.46, duration: 0.65 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/reservar"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/70 bg-transparent px-6 text-sm font-medium text-white transition hover:bg-white hover:text-slate-900"
            >
              Reservar cita
              <CalendarDays className="h-4 w-4" />
            </Link>

            <Link
              href="/articulos"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Ver articulos
              <BookOpenText className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={disableHeavyAnimations ? false : { opacity: 0, y: 14 }}
            animate={disableHeavyAnimations ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={disableHeavyAnimations ? { duration: 0.2 } : { delay: 0.56, duration: 0.6 }}
            className="mt-12 flex items-center gap-2 text-sm text-white/70"
          >
            <ArrowRight className="h-4 w-4" />
            Agenda en menos de 2 minutos desde movil o desktop.
          </motion.div>
        </div>
      </div>
    </section>
  );
}
