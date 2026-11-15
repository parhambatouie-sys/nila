"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

export default function ProductImage({ src, alt, className, ...props }: ImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-cream ${className}`}>
        <span className="font-display text-3xl tracking-[0.35em] text-ink/20">NILA</span>
        <span className="mt-2 text-[10px] tracking-[0.55em] text-ink/20">نیلا</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      unoptimized // 👈 این خط جادو می‌کنه! عکس رو مستقیم از مرورگر لود می‌کنه
      {...props}
    />
  );
}