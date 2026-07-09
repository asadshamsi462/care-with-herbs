"use client";

import { useCart } from "@/app/context/CartContext";

type Props = {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() =>
        addToCart({
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1,
        })
      }
      className="w-full sm:w-auto bg-[#C8A24C] hover:bg-[#b8923d] text-white px-8 py-4 rounded-xl font-semibold transition"
    >
      🛒 Add to Cart
    </button>
  );
}