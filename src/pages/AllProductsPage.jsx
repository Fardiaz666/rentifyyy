import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, SlidersHorizontal, X } from 'lucide-react';

const AllProductsPage = ({ onProductClick, initialSearchTerm = '', onBack }) => {
    // Ambil data dari Context
    const context = useContext(CartContext);
    
    // Safety check: Pastikan context ada (mencegah crash jika context undefined)
    const allProducts = context?.allProducts || []; 
    const addToCart = context?.addToCart || (() => {});

    const [searchTerm, setSearchTerm] = useState(initialSearchTerm); 
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // Update search term jika props berubah
    useEffect(() => {
        setSearchTerm(initialSearchTerm);
    }, [initialSearchTerm]);

    // LOGIKA FILTER YANG DIPERBAIKI
    // Kita gunakan toLowerCase() untuk pencarian case-insensitive
    const filteredProducts = allProducts.filter(product => {
        const searchLower = searchTerm.toLowerCase();
        
        // Cek Nama Produk
        const nameMatch = product.name?.toLowerCase().includes(searchLower);
        
        // Cek Kategori (Penting untuk fitur klik kategori di Homepage)
        const categoryMatch = product.category?.toLowerCase().includes(searchLower);
        
        // Cek Lokasi
        const locationMatch = product.location?.toLowerCase().includes(searchLower);

        return nameMatch || categoryMatch || locationMatch;
    });

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-slate-50 pt-28 pb-20 font-sans text-slate-800"
        >
            <div className="container mx-auto px-6">
                
                {/* Header & Search Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
                    <div className="w-full md:w-auto">
                        <button onClick={onBack} className="flex items-center gap-1 text-slate-500 hover:text-[#14e9ff] font-bold text-sm mb-3 transition">
                            <ArrowLeft size={18} /> Kembali
                        </button>
                        <h1 className="text-3xl font-black text-slate-900 mb-1">
                            {searchTerm ? `Hasil: "${searchTerm}"` : 'Semua Koleksi'}
                        </h1>
                        <p className="text-slate-500">
                            Menampilkan {filteredProducts.length} barang
                        </p>
                    </div>
                    
                    <div className="relative w-full md:w-96 flex gap-3">
                        <div className="relative flex-1">
                            <input 
                                type="text" 
                                placeholder="Cari barang..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#14e9ff] focus:border-transparent shadow-sm transition"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            {searchTerm && (
                                <button 
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`p-3 border rounded-xl transition shadow-sm ${isFilterOpen ? 'bg-[#14e9ff] text-slate-900 border-[#14e9ff]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                        >
                            <SlidersHorizontal size={20} />
                        </button>
                    </div>
                </div>
                
                {/* Filter Section (Expandable) */}
                <motion.div 
                    initial={false}
                    animate={{ height: isFilterOpen ? 'auto' : 0, opacity: isFilterOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mb-6"
                >
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Filter Lanjutan</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <label className="block text-slate-500 mb-1 font-medium">Kategori</label>
                                <select className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:border-[#14e9ff]">
                                    <option>Semua Kategori</option>
                                    <option>Kendaraan</option>
                                    <option>Elektronik</option>
                                    <option>Pakaian</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-500 mb-1 font-medium">Lokasi</label>
                                <select className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:border-[#14e9ff]">
                                    <option>Semua Lokasi</option>
                                    <option>Jakarta Selatan</option>
                                    <option>Jakarta Pusat</option>
                                    <option>Tangerang</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-500 mb-1 font-medium">Harga Maksimum</label>
                                <input type="number" placeholder="Rp 0" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:border-[#14e9ff]" />
                            </div>
                            <div>
                                <label className="block text-slate-500 mb-1 font-medium">Urutkan</label>
                                <select className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:border-[#14e9ff]">
                                    <option>Paling Relevan</option>
                                    <option>Harga Terendah</option>
                                    <option>Harga Tertinggi</option>
                                    <option>Rating Tertinggi</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </motion.div>

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
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                            <Search size={40} />
                        </div>
                        <p className="text-slate-900 font-bold text-lg">Tidak ada barang ditemukan</p>
                        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                            Kami tidak menemukan barang dengan kata kunci "{searchTerm}". Coba gunakan kata kunci lain atau hapus filter.
                        </p>
                        <button 
                            onClick={handleClearSearch}
                            className="mt-6 text-[#14e9ff] font-bold hover:underline"
                        >
                            Lihat Semua Barang
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default AllProductsPage;
