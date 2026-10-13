import React, { useState } from 'react';
import { Review } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Review) => void;
  productName: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
  productName,
}) => {
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (author.trim() && comment.trim()) {
      onSubmitReview({
        id: 'rev-' + Date.now(),
        author: author.trim(),
        rating,
        date: 'لحظاتی پیش',
        location: location.trim() || 'تهران',
        productVariant: `خریدار تایید شده ${productName}`,
        comment: comment.trim(),
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />

      <div className="relative bg-surface rounded-3xl max-w-lg w-full p-space-lg shadow-2xl z-10 text-right border border-surface-container">
        <div className="flex items-center justify-between border-b border-surface-container pb-space-sm mb-space-md">
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            ثبت تجربه و نظر درباره کالا
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-outline"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface font-semibold">
              نام شما (یا نام مستعار) *
            </label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="مثال: فرنوش الف."
              className="bg-surface-container-low border border-surface-container rounded-xl px-space-md py-2 font-body-sm text-body-sm outline-none focus:border-primary text-right"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface font-semibold">شهر سکونت</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="مثال: اصفهان"
              className="bg-surface-container-low border border-surface-container rounded-xl px-space-md py-2 font-body-sm text-body-sm outline-none focus:border-primary text-right"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface font-semibold">امتیاز شما</label>
            <div className="flex items-center gap-1 text-tertiary">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 cursor-pointer transition-transform hover:scale-110"
                >
                  <span
                    className="material-symbols-outlined text-[26px]"
                    style={{ fontVariationSettings: `'FILL' ${star <= rating ? 1 : 0}` }}
                  >
                    star
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface font-semibold">
              نظر و تجربه شما درباره لطافت، دوخت و بسته‌بندی *
            </label>
            <textarea
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="احساس شما از پوشیدن، سایزبندی، دانتل و بسته‌بندی محرمانه لیندا..."
              className="bg-surface-container-low border border-surface-container rounded-xl px-space-md py-2.5 font-body-sm text-body-sm outline-none focus:border-primary text-right resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded-full transition-all shadow-md mt-space-xs cursor-pointer"
          >
            ثبت و ارسال نظر
          </button>
        </form>
      </div>
    </div>
  );
};
