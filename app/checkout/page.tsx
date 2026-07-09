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

  const handleCheckout = () => {
    if (!form.name.trim()) {
      alert("Please enter your Full Name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit Mobile Number.");
      return;
    }

    if (!form.address.trim()) {
      alert("Please enter your Address.");
      return;
    }

    if (!form.city.trim()) {
      alert("Please enter your City.");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      alert("Please enter a valid 6-digit PIN Code.");
      return;
    }

    const message = encodeURIComponent(`🌿 CARE WITH HERBS ORDER

Customer Details

👤 Name: ${form.name}
📞 Phone: ${form.phone}

🏠 Address:
${form.address}

🏙️ City: ${form.city}

📮 PIN Code: ${form.pincode}

----------------------------

Order Details

${cart
  .map(
    (item) =>
      `• ${item.name}
Qty: ${item.quantity}
Price: ₹${item.price * item.quantity}`
  )
  .join("\n\n")}

----------------------------

💰 Total Amount: ₹${total}

Thank You 🙏`);

    window.open(
      `https://wa.me/918533004409?text=${message}`,
      "_blank"
    );
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-32">

      <h1 className="text-4xl font-bold text-[#1B5E20] mb-10">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* Customer Details */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Customer Details
          </h2>

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
                setForm({
                  ...form,
                  address: e.target.value,
                })
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
                setForm({
                  ...form,
                  pincode: e.target.value,
                })
              }
              className="w-full border rounded-xl p-4"
            />

          </div>

        </div>

        {/* Order Summary */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b pb-3"
              >
                <div>
                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p className="text-gray-500 text-sm">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-bold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}

          </div>

          <div className="flex justify-between text-2xl font-bold mt-8">

            <span>Total</span>

            <span>₹{total}</span>

          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold transition"
          >
            📱 Place Order on WhatsApp
          </button>

        </div>

      </div>

    </main>
  );
}