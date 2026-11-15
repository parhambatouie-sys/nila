"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Twitter, Mail, X } from "lucide-react";

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalOpen(true);
  };

  return (
    <>
      <footer className="border-t border-ink/10 bg-cream pt-20 pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          
          {/* بخش بالایی: لوگو */}
          <div className="mb-12 flex flex-col items-center text-center">
            <Link href="/" className="inline-block">
              <span className="font-display text-4xl tracking-[0.35em] text-ink">NILA</span>
              <span className="mt-2 block text-[11px] tracking-[0.55em] text-ink/50">نیلا</span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/60">
              مجموعه‌ای منتخب از محصولات آرایشی و بهداشتی با فرمولاسیون خالص و طراحی مینیمال، برای بانوانی که زیبایی را ساده می‌خواهند.
            </p>
          </div>

          {/* بخش میانی: لینک‌ها */}
          <div className="grid grid-cols-2 gap-8 border-t border-ink/10 py-12 md:grid-cols-4 text-center md:text-right">
            <div>
              <h5 className="mb-4 text-xs font-medium tracking-wider text-ink">فروشگاه</h5>
              <ul className="space-y-3 text-sm text-ink/60">
                <li><Link href="/shop" className="hover:text-gold transition-colors">همه محصولات</Link></li>
                <li><Link href="/shop?category=skincare" className="hover:text-gold transition-colors">مراقبت پوست</Link></li>
                <li><Link href="/shop?category=makeup" className="hover:text-gold transition-colors">آرایش</Link></li>
                <li><Link href="/shop?category=fragrance" className="hover:text-gold transition-colors">عطر</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="mb-4 text-xs font-medium tracking-wider text-ink">خدمات مشتریان</h5>
              <ul className="space-y-3 text-sm text-ink/60">
                <li><a href="#" onClick={handleLinkClick} className="hover:text-gold transition-colors">پیگیری سفارشات</a></li>
                <li><a href="#" onClick={handleLinkClick} className="hover:text-gold transition-colors">شرایط ارسال</a></li>
                <li><a href="#" onClick={handleLinkClick} className="hover:text-gold transition-colors">بازگشت کالا</a></li>
                <li><a href="#" onClick={handleLinkClick} className="hover:text-gold transition-colors">سوالات متداول</a></li>
              </ul>
            </div>
            <div>
              <h5 className="mb-4 text-xs font-medium tracking-wider text-ink">درباره نیلا</h5>
              <ul className="space-y-3 text-sm text-ink/60">
                <li><a href="#" onClick={handleLinkClick} className="hover:text-gold transition-colors">داستان ما</a></li>
                <li><a href="#" onClick={handleLinkClick} className="hover:text-gold transition-colors">وبلاگ زیبایی</a></li>
                <li><a href="#" onClick={handleLinkClick} className="hover:text-gold transition-colors">فرصت‌های شغلی</a></li>
                <li><a href="#" onClick={handleLinkClick} className="hover:text-gold transition-colors">تماس با ما</a></li>
              </ul>
            </div>
            <div>
              <h5 className="mb-4 text-xs font-medium tracking-wider text-ink">ما را دنبال کنید</h5>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="#" onClick={handleLinkClick} className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-colors hover:border-gold hover:text-gold">
                  <Instagram size={18} strokeWidth={1.5} />
                </a>
                <a href="#" onClick={handleLinkClick} className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-colors hover:border-gold hover:text-gold">
                  <Twitter size={18} strokeWidth={1.5} />
                </a>
                <a href="#" onClick={handleLinkClick} className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-colors hover:border-gold hover:text-gold">
                  <Mail size={18} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>

          {/* بخش پایینی: کپی‌رایت */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 sm:flex-row">
            <p className="text-xs text-ink/40">
              © {new Date().getFullYear()} تمامی حقوق برای فروشگاه نیلا محفوظ است.
            </p>
            <p className="text-xs text-ink/40">
              طراحی و توسعه توسط <span className="font-medium text-ink">Parham Batouie</span>
            </p>
          </div>
        </div>
      </footer>

      {/* مودال "به زودی" */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 z-[200] bg-ink/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 z-[210] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-cream p-8 text-center shadow-2xl"
            >
              <button onClick={() => setModalOpen(false)} className="absolute left-4 top-4 text-ink/40 hover:text-ink">
                <X size={20} />
              </button>
              <h3 className="font-display text-xl text-ink">به زودی...</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/60">
                این بخش در نسخه نهایی و کامل سایت فعال خواهد شد. از شکیبایی شما سپاسگزاریم.
              </p>
              <button onClick={() => setModalOpen(false)} className="mt-6 w-full rounded-xl bg-ink py-3 text-sm text-cream">متوجه شدم</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}