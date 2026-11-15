"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowDown } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink">
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=2000&q=90"
          alt="نیلا"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-ink/70 via-ink/30 to-ink/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />
      </motion.div>

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-rose" />
              <span className="text-[11px] tracking-[0.4em] text-cream/80">نیلا — نسخه‌ی ویژه ۲۰۲۵</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.55, ease }}
              className="font-display text-[44px] leading-[1.15] text-cream sm:text-6xl lg:text-7xl"
            >
              زیبایی،
              <br />
              در <span className="italic text-rose">خالص‌ترین</span> شکلِ خود.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.75, ease }}
              className="mt-7 max-w-md text-[15px] leading-relaxed text-cream/75"
            >
              مجموعه‌ای منتخب از محصولات آرایشی و مراقبت پوست، با فرمولاسیونِ خالص و طراحیِ مینیمال.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.95, ease }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 text-[13px] font-medium text-ink transition-all duration-500 hover:bg-rose"
              >
                مشاهده محصولات
                <ArrowLeft size={16} className="transition-transform duration-500 group-hover:-translate-x-1" />
              </Link>
              <Link
                href="/shop?category=fragrance"
                className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-8 py-4 text-[13px] text-cream/90 hover:border-cream hover:text-cream"
              >
                کلکسیون عطر
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/60"
      >
        <span className="text-[10px] tracking-[0.4em]">SCROLL</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown size={16} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}