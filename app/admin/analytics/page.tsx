"use client";

import { useMemo, useState } from "react";

type SalesData = {
  month: string;
  revenue: number;
  orders: number;
};

const salesData: SalesData[] = [
  { month: "Mar", revenue: 18400, orders: 42 },
  { month: "Apr", revenue: 22100, orders: 51 },
  { month: "May", revenue: 26800, orders: 63 },
  { month: "Jun", revenue: 31400, orders: 74 },
  { month: "Jul", revenue: 38200, orders: 89 },
  { month: "Aug", revenue: 42600, orders: 97 },
];

const topProducts = [
  {
    name: "Amla Powder",
    sales: 48,
    revenue: 7200,
  },
  {
    name: "Ashwagandha Powder",
    sales: 36,
    revenue: 7560,
  },
  {
    name: "Neem Powder",
    sales: 31,
    revenue: 4030,
  },
  {
    name: "Satawar Powder",
    sales: 24,
    revenue: 5520,
  },
  {
    name: "Safed Musli",
    sales: 19,
    revenue: 4750,
  },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("6 Months");

  const totalRevenue = salesData.reduce(
    (total, item) => total + item.revenue,
    0
  );

  const totalOrders = salesData.reduce(
    (total, item) => total + item.orders,
    0
  );

  const averageOrderValue =
    totalOrders > 0
      ? Math.round(totalRevenue / totalOrders)
      : 0;

  const maxRevenue = Math.max(
    ...salesData.map((item) => item.revenue)
  );

  const highestMonth = useMemo(() => {
    return salesData.reduce((highest, current) =>
      current.revenue > highest.revenue
        ? current
        : highest
    );
  }, []);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-4xl font-bold text-[#1B5E20]">
            Analytics
          </h1>

          <p className="text-gray-500 mt-2">
            Track CARE WITH HERBS™ sales and business performance.
          </p>
        </div>

        <select
          value={period}
          onChange={(event) =>
            setPeriod(event.target.value)
          }
          className="bg-white border border-gray-200 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-[#1B5E20]"
        >
          <option>6 Months</option>
          <option>12 Months</option>
          <option>This Year</option>
        </select>

      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500 text-sm">
            Total Revenue
          </p>

          <h2 className="text-3xl font-bold text-[#1B5E20] mt-2">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </h2>

          <p className="text-green-600 text-sm mt-2">
            ↑ Growing steadily
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500 text-sm">
            Total Orders
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {totalOrders}
          </h2>

          <p className="text-green-600 text-sm mt-2">
            ↑ Orders received
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500 text-sm">
            Average Order Value
          </p>

          <h2 className="text-3xl font-bold text-[#C8A24C] mt-2">
            ₹{averageOrderValue}
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Per order
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500 text-sm">
            Best Month
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            {highestMonth.month}
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            ₹{highestMonth.revenue.toLocaleString("en-IN")}
          </p>
        </div>

      </div>

      {/* Sales Overview */}
      <div className="bg-white rounded-2xl shadow-md p-6">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-xl font-bold text-[#1B5E20]">
              Sales Overview
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Revenue and order performance
            </p>
          </div>

          <span className="text-sm text-gray-500">
            {period}
          </span>

        </div>

        <div className="space-y-5">

          {salesData.map((item) => {

            const percentage =
              (item.revenue / maxRevenue) * 100;

            return (
              <div key={item.month}>

                <div className="flex items-center justify-between mb-2">

                  <span className="font-semibold text-gray-700">
                    {item.month}
                  </span>

                  <div className="text-right">
                    <span className="font-semibold text-[#1B5E20]">
                      ₹{item.revenue.toLocaleString("en-IN")}
                    </span>

                    <span className="text-xs text-gray-500 ml-3">
                      {item.orders} orders
                    </span>
                  </div>

                </div>

                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-[#1B5E20] rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          <div className="px-6 py-5 border-b">

            <h2 className="text-xl font-bold text-[#1B5E20]">
              Top Products
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Best performing products
            </p>

          </div>

          <div className="divide-y">

            {topProducts.map((product, index) => (

              <div
                key={product.name}
                className="px-6 py-5 flex items-center justify-between gap-4"
              >

                <div className="flex items-center gap-4">

                  <div className="w-9 h-9 rounded-full bg-[#F8F6EF] text-[#1B5E20] flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      {product.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {product.sales} units sold
                    </p>
                  </div>

                </div>

                <p className="font-bold text-[#1B5E20]">
                  ₹{product.revenue.toLocaleString("en-IN")}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Order Status */}
        <div className="bg-white rounded-2xl shadow-md">

          <div className="px-6 py-5 border-b">

            <h2 className="text-xl font-bold text-[#1B5E20]">
              Order Status
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Current order distribution
            </p>

          </div>

          <div className="p-6 space-y-5">

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">
                  Delivered
                </span>

                <span className="text-green-600 font-semibold">
                  52%
                </span>
              </div>

              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "52%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">
                  Shipped
                </span>

                <span className="text-purple-600 font-semibold">
                  21%
                </span>
              </div>

              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: "21%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">
                  Confirmed
                </span>

                <span className="text-blue-600 font-semibold">
                  15%
                </span>
              </div>

              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: "15%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">
                  Pending
                </span>

                <span className="text-yellow-600 font-semibold">
                  8%
                </span>
              </div>

              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: "8%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">
                  Cancelled
                </span>

                <span className="text-red-600 font-semibold">
                  4%
                </span>
              </div>

              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: "4%" }}
                />
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Demo Notice */}
      <div className="bg-[#F8F6EF] border border-[#C8A24C]/30 rounded-2xl p-5">

        <p className="text-sm text-gray-600">
          <strong className="text-[#1B5E20]">
            Demo data:
          </strong>{" "}
          Analytics currently uses sample data. Once
          Supabase is connected, these figures will be
          replaced with real store data automatically.
        </p>

      </div>

    </div>
  );
}