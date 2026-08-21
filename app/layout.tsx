import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "./components/Navbar";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { CartProvider } from "./context/CartContext";

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
  metadataBase: new URL("https://carewithherbs.in"),

  title: {
    default: "CARE WITH HERBS™ | Premium Herbal Wellness Products",
    template: "%s | CARE WITH HERBS™",
  },

  description:
    "CARE WITH HERBS™ is a premium herbal wellness brand offering carefully selected herbal products with a focus on quality, purity and customer trust.",

  keywords: [
    "Care With Herbs",
    "CARE WITH HERBS",
    "herbal products",
    "herbal wellness products",
    "natural herbal products",
    "herbal powder",
    "premium herbal products",
    "Nagina herbal products",
    "Bijnor herbal products",
  ],

  authors: [
    {
      name: "CARE WITH HERBS™",
    },
  ],

  creator: "CARE WITH HERBS™",
  publisher: "CARE WITH HERBS™",

  alternates: {
    canonical: "https://carewithherbs.in",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "https://carewithherbs.in",
    siteName: "CARE WITH HERBS™",
    title: "CARE WITH HERBS™ | Premium Herbal Wellness Products",
    description:
      "Discover carefully selected herbal wellness products from CARE WITH HERBS™.",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "CARE WITH HERBS™ | Premium Herbal Wellness Products",
    description:
      "Premium herbal wellness products from CARE WITH HERBS™.",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CARE WITH HERBS",
  url: "https://carewithherbs.in",
  logo: "https://carewithherbs.in/icon.png",
  description:
    "CARE WITH HERBS is a premium herbal wellness brand offering carefully selected herbal products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col`}
      >
        <CartProvider>
          <Navbar />

          {children}

          <FloatingWhatsApp />
        </CartProvider>
      </body>
    </html>
  );
}