import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  Truck,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export const FAQView: React.FC = () => {
  const { openWhatsAppChat, settings } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apakah semua produk di RIZQAL BAROKAH ready stock?',
      a: 'Ya, hampir seluruh produk yang tampil di website kami berstatus STOK READY di gudang dan showroom Bojongsari, Depok. Apabila ada varian warna atau tipe tertentu yang sedang menipis, tim admin kami akan segera mengonfirmasi alternatif terbaik saat Anda melakukan checkout atau chat.',
    },
    {
      q: 'Apakah bisa beli eceran / satuan?',
      a: 'Tentu saja sangat bisa! Kami melayani pembelian satuan tanpa minimal belanja untuk seluruh kebutuhan ibu rumah tangga, anak kos, maupun keluarga.',
    },
    {
      q: 'Apakah bisa beli grosir / partai besar untuk instansi atau toko?',
      a: 'Sangat bisa. Kami menyediakan harga bertingkat (semakin banyak quantity, harga semakin murah). Kami juga melayani pengadaan untuk sekolah, rumah sakit, restoran, pesantren, kantor, dan warung perabot dengan faktur nota resmi.',
    },
    {
      q: 'Bagaimana cara pemesanan di website RIZQAL BAROKAH?',
      a: 'Sangat mudah: Pilih produk yang Anda inginkan -> klik "Beli Sekarang" atau "Tambah ke Keranjang" -> masuk ke formulir Checkout -> lengkapi alamat penerima -> klik "Selesaikan & Kirim Pesanan via WhatsApp". Pesanan Anda langsung terhubung ke WhatsApp Admin kami (08998595979) untuk diverifikasi dan disiapkan.',
    },
    {
      q: 'Apakah bisa bayar dengan sistem COD (Bayar di Tempat)?',
      a: 'Bisa! Layanan COD tersedia khusus untuk pengiriman kurir toko wilayah Bojongsari, Sawangan, Depok, dan sekitarnya. Untuk pengiriman luar Jabodetabek menggunakan kargo, pembayaran dilakukan melalui Transfer Bank (BCA/Mandiri) atau QRIS sebelum barang diberangkatkan.',
    },
    {
      q: 'Bagaimana pengiriman ke luar kota / luar pulau Jawa?',
      a: 'Kami bekerja sama dengan ekspedisi kargo terpercaya bertarif hemat seperti JNE Trucking (JTR), J&T Cargo, Dakota Cargo, dan Baraka Sarana Tama. Ongkir dihitung berdasarkan berat aktual atau volume kubikasi yang paling ekonomis untuk Anda.',
    },
    {
      q: 'Di mana alamat showroom fisik RIZQAL BAROKAH?',
      a: `Toko fisik dan gudang kami beralamat di: ${settings.address}. Buka setiap hari (Senin sampai Minggu) dari pukul 08.00 hingga 19.00 WIB. Tersedia tempat parkir dan Anda bebas mengecek fisik barang sebelum membeli.`,
    },
    {
      q: 'Bagaimana jika barang yang saya terima cacat atau rusak saat pengiriman?',
      a: 'Kami memberikan GARANSI GANTI BARANG / REFUND jika kerusakan terjadi saat pengiriman. Syaratnya cukup sertakan video unboxing utuh saat pertama kali membuka paket tanpa jeda, lalu kirimkan ke WhatsApp admin kami. Kami akan bantu proses penyelesaiannya dengan cepat dan amanah.',
    },
    {
      q: 'Apakah barang yang dijual 100% Original?',
      a: 'Benar, seluruh produk kami 100% original dari pabrik produsen resmi (seperti Lion Star, Bolde, Maspion, Nagata, Shinpo, Claris, Green Leaf). Kami tidak menjual barang tiruan / KW yang mudah getas.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 font-sans">
      {/* Header */}
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#014DE6] text-xs font-bold px-3.5 py-1.5 rounded-full">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>PUSAT BANTUAN & INFORMASI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Pertanyaan yang Sering Diajukan (FAQ)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Temukan jawaban cepat seputar pemesanan, stok, pengiriman kargo, harga grosir, dan
          lokasi showroom RIZQAL BAROKAH.
        </p>
      </section>

      {/* Accordion List */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'border-blue-300 bg-blue-50/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900"
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${
                      isOpen
                        ? 'bg-[#014DE6] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span>{faq.q}</span>
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#014DE6] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed pl-13 border-t border-slate-100/80">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Support Box */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 text-center space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Masih Memiliki Pertanyaan Lain?
        </h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Tim customer service kami siap menjawab pertanyaan Anda dengan ramah dan cepat
          melalui pesan WhatsApp resmi.
        </p>
        <button
          onClick={() =>
            openWhatsAppChat(
              'Halo RIZQAL BAROKAH, saya memiliki pertanyaan yang belum tercantum di halaman FAQ.'
            )
          }
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-md transition-all active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
          <span>Hubungi Customer Service WhatsApp (08998595979)</span>
        </button>
      </div>
    </div>
  );
};
