"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, Check } from "lucide-react";
import { finalProducts, categories, Category, formatPrice } from "@/data/products";
import ProductCard from "@/components/ProductCard";

// استخراج تمام برندهای موجود به صورت یکتا
const ALL_BRANDS = Array.from(new Set(finalProducts.map((p) => p.brand))).sort();
// پیدا کردن کمترین و بیشترین قیمت برای اسلایدر
const MIN_PRICE = Math.min(...finalProducts.map((p) => p.price));
const MAX_PRICE = Math.max(...finalProducts.map((p) => p.price));

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as Category) || "all";

  // استیت‌های فیلتر
  const [activeCategory, setActiveCategory] = useState<Category | "all">(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // آپدیت دسته‌بندی اگر از منوی ناوبری تغییر کرد
  useEffect(() => {
    const cat = (searchParams.get("category") as Category) || "all";
    setActiveCategory(cat);
  }, [searchParams]);

  // منطق فیلتر کردن لحظه‌ای (Real-time)
  const filteredProducts = useMemo(() => {
    return finalProducts.filter((product) => {
      // 1. فیلتر دسته‌بندی
      const matchCategory = activeCategory === "all" || product.category === activeCategory;
      
      // 2. فیلتر برند
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      
      // 3. فیلتر قیمت
      const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchCategory && matchBrand && matchPrice;
    });
  }, [activeCategory, selectedBrands, priceRange]);

  // هندل کردن چک‌باکس برندها
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // پاک کردن تمام فیلترها
  const clearFilters = () => {
    setActiveCategory("all");
    setSelectedBrands([]);
    setPriceRange([MIN_PRICE, MAX_PRICE]);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-10 lg:pt-40">
      {/* هدر صفحه */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <span className="text-[11px] tracking-[0.4em] text-ink/50">NILA SHOP</span>
        <h1 className="mt-3 font-display text-4xl text-ink lg:text-5xl">فروشگاه</h1>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* دکمه فیلتر موبایل */}
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="flex items-center justify-center gap-2 rounded-xl bg-ink py-3 text-sm text-cream lg:hidden"
        >
          <Filter size={18} />
          {isMobileFilterOpen ? "بستن فیلترها" : "نمایش فیلترها"}
        </button>

        {/* سایدبار فیلترها (در موبایل مخفی می‌شود) */}
        <div className={`w-full lg:w-64 shrink-0 space-y-8 ${isMobileFilterOpen ? "block" : "hidden lg:block"}`}>
          
          {/* دسته‌بندی */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-ink">دسته‌بندی</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`block w-full text-right text-sm py-1.5 transition-colors ${
                    activeCategory === cat.value ? "text-gold font-medium" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-ink/10" />

          {/* برندها */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-ink">برند</h3>
            <div className="max-h-60 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {ALL_BRANDS.map((brand) => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                    selectedBrands.includes(brand) 
                      ? "bg-ink border-ink text-cream" 
                      : "border-ink/20 group-hover:border-ink/50"
                  }`}>
                    {selectedBrands.includes(brand) && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span className={`text-sm transition-colors ${
                    selectedBrands.includes(brand) ? "text-ink" : "text-ink/60 group-hover:text-ink"
                  }`}>
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-ink/10" />

          {/* قیمت */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-ink">محدوده قیمت</h3>
            <div className="space-y-4">
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={100000}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-ink"
              />
              <div className="flex items-center justify-between text-xs text-ink/60">
                <span>{formatPrice(priceRange[0])}</span>
                <span>تا</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>
          </div>

          {/* دکمه پاک کردن فیلترها */}
          {(selectedBrands.length > 0 || activeCategory !== "all" || priceRange[1] !== MAX_PRICE) && (
            <button
              onClick={clearFilters}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-ink/20 py-2.5 text-xs text-ink/60 transition-colors hover:bg-blush hover:text-ink"
            >
              <X size={14} />
              پاک کردن فیلترها
            </button>
          )}
        </div>

        {/* گرید محصولات */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-ink/40">
              <p className="text-lg">محصولی با این مشخصات یافت نشد.</p>
              <button onClick={clearFilters} className="mt-4 text-sm text-gold underline underline-offset-4">
                نمایش همه محصولات
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center">در حال بارگذاری...</div>}>
      <ShopContent />
    </Suspense>
  );
}