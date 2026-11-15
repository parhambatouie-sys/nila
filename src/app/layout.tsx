import type { Metadata } from "next";
import { Playfair_Display, Vazirmatn } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer";
import FlyToCart from "@/components/FlyToCart";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "نیلا | زیبایی در خالص‌ترین شکل خود",
  description: "فروشگاه لوکس محصولات آرایشی و بهداشتی نیلا",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`${playfair.variable} ${vazirmatn.variable}`}>
      <body className="bg-cream text-ink antialiased">
        <Preloader />
        <CartProvider>
          <FlyToCart />
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}