import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
  onExplore: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
  onExplore,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const freeShippingThreshold = 1500000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);
  const shippingPercent = Math.min(100, (rawSubtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'LINDA10' || code === 'WELCOME' || code === 'FALL2024') {
      setDiscountPercent(10);
      setPromoMessage({ text: 'کد تخفیف ۱۰٪ با موفقیت اعمال شد!' });
    } else if (code === 'VIP15') {
      setDiscountPercent(15);
      setPromoMessage({ text: 'کد تخفیف اختصاصی ۱۵٪ اعمال شد!' });
    } else {
      setDiscountPercent(0);
      setPromoMessage({ text: 'کد تخفیف نامعتبر یا منقضی شده است.', error: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-surface shadow-2xl flex flex-col text-right">
          {/* Header */}
          <div className="p-space-md border-b border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[24px]">shopping_bag</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                سبد خرید شما ({items.length.toLocaleString('fa-IR')})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-surface-container-low px-space-md py-space-sm border-b border-surface-container text-right">
            {remainingForFreeShipping > 0 ? (
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">
                تنها{' '}
                <strong className="text-primary font-semibold">
                  {remainingForFreeShipping.toLocaleString('fa-IR')} تومان
                </strong>{' '}
                دیگر تا ارسال رایگان سراسر کشور
              </p>
            ) : (
              <p className="font-body-sm text-body-sm text-tertiary font-semibold flex items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                تبریک! این سفارش مشمول ارسال رایگان لیندا است.
              </p>
            )}
            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-500 rounded-full"
                style={{ width: `${shippingPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-space-md flex flex-col gap-space-md">
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-space-xl text-on-surface-variant">
                <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-space-md text-outline">
                  <span className="material-symbols-outlined text-[40px]">shopping_bag</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-semibold">
                  سبد خرید شما خالی است
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg max-w-xs">
                  از کالکشن جدید پاییزه دیدن کنید و لطافت ابریشم و دانتل را به خود هدیه دهید.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onExplore();
                  }}
                  className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-space-xl py-3 rounded-full transition-colors shadow-sm"
                >
                  مشاهده کالکشن و محصولات
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-space-md bg-surface-container-low p-space-sm rounded-xl border border-surface-container"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-lg shrink-0 bg-surface-container"
                  />
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-label-md text-label-md font-semibold text-on-surface line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-outline hover:text-error transition-colors p-1"
                          title="حذف کالا"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                      <p className="font-body-sm text-body-sm text-outline mt-0.5">
                        رنگ: {item.selectedColor.name.split(' ')[0]} • سایز: {item.selectedSize}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-space-xs">
                      {/* Stepper */}
                      <div className="flex items-center bg-surface rounded-full h-8 px-2 border border-surface-container">
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-on-surface hover:text-primary"
                        >
                          -
                        </button>
                        <span className="w-7 text-center font-label-md text-label-md font-bold">
                          {item.quantity.toLocaleString('fa-IR')}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-on-surface hover:text-primary"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-label-lg text-label-lg font-bold text-primary">
                        {(item.product.price * item.quantity).toLocaleString('fa-IR')} تومان
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Pod */}
          {items.length > 0 && (
            <div className="p-space-md border-t border-surface-container bg-surface-container-low flex flex-col gap-space-sm">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="کد تخفیف (مثال: LINDA10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-surface border border-surface-container px-space-md py-2 rounded-lg text-body-sm font-body-sm outline-none focus:border-primary text-right"
                />
                <button
                  type="submit"
                  className="bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md px-4 py-2 rounded-lg transition-colors"
                >
                  اعمال
                </button>
              </form>
              {promoMessage && (
                <span
                  className={`font-label-sm text-label-sm ${
                    promoMessage.error ? 'text-error' : 'text-primary font-semibold'
                  }`}
                >
                  {promoMessage.text}
                </span>
              )}

              {/* Subtotal & Discount rows */}
              <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant pt-space-xs">
                <span>مجموع اقلام:</span>
                <span>{rawSubtotal.toLocaleString('fa-IR')} تومان</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between font-body-sm text-body-sm text-primary font-semibold">
                  <span>تخفیف ویژه ({discountPercent}٪):</span>
                  <span>- {discountAmount.toLocaleString('fa-IR')} تومان</span>
                </div>
              )}
              <div className="flex justify-between font-label-lg text-label-lg text-on-surface font-bold border-t border-surface-container pt-2">
                <span>مبلغ قابل پرداخت:</span>
                <span className="text-primary text-headline-sm font-headline-sm">
                  {finalTotal.toLocaleString('fa-IR')} تومان
                </span>
              </div>

              {/* Discreet Packaging reminder */}
              <div className="flex items-center gap-1.5 text-outline font-label-sm text-label-sm py-1">
                <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
                <span>ارسال در بسته‌بندی کاملاً مات، محرمانه و بدون نام</span>
              </div>

              {/* CTA button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg py-3.5 rounded-full shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>تکمیل خرید و ثبت سفارش</span>
                <span className="material-symbols-outlined text-[20px]">arrow_left_alt</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
