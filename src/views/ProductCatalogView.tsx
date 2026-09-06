import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  Check,
  ChevronDown,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

export const ProductCatalogView: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('terlaris');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique brands from products
  const brands = useMemo(() => {
    const list = new Set<string>();
    products.forEach((p) => {
      if (p.brand) {
        p.brand.split('/').forEach((b) => list.add(b.trim()));
      }
    });
    return Array.from(list);
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search query match
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchBrand = product.brand.toLowerCase().includes(query);
          const matchCategory = product.category.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          if (!matchName && !matchBrand && !matchCategory && !matchDesc) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory && selectedCategory !== 'Semua') {
          if (
            product.category.toLowerCase() !== selectedCategory.toLowerCase() &&
            product.subcategory?.toLowerCase() !== selectedCategory.toLowerCase()
          ) {
            return false;
          }
        }

        // Brand filter
        if (selectedBrand !== 'all') {
          if (!product.brand.toLowerCase().includes(selectedBrand.toLowerCase())) {
            return false;
          }
        }

        // Availability filter
        if (selectedAvailability === 'ready' && product.status !== 'READY') {
          return false;
        }
        if (selectedAvailability === 'grosir' && !product.wholesalePrice) {
          return false;
        }

        // Price range filter
        if (selectedPriceRange === 'under50') {
          return product.price < 50000;
        } else if (selectedPriceRange === '50to100') {
          return product.price >= 50000 && product.price <= 100000;
        } else if (selectedPriceRange === 'above100') {
          return product.price > 100000;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'termurah') return a.price - b.price;
        if (sortBy === 'termahal') return b.price - a.price;
        if (sortBy === 'terlaris') return b.salesCount - a.salesCount;
        if (sortBy === 'terbaru') return b.id.localeCompare(a.id);
        return 0;
      });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedAvailability,
    selectedPriceRange,
    sortBy,
  ]);

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand('all');
    setSelectedPriceRange('all');
    setSelectedAvailability('all');
    setSearchQuery('');
    setSortBy('terlaris');
  };

  const hasActiveFilters =
    selectedCategory ||
    selectedBrand !== 'all' ||
    selectedPriceRange !== 'all' ||
    selectedAvailability !== 'all' ||
    searchQuery;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#014DE6] to-blue-700 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-200">
            Katalog Resmi RIZQAL BAROKAH
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Katalog Perabot & Alat Kebersihan Lengkap
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
            Menyediakan lebih dari ratusan perabot rumah tangga, perlengkapan dapur, ember,
            pel putar, dan box storage original harga bersahabat dengan stok ready dari Depok.
          </p>
        </div>
      </div>

      {/* Search & Top Action Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        {/* Search Bar */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Cari produk, misalnya: sapu, ember, box, rak..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#014DE6] focus:bg-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls & Sort */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#014DE6]"></span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium hidden sm:inline">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#014DE6] cursor-pointer"
            >
              <option value="terlaris">Produk Terlaris</option>
              <option value="termurah">Harga Termurah</option>
              <option value="termahal">Harga Tertinggi</option>
              <option value="terbaru">Produk Terbaru</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filter */}
        <aside className="hidden lg:block space-y-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Filter className="w-4 h-4 text-[#014DE6]" />
              <span>Filter Produk</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#014DE6] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Categories Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Kategori
            </h4>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex justify-between items-center ${
                  !selectedCategory
                    ? 'bg-blue-50 text-[#014DE6] font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>Semua Kategori</span>
                <span>{products.length}</span>
              </button>
              {categories.map((cat) => {
                const count = products.filter((p) => p.category === cat.name).length;
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex justify-between items-center ${
                      isSelected
                        ? 'bg-blue-50 text-[#014DE6] font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate pr-2">{cat.name}</span>
                    <span className="text-[11px] text-slate-400">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Rentang Harga
            </h4>
            <div className="space-y-1.5 text-xs text-slate-700">
              {[
                { id: 'all', label: 'Semua Harga' },
                { id: 'under50', label: 'Di bawah Rp 50.000' },
                { id: '50to100', label: 'Rp 50.000 - Rp 100.000' },
                { id: 'above100', label: 'Di atas Rp 100.000' },
              ].map((range) => (
                <label
                  key={range.id}
                  className="flex items-center gap-2 cursor-pointer hover:text-[#014DE6]"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    value={range.id}
                    checked={selectedPriceRange === range.id}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="text-[#014DE6] focus:ring-[#014DE6]"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Brand / Merk
            </h4>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-slate-800 font-medium"
            >
              <option value="all">Semua Brand</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Ketersediaan & Grosir
            </h4>
            <div className="space-y-1.5 text-xs text-slate-700">
              {[
                { id: 'all', label: 'Semua Produk' },
                { id: 'ready', label: 'Stok Ready' },
                { id: 'grosir', label: 'Tersedia Harga Grosir' },
              ].map((av) => (
                <label
                  key={av.id}
                  className="flex items-center gap-2 cursor-pointer hover:text-[#014DE6]"
                >
                  <input
                    type="radio"
                    name="availability"
                    value={av.id}
                    checked={selectedAvailability === av.id}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="text-[#014DE6] focus:ring-[#014DE6]"
                  />
                  <span>{av.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* Active filter chips & results count */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 pb-2">
            <span>
              Menampilkan <strong>{filteredProducts.length}</strong> produk ditemukan
            </span>

            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-[#014DE6] px-2 py-0.5 rounded-full font-medium text-[11px]">
                    {selectedCategory}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setSelectedCategory(null)}
                    />
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full font-medium text-[11px]">
                    "{searchQuery}"
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setSearchQuery('')}
                    />
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-[#014DE6] font-semibold hover:underline text-[11px]"
                >
                  Hapus Semua Filter
                </button>
              </div>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-slate-800">
                Produk Tidak Ditemukan
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Maaf, tidak ada produk yang sesuai dengan kata kunci atau filter yang Anda
                pilih. Coba gunakan kata kunci lain seperti <em>"sapu"</em>, <em>"ember"</em>,
                atau <em>"mop"</em>.
              </p>
              <button
                onClick={resetFilters}
                className="bg-[#014DE6] hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition-colors"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
          <div className="bg-white w-80 h-full p-5 overflow-y-auto space-y-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-bold text-base text-slate-900">Filter Produk</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="py-4 border-b border-slate-100 space-y-2">
                <span className="text-xs font-bold text-slate-900 block">Kategori</span>
                <select
                  value={selectedCategory || 'all'}
                  onChange={(e) =>
                    setSelectedCategory(
                      e.target.value === 'all' ? null : e.target.value
                    )
                  }
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                >
                  <option value="all">Semua Kategori</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="py-4 border-b border-slate-100 space-y-2 text-xs">
                <span className="font-bold text-slate-900 block">Rentang Harga</span>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                >
                  <option value="all">Semua Harga</option>
                  <option value="under50">Di bawah Rp 50.000</option>
                  <option value="50to100">Rp 50.000 - Rp 100.000</option>
                  <option value="above100">Di atas Rp 100.000</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#014DE6] text-white font-bold text-xs py-3 rounded-xl shadow-md"
              >
                Terapkan Filter ({filteredProducts.length} Produk)
              </button>
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full text-slate-600 font-semibold text-xs py-2"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
