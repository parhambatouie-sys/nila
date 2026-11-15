"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Product, formatPrice } from "@/data/products";
import ProductImage from "./ProductImage";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/product/${product.id}`} className="group block">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-blush">
          <ProductImage
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute top-4 right-4 rounded-full bg-cream/90 px-3 py-1 text-[10px] tracking-wider text-ink backdrop-blur-sm z-10">
              {product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] text-ink/50">
            <span className="uppercase tracking-[0.15em] font-medium">{product.brand}</span>
            <div className="flex items-center gap-1">
              <Star size={10} className="fill-gold text-gold" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="font-display text-lg text-ink transition-colors group-hover:text-gold">
            {product.name}
          </h3>

          <p className="text-xs text-ink/60 line-clamp-1">{product.shortDescription}</p>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-sm font-medium text-ink">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-ink/40 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}