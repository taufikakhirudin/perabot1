import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Logo } from '../components/Logo';
import { Product, BlogArticle, StoreSettings } from '../types';
import {
  Package,
  ShoppingBag,
  Settings,
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  RotateCcw,
  DollarSign,
  TrendingUp,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

export const AdminCMSView: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    articles,
    addArticle,
    deleteArticle,
    settings,
    updateSettings,
    resetToInitialData,
    openWhatsAppChat,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'articles' | 'settings'>(
    'products'
  );

  // New Product Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    category: 'Perabot Rumah Tangga',
    brand: '',
    price: 50000,
    originalPrice: 65000,
    wholesalePrice: 42000,
    minWholesaleQty: 6,
    stock: 50,
    status: 'READY',
    mainImage: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
    description: '',
    material: 'Plastik Tebal Berkualitas',
    dimensions: 'Standar',
    weight: 1000,
    colors: ['Biru', 'Hijau', 'Abu-abu'],
    specifications: ['Bahan tebal anti-pecah', 'Mudah dibersihkan'],
    suitableFor: ['Rumah Tangga', 'Kantor'],
    isFeatured: true,
  });

  // Store Settings Form State
  const [settingsForm, setSettingsForm] = useState<StoreSettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Stats calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      category: 'Perabot Rumah Tangga',
      brand: 'Lion Star',
      price: 65000,
      originalPrice: 85000,
      wholesalePrice: 55000,
      minWholesaleQty: 6,
      stock: 45,
      status: 'READY',
      mainImage: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
      description: 'Produk perabot rumah tangga berkualitas tinggi, awet dan kuat.',
      material: 'Plastik Tebal PP',
      dimensions: '40 x 30 x 25 cm',
      weight: 1000,
      colors: ['Biru', 'Abu-abu'],
      specifications: ['Kualitas Original', 'Mudah dicuci'],
      suitableFor: ['Keluarga', 'Usaha'],
      isFeatured: true,
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({ ...prod });
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      alert('Nama dan harga wajib diisi.');
      return;
    }

    if (editingProductId) {
      updateProduct(editingProductId, productForm);
    } else {
      const newProd: Product = {
        id: `rb-${Date.now()}`,
        name: productForm.name || 'Produk Baru',
        category: productForm.category || 'Perabot Rumah Tangga',
        brand: productForm.brand || 'RIZQAL BAROKAH',
        sku: `RB-${Math.floor(1000 + Math.random() * 9000)}`,
        price: Number(productForm.price) || 0,
        originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
        wholesalePrice: productForm.wholesalePrice ? Number(productForm.wholesalePrice) : undefined,
        minWholesaleQty: productForm.minWholesaleQty ? Number(productForm.minWholesaleQty) : 6,
        stock: Number(productForm.stock) || 10,
        status: 'READY',
        rating: 5.0,
        salesCount: 1,
        mainImage:
          productForm.mainImage ||
          'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
        galleryImages: [],
        description: productForm.description || '',
        material: productForm.material || 'Plastik Berkualitas',
        dimensions: productForm.dimensions || 'Standar',
        weight: Number(productForm.weight) || 1000,
        colors: productForm.colors || ['Biru'],
        specifications: productForm.specifications || ['Original'],
        suitableFor: productForm.suitableFor || ['Rumah'],
        isFeatured: Boolean(productForm.isFeatured),
        isBestSeller: false,
      };
      addProduct(newProd);
    }

    setShowProductModal(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Top Banner */}
      <div className="bg-[#0A1E4A] text-white p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl border border-blue-900/50">
        <div>
          <span className="text-xs font-bold text-blue-300 uppercase tracking-widest block mb-1">
            PORTAL ADMINISTRASI & CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Dashboard Pengelola RIZQAL BAROKAH
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Kelola katalog produk, pesanan WhatsApp masuk, artikel blog, dan informasi toko.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (
                window.confirm(
                  'Kembalikan seluruh data produk dan artikel ke pengaturan awal demo?'
                )
              ) {
                resetToInitialData();
              }
            }}
            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
            title="Reset ke Data Bawaan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Total Produk Aktif</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#014DE6]">{products.length}</span>
            <Package className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block">
            Stok Ready di Showroom
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Total Pesanan Tercatat</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900">{orders.length}</span>
            <ShoppingBag className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-[11px] text-slate-500 block">Via Checkout Website</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Omset Pesanan Masuk</span>
          <div className="flex items-baseline justify-between">
            <span className="text-lg sm:text-xl font-extrabold text-emerald-600">
              Rp {totalRevenue.toLocaleString('id-ID')}
            </span>
            <DollarSign className="w-5 h-5 text-emerald-500" />
          </div>
          <span className="text-[11px] text-slate-400 block">Dari formulir order</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Artikel Edukasi SEO</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-purple-600">{articles.length}</span>
            <BookOpen className="w-5 h-5 text-purple-400" />
          </div>
          <span className="text-[11px] text-purple-600 font-semibold block">
            Terindeks Google
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'products', label: `Kelola Produk (${products.length})`, icon: Package },
          { id: 'orders', label: `Daftar Pesanan (${orders.length})`, icon: ShoppingBag },
          { id: 'articles', label: `Artikel Blog (${articles.length})`, icon: BookOpen },
          { id: 'settings', label: 'Pengaturan Toko & Kontak', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#014DE6] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: KELOLA PRODUK */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h2 className="font-bold text-slate-900 text-base">Katalog Produk Toko</h2>
              <p className="text-xs text-slate-500">
                Tambah, ubah harga satuan, harga grosir, atau update stok barang.
              </p>
            </div>
            <button
              onClick={handleOpenAddProduct}
              className="bg-[#014DE6] hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk Baru</span>
            </button>
          </div>

          {/* Table of Products */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Produk</th>
                    <th className="p-3.5">Kategori & Brand</th>
                    <th className="p-3.5">Harga Eceran</th>
                    <th className="p-3.5">Harga Grosir</th>
                    <th className="p-3.5">Stok</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={prod.mainImage}
                          alt={prod.name}
                          className="w-10 h-10 rounded-lg object-contain bg-slate-50 border border-slate-200 shrink-0"
                        />
                        <div className="max-w-[220px]">
                          <span className="font-bold text-slate-900 block truncate">
                            {prod.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {prod.sku}
                          </span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="block font-medium text-slate-800">
                          {prod.category}
                        </span>
                        <span className="text-[11px] text-[#014DE6] font-semibold">
                          {prod.brand}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">
                        Rp {prod.price.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3.5">
                        {prod.wholesalePrice ? (
                          <span className="text-emerald-700 font-semibold">
                            Rp {prod.wholesalePrice.toLocaleString('id-ID')}{' '}
                            <span className="text-[10px] text-slate-400">
                              (min {prod.minWholesaleQty})
                            </span>
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="p-3.5 font-semibold">{prod.stock} pcs</td>
                      <td className="p-3.5">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {prod.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEditProduct(prod)}
                          className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus produk "${prod.name}"?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KELOLA PESANAN */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200">
            <h2 className="font-bold text-slate-900 text-base">Daftar Pesanan Pelanggan</h2>
            <p className="text-xs text-slate-500">
              Pesanan otomatis tercatat saat pembeli menekan tombol Checkout. Hubungi pembeli
              via nomor WhatsApp mereka.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">No. Pesanan & Tanggal</th>
                    <th className="p-3.5">Nama & WhatsApp</th>
                    <th className="p-3.5">Alamat / Kota</th>
                    <th className="p-3.5">Item Pesanan</th>
                    <th className="p-3.5">Total & Pembayaran</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400">
                        Belum ada pesanan yang masuk. Coba lakukan checkout pada keranjang
                        belanja!
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/80">
                        <td className="p-3.5">
                          <span className="font-bold text-blue-700 block font-mono">
                            {order.id}
                          </span>
                          <span className="text-[10px] text-slate-400">{order.date}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-slate-900 block">
                            {order.customerName}
                          </span>
                          <a
                            href={`https://wa.me/${order.customerPhone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-emerald-600 hover:underline flex items-center gap-1 font-medium"
                          >
                            <MessageCircle className="w-3 h-3" />
                            {order.customerPhone}
                          </a>
                        </td>
                        <td className="p-3.5 max-w-[200px]">
                          <span className="text-slate-800 line-clamp-2">
                            {order.customerAddress}, {order.city}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {order.shippingMethod}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <ul className="space-y-0.5 text-[11px]">
                            {order.items.map((it, idx) => (
                              <li key={idx} className="truncate max-w-[220px]">
                                {it.quantity}x {it.productName}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-slate-900 block">
                            Rp {order.totalAmount.toLocaleString('id-ID')}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {order.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateOrderStatus(order.id, e.target.value as any)
                            }
                            className="text-xs font-semibold rounded-lg px-2 py-1 border border-slate-300 bg-white"
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="DIPROSES">DIPROSES</option>
                            <option value="DIKIRIM">DIKIRIM</option>
                            <option value="SELESAI">SELESAI</option>
                            <option value="BATAL">BATAL</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: KELOLA ARTIKEL */}
      {activeTab === 'articles' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-slate-900 text-base">Artikel Edukasi SEO</h2>
              <p className="text-xs text-slate-500">
                Artikel membantu meningkatkan rangking pencarian Google untuk kata kunci
                perabot dan alat kebersihan Depok.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((art) => (
              <div
                key={art.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 flex gap-4 items-start justify-between"
              >
                <div className="flex gap-3">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#014DE6] uppercase">
                      {art.category}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-2">
                      {art.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {art.date} • {art.author}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm(`Hapus artikel "${art.title}"?`)) {
                      deleteArticle(art.id);
                    }
                  }}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PENGATURAN TOKO & BRAND */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs max-w-3xl space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Pengaturan Toko & Identitas Brand
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Data ini disinkronkan ke seluruh bagian website, logo, footer, dan pesan otomatis
              WhatsApp.
            </p>
          </div>

          {/* Official Brand Logo Preview */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6">
            <Logo variant="badge" size="md" />
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0050EE] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                Logo Resmi RIZQAL BAROKAH
              </span>
              <p className="text-xs text-slate-600 font-medium">
                Logo resmi dengan warna latar Biru Royal, inisial kaligrafi <em>RB</em>, nama toko <strong>RIZQAL BAROKAH</strong>, dan sub-teks <em>PERALATAN RUMAH TANGGA</em>.
              </p>
              <p className="text-[11px] text-slate-400">
                Identitas visual baku tanpa mengubah proporsi bentuk dan jenis font.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Brand Toko
                </label>
                <input
                  type="text"
                  value={settingsForm.storeName}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, storeName: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tagline Brand
                </label>
                <input
                  type="text"
                  value={settingsForm.tagline}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, tagline: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor WhatsApp Toko (Format: 08998595979)
                </label>
                <input
                  type="text"
                  value={settingsForm.whatsapp}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, whatsapp: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Toko
                </label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, email: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alamat Fisik Showroom di Depok
              </label>
              <textarea
                rows={2}
                value={settingsForm.address}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, address: e.target.value })
                }
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jam Operasional
                </label>
                <input
                  type="text"
                  value={settingsForm.operatingHours}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, operatingHours: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pemilik Usaha
                </label>
                <input
                  type="text"
                  value={settingsForm.ownerName}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, ownerName: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pengumuman di Top Bar Atas
              </label>
              <input
                type="text"
                value={settingsForm.topBarAnnouncement}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    topBarAnnouncement: e.target.value,
                  })
                }
                className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#014DE6] focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="bg-[#014DE6] hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Simpan Perubahan Pengaturan</span>
              </button>
              {settingsSaved && (
                <span className="text-xs text-emerald-600 font-bold">
                  ✓ Pengaturan berhasil disimpan!
                </span>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Modal Add / Edit Product */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 space-y-4 my-auto border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                {editingProductId ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nama Produk *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.name || ''}
                  onChange={(e) =>
                    setProductForm({ ...productForm, name: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Kategori
                  </label>
                  <input
                    type="text"
                    value={productForm.category || ''}
                    onChange={(e) =>
                      setProductForm({ ...productForm, category: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Brand</label>
                  <input
                    type="text"
                    value={productForm.brand || ''}
                    onChange={(e) =>
                      setProductForm({ ...productForm, brand: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Harga Jual (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.price || ''}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Harga Coret (Rp)
                  </label>
                  <input
                    type="number"
                    value={productForm.originalPrice || ''}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        originalPrice: Number(e.target.value),
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Harga Grosir (Rp)
                  </label>
                  <input
                    type="number"
                    value={productForm.wholesalePrice || ''}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        wholesalePrice: Number(e.target.value),
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    URL Foto Produk
                  </label>
                  <input
                    type="text"
                    value={productForm.mainImage || ''}
                    onChange={(e) =>
                      setProductForm({ ...productForm, mainImage: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Stok (pcs)
                  </label>
                  <input
                    type="number"
                    value={productForm.stock || 0}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        stock: Number(e.target.value),
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Deskripsi Produk
                </label>
                <textarea
                  rows={3}
                  value={productForm.description || ''}
                  onChange={(e) =>
                    setProductForm({ ...productForm, description: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 text-slate-600 font-semibold rounded-xl hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#014DE6] text-white font-bold rounded-xl hover:bg-blue-700"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
