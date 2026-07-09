"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const whatsappMessage = encodeURIComponent(`
Hello Care With Herbs,

Customer Details

Name: ${form.name}
Phone: ${form.phone}
Address: ${form.address}
City: ${form.city}
PIN Code: ${form.pincode}

-------------------------

Order Details

${cart
  .map(
    (item) =>
      `${item.name}
Qty: ${item.quantity}
Price: ₹${item.price * item.quantity}`
  )
  .join("\n\n")}

-------------------------

Total Amount: ₹${total}

Thank You.
`);

  return (
    <main className="max-w-5xl mx-auto px-6 py-32">

      <h1 className="text-4xl font-bold text-[#1B5E20] mb-10">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Customer Details */}
        <div className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full border rounded-xl p-4"
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className="w-full border rounded-xl p-4"
          />

          <textarea
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            className="w-full border rounded-xl p-4 h-28"
          />

          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(e) =>
              setForm({ ...form, city: e.target.value })
            }
            className="w-full border rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="PIN Code"
            value={form.pincode}
            onChange={(e) =>
              setForm({ ...form, pincode: e.target.value })
            }
            className="w-full border rounded-xl p-4"
          />

        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}

          </div>

          <hr className="my-6" />

          <div className="flex justify-between text-2xl font-bold">

            <span>Total</span>

            <span>₹{total}</span>

          </div>

          <a
            href={`https://wa.me/918533004409?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-8 bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-xl font-semibold"
          >
            📱 Place Order on WhatsApp
          </a>

        </div>

      </div>

    </main>
  );
}