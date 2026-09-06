import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';
import {
  X,
  CheckCircle,
  Truck,
  CreditCard,
  MessageCircle,
  ShieldCheck,
  Printer,
  ShoppingBag,
  ArrowRight,
  Store,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    createOrder,
    getWhatsAppUrl,
    setActivePage,
  } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Depok',
    shippingMethod: 'Kurir Instan Depok (Gojek/Grab)',
    paymentMethod: 'Transfer Bank BCA',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Mohon lengkapi Nama, Nomor WhatsApp, dan Alamat Pengiriman.');
      return;
    }

    const order = createOrder({
      customerName: formData.name,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      city: formData.city,
      shippingMethod: formData.shippingMethod,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes,
    });

    setCompletedOrder(order);
    setIsSubmitted(true);
  };

  const generateWhatsAppCheckoutMessage = (order: Order) => {
    let msg = `*PESANAN BARU DARI WEBSITE RIZQAL BAROKAH*\n`;
    msg += `No. Pesanan: *${order.id}*\n`;
    msg += `Tanggal: ${order.date}\n\n`;
    msg += `*Data Pembeli:*\n`;
    msg += `Nama: ${order.customerName}\n`;
    msg += `No. WA: ${order.customerPhone}\n`;
    msg += `Alamat: ${order.customerAddress}, ${order.city}\n`;
    msg += `Metode Pengiriman: ${order.shippingMethod}\n`;
    msg += `Metode Pembayaran: ${order.paymentMethod}\n`;
    if (order.notes) msg += `Catatan: ${order.notes}\n`;

    msg += `\n*Daftar Produk:*\n`;
    order.items.forEach((it, idx) => {
      msg += `${idx + 1}. ${it.productName}${it.color ? ` (Varian: ${it.color})` : ''} x ${it.quantity} = Rp ${(it.price * it.quantity).toLocaleString('id-ID')}\n`;
    });

    msg += `\n*TOTAL PESANAN: Rp ${order.totalAmount.toLocaleString('id-ID')}*\n\n`;
    msg += `Mohon konfirmasi ketersediaan barang dan nomor rekening pembayaran / jadwal pengiriman. Terima kasih!`;
    return msg;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 my-auto max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#014DE6] flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {isSubmitted ? 'Pesanan Berhasil Dibuat' : 'Formulir Checkout & Pemesanan'}
              </h2>
              <p className="text-xs text-slate-500">
                {isSubmitted
                  ? 'Konfirmasi langsung via WhatsApp ke toko kami'
                  : 'Pesanan resmi terhubung langsung ke WhatsApp RIZQAL BAROKAH'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setIsSubmitted(false);
            }}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full"
            aria-label="Tutup Checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Items Preview */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block mb-2 uppercase tracking-wider">
                  Ringkasan Belanja ({cart.length} Jenis Produk):
                </span>
                <div className="max-h-36 overflow-y-auto divide-y divide-slate-200 pr-1 text-xs">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor || ''}`}
                      className="py-1.5 flex justify-between items-center"
                    >
                      <div className="truncate max-w-[280px]">
                        <span className="font-semibold text-slate-800">
                          {item.product.name}
                        </span>
                        {item.selectedColor && (
                          <span className="text-slate-500 text-[11px] block">
                            Varian: {item.selectedColor}
                          </span>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-slate-500">
                          {item.quantity}x @ Rp{' '}
                          {(
                            item.product.wholesalePrice &&
                            item.product.minWholesaleQty &&
                            item.quantity >= item.product.minWholesaleQty
                              ? item.product.wholesalePrice
                              : item.product.price
                          ).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-300 flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-700">Total Tagihan Produk:</span>
                  <span className="text-[#014DE6] text-base">
                    Rp {cartTotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Customer Info Form */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span>1. Data Penerima & Pengiriman</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ibu Ratna Dewi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-sm border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nomor WhatsApp / HP *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-sm border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Alamat Lengkap & Patokan Rumah *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Nama Jalan, Nomor Rumah, RT/RW, Kelurahan, Kecamatan, Patokan terdekat"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full text-sm border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kota / Kabupaten *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full text-sm border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#014DE6] focus:outline-none bg-white"
                    >
                      <option value="Depok">Kota Depok (Bojongsari, Sawangan, Beji, dll)</option>
                      <option value="Jakarta Selatan">Jakarta Selatan</option>
                      <option value="Jakarta Timur">Jakarta Timur</option>
                      <option value="Jakarta Barat">Jakarta Barat</option>
                      <option value="Jakarta Pusat">Jakarta Pusat</option>
                      <option value="Jakarta Utara">Jakarta Utara</option>
                      <option value="Bogor">Kota / Kab. Bogor</option>
                      <option value="Tangerang Selatan">Tangerang Selatan (Pamulang, Ciputat)</option>
                      <option value="Tangerang">Kota / Kab. Tangerang</option>
                      <option value="Bekasi">Kota / Kab. Bekasi</option>
                      <option value="Luar Jabodetabek / Luar Jawa">
                        Luar Jabodetabek / Luar Jawa (Ekspedisi Kargo)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Metode Pengiriman *
                    </label>
                    <select
                      value={formData.shippingMethod}
                      onChange={(e) =>
                        setFormData({ ...formData, shippingMethod: e.target.value })
                      }
                      className="w-full text-sm border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#014DE6] focus:outline-none bg-white"
                    >
                      <option value="Kurir Instan Depok (Gojek/Grab)">
                        Kurir Instan Jabodetabek (Gojek / Grab / Lalamove)
                      </option>
                      <option value="Kurir Toko RIZQAL BAROKAH (Area Depok)">
                        Kurir Toko RIZQAL BAROKAH (Area Depok)
                      </option>
                      <option value="Ambil Sendiri di Showroom Bojongsari (Gratis)">
                        Ambil Sendiri di Showroom Bojongsari Depok (Gratis)
                      </option>
                      <option value="Ekspedisi Kargo (JNE JTR / J&T Cargo / Dakota)">
                        Ekspedisi Kargo (JNE JTR / J&T Cargo / Dakota)
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  2. Metode Pembayaran
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    {
                      id: 'Transfer Bank BCA',
                      label: 'Transfer Bank BCA',
                      desc: 'Verifikasi instan via WA',
                    },
                    {
                      id: 'COD / Bayar di Tempat',
                      label: 'COD / Bayar di Tempat',
                      desc: 'Khusus Area Depok',
                    },
                    {
                      id: 'QRIS / E-Wallet',
                      label: 'QRIS / E-Wallet',
                      desc: 'GoPay, OVO, ShopeePay',
                    },
                  ].map((pay) => (
                    <label
                      key={pay.id}
                      className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === pay.id
                          ? 'border-[#014DE6] bg-blue-50/60 ring-2 ring-blue-100'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={pay.id}
                          checked={formData.paymentMethod === pay.id}
                          onChange={(e) =>
                            setFormData({ ...formData, paymentMethod: e.target.value })
                          }
                          className="text-[#014DE6] focus:ring-[#014DE6]"
                        />
                        <span className="font-semibold text-slate-900">{pay.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 pl-5">
                        {pay.desc}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Catatan untuk Toko (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Tolong kirim sebelum jam 3 sore / packing ekstra bubble"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full text-sm border border-slate-300 rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg transition-transform active:scale-98 text-sm"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                  <span>SELESAIKAN & KIRIM PESANAN KE WHATSAPP</span>
                </button>
                <p className="text-[11px] text-center text-slate-500 mt-2">
                  Pesanan Anda akan tersimpan di sistem toko dan diteruskan ke WhatsApp Admin
                  (08998595979) untuk konfirmasi total dan pengiriman.
                </p>
              </div>
            </form>
          ) : (
            // Success & Invoice Screen
            completedOrder && (
              <div className="space-y-6 text-center py-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div>
                  <span className="inline-block bg-blue-100 text-[#014DE6] text-xs font-bold px-3 py-1 rounded-full mb-2">
                    ID Pesanan: {completedOrder.id}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Alhamdulillah, Pesanan Berhasil Dicatat!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                    Terima kasih telah berbelanja di <strong>RIZQAL BAROKAH</strong>. Silakan
                    klik tombol di bawah untuk mengirim konfirmasi ke WhatsApp kami agar
                    pesanan segera kami siapkan.
                  </p>
                </div>

                {/* Invoice Summary Box */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left text-xs space-y-3">
                  <div className="flex justify-between border-b border-slate-200 pb-2 font-semibold">
                    <span className="text-slate-600">Penerima:</span>
                    <span className="text-slate-900">{completedOrder.customerName} ({completedOrder.customerPhone})</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-600">Alamat:</span>
                    <span className="text-slate-900 text-right max-w-xs">{completedOrder.customerAddress}, {completedOrder.city}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-600">Pengiriman & Pembayaran:</span>
                    <span className="text-slate-900 text-right">{completedOrder.shippingMethod} • {completedOrder.paymentMethod}</span>
                  </div>

                  <div className="pt-1">
                    <span className="font-bold text-slate-700 block mb-1">Item Pesanan:</span>
                    <ul className="space-y-1 text-slate-600 pl-2">
                      {completedOrder.items.map((it, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>{it.quantity}x {it.productName} {it.color ? `(${it.color})` : ''}</span>
                          <span className="font-medium text-slate-900">Rp {(it.price * it.quantity).toLocaleString('id-ID')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-300 flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-900">Total Pesanan:</span>
                    <span className="text-[#014DE6] text-base">Rp {completedOrder.totalAmount.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {/* Direct WhatsApp trigger button */}
                <div className="space-y-2.5">
                  <a
                    href={getWhatsAppUrl(generateWhatsAppCheckoutMessage(completedOrder))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold py-3.5 px-6 rounded-xl shadow-md transition-transform active:scale-98 text-sm"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                    <span>KIRIM DATA PESANAN KE WHATSAPP TOKO SEKARANG</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setIsSubmitted(false);
                      setActivePage('home');
                    }}
                    className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Kembali ke Beranda
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
