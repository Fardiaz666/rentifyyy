import React, { useContext } from 'react';
import { ArrowRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import ProductCard from '../components/ProductCard';
import ValuePropSection from '../components/ValuePropSection';
import OwnerCTA from '../components/OwnerCTA';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const HomePage = ({ onPageChange, onProductClick, isLoggedIn }) => {
    // Ambil data produk global dari Context
    const { allProducts, addToCart } = useContext(CartContext);

    // Ambil 6 produk pertama untuk ditampilkan di Home
    const featuredProducts = (allProducts || []).slice(0, 6);

    // Fungsi saat Kategori diklik
    const handleCategoryClick = (categoryName) => {
        console.log("Kategori diklik:", categoryName);
        // Arahkan ke halaman 'products' (Katalog) DAN kirim nama kategori sebagai kata kunci pencarian
        onPageChange('products', categoryName);
    };

    // Variabel animasi stagger
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1 // Jeda 0.1 detik antar item
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <motion.div 
            // Animasi Halaman Masuk/Keluar
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            // UPDATE: Ganti warna seleksi teks menjadi biru baru #016ff8
            className="min-h-screen bg-white font-sans text-slate-800 selection:bg-[#016ff8] selection:text-white"
        >
            {/* Bagian Hero (Search Bar Fungsional) */}
            <HeroSection onPageChange={onPageChange} /> 
            
            {/* Bagian Kategori - Sekarang Interaktif! */}
            <CategoriesSection onCategoryClick={handleCategoryClick} />
            
            {/* Bagian Produk Trending */}
            <section className="py-20 container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* UPDATE: Ganti warna aksen teks dan background badge */}
                        <span className="text-[#016ff8] font-bold uppercase text-xs tracking-wider bg-[#016ff8]/10 px-3 py-1 rounded-full">Trending Now</span>
                        <h2 className="text-3xl md:text-4xl font-black mt-3 text-slate-900">Siap Disewa di Sekitarmu</h2>
                        <p className="text-slate-500 mt-2">Barang-barang paling dicari minggu ini di Jabodetabek.</p>
                    </motion.div>
                    
                    {/* Tombol ke Halaman Katalog (All Products) */}
                    <motion.button 
                        onClick={() => onPageChange('products')} // Navigasi ke halaman 'products'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-slate-900 border border-slate-200 px-6 py-2.5 rounded-full font-bold hover:bg-slate-50 transition text-sm cursor-pointer"
                    >
                        Lihat Semua Barang <ArrowRight size={16} />
                    </motion.button>
                </div>

                {/* Grid Produk dengan Animasi Stagger */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
                >
                    {/* Menggunakan featuredProducts yang diambil dari Context */}
                    {featuredProducts.map((product) => (
                        <motion.div key={product.id} variants={itemVariants}>
                            <ProductCard 
                                product={product} 
                                addToCart={addToCart} 
                                onClick={onProductClick} // Klik produk ke detail
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Bagian Value Proposition */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.8 }}
            >
                <ValuePropSection />
            </motion.div>
            
            {/* Bagian Ajakan Menjadi Penjual */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6 }}
            >
                {/* PENTING: Kirim status isLoggedIn ke OwnerCTA agar tombolnya pintar */}
                <OwnerCTA onPageChange={onPageChange} isLoggedIn={isLoggedIn} /> 
            </motion.div>
            
            <Footer />
        </motion.div>
    );
};

export default HomePage;
