import Navbar from "./components/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { CartProvider } from "./context/CartContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CARE WITH HERBS | Premium Herbal Products",
  description:
    "CARE WITH HERBS offers premium natural herbal products made with carefully selected herbs for everyday wellness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"> 
    
     <body className="min-h-full flex flex-col">

  <CartProvider>

    <Navbar />

    {children}

    <FloatingWhatsApp />

  </CartProvider>

</body>
    </html>
  );
}
