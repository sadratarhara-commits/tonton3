import React, { useState } from 'react';

interface FooterProps {
  onNavigate: (page: 'home' | 'product', category?: string) => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSizeGuide }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] mt-space-xl border-t border-surface-container">
      {/* 4 Brand Pillars Mini Pod */}
      <div className="w-full bg-surface-container-low py-space-xl">
        <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          <div className="flex items-center gap-space-md bg-surface p-space-md rounded-xl shadow-xs">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary-fixed text-[24px]">inventory_2</span>
            </div>
            <div>
              <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">بسته‌بندی کاملاً محرمانه</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">بدون ذکر نام کالا بر روی بسته پستی</p>
            </div>
          </div>

          <div className="flex items-center gap-space-md bg-surface p-space-md rounded-xl shadow-xs">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-secondary-fixed text-[24px]">verified_user</span>
            </div>
            <div>
              <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">ضمانت اصالت و سلامت</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">کنترل کیفی و گواهی بهداشت پارچه</p>
            </div>
          </div>

          <div className="flex items-center gap-space-md bg-surface p-space-md rounded-xl shadow-xs">
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-tertiary-fixed text-[24px]">support_agent</span>
            </div>
            <div>
              <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">مشاوره اختصاصی بانوان</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">پاسخگویی و راهنمایی سایزبندی دقیق</p>
            </div>
          </div>

          <div className="flex items-center gap-space-md bg-surface p-space-md rounded-xl shadow-xs">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-secondary-container text-[24px]">local_shipping</span>
            </div>
            <div>
              <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">ارسال فوری و ایمن</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">ارسال با پیک سریع در تهران و پست ویژه</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Editorial */}
      <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin py-space-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl text-right">
        {/* Brand Philosophy */}
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <div className="flex items-center gap-space-sm">
            <span className="font-headline-md text-headline-md text-primary font-bold">لیندا</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-space-sm py-0.5 rounded-full">
              Lynda Lingerie
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-lg">
            تعهد لیندا به راحتی بی‌نهایت، طراحی ظریف زنانه و استفاده از لطیف‌ترین الیاف ابریشم و دانتل فرانسوی است. هدف ما آفرینش حسی دل‌نشین از لطافت و اعتماد‌به‌نفس در تمام لحظات روز و آرامش شب‌های شماست.
          </p>
          <div className="flex items-center gap-space-md mt-space-sm">
            <span className="font-label-md text-label-md text-on-surface font-semibold">پشتیبانی تلفنی و واتساپ:</span>
            <span className="font-label-lg text-label-lg text-primary font-bold dir-ltr">۰۲۱-۸۸۲۲۴۴۶۶</span>
          </div>
        </div>

        {/* Customer Services */}
        <div className="lg:col-span-2 flex flex-col gap-space-sm">
          <h3 className="font-label-lg text-label-lg text-on-surface font-semibold mb-space-xs">خدمات مشتریان</h3>
          <button onClick={onOpenSizeGuide} className="text-right font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
            راهنمای جامع سایز کاپ
          </button>
          <button onClick={() => onNavigate('product')} className="text-right font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
            شرایط بهداشت و بازگشت
          </button>
          <button onClick={() => onNavigate('home')} className="text-right font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
            پیگیری سریع سفارش
          </button>
          <button onClick={() => onNavigate('home')} className="text-right font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
            پرسش‌های متداول
          </button>
          <button onClick={() => onNavigate('home')} className="text-right font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
            ارتباط با ما
          </button>
        </div>

        {/* Exclusive Collections */}
        <div className="lg:col-span-2 flex flex-col gap-space-sm">
          <h3 className="font-label-lg text-label-lg text-on-surface font-semibold mb-space-xs">مجموعه‌های اختصاصی</h3>
          <button onClick={() => onNavigate('home', 'bridal')} className="text-right font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
            کالکشن عروس و نامزدی
          </button>
          <button onClick={() => onNavigate('home', 'sleepwear')} className="text-right font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
            پیراهن‌های خواب ابریشمی
          </button>
          <button onClick={() => onNavigate('home', 'sleepwear')} className="text-right font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
            روبدوشامبر و لانژور
          </button>
          <button onClick={() => onNavigate('product', 'lace')} className="text-right font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
            ست‌های دانتل ارگانیک
          </button>
          <button onClick={() => onNavigate('home')} className="text-right font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
            کارت هدیه لیندا
          </button>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-3 flex flex-col gap-space-md">
          <h3 className="font-label-lg text-label-lg text-on-surface font-semibold">خبرنامه خانواده لیندا</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            با عضویت در خبرنامه، از تخفیف‌های محرمانه و کالکشن‌های فصلی زودتر از دیگران مطلع شوید.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-space-sm">
            <div className="relative flex items-center">
              <input
                type="text"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="شماره موبایل یا ایمیل شما..."
                required
                className="w-full bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm px-space-md py-2.5 rounded-lg outline-none focus:bg-surface-container border border-surface-container transition-all text-right"
              />
              <button
                type="submit"
                className="mr-2 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-space-md py-2.5 rounded-lg transition-colors shrink-0 shadow-sm"
              >
                عضویت
              </button>
            </div>
            {subscribed ? (
              <span className="font-label-sm text-label-sm text-primary font-bold animate-fadeIn">
                ✓ با سپاس! عضویت شما در خبرنامه با موفقیت ثبت شد.
              </span>
            ) : (
              <span className="font-label-sm text-label-sm text-outline">
                اطلاعات شما نزد ما کاملاً محفوظ است.
              </span>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="w-full bg-surface-container py-space-md border-t border-surface-variant">
        <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin flex flex-col sm:flex-row items-center justify-between gap-space-sm text-center sm:text-right">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            تمامی حقوق این وب‌سایت برای برند پوشاک لیندا (Lynda Lingerie) محفوظ است. © ۱۴۰۳
          </span>
          <div className="flex items-center gap-space-md">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              طراحی شده با احترام به زیبایی زنانه
            </span>
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              ساخت ایران و فرانسه
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
