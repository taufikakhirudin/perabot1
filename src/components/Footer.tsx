import React from 'react';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Share2,
  ShieldCheck,
  Truck,
  HeartHandshake,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { ActivePage } from '../types';

export const Footer: React.FC = () => {
  const { setActivePage, settings, openWhatsAppChat } = useStore();

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07132B] text-slate-300 pt-14 pb-8 border-t border-blue-900/40 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block">100% Produk Original</span>
              <span className="text-slate-400 text-[11px]">Brand terpercaya anti KW</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block">Kirim Cepat dari Depok</span>
              <span className="text-slate-400 text-[11px]">Jabodetabek & Seluruh RI</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block">Amanah & Berkah</span>
              <span className="text-slate-400 text-[11px]">Pelayanan jujur & transparan</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block">Harga Bersahabat</span>
              <span className="text-slate-400 text-[11px]">Eceran & grosir hemat</span>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Col 1: Brand Info & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div
              className="cursor-pointer inline-block"
              onClick={() => handleNav('home')}
            >
              <Logo variant="badge" size="lg" />
            </div>

            <p className="text-sm text-slate-300 font-medium italic">
              "{settings.tagline}"
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Toko perabot rumah tangga dan alat kebersihan yang lengkap, original, harga
              bersahabat, stok ready, pelayanan amanah, packing aman, dan pengiriman cepat
              dari Bojongsari, Depok ke seluruh Indonesia.
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-200 block mb-2">
                Ikuti Media Sosial Kami:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`https://instagram.com/${settings.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs bg-slate-800/80 hover:bg-pink-600/30 hover:text-pink-300 text-slate-300 px-3 py-1.5 rounded-lg transition-colors border border-slate-700"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>@{settings.instagram}</span>
                </a>
                <a
                  href={`https://tiktok.com/@${settings.tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs bg-slate-800/80 hover:bg-cyan-600/30 hover:text-cyan-300 text-slate-300 px-3 py-1.5 rounded-lg transition-colors border border-slate-700"
                >
                  <span className="font-bold text-cyan-400">TikTok</span>
                  <span>@{settings.tiktok}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm tracking-wider uppercase">
              Menu Navigasi
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Beranda', page: 'home' as ActivePage },
                { label: 'Katalog Produk', page: 'products' as ActivePage },
                { label: 'Tentang Kami', page: 'about' as ActivePage },
                { label: 'Grosir & Pengadaan', page: 'wholesale' as ActivePage },
                { label: 'Program Reseller', page: 'reseller' as ActivePage },
                { label: 'Showroom Toko', page: 'showroom' as ActivePage },
                { label: 'Artikel & Tips', page: 'blog' as ActivePage },
                { label: 'Tanya Jawab (FAQ)', page: 'faq' as ActivePage },
                { label: 'Hubungi Kami', page: 'contact' as ActivePage },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => handleNav(link.page)}
                    className="hover:text-white transition-colors text-slate-400 hover:underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Kategori Utama */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm tracking-wider uppercase">
              Kategori Produk
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>Perabot Rumah Tangga</li>
              <li>Alat Kebersihan Lantai & Kaca</li>
              <li>Peralatan Dapur & Rak Piring</li>
              <li>Box & Storage Kontainer</li>
              <li>Perlengkapan Kamar Mandi</li>
              <li>Tempat Sampah & Sanitasi</li>
              <li>Paket Grosir Instansi</li>
              <li>Produk Best Seller</li>
            </ul>

            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-300 block mb-1">
                Marketplace Resmi:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {settings.shopeeUrl && (
                  <a
                    href={settings.shopeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-950/40 text-orange-300 border border-orange-800/40 px-2 py-0.5 rounded hover:bg-orange-900/50"
                  >
                    Shopee
                  </a>
                )}
                {settings.tokopediaUrl && (
                  <a
                    href={settings.tokopediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 px-2 py-0.5 rounded hover:bg-emerald-900/50"
                  >
                    Tokopedia
                  </a>
                )}
                {settings.tiktokShopUrl && (
                  <a
                    href={settings.tiktokShopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded hover:bg-slate-700"
                  >
                    TikTok Shop
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Col 4: Informasi Kontak & Showroom */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm tracking-wider uppercase">
              Kontak & Toko
            </h4>

            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <button
                  onClick={() => openWhatsAppChat()}
                  className="hover:text-emerald-400 transition-colors font-medium text-slate-300"
                >
                  WhatsApp: {settings.whatsapp}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.email}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Jam Buka: {settings.operatingHours}</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleNav('showroom')}
                  className="w-full text-center bg-[#014DE6] hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-xl transition-colors text-xs"
                >
                  Kunjungi Showroom Toko
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 RIZQAL BAROKAH. All Rights Reserved. Pemilik: {settings.ownerName}.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Bojongsari, Depok, Jawa Barat</span>
            <button
              onClick={() => handleNav('admin')}
              className="hover:text-slate-300 transition-colors"
            >
              CMS Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
