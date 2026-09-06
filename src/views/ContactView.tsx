import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  MessageCircle,
  Send,
  Navigation,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { settings, openWhatsAppChat, getWhatsAppUrl } = useStore();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    subject: 'Tanya Stok & Spesifikasi Produk',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      alert('Mohon lengkapi nama dan pesan.');
      return;
    }

    let text = `*PESAN DARI HALAMAN KONTAK WEBSITE*\n\n`;
    text += `Nama: ${form.name}\n`;
    text += `WhatsApp: ${form.phone || '-'}\n`;
    text += `Topik: ${form.subject}\n`;
    text += `Pesan:\n${form.message}\n`;

    window.open(getWhatsAppUrl(text), '_blank');
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Jalan Rambutan No. 21 RT 2 RW 1, Bojongsari, Depok, Jawa Barat'
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 font-sans">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#014DE6] tracking-widest uppercase block">
          HUBUNGI KAMI
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Kami Siap Membantu Kebutuhan Perabot Anda
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Punya pertanyaan seputar ukuran produk, pengiriman ke daerah Anda, atau ingin
          berkunjung ke showroom fisik di Bojongsari Depok? Jangan ragu untuk menghubungi kami.
        </p>
      </section>

      {/* 4 Contact Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 fill-emerald-600 text-emerald-600" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">WhatsApp Resmi</h3>
          <p className="text-xs text-slate-500">Respon cepat setiap hari</p>
          <button
            onClick={() => openWhatsAppChat()}
            className="text-xs font-bold text-[#25D366] hover:underline block pt-1"
          >
            {settings.whatsapp}
          </button>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#014DE6] flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Email Korespondensi</h3>
          <p className="text-xs text-slate-500">Untuk surat penawaran resmi</p>
          <a
            href={`mailto:${settings.email}`}
            className="text-xs font-bold text-[#014DE6] hover:underline block pt-1"
          >
            {settings.email}
          </a>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Jam Operasional</h3>
          <p className="text-xs text-slate-500">Senin sampai Minggu</p>
          <span className="text-xs font-semibold text-slate-800 block pt-1">
            {settings.operatingHours}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Showroom Toko</h3>
          <p className="text-xs text-slate-500">Bojongsari, Kota Depok</p>
          <span className="text-[11px] text-slate-700 block pt-1 line-clamp-2">
            Jalan Rambutan No. 21 RT 2 RW 1
          </span>
        </div>
      </div>

      {/* Main Form & Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Message Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Kirim Pesan Langsung
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Pesan Anda akan otomatis terhubung ke admin WhatsApp kami untuk dijawab
              langsung.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Anda *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Budi Santoso"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nomor WhatsApp / HP
              </label>
              <input
                type="tel"
                placeholder="Contoh: 081234567890"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Topik Keperluan
              </label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#014DE6] focus:outline-none bg-white"
              >
                <option value="Tanya Stok & Spesifikasi Produk">
                  Tanya Stok & Spesifikasi Produk
                </option>
                <option value="Konsultasi Pengadaan Grosir Instansi">
                  Konsultasi Pengadaan Grosir Instansi
                </option>
                <option value="Pendaftaran Reseller / Dropship">
                  Pendaftaran Reseller / Dropship
                </option>
                <option value="Konfirmasi Pembayaran & Pengiriman">
                  Konfirmasi Pembayaran & Pengiriman
                </option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pesan Anda *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Tuliskan detail pertanyaan atau pesanan produk yang Anda butuhkan..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full text-xs sm:text-sm border border-slate-300 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-transform active:scale-98 text-xs sm:text-sm"
            >
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
              <span>KIRIM PESAN VIA WHATSAPP RESMI</span>
            </button>
          </form>
        </div>

        {/* Right: Map & Directions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Kunjungi Toko Fisik Kami
                </h3>
                <p className="text-xs text-slate-500">
                  Jalan Rambutan No. 21 RT 2 RW 1, Bojongsari, Depok
                </p>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#014DE6] text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-blue-700"
              >
                <span>Buka Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Map */}
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-300">
              <iframe
                title="Google Maps RIZQAL BAROKAH"
                src="https://maps.google.com/maps?q=Bojongsari%20Depok%20Jalan%20Rambutan&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <p>
                <strong>Pemilik Usaha:</strong> {settings.ownerName}
              </p>
              <p>
                <strong>Media Sosial:</strong> Instagram @{settings.instagram} • TikTok @
                {settings.tiktok}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
