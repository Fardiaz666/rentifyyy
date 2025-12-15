import React, { useContext, useState, useCallback, useMemo } from 'react';
import { ArrowRight, Search, Zap, Star, ShieldCheck, Heart, Home, Camera, Baby, Users } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import OwnerCTA from '../components/OwnerCTA';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

// ============================================
// CONSTANTS - Centralized Configuration
// ============================================
const FEATURED_PRODUCTS_LIMIT = 6;

const CATEGORIES = [
    { name: 'Momen & Perayaan', icon: Star },
    { name: 'Rumah & Hunian', icon: Home },
    { name: 'Acara & Keluarga', icon: Users },
    { name: 'Perjalanan & Kendaraan', icon: Zap },
    { name: 'Bayi & Si Kecil', icon: Baby },
    { name: 'Studio Kreator', icon: Camera }
];

const HERO_IMAGES = [
    { 
        url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600',
        alt: 'Kamera DSLR profesional untuk disewa',
        height: 'h-64'
    },
    { 
        url: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&q=80&w=600',
        alt: 'Stroller bayi premium',
        height: 'h-48'
    },
    { 
        url: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=600',
        alt: 'Motor untuk perjalanan',
        height: 'h-48'
    },
    { 
        url: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&q=80&w=600',
        alt: 'Gadget dan elektronik',
        height: 'h-64'
    }
];

const ANIMATION_CONFIG = {
    stagger: 0.1,
    duration: 0.5,
    heroDelay: 0.2
};

// ============================================
// COMPONENTS
// ============================================

// CategoryPill Component - Improved with better accessibility
const CategoryPill = ({ icon: Icon, label, onClick }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-lg shadow-slate-100 border border-slate-50 hover:border-[#016ff8]/30 hover:shadow-[#016ff8]/10 transition-all duration-300 w-32 h-32 md:w-40 md:h-40 group relative overflow-hidden cursor-pointer"
        aria-label={`Lihat kategori ${label}`}
    >
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#016ff8]/5 rounded-bl-[50px] -mr-4 -mt-4 transition-all group-hover:bg-[#016ff8] group-hover:scale-[10]"></div>
        <div className="relative z-10 p-3 bg-slate-50 rounded-2xl text-[#016ff8] group-hover:bg-white group-hover:text-[#016ff8] mb-3 shadow-sm">
            <Icon size={28} aria-hidden="true" />
        </div>
        <span className="relative z-10 text-xs md:text-sm font-bold text-slate-600 group-hover:text-white text-center leading-tight">
            {label}
        </span>
    </motion.button>
);

// SearchBar Component - Extracted for better organization
const SearchBar = ({ onSearch, onNavigate }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = useCallback(() => {
        if (onSearch) {
            onSearch(searchValue);
        }
    }, [searchValue, onSearch]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }, [handleSearch]);

    return (
        <div className="relative max-w-lg mx-auto md:mx-0 group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#016ff8] to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-white p-2 rounded-2xl shadow-xl flex items-center">
                <label htmlFor="search-input" className="sr-only">Cari produk untuk disewa</label>
                <div className="pl-4 text-slate-400" aria-hidden="true">
                    <Search size={24} />
                </div>
                <input
                    id="search-input"
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Cari kamera, tenda, atau kost..."
                    className="w-full py-4 px-4 text-slate-800 font-medium bg-transparent border-none focus:ring-0 placeholder:text-slate-400 focus:outline-none"
                    aria-label="Cari produk"
                />
                <button
                    onClick={handleSearch}
                    className="bg-[#016ff8] text-white p-4 rounded-xl hover:bg-[#005bb5] transition shadow-lg shadow-blue-500/30"
                    aria-label="Cari produk"
                >
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

// HeroImageGrid Component - Extracted for cleaner code
const HeroImageGrid = () => (
    <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: ANIMATION_CONFIG.heroDelay }}
        className="grid grid-cols-2 gap-4"
    >
        <div className="space-y-4 mt-8">
            {HERO_IMAGES.slice(0, 2).map((img, idx) => (
                <div key={idx} className={`${img.height} rounded-[2rem] overflow-hidden shadow-2xl relative group bg-slate-200`}>
                    <img
                        src={img.url}
                        alt={img.alt}
                        loading={idx === 0 ? "eager" : "lazy"}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                </div>
            ))}
        </div>
        <div className="space-y-4">
            {HERO_IMAGES.slice(2, 4).map((img, idx) => (
                <div key={idx} className={`${img.height} rounded-[2rem] overflow-hidden shadow-2xl relative group bg-slate-200`}>
                    <img
                        src={img.url}
                        alt={img.alt}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                </div>
            ))}
        </div>
    </motion.div>
);

