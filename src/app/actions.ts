"use server";

export async function sendOrderToMessengers(data: {
  customerName: string;
  phone: string;
  address: string;
  postalCode: string;
  totalPrice: number;
  items: string[];
}) {
  // ۱. دریافت توکن‌ها از فایل env.
  const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  const BALE_TOKEN = process.env.BALE_BOT_TOKEN;
  const BALE_CHAT_ID = process.env.BALE_CHAT_ID;

  if (!TELEGRAM_TOKEN && !BALE_TOKEN) {
    console.warn("⚠️ هیچ توکنی تنظیم نشده است. پیام ارسال نمی‌شود.");
    return { success: false, error: "No tokens provided" };
  }

  // ۲. آماده‌سازی متن پیام
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("fa-IR").format(price) + " تومان";

  const message = `
🛍️ **سفارش جدید از نیلا!**

👤 **نام مشتری:** ${data.customerName}
📞 **شماره تماس:** ${data.phone}
📍 **آدرس:** ${data.address}
📮 **کد پستی:** ${data.postalCode}

💰 **مبلغ کل:** ${formatPrice(data.totalPrice)}

📦 **محصولات:**
${data.items.map((item) => `- ${item}`).join("\n")}
  `;

  // ۳. تعریف توابع ارسال
  const sendToTelegram = async () => {
    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) return { status: "skipped" };
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });
    if (!res.ok) throw new Error("Telegram API error");
    return { status: "ok" };
  };

  const sendToBale = async () => {
    if (!BALE_TOKEN || !BALE_CHAT_ID) return { status: "skipped" };
    const res = await fetch(`https://tapi.bale.ai/bot${BALE_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: BALE_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });
    if (!res.ok) throw new Error("Bale API error");
    return { status: "ok" };
  };

  // ۴. اجرای همزمان و مدیریت خطا (Fault-tolerant)
  try {
    const results = await Promise.allSettled([sendToTelegram(), sendToBale()]);
    
    results.forEach((result, index) => {
      const service = index === 0 ? "Telegram" : "Bale";
      if (result.status === "rejected") {
        console.error(`خطا در ارسال به ${service}:`, result.reason);
      } else {
        console.log(`ارسال به ${service} با وضعیت ${result.value.status} انجام شد.`);
      }
    });

    return { success: true };
  } catch (error) {
    console.error("خطای غیرمنتظره در بک‌اند:", error);
    return { success: false };
  }
}