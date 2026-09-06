import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  ProductCategory,
  CartItem,
  Order,
  BlogArticle,
  Testimonial,
  StoreSettings,
  ActivePage,
} from '../types';
import {
  initialProducts,
  productCategories,
  initialStoreSettings,
  blogArticles as defaultBlogArticles,
  initialTestimonials,
} from '../data/initialData';

interface StoreContextType {
  products: Product[];
  categories: ProductCategory[];
  settings: StoreSettings;
  cart: CartItem[];
  orders: Order[];
  articles: BlogArticle[];
  testimonials: Testimonial[];
  activePage: ActivePage;
  selectedCategory: string | null;
  selectedProduct: Product | null;
  selectedArticle: BlogArticle | null;
  searchQuery: string;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  
  // Navigation & View actions
  setActivePage: (page: ActivePage) => void;
  setSelectedCategory: (categorySlug: string | null) => void;
  setSelectedProduct: (product: Product | null) => void;
  setSelectedArticle: (article: BlogArticle | null) => void;
  setSearchQuery: (query: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  
  // Cart actions
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;

  // Order actions
  createOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    city: string;
    shippingMethod: string;
    paymentMethod: string;
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Admin CMS actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  addArticle: (article: Omit<BlogArticle, 'id'>) => void;
  updateArticle: (id: string, article: Partial<BlogArticle>) => void;
  deleteArticle: (id: string) => void;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;
  resetToDefaults: () => void;

  // Helpers
  getWhatsAppUrl: (message: string) => string;
  openWhatsAppChat: (message?: string) => void;
  openProductWhatsApp: (product: Product) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial states from localStorage if available
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('rb_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('rb_settings');
      return saved ? JSON.parse(saved) : initialStoreSettings;
    } catch {
      return initialStoreSettings;
    }
  });

  const [articles, setArticles] = useState<BlogArticle[]>(() => {
    try {
      const saved = localStorage.getItem('rb_articles');
      return saved ? JSON.parse(saved) : defaultBlogArticles;
    } catch {
      return defaultBlogArticles;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('rb_testimonials');
      return saved ? JSON.parse(saved) : initialTestimonials;
    } catch {
      return initialTestimonials;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('rb_orders');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'ORD-20260901-001',
              date: '01 Sep 2026, 14:20 WIB',
              customerName: 'Siti Rahmawati',
              customerPhone: '081298765432',
              customerAddress: 'Jl. Margonda Raya No. 45, Beji',
              city: 'Depok',
              shippingMethod: 'Kurir Instan Depok (Gojek/Grab)',
              paymentMethod: 'Transfer Bank BCA',
              notes: 'Mohon dicek kembali kain pel cadangannya ya kak.',
              items: [
                {
                  productId: 'prod-1',
                  productName: 'Spin Mop 360 Alat Pel Putar Otomatis Stainless Steel',
                  price: 135000,
                  quantity: 1,
                  color: 'Biru Royal',
                },
                {
                  productId: 'prod-2',
                  productName: 'Ember Plastik Tebal 20 Liter Gagang Besi Anti-Pecah',
                  price: 38000,
                  quantity: 2,
                  color: 'Biru RB',
                },
              ],
              totalAmount: 211000,
              status: 'Diproses',
            },
            {
              id: 'ORD-20260830-002',
              date: '30 Agu 2026, 10:15 WIB',
              customerName: 'Heri Susanto (SDN Bojongsari 02)',
              customerPhone: '085711223344',
              customerAddress: 'Jl. Raya Bojongsari No. 12',
              city: 'Depok',
              shippingMethod: 'Kurir Toko RIZQAL BAROKAH (Gratis)',
              paymentMethod: 'COD / Bayar di Tempat',
              notes: 'Untuk pengadaan sekolah, mohon nota cap basah toko.',
              items: [
                {
                  productId: 'prod-8',
                  productName: 'Paket Hemat Pengadaan Alat Kebersihan Kantor & Sekolah',
                  price: 345000,
                  quantity: 2,
                  color: 'Standar Biru',
                },
              ],
              totalAmount: 690000,
              status: 'Selesai',
            },
          ];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rb_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('rb_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rb_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('rb_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('rb_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('rb_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('rb_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  // Cart calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => {
    // If quantity meets wholesale threshold and product has wholesale price, use wholesale price!
    const effectivePrice =
      item.product.wholesalePrice &&
      item.product.minWholesaleQty &&
      item.quantity >= item.product.minWholesaleQty
        ? item.product.wholesalePrice
        : item.product.price;
    return total + effectivePrice * item.quantity;
  }, 0);

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          (selectedColor ? item.selectedColor === selectedColor : true)
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            quantity,
            selectedColor: selectedColor || (product.colors.length > 0 ? product.colors[0] : undefined),
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor))
      )
    );
  };

  const updateCartQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && (!selectedColor || item.selectedColor === selectedColor)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Order creation
  const createOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    city: string;
    shippingMethod: string;
    paymentMethod: string;
    notes?: string;
  }): Order => {
    const orderNumber = `RB-${Date.now().toString().slice(-6)}`;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })}, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

    const items = cart.map((item) => {
      const isWholesale =
        item.product.wholesalePrice &&
        item.product.minWholesaleQty &&
        item.quantity >= item.product.minWholesaleQty;
      const price = isWholesale ? item.product.wholesalePrice! : item.product.price;

      return {
        productId: item.product.id,
        productName: item.product.name,
        price,
        quantity: item.quantity,
        color: item.selectedColor,
      };
    });

    const newOrder: Order = {
      id: orderNumber,
      date: formattedDate,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerAddress: orderData.customerAddress,
      city: orderData.city,
      shippingMethod: orderData.shippingMethod,
      paymentMethod: orderData.paymentMethod,
      notes: orderData.notes,
      items,
      totalAmount: cartTotal,
      status: 'Menunggu Konfirmasi',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // Admin CMS CRUD Operations
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id: newId,
      sku: newProdData.sku || `RB-${Date.now().toString().slice(-4)}`,
      rating: newProdData.rating || 5.0,
      salesCount: newProdData.salesCount || 0,
      suitableFor: newProdData.suitableFor || ['Keluarga', 'Rumah Tangga'],
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const addArticle = (artData: Omit<BlogArticle, 'id'>) => {
    const newId = `art-${Date.now()}`;
    const newArt: BlogArticle = { ...artData, id: newId };
    setArticles((prev) => [newArt, ...prev]);
  };

  const updateArticle = (id: string, updatedFields: Partial<BlogArticle>) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updatedFields } : a))
    );
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const addTestimonial = (testData: Omit<Testimonial, 'id'>) => {
    const newTest: Testimonial = { ...testData, id: `test-${Date.now()}` };
    setTestimonials((prev) => [newTest, ...prev]);
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const resetToDefaults = () => {
    setProducts(initialProducts);
    setSettings(initialStoreSettings);
    setArticles(defaultBlogArticles);
    setTestimonials(initialTestimonials);
    localStorage.removeItem('rb_products');
    localStorage.removeItem('rb_settings');
    localStorage.removeItem('rb_articles');
    localStorage.removeItem('rb_testimonials');
    localStorage.removeItem('rb_orders');
  };

  // WhatsApp Helpers
  const getWhatsAppUrl = (message: string) => {
    const cleanPhone = settings.whatsapp.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.startsWith('0')
      ? '62' + cleanPhone.slice(1)
      : cleanPhone;
    return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(message)}`;
  };

  const openWhatsAppChat = (
    message = 'Halo RIZQAL BAROKAH, saya ingin bertanya tentang perabot dan alat kebersihan.'
  ) => {
    const url = getWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openProductWhatsApp = (product: Product) => {
    const msg = `Halo RIZQAL BAROKAH, saya tertarik dengan produk:\n*${product.name}*\n(SKU: ${product.sku} - Rp${product.price.toLocaleString('id-ID')}).\nMohon informasi ketersediaan stok dan opsi pengiriman. Terima kasih!`;
    openWhatsAppChat(msg);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories: productCategories,
        settings,
        cart,
        orders,
        articles,
        testimonials,
        activePage,
        selectedCategory,
        selectedProduct,
        selectedArticle,
        searchQuery,
        isCartOpen,
        isCheckoutOpen,
        setActivePage,
        setSelectedCategory,
        setSelectedProduct,
        setSelectedArticle,
        setSearchQuery,
        setIsCartOpen,
        setIsCheckoutOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartTotal,
        createOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        updateSettings,
        addArticle,
        updateArticle,
        deleteArticle,
        addTestimonial,
        deleteTestimonial,
        resetToDefaults,
        getWhatsAppUrl,
        openWhatsAppChat,
        openProductWhatsApp,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
