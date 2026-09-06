import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Boxes,
  CheckCircle,
  Building,
  School,
  Utensils,
  Hospital,
  Home,
  Store,
  Truck,
  FileText,
  Percent,
  MessageCircle,
  ShieldCheck,
  Send,
} from 'lucide-react';

export const WholesaleView: React.FC = () => {
  const { openWhatsAppChat, getWhatsAppUrl, settings } = useStore();

  const [formData, setFormData] = useState({
    picName: '',
    phone: '',
    organization: '',
    targetCategory: 'Alat Kebersihan (Pel, Sapu, Ember, Tong Sampah)',
    estimatedQty: '50 - 100 pcs',
    deliveryLocation: 'Depok / Jabodetabek',
    notes: '',
  });

  const targetClients = [
    {
      title: 'Sekolah & Pesantren',
      desc: 'Pengadaan ember wudhu, sapu nilon, spin mop aula, tempat sampah pedal bertingkat, dan rak sepatu asrama.',
      icon: School,
    },
    {
      title: 'Restoran, Kafe & Catering',
      desc: 'Box kontainer food grade, baskom jumbo, rak piring higienis, mop industri, dan sanitasi dapur komersil.',
      icon: Utensils,
    },
    {
      title: 'Perkantoran & Instansi',
      desc: 'Tempat sampah stainless/pedal, alat kebersihan pantry, dispenser sabun, dan kotak dokumen kantor.',
      icon: Building,
    },
    {
      title: 'Rumah Sakit & Klinik',
      desc: 'Alat sanitasi standar higienis, ember disinfeksi, tempat sampah medis warna, dan troli perlengkapan.',
      icon: Hospital,
    },
    {
      title: 'Kos-Kosan & Kontrakan',
      desc: 'Paket perlengkapan penghuni kamar: ember cuci, gayung mandi, jemuran gantung, dan keset anti selip.',
      icon: Home,
    },
    {
      title: 'Toko Retail & Warung Kelontong',
      desc: 'Suplai stok dagangan perabot fast-moving dengan margin sehat dan bisa mix item tanpa minimal karton berat.',
      icon: Store,
    },
  ];

  const benefits = [
    {
      title: 'Harga Bersahabat Langsung Grosir',
      desc: 'Dapatkan potongan harga bertingkat semakin banyak quantity yang dipesan.',
      icon: Percent,
    },
    {
      title: 'Bisa Mix / Campur Produk',
      desc: 'Tidak harus beli 1 jenis barang saja, Anda bisa mencampur varian perabot & alat kebersihan.',
      icon: Boxes,
    },
    {
      title: 'Faktur & Nota Resmi Perusahaan',
      desc: 'Dilengkapi kuitansi, stempel basah, dan invoice resmi untuk keperluan SPJ/LPJ instansi.',
      icon: FileText,
    },
    {
      title: 'Armada Pengantaran Sendiri',
      desc: 'Tersedia pengantaran langsung ke lokasi kantor/gudang Anda untuk wilayah Depok & Jabodetabek.',
      icon: Truck,
    },
    {
      title: 'Jalur Ekspedisi Kargo Luar Pulau',
      desc: 'Bekerja sama dengan kargo terpercaya (JNE JTR, J&T Cargo, Dakota, Baraka) dengan ongkir murah.',
      icon: ShieldCheck,
    },
  ];

  const handleWholesaleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.picName.trim() || !formData.phone.trim()) {
      alert('Mohon isi nama PIC dan nomor WhatsApp.');
      return;
    }

    let msg = `*PERMINTAAN PENAWARAN GROSIR / PENGADAAN RIZQAL BAROKAH*\n\n`;
    msg += `Nama PIC: ${formData.picName}\n`;
    msg += `No. WhatsApp: ${formData.phone}\n`;
    msg += `Nama Lembaga/Usaha: ${formData.organization || '-'}\n`;
    msg += `Kategori Kebutuhan: ${formData.targetCategory}\n`;
    msg += `Estimasi Kebutuhan: ${formData.estimatedQty}\n`;
    msg += `Lokasi Pengiriman: ${formData.deliveryLocation}\n`;
    if (formData.notes) msg += `Catatan Tambahan: ${formData.notes}\n`;
    msg += `\nMohon dikirimkan katalog harga grosir dan surat penawaran resmi. Terima kasih!`;

    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 font-sans">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#014DE6] via-blue-700 to-[#0A2540] rounded-3xl p-6 sm:p-12 text-white shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="bg-amber-400 text-slate-950 font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Layanan Grosir & B2B Resmi
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Pusat Pengadaan Perabot & Alat Kebersihan Instansi Terpercaya
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Menyediakan stok volume besar untuk kebutuhan sekolah, perkantoran, rumah makan,
            rumah sakit, dan toko retail dengan harga grosir langsung, produk 100% original, dan
            pengantaran terjamin.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="#form-grosir"
              className="bg-white hover:bg-slate-100 text-[#014DE6] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-colors"
            >
              Minta Penawaran Harga
            </a>
            <button
              onClick={() =>
                openWhatsAppChat(
                  'Halo RIZQAL BAROKAH, saya ingin berkonsultasi mengenai kebutuhan pengadaan/grosir instansi.'
                )
              }
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Chat Tim Pengadaan (WA)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Target Segments */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#014DE6] tracking-widest uppercase mb-1 block">
            SOLUSI BERBAGAI SEKTOR
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Siapa Saja yang Kami Layani?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Fleksibel untuk pesanan skala kecil, menengah, hingga ratusan unit perlengkapan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {targetClients.map((client, idx) => {
            const Icon = client.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#014DE6] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#014DE6] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {client.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{client.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Keuntungan Grosir */}
      <section className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#014DE6] tracking-widest uppercase mb-1 block">
            VALUE UNTUK BISNIS ANDA
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Keuntungan Belanja Grosir di RIZQAL BAROKAH
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">{b.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive RFQ Form */}
      <section
        id="form-grosir"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm"
      >
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-bold text-[#014DE6] tracking-wider uppercase block">
            Formulir Pengadaan Cepat
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            Konsultasikan Kebutuhan & Dapatkan Penawaran Terbaik
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Isi formulir singkat di samping untuk mendapatkan surat penawaran harga resmi (SPH)
            beserta simulasi ongkos kirim ke lokasi Anda.
          </p>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-[#014DE6]">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Respon Cepat dalam 15 - 30 Menit (Jam Kerja)</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-[#014DE6]">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Bisa Request Surat Penawaran Resmi & Stempel Toko</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-[#014DE6]">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Tersedia Sampel Barang untuk Pengadaan Besar</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <form onSubmit={handleWholesaleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama PIC / Pemesan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bapak Hendro"
                  value={formData.picName}
                  onChange={(e) => setFormData({ ...formData, picName: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081298765432"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Instansi / Usaha / Sekolah
                </label>
                <input
                  type="text"
                  placeholder="Contoh: SMP Harapan Bangsa / Cafe Rasa"
                  value={formData.organization}
                  onChange={(e) =>
                    setFormData({ ...formData, organization: e.target.value })
                  }
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kategori Kebutuhan
                </label>
                <select
                  value={formData.targetCategory}
                  onChange={(e) =>
                    setFormData({ ...formData, targetCategory: e.target.value })
                  }
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
                >
                  <option value="Alat Kebersihan (Pel, Sapu, Ember, Tong Sampah)">
                    Alat Kebersihan (Pel, Sapu, Ember, Tong Sampah)
                  </option>
                  <option value="Perabot Dapur & Wadah Makanan">
                    Perabot Dapur & Wadah Makanan
                  </option>
                  <option value="Storage Box & Container Roda">
                    Storage Box & Container Roda
                  </option>
                  <option value="Paket Lengkap Perlengkapan Asrama / Kos">
                    Paket Lengkap Perlengkapan Asrama / Kos
                  </option>
                  <option value="Campuran (Aneka Macam Perabot)">
                    Campuran (Aneka Macam Perabot)
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Estimasi Jumlah Unit
                </label>
                <select
                  value={formData.estimatedQty}
                  onChange={(e) =>
                    setFormData({ ...formData, estimatedQty: e.target.value })
                  }
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
                >
                  <option value="10 - 50 pcs">10 - 50 pcs</option>
                  <option value="50 - 100 pcs">50 - 100 pcs</option>
                  <option value="100 - 300 pcs">100 - 300 pcs</option>
                  <option value="Lebih dari 300 pcs">Lebih dari 300 pcs (Kontrak Rutin)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lokasi / Kota Pengiriman
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Sawangan Depok / Bandung / Surabaya"
                  value={formData.deliveryLocation}
                  onChange={(e) =>
                    setFormData({ ...formData, deliveryLocation: e.target.value })
                  }
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Catatan / Spesifikasi Khusus
              </label>
              <textarea
                rows={2}
                placeholder="Tuliskan jika ada merk spesifik (misal Lion Star / Bolde) atau batas tanggal pengiriman..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold py-3.5 px-6 rounded-xl shadow-md transition-transform active:scale-98 text-xs sm:text-sm"
            >
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
              <span>KIRIM PERMINTAAN PENAWARAN VIA WHATSAPP</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
