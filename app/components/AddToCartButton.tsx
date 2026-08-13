"use client";

import { useCart } from "@/app/context/CartContext";

type Props = {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
  selectedWeight?: string;
  selectedPrice?: number;
};

export default function AddToCartButton({
  product,
  selectedWeight,
  selectedPrice,
}: Props) {
  const { addToCart } = useCart();

  const finalPrice =
    selectedPrice !== undefined
      ? selectedPrice
      : product.price;

  const cartKey = `${product.id}-${selectedWeight || "default"}`;

  return (
    <button
      onClick={() =>
        addToCart({
          id: product.id,
          cartKey,
          name: product.name,
          image: product.image,
          price: finalPrice,
          quantity: 1,
          weight: selectedWeight,
        })
      }
      className="w-full sm:w-auto bg-[#C8A24C] hover:bg-[#b8923d] text-white px-8 py-4 rounded-xl font-semibold transition"
    >
      🛒 Add to Cart
    </button>
  );
}