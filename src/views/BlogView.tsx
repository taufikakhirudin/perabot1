import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BlogArticle } from '../types';
import {
  BookOpen,
  Calendar,
  User,
  Clock,
  ArrowRight,
  X,
  Share2,
  Check,
  Tag,
  Sparkles,
} from 'lucide-react';

export const BlogView: React.FC = () => {
  const { articles, setActivePage, setSelectedProduct, products } = useStore();
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [copied, setCopied] = useState(false);

  const categories = [
    'Semua',
    'Tips & Trik',
    'Panduan Memilih',
    'Edukasi Material',
    'Organisasi Rumah',
    'Pengadaan Instansi',
  ];

  const filteredArticles =
    selectedCategory === 'Semua'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 font-sans">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#014DE6] to-blue-700 rounded-3xl p-6 sm:p-10 text-white shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-blue-100 text-xs font-bold px-3 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            <span>PUSAT EDUKASI & TIPS RUMAH TANGGA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Tips, Panduan & Edukasi Perabot Berkualitas
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
            Temukan panduan praktis merawat alat kebersihan, memilih plastik food grade yang
            aman, serta tips menata rumah rapi dan higienis dari tim RIZQAL BAROKAH.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs font-semibold px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#014DE6] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <article
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#014DE6] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
          >
            <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
              <img
                src={art.image}
                alt={art.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#014DE6] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs">
                {art.category}
              </span>
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {art.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {art.readTime} baca
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-[#014DE6] transition-colors leading-snug line-clamp-2">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#014DE6] group-hover:underline flex items-center gap-1">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] text-slate-400">{art.author}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 shrink-0">
              <span className="text-xs font-bold text-[#014DE6] uppercase tracking-wider">
                {selectedArticle.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 text-slate-500 hover:text-[#014DE6] rounded-full hover:bg-white"
                  title="Bagikan Artikel"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
              {/* Featured Image */}
              <div className="aspect-16/9 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Metadata */}
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-3">
                  {selectedArticle.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <User className="w-3.5 h-3.5 text-[#014DE6]" />
                    {selectedArticle.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {selectedArticle.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {selectedArticle.readTime}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-sm max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-line">
                {selectedArticle.content}
              </div>

              {/* SEO Tags */}
              {selectedArticle.tags && (
                <div className="pt-4 border-t border-slate-200">
                  <span className="text-xs font-bold text-slate-700 block mb-2">
                    Topik Terkait:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedArticle.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA footer inside article */}
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    Ingin Membeli Produk Terkait Artikel Ini?
                  </h4>
                  <p className="text-xs text-slate-600">
                    Kunjungi katalog resmi RIZQAL BAROKAH dengan harga bersahabat dan stok ready.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    setActivePage('products');
                  }}
                  className="bg-[#014DE6] hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-5 rounded-xl shrink-0"
                >
                  Lihat Katalog Produk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
