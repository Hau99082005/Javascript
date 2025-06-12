"use client";
import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext({ cartCount: 0, updateCartCount: (_count: number) => {} });

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const userID = typeof window !== 'undefined' ? localStorage.getItem("userID") : null;
    if (userID) {
      fetch(`/api/cart/all-cart-items?_id=${userID}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) setCartCount(data.data.length);
        });
    }
  }, []);

  const updateCartCount = (count: number) => setCartCount(count);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext); 