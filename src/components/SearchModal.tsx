"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products, formatPrice } from "@/data/products";

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  // بستن با دکمه Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // قفل کردن اسکرول پس‌زمینه
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // فیلتر کردن محصولات به صورت زنده
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.includes(query) ||
        p.nameEn.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery)
    ).slice(0, 6); // حداکثر ۶ نتیجه نمایش داده می‌شه
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* پس‌زمینه تیره و بلور */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-ink/60 backdrop-blur-md"
          />

          {/* باکس جستجو */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-24 z-[210] w-full max-w-2xl -translate-x-1/2 px-4 sm:top-32"
          >
            <div className="overflow-hidden rounded-3xl bg-cream shadow-2xl">
              {/* اینپوت */}
              <div className="relative flex items-center border-b border-ink/10 px-6 py-4">
                <Search size={22} className="text-ink/40" />
                <input
                  autoFocus
                  type="text"
                  placeholder="جستجوی محصول، برند یا دسته‌بندی..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent px-4 py-2 text-lg text-ink outline-none placeholder:text-ink/30"
                />
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-ink/40 transition-colors hover:bg-blush hover:text-ink"
                >
                  <X size={20} />
                </button>
              </div>

              {/* نتایج */}
              <div className="max-h-[60vh] overflow-y-auto p-4">
                {query.trim() === "" ? (
                  <p className="py-10 text-center text-sm text-ink/40">
                    برای شروع، نام محصول یا برند مورد نظر خود را تایپ کنید...
                  </p>
                ) : results.length === 0 ? (
                  <p className="py-10 text-center text-sm text-ink/40">
                    محصولی با این عنوان یافت نشد.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={onClose}
                        className="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-blush"
                      >
                        <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-blush">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <span className="text-[10px] uppercase tracking-widest text-ink/50">
                            {product.brand}
                          </span>
                          <span className="font-display text-base text-ink group-hover:text-gold">
                            {product.name}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-ink/70">
                          {formatPrice(product.price)}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}