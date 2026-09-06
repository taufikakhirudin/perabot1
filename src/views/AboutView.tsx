import React from 'react';
import { useStore } from '../context/StoreContext';
import { Logo } from '../components/Logo';
import {
  ShieldCheck,
  HeartHandshake,
  Target,
  Compass,
  MapPin,
  Clock,
  Phone,
  Mail,
  Award,
  CheckCircle,
  Building,
  Users,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import heroImage from '../assets/images/rizqal_hero_showcase_1788669226585.jpg';

export const AboutView: React.FC = () => {
  const { settings, openWhatsAppChat, setActivePage } = useStore();

  const milestones = [
    {
      year: '2021',
      title: 'Awal Perjalanan di Bojongsari Depok',
      desc: 'Didirikan oleh Fatwa Ismunandar dengan tekad menyediakan perabot rumah tangga berkualitas namun dengan harga yang tetap terjangkau untuk para ibu rumah tangga di lingkungan sekitar.',
    },
    {
      year: '2022',
      title: 'Ekspansi Alat Kebersihan & Sanitasi',
      desc: 'Menjawab tingginya permintaan sanitasi bersih, toko memperluas lini produk mencakup aneka spin mop, sapu nilon, ember industri, dan kotak penyimpanan multi-fungsi.',
    },
    {
      year: '2023',
      title: 'Kemitraan Grosir & Pengadaan Instansi',
      desc: 'Mulai dipercaya menyuplai kebutuhan perabot dan kebersihan untuk sekolah, perkantoran, rumah sakit swasta, restoran, kos-kosan, serta pengusaha laundry.',
    },
    {
      year: '2024 - Sekarang',
      title: 'Distribusi Nasional & Digitalisasi',
      desc: 'Mengembangkan sistem pemesanan online cepat via website dan WhatsApp resmi serta pengiriman kargo hemat ke seluruh pelosok Indonesia tanpa melupakan toko fisik di Depok.',
    },
  ];

  const missionPoints = [
    {
      number: '1',
      title: 'Menyediakan Produk Original Berkualitas',
      desc: 'Hanya menjual produk plastik bermutu dan alat kebersihan kuat dari brand ternama, bukan barang daur ulang yang mudah getas dan berbau.',
    },
    {
      number: '2',
      title: 'Memberikan Harga Bersahabat',
      desc: 'Memastikan margin yang adil dan jujur sehingga harga eceran maupun grosir selalu ramah di kantong keluarga dan pelaku usaha.',
    },
    {
      number: '3',
      title: 'Pelayanan Cepat, Tanggap & Ramah',
      desc: 'Admin dan staf yang siap membantu konsultasi ukuran produk, cek ongkos kirim, dan memproses order pada hari yang sama.',
    },
    {
      number: '4',
      title: 'Menjaga Amanah dalam Setiap Transaksi',
      desc: 'Kejujuran adalah pondasi utama kami. Barang yang dikirim sesuai dengan spesifikasi, foto asli, serta packing berlapis yang aman.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 font-sans">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#014DE6] text-xs font-bold px-3.5 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TENTANG KAMI • RIZQAL BAROKAH</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Tumbuh dari Kepercayaan,{' '}
          <span className="text-[#014DE6]">Melayani dengan Amanah</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Berdiri sejak tahun 2021 di Bojongsari, Depok, kami hadir membawa solusi perlengkapan
          rumah tangga dan alat kebersihan yang awet, ramah kantong, dan penuh keberkahan.
        </p>
      </section>

      {/* Storytelling Content with Showcase Image */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50/70 p-6 sm:p-10 rounded-3xl border border-slate-200">
        <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <span className="text-xs font-bold text-[#014DE6] tracking-wider uppercase block">
            Kisah Kami
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            Dari Toko Lingkungan Menjadi Mitra Kebutuhan Rumah Tangga & Instansi
          </h2>
          <p>
            <strong>RIZQAL BAROKAH</strong> didirikan pada tahun 2021 oleh{' '}
            <strong>Fatwa Ismunandar</strong> dengan tujuan sederhana namun mulia: membantu
            para ibu rumah tangga dan keluarga mendapatkan perabot berkualitas tanpa harus
            membayar harga yang mahal.
          </p>
          <p>
            Berawal dari toko fisik di <strong>Bojongsari, Depok</strong>, usaha ini berkembang
            pesat berkat kepercayaan pelanggan yang puas akan ketahanan barang, kejelasan
            kondisi produk, serta keramahan pelayanan kami. Seiring waktu, kami memperluas
            kategori produk ke aneka alat kebersihan modern seperti Spin Mop putar 360°, sapu
            nilon tahan rontok, kotak kontainer roda, dan paket sanitasi instansi.
          </p>
          <p>
            Kini, RIZQAL BAROKAH tidak hanya melayani pembeli eceran rumah tangga di Depok dan
            Jabodetabek, namun juga menjadi mitra andalan pengadaan untuk sekolah, rumah sakit,
            kantor, restoran, serta puluhan mitra reseller di berbagai daerah.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActivePage('products')}
              className="bg-[#014DE6] hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Jelajahi Produk Kami</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => openWhatsAppChat()}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs py-2.5 px-5 rounded-xl shadow-xs transition-colors"
            >
              Hubungi Pemilik / Admin
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
            <img
              src={heroImage}
              alt="Perjalanan RIZQAL BAROKAH"
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Badge */}
          <div className="absolute -bottom-4 -left-4 bg-white p-3.5 rounded-2xl shadow-lg border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#014DE6] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-slate-900 block">Sejak 2021</span>
              <span className="text-[10px] text-slate-500">Beroperasi di Bojongsari, Depok</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#014DE6] tracking-widest uppercase mb-1 block">
            VISI & MISI
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Arah & Komitmen Pelayanan Kami
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vision Card */}
          <div className="lg:col-span-1 bg-gradient-to-br from-[#014DE6] to-blue-800 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold text-blue-200 uppercase tracking-wider block mb-2">
                Visi RIZQAL BAROKAH
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold leading-snug">
                Menjadi pusat perabot rumah tangga dan alat kebersihan paling terpercaya,
                lengkap, dan berkah di Indonesia.
              </h3>
            </div>
            <p className="text-xs text-blue-100 mt-6 pt-4 border-t border-white/20">
              Menjangkau setiap keluarga dan institusi dengan barang berkualitas dan transaksi
              yang menentramkan hati.
            </p>
          </div>

          {/* Mission Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {missionPoints.map((m) => (
              <div
                key={m.number}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-[#014DE6] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#014DE6] font-extrabold text-sm flex items-center justify-center">
                      0{m.number}
                    </span>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1.5">{m.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones / Timeline */}
      <section className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#014DE6] tracking-widest uppercase mb-1 block">
            JEJAK LANGKAH
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Perjalanan Tumbuh Bersama Pelanggan
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2"
            >
              <span className="text-lg font-black text-[#014DE6] block">{m.year}</span>
              <h4 className="text-xs font-bold text-slate-900">{m.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Identity & Founder Profile */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex flex-col items-center text-center p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
            <Logo variant="badge" size="lg" />
            <h3 className="text-base font-bold text-slate-900 mt-4">RIZQAL BAROKAH</h3>
            <p className="text-xs text-[#014DE6] font-semibold italic">"{settings.tagline}"</p>
            <div className="mt-4 pt-4 border-t border-blue-200 w-full text-xs text-slate-600 space-y-1">
              <p>
                <strong>Pemilik Usaha:</strong> {settings.ownerName}
              </p>
              <p>
                <strong>Tahun Berdiri:</strong> {settings.establishedYear}
              </p>
              <p>
                <strong>Domisili:</strong> Bojongsari, Depok, Jawa Barat
              </p>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-slate-700">
            <h3 className="text-lg font-bold text-slate-900">
              Komitmen Kualitas & Pelayanan dari Fatwa Ismunandar
            </h3>
            <p className="leading-relaxed">
              "Bagi kami di RIZQAL BAROKAH, berdagang bukan sekadar mencari keuntungan semata,
              melainkan menjaga amanah dan menyebarkan keberkahan. Ketika seorang ibu rumah
              tangga atau pengurus masjid membeli perabot dari toko kami, kami ingin barang
              tersebut benar-benar awet, bermanfaat dalam jangka panjang, dan memudahkan
              urusan kebersihan mereka sehari-hari."
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tanpa Tipu-Tipu Spesifikasi</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Kemasan Bubble Wrap Tebal</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Faktur Nota Lengkap untuk Kantor</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dukungan Pengantaran Toko</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
