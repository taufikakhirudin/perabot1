import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  ShieldCheck,
  CheckCircle2,
  Package,
  Truck,
  Boxes,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Award,
  Clock,
  ThumbsUp,
  HeartHandshake,
  Star,
  ExternalLink,
  ChevronRight,
  Store,
  Layers,
  MapPin,
  Flame,
} from 'lucide-react';
import heroImage from '../assets/images/rizqal_hero_showcase_1788669226585.jpg';

export const HomeView: React.FC = () => {
  const {
    products,
    categories,
    setActivePage,
    setSelectedCategory,
    openWhatsAppChat,
    testimonials,
    settings,
  } = useStore();

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  const trustAdvantages = [
    {
      number: '1',
      title: 'LENGKAP 1 TEMPAT',
      desc: 'Dari perabot dapur, box penyimpanan, sampai alat kebersihan tersedia dalam satu tempat.',
      icon: Layers,
    },
    {
      number: '2',
      title: '100% ORIGINAL',
      desc: 'Produk berkualitas dari brand terpercaya, bukan barang KW atau daur ulang rapuh.',
      icon: ShieldCheck,
    },
    {
      number: '3',
      title: 'STOK SELALU READY',
      desc: 'Produk fast moving selalu kami usahakan tersedia untuk kebutuhan harian & grosir.',
      icon: CheckCircle2,
    },
    {
      number: '4',
      title: 'BELI BANYAK LEBIH HEMAT',
      desc: 'Tersedia pembelian ecer maupun grosir dengan potongan harga bertingkat.',
      icon: Boxes,
    },
    {
      number: '5',
      title: 'ADMIN FAST RESPON',
      desc: 'Siap membantu konsultasi ukuran, fungsi, dan kebutuhan produk dengan ramah.',
      icon: MessageCircle,
    },
    {
      number: '6',
      title: 'PACKING AMAN & RAPI',
      desc: 'Produk dikemas dengan bubble wrap tebal dan kardus agar barang tiba mulus.',
      icon: Package,
    },
    {
      number: '7',
      title: 'KIRIM CEPAT DARI DEPOK',
      desc: 'Melayani pengiriman instan ke Jabodetabek dan kargo hemat ke seluruh Indonesia.',
      icon: Truck,
    },
    {
      number: '8',
      title: 'AMANAH & BERKAH',
      desc: 'Menjual sesuai deskripsi dengan pelayanan yang jujur, amanah, dan membawa berkah.',
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 font-sans">
      {/* SECTION 3 — HERO */}
      <section className="relative overflow-hidden pt-6 sm:pt-10 pb-12 sm:pb-16 bg-gradient-to-b from-blue-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Text Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Tagline Pill */}
              <div className="inline-flex items-center gap-2 bg-blue-100/80 border border-blue-200/80 text-[#014DE6] text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#014DE6]" />
                <span>Pusat Perabot & Alat Kebersihan Terpercaya Depok</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Perabot & Alat Kebersihan Lengkap,{' '}
                <span className="text-[#014DE6] block sm:inline">
                  Harga Bersahabat, Kualitas Mantap!
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Temukan berbagai kebutuhan rumah tangga dan alat kebersihan berkualitas,
                original, harga bersahabat, dan siap dikirim dari Bojongsari, Depok ke seluruh
                Indonesia.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => {
                    setActivePage('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#014DE6] hover:bg-blue-700 text-white font-bold py-3.5 px-7 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base"
                >
                  <span>BELANJA SEKARANG</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() =>
                    openWhatsAppChat(
                      'Halo RIZQAL BAROKAH, saya ingin bertanya tentang perabot dan alat kebersihan.'
                    )
                  }
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-7 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                  <span>CHAT WHATSAPP</span>
                </button>
              </div>

              {/* Trust Badges Row */}
              <div className="pt-4 border-t border-slate-200/80">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-5 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>✓ 100% Original</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-[#014DE6]" />
                    <span>✓ Stok Ready</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>✓ Packing Aman</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-slate-600" />
                    <span>✓ Kirim Cepat</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    <span>✓ Bisa Grosir</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Product Showcase Box */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src={heroImage}
                    alt="Koleksi Perabot & Alat Kebersihan RIZQAL BAROKAH"
                    className="w-full h-auto object-cover transform hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="bg-[#014DE6] text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md mb-1 inline-block">
                      Showroom Bojongsari, Depok
                    </span>
                    <p className="font-bold text-sm sm:text-base drop-shadow-sm">
                      Perabot Rumah Tangga, Alat Pel, Ember, dan Storage Box Lengkap
                    </p>
                  </div>
                </div>

                {/* Floating Micro Badge: Fast Moving */}
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce duration-1000">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <span className="text-[11px] text-slate-400 block font-medium">
                      Pengiriman Setiap Hari
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      Bisa Sameday / Instant
                    </span>
                  </div>
                </div>

                {/* Floating Micro Badge: Rating */}
                <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 bg-white rounded-2xl p-3 shadow-xl border border-slate-100 flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-extrabold text-slate-800">4.9 / 5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — TRUST SECTION ("Mengapa Belanja di RIZQAL BAROKAH?") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-[#014DE6] tracking-widest uppercase mb-2 block">
            KEUNGGULAN UTAMA
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Mengapa Belanja di RIZQAL BAROKAH?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Komitmen kami menghadirkan kemudahan, kepuasan, dan keberkahan dalam setiap
            kebutuhan perabot dan kebersihan rumah tangga Anda.
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustAdvantages.map((adv) => {
            const IconComp = adv.icon;
            return (
              <div
                key={adv.number}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#014DE6] group-hover:bg-[#014DE6] group-hover:text-white transition-colors flex items-center justify-center">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-200 group-hover:text-blue-200 transition-colors">
                      0{adv.number}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2 group-hover:text-[#014DE6] transition-colors">
                    {adv.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{adv.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 9 — KATEGORI PRODUK ("Temukan Kebutuhan Rumah Anda") */}
      <section className="bg-slate-50/80 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-extrabold text-[#014DE6] tracking-widest uppercase mb-1.5 block">
                PILIHAN KATEGORI
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Temukan Kebutuhan Rumah Anda
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Pilih kategori perabot dan alat kebersihan sesuai kebutuhan ruangan Anda.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedCategory(null);
                setActivePage('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#014DE6] hover:text-blue-700 group"
            >
              <span>Lihat Semua Katalog</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setActivePage('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#014DE6] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-semibold bg-[#014DE6] text-white px-2 py-0.5 rounded-full inline-block mb-1">
                      {cat.itemCount || 15}+ Produk
                    </span>
                    <h3 className="font-bold text-base leading-tight text-white drop-shadow-sm">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {cat.description}
                  </p>
                  <button className="w-full text-center bg-slate-50 group-hover:bg-[#014DE6] text-slate-700 group-hover:text-white font-semibold text-xs py-2 rounded-xl transition-colors border border-slate-200 group-hover:border-[#014DE6] flex items-center justify-center gap-1">
                    <span>Lihat Produk</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — PRODUK UNGGULAN ("Produk Pilihan RIZQAL BAROKAH") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full mb-2">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>REKOMENDASI TERBAIK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Produk Pilihan RIZQAL BAROKAH
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Koleksi terlaris dengan ulasan terbaik dari pelanggan rumah tangga dan pengadaan.
            </p>
          </div>

          <button
            onClick={() => {
              setActivePage('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#014DE6] hover:text-blue-700"
          >
            <span>Semua Produk ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Column Desktop Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Wholesale & B2B Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-r from-[#014DE6] to-[#0A2540] rounded-3xl p-6 sm:p-10 text-white overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="bg-amber-400 text-slate-900 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              Khusus Grosir & Pengadaan Instansi
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
              Butuh Pengadaan Barang dalam Jumlah Banyak?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Kami melayani pengadaan sekolah, kantor, rumah sakit, restoran, kos-kosan, dan
              toko retail dengan harga grosir langsung, faktur resmi, dan opsi pengantaran
              langsung ke lokasi.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setActivePage('wholesale');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white hover:bg-slate-100 text-[#014DE6] font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-colors"
              >
                Minta Penawaran Grosir
              </button>

              <button
                onClick={() =>
                  openWhatsAppChat(
                    'Halo RIZQAL BAROKAH, saya ingin berkonsultasi mengenai pengadaan alat kebersihan / perabot untuk instansi/usaha.'
                  )
                }
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Chat Admin Grosir</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 18 — SOCIAL PROOF ("Kenapa Pelanggan Memilih RIZQAL BAROKAH?") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-[#014DE6] tracking-widest uppercase mb-2 block">
            TESTIMONI ASLI PELANGGAN
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kenapa Pelanggan Memilih RIZQAL BAROKAH?
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Kepuasan pelanggan di Depok dan berbagai kota di Indonesia adalah bukti komitmen
            amanah kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{test.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{test.name}</h4>
                  <p className="text-[11px] text-slate-500">
                    {test.role} • {test.city}
                  </p>
                </div>
                {test.productPurchased && (
                  <span className="text-[10px] bg-blue-50 text-[#014DE6] px-2 py-0.5 rounded font-medium max-w-[120px] truncate">
                    {test.productPurchased}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 19 — MARKETPLACE ("Belanja di Marketplace Favorit Anda") */}
      <section className="bg-slate-50 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div>
            <span className="text-xs font-extrabold text-[#014DE6] tracking-wider uppercase block mb-1">
              OFFICIAL STORE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Belanja di Marketplace Favorit Anda
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Tersedia juga di toko marketplace resmi kami untuk kenyamanan transaksi Anda.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={settings.shopeeUrl || 'https://shopee.co.id'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-white hover:bg-orange-50 text-slate-800 hover:text-orange-600 border border-slate-200 hover:border-orange-300 px-5 py-3 rounded-2xl shadow-xs transition-all text-xs font-bold"
            >
              <div className="w-6 h-6 rounded-md bg-[#EE4D2D] text-white flex items-center justify-center font-black text-xs">
                S
              </div>
              <span>Shopee Official</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href={settings.tokopediaUrl || 'https://tokopedia.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-600 border border-slate-200 hover:border-emerald-300 px-5 py-3 rounded-2xl shadow-xs transition-all text-xs font-bold"
            >
              <div className="w-6 h-6 rounded-md bg-[#03AC0E] text-white flex items-center justify-center font-black text-xs">
                T
              </div>
              <span>Tokopedia Official</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href={settings.tiktokShopUrl || 'https://tiktok.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 px-5 py-3 rounded-2xl shadow-xs transition-all text-xs font-bold"
            >
              <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center font-black text-xs">
                TT
              </div>
              <span>TikTok Shop</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <a
              href={settings.lazadaUrl || 'https://lazada.co.id'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-white hover:bg-blue-50 text-slate-800 hover:text-blue-600 border border-slate-200 hover:border-blue-300 px-5 py-3 rounded-2xl shadow-xs transition-all text-xs font-bold"
            >
              <div className="w-6 h-6 rounded-md bg-[#0F146D] text-white flex items-center justify-center font-black text-xs">
                L
              </div>
              <span>Lazada Official</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      </section>

      {/* SEO Information & Local Business Context */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Toko Perabot Rumah Tangga & Alat Kebersihan Terlengkap di Depok
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Melayani pengiriman seluruh wilayah Jabodetabek, Jawa Barat, dan se-Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 leading-relaxed">
            <p>
              Sedang mencari toko perabot rumah tangga murah di Depok atau grosir alat
              kebersihan Bojongsari yang terpercaya? <strong>RIZQAL BAROKAH</strong> hadir
              sejak tahun 2021 sebagai solusi satu pintu untuk semua kebutuhan rumah Anda.
              Kami menyediakan aneka alat pel otomatis, sapu nilon anti-rontok, ember tebal
              anti-pecah, tempat sampah pedal injak, container box roda, rak piring tertutup,
              hingga jemuran baju aluminium.
            </p>
            <p>
              Dengan mengusung tagline <em>"Harga Bersahabat, Kualitas Mantap"</em>, kami
              memastikan setiap barang yang Anda beli adalah 100% original dari pabrik ternama
              (Lion Star, Nagata, Maspion, Bolde, Claris, Shinpo, Green Leaf). Kunjungi toko
              fisik kami di <strong>Jalan Rambutan No. 21 RT 2 RW 1, Bojongsari, Depok</strong>{' '}
              atau pesan online langsung via WhatsApp untuk respon cepat dan pengiriman aman.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
