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

const BASE_URL = "https://carewithherbs.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "CARE WITH HERBS™ | Premium Herbal Wellness Products",
    template: "%s | CARE WITH HERBS™",
  },

  description:
    "CARE WITH HERBS™ is an Indian herbal wellness brand offering carefully selected herbal products with a focus on quality, purity and customer trust.",

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
    "herbal products India",
  ],

  authors: [
    {
      name: "CARE WITH HERBS™",
      url: BASE_URL,
    },
  ],

  creator: "CARE WITH HERBS™",
  publisher: "CARE WITH HERBS™",

  alternates: {
    canonical: BASE_URL,
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
    url: BASE_URL,
    siteName: "CARE WITH HERBS™",
    title: "CARE WITH HERBS™ | Premium Herbal Wellness Products",
    description:
      "Discover carefully selected herbal wellness products from CARE WITH HERBS™.",
    locale: "en_IN",
    images: [
      {
        url: `${BASE_URL}/icon.png`,
        width: 512,
        height: 512,
        alt: "CARE WITH HERBS™",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CARE WITH HERBS™ | Premium Herbal Wellness Products",
    description:
      "Premium herbal wellness products from CARE WITH HERBS™.",
    images: [`${BASE_URL}/icon.png`],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

/* -------------------------------------------------------
   CARE WITH HERBS — Organization structured data
   ------------------------------------------------------- */

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  "@id": `${BASE_URL}/#organization`,

  name: "CARE WITH HERBS",
  alternateName: "CARE WITH HERBS™",

  url: BASE_URL,

  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/icon.png`,
  },

  description:
    "CARE WITH HERBS is an Indian herbal wellness brand offering carefully selected herbal products with a focus on quality, purity and customer trust.",

  address: {
    "@type": "PostalAddress",
    addressLocality: "Nagina",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },

  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-8533004409",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
};

/* -------------------------------------------------------
   CARE WITH HERBS — Website structured data
   ------------------------------------------------------- */

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",

  "@id": `${BASE_URL}/#website`,

  name: "CARE WITH HERBS",
  alternateName: "CARE WITH HERBS™",

  url: BASE_URL,

  publisher: {
    "@id": `${BASE_URL}/#organization`,
  },

  inLanguage: "en-IN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
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