import type { Metadata, Viewport } from "next";
import { display, sans } from "@/lib/fonts";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} | Projeto conceitual`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "Bernardo Pires", url: site.credit.href }],
  creator: "Bernardo Pires",
  keywords: ["salão de beleza", "site para salão", "hair studio", "design premium", "portfólio", "Next.js"],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description:
      "Protótipo conceitual de site premium para salão de beleza. Marca fictícia criada para o portfólio de Bernardo Pires.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: "Protótipo conceitual de site premium para salão de beleza (projeto de portfólio).",
  },
  // Projeto demonstrativo: evita que a marca fictícia seja indexada como um negócio real
  robots: { index: false, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#140E0C",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
