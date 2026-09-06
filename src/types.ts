export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  brand: string;
  sku: string;
  price: number;
  wholesalePrice?: number;
  minWholesaleQty?: number;
  originalPrice?: number;
  stock: number;
  weight: number; // in grams
  dimensions: string; // e.g. "30 x 25 x 40 cm"
  material: string;
  colors: string[];
  description: string;
  specifications: string[];
  mainImage: string;
  galleryImages: string[];
  status: 'READY' | 'PREORDER' | 'HABIS';
  isFeatured?: boolean;
  isBestSeller?: boolean;
  rating: number;
  salesCount: number;
  suitableFor: string[]; // "Cocok untuk..."
  seoTitle?: string;
  seoDescription?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  image: string;
  itemCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  city: string;
  shippingMethod: string;
  paymentMethod: string;
  notes?: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    color?: string;
  }[];
  totalAmount: number;
  status: 'Menunggu Konfirmasi' | 'Diproses' | 'Dikirim' | 'Selesai' | 'Dibatalkan';
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  summary: string;
  content: string;
  image: string;
  tags: string[];
  relatedProductIds?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  rating: number;
  comment: string;
  productPurchased?: string;
  date: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  ownerName: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  operatingHours: string;
  shopeeUrl: string;
  tokopediaUrl: string;
  tiktokShopUrl: string;
  lazadaUrl: string;
  instagram: string;
  tiktok: string;
  topBarAnnouncement: string;
  freeShippingThreshold: number;
}

export interface WholesaleInquiry {
  id: string;
  date: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  needType: string;
  quantity: string;
  notes: string;
  status: 'Baru' | 'Dihubungi' | 'Deal';
}

export interface ResellerInquiry {
  id: string;
  date: string;
  name: string;
  phone: string;
  city: string;
  experience: string;
  notes: string;
  status: 'Baru' | 'Dihubungi' | 'Aktif';
}

export type ActivePage =
  | 'home'
  | 'products'
  | 'product-detail'
  | 'about'
  | 'wholesale'
  | 'reseller'
  | 'showroom'
  | 'blog'
  | 'faq'
  | 'contact'
  | 'admin';
