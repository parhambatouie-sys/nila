"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

export default function CheckoutModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { items, totalPrice } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    postalCode: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoToGateway = () => {
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.postalCode.trim()) {
      return alert("لطفاً تمامی فیلدهای ستاره‌دار را پر کنید.");
    }
    
    // ذخیره اطلاعات کامل سفارش
    const orderData = {
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      postalCode: formData.postalCode,
      totalPrice: totalPrice,
      items: items.map((i) => `${i.name} (x${i.quantity})`),
    };
    
    localStorage.setItem("nila_pending_order", JSON.stringify(orderData));
    
    onClose();
    router.push("/mock-gateway");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-ink/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[110] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-cream p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button onClick={onClose} className="absolute left-6 top-6 text-ink/40 hover:text-rose transition-colors">
              <X size={20} />
            </button>

            <h2 className="mb-6 font-display text-2xl text-ink text-center">تسویه حساب</h2>
            
            <div className="space-y-4">
              {/* نام */}
              <div>
                <label className="text-xs text-ink/60">نام و نام خانوادگی <span className="text-rose">*</span></label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="مثلاً سارا احمدی"
                  className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-rose"
                />
              </div>

              {/* شماره تماس */}
              <div>
                <label className="text-xs text-ink/60">شماره تماس <span className="text-rose">*</span></label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-rose"
                  dir="ltr"
                />
              </div>

              {/* آدرس */}
              <div>
                <label className="text-xs text-ink/60">آدرس کامل پستی <span className="text-rose">*</span></label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="استان، شهر، خیابان، پلاک..."
                  rows={2}
                  className="mt-1 w-full resize-none rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-rose"
                />
              </div>

              {/* کد پستی */}
              <div>
                <label className="text-xs text-ink/60">کد پستی <span className="text-rose">*</span></label>
                <input
                  name="postalCode"
                  type="text"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="۱۰ رقم بدون خط تیره"
                  maxLength={10}
                  className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-rose"
                  dir="ltr"
                />
              </div>

              <div className="flex items-center justify-between border-y border-ink/10 py-4 text-sm">
                <span className="text-ink/60">مبلغ قابل پرداخت</span>
                <span className="font-medium text-ink">{formatPrice(totalPrice)}</span>
              </div>
              
              <button
                onClick={handleGoToGateway}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-rose py-4 text-sm text-white shadow-lg shadow-rose/20 transition-all duration-300 hover:bg-rose/90 active:scale-[0.98]"
              >
                انتقال به درگاه پرداخت
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}