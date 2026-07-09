"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cart } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur border-b border-green-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Care With Herbs"
              width={50}
              height={50}
              priority
            />

            <div className="hidden sm:block">
              <h1 className="font-bold text-xl text-[#1B5E20]">
                CARE WITH HERBS
              </h1>

              <p className="text-xs text-gray-500">
                Premium Herbal Wellness
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">
            <a href="/">Home</a>
            <a href="/#products">Products</a>
            <a href="/#about">About</a>
            <a href="/#contact">Contact</a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Desktop Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="hidden md:flex relative bg-[#C8A24C] hover:bg-[#b8923d] text-white px-5 py-2 rounded-full items-center gap-2 transition"
            >
              <ShoppingCart size={18} />
              Cart

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
            >
              {menuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">

            <a
              href="/"
              onClick={closeMenu}
              className="block px-6 py-4 border-b"
            >
              Home
            </a>

            <a
              href="/#products"
              onClick={closeMenu}
              className="block px-6 py-4 border-b"
            >
              Products
            </a>

            <a
              href="/#about"
              onClick={closeMenu}
              className="block px-6 py-4 border-b"
            >
              About
            </a>

            <a
              href="/#contact"
              onClick={closeMenu}
              className="block px-6 py-4 border-b"
            >
              Contact
            </a>

            <div className="p-5">
              <button
                onClick={() => {
                  setCartOpen(true);
                  closeMenu();
                }}
                className="relative w-full bg-[#C8A24C] text-white py-3 rounded-xl"
              >
                🛒 Cart

                {totalItems > 0 && (
                  <span className="absolute top-2 right-4 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

          </div>
        )}
      </header>
       
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}