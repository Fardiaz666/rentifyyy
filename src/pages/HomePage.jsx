import React, { useContext } from 'react';
import { ArrowRight, Search, Zap, Star, ShieldCheck, Heart } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import OwnerCTA from '../components/OwnerCTA';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

// Komponen Kategori dengan Gaya Unik
const CategoryPill = ({ icon: Icon, label, onClick }) => (
    <motion.button 
        onClick={onClick}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-lg shadow-slate-100 border border-slate-50 hover:border-[#016ff8]/30 hover:shadow-[#016ff8]/10 transition-all duration-300 w-32 h-32 md:w-40 md:h-40 group relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#016ff8]/5 rounded-bl-[50px] -mr-4 -mt-4 transition-all group-hover:bg-[#016ff8] group-hover:scale-[10]"></div>
        <div className="relative z-10 p-3 bg-slate-50 rounded-2xl text-[#016ff8] group-hover:bg-white group-hover:text-[#016ff8] mb-3 shadow-sm">
            <Icon size={28} />
        </div>
        <span className="relative z-10 text-xs md:text-sm font-bold text-slate-600 group-hover:text-white text-center leading-tight">
            {label}
        </span>
    </motion.button>
);

const HomePage = ({ onPageChange, onProductClick, isLoggedIn }) => {
    const { allProducts, addToCart } = useContext(CartContext);
    const featuredProducts = (allProducts || []).slice(0, 6);

    const handleCategoryClick = (categoryName) => {
        onPageChange('products', categoryName);
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 selection:bg-[#016ff8] selection:text-white overflow-x-hidden"
        >
            {/* --- HERO SECTION YANG LEBIH FRESH --- */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-[#016ff8]/20 to-purple-200/20 rounded-full blur-[100px] -z-10"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[80px] -z-10"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                        {/* Kiri: Teks & Search */}
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
                                    Sewa Barang <br/>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#016ff8] to-purple-600">Tanpa Batas.</span>
                                </h1>
                                <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed font-medium">
                                    Kenapa beli kalau bisa sewa? Temukan ribuan barang unik, mulai dari kamera pro hingga alat camping, langsung dari pemilik di sekitarmu.
                                </p>
                                
                                {/* Search Bar Modern */}
                                <div className="relative max-w-lg mx-auto md:mx-0 group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#016ff8] to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                                    <div className="relative bg-white p-2 rounded-2xl shadow-xl flex items-center">
                                        <div className="pl-4 text-slate-400">
                                            <Search size={24} />
                                        </div>
                                        <input 
                                            type="text" 
                                            placeholder="Cari kamera, tenda, atau kost..." 
                                            className="w-full py-4 px-4 text-slate-800 font-medium bg-transparent border-none focus:ring-0 placeholder:text-slate-400"
                                            onKeyPress={(e) => e.key === 'Enter' && onPageChange('products', e.target.value)}
                                        />
                                        <button 
                                            onClick={() => onPageChange('products')}
                                            className="bg-[#016ff8] text-white p-4 rounded-xl hover:bg-[#005bb5] transition shadow-lg shadow-blue-500/30"
                                        >
                                            <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="mt-8 flex items-center justify-center md:justify-start gap-6 text-sm font-bold text-slate-400">
                                    <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-green-500" /> Verifikasi Aman</span>
                                    <span className="flex items-center gap-2"><Zap size={16} className="text-yellow-500" /> Proses Cepat</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Kanan: Visual Dinamis (Grid Foto) */}
                        <div className="w-full md:w-1/2 relative hidden md:block">
                            <motion.div 
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="grid grid-cols-2 gap-4"
                            >
                                <div className="space-y-4 mt-8">
                                    <div className="h-64 rounded-[2rem] overflow-hidden shadow-2xl relative group">
                                        <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600" alt="Kamera" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                            <p className="text-white font-bold">Kamera & Lensa</p>
                                        </div>
                                    </div>
                                    <div className="h-48 rounded-[2rem] overflow-hidden shadow-2xl relative group bg-slate-100">
                                        <img src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600" alt="Stroller" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-48 rounded-[2rem] overflow-hidden shadow-2xl relative group bg-slate-100">
                                        <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600" alt="Motor" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                    </div>
                                    <div className="h-64 rounded-[2rem] overflow-hidden shadow-2xl relative group">
                                        <img src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=600" alt="Gadget" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                            <p className="text-white font-bold">Gadget Terkini</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- KATEGORI UNIK --- */}
            <section className="py-10 container mx-auto px-6 relative z-20">
                <div className="flex flex-wrap justify-center gap-6">
                    {/* Menggunakan data kategori asli tapi dengan tampilan baru */}
                    {['Momen', 'Hunian', 'Acara', 'Kendaraan', 'Bayi', 'Kreator'].map((cat, idx) => {
                        // Mapping ikon manual untuk tampilan ini (atau import dari mockData)
                        const icons = [Star, Home, Zap, ArrowRight, Heart, Search]; // Placeholder icons
                        const Icon = icons[idx] || Star;
                        
                        return (
                            <CategoryPill 
                                key={idx} 
                                icon={Icon} 
                                label={cat} 
                                onClick={() => handleCategoryClick(cat)} 
                            />
                        );
                    })}
                </div>
            </section>
            
            {/* --- TRENDING PRODUCTS (Stagger Animation) --- */}
            <section className="py-20 container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">🔥 Sedang Hype</h2>
                        <p className="text-slate-500">Barang paling banyak dicari minggu ini di sekitarmu.</p>
                    </div>
                    <button 
                        onClick={() => onPageChange('products')}
                        className="px-6 py-3 rounded-full border-2 border-slate-200 font-bold text-slate-600 hover:border-[#016ff8] hover:text-[#016ff8] transition flex items-center gap-2"
                    >
                        Lihat Semua <ArrowRight size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProductCard 
                                product={product} 
                                addToCart={addToCart} 
                                onClick={onProductClick}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- FEATURE SECTION (Minimalis) --- */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#016ff8] rounded-full blur-[120px] opacity-40"></div>
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-40"></div>
                        
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                                Mulai Hasilkan Uang dari <br/> Barang Nganggurmu.
                            </h2>
                            <p className="text-slate-300 text-lg mb-10">
                                Punya kamera, tenda, atau perlengkapan bayi yang jarang dipakai? Sewakan di Rentify dan dapatkan penghasilan tambahan dengan aman.
                            </p>
                            <button 
                                onClick={() => isLoggedIn ? onPageChange('seller') : onPageChange('auth')}
                                className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-[#016ff8] hover:text-white transition shadow-[0_0_40px_rgba(255,255,255,0.3)] transform hover:scale-105 duration-300"
                            >
                                {isLoggedIn ? 'Masuk Dashboard Penjual' : 'Mulai Menyewakan Sekarang'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            
            <Footer />
        </motion.div>
    );
};

export default HomePage;
