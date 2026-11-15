"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import SearchModal from "./SearchModal";

const links = [
  { href: "/", label: "خانه" },
  { href: "/shop", label: "همه محصولات" },
  { href: "/shop?category=skincare", label: "مراقبت پوست" },
  { href: "/shop?category=makeup", label: "آرایش" },
  { href: "/shop?category=fragrance", label: "عطر" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { openCart, totalItems, cartPulse } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-cream/80 backdrop-blur-xl border-b border-ink/5 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          
          <Link href="/" className="flex flex-col items-center leading-none">
            <span className="font-display text-[26px] tracking-[0.35em] text-ink">NILA</span>
            <span className="mt-1 text-[10px] tracking-[0.55em] text-ink/50">نیلا</span>
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {links.map((l) => (
              <Link 
                key={l.href} 
                href={l.href} 
                className="text-[13px] text-ink/80 hover:text-rose transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="جستجو"
              className="hidden rounded-full p-2.5 text-ink/80 transition-colors hover:bg-blush hover:text-rose sm:block"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>
            
            <button 
              id="cart-icon"
              onClick={openCart} 
              aria-label="سبد خرید" 
              className="relative rounded-full p-2.5 text-ink transition-colors hover:bg-blush hover:text-rose"
            >
              <motion.div
                animate={cartPulse ? { scale: [1, 1.4, 1], rotate: [0, -15, 15, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <ShoppingBag size={19} strokeWidth={1.5} />
              </motion.div>
              
              {totalItems > 0 && (
                <span className="absolute -left-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <button 
              onClick={() => setMobileOpen((v) => !v)} 
              aria-label="منو" 
              className="rounded-full p-2.5 text-ink transition-colors hover:bg-blush hover:text-rose lg:hidden"
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-x-0 top-[68px] z-40 border-b border-ink/5 bg-cream/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-6">
              {links.map((l) => (
                <Link 
                  key={l.href} 
                  href={l.href} 
                  onClick={() => setMobileOpen(false)} 
                  className="border-b border-ink/5 py-3 text-sm text-ink/80 hover:text-rose transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}