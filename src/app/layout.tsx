import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import SecurityMonitor from "@/components/SecurityMonitor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://enhancedchem.com'

export const metadata: Metadata = {
  title: {
    default: "Enhanced Chem - Premium Research Peptides",
    template: "%s | Enhanced Chem",
  },
  description: "High-quality research peptides for scientific purposes. BPC-157, TB-500, and specialized peptide blends available. Fast shipping and research-grade quality.",
  keywords: ["research peptides", "BPC-157", "TB-500", "GHK-Cu", "peptide research", "laboratory peptides", "scientific peptides"],
  authors: [{ name: "Enhanced Chem" }],
  creator: "Enhanced Chem",
  publisher: "Enhanced Chem",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Enhanced Chem",
    title: "Enhanced Chem - Premium Research Peptides",
    description: "High-quality research peptides for scientific purposes. BPC-157, TB-500, and specialized peptide blends available. Fast shipping and research-grade quality.",
    images: [
      {
        url: `${baseUrl}/transparent logo copy.png`,
        width: 1024,
        height: 1024,
        alt: "Enhanced Chem Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enhanced Chem - Premium Research Peptides",
    description: "High-quality research peptides for scientific purposes. BPC-157, TB-500, and specialized peptide blends available.",
    images: [`${baseUrl}/transparent logo copy.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/transparent logo copy.png",
    apple: "/transparent logo copy.png",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <SecurityMonitor />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
