/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, ProductColor, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { WishlistModal } from './components/WishlistModal';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'product'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | undefined>(undefined);

  // Cart State (Initialized with sample item matching Stitch's header: "۱,۸۵۰,۰۰۰ تومان" or fresh state)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: `${PRODUCTS[0].id}-${PRODUCTS[0].colors[0].code}-80B`,
      product: PRODUCTS[0],
      selectedColor: PRODUCTS[0].colors[0],
      selectedSize: '80B',
      quantity: 1,
    },
  ]);

  // Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[1], PRODUCTS[3]]);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleNavigate = (page: 'home' | 'product', category?: string) => {
    setCurrentPage(page);
    setActiveCategoryFilter(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (
    product: Product,
    color: ProductColor,
    size: string,
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${color.code}-${size}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, selectedColor: color, selectedSize: size, quantity }];
    });
    showToast(`${product.name} به سبد خرید افزوده شد.`);
  };

  const handleQuickAddToCart = (product: Product) => {
    handleAddToCart(product, product.colors[0], product.sizes[0], 1);
  };

  const handleDirectCheckout = (
    product: Product,
    color: ProductColor,
    size: string,
    quantity: number = 1
  ) => {
    handleAddToCart(product, color, size, quantity);
    setIsCheckoutOpen(true);
  };

  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`${product.name} از لیست علاقه‌مندی‌ها حذف شد.`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`${product.name} به علاقه‌مندی‌ها افزوده شد.`);
    }
  };

  const handleUpdateCartQty = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-md text-on-surface antialiased selection:bg-primary-fixed selection:text-primary">
      {/* Sticky Global Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        cartTotal={cartTotal}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSizeGuide={() => {
          if (currentPage !== 'home') {
            setCurrentPage('home');
            setTimeout(() => {
              const el = document.getElementById('size-calculator');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else {
            const el = document.getElementById('size-calculator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-20">
        {currentPage === 'home' ? (
          <HomePage
            onSelectProduct={handleSelectProduct}
            onQuickAddToCart={handleQuickAddToCart}
            wishlistIds={wishlist.map((w) => w.id)}
            onToggleWishlist={handleToggleWishlist}
            activeCategoryFilter={activeCategoryFilter}
          />
        ) : (
          <ProductPage
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onDirectCheckout={handleDirectCheckout}
            onBackToHome={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSizeGuide={() => {
          if (currentPage !== 'home') {
            setCurrentPage('home');
            setTimeout(() => {
              const el = document.getElementById('size-calculator');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else {
            const el = document.getElementById('size-calculator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Interactive Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExplore={() => {
          setCurrentPage('home');
          const el = document.getElementById('featured-products');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={handleSelectProduct}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectProduct={handleSelectProduct}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary font-label-md text-label-md px-space-lg py-2.5 rounded-full shadow-xl flex items-center gap-space-sm animate-bounce">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
