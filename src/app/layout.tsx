import type { Metadata, Viewport } from "next";
import { shrikhand, spaceMono } from "@/lib/fonts";
import { EditorialHeader } from "@/components/chrome/EditorialHeader";
import { Footer } from "@/components/chrome/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { site } from "@/content/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.positioning}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#030304",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${spaceMono.variable} ${shrikhand.variable}`}>
      <body>
        <MotionProvider>
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-none focus:bg-bolt-500 focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
          >
            Pular para o conteúdo
          </a>
          <EditorialHeader />
          <main id="conteudo">{children}</main>
          <Footer />
          <div className="grain-overlay" aria-hidden="true" />
        </MotionProvider>
      </body>
    </html>
  );
}
