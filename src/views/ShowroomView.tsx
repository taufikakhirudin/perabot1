import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  MapPin,
  Clock,
  Car,
  CheckCircle2,
  Phone,
  MessageCircle,
  ExternalLink,
  Navigation,
  ShieldCheck,
  CreditCard,
  ShoppingBag,
} from 'lucide-react';
import heroImage from '../assets/images/rizqal_hero_showcase_1788669226585.jpg';

export const ShowroomView: React.FC = () => {
  const { settings, openWhatsAppChat } = useStore();

  const facilities = [
    {
      title: 'Cek Fisik & Kualitas Langsung',
      desc: 'Bisa pegang, coba spin mop, dan tes ketebalan plastik ember sebelum membeli.',
      icon: CheckCircle2,
    },
    {
      title: 'Parkir Nyaman & Akses Mudah',
      desc: 'Tersedia tempat parkir aman untuk kendaraan motor maupun mobil roda empat.',
      icon: Car,
    },
    {
      title: 'Pembayaran Lengkap (Cash & QRIS)',
      desc: 'Melayani pembayaran tunai, transfer bank BCA/Mandiri, serta QRIS semua e-wallet.',
      icon: CreditCard,
    },
    {
      title: 'Bantu Muat ke Kendaraan',
      desc: 'Staf toko kami dengan senang hati membantu menaikkan barang belanjaan Anda ke bagasi mobil atau motor.',
      icon: ShoppingBag,
    },
  ];

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Jalan Rambutan No. 21 RT 2 RW 1, Bojongsari, Depok, Jawa Barat'
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 font-sans">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#014DE6] to-[#0A2540] rounded-3xl p-6 sm:p-12 text-white shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="bg-amber-400 text-slate-950 font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Toko Fisik & Gudang Resmi
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Kunjungi Showroom RIZQAL BAROKAH di Bojongsari, Depok
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Ingin melihat dan memilih perabot secara langsung? Pintu toko kami selalu terbuka
            hangat menyambut Anda setiap hari dari pukul 08.00 sampai 19.00 WIB.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-slate-100 text-[#014DE6] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-colors flex items-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Buka di Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <button
              onClick={() =>
                openWhatsAppChat(
                  'Halo RIZQAL BAROKAH, saya ingin menanyakan patokan jalan menuju toko di Bojongsari, Depok.'
                )
              }
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Tanya Patokan Jalan (WA)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Showroom Details & Photo Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Info Card */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2 pb-4 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Informasi Showroom</h2>
            <p className="text-xs text-slate-500">
              Pusat display perabot rumah tangga, wadah plastik, dan alat kebersihan lengkap.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#014DE6] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Alamat Lengkap</span>
                <p className="text-slate-600 mt-0.5 leading-relaxed">{settings.address}</p>
                <span className="text-[11px] text-blue-600 font-medium block mt-1">
                  Patokan: Area Bojongsari, dekat jalan utama dan mudah diakses mobil/truk kecil.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Jam Operasional</span>
                <p className="text-slate-600 mt-0.5">{settings.operatingHours}</p>
                <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">
                  Buka Setiap Hari (Termasuk Sabtu & Minggu)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Telepon & WhatsApp Toko</span>
                <p className="text-slate-600 mt-0.5">{settings.whatsapp}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#014DE6] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-xs transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>Petunjuk Arah Google Maps</span>
            </a>
          </div>
        </div>

        {/* Right: Showroom Visual Photo & Ambience */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 aspect-16/10 relative">
            <img
              src={heroImage}
              alt="Display Perabot RIZQAL BAROKAH Bojongsari Depok"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-bold bg-[#014DE6] px-2 py-0.5 rounded uppercase">
                Gudang & Display Depok
              </span>
              <h3 className="text-base sm:text-lg font-bold mt-1">
                Display Rapi, Bersih, dan Terorganisir
              </h3>
              <p className="text-xs text-slate-200">
                Memudahkan Anda memilih berbagai varian warna dan ukuran secara langsung.
              </p>
            </div>
          </div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {facilities.map((fac, i) => {
              const Icon = fac.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#014DE6] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{fac.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      {fac.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Embedded Map Section */}
      <section className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Peta Lokasi Google Maps
            </h3>
            <p className="text-xs text-slate-500">
              Bojongsari, Depok, Jawa Barat — Siap dikunjungi kapan saja.
            </p>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#014DE6] hover:underline inline-flex items-center gap-1"
          >
            <span>Buka di Aplikasi Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Responsive Map Embed Container */}
        <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-300 shadow-xs relative bg-slate-200">
          <iframe
            title="Google Maps RIZQAL BAROKAH"
            src="https://maps.google.com/maps?q=Bojongsari%20Depok%20Jalan%20Rambutan&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};
