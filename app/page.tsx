"use client";

import { useState } from "react";
import Image from "next/image";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import AboutSection from "./components/AboutSection";
import ReviewsSection from "./components/ReviewsSection";
export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-[#f8f6ef] min-h-screen">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-36 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-[#C8A24C] font-semibold mb-3">
              100% Natural Herbal Products
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1B5E20] leading-tight">
              CARE WITH HERBS
            </h1>

           <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-700">
  Premium Ayurvedic Herbs for a Healthy Lifestyle.
</p>

<div className="mt-8 flex flex-wrap gap-3">

  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-green-100">
    <span>🌿</span>
    <span className="text-sm font-medium text-[#1B5E20]">
      100% Natural
    </span>
  </div>

  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-green-100">
    <span>🚚</span>
    <span className="text-sm font-medium text-[#1B5E20]">
      Free Shipping
    </span>
  </div>

  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-green-100">
    <span>⭐</span>
    <span className="text-sm font-medium text-[#1B5E20]">
      Premium Quality
    </span>
  </div>

  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-green-100">
    <span>🇮🇳</span>
    <span className="text-sm font-medium text-[#1B5E20]">
      Made in India
    </span>
  </div>

</div>

            <button
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-8 bg-[#C8A24C] hover:bg-[#b8923d] text-white px-8 py-4 rounded-full transition"
            >
              Shop Now
            </button>
          </div>

        <div className="relative h-[360px] sm:h-[470px] md:h-[620px] flex items-center justify-center">

  {/* Main Glow */}
  <div className="absolute w-72 h-72 md:w-[420px] md:h-[420px] rounded-full bg-green-100 blur-3xl opacity-80"></div>

  {/* Golden Glow */}
  <div className="absolute w-52 h-52 rounded-full bg-[#C8A24C]/20 blur-3xl"></div>

  <Image
    src="/products/amla.png"
    alt="Amla Powder"
    fill
    priority
    className="object-contain relative z-10 transition-transform duration-500 hover:scale-105 drop-shadow-[0_25px_45px_rgba(0,0,0,0.25)]"
  />

</div>

        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Products */}
      <section
           id="products"
           className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-36 pb-16 md:pb-20">
      

        <h2 className="text-4xl font-bold text-center text-[#1B5E20] mb-8">
          Our Products
        </h2>

        {/* Search Box */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="🔍 Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            "All",
            "Immunity",
            "Hair Care",
            "Heart Care",
            "Diabetes Care",
            "Skin Care",
            "Men's Health",
            "Women's Health",
            "Digestive Care",
            "General Wellness",
          ].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full transition font-medium ${
                selectedCategory === category
                  ? "bg-[#1B5E20] text-white"
                  : "bg-white border border-gray-300 hover:bg-[#1B5E20] hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

 <ReviewsSection />

<Footer />


    </main>
  );
}