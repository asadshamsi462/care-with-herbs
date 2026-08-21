"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const [storeName, setStoreName] = useState("CARE WITH HERBS");
  const [website, setWebsite] = useState("www.carewithherbs.in");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("918533004409");

  const [address, setAddress] = useState(
    "Street Punjabiyan, Near Patthar Wali Masjid, Nagina, District Bijnor (246762)"
  );

  const [razorpayEnabled, setRazorpayEnabled] = useState(true);
  const [orderNotifications, setOrderNotifications] =
    useState(true);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#1B5E20]">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage CARE WITH HERBS™ store settings.
        </p>
      </div>

      {/* Store Information */}
      <section className="bg-white rounded-2xl shadow-md p-6 md:p-8">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1B5E20]">
            🏪 Store Information
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Basic information about your store.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Store Name
            </label>

            <input
              type="text"
              value={storeName}
              onChange={(e) =>
                setStoreName(e.target.value)
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1B5E20]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Website
            </label>

            <input
              type="text"
              value={website}
              onChange={(e) =>
                setWebsite(e.target.value)
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1B5E20]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter store email"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1B5E20]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              WhatsApp Number
            </label>

            <input
              type="text"
              value={whatsapp}
              onChange={(e) =>
                setWhatsapp(e.target.value)
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1B5E20]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Store Address
            </label>

            <textarea
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1B5E20] resize-none"
            />
          </div>

        </div>

      </section>

      {/* Payment Settings */}
      <section className="bg-white rounded-2xl shadow-md p-6 md:p-8">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1B5E20]">
            💳 Payment Settings
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage online payment settings.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 border rounded-xl p-5">

          <div>
            <h3 className="font-semibold text-gray-800">
              Razorpay Payments
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Enable online payments through Razorpay.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setRazorpayEnabled(!razorpayEnabled)
            }
            className={`relative w-14 h-7 rounded-full transition ${
              razorpayEnabled
                ? "bg-[#1B5E20]"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 w-5 h-5 bg-white rounded-full transition ${
                razorpayEnabled
                  ? "left-8"
                  : "left-1"
              }`}
            />
          </button>

        </div>

      </section>

      {/* Order Settings */}
      <section className="bg-white rounded-2xl shadow-md p-6 md:p-8">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1B5E20]">
            📦 Order Settings
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage order-related preferences.
          </p>
        </div>

        <div className="border rounded-xl p-5">

          <div className="flex items-center justify-between gap-4">

            <div>
              <h3 className="font-semibold text-gray-800">
                Order Notifications
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Receive notifications when a new order is placed.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setOrderNotifications(
                  !orderNotifications
                )
              }
              className={`relative w-14 h-7 rounded-full transition ${
                orderNotifications
                  ? "bg-[#1B5E20]"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition ${
                  orderNotifications
                    ? "left-8"
                    : "left-1"
                }`}
              />
            </button>

          </div>

        </div>

      </section>

      {/* Admin Information */}
      <section className="bg-white rounded-2xl shadow-md p-6 md:p-8">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1B5E20]">
            👤 Administrator
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Current admin panel information.
          </p>
        </div>

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-[#1B5E20] text-white flex items-center justify-center font-bold text-xl">
            A
          </div>

          <div>
            <p className="font-semibold text-gray-800">
              Administrator
            </p>

            <p className="text-sm text-gray-500">
              CARE WITH HERBS™ Admin
            </p>
          </div>

        </div>

      </section>

      {/* Save */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl shadow-md p-6">

        <div>
          {saved && (
            <p className="text-green-600 font-semibold">
              ✓ Settings saved successfully
            </p>
          )}

          {!saved && (
            <p className="text-sm text-gray-500">
              Save your store preferences.
            </p>
          )}
        </div>

        <button
          onClick={handleSave}
          className="w-full sm:w-auto bg-[#1B5E20] hover:bg-[#154818] text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition"
        >
          💾 Save Settings
        </button>

      </div>

      {/* Demo Notice */}
      <div className="bg-[#F8F6EF] border border-[#C8A24C]/30 rounded-2xl p-5">

        <p className="text-sm text-gray-600">
          <strong className="text-[#1B5E20]">
            Note:
          </strong>{" "}
          Settings are currently stored temporarily in the
          page. Permanent saving will be enabled when we
          connect the admin panel to Supabase.
        </p>

      </div>

    </div>
  );
}