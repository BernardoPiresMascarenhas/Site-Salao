import localFont from "next/font/local";

/**
 * Fontes auto-hospedadas (via @fontsource-variable) — o build não depende
 * de acesso à rede e o next/font gera fallbacks métricos, evitando layout shift.
 */
export const display = localFont({
  src: [
    { path: "../app/fonts/bodoni-moda-latin-standard-normal.woff2", style: "normal", weight: "400 900" },
    { path: "../app/fonts/bodoni-moda-latin-standard-italic.woff2", style: "italic", weight: "400 900" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Didot", '"Bodoni 72"', "Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const sans = localFont({
  src: [{ path: "../app/fonts/manrope-latin-wght-normal.woff2", style: "normal", weight: "200 800" }],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  adjustFontFallback: "Arial",
});