// ============================================
// MAIN COMPONENT
// ============================================

const HomePage = ({ onPageChange, onProductClick, isLoggedIn }) => {
    // Context with proper error handling
    const contextData = useContext(CartContext);

    // Memoized values to prevent unnecessary recalculations
    const allProducts = useMemo(() => contextData?.allProducts || [], [contextData]);
    const addToCart = useMemo(() => contextData?.addToCart || (() => {}), [contextData]);
    const featuredProducts = useMemo(
        () => allProducts.slice(0, FEATURED_PRODUCTS_LIMIT),
        [allProducts]
    );

    // Handlers
    const handleCategoryClick = useCallback((categoryName) => {
        if (onPageChange) {
            onPageChange('products', categoryName);
        }
    }, [onPageChange]);

    const handleSearch = useCallback((searchTerm) => {
        if (onPageChange) {
            onPageChange('products', searchTerm);
        }
    }, [onPageChange]);

    const handleViewAll = useCallback(() => {
        if (onPageChange) {
            onPageChange('products');
        }
    }, [onPageChange]);

    // Loading state
    if (!contextData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#016ff8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 font-medium">Memuat produk...</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 selection:bg-[#016ff8] selection:text-white overflow-x-hidden"
        >
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-[#016ff8]/20 to-purple-200/20 rounded-full blur-[100px] -z-10"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[80px] -z-10"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                        {/* Left: Text & Search */}
                        <div className="w-full md:w-1/2 text-center md:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-block py-1.5 px-4 rounded-full bg-white border border-slate-200 text-[#016ff8] text-xs font-extrabold tracking-wide mb-6 shadow-sm">
                                    🚀 #1 Rental Marketplace di Jabodetabek
                                </span>
                                <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
                                    Sewa Barang <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#016ff8] to-purple-600">Tanpa Batas.</span>
                                </h1>
                                <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed font-medium">
                                    Kenapa beli kalau bisa sewa? Temukan ribuan barang unik, mulai dari kamera pro hingga alat camping, langsung dari pemilik di sekitarmu.
                                </p>

                                <SearchBar onSearch={handleSearch} onNavigate={onPageChange} />

                                <div className="mt-8 flex items-center justify-center md:justify-start gap-6 text-sm font-bold text-slate-400">
                                    <span className="flex items-center gap-2">
                                        <ShieldCheck size={16} className="text-green-500" aria-hidden="true" /> 
                                        Verifikasi Aman
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Zap size={16} className="text-yellow-500" aria-hidden="true" /> 
                                        Proses Cepat
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: Visual Grid */}
                        <div className="w-full md:w-1/2 relative hidden md:block">
                            <HeroImageGrid />
                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORIES SECTION */}
            <section className="py-10 container mx-auto px-6 relative z-20">
                <div className="flex flex-wrap justify-center gap-6">
                    {CATEGORIES.map((category, idx) => (
                        <CategoryPill
                            key={idx}
                            icon={category.icon}
                            label={category.name}
                            onClick={() => handleCategoryClick(category.name)}
                        />
                    ))}
                </div>
            </section>

            {/* TRENDING PRODUCTS SECTION */}
            <section className="py-20 container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">🔥 Sedang Hype</h2>
                        <p className="text-slate-500">Barang paling banyak dicari minggu ini di sekitarmu.</p>
                    </div>
                    <button
                        onClick={handleViewAll}
                        className="px-6 py-3 rounded-full border-2 border-slate-200 font-bold text-slate-600 hover:border-[#016ff8] hover:text-[#016ff8] transition flex items-center gap-2"
                        aria-label="Lihat semua produk"
                    >
                        Lihat Semua <ArrowRight size={18} />
                    </button>
                </div>

                {featuredProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">Belum ada produk tersedia saat ini.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: ANIMATION_CONFIG.duration,
                                    delay: index * ANIMATION_CONFIG.stagger
                                }}
                            >
                                <ProductCard
                                    product={product}
                                    addToCart={addToCart}
                                    onClick={onProductClick}
                                />
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* OWNER CTA SECTION */}
            <div className="py-10">
                <OwnerCTA onPageChange={onPageChange} isLoggedIn={isLoggedIn} />
            </div>

            <Footer />
        </motion.div>
    );
};

export default HomePage;
