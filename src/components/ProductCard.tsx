import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import {
  Star,
  ShoppingCart,
  MessageCircle,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Tag,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, addToCart, openProductWhatsApp } = useStore();

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Badges Container */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {/* Ready Badge */}
        <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs tracking-wide">
          <CheckCircle2 className="w-3 h-3" />
          READY
        </span>

        {/* Original Badge */}
        <span className="inline-flex items-center gap-1 bg-[#014DE6] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs tracking-wide">
          <ShieldCheck className="w-3 h-3" />
          ORIGINAL
        </span>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
            HEMAT {discountPercent}%
          </span>
        )}
      </div>

      {/* Product Image Area */}
      <div
        className="relative w-full aspect-square bg-slate-50 overflow-hidden cursor-pointer flex items-center justify-center p-3"
        onClick={() => setSelectedProduct(product)}
      >
        <img
          src={product.mainImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
        />

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#014DE6]" />
            Lihat Detail
          </span>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        {/* Brand & Category */}
        <div className="flex items-center justify-between gap-1 text-slate-400 text-xs mb-1">
          <span className="font-semibold text-[#014DE6] uppercase tracking-wider text-[11px] truncate">
            {product.brand}
          </span>
          <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 shrink-0">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3
          onClick={() => setSelectedProduct(product)}
          className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-[#014DE6] cursor-pointer transition-colors mb-2 min-h-[2.5rem]"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Rating & Sales */}
        <div className="flex items-center gap-2 mb-2 text-xs text-slate-600">
          <div className="flex items-center text-amber-500 font-semibold gap-0.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 text-[11px]">
            {product.salesCount > 0 ? `${product.salesCount}+ terjual` : 'Produk Baru'}
          </span>
        </div>

        {/* Price Section */}
        <div className="mt-auto pt-2 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-[#014DE6] font-bold text-base sm:text-lg">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
            {product.originalPrice && (
              <span className="text-slate-400 text-xs line-through">
                Rp {product.originalPrice.toLocaleString('id-ID')}
              </span>
            )}
          </div>

          {/* Wholesale Tier Highlight */}
          {product.wholesalePrice && (
            <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
              <Tag className="w-3 h-3 text-emerald-600" />
              <span>
                Grosir: <strong>Rp {product.wholesalePrice.toLocaleString('id-ID')}</strong> (min{' '}
                {product.minWholesaleQty || 6} pcs)
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-1.5 mt-3 pt-1">
          {/* Beli Sekarang (Direct Add to Cart & Open Drawer) */}
          <button
            onClick={() => addToCart(product, 1)}
            className="flex items-center justify-center gap-1.5 bg-[#014DE6] hover:bg-blue-700 text-white font-semibold text-xs py-2 px-2 rounded-xl shadow-xs transition-colors active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Beli Sekarang</span>
          </button>

          {/* WhatsApp Direct */}
          <button
            onClick={() => openProductWhatsApp(product)}
            className="flex items-center justify-center gap-1.5 bg-[#E8F8EE] hover:bg-[#d5f3df] text-[#1E7E34] border border-[#25D366]/40 font-semibold text-xs py-2 px-2 rounded-xl transition-colors active:scale-95"
            title="Tanya Stok via WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-[#25D366] text-[#25D366]" />
            <span>Chat WA</span>
          </button>
        </div>
      </div>
    </div>
  );
};
