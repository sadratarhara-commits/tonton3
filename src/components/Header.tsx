import React, { useState } from 'react';

interface HeaderProps {
  currentPage: 'home' | 'product';
  onNavigate: (page: 'home' | 'product', category?: string) => void;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenSizeGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenSizeGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  const navItems = [
    { label: 'صفحه نخست', page: 'home', action: () => onNavigate('home') },
    { label: 'ست‌های دانتل و مجلسی', page: 'product', action: () => onNavigate('product', 'lace') },
    { label: 'لباس راحتی و خواب', page: 'home', action: () => onNavigate('home', 'sleepwear') },
    { label: 'سوتین و کاستوم', page: 'home', action: () => onNavigate('home', 'organic') },
    { label: 'ابریشم و ساتن', page: 'home', action: () => onNavigate('home', 'sleepwear') },
    { label: 'راهنمای تخصصی سایز', page: 'custom', action: onOpenSizeGuide },
    { label: 'تخفیف‌های فصل', page: 'home', action: () => onNavigate('home') },
  ];

  return (
    <header className="fixed top-0 w-full z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Announcement Ribbon */}
      <div className="w-full bg-surface-container-low py-space-xs px-margin-mobile lg:px-margin text-center text-on-surface-variant font-label-md text-label-md flex items-center justify-center gap-space-md border-b border-surface-container">
        <span className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
          بسته‌بندی کاملاً محرمانه و بدون نام کالا
        </span>
        <span className="text-outline-variant hidden sm:inline">•</span>
        <span className="hidden sm:flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
          ارسال رایگان برای خریدهای بالای ۱.۵ میلیون تومان
        </span>
        <span className="text-outline-variant hidden md:inline">•</span>
        <span className="hidden md:flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
          ضمانت تعویض سایز و اصالت پارچه
        </span>
      </div>

      {/* Main Nav Bar */}
      <div className="h-20 w-full max-w-[1440px] mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-space-lg">
        {/* Brand Logo & Name */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-space-md shrink-0 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-sm">
            <span className="material-symbols-outlined text-[24px]">spa</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="font-headline-sm text-headline-sm text-primary font-semibold leading-none">لیندا</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider mt-0.5">
              آتلیه تخصصی لباس خواب و لانژ
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-space-lg">
          {navItems.map((item, idx) => {
            const isActive =
              (item.page === 'home' && currentPage === 'home' && idx === 0) ||
              (item.page === 'product' && currentPage === 'product');

            return (
              <button
                key={idx}
                onClick={item.action}
                className={`transition-all py-space-sm font-label-lg text-label-lg relative cursor-pointer ${
                  isActive
                    ? 'text-primary font-semibold border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Tools: Search, Wishlist, Cart Pill, Profile & Mobile Hamburger */}
        <div className="flex items-center gap-space-md shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
            title="جستجو در محصولات"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
            title="علاقه‌مندی‌ها"
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm flex items-center justify-center leading-none">
                {wishlistCount.toLocaleString('fa-IR')}
              </span>
            )}
          </button>

          {/* Interactive Cart Pill Button */}
          <div
            onClick={onOpenCart}
            className="flex items-center gap-space-sm bg-surface-container-low hover:bg-surface-container transition-all py-space-xs px-space-md rounded-full cursor-pointer shadow-sm active:scale-95"
          >
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[20px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center justify-center leading-none font-bold">
                  {cartCount.toLocaleString('fa-IR')}
                </span>
              )}
            </div>
            <span className="hidden md:inline font-label-md text-label-md text-on-surface font-semibold">
              {cartTotal > 0 ? formatPrice(cartTotal) : 'سبد خرید'}
            </span>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface border-b border-surface-container px-margin-mobile py-space-md flex flex-col gap-space-sm animate-fadeIn">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                item.action();
                setMobileMenuOpen(false);
              }}
              className="text-right py-2 font-label-lg text-label-lg text-on-surface hover:text-primary transition-colors flex items-center justify-between"
            >
              <span>{item.label}</span>
              <span className="material-symbols-outlined text-[18px] text-outline">chevron_left</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
