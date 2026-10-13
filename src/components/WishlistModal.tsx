import React from 'react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />

      <div className="relative bg-surface rounded-3xl max-w-lg w-full p-space-lg shadow-2xl z-10 text-right border border-surface-container">
        <div className="flex items-center justify-between border-b border-surface-container pb-space-sm mb-space-md">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">favorite</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              کالاهای مورد علاقه شما ({wishlist.length.toLocaleString('fa-IR')})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-outline"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto flex flex-col gap-space-sm">
          {wishlist.length === 0 ? (
            <div className="text-center py-space-xl text-on-surface-variant font-body-sm">
              هنوز کالایی را به لیست علاقه‌مندی‌ها اضافه نکرده‌اید.
            </div>
          ) : (
            wishlist.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center gap-space-md bg-surface-container-low p-space-sm rounded-xl border border-surface-container"
              >
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="w-16 h-20 object-cover rounded-lg bg-surface-container shrink-0 cursor-pointer"
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                />
                <div className="flex-1 text-right">
                  <h4
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="font-label-md text-label-md font-semibold text-on-surface line-clamp-1 cursor-pointer hover:text-primary transition-colors"
                  >
                    {prod.name}
                  </h4>
                  <p className="font-body-sm text-body-sm text-primary font-bold mt-1">
                    {prod.price.toLocaleString('fa-IR')} تومان
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="bg-primary hover:bg-primary-container text-on-primary text-label-sm font-label-sm px-3 py-1.5 rounded-full shadow-xs"
                  >
                    مشاهده
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(prod)}
                    className="text-outline hover:text-error p-1 transition-colors"
                    title="حذف"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
