import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agenda Fácil",

  description: "Gerencie seus compromissos de forma simples e organizada.",

  openGraph: {
    title: "Agenda Fácil",
    description: "Gerencie seus compromissos de forma simples e organizada.",
    url: "https://agenda-facil-frontend-omega.vercel.app",
    siteName: "Agenda Fácil",
    images: [
      {
        url: "https://agenda-facil-frontend-omega.vercel.app/agenda-facil.png",
        width: 1536,
        height: 1024,
        alt: "Agenda Fácil",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Agenda Fácil",
    description: "Gerencie seus compromissos de forma simples e organizada.",
    images: ["https://agenda-facil-frontend-omega.vercel.app/agenda-facil.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
