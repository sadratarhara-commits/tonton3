import React, { useState } from 'react';

interface SizeCalculatorProps {
  onSelectSize?: (size: string) => void;
  onExploreProducts?: () => void;
}

export const SizeCalculator: React.FC<SizeCalculatorProps> = ({
  onSelectSize,
  onExploreProducts,
}) => {
  const [underbust, setUnderbust] = useState<number>(75);
  const [cup, setCup] = useState<'A' | 'B' | 'C' | 'D'>('B');

  const cupNames = {
    A: 'کاپ آ (ظریف)',
    B: 'کاپ ب (استاندارد)',
    C: 'کاپ سی (پرتر)',
    D: 'کاپ دی (کامل)',
  };

  const calculatedSize = `${underbust}${cup}`;

  const handleAction = () => {
    if (onSelectSize) onSelectSize(calculatedSize);
    if (onExploreProducts) onExploreProducts();
  };

  return (
    <section className="w-full py-space-xl bg-surface-container" id="size-calculator">
      <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
        <div className="bg-surface rounded-3xl p-space-lg lg:p-space-xl shadow-lg border border-surface-container-high grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Interactive Tool Column */}
          <div className="lg:col-span-7 flex flex-col text-right">
            <div className="inline-flex items-center gap-2 text-primary font-label-md text-label-md mb-2">
              <span className="material-symbols-outlined text-[20px]">tune</span>
              <span>آتلیه هوشمند فیتینگ لیندا</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              راهنمای هوشمند تعیین دقیق سایز سوتین
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 mb-space-lg">
              بیش از ۷۵٪ بانوان از سایز کاپ نامناسب استفاده می‌کنند. با انتخاب اندازه‌های زیر در چند ثانیه سایز ایده‌آل خود را پیدا کنید:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mb-space-lg">
              {/* Underbust Selection */}
              <div className="flex flex-col gap-2">
                <label className="font-label-lg text-label-lg text-on-surface font-semibold flex items-center justify-between">
                  <span>۱. دور زیر سینه (سانتی‌متر)</span>
                  <span className="text-primary font-bold">{underbust} سانتی‌متر</span>
                </label>
                <div className="bg-surface-container-low p-space-md rounded-xl border border-surface-container">
                  <input
                    type="range"
                    min="65"
                    max="95"
                    step="5"
                    value={underbust}
                    onChange={(e) => setUnderbust(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer h-2 bg-surface-container rounded-lg"
                  />
                  <div className="flex justify-between text-on-surface-variant font-label-sm text-label-sm mt-2">
                    <span>۶۵</span>
                    <span>۷۰</span>
                    <span>۷۵</span>
                    <span>۸۰</span>
                    <span>۸۵</span>
                    <span>۹۰+</span>
                  </div>
                </div>
              </div>

              {/* Overbust / Cup Selection */}
              <div className="flex flex-col gap-2">
                <label className="font-label-lg text-label-lg text-on-surface font-semibold">
                  ۲. تفاوت برجستگی سینه (انتخاب کاپ)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['A', 'B', 'C', 'D'] as const).map((cupOption) => (
                    <button
                      key={cupOption}
                      type="button"
                      onClick={() => setCup(cupOption)}
                      className={`py-2.5 rounded-lg font-label-lg text-label-lg transition-all cursor-pointer ${
                        cup === cupOption
                          ? 'bg-primary text-on-primary font-bold shadow-sm'
                          : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      کاپ {cupOption}
                    </button>
                  ))}
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  پیشنهاد پیش‌فرض: کاپ استاندارد متوسط (B)
                </span>
              </div>
            </div>

            {/* Calculated Result Box */}
            <div className="bg-secondary-fixed/40 p-space-md rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-space-md border border-secondary-fixed">
              <div className="text-right">
                <span className="font-label-sm text-label-sm text-on-secondary-fixed font-semibold">
                  سایز پیشنهادی متخصصان لیندا:
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="font-headline-lg text-headline-lg font-bold text-primary">
                    {calculatedSize} (سایز {underbust} {cupNames[cup]})
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    معادل استاندارد اروپایی (EU)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAction}
                className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-space-lg py-3 rounded-full transition-colors whitespace-nowrap shadow-sm cursor-pointer"
              >
                مشاهده محصولات این سایز
              </button>
            </div>
          </div>

          {/* Visual / Measuring Instructions */}
          <div className="lg:col-span-5 bg-surface-container-low rounded-2xl p-space-lg flex flex-col items-center text-center border border-surface-container">
            <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-space-md">
              <span className="material-symbols-outlined text-[32px]">female</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-2">
              نحوه اندازه‌گیری صحیح در منزل
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md">
              متر نواری را بدون ایجاد فشار یا شل بودن، کاملاً مماس بر خط افقی زیر سینه نگه دارید. برای بهترین نتیجه، در حالت ایستاده و بازدم کامل اندازه‌گیری فرمایید.
            </p>
            <div className="w-full flex items-center justify-around py-space-sm bg-surface rounded-xl text-on-surface-variant font-label-sm text-label-sm shadow-xs border border-surface-container">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                بدون درد بند سرشانه
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                کاور بی‌نقص بغل سینه
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
