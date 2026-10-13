import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    province: 'تهران',
    city: 'تهران',
    address: '',
    postalCode: '',
    shippingMethod: 'express',
    paymentMethod: 'online',
    discreetNotes: 'بسته‌بندی کاملاً سفید بدون نام تجاری',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const trackingCode = 'LND-' + Math.floor(100000 + Math.random() * 900000);
      setOrderSuccess(trackingCode);
      onOrderCompleted();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />

      <div className="relative bg-surface rounded-3xl max-w-2xl w-full p-space-lg lg:p-space-xl shadow-2xl z-10 text-right max-h-[90vh] overflow-y-auto border border-surface-container">
        {orderSuccess ? (
          <div className="flex flex-col items-center text-center py-space-lg">
            <div className="w-20 h-20 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-space-md shadow-sm">
              <span className="material-symbols-outlined text-[42px]">check_circle</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mb-2">
              سفارش شما با موفقیت ثبت گردید
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-space-lg">
              از اعتماد شما به خانه مد لیندا سپاسگزاریم. سفارش شما با بالاترین استانداردهای بهداشتی و در بسته‌بندی ۱۰۰٪ محرمانه آماده ارسال می‌شود.
            </p>

            <div className="w-full bg-surface-container-low p-space-md rounded-2xl mb-space-lg border border-surface-container flex flex-col gap-2">
              <div className="flex justify-between items-center font-label-md text-label-md">
                <span className="text-outline">کد پیگیری اختصاصی لیندا:</span>
                <span className="text-primary font-bold text-headline-sm">{orderSuccess}</span>
              </div>
              <div className="flex justify-between items-center font-label-md text-label-md">
                <span className="text-outline">تحویل‌گیرنده:</span>
                <span className="text-on-surface font-semibold">{formData.fullName || 'بانوی گرامی'}</span>
              </div>
              <div className="flex justify-between items-center font-label-md text-label-md">
                <span className="text-outline">مبلغ پرداختی:</span>
                <span className="text-on-surface font-semibold">{totalAmount.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between items-center font-label-md text-label-md">
                <span className="text-outline">وضعیت بسته‌بندی:</span>
                <span className="text-tertiary font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  محرمانه و معطر
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg px-space-xl py-3 rounded-full transition-all shadow-md cursor-pointer"
            >
              بازگشت به فروشگاه
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between border-b border-surface-container pb-space-md mb-space-lg">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  تسویه‌حساب و ثبت نهایی سفارش
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  لطفاً اطلاعات ارسال را با دقت تکمیل فرمایید.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">
                    نام و نام خانوادگی گیرنده *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="مثال: سارا محمدی"
                    className="bg-surface-container-low border border-surface-container rounded-xl px-space-md py-2.5 font-body-sm text-body-sm outline-none focus:border-primary text-right"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">
                    شماره تماس همراه (جهت هماهنگی تحویل) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="bg-surface-container-low border border-surface-container rounded-xl px-space-md py-2.5 font-body-sm text-body-sm outline-none focus:border-primary text-right dir-ltr"
                  />
                </div>
              </div>

              {/* Address details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">استان</label>
                  <input
                    type="text"
                    required
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="bg-surface-container-low border border-surface-container rounded-xl px-space-md py-2.5 font-body-sm text-body-sm outline-none focus:border-primary text-right"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">شهر</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="bg-surface-container-low border border-surface-container rounded-xl px-space-md py-2.5 font-body-sm text-body-sm outline-none focus:border-primary text-right"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface font-semibold">
                  آدرس پستی دقیق *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="خیابان، کوچه، پلاک، زنگ یا واحد..."
                  className="bg-surface-container-low border border-surface-container rounded-xl px-space-md py-2.5 font-body-sm text-body-sm outline-none focus:border-primary text-right resize-none"
                />
              </div>

              {/* Shipping Options */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface font-semibold">روش ارسال</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <label className="flex items-center gap-space-sm bg-surface-container-low p-space-sm rounded-xl border border-surface-container cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="shipping"
                      checked={formData.shippingMethod === 'express'}
                      onChange={() => setFormData({ ...formData, shippingMethod: 'express' })}
                      className="accent-primary"
                    />
                    <div className="flex flex-col text-right">
                      <span className="font-label-md text-label-md font-semibold">پیک اختصاصی بانوان (تهران)</span>
                      <span className="font-body-sm text-body-sm text-outline">تحویل تا حداکثر ۲۴ ساعت</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-space-sm bg-surface-container-low p-space-sm rounded-xl border border-surface-container cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="shipping"
                      checked={formData.shippingMethod === 'post'}
                      onChange={() => setFormData({ ...formData, shippingMethod: 'post' })}
                      className="accent-primary"
                    />
                    <div className="flex flex-col text-right">
                      <span className="font-label-md text-label-md font-semibold">پست پیشتاز ویژه (سراسر کشور)</span>
                      <span className="font-body-sm text-body-sm text-outline">تحویل ۲ الی ۳ روز کاری</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Discreet Packaging Guarantee Notice */}
              <div className="bg-primary-fixed/20 p-space-md rounded-2xl flex items-center gap-space-md border border-primary-fixed">
                <span className="material-symbols-outlined text-primary text-[28px] shrink-0">lock</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  <strong>تضمین حریم خصوصی:</strong> بسته‌های ارسالی بدون هیچ‌گونه آرم، نام برند یا اشاره‌ای به محتوای لباس زیر در پاکت‌های مات و کاملاً بدون نشانه تحویل داده می‌شوند.
                </p>
              </div>

              {/* Order total & CTA */}
              <div className="flex items-center justify-between border-t border-surface-container pt-space-md mt-space-sm">
                <div>
                  <span className="font-body-sm text-body-sm text-outline block">جمع کل قابل پرداخت:</span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    {totalAmount.toLocaleString('fa-IR')} تومان
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg px-space-xl py-3.5 rounded-full shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span>در حال ثبت اطلاعات...</span>
                  ) : (
                    <>
                      <span>تأیید و پرداخت نهایی</span>
                      <span className="material-symbols-outlined text-[20px]">check</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
