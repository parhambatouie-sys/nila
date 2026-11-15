import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, ShieldCheck, Truck } from "lucide-react";
import { getProductById, formatPrice } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 lg:px-10 lg:pt-40">
      <div className="mb-8 flex items-center gap-2 text-xs text-ink/50">
        <Link href="/" className="hover:text-ink transition-colors">خانه</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-ink transition-colors">فروشگاه</Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-blush">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {product.gallery.slice(0, 2).map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-2xl bg-blush">
                <Image src={img} alt={product.name} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[11px] tracking-[0.3em] text-ink/50">{product.nameEn}</span>
            {product.badge && (
              <span className="rounded-full bg-rose/10 px-3 py-1 text-[10px] text-rose">{product.badge}</span>
            )}
          </div>
          
          <h1 className="font-display text-4xl text-ink lg:text-5xl">{product.name}</h1>
          
          <div className="mt-4 flex items-center gap-2 text-sm text-ink/60">
            <Star size={16} className="fill-rose text-rose" />
            <span>{product.rating}</span>
            <span className="mx-2">·</span>
            <span>موجود در انبار</span>
          </div>

          <div className="mt-8 flex items-end gap-3">
            <span className="text-3xl font-medium text-ink">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="mb-1 text-lg text-ink/40 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <p className="mt-8 text-[15px] leading-relaxed text-ink/70">
            {product.description}
          </p>

          <div className="mt-10">
            <AddToCartButton product={product} />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-ink/10 pt-8">
            <div className="flex items-center gap-3 text-sm text-ink/70">
              <Truck size={20} strokeWidth={1.5} />
              <span>ارسال رایگان</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-ink/70">
              <ShieldCheck size={20} strokeWidth={1.5} />
              <span>اصالت کالا</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}