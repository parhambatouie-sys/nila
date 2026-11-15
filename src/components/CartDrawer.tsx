"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import CheckoutModal from "./CheckoutModal";

export default function CartDrawer() {
  const { isOpen, closeCart, items, totalPrice, updateQuantity, removeFromCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 z-[60] bg-ink/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
                <h2 className="font-display text-xl text-ink">سبد خرید</h2>
                <button onClick={closeCart} className="text-ink/50 hover:text-ink">
                  <X size={20} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-ink/40">
                    <p className="text-lg">سبد خرید شما خالی است.</p>
                    <button onClick={closeCart} className="mt-4 text-sm text-gold underline underline-offset-4">
                      بازگشت به فروشگاه
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-blush">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-ink">{item.name}</h3>
                            <p className="mt-1 text-xs text-ink/50">{formatPrice(item.price)}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 rounded-full border border-ink/10 px-3 py-1">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-ink/60 hover:text-ink">
                                <Minus size={14} />
                              </button>
                              <span className="text-xs">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-ink/60 hover:text-ink">
                                <Plus size={14} />
                              </button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-500">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-ink/10 bg-cream p-6">
                  <div className="mb-4 flex items-center justify-between font-medium">
                    <span className="text-ink/70">مجموع</span>
                    <span className="text-lg text-ink">{formatPrice(totalPrice)}</span>
                  </div>
                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full rounded-full bg-ink py-4 text-sm text-cream transition-transform hover:bg-ink/90 active:scale-[0.98]"
                  >
                    ادامه و پرداخت
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
}