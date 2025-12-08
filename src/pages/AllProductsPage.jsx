import React, { useContext, useState, useEffect } from 'react';
// HAPUS: import { mockProducts } from '../data/mockData';
import { CartContext } from '../context/CartContext'; // PENTING: Import Context
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { Search, ArrowLeft } from 'lucide-react';

const AllProductsPage = ({ onProductClick, initialSearchTerm = '', onBack }) => {
    // PENTING: Ambil allProducts dari Context
    const { addToCart, allProducts } = useContext(CartContext); 
    
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm); 
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    useEffect(() => {
        setSearchTerm(initialSearchTerm);
    }, [initialSearchTerm]);

    // Filter produk berdasarkan pencarian
    const filteredProducts = allProducts.filter(product => // Gunakan allProducts
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-slate-50 pt-28 pb-20 font-sans text-slate-800"
        >
            <div className="container mx-auto px-6">
                
                {/* Header & Search Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-6">
                    <div>
                        <button onClick={onBack} className="flex items-center gap-1 text-slate-500 hover:text-slate-900 text-sm mb-2">
                            <ArrowLeft size={16} /> Kembali
                        </button>
                        <h1 className="text-3xl font-black text-slate-900 mb-1">Semua Koleksi</h1>
                        <p className="text-slate-500">Ditemukan {filteredProducts.length} dari {allProducts.length} barang siap sewa.</p>
                    </div>
                    
                    <div className="relative w-full md:w-96 flex gap-3">
                        <input 
                            type="text" 
                            placeholder="Cari motor, kamera, kosan..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#14e9ff] focus:border-transparent shadow-sm"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition shadow-sm"
                        >
                            <SlidersHorizontal size={20} />
                        </button>
                    </div>
                </div>
                
                {/* Filter Section (Simulasi) */}
                {isFilterOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md mb-8 overflow-hidden"
                    >
                        <h3 className="font-bold text-slate-900 mb-3">Filter Lanjutan</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <select className="p-2 border border-slate-200 rounded-lg">
                                <option>Semua Kategori</option>
                                <option>Kendaraan</option>
                                <option>Elektronik</option>
                            </select>
                            <select className="p-2 border border-slate-200 rounded-lg">
                                <option>Semua Lokasi</option>
                                <option>Jakarta Selatan</option>
                                <option>Tangerang</option>
                            </select>
                            <input type="number" placeholder="Harga Maks (Rp)" className="p-2 border border-slate-200 rounded-lg" />
                            <input type="date" className="p-2 border border-slate-200 rounded-lg" />
                        </div>
                    </motion.div>
                )}


                {/* Grid Produk */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                addToCart={addToCart} 
                                onClick={onProductClick} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-slate-200">
                        <p className="text-slate-400 text-lg">Maaf, barang dengan kata kunci "{searchTerm}" tidak ditemukan.</p>
                        <p className="text-sm text-slate-400 mt-2">Coba kata kunci yang lebih umum atau periksa kembali ejaan.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default AllProductsPage;