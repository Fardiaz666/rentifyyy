import React, { useContext } from 'react';
import { ArrowRight } from 'lucide-react';
import { CartContext } from '../context/CartContext'; // Import Context
import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import ProductCard from '../components/ProductCard';
import ValuePropSection from '../components/ValuePropSection';
import OwnerCTA from '../components/OwnerCTA';
import Footer from '../components/Footer';
// HAPUS: import { mockProducts } from '../data/mockData';
import { motion } from 'framer-motion';

// Menerima prop 'isLoggedIn' dari App.jsx
const HomePage = ({ onPageChange, onProductClick, isLoggedIn }) => {
    // AMBIL DATA GLOBAL: allProducts
    const { addToCart, allProducts } = useContext(CartContext);

    // Filter 6 produk pertama dari daftar produk global
    const featuredProducts = allProducts.slice(0, 6);


    // Fungsi khusus saat Kategori diklik
    const handleCategoryClick = (slug) => {
        console.log("Kategori diklik:", slug);
        onPageChange('products');
    };

    // Variabel animasi untuk efek muncul satu per satu (stagger)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
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
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-white font-sans text-slate-800 selection:bg-[#14e9ff] selection:text-slate-900"
        >
            <HeroSection onPageChange={onPageChange} /> 
            
            <CategoriesSection onCategoryClick={handleCategoryClick} />
            
            <section className="py-20 container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-[#00c0d4] font-bold uppercase text-xs tracking-wider bg-[#14e9ff]/10 px-3 py-1 rounded-full">Trending Now</span>
                        <h2 className="text-3xl md:text-4xl font-black mt-3 text-slate-900">Siap Disewa di Sekitarmu</h2>
                        <p className="text-slate-500 mt-2">Barang-barang paling dicari minggu ini di Jabodetabek.</p>
                    </motion.div>
                    
                    <motion.button 
                        onClick={() => onPageChange('products')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-slate-900 border border-slate-200 px-6 py-2.5 rounded-full font-bold hover:bg-slate-50 transition text-sm cursor-pointer"
                    >
                        Lihat Semua Barang <ArrowRight size={16} />
                    </motion.button>
                </div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
                >
                    {/* Menggunakan featuredProducts dari state global */}
                    {featuredProducts.map((product) => ( 
                        <motion.div key={product.id} variants={itemVariants}>
                            <ProductCard 
                                product={product} 
                                addToCart={addToCart} 
                                onClick={onProductClick}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.8 }}
            >
                <ValuePropSection />
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6 }}
            >
                <OwnerCTA onPageChange={onPageChange} isLoggedIn={isLoggedIn} /> 
            </motion.div>
            
            <Footer />
        </motion.div>
    );
};

export default HomePage;