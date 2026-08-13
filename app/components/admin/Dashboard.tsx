"use client";

import {
  Package,
  ShoppingCart,
  Users,
  IndianRupee,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Products",
      value: "13",
      icon: Package,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Orders",
      value: "0",
      icon: ShoppingCart,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Customers",
      value: "0",
      icon: Users,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Revenue",
      value: "₹0",
      icon: IndianRupee,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#1B5E20] mb-8">
        CARE WITH HERBS™ Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition"
            >
              <div>
                <p className="text-gray-500 text-sm">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {item.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.color}`}
              >
                <Icon size={28} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          Welcome 👋
        </h2>

        <p className="text-gray-600">
          Welcome to the CARE WITH HERBS™ Admin Panel.
          From here you'll be able to manage products,
          orders, customers and website settings.
        </p>
      </div>
    </div>
  );
}