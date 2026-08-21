"use client";

import { useState } from "react";
import Script from "next/script";
import { useCart } from "../context/CartContext";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
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

    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      // 1. Create Razorpay order on server
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
        }),
      });

      const order = await res.json();

      if (!res.ok) {
        throw new Error(order?.error || "Unable to create payment order.");
      }

      // 2. Make sure Razorpay Checkout is loaded
      if (!window.Razorpay) {
        throw new Error("Razorpay Checkout is not loaded. Please try again.");
      }

      // 3. WhatsApp order message
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

💳 Payment: Razorpay

Thank You 🙏`);

      // 4. Razorpay Checkout options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "CARE WITH HERBS",

        description: "Online Herbal Purchase",

        image: "/images/logo.png",

        order_id: order.id,

        prefill: {
          name: form.name,
          contact: form.phone,
        },

        notes: {
          address: form.address,
          city: form.city,
          pincode: form.pincode,
        },

        theme: {
          color: "#16a34a",
        },

      handler: async function (response: any) {
  try {
    console.log("Razorpay Payment Response:", response);

    // Server par payment signature verify karo
    const verifyResponse = await fetch("/api/razorpay/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  razorpay_order_id: response.razorpay_order_id,
  razorpay_payment_id: response.razorpay_payment_id,
  razorpay_signature: response.razorpay_signature,

  customer_name: form.name,
  customer_phone: form.phone,
  address: form.address,
  city: form.city,
  pincode: form.pincode,

  items: cart,
  total_amount: total,
}),
    });

    const verification = await verifyResponse.json();

    if (!verifyResponse.ok || !verification.success) {
      console.error("Payment verification failed:", verification);

      alert(
        "❌ Payment verification failed.\n\nPlease contact CARE WITH HERBS support."
      );

      setLoading(false);
      return;
    }

    // Payment genuinely verified
    alert(
      "✅ Payment Verified Successfully!\n\nPayment ID: " +
        response.razorpay_payment_id
    );

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

💳 Payment: Razorpay
🧾 Payment ID: ${response.razorpay_payment_id}

Thank You 🙏`);

    // Cart sirf VERIFIED payment ke baad clear hoga
    clearCart();

    // WhatsApp open
    window.location.href =
      `https://wa.me/918533004409?text=${message}`;

  } catch (error) {
    console.error("Payment Verification Error:", error);

    alert(
      "❌ Payment verification could not be completed.\n\nPlease contact CARE WITH HERBS support."
    );

    setLoading(false);
  }
},

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response: any) {
        console.error("Razorpay Payment Failed:", response.error);

        alert(
          "❌ Payment Failed\n\n" +
            (response.error?.description || "Please try again.")
        );

        setLoading(false);
      });

      razorpay.open();
    } catch (error) {
      console.error("Checkout Error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

      setLoading(false);
    }
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
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-xl p-4"
            />

            <input
              type="tel"
              placeholder="Mobile Number"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
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
                setForm({
                  ...form,
                  city: e.target.value,
                })
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
            disabled={loading}
            className="w-full mt-8 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 rounded-xl text-lg font-semibold transition"
          >
            {loading
              ? "Opening Payment..."
              : "💳 Pay Securely with Razorpay"}
          </button>

        </div>

      </div>

      {/* Razorpay Checkout Script */}

      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

    </main>
  );
}