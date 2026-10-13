import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS, INITIAL_REVIEWS } from '../data/products';
import { SizeCalculator } from '../components/SizeCalculator';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  activeCategoryFilter?: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProduct,
  onQuickAddToCart,
  wishlistIds,
  onToggleWishlist,
  activeCategoryFilter,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'bridal' | 'sleepwear' | 'daily'>('all');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategoryFilter && p.category !== activeCategoryFilter) {
      // allow fallback
    }
    if (activeTab === 'all') return true;
    if (activeTab === 'bridal') return p.category === 'lace' || p.category === 'bridal';
    if (activeTab === 'sleepwear') return p.category === 'sleepwear';
    if (activeTab === 'daily') return p.category === 'organic';
    return true;
  });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-surface-container-low py-space-xl lg:py-28">
        <div className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Text Column */}
            <div className="lg:col-span-6 flex flex-col items-start gap-space-md text-right">
              <div className="inline-flex items-center gap-space-xs bg-surface px-space-md py-1.5 rounded-full shadow-xs border border-surface-container">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wide">
                  کالکشن پاییز ۲۰۲۴ • تولید محدود
                </span>
              </div>

              <h1 className="font-display-hero text-display-hero text-on-surface font-normal leading-tight tracking-tight">
                لمس لطافت ابریشم و <span className="italic text-primary">زیبایی بی‌پایان</span>
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-xl">
                مجموعه جدید پاییزه لیندا؛ تلفیقی چشم‌نواز از دانتل دست‌دوز فرانسوی و ساتن خالص ابریشمی با ارگونومی بی‌نقص برای راحتی تمام‌روز و شکوه پنهان شما.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-space-md pt-space-xs w-full sm:w-auto">
                <button
                  onClick={() => scrollToSection('featured-products')}
                  className="flex items-center justify-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg px-space-xl py-3.5 rounded-full shadow-md transition-all duration-300 cursor-pointer active:scale-95"
                >
                  <span>مشاهده کالکشن جدید</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_left_alt</span>
                </button>

                <button
                  onClick={() => scrollToSection('size-calculator')}
                  className="flex items-center justify-center gap-space-xs bg-surface-container-highest hover:bg-surface-variant text-on-surface font-label-lg text-label-lg px-space-lg py-3.5 rounded-full transition-all duration-200 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-primary text-[20px]">straighten</span>
                  <span>راهنمای هوشمند انتخاب سایز</span>
                </button>
              </div>

              {/* Trust Sub-strip */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-space-md text-on-surface-variant font-label-md text-label-md">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">lock</span>
                  بسته‌بندی کاملاً محرمانه و بدون نام
                </span>
                <span className="text-outline-variant">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  ضمانت بهداشتی و سلامت کالا
                </span>
                <span className="text-outline-variant hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
                  ارسال اکسپرس سراسر کشور
                </span>
              </div>
            </div>

            {/* Visual Column */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px]">
                {/* Decorative Back Panel */}
                <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl bg-secondary-container -rotate-2" />

                {/* Main Hero Image */}
                <div
                  onClick={() => onSelectProduct(PRODUCTS[0])}
                  className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container aspect-[4/5] cursor-pointer group"
                >
                  <img
                    alt="کالکشن جدید لیندا"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={PRODUCTS[0].images[0]}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Floating Pill Badges */}
                  <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-md px-space-md py-1.5 rounded-full shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                      دانتل بافته فرانسه
                    </span>
                  </div>

                  <div className="absolute bottom-6 right-6 left-6 bg-surface/90 backdrop-blur-md p-space-md rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">ست ابریشمی والنتینا</p>
                      <p className="font-headline-sm text-headline-sm text-primary font-bold">۱,۴۸۰,۰۰۰ تومان</p>
                    </div>
                    <span className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                    </span>
                  </div>
                </div>

                {/* Overlapping Editorial Stamp */}
                <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-space-md rounded-2xl shadow-lg border border-surface-container flex items-center gap-space-sm">
                  <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                    <span className="material-symbols-outlined text-[24px]">grade</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="font-label-lg text-label-lg font-bold text-on-surface">۴.۹</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">از ۵</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">رضایت بیش از ۱۰,۰۰۰ بانو</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CURATED CATEGORIES GRID */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-sm text-right">
            <div>
              <span className="font-label-md text-label-md text-primary font-semibold">دسته‌بندی‌های برگزیده</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
                هنر آراستگی و راحتی در جزئیات
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              هر مجموعه با در نظر گرفتن ساختار طبیعی بدن و سازگاری با حساس‌ترین پوست‌ها طراحی و دوخته شده است.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {/* Category 1 */}
            <div
              onClick={() => onSelectProduct(PRODUCTS[0])}
              className="group relative rounded-2xl overflow-hidden bg-surface-container aspect-[3/4] flex flex-col justify-end p-space-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                alt="ست‌های دانتل و مجلسی"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcbDUfXdkxa9sVv-ytmHXTXGTEG4slBmDZ4MUsTnV2wRms-KP7qGa1peBVh2heWnbtEOV3KRyi5jD0fe6fw21DSjezdseSkEzmLep6t90xZonQlosyIXnFNh9e8HmlVAQlu7UsIwsmwHdAhMy4t8pSSU8DqZMtkr9HL2G8AjcY1tojk8uisd75Dr3IxfGQlTc6xk4dTvf1G7F2nf86EX38eq7zux8STPrErlGbuqtHFFzLj8QQoUHd"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/30 to-transparent" />
              <div className="relative z-10 text-right">
                <span className="font-label-sm text-label-sm text-primary-fixed bg-on-surface/50 backdrop-blur-sm px-space-sm py-0.5 rounded-full">
                  با ظرافت دست‌دوز
                </span>
                <h3 className="font-headline-sm text-headline-sm text-surface mt-2 group-hover:text-primary-fixed transition-colors">
                  ست‌های دانتل و مجلسی
                </h3>
                <p className="font-body-sm text-body-sm text-surface/80 mt-1">
                  توری‌های نرم ضدحساسیت و کاپ‌های فنردار
                </p>
              </div>
            </div>

            {/* Category 2 */}
            <div
              onClick={() => onSelectProduct(PRODUCTS[1])}
              className="group relative rounded-2xl overflow-hidden bg-surface-container aspect-[3/4] flex flex-col justify-end p-space-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                alt="لباس خواب و کیمونو ابریشمی"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn8mH7hiSdkmm87FkxwoVu4SpqgakL4HopMI6hgJ_gLI0RoAetRGtTXUkGLX37FqrqrGNCgjyZz02Mpu2obeB9bw5rYFS9Q7z9syJt_WIFGiucWtld_oeI-jAETWOCb4QQNGyuz06wkDD4ShlMnoglBsu4-QE4HXYNnsVQzYEwzFaOr2gTUzzBB30AS4sefOsuJn3xTYk_Dsus_0UGEFj8xFxG1g9yRWkJEXqH9FpbpeynkGbBMRQD"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/30 to-transparent" />
              <div className="relative z-10 text-right">
                <span className="font-label-sm text-label-sm text-tertiary-fixed bg-on-surface/50 backdrop-blur-sm px-space-sm py-0.5 rounded-full">
                  ساتن ابریشم طبیعی ۱۰۰٪
                </span>
                <h3 className="font-headline-sm text-headline-sm text-surface mt-2 group-hover:text-primary-fixed transition-colors">
                  لباس خواب و کیمونو ابریشمی
                </h3>
                <p className="font-body-sm text-body-sm text-surface/80 mt-1">
                  پیراهن‌های ماکسی، ست تاپ و شورتک
                </p>
              </div>
            </div>

            {/* Category 3 */}
            <div
              onClick={() => onSelectProduct(PRODUCTS[2])}
              className="group relative rounded-2xl overflow-hidden bg-surface-container aspect-[3/4] flex flex-col justify-end p-space-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                alt="لباس زیر راحتی ارگانیک"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKCaBAoz2MlArMg7JAFbq8xn0__NwpQJIn3kGH9W2uJwHr9KVrf-HSMpUiUuWRATq1jGhn1Xp6_b75gCR1T7Z7qLfDrpDNbMvgOfHuaW-tCNTX5sQaFxiZvFy0Of6PqO9Mqi_JLig8bDPvNbgDO3kaHvDEvUnOxf_j7BT7-AWEFUF95uEdah0MDBUkHFqZL05mXM_0YTAgdYAg09v5YahIkXU-2vYLzsKV0OWk2B4vu7kANQvXTpDw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/30 to-transparent" />
              <div className="relative z-10 text-right">
                <span className="font-label-sm text-label-sm text-secondary-fixed bg-on-surface/50 backdrop-blur-sm px-space-sm py-0.5 rounded-full">
                  پنبه ارگانیک تنفس‌پذیر
                </span>
                <h3 className="font-headline-sm text-headline-sm text-surface mt-2 group-hover:text-primary-fixed transition-colors">
                  لباس زیر راحتی ارگانیک
                </h3>
                <p className="font-body-sm text-body-sm text-surface/80 mt-1">
                  سوتین‌های بدون فنر برای استفاده روزانه
                </p>
              </div>
            </div>

            {/* Category 4 */}
            <div
              onClick={() => onSelectProduct(PRODUCTS[3])}
              className="group relative rounded-2xl overflow-hidden bg-surface-container aspect-[3/4] flex flex-col justify-end p-space-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                alt="گن و فرم‌دهنده‌های نامرئی"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxkLtDFeN4SGmULVKpU-Jq9styOuQ4XOja-yOfvanFrrvBFAnHOQQRlaMnkE6fRvqIBfEK-wmp8YfMiGn0Y0r8tFhv7F6BL1OUYSb1JnOgfmtYGqGBn_AsIrjcc_tbYPjdK5kYsWrJ3kTzQ0F5ON_X911kKlgYenm4jyzzYPA_ZA3ci1qIkzQCX_p208qyT46zBhajDjYxe1dUxU3E9BbeauCa16iKA-O0S5eIm1VRG_EcrDdG01ey"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/30 to-transparent" />
              <div className="relative z-10 text-right">
                <span className="font-label-sm text-label-sm text-primary-fixed bg-on-surface/50 backdrop-blur-sm px-space-sm py-0.5 rounded-full">
                  برش لیزری نامرئی
                </span>
                <h3 className="font-headline-sm text-headline-sm text-surface mt-2 group-hover:text-primary-fixed transition-colors">
                  گن و فرم‌دهنده‌های نامرئی
                </h3>
                <p className="font-body-sm text-body-sm text-surface/80 mt-1">
                  فرم‌دهی بدون رد و بدون فشار آزاردهنده
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED BESTSELLERS GRID */}
      <section className="w-full py-space-xl bg-surface-container-low" id="featured-products">
        <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-space-xl gap-space-md text-right">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary" />
                <span className="font-label-md text-label-md text-primary font-bold">انتخاب اول بانوان</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">محبوب‌ترین‌های این ماه</h2>
            </div>

            <div className="flex items-center gap-space-sm self-stretch md:self-auto overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setActiveTab('all')}
                className={`font-label-md text-label-md px-space-lg py-2 rounded-full whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'all'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface hover:bg-surface-container text-on-surface-variant'
                }`}
              >
                همه پرفروش‌ها
              </button>
              <button
                onClick={() => setActiveTab('bridal')}
                className={`font-label-md text-label-md px-space-lg py-2 rounded-full whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'bridal'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface hover:bg-surface-container text-on-surface-variant'
                }`}
              >
                ست‌های عروس
              </button>
              <button
                onClick={() => setActiveTab('sleepwear')}
                className={`font-label-md text-label-md px-space-lg py-2 rounded-full whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'sleepwear'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface hover:bg-surface-container text-on-surface-variant'
                }`}
              >
                روبدوشامبر
              </button>
              <button
                onClick={() => setActiveTab('daily')}
                className={`font-label-md text-label-md px-space-lg py-2 rounded-full whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'daily'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface hover:bg-surface-container text-on-surface-variant'
                }`}
              >
                سوتین‌های روزمره
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {filteredProducts.map((prod) => {
              const isWishlisted = wishlistIds.includes(prod.id);

              return (
                <div
                  key={prod.id}
                  className="bg-surface rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group border border-surface-container"
                >
                  <div className="relative aspect-[3/4] bg-surface-container overflow-hidden">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      onClick={() => onSelectProduct(prod)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    />

                    {prod.badge && (
                      <span className="absolute top-3 right-3 bg-primary text-on-primary font-label-sm text-label-sm px-2.5 py-1 rounded-full shadow-sm font-semibold">
                        {prod.badge}
                      </span>
                    )}

                    <button
                      onClick={() => onToggleWishlist(prod)}
                      className={`absolute top-3 left-3 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center transition-colors cursor-pointer ${
                        isWishlisted ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: `'FILL' ${isWishlisted ? 1 : 0}` }}
                      >
                        favorite
                      </span>
                    </button>

                    {/* Quick Add Overlay on Hover */}
                    <div className="absolute bottom-3 inset-x-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={() => onQuickAddToCart(prod)}
                        className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                        <span>افزودن سریع به سبد خرید</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-space-md flex flex-col flex-1 text-right">
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm mb-1">
                      <span>{prod.model}</span>
                      <div className="flex items-center gap-1 text-tertiary">
                        <span
                          className="material-symbols-outlined text-[14px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        <span className="font-bold">{prod.rating}</span>
                        <span className="text-outline">({prod.reviewCount})</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(prod)}
                      className="font-headline-sm text-headline-sm text-on-surface font-semibold line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                    >
                      {prod.name}
                    </h3>

                    {/* Color Swatches */}
                    <div className="flex items-center gap-1.5 my-space-sm">
                      {prod.colors.map((c, i) => (
                        <span
                          key={i}
                          className="w-4 h-4 rounded-full ring-2 ring-surface shadow-xs"
                          style={{ backgroundColor: c.code }}
                          title={c.name}
                        />
                      ))}
                      <span className="font-label-sm text-label-sm text-on-surface-variant mr-1">
                        {prod.colors.length} رنگ
                      </span>
                    </div>

                    <div className="mt-auto pt-space-xs flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">
                          {prod.price.toLocaleString('fa-IR')} تومان
                        </span>
                        {prod.originalPrice && (
                          <span className="font-body-sm text-body-sm text-outline line-through">
                            {prod.originalPrice.toLocaleString('fa-IR')}
                          </span>
                        )}
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
                        {prod.sizes[0]}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. BRAND PILLARS */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <span className="font-label-md text-label-md text-primary font-semibold">ارزش‌های محوری لیندا</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
              چرا بانوان لیندا را انتخاب می‌کنند؟
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              خرید پوشاک شخصی نیازمند اعتماد عمیق به اصالت، احترام به حریم خصوصی و اطمینان از سلامت بهداشتی است.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            <div className="bg-surface-container-low p-space-lg rounded-2xl flex flex-col items-start text-right transition-transform duration-300 hover:-translate-y-1 shadow-xs border border-surface-container">
              <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed mb-space-md">
                <span className="material-symbols-outlined text-[30px]">lock</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-2">
                بسته‌بندی ۱۰۰٪ محرمانه
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                بسته‌ها در جعبه‌های مات و بدون هیچ‌گونه برچسب یا اشاره‌ای به نام کالا ارسال می‌شوند تا آرامش کامل شما تضمین شود.
              </p>
            </div>

            <div className="bg-surface-container-low p-space-lg rounded-2xl flex flex-col items-start text-right transition-transform duration-300 hover:-translate-y-1 shadow-xs border border-surface-container">
              <div className="w-14 h-14 rounded-2xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed mb-space-md">
                <span className="material-symbols-outlined text-[30px]">health_and_safety</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-2">
                استاندارد بهداشتی OEKO-TEX
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                تمامی الیاف فاقد مواد شیمیایی مضر بوده و الیاف نخ‌طبیعی و ابریشم خالص با پوست‌های حساس کاملاً سازگارند.
              </p>
            </div>

            <div className="bg-surface-container-low p-space-lg rounded-2xl flex flex-col items-start text-right transition-transform duration-300 hover:-translate-y-1 shadow-xs border border-surface-container">
              <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed mb-space-md">
                <span className="material-symbols-outlined text-[30px]">support_agent</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-2">
                مشاوره اختصاصی بانوان
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                تیم کارشناسان فیتینگ بانوان از طریق پیام و تماس، شما را در یافتن کاپ و اندازه دقیق بدنتان راهنمایی می‌کنند.
              </p>
            </div>

            <div className="bg-surface-container-low p-space-lg rounded-2xl flex flex-col items-start text-right transition-transform duration-300 hover:-translate-y-1 shadow-xs border border-surface-container">
              <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container mb-space-md">
                <span className="material-symbols-outlined text-[30px]">published_with_changes</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-2">
                تعویض آسان و تحویل فوری
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                ضمانت تعویض سایز (طبق پروتکل بهداشتی پلمب شده) و ارسال اکسپرس با پیک اختصاصی در تهران و پست ویژه شهرستان‌ها.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE SMART SIZE GUIDE BANNER */}
      <SizeCalculator
        onSelectSize={(_size) => {
          onSelectProduct(PRODUCTS[0]);
        }}
        onExploreProducts={() => scrollToSection('featured-products')}
      />

      {/* 6. CUSTOMER TESTIMONIALS & REVIEWS */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-sm text-right">
            <div>
              <span className="font-label-md text-label-md text-primary font-semibold">صدای همراهان وفادار</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
                تجربه بانوان از لطافت لیندا
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-lg text-label-lg text-on-surface font-bold">امتیاز ۴.۹ از ۵</span>
              <div className="flex text-tertiary">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {INITIAL_REVIEWS.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="bg-surface-container-low p-space-lg rounded-2xl flex flex-col justify-between shadow-xs border border-surface-container"
              >
                <div>
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex text-tertiary">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span
                          key={s}
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <span className="font-label-sm text-label-sm text-outline">{rev.date}</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed text-right">
                    «{rev.comment}»
                  </p>
                </div>

                <div className="flex items-center gap-space-sm pt-space-lg mt-space-md border-t border-surface-variant text-right">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-primary">
                    {rev.author.slice(0, 1)}
                  </div>
                  <div>
                    <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">{rev.author}</h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      {rev.productVariant} ({rev.location})
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. EDITORIAL LOOKBOOK BANNER */}
      <section className="w-full py-space-xl bg-surface-container-lowest">
        <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
          <div className="relative rounded-3xl overflow-hidden bg-on-surface min-h-[420px] flex items-center justify-center shadow-xl">
            <img
              alt="لوک‌بوک اختصاصی لیندا"
              className="absolute inset-0 w-full h-full object-cover opacity-35"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1jgJByDZCmSw1Y8IbcrNfmW-Yc2LWShYVhWQM0W4Dl6Uesy5gf8DwV5ih_29ulpXTN4dAg0_kjloIKD_B5mHTwZD8DGx1gj8T0Pie3Y_XjCQ90U6rWV1nqWhJM9p5hPIUOSXeuScOYNdbDTmkUOYJ-qr3IZk9TFB5bNcY5Jlex6hiZh2zRfkRyl1-qlva5pjJQnxLA8TR5DoMcEZRZkNLl6zu0yPNQjLaElykp9-7g4M9tuyb287-"
            />
            <div className="relative z-10 max-w-2xl text-center px-space-md py-space-xl flex flex-col items-center">
              <span className="font-label-md text-label-md text-primary-fixed tracking-widest mb-space-sm uppercase">
                Lynda Seasonal Editorial
              </span>
              <h2 className="font-display-hero text-headline-lg lg:text-display-hero text-surface font-normal leading-tight">
                «هنر زیبایی پنهان، ستایش لطافت زنانه است»
              </h2>
              <p className="font-body-lg text-body-lg text-surface-variant/90 max-w-lg mt-space-md mb-space-lg leading-relaxed">
                کتابچه تصویری استایل پاییز و زمستان لیندا را ورق بزنید؛ الهام‌گرفته از مینیمالیسم فرانسوی و هارمونی با ریتم آرامش شبانه.
              </p>
              <button
                onClick={() => scrollToSection('featured-products')}
                className="bg-surface text-on-surface hover:bg-surface-container-low font-label-lg text-label-lg px-space-xl py-3.5 rounded-full shadow-lg transition-transform duration-200 hover:scale-105 flex items-center gap-2 cursor-pointer"
              >
                <span>مشاهده کاتالوگ و لوک‌بوک پاییزه</span>
                <span className="material-symbols-outlined text-[18px]">auto_stories</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
