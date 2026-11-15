"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem extends Product {
  quantity: number;
}

export interface FlyingItem {
  id: string;
  image: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface CartCtx {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  flyingItems: FlyingItem[];
  addFlyingItem: (item: Omit<FlyingItem, "id">) => void;
  cartPulse: boolean;
}

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const [cartPulse, setCartPulse] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const addFlyingItem = (item: Omit<FlyingItem, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setFlyingItems((prev) => [...prev, { ...item, id }]);

    setTimeout(() => {
      setFlyingItems((prev) => prev.filter((i) => i.id !== id));
      setCartPulse(true);
      setTimeout(() => setCartPulse(false), 500);
      openCart(); 
    }, 800);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return removeFromCart(id);
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        isOpen, openCart, closeCart, items, addToCart, removeFromCart,
        updateQuantity, clearCart, totalItems, totalPrice,
        flyingItems, addFlyingItem, cartPulse,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}