"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({
  open,
  onClose,
}: CartDrawerProps) {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  if (!open) return null;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-2xl font-bold text-[#1B5E20]">
            🛒 Shopping Cart
          </h2>

          <button onClick={onClose}>
            <X size={28} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">

          {cart.length === 0 ? (
            <div className="text-center mt-20 text-gray-500">
              Your cart is empty.
            </div>
          ) : (
            <div className="space-y-5">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border rounded-xl p-3"
                >
                  <div className="relative w-20 h-20 bg-[#f8f6ef] rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1">

                    <h3 className="font-semibold text-[#1B5E20]">
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-3 mt-3">

                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold"
                      >
                        −
                      </button>

                      <span className="font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-8 h-8 rounded-full bg-[#1B5E20] text-white hover:bg-green-800 font-bold"
                      >
                        +
                      </button>

                    </div>

                    <p className="font-bold mt-3 text-[#1B5E20]">
                      ₹{item.price * item.quantity}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm mt-2 hover:underline"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="border-t p-5">

          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <Link
            href="/checkout"
            onClick={onClose}
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Proceed to Checkout
          </Link>

        </div>

      </div>
    </>
  );
}