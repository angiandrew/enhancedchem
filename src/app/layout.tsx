import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import SecurityMonitor from "@/components/SecurityMonitor";
import AgeGate from "@/components/AgeGate";
import CartPreview from "@/components/CartPreview";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
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
        url: `${baseUrl}/logos/Logo%20w:%20circle%20background.png`,
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
    images: [`${baseUrl}/logos/Logo%20w:%20circle%20background.png`],
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
    icon: [
      {
        url: "/logos/Logo w: circle background.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/logos/Logo w: circle background.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/logos/Logo w: circle background.png",
        type: "image/png",
        sizes: "96x96",
      },
      {
        url: "/logos/Logo w: circle background.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
    apple: {
      url: "/logos/Logo w: circle background.png",
      type: "image/png",
      sizes: "180x180",
    },
    shortcut: "/logos/Logo w: circle background.png",
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
      <body className={`${playfairDisplay.variable} ${inter.variable} antialiased`}>
        {/* Affiliate Tracking - Visits */}
        <Script
          src="https://static.affiliatly.com/v3/affiliatly.js?affiliatly_code=AF-1074129"
          strategy="afterInteractive"
        />
        <CartProvider>
          <AgeGate />
          <SecurityMonitor />
          <CartPreview />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
