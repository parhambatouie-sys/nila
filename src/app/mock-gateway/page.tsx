"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, Lock, Check, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
// 👈 ایمپورت تابع جدید
import { sendOrderToMessengers } from "@/app/actions";
import { formatPrice } from "@/data/products";

export default function MockGateway() {
  const router = useRouter();
  const { clearCart } = useCart();
  
  const [order, setOrder] = useState<{ 
    customerName: string; 
    phone: string; 
    address: string; 
    postalCode: string; 
    totalPrice: number; 
    items: string[] 
  } | null>(null);
  
  const [status, setStatus] = useState<"form" | "loading" | "success">("form");

  useEffect(() => {
    const saved = localStorage.getItem("nila_pending_order");
    if (saved) {
      setOrder(JSON.parse(saved));
    } else {
      router.push("/");
    }
  }, [router]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    if (order) {
      try {
        // 👈 صدا زدن تابع جدید
        await sendOrderToMessengers({
          customerName: order.customerName,
          phone: order.phone,
          address: order.address,
          postalCode: order.postalCode,
          totalPrice: order.totalPrice,
          items: order.items,
        });
      } catch (error) {
        console.error("خطا در ارسال سفارش:", error);
      }
    }

    setTimeout(() => {
      setStatus("success");
      clearCart();
      localStorage.removeItem("nila_pending_order");
    }, 2000);
  };

  if (!order) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream p-4" dir="rtl">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl border border-ink/5">
        
        <div className="flex items-center justify-between border-b border-ink/5 bg-white px-6 py-4">
          <div className="flex items-center gap-2 text-ink">
            <ShieldCheck size={24} className="text-rose" />
            <span className="font-bold">درگاه پرداخت اینترنتی</span>
          </div>
          <span className="text-sm text-ink/50">شاپرک</span>
        </div>

        {status === "success" ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center p-8 text-center"
          >
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Check size={40} />
            </div>
            <h2 className="text-xl font-bold text-ink">پرداخت با موفقیت انجام شد</h2>
            <p className="mt-2 text-sm text-ink/60">شماره پیگیری: {Math.floor(Math.random() * 900000000) + 100000000}</p>
            <div className="mt-6 w-full rounded-lg bg-rose/5 p-4 text-sm text-ink/80 border border-rose/10">
              مبلغ: <span className="font-bold text-rose">{formatPrice(order.totalPrice)}</span>
            </div>
            <button 
              onClick={() => router.push("/")}
              className="mt-8 w-full rounded-lg bg-rose py-3 text-white shadow-lg shadow-rose/20 transition-all duration-300 hover:bg-rose/90 active:scale-[0.98]"
            >
              بازگشت به فروشگاه
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handlePayment} className="p-6">
            <div className="mb-6 rounded-lg bg-rose/10 p-4">
              <div className="flex justify-between text-sm text-rose">
                <span>پذیرنده:</span>
                <span className="font-bold">فروشگاه نیلا</span>
              </div>
              <div className="mt-2 flex justify-between text-sm text-rose">
                <span>مبلغ:</span>
                <span className="font-bold">{formatPrice(order.totalPrice)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs text-ink/60">شماره کارت</label>
                <div className="relative">
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40" size={20} />
                  <input 
                    required
                    type="text" 
                    placeholder="XXXX - XXXX - XXXX - XXXX" 
                    maxLength={19}
                    className="w-full rounded-lg border border-ink/10 py-3 pr-10 pl-3 text-left font-mono outline-none transition-colors focus:border-rose focus:ring-1 focus:ring-rose text-ink"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="mb-1 block text-xs text-ink/60">CVV2</label>
                  <input required type="text" maxLength={4} className="w-full rounded-lg border border-ink/10 p-3 text-center font-mono outline-none transition-colors focus:border-rose text-ink" dir="ltr" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-ink/60">ماه</label>
                  <input required type="text" maxLength={2} placeholder="MM" className="w-full rounded-lg border border-ink/10 p-3 text-center font-mono outline-none transition-colors focus:border-rose text-ink" dir="ltr" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-ink/60">سال</label>
                  <input required type="text" maxLength={2} placeholder="YY" className="w-full rounded-lg border border-ink/10 p-3 text-center font-mono outline-none transition-colors focus:border-rose text-ink" dir="ltr" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-ink/60">رمز دوم (پین)</label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40" size={20} />
                  <input required type="password" className="w-full rounded-lg border border-ink/10 py-3 pr-10 pl-3 text-left outline-none transition-colors focus:border-rose text-ink" dir="ltr" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-rose py-3 text-white shadow-lg shadow-rose/20 transition-all duration-300 hover:bg-rose/90 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
            >
              {status === "loading" ? (
                <><Loader2 size={18} className="animate-spin" /> در حال پرداخت...</>
              ) : (
                "پرداخت"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}