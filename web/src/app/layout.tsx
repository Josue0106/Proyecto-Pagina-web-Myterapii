import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-heading-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clínica de Fisioterapia | Reserva en línea y seguimiento",
  description:
    "Web de fisioterapia con reservas en línea, recordatorios automáticos y seguimiento clínico sencillo.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-screen min-h-dvh flex flex-col bg-background text-foreground">
        {children}
        <Analytics />
        <SpeedInsights />
        <Script id="eruda-debug" strategy="afterInteractive">
          {`
            if (typeof window !== "undefined" && window.location.search.includes("debug=1")) {
              var script = document.createElement("script");
              script.src = "https://cdn.jsdelivr.net/npm/eruda";
              script.onload = function () { window.eruda.init(); };
              document.body.appendChild(script);
            }
          `}
        </Script>
      </body>
    </html>
  );
}
