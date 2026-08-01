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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),

  title: "Agenda Fácil",

  description: "Gerencie seus compromissos de forma simples e organizada.",

  openGraph: {
    title: "Agenda Fácil",
    description: "Gerencie seus compromissos de forma simples e organizada.",
    images: [
      {
        url: "/agenda-facil.png",
        width: 1536,
        height: 1024,
        alt: "Agenda Fácil - Gerencie seus compromissos",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Agenda Fácil",
    description: "Gerencie seus compromissos de forma simples e organizada.",
    images: ["/agenda-facil.png"],
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
