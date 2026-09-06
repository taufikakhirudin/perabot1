import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartCount,
    setIsCheckoutOpen,
    setActivePage,
  } = useStore();

  if (!isCartOpen) return null;

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-250">
        {/* Cart Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#014DE6] flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base">Keranjang Belanja</h2>
              <p className="text-xs text-slate-500">
                {cartCount} item dipilih dari RIZQAL BAROKAH
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white rounded-full transition-colors"
            aria-label="Tutup Keranjang"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#014DE6] flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">
                Keranjang Masih Kosong
              </h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Yuk jelajahi produk perabot dan alat kebersihan terbaik dengan harga
                bersahabat dari Depok!
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActivePage('products');
                }}
                className="mt-2 bg-[#014DE6] hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-6 rounded-xl shadow-xs transition-colors"
              >
                Mulai Belanja Sekarang
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const isWholesale =
                item.product.wholesalePrice &&
                item.product.minWholesaleQty &&
                item.quantity >= item.product.minWholesaleQty;

              const effectivePrice = isWholesale
                ? item.product.wholesalePrice!
                : item.product.price;

              return (
                <div
                  key={`${item.product.id}-${item.selectedColor || ''}`}
                  className="pt-3 first:pt-0 flex gap-3 items-start"
                >
                  {/* Thumbnail */}
                  <div className="w-18 h-18 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden shrink-0 p-1 flex items-center justify-center">
                    <img
                      src={item.product.mainImage}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#014DE6] uppercase tracking-wide block truncate">
                      {item.product.brand}
                    </span>
                    <h4 className="text-xs font-semibold text-slate-900 leading-snug line-clamp-2">
                      {item.product.name}
                    </h4>

                    {item.selectedColor && (
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        Varian: {item.selectedColor}
                      </span>
                    )}

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xs font-bold text-slate-900">
                        Rp {effectivePrice.toLocaleString('id-ID')}
                      </span>
                      {isWholesale && (
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                          Harga Grosir
                        </span>
                      )}
                    </div>

                    {/* Quantity controls & Delete */}
                    <div className="flex items-center justify-between mt-2 pt-1">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedColor
                            )
                          }
                          className="p-1 hover:bg-slate-100 text-slate-600 transition-colors"
                          title="Kurangi"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800 min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedColor
                            )
                          }
                          className="p-1 hover:bg-slate-100 text-slate-600 transition-colors"
                          title="Tambah"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(item.product.id, item.selectedColor)
                        }
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                        title="Hapus dari keranjang"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            {/* Free Shipping / Safety notice */}
            <div className="flex items-center gap-2 text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200">
              <Truck className="w-4 h-4 text-[#014DE6] shrink-0" />
              <span>
                Pengiriman aman dari <strong>Bojongsari, Depok</strong>. Free bubble
                wrap & dus tebal!
              </span>
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-600 font-medium">
                Total Pembayaran:
              </span>
              <span className="text-lg font-extrabold text-[#014DE6]">
                Rp {cartTotal.toLocaleString('id-ID')}
              </span>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleProceedCheckout}
                className="w-full flex items-center justify-center gap-2 bg-[#014DE6] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-transform active:scale-98 text-sm"
              >
                <span>LANJUT KE CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors text-center"
              >
                Lanjut Belanja Produk Lain
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
