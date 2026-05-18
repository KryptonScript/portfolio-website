import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollTopButton } from "@/components/ScrollTopButton";
import { Particles } from "@/components/Particles";
import { CursorGlow } from "@/components/CursorGlow";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - Programmer`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  metadataBase: new URL(siteConfig.baseUrl),
  openGraph: {
    type: "website",
    url: siteConfig.baseUrl,
    title: `${siteConfig.name} - ${siteConfig.role}`,
    description: siteConfig.description
  },
  alternates: { canonical: siteConfig.baseUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-theme="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ScrollProgress />
        <Particles />
        <CursorGlow />
        <Header />
        {children}
        <Footer />
        <ScrollTopButton />
      </body>
    </html>
  );
}
