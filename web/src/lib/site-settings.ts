export const siteSettings = {
  logoPath: process.env.NEXT_PUBLIC_LOGO_PATH ?? "/brand/logo.jpg",
  logoAlt: process.env.NEXT_PUBLIC_LOGO_ALT ?? "Logo de fisioterapia",
  googleBookingUrl:
    process.env.NEXT_PUBLIC_GOOGLE_BOOKING_URL ?? "https://calendar.app.google/xFkXWnNwQCSwjsBL7",
  timezoneLabel: "Costa Rica (GMT-6)",
  bookingDurationLabel: "60 minutos",
  bookingWindowLabel: "Lunes a sabado, 9:00 a.m. a 8:00 p.m.",
  breakWindowLabel: "Descanso diario de 12:00 m.d. a 2:00 p.m.",
  bookingBufferLabel: "10 minutos entre citas",
  bookingNoticeLabel: "Minimo 12 horas de antelacion",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
};

function toDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function getWhatsappUrl(): string | null {
  const digits = toDigits(siteSettings.whatsappNumber);
  if (!digits) return null;
  return `https://wa.me/${digits}`;
}
