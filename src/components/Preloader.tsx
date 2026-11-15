"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // زمان نمایش لودینگ (۲.۵ ثانیه)
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }} // فید اوت ملایم
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream"
        >
          {/* لوگو و برند */}
          <div className="flex flex-col items-center" dir="ltr">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl tracking-[0.35em] text-ink ml-3"
            >
              NILA
            </motion.h1>
            
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-3 text-sm tracking-[0.55em] text-ink/60 ml-2"
              dir="rtl"
            >
              نیلا
            </motion.span>
          </div>

          {/* خط جداکننده ظریف ماو */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100px", opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
            className="mt-6 h-[1.5px] bg-rose"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}