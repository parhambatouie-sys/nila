"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function FlyToCart() {
  const { flyingItems } = useCart();

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {flyingItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ 
              x: item.startX, 
              y: item.startY, 
              scale: 1, 
              opacity: 1 
            }}
            animate={{ 
              x: item.endX, 
              y: item.endY, 
              scale: 0.1, 
              opacity: 0.5,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-24 w-20 rounded-xl overflow-hidden shadow-2xl bg-white border border-ink/10"
          >
            <Image src={item.image} alt="flying-product" fill className="object-cover" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}