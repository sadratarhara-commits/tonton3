import React, { useState } from 'react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = products.filter(
    (p) =>
      p.name.includes(query) ||
      p.model.includes(query) ||
      p.englishModel.toLowerCase().includes(query.toLowerCase()) ||
      p.description.includes(query)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />

      <div className="relative bg-surface rounded-2xl max-w-xl w-full p-space-md shadow-2xl z-10 text-right border border-surface-container">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-surface-container pb-space-sm mb-space-md">
          <span className="material-symbols-outlined text-outline text-[22px] ml-2">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در نام مدل، دانتل، ابریشم، سوتین..."
            className="w-full bg-transparent font-body-lg text-body-lg text-on-surface placeholder:text-outline outline-none text-right"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-outline hover:text-on-surface p-1 text-[14px]"
            >
              پاک‌کردن
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-outline mr-2"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto flex flex-col gap-space-sm">
          {filtered.length === 0 ? (
            <div className="text-center py-space-xl text-on-surface-variant font-body-sm">
              هیچ کالایی متناسب با «{query}» یافت نشد.
            </div>
          ) : (
            filtered.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  onSelectProduct(prod);
                  onClose();
                }}
                className="flex items-center gap-space-md p-space-sm rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer border border-transparent hover:border-surface-container"
              >
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="w-14 h-16 object-cover rounded-lg bg-surface-container shrink-0"
                />
                <div className="flex-1 text-right">
                  <h4 className="font-label-lg text-label-lg text-on-surface font-semibold line-clamp-1">
                    {prod.name}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {prod.model} • {prod.price.toLocaleString('fa-IR')} تومان
                  </p>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px]">chevron_left</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
