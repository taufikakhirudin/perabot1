import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

// Views
import { HomeView } from './views/HomeView';
import { ProductCatalogView } from './views/ProductCatalogView';
import { AboutView } from './views/AboutView';
import { WholesaleView } from './views/WholesaleView';
import { ResellerView } from './views/ResellerView';
import { ShowroomView } from './views/ShowroomView';
import { BlogView } from './views/BlogView';
import { FAQView } from './views/FAQView';
import { ContactView } from './views/ContactView';
import { AdminCMSView } from './views/AdminCMSView';

import {
  MessageCircle,
  Truck,
  ShieldCheck,
  Package,
  Phone,
  ArrowRight,
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activePage, setActivePage, openWhatsAppChat } = useStore();

  // Scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-blue-100 selection:text-[#014DE6]">
      {/* Primary Sticky Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'home' && <HomeView />}
        {activePage === 'products' && <ProductCatalogView />}
        {activePage === 'about' && <AboutView />}
        {activePage === 'wholesale' && <WholesaleView />}
        {activePage === 'reseller' && <ResellerView />}
        {activePage === 'showroom' && <ShowroomView />}
        {activePage === 'blog' && <BlogView />}
        {activePage === 'faq' && <FAQView />}
        {activePage === 'contact' && <ContactView />}
        {activePage === 'admin' && <AdminCMSView />}

        {/* SECTION 23 — FAST CALL TO ACTION BANNER (Shown above footer on standard pages) */}
        {activePage !== 'admin' && (
          <section className="bg-gradient-to-r from-[#014DE6] to-[#0A1E4A] text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-blue-600/30">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-bold text-blue-200 uppercase tracking-widest block">
                  SIAP MELAYANI KEBUTUHAN ANDA
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Butuh Perabot Rumah Tangga & Alat Kebersihan Hari Ini?
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  Konsultasikan kebutuhan eceran, grosir hajatan, atau pengadaan instansi Anda
                  langsung dengan admin kami di Bojongsari, Depok. Respon cepat & ramah!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <button
                  onClick={() =>
                    openWhatsAppChat(
                      'Halo RIZQAL BAROKAH, saya ingin memesan perabot / alat kebersihan sekarang.'
                    )
                  }
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-lg transition-transform active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                  <span>HUBUNGI VIA WHATSAPP</span>
                </button>

                <button
                  onClick={() => {
                    setActivePage('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-[#014DE6] font-bold text-sm py-3.5 px-6 rounded-xl shadow-md transition-colors"
                >
                  <span>Buka Katalog Produk</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals & Slide-ins */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <FloatingWhatsApp />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
