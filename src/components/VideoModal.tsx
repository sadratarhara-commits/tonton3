import React from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-xs" />

      <div className="relative bg-surface rounded-3xl max-w-2xl w-full p-space-md shadow-2xl z-10 text-right border border-surface-container overflow-hidden">
        <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">play_circle</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              آنباکسینگ و جعبه‌گشایی محرمانه لیندا
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-outline"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Cinematic Video Representation */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center group shadow-inner">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZanrUF_OxNQicXlgSiygs9u0Z9XCWDwkl2hqo6HPi9utOp5TU1ToeJ-wv5HjXrQR5qa0BMtMMwUASmdbkLTqExN9lRL3O7OXpnkgCT0-IOL4snO39N7ArLtRGc85baNrNycOxdr8ZfA1BNAJY2I3OcoxuMhp_Xxj3NR9jA0s9bwIFvE3wMn36wV21q9Zw_udhdhh7gRY2zh8nprUDm5aLWKya_LIEueWGO6A5IMXHHr1RV-BVo_fV"
            alt="آنباکسینگ بسته‌بندی محرمانه لیندا"
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 flex flex-col justify-end p-space-md text-surface">
            <span className="font-label-sm text-label-sm text-primary-fixed mb-1">
              ویدیو با کیفیت 4K • زمان: ۴۸ ثانیه
            </span>
            <p className="font-body-sm text-body-sm text-surface/90">
              بررسی بافت دانتل فرانسوی، جزئیات بسته‌بندی پلمپ و جعبه‌های سفید مات بدون نشان تجاری
            </p>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/90 text-on-primary flex items-center justify-center shadow-2xl scale-110 animate-pulse">
              <span className="material-symbols-outlined text-[36px]">play_arrow</span>
            </div>
          </div>
        </div>

        <div className="mt-space-md bg-surface-container-low p-space-sm rounded-xl text-center font-body-sm text-body-sm text-on-surface-variant flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">lock</span>
          <span>بسته‌های تمامی سفارش‌ها در پاکت‌های ضخیم مات، بدون بو و بدون هرگونه نام کالا پلمب می‌شوند.</span>
        </div>
      </div>
    </div>
  );
};
