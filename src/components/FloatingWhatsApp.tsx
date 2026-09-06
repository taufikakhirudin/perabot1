import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { openWhatsAppChat, settings, selectedProduct, activePage } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const getDefaultMessage = () => {
    if (selectedProduct) {
      return `Halo RIZQAL BAROKAH, saya tertarik dengan produk *${selectedProduct.name}*. Mohon informasi ketersediaan stok dan harganya. Terima kasih!`;
    }
    if (activePage === 'wholesale') {
      return 'Halo RIZQAL BAROKAH, saya ingin mendapatkan informasi harga grosir/pengadaan untuk instansi/usaha.';
    }
    if (activePage === 'reseller') {
      return 'Halo RIZQAL BAROKAH, saya ingin mendaftar dan menanyakan program kemitraan Reseller.';
    }
    return 'Halo RIZQAL BAROKAH, saya ingin bertanya tentang produk perabot dan alat kebersihan.';
  };

  const handleSend = () => {
    const messageToSend = userMsg.trim() || getDefaultMessage();
    openWhatsAppChat(messageToSend);
    setIsOpen(false);
    setUserMsg('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Interactive Popup Box */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#014DE6] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 font-bold text-sm">
                  RB
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#014DE6] rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Admin RIZQAL BAROKAH</h4>
                <p className="text-[11px] text-blue-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online • Fast Response Depok
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Message */}
          <div className="p-4 bg-slate-50 space-y-3 text-xs">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 text-slate-700 shadow-2xs space-y-1">
              <p className="font-semibold text-[#014DE6]">
                Assalamu'alaikum / Halo! Selamat datang di RIZQAL BAROKAH.
              </p>
              <p className="text-slate-600">
                Ada yang bisa kami bantu seputar perabot rumah tangga atau alat kebersihan?
              </p>
              <span className="text-[10px] text-slate-400 block text-right">
                {settings.operatingHours}
              </span>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Pertanyaan Cepat:
              </span>
              {[
                'Cek stok & ongkir ke alamat saya',
                'Tanya katalog & harga grosir pengadaan',
                'Bagaimana cara pesan Spin Mop & Ember?',
              ].map((txt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    openWhatsAppChat(`Halo RIZQAL BAROKAH, ${txt.toLowerCase()}.`);
                    setIsOpen(false);
                  }}
                  className="w-full text-left bg-white hover:bg-blue-50 hover:text-[#014DE6] hover:border-blue-300 p-2 rounded-xl border border-slate-200 text-[11px] text-slate-700 transition-colors truncate"
                >
                  💬 {txt}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Ketik pesan untuk admin..."
                  value={userMsg}
                  onChange={(e) => setUserMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl pl-3 pr-10 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#014DE6]"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-1.5 bg-[#014DE6] text-white p-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                  aria-label="Kirim"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95"
        title="Chat WhatsApp RIZQAL BAROKAH"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 rounded-full animate-ping"></span>
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold leading-tight">Chat WhatsApp</span>
          <span className="text-[10px] text-emerald-100 font-medium leading-none">
            08998595979
          </span>
        </div>
      </button>
    </div>
  );
};
