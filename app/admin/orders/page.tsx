"use client";

import { useEffect, useMemo, useState } from "react";

type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

type OrderItem = {
  name?: string;
  quantity?: number;
  price?: number;
};

type Order = {
  id: string;
  databaseId: number;
  customer: string;
  phone: string;
  products: string;
  amount: number;
  date: string;
  status: OrderStatus;
  paymentStatus: string;
  paymentId: string;
  razorpayOrderId: string;
};

const statusOptions: ("All" | OrderStatus)[] = [
  "All",
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"All" | OrderStatus>("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/orders", {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Failed to load orders"
        );
      }

      const formattedOrders: Order[] = (result.orders || []).map(
        (order: any) => {
          const items: OrderItem[] = Array.isArray(order.items)
            ? order.items
            : [];

          const productsText =
            items.length > 0
              ? items
                  .map(
                    (item) =>
                      `${item.name || "Product"} × ${
                        item.quantity || 1
                      }`
                  )
                  .join(", ")
              : "Order details unavailable";

          const validStatus = statusOptions.includes(
            order.order_status
          )
            ? order.order_status
            : "Confirmed";

          return {
            id:
              order.razorpay_order_id ||
              `CWH-${order.id}`,

            databaseId: order.id,

            customer:
              order.customer_name || "Unknown Customer",

            phone:
              order.customer_phone || "No phone",

            products: productsText,

            amount: Number(order.total_amount) || 0,

            date: order.created_at
              ? new Date(order.created_at).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )
              : "-",

            status: validStatus as OrderStatus,

            paymentStatus:
              order.payment_status || "unknown",

            paymentId:
              order.razorpay_payment_id || "",

            razorpayOrderId:
              order.razorpay_order_id || "",
          };
        }
      );

      setOrders(formattedOrders);
    } catch (error) {
      console.error("Orders loading error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        order.id.toLowerCase().includes(searchText) ||
        order.customer.toLowerCase().includes(searchText) ||
        order.phone.toLowerCase().includes(searchText) ||
        order.products.toLowerCase().includes(searchText) ||
        order.paymentId.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const updateStatus = async (
    orderId: number,
    newStatus: OrderStatus
  ) => {
    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: orderId,
          order_status: newStatus,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Failed to update order"
        );
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.databaseId === orderId
            ? {
                ...order,
                status: newStatus,
              }
            : order
        )
      );
    } catch (error) {
      console.error("Status update error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to update order status"
      );
    }
  };

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const totalRevenue = orders
    .filter(
      (order) =>
        order.status !== "Cancelled" &&
        order.paymentStatus === "paid"
    )
    .reduce(
      (total, order) => total + order.amount,
      0
    );

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">

      {/* Page Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>
          <h1 className="text-4xl font-bold text-[#1B5E20]">
            Orders Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage and track CARE WITH HERBS™ customer orders.
          </p>
        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={loadOrders}
            disabled={loading}
            className="bg-white border border-gray-200 px-4 py-3 rounded-xl font-semibold shadow-sm hover:bg-gray-50 disabled:opacity-50"
          >
            🔄 Refresh
          </button>

          <div className="bg-[#1B5E20] text-white px-5 py-3 rounded-xl font-semibold shadow-lg">
            🛒 {totalOrders} Total Orders
          </div>

        </div>

      </div>

      {/* Error */}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-5">
          <p className="font-semibold">
            Unable to load orders
          </p>

          <p className="text-sm mt-1">
            {error}
          </p>
        </div>
      )}

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-[#1B5E20]">
          <p className="text-gray-500 text-sm">
            Total Orders
          </p>

          <h2 className="text-3xl font-bold text-[#1B5E20] mt-2">
            {totalOrders}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-yellow-500">
          <p className="text-gray-500 text-sm">
            Pending
          </p>

          <h2 className="text-3xl font-bold text-yellow-600 mt-2">
            {pendingOrders}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500">
          <p className="text-gray-500 text-sm">
            Delivered
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {deliveredOrders}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-[#C8A24C]">
          <p className="text-gray-500 text-sm">
            Revenue
          </p>

          <h2 className="text-3xl font-bold text-[#C8A24C] mt-2">
            ₹{totalRevenue}
          </h2>
        </div>

      </div>

      {/* Search & Filter */}

      <div className="bg-white rounded-2xl shadow-md p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="🔍 Search order, customer or product..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            className="w-full border border-gray-200 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-[#1B5E20]"
          />

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as
                  | "All"
                  | OrderStatus
              )
            }
            className="w-full border border-gray-200 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-[#1B5E20]"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status === "All"
                  ? "All Order Status"
                  : status}
              </option>
            ))}
          </select>

        </div>

      </div>

      {/* Orders Table */}

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        <div className="px-6 py-5 border-b flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-[#1B5E20]">
              Recent Orders
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {filteredOrders.length} order
              {filteredOrders.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>
          </div>

        </div>

        {loading ? (
          <div className="text-center py-16">

            <div className="text-4xl mb-4">
              ⏳
            </div>

            <p className="text-gray-500">
              Loading orders...
            </p>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="min-w-[1200px] w-full">

              <thead className="bg-[#0F3D2E] text-white">

                <tr>

                  <th className="px-5 py-4 text-left">
                    Order ID
                  </th>

                  <th className="px-5 py-4 text-left">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left">
                    Products
                  </th>

                  <th className="px-5 py-4 text-left">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-left">
                    Date
                  </th>

                  <th className="px-5 py-4 text-left">
                    Payment
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

                {filteredOrders.map((order) => (

                  <tr
                    key={order.databaseId}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="px-5 py-5">

                      <span className="font-bold text-[#1B5E20]">
                        {order.id}
                      </span>

                      {order.paymentId && (
                        <p className="text-xs text-gray-400 mt-1">
                          {order.paymentId}
                        </p>
                      )}

                    </td>

                    <td className="px-5 py-5">

                      <p className="font-semibold text-gray-800">
                        {order.customer}
                      </p>

                      <p className="text-sm text-gray-500">
                        {order.phone}
                      </p>

                    </td>

                    <td className="px-5 py-5 text-gray-700 max-w-[280px]">
                      {order.products}
                    </td>

                    <td className="px-5 py-5 font-bold text-[#1B5E20]">
                      ₹{order.amount}
                    </td>

                    <td className="px-5 py-5 text-gray-600">
                      {order.date}
                    </td>

                    <td className="px-5 py-5">

                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                          order.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>

                    </td>

                    <td className="px-5 py-5">

                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>

                    </td>

                    <td className="px-5 py-5 text-center">

                      <select
                        value={order.status}
                        onChange={(event) =>
                          updateStatus(
                            order.databaseId,
                            event.target.value as OrderStatus
                          )
                        }
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1B5E20]"
                      >

                        {statusOptions
                          .filter(
                            (status) => status !== "All"
                          )
                          .map((status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          ))}

                      </select>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

        {/* Empty State */}

        {!loading &&
          filteredOrders.length === 0 && (

            <div className="text-center py-16 px-6">

              <div className="text-5xl mb-4">
                🛒
              </div>

              <h3 className="text-xl font-bold text-[#1B5E20]">
                No Orders Found
              </h3>

              <p className="text-gray-500 mt-2">
                Try changing your search or status filter.
              </p>

            </div>
          )}

      </div>

      {/* Live Database Notice */}

      <div className="bg-[#F8F6EF] border border-[#C8A24C]/30 rounded-2xl p-5">

        <p className="text-sm text-gray-600">
          <strong className="text-[#1B5E20]">
            Live Supabase Orders:
          </strong>{" "}
          Orders shown here are loaded directly from your
          Supabase database. Status changes are saved
          permanently.
        </p>

      </div>

    </div>
  );
}