"use client";

import { createContext, useContext, useState } from "react";

type CartItem = {
  id: number;
  cartKey: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  weight?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartKey: string) => void;
  increaseQuantity: (cartKey: string) => void;
  decreaseQuantity: (cartKey: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
});

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) => p.cartKey === item.cartKey
      );

      if (existing) {
        return prev.map((p) =>
          p.cartKey === item.cartKey
            ? {
                ...p,
                quantity: p.quantity + 1,
              }
            : p
        );
      }

      return [...prev, item];
    });
  };

  const removeFromCart = (cartKey: string) => {
    setCart((prev) =>
      prev.filter((item) => item.cartKey !== cartKey)
    );
  };

  const increaseQuantity = (cartKey: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartKey === cartKey
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (cartKey: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);