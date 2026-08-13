"use client";

import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import ProductSizeSelector from "./ProductSizeSelector";

type Size = {
  weight: string;
  price: number;
  mrp: number;
};

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

type Props = {
  product: Product;
  sizes: Size[];
  whatsappNumber: string;
};

export default function ProductPurchase({
  product,
  sizes,
  whatsappNumber,
}: Props) {
  const firstSize = sizes?.[0];

  const [selectedSize, setSelectedSize] = useState<Size | undefined>(
    firstSize
  );

  const currentPrice = selectedSize?.price ?? product.price;
  const currentMrp = selectedSize?.mrp ?? product.price;
  const currentWeight = selectedSize?.weight ?? "";

  const discount =
    currentMrp > 0
      ? Math.round(
          ((currentMrp - currentPrice) / currentMrp) * 100
        )
      : 0;

  const whatsappMessage = `🌿 Hello Care With Herbs,

I'd like to place an order from your website.

🛍️ Product: ${product.name}
📦 Weight: ${currentWeight}
💰 Price: ₹${currentPrice}

Please confirm the order and payment details.

Thank you for choosing Care With Herbs. 🌿`;

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <>
      {sizes.length > 0 && (
        <ProductSizeSelector
          sizes={sizes}
          onSelect={(size) => setSelectedSize(size)}
        />
      )}

      <div className="mt-6 flex items-center gap-4 flex-wrap">
        <span className="text-3xl sm:text-4xl font-bold text-[#1B5E20]">
          ₹{currentPrice}
        </span>

        <span className="text-2xl text-gray-400 line-through">
          ₹{currentMrp}
        </span>

        {discount > 0 && (
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="mt-8">
        <div className="mb-4">
          <AddToCartButton
            product={product}
            selectedWeight={currentWeight}
            selectedPrice={currentPrice}
          />
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex justify-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition font-semibold"
        >
          📱 Order on WhatsApp
        </a>
      </div>
    </>
  );
}