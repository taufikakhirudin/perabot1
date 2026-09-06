import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';
import {
  Search,
  ShoppingCart,
  MessageCircle,
  Menu,
  X,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  Settings,
} from 'lucide-react';
import { ActivePage } from '../types';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cartCount,
    setIsCartOpen,
    openWhatsAppChat,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    settings,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: ActivePage }[] = [
    { label: 'Beranda', page: 'home' },
    { label: 'Produk', page: 'products' },
    { label: 'Tentang Kami', page: 'about' },
    { label: 'Grosir', page: 'wholesale' },
    { label: 'Reseller', page: 'reseller' },
    { label: 'Showroom', page: 'showroom' },
    { label: 'Artikel', page: 'blog' },
    { label: 'Kontak', page: 'contact' },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setActivePage('products');
    setShowSearchModal(false);
  };

  return (
    <header className="w-full z-40 relative font-sans">
      {/* SECTION 1 — TOP BAR */}
      <div className="bg-[#0A1E4A] text-white text-xs py-2 px-4 border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 font-semibold text-blue-300">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              Depok:
            </span>
            <span className="text-slate-100 font-medium tracking-wide">
              {settings.topBarAnnouncement ||
                'Belanja Perabot & Alat Kebersihan Lengkap dari Depok • Kirim ke Seluruh Indonesia!'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-200">
            <div className="flex items-center gap-1.5 font-normal">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{settings.operatingHours || 'Senin - Minggu | 08.00 - 19.00 WIB'}</span>
            </div>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-[11px] text-blue-300 hover:text-white flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded transition-colors"
              title="Portal Admin CMS"
            >
              <Settings className="w-3 h-3" />
              <span>Admin CMS</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2 — NAVBAR (Sticky) */}
      <nav
        className={`sticky top-0 w-full transition-all duration-200 bg-white ${
          isScrolled
            ? 'shadow-md py-2.5 border-b border-slate-100'
            : 'shadow-sm py-3.5 border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo on the left */}
            <div
              className="cursor-pointer transition-transform hover:scale-[1.01]"
              onClick={() => handleNavClick('home')}
            >
              <Logo variant="inline" />
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = activePage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors relative whitespace-nowrap ${
                      isActive
                        ? 'text-[#014DE6] bg-blue-50 font-semibold'
                        : 'text-slate-700 hover:text-[#014DE6] hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#014DE6] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger Button */}
              <button
                onClick={() => setShowSearchModal(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-500 bg-slate-100 hover:bg-slate-200/80 rounded-full border border-slate-200 transition-colors w-40 md:w-48 lg:w-40 xl:w-56"
                title="Cari Produk"
              >
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">Cari sapu, ember, box...</span>
              </button>

              {/* Mobile Search Icon */}
              <button
                onClick={() => setShowSearchModal(true)}
                className="sm:hidden p-2 text-slate-700 hover:text-[#014DE6] hover:bg-slate-100 rounded-full transition-colors"
                title="Cari"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-700 hover:text-[#014DE6] hover:bg-slate-100 rounded-full transition-colors"
                title="Keranjang Belanja"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[19px] h-[19px] px-1 bg-[#014DE6] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* WhatsApp CTA Button */}
              <button
                onClick={() =>
                  openWhatsAppChat(
                    'Halo RIZQAL BAROKAH, saya ingin bertanya mengenai ketersediaan produk perabot & alat kebersihan.'
                  )
                }
                className="hidden sm:inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs md:text-sm font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-transform active:scale-95 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>WhatsApp</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:text-[#014DE6] hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
            {/* Mobile Search input */}
            <form onSubmit={handleSearchSubmit} className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari produk (sapu, ember, box, rak)..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#014DE6] focus:bg-white"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </form>

            <div className="grid grid-cols-2 gap-1 pt-1">
              {navLinks.map((link) => {
                const isActive = activePage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-[#014DE6] font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWhatsAppChat();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-2.5 rounded-lg text-sm shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Chat WhatsApp Admin (08998595979)</span>
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 rounded-lg text-xs"
              >
                <Settings className="w-3.5 h-3.5 text-slate-600" />
                <span>Buka Dashboard Admin CMS</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Global Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-4 border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#014DE6] font-bold text-sm">
                <Search className="w-4 h-4" />
                <span>Pencarian Produk RIZQAL BAROKAH</span>
              </div>
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-3">
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  placeholder="Cari produk, misalnya: sapu, ember, box, rak, mop..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full text-base bg-slate-50 border border-slate-300 rounded-xl pl-11 pr-24 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#014DE6] focus:bg-white"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-[#014DE6] hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  Cari
                </button>
              </div>
            </form>

            <div className="mt-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                Pencarian Populer:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Spin Mop 360',
                  'Ember 20 Liter',
                  'Storage Box 50L',
                  'Sapu Nilon Modern',
                  'Rak Piring Tertutup',
                  'Tempat Sampah Pedal',
                  'Jemuran Aluminium',
                  'Paket Pengadaan',
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setLocalSearch(tag);
                      setSearchQuery(tag);
                      setActivePage('products');
                      setShowSearchModal(false);
                    }}
                    className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-[#014DE6] text-slate-700 px-3 py-1.5 rounded-full transition-colors border border-slate-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
