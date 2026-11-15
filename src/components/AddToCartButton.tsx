"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, addFlyingItem } = useCart();

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    addToCart(product);
    
    const btn = e.currentTarget;
    const cartIcon = document.getElementById("cart-icon");
    
    if (btn && cartIcon) {
      const btnRect = btn.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();
      
      addFlyingItem({
        image: product.image,
        startX: btnRect.left + btnRect.width / 2 - 40,
        startY: btnRect.top + btnRect.height / 2 - 50,
        endX: cartRect.left + cartRect.width / 2 - 40,
        endY: cartRect.top + cartRect.height / 2 - 50,
      });
    }
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full rounded-full bg-rose py-4 text-sm text-white shadow-lg shadow-rose/20 transition-all duration-300 active:scale-[0.98] hover:bg-rose/90"
    >
      افزودن به سبد خرید
    </button>
  );
}