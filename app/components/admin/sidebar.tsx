"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: "📊",
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: "📦",
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: "🛒",
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: "👥",
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: "📈",
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: "⚙️",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-[#0F3D2E] text-white flex flex-col shadow-2xl">
      {/* Logo */}
      <div className="border-b border-white/10 p-6">
        <h1 className="text-2xl font-bold">
          🌿 CARE WITH HERBS
        </h1>

        <p className="text-sm text-green-200 mt-1">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                active
                  ? "bg-white text-[#0F3D2E] font-semibold shadow-lg"
                  : "hover:bg-white/10"
              }`}
            >
              <span className="text-xl">{item.icon}</span>

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/10">
        <p className="text-sm text-green-200">
          CARE WITH HERBS™
        </p>

        <p className="text-xs opacity-70">
          Admin v1.0
        </p>
      </div>
    </aside>
  );
}