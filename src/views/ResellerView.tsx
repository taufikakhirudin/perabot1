import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Users,
  TrendingUp,
  Image,
  Send,
  PackageCheck,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';

export const ResellerView: React.FC = () => {
  const { openWhatsAppChat, getWhatsAppUrl } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    salesChannel: 'WhatsApp & Instagram',
    experience: 'Baru Mau Mulai Usaha',
  });

  const advantages = [
    {
      title: 'Modal Sangat Terjangkau / Bisa Dropship',
      desc: 'Tidak harus menyewa ruko atau stok ratusan dus barang. Anda bisa mulai dengan sistem dropship langsung dari toko kami di Bojongsari, Depok.',
      icon: TrendingUp,
    },
    {
      title: 'Margin Keuntungan Sehat (15% - 35%)',
      desc: 'Harga beli mitra yang sangat kompetitif sehingga Anda leluasa menentukan harga jual eceran di lingkungan Anda.',
      icon: Sparkles,
    },
    {
      title: 'Foto & Video Siap Pakai',
      desc: 'Disediakan akses materi promosi produk resolusi tinggi, deskripsi spesifikasi, dan video demo untuk Anda posting di status WA dan Instagram.',
      icon: Image,
    },
    {
      title: 'Kirim Pakai Nama Toko Anda (Dropship)',
      desc: 'Kerahasiaan data amanah. Label pengiriman tertulis nama dan kontak Anda sebagai pengirim, tanpa nota dari kami.',
      icon: PackageCheck,
    },
    {
      title: 'Kebutuhan Harian Selalu Dicari',
      desc: 'Perabot rumah tangga dan alat kebersihan adalah barang fast moving yang selalu dibutuhkan keluarga baru, ibu rumah tangga, dan anak kos.',
      icon: ShieldCheck,
    },
    {
      title: 'Bimbingan & Konsultasi Langsung',
      desc: 'Tim admin kami siap membantu rekomendasi produk terlaris di setiap musim dan update stok harian.',
      icon: Users,
    },
  ];

  const handleResellerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.city.trim()) {
      alert('Mohon lengkapi Nama, WhatsApp, dan Kota.');
      return;
    }

    let msg = `*PENDAFTARAN MITRA RESELLER / DROPSHIP RIZQAL BAROKAH*\n\n`;
    msg += `Nama: ${formData.name}\n`;
    msg += `No. WhatsApp: ${formData.phone}\n`;
    msg += `Kota / Domisili: ${formData.city}\n`;
    msg += `Rencana Jalur Jualan: ${formData.salesChannel}\n`;
    msg += `Pengalaman Usaha: ${formData.experience}\n\n`;
    msg += `Halo Admin RIZQAL BAROKAH, saya tertarik untuk bergabung menjadi mitra Reseller/Dropship. Mohon dikirimkan panduan kemitraan dan katalog foto produknya. Terima kasih!`;

    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 font-sans">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-emerald-600 via-teal-700 to-[#0A2540] rounded-3xl p-6 sm:p-12 text-white shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="bg-amber-400 text-slate-950 font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Peluang Usaha Berkah 2026
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Program Kemitraan Reseller & Dropship Perabot Rumah Tangga
          </h1>
          <p className="text-emerald-50 text-sm sm:text-base leading-relaxed">
            Mulai usaha jualan perabot dan alat kebersihan yang pasti laku tanpa beban modal
            besar. Didukung stok ready dan pengiriman amanah langsung dari RIZQAL BAROKAH
            Depok.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="#form-reseller"
              className="bg-white hover:bg-slate-100 text-emerald-800 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-colors"
            >
              Daftar Jadi Mitra Sekarang
            </a>
            <button
              onClick={() =>
                openWhatsAppChat(
                  'Halo RIZQAL BAROKAH, saya ingin menanyakan syarat dan ketentuan kemitraan reseller/dropship.'
                )
              }
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Tanya Admin Mitra (WA)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Keuntungan Menjadi Reseller */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase mb-1 block">
            KEUNTUNGAN MITRA
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Mengapa Memilih Menjadi Reseller RIZQAL BAROKAH?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-emerald-500 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {adv.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{adv.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4 Langkah Mudah Bergabung */}
      <section className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase mb-1 block">
            CARA KERJA
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            4 Langkah Mudah Mulai Menghasilkan
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: '1',
              title: 'Daftar Mitra',
              desc: 'Isi formulir pendaftaran di bawah ini atau hubungi tim WhatsApp kami.',
            },
            {
              step: '2',
              title: 'Dapatkan Katalog',
              desc: 'Terima foto produk berkualitas tinggi, deskripsi siap copy-paste, dan daftar harga mitra.',
            },
            {
              step: '3',
              title: 'Promosikan Produk',
              desc: 'Posting di status WhatsApp, Instagram Story, arisan, atau marketplace Anda.',
            },
            {
              step: '4',
              title: 'Kami Kirimkan',
              desc: 'Ketika ada order, Anda transfer ke kami dan pesanan langsung kami kemas atas nama Anda.',
            },
          ].map((s) => (
            <div
              key={s.step}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 relative"
            >
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center mb-3">
                {s.step}
              </span>
              <h4 className="text-sm font-bold text-slate-900">{s.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Form */}
      <section
        id="form-reseller"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm"
      >
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase block">
            Formulir Pendaftaran
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            Gabung Menjadi Keluarga Besar Reseller RIZQAL BAROKAH
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Tidak dipungut biaya pendaftaran bulanan. Anda langsung bisa mulai berjualan dan
            mendapatkan akses foto produk hari ini juga.
          </p>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Gratis Akses Google Drive Foto & Video Produk</span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Prioritas Stok untuk Produk Fast Moving</span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Dukungan Pengemasan Amanah Tanpa Logo Kami (Dropship)</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <form onSubmit={handleResellerSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Siti Aisyah"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 0813xxxxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kota / Domisili *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Depok / Tangerang / Bekasi"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Rencana Media Promosi
                </label>
                <select
                  value={formData.salesChannel}
                  onChange={(e) =>
                    setFormData({ ...formData, salesChannel: e.target.value })
                  }
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="WhatsApp & Instagram Story">WhatsApp & Instagram Story</option>
                  <option value="Marketplace (Shopee / Tokopedia / TikTok)">
                    Marketplace (Shopee / Tokopedia / TikTok)
                  </option>
                  <option value="Arisan / Grup Ibu-Ibu / Offline">
                    Arisan / Grup Ibu-Ibu / Offline
                  </option>
                  <option value="Toko Fisik / Warung Milik Sendiri">
                    Toko Fisik / Warung Milik Sendiri
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pengalaman Usaha Sebelumnya
              </label>
              <select
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="Baru Mau Mulai Usaha Pertama Kali">
                  Baru Mau Mulai Usaha Pertama Kali (Perlu Bimbingan)
                </option>
                <option value="Sudah Pernah Jualan Produk Lain">
                  Sudah Pernah Jualan Produk Lain (Fashion / Makanan)
                </option>
                <option value="Sudah Punya Toko Perabot / Kelontong">
                  Sudah Punya Toko Perabot / Kelontong (Ingin Tambah Suplier)
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold py-3.5 px-6 rounded-xl shadow-md transition-transform active:scale-98 text-xs sm:text-sm"
            >
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
              <span>DAFTAR MITRA RESELLER VIA WHATSAPP</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
