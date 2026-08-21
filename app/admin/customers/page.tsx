"use client";

import { useMemo, useState } from "react";

type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  orders: number;
  spent: number;
  lastOrder: string;
  status: "Active" | "Inactive";
};

const initialCustomers: Customer[] = [
  {
    id: "CWH-C001",
    name: "Rahul Sharma",
    phone: "98XXXXXX21",
    email: "rahul@example.com",
    orders: 4,
    spent: 620,
    lastOrder: "14 Aug 2026",
    status: "Active",
  },
  {
    id: "CWH-C002",
    name: "Priya Verma",
    phone: "97XXXXXX45",
    email: "priya@example.com",
    orders: 3,
    spent: 840,
    lastOrder: "13 Aug 2026",
    status: "Active",
  },
  {
    id: "CWH-C003",
    name: "Amit Kumar",
    phone: "96XXXXXX78",
    email: "amit@example.com",
    orders: 2,
    spent: 410,
    lastOrder: "12 Aug 2026",
    status: "Active",
  },
  {
    id: "CWH-C004",
    name: "Sana Khan",
    phone: "95XXXXXX32",
    email: "sana@example.com",
    orders: 1,
    spent: 100,
    lastOrder: "11 Aug 2026",
    status: "Active",
  },
  {
    id: "CWH-C005",
    name: "Mohit Singh",
    phone: "94XXXXXX19",
    email: "mohit@example.com",
    orders: 1,
    spent: 130,
    lastOrder: "10 Aug 2026",
    status: "Inactive",
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] =
    useState<Customer[]>(initialCustomers);

  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    const text = search.toLowerCase();

    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(text) ||
        customer.phone.toLowerCase().includes(text) ||
        customer.email.toLowerCase().includes(text) ||
        customer.id.toLowerCase().includes(text)
    );
  }, [customers, search]);

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const totalOrders = customers.reduce(
    (total, customer) => total + customer.orders,
    0
  );

  const totalSpent = customers.reduce(
    (total, customer) => total + customer.spent,
    0
  );

  const toggleStatus = (id: string) => {
    setCustomers((current) =>
      current.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              status:
                customer.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : customer
      )
    );
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#1B5E20]">
          Customers
        </h1>

        <p className="text-gray-500 mt-2">
          Manage CARE WITH HERBS™ customers.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500 text-sm">
            Total Customers
          </p>

          <h2 className="text-3xl font-bold text-[#1B5E20] mt-2">
            {totalCustomers}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500 text-sm">
            Active Customers
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {activeCustomers}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500 text-sm">
            Total Orders
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {totalOrders}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <p className="text-gray-500 text-sm">
            Customer Spending
          </p>

          <h2 className="text-3xl font-bold text-[#C8A24C] mt-2">
            ₹{totalSpent}
          </h2>
        </div>

      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-md p-6">

        <input
          type="text"
          placeholder="🔍 Search customer, phone or email..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="w-full border border-gray-200 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-[#1B5E20]"
        />

      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-bold text-[#1B5E20]">
            Customer List
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {filteredCustomers.length} customer
            {filteredCustomers.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="min-w-[1050px] w-full">

            <thead className="bg-[#0F3D2E] text-white">

              <tr>
                <th className="px-5 py-4 text-left">
                  Customer
                </th>

                <th className="px-5 py-4 text-left">
                  Phone
                </th>

                <th className="px-5 py-4 text-left">
                  Email
                </th>

                <th className="px-5 py-4 text-left">
                  Orders
                </th>

                <th className="px-5 py-4 text-left">
                  Total Spent
                </th>

                <th className="px-5 py-4 text-left">
                  Last Order
                </th>

                <th className="px-5 py-4 text-left">
                  Status
                </th>

                <th className="px-5 py-4 text-center">
                  Action
                </th>
              </tr>

            </thead>

            <tbody>

              {filteredCustomers.map((customer) => (

                <tr
                  key={customer.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="px-5 py-5">

                    <p className="font-semibold text-gray-800">
                      {customer.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {customer.id}
                    </p>

                  </td>

                  <td className="px-5 py-5 text-gray-700">
                    {customer.phone}
                  </td>

                  <td className="px-5 py-5 text-gray-700">
                    {customer.email}
                  </td>

                  <td className="px-5 py-5 font-semibold">
                    {customer.orders}
                  </td>

                  <td className="px-5 py-5 font-semibold text-[#1B5E20]">
                    ₹{customer.spent}
                  </td>

                  <td className="px-5 py-5 text-gray-600">
                    {customer.lastOrder}
                  </td>

                  <td className="px-5 py-5">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {customer.status}
                    </span>

                  </td>

                  <td className="px-5 py-5 text-center">

                    <button
                      onClick={() =>
                        toggleStatus(customer.id)
                      }
                      className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
                    >
                      {customer.status === "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {filteredCustomers.length === 0 && (

          <div className="text-center py-16 px-6">

            <div className="text-5xl mb-4">
              👥
            </div>

            <h3 className="text-xl font-bold text-[#1B5E20]">
              No Customers Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try another search.
            </p>

          </div>

        )}

      </div>

      {/* Demo Notice */}
      <div className="bg-[#F8F6EF] border border-[#C8A24C]/30 rounded-2xl p-5">

        <p className="text-sm text-gray-600">
          <strong className="text-[#1B5E20]">
            Demo data:
          </strong>{" "}
          Customer information will come from Supabase
          after database integration.
        </p>

      </div>

    </div>
  );
}