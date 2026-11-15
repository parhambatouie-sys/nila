"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function Bestsellers() {
  const bestsellers = products.slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 flex items-end justify-between"
      >
        <div>
          <span className="text-[11px] tracking-[0.4em] text-ink/50">BESTSELLERS</span>
          <h2 className="mt-3 font-display text-4xl text-ink lg:text-5xl">
            پرفروش‌ترین‌ها
          </h2>
        </div>
        <Link
          href="/shop"
          className="group hidden items-center gap-2 text-sm text-ink/70 transition-colors hover:text-ink sm:flex"
        >
          همه محصولات
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
        </Link>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {bestsellers.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="mt-12 flex justify-center sm:hidden">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-8 py-3 text-sm text-ink"
        >
          همه محصولات
          <ArrowLeft size={15} />
        </Link>
      </div>
    </section>
  );
}