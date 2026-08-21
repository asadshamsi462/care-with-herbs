"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/app/components/admin/sidebar";
import Header from "@/app/components/admin/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Login page par Sidebar aur Header nahi dikhana
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        
        <Header />

        <main className="flex-1">
          {children}
        </main>

      </div>
    </div>
  );
}