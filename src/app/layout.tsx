import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { organizationJsonLd } from "@/lib/jsonld";
import { siteUrl, TITLE_SUFFIX } from "@/lib/seo";
import { whatsappHref } from "@/lib/whatsapp";
import "./globals.css";

/** Direction 1B's single typeface, self-hosted by next/font (no CLS). */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Contador en Asunción | Estudio contable para pymes | ${TITLE_SUFFIX}`,
    template: `%s`,
  },
  description:
    "Estudio contable en Asunción: contabilidad mensual, impuestos, nómina, apertura de empresas y facturación electrónica para pymes de todo Paraguay.",
  applicationName: site.name,
  authors: [{ name: site.legalName ?? site.name, url: siteUrl }],
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0F1B2D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const wa = whatsappHref();

  return (
    <html lang="es-PY" className={bricolage.variable}>
      <body className="min-h-dvh bg-white antialiased">
        <a href="#contenido" className="skip-link">
          {ui.nav.skipToContent}
        </a>
        <Header whatsappHref={wa} />
        <main id="contenido">{children}</main>
        <Footer />
        <WhatsAppFab href={wa} />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
