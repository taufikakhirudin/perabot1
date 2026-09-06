import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Star,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Package,
  RotateCcw,
  MessageCircle,
  ShoppingCart,
  Tag,
  Share2,
  Info,
  Check,
} from 'lucide-react';

export const ProductModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    openProductWhatsApp,
    products,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedProduct) return null;

  // Initialize selected color if not set
  const currentColor =
    selectedColor ||
    (selectedProduct.colors.length > 0 ? selectedProduct.colors[0] : 'Standar');

  const allImages = [
    selectedProduct.mainImage,
    ...(selectedProduct.galleryImages || []),
  ].filter(Boolean);

  const discountPercent = selectedProduct.originalPrice
    ? Math.round(
        ((selectedProduct.originalPrice - selectedProduct.price) /
          selectedProduct.originalPrice) *
          100
      )
    : 0;

  const isWholesaleActive =
    selectedProduct.wholesalePrice &&
    selectedProduct.minWholesaleQty &&
    quantity >= selectedProduct.minWholesaleQty;

  const unitPrice = isWholesaleActive
    ? selectedProduct.wholesalePrice!
    : selectedProduct.price;
  const totalPrice = unitPrice * quantity;

  // Related products from same category
  const relatedProducts = products
    .filter(
      (p) => p.id !== selectedProduct.id && p.category === selectedProduct.category
    )
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar with close */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {selectedProduct.category}
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs text-slate-700 font-medium truncate max-w-[200px] sm:max-w-xs">
              {selectedProduct.brand}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-[#014DE6] hover:bg-white rounded-full transition-colors relative"
              title="Salin Tautan Produk"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              {copiedLink && (
                <span className="absolute right-0 top-10 bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow whitespace-nowrap">
                  Link tersalin!
                </span>
              )}
            </button>
            <button
              onClick={() => setSelectedProduct(null)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white rounded-full transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Left: Image Gallery */}
            <div className="flex flex-col gap-3">
              {/* Main Photo Box */}
              <div className="relative aspect-square bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-4">
                <img
                  src={allImages[activeImageIndex] || selectedProduct.mainImage}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain"
                />

                {/* Badges on main image */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    STOK READY
                  </span>
                  <span className="inline-flex items-center gap-1 bg-[#014DE6] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    100% ORIGINAL
                  </span>
                  {discountPercent > 0 && (
                    <span className="bg-amber-500 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-xs">
                      DISKON {discountPercent}%
                    </span>
                  )}
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl border-2 overflow-hidden bg-slate-50 shrink-0 p-1 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#014DE6] ring-2 ring-blue-200'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumb ${idx}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust badges below photo */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-slate-600">
                <div className="bg-blue-50/80 p-2.5 rounded-xl border border-blue-100 flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-[#014DE6] mb-1" />
                  <span className="font-semibold text-slate-800">Garansi Original</span>
                  <span className="text-[10px] text-slate-500">Bukan Barang KW</span>
                </div>
                <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-100 flex flex-col items-center">
                  <Package className="w-4 h-4 text-emerald-600 mb-1" />
                  <span className="font-semibold text-slate-800">Packing Ekstra</span>
                  <span className="text-[10px] text-slate-500">Bubble + Kardus</span>
                </div>
                <div className="bg-slate-100/80 p-2.5 rounded-xl border border-slate-200 flex flex-col items-center">
                  <Truck className="w-4 h-4 text-slate-700 mb-1" />
                  <span className="font-semibold text-slate-800">Kirim Cepat</span>
                  <span className="text-[10px] text-slate-500">Dari Depok</span>
                </div>
              </div>
            </div>

            {/* Right: Product Information */}
            <div className="flex flex-col">
              {/* Brand & SKU */}
              <div className="flex items-center justify-between gap-2 text-xs mb-1">
                <span className="font-bold text-[#014DE6] uppercase tracking-wide">
                  Brand: {selectedProduct.brand}
                </span>
                <span className="text-slate-400 font-mono text-[11px]">
                  SKU: {selectedProduct.sku}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight mb-2">
                {selectedProduct.name}
              </h1>

              {/* Rating & Sold count */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-semibold bg-amber-50 px-2 py-0.5 rounded-md">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{selectedProduct.rating.toFixed(1)}</span>
                </div>
                <span className="text-slate-500">
                  {selectedProduct.salesCount} Terjual
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 font-medium">
                  Stok Tersedia: {selectedProduct.stock} pcs
                </span>
              </div>

              {/* Price Box */}
              <div className="my-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#014DE6]">
                    Rp {unitPrice.toLocaleString('id-ID')}
                  </span>
                  {selectedProduct.originalPrice && !isWholesaleActive && (
                    <span className="text-sm text-slate-400 line-through">
                      Rp {selectedProduct.originalPrice.toLocaleString('id-ID')}
                    </span>
                  )}
                  {isWholesaleActive && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      HARGA GROSIR AKTIF!
                    </span>
                  )}
                </div>

                {/* Wholesale Price Info Tier */}
                {selectedProduct.wholesalePrice && (
                  <div className="mt-2.5 pt-2 border-t border-blue-200/60 flex items-center gap-2 text-xs text-slate-700">
                    <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Harga Grosir:{' '}
                      <strong className="text-emerald-700 font-bold">
                        Rp {selectedProduct.wholesalePrice.toLocaleString('id-ID')}
                      </strong>{' '}
                      / pcs (Minimal pembelian{' '}
                      <span className="font-semibold text-slate-900">
                        {selectedProduct.minWholesaleQty || 6} pcs
                      </span>
                      )
                    </span>
                  </div>
                )}
              </div>

              {/* Color / Variant Selection */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                    Pilihan Warna / Varian:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`text-xs px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                          currentColor === color
                            ? 'bg-[#014DE6] text-white shadow-xs font-semibold'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Subtotal */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-700">Jumlah:</span>
                  <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-xs">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm font-bold text-slate-900 min-w-[32px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity((q) => Math.min(selectedProduct.stock, q + 1))
                      }
                      className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">Subtotal:</span>
                  <span className="text-base font-extrabold text-[#014DE6]">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => {
                    addToCart(selectedProduct, quantity, currentColor);
                    setSelectedProduct(null);
                  }}
                  className="flex items-center justify-center gap-2 bg-[#014DE6] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-transform active:scale-98 text-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>BELI SEKARANG</span>
                </button>

                <button
                  onClick={() => openProductWhatsApp(selectedProduct)}
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-transform active:scale-98 text-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>CHAT ADMIN WA</span>
                </button>
              </div>

              {/* "Produk ini cocok untuk..." */}
              {selectedProduct.suitableFor && selectedProduct.suitableFor.length > 0 && (
                <div className="mt-2 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
                  <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs mb-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-600" />
                    <span>Produk ini sangat cocok untuk:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.suitableFor.map((item, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-white text-amber-900 border border-amber-200 px-2 py-0.5 rounded-md font-medium"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Specifications & Description */}
          <div className="border-t border-slate-200 pt-6 space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">
                Deskripsi Produk
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {selectedProduct.description}
              </p>
            </div>

            {/* Specifications Grid */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                Spesifikasi & Detail Ukuran
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-200/80">
                  <span className="text-slate-500">Material:</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {selectedProduct.material}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200/80">
                  <span className="text-slate-500">Dimensi / Ukuran:</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {selectedProduct.dimensions}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200/80">
                  <span className="text-slate-500">Berat Pengiriman:</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {selectedProduct.weight} gram
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200/80">
                  <span className="text-slate-500">Kondisi:</span>
                  <span className="font-semibold text-emerald-700 text-right">
                    100% Baru & Original
                  </span>
                </div>
              </div>

              {/* Bullet points */}
              {selectedProduct.specifications &&
                selectedProduct.specifications.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <span className="text-xs font-bold text-slate-800 block mb-2">
                      Keunggulan & Fitur:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {selectedProduct.specifications.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* Shipping & Packing Information */}
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex flex-col sm:flex-row items-start gap-3">
              <Truck className="w-6 h-6 text-[#014DE6] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">
                  Informasi Pengiriman & Packing Aman
                </span>
                <p className="leading-relaxed text-slate-600">
                  Dikirim langsung dari gudang toko RIZQAL BAROKAH di Bojongsari, Depok.
                  Semua pengiriman dilapisi <strong>Bubble Wrap tebal</strong> dan kardus
                  pelindung. Mendukung kurir Instant/Sameday untuk Jabodetabek dan ekspedisi
                  kargo ke seluruh Indonesia.
                </p>
              </div>
            </div>

            {/* Related Products Recommendation */}
            {relatedProducts.length > 0 && (
              <div className="pt-4">
                <h3 className="text-base font-bold text-slate-900 mb-3">
                  Rekomendasi Produk Terkait
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {relatedProducts.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => {
                        setSelectedProduct(rel);
                        setActiveImageIndex(0);
                        setQuantity(1);
                      }}
                      className="group p-2.5 rounded-xl border border-slate-200 hover:border-[#014DE6] bg-white cursor-pointer transition-all shadow-2xs hover:shadow-md"
                    >
                      <div className="w-full aspect-square bg-slate-50 rounded-lg overflow-hidden mb-2 p-1">
                        <img
                          src={rel.mainImage}
                          alt={rel.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] text-[#014DE6] font-bold block truncate">
                        {rel.brand}
                      </span>
                      <h4 className="text-xs font-medium text-slate-800 line-clamp-1 group-hover:text-[#014DE6]">
                        {rel.name}
                      </h4>
                      <span className="text-xs font-bold text-slate-900 mt-1 block">
                        Rp {rel.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
