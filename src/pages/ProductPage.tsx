import React, { useState, useEffect } from 'react';
import { Product, ProductColor, Review } from '../types';
import { CROSS_SELL_PRODUCTS, INITIAL_REVIEWS } from '../data/products';
import { ReviewModal } from '../components/ReviewModal';
import { VideoModal } from '../components/VideoModal';

interface ProductPageProps {
  product: Product;
  onAddToCart: (product: Product, color: ProductColor, size: string, quantity: number) => void;
  onDirectCheckout: (product: Product, color: ProductColor, size: string, quantity: number) => void;
  onBackToHome: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  product,
  onAddToCart,
  onDirectCheckout,
  onBackToHome,
}) => {
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[2] || product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState<Review[]>(INITIAL_REVIEWS);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[2] || product.sizes[0]);
    setSelectedImgIdx(0);
    setQuantity(1);
  }, [product]);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 480);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddReview = (newReview: Review) => {
    setReviewsList([newReview, ...reviewsList]);
  };

  const handleCrossSellAdd = (cross: (typeof CROSS_SELL_PRODUCTS)[0]) => {
    const pseudoProduct: Product = {
      id: cross.id,
      code: 'ACC-' + Math.floor(100 + Math.random() * 900),
      name: cross.name,
      model: cross.name,
      englishModel: cross.tag,
      category: 'lace',
      price: cross.price,
      rating: 4.9,
      reviewCount: 30,
      images: [cross.image],
      colors: [cross.color],
      sizes: [cross.size],
      description: cross.desc,
    };
    onAddToCart(pseudoProduct, cross.color, cross.size, 1);
  };

  return (
    <div className="flex flex-col w-full text-on-surface">
      {/* Micro Breadcrumb & Category Bar */}
      <section className="w-full bg-surface-container-low py-space-sm border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
          <nav aria-label="مسیر راهنما" className="flex items-center gap-space-xs flex-wrap">
            <button
              onClick={onBackToHome}
              className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>خانه</span>
            </button>
            <span className="text-outline-variant">/</span>
            <button onClick={onBackToHome} className="hover:text-primary transition-colors cursor-pointer">
              ست‌های دانتل و مجلسی
            </button>
            <span className="text-outline-variant">/</span>
            <span className="hover:text-primary transition-colors">کالکشن پاییز ۲۰۲۴</span>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface font-semibold">{product.name}</span>
          </nav>
          <div className="hidden md:flex items-center gap-space-md text-outline">
            <span className="flex items-center gap-1 text-label-sm font-label-sm bg-surface-container px-space-sm py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              ۴۲ نفر در حال مشاهده این کالا هستند
            </span>
          </div>
        </div>
      </section>

      {/* Main Product Stage (2-Column Atelier Layout) */}
      <section className="w-full py-space-xl">
        <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            {/* RIGHT COLUMN: Gallery & Media Rail (7 Cols on LG) */}
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="flex flex-col-reverse md:flex-row gap-space-md">
                {/* Thumbnail Rail */}
                <div className="flex md:flex-col gap-space-sm shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                  {product.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIdx(idx)}
                      className={`w-20 h-24 rounded-lg overflow-hidden bg-surface-container-high transition-all shadow-xs cursor-pointer ${
                        selectedImgIdx === idx
                          ? 'ring-2 ring-primary opacity-100'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={product.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Primary Showcase Display */}
                <div className="relative flex-1 aspect-[3/4] rounded-xl overflow-hidden bg-surface-container shadow-md group">
                  <img
                    id="mainProductImg"
                    src={product.images[selectedImgIdx] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Floating Luxury Badges */}
                  <div className="absolute top-space-md right-space-md flex flex-col gap-space-xs pointer-events-none">
                    <span className="bg-primary text-on-primary font-label-sm text-label-sm px-space-md py-1 rounded-full shadow-sm backdrop-blur-md">
                      جدید • کالکشن پاییز
                    </span>
                    <span className="bg-surface-container-lowest/90 text-on-surface font-label-sm text-label-sm px-space-md py-1 rounded-full shadow-sm backdrop-blur-md flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-tertiary">bolt</span>
                      ارسال فوری اکسپرس
                    </span>
                  </div>

                  {/* Zoom & Interactive Triggers */}
                  <div className="absolute bottom-space-md right-space-md left-space-md flex items-center justify-between pointer-events-none">
                    <span className="bg-surface-container-lowest/80 text-on-surface-variant font-label-sm text-label-sm px-space-sm py-1 rounded-full backdrop-blur-md flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">zoom_in</span>
                      بزرگنمایی لمسی و زاویه ۳۶۰ درجه
                    </span>
                    <button
                      onClick={() => setIsVideoModalOpen(true)}
                      className="pointer-events-auto w-10 h-10 rounded-full bg-surface-container-lowest/90 hover:bg-surface-container-lowest text-on-surface flex items-center justify-center shadow-md transition-colors cursor-pointer"
                      title="نمای ویدیو و جعبه‌گشایی"
                    >
                      <span className="material-symbols-outlined text-[20px]">play_circle</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Unboxing Banner */}
              <div
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full bg-surface-container-low p-space-md rounded-xl flex items-center justify-between gap-space-md hover:bg-surface-container transition-colors cursor-pointer group border border-surface-container"
              >
                <div className="flex items-center gap-space-md">
                  <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">play_arrow</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      مشاهده ویدیو آنباکسینگ با بسته‌بندی محرمانه
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      بررسی کیفیت بافت دانتل، ظرافت دوخت و جعبه‌گشایی واقعی لیندا (۴۸ ثانیه)
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                  chevron_left
                </span>
              </div>
            </div>

            {/* LEFT COLUMN: Specifications & Commerce Actions (5 Cols on LG) */}
            <div className="lg:col-span-5 flex flex-col gap-space-lg text-right">
              {/* Identity & Rating Header */}
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-primary font-semibold tracking-wider">
                    لیندا پرمیوم • {product.code}
                  </span>
                  <div className="flex items-center gap-1 text-tertiary">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                    <span className="font-label-md text-label-md text-on-surface font-semibold mr-1">
                      {product.rating}
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">
                      ({reviewsList.length} نظر خریداران)
                    </span>
                  </div>
                </div>

                <h1 className="font-headline-lg text-headline-lg text-on-surface leading-tight font-medium mt-1">
                  {product.name}
                  <span className="block text-primary font-light text-headline-md font-headline-md mt-1">
                    {product.model} ({product.englishModel})
                  </span>
                </h1>

                <div className="flex items-center gap-space-sm mt-space-xs">
                  <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">verified</span>
                    بیش از ۳۵۰ سفارش موفق در این ماه
                  </span>
                  <span className="text-outline-variant">•</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">دانتل اورجینال لیون فرانسه</span>
                </div>
              </div>

              {/* Price Pod */}
              <div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between border border-surface-container">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-space-sm">
                    <span className="font-display-hero text-headline-lg text-primary font-semibold">
                      {product.price.toLocaleString('fa-IR')}
                    </span>
                    <span className="font-label-lg text-label-lg text-on-surface">تومان</span>
                    {product.originalPrice && (
                      <span className="font-body-md text-body-md text-outline line-through mr-2">
                        {product.originalPrice.toLocaleString('fa-IR')} تومان
                      </span>
                    )}
                  </div>
                  <span className="font-label-sm text-label-sm text-tertiary mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">savings</span>
                    سود خالص شما از این سفارش: ۲۷۰,۰۰۰ تومان
                  </span>
                </div>
                <div className="bg-primary text-on-primary font-label-md text-label-md px-space-md py-1.5 rounded-full shadow-sm">
                  ۱۵٪ تخفیف
                </div>
              </div>

              {/* Color Swatch Selector */}
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                    رنگ انتخابی: <span className="text-primary font-normal">{selectedColor.name}</span>
                  </span>
                  <span className="font-body-sm text-body-sm text-outline">
                    {product.colors.length} رنگ فاخر
                  </span>
                </div>

                <div className="flex items-center gap-space-md">
                  {product.colors.map((c, i) => {
                    const isSelected = selectedColor.code === c.code;

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        style={{ backgroundColor: c.code }}
                        className={`relative w-10 h-10 rounded-full shadow-sm flex items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface scale-105'
                            : 'ring-1 ring-outline-variant hover:scale-105'
                        }`}
                        title={c.name}
                      >
                        {isSelected && (
                          <span className="material-symbols-outlined text-white text-[16px] drop-shadow-sm">
                            check
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cup & Band Size Selector */}
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                    انتخاب سایز کاپ و دور سینه:
                  </span>
                  <button
                    onClick={() => setActiveTab(1)}
                    className="text-primary font-label-md text-label-md hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">straighten</span>
                    راهنمای محاسبه سایز آنلاین و دقیق
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-space-xs">
                  {product.sizes.map((s, idx) => {
                    const isSelected = selectedSize === s;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`h-11 rounded-lg font-label-md text-label-md transition-all flex items-center justify-center cursor-pointer ${
                          isSelected
                            ? 'bg-primary text-on-primary font-bold shadow-sm'
                            : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>

                {/* Scarcity Indicator */}
                <div className="mt-space-xs flex items-center gap-space-sm bg-tertiary-fixed/30 text-on-tertiary-container px-space-md py-space-xs rounded-lg border border-tertiary-fixed">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">hourglass_top</span>
                  <span className="font-body-sm text-body-sm font-semibold">
                    {product.stockWarning || 'تنها ۳ عدد در انبار موجود است — تقاضای این سایز بالا است!'}
                  </span>
                </div>
              </div>

              {/* Quantity & Purchase CTAs */}
              <div className="flex flex-col gap-space-sm pt-space-xs">
                <div className="flex items-center gap-space-md">
                  {/* Stepper */}
                  <div className="flex items-center bg-surface-container rounded-full h-12 px-space-sm shadow-inner shrink-0">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-highest cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">remove</span>
                    </button>
                    <span className="w-10 text-center font-label-lg text-label-lg font-bold text-on-surface">
                      {quantity.toLocaleString('fa-IR')}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-highest cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>

                  {/* Main Add to Cart */}
                  <button
                    onClick={() => onAddToCart(product, selectedColor, selectedSize, quantity)}
                    className="flex-1 h-12 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-full flex items-center justify-center gap-space-sm shadow-md transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                    <span>افزودن به سبد خرید</span>
                  </button>

                  {/* Secondary Share */}
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: product.name, url: window.location.href });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                      }
                    }}
                    className="w-12 h-12 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                    title="اشتراک‌گذاری"
                  >
                    <span className="material-symbols-outlined text-[20px]">share</span>
                  </button>
                </div>

                {/* Instant 1-Click Checkout */}
                <button
                  onClick={() => onDirectCheckout(product, selectedColor, selectedSize, quantity)}
                  className="w-full h-11 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md rounded-full flex items-center justify-center gap-space-xs transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">flash_on</span>
                  <span>خرید سریع با یک کلیک (بدون نیاز به ثبت‌نام طولانی)</span>
                </button>
              </div>

              {/* Discreet & Trust Guarantee Pod */}
              <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-sm mt-space-xs border border-surface-container">
                <div className="flex items-center gap-space-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[20px]">enhanced_encryption</span>
                  <span className="font-label-md text-label-md font-semibold">
                    بسته‌بندی ۱۰۰٪ محرمانه و بدون درج نام محصول روی بسته پستی
                  </span>
                </div>
                <div className="flex items-center gap-space-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
                  <span className="font-label-md text-label-md font-semibold">
                    ضمانت تست سلامت، اصالت دانتل و پلمب بهداشتی
                  </span>
                </div>
                <div className="flex items-center gap-space-sm text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
                  <span className="font-label-md text-label-md font-semibold">
                    ارسال کاملاً رایگان این محصول به سراسر ایران
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Tabs Section */}
      <section className="w-full py-space-xl bg-surface-container-lowest border-t border-surface-container" id="specSection">
        <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin flex flex-col gap-space-lg text-right">
          {/* Tab Triggers */}
          <div className="flex items-center gap-space-md overflow-x-auto pb-2 border-b border-surface-container">
            {[
              'توضیحات و ویژگی‌ها',
              'راهنمای سایزبندی دقیق و جدول اندازه‌ها',
              'نحوه شست‌وشو و نگهداری',
              `نظرات خریداران (${reviewsList.length} نظر)`,
            ].map((tabLabel, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`pb-space-sm font-label-lg text-label-lg shrink-0 transition-colors cursor-pointer ${
                  activeTab === idx
                    ? 'text-primary font-semibold border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tabLabel}
              </button>
            ))}
          </div>

          {/* Tab 0: Description */}
          {activeTab === 0 && (
            <div className="flex flex-col lg:flex-row gap-space-xl items-center animate-fadeIn">
              <div className="flex-1 flex flex-col gap-space-md">
                <h3 className="font-headline-md text-headline-md text-on-surface">
                  طراحی شده برای کمال، لطافت و راحتی بی‌انتها
                </h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {product.detailedDescription || product.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mt-space-sm">
                  {(product.features || [
                    'دانتل اورجینال لیون فرانسه؛ بافته شده با نخ ابریشم خالص ضد حساسیت و مقاوم در برابر نخ‌کش شدن',
                    'فنر ارگونومیک طبی؛ پوشش سیلیکونی انتهای فنر جهت جلوگیری از هرگونه سایش یا فشار به بافت قفسه سینه',
                    'یراق‌آلات طلایی استیل ۳۱۶؛ ضد زنگ و بدون تغییر رنگ حتی در اثر تعریق و شست‌وشوی مکرر',
                    'شورت با فاق دولایه پنبه ۱۰۰٪؛ رعایت بالاترین استانداردهای سلامت و بهداشت بانوان',
                  ]).map((feat, i) => (
                    <div key={i} className="flex items-start gap-space-sm bg-surface p-space-md rounded-xl border border-surface-container">
                      <span className="material-symbols-outlined text-primary text-[22px] shrink-0">spa</span>
                      <p className="font-body-sm text-body-sm text-on-surface font-medium leading-relaxed">{feat}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-96 rounded-xl overflow-hidden bg-surface-container aspect-square shrink-0 shadow-md">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcGcWSSt-iNo1dDUhWamJM-KV4McJySgpg1ZRg0y1SGa9AmhuW1iSuWcvhqdaxxGcG9Fdt_de2SXSdYY6S2PfioXO9niDd2hNFaE6nL9cSXB-Jf3EN0O6DDf6j26wNH-jWtPiUk2gYcwwvn7_ZxkPry7zMDClr9SYFa1rubu6HCH--eVX-xg6vdCqzfEBXhPZR_BidyrhttdouNp2-vAY3OKp63K2eqP1PiEYz58l8OZTEM0kvp127"
                  alt="جزئیات دوخت و یراق‌آلات"
                />
              </div>
            </div>
          )}

          {/* Tab 1: Size Guide Table */}
          {activeTab === 1 && (
            <div className="flex flex-col gap-space-md animate-fadeIn">
              <div className="bg-surface p-space-lg rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-space-md border border-surface-container">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    جدول راهنمای اندازه استاندارد اروپایی (EU / FR)
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    جهت انتخاب دقیق، متر خیاطی را بدون فشردن و مماس بر خط افقی بدن قرار دهید.
                  </p>
                </div>
                <button
                  onClick={() => alert('مشاوران فیتینگ لیندا در واتساپ ۰۲۱-۸۸۲۲۴۴۶۶ آماده راهنمایی شما هستند.')}
                  className="bg-primary text-on-primary font-label-md text-label-md px-space-md py-space-sm rounded-full flex items-center gap-space-xs shrink-0 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                  مشاوره آنلاین با کارشناس سایز
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl bg-surface shadow-xs border border-surface-container">
                <table className="w-full text-right font-body-md text-body-md border-collapse">
                  <thead className="bg-surface-container font-label-lg text-label-lg text-on-surface">
                    <tr>
                      <th className="p-space-md">سایز برچسب کالا</th>
                      <th className="p-space-md">دور زیر سینه (سانتی‌متر)</th>
                      <th className="p-space-md">دور روی برجستگی سینه (کاپ B)</th>
                      <th className="p-space-md">دور روی برجستگی سینه (کاپ C)</th>
                      <th className="p-space-md">سایز شورت متناسب</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container text-on-surface-variant">
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="p-space-md font-semibold text-primary">75B / 75C</td>
                      <td className="p-space-md">۷۳ تا ۷۷ سانتی‌متر</td>
                      <td className="p-space-md">۸۹ تا ۹۱ سانتی‌متر</td>
                      <td className="p-space-md">۹۱ تا ۹۳ سانتی‌متر</td>
                      <td className="p-space-md">Small / Medium (۳۶ - ۳۸)</td>
                    </tr>
                    <tr className="bg-primary/5 hover:bg-primary/10 transition-colors">
                      <td className="p-space-md font-semibold text-primary">80B / 80C (انتخاب متداول)</td>
                      <td className="p-space-md">۷۸ تا ۸۲ سانتی‌متر</td>
                      <td className="p-space-md">۹۴ تا ۹۶ سانتی‌متر</td>
                      <td className="p-space-md">۹۶ تا ۹۸ سانتی‌متر</td>
                      <td className="p-space-md">Medium / Large (۳۸ - ۴۰)</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="p-space-md font-semibold text-primary">85B / 85C</td>
                      <td className="p-space-md">۸۳ تا ۸۷ سانتی‌متر</td>
                      <td className="p-space-md">۹۹ تا ۱۰۱ سانتی‌متر</td>
                      <td className="p-space-md">۱۰۱ تا ۱۰۳ سانتی‌متر</td>
                      <td className="p-space-md">Large / X-Large (۴۰ - ۴۲)</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="p-space-md font-semibold text-primary">90B</td>
                      <td className="p-space-md">۸۸ تا ۹۲ سانتی‌متر</td>
                      <td className="p-space-md">۱۰۴ تا ۱۰۶ سانتی‌متر</td>
                      <td className="p-space-md">-</td>
                      <td className="p-space-md">XX-Large (۴۴)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Care Instructions */}
          {activeTab === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg animate-fadeIn">
              <div className="bg-surface p-space-md rounded-xl flex flex-col gap-space-sm items-center text-center border border-surface-container">
                <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">wash</span>
                </div>
                <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
                  شست‌وشوی دستی با آب ولرم
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  دمای آب حداکثر ۳۰ درجه سانتی‌گراد باشد. از چنگ زدن شدید یا چلاندن الیاف دانتل خودداری فرمایید.
                </p>
              </div>

              <div className="bg-surface p-space-md rounded-xl flex flex-col gap-space-sm items-center text-center border border-surface-container">
                <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">sanitizer</span>
                </div>
                <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
                  شوینده بدون آنزیم
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  تنها از مایع لباس‌شویی ملایم یا شامپو بچه استفاده نمایید. هرگز از سفیدکننده‌ها و شوینده‌های آنزیم‌دار استفاده نکنید.
                </p>
              </div>

              <div className="bg-surface p-space-md rounded-xl flex flex-col gap-space-sm items-center text-center border border-surface-container">
                <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">dry</span>
                </div>
                <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
                  خشک‌کردن طبیعی در سایه
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  به صورت افقی روی حوله در هوای آزاد پهن کنید. از قرار دادن در خشک‌کن چرخشی یا مجاورت بخاری اجتناب نمایید.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Customer Reviews */}
          {activeTab === 3 && (
            <div className="flex flex-col gap-space-lg animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center bg-surface p-space-lg rounded-xl border border-surface-container">
                {/* Rating Metric */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-l border-surface-container pb-space-md lg:pb-0 lg:pl-space-md">
                  <span className="font-display-hero text-headline-lg text-on-surface font-bold">
                    {product.rating}
                  </span>
                  <div className="flex items-center gap-1 text-tertiary mt-1">
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
                  <span className="font-body-md text-body-md text-on-surface-variant mt-2">
                    بر پایه {reviewsList.length} نظر تأیید شده
                  </span>
                  <span className="font-label-sm text-label-sm bg-tertiary-fixed text-on-tertiary-fixed px-space-md py-1 rounded-full mt-space-sm font-semibold">
                    ۹۸٪ خریداران این کالا را پیشنهاد داده‌اند
                  </span>
                </div>

                {/* Rating Progress */}
                <div className="lg:col-span-5 flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-sm font-body-sm text-body-sm">
                    <span className="w-12 text-on-surface-variant">۵ ستاره</span>
                    <div className="flex-1 bg-surface-container rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full w-[92%] rounded-full" />
                    </div>
                    <span className="w-8 text-left text-outline">۹۲٪</span>
                  </div>
                  <div className="flex items-center gap-space-sm font-body-sm text-body-sm">
                    <span className="w-12 text-on-surface-variant">۴ ستاره</span>
                    <div className="flex-1 bg-surface-container rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full w-[6%] rounded-full" />
                    </div>
                    <span className="w-8 text-left text-outline">۶٪</span>
                  </div>
                  <div className="flex items-center gap-space-sm font-body-sm text-body-sm">
                    <span className="w-12 text-on-surface-variant">۳ ستاره</span>
                    <div className="flex-1 bg-surface-container rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full w-[2%] rounded-full" />
                    </div>
                    <span className="w-8 text-left text-outline">۲٪</span>
                  </div>
                </div>

                {/* Add Review CTA */}
                <div className="lg:col-span-3 flex flex-col items-center justify-center gap-space-sm">
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-space-sm rounded-full transition-colors shadow-sm cursor-pointer"
                  >
                    ثبت نظر و تجربه خرید
                  </button>
                  <span className="font-label-sm text-label-sm text-outline text-center">
                    تمامی نظرات توسط خریداران واقعی ثبت گردیده است
                  </span>
                </div>
              </div>

              {/* Reviews List */}
              <div className="flex flex-col gap-space-md">
                {reviewsList.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-surface p-space-md rounded-xl flex flex-col gap-space-sm border border-surface-container"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold flex items-center justify-center text-[12px]">
                          {rev.author.slice(0, 1)}
                        </span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          {rev.author}
                        </span>
                        <span className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-space-xs py-0.5 rounded">
                          {rev.productVariant}
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-outline">{rev.date}</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Complete the Look / Complementary Cross-Sell */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin flex flex-col gap-space-lg text-right">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-sm">
            <div>
              <span className="font-label-md text-label-md text-primary font-semibold">استایل متناسب و بی‌نقص</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
                ست‌ها و مکمل‌های پیشنهادی برای این کالا
              </h2>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              با خرید همزمان از ۱۰٪ تخفیف بیشتر سبد بهره‌مند شوید
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {CROSS_SELL_PRODUCTS.map((cross) => (
              <div
                key={cross.id}
                className="bg-surface-container-low rounded-xl overflow-hidden p-space-sm flex flex-col gap-space-sm shadow-xs hover:shadow-md transition-shadow group border border-surface-container"
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-surface-container">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={cross.image}
                    alt={cross.name}
                  />
                  <span className="absolute top-2 right-2 bg-surface-container-lowest/90 font-label-sm text-label-sm px-space-sm py-0.5 rounded-full backdrop-blur-sm">
                    {cross.tag}
                  </span>
                </div>

                <div className="p-space-xs flex flex-col gap-space-xs flex-1 justify-between">
                  <div>
                    <h4 className="font-label-lg text-label-lg text-on-surface font-semibold group-hover:text-primary transition-colors">
                      {cross.name}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{cross.desc}</p>
                  </div>

                  <div className="flex items-center justify-between pt-space-sm mt-space-sm border-t border-surface-container">
                    <span className="font-label-lg text-label-lg text-primary font-bold">
                      {cross.price.toLocaleString('fa-IR')} تومان
                    </span>
                    <button
                      onClick={() => handleCrossSellAdd(cross)}
                      className="bg-surface hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md px-space-md py-1.5 rounded-full transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      <span>افزودن</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Bottom Purchase Bar for High Desktop/Mobile Conversion */}
      <div
        className={`fixed bottom-0 left-0 w-full z-40 bg-surface/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.06)] border-t border-surface-container transition-transform duration-300 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin py-space-sm flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md text-right">
            <div className="w-12 h-14 rounded-lg overflow-hidden bg-surface-container shrink-0 hidden sm:block">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate max-w-xs md:max-w-md">
                {product.name}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                رنگ: <strong className="text-primary">{selectedColor.name.split(' ')[0]}</strong> • سایز:{' '}
                <strong className="text-primary">{selectedSize}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="flex flex-col text-left hidden sm:flex">
              <span className="font-headline-sm text-headline-sm text-primary font-bold">
                {product.price.toLocaleString('fa-IR')} تومان
              </span>
              {product.originalPrice && (
                <span className="font-body-sm text-body-sm text-outline line-through">
                  {product.originalPrice.toLocaleString('fa-IR')} تومان
                </span>
              )}
            </div>

            <button
              onClick={() => onAddToCart(product, selectedColor, selectedSize, quantity)}
              className="h-11 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-space-xl rounded-full flex items-center gap-space-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span>افزودن به سبد</span>
            </button>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleAddReview}
        productName={product.name}
      />

      {/* Video Modal */}
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
    </div>
  );
};
