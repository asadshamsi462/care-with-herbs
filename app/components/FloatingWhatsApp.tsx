"use client";

import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href="https://wa.me/918533004409"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-green-500/40"
    >
      <FaWhatsapp className="text-4xl" />
    </a>
  );
}