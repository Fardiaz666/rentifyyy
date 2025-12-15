import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowLeft, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

// ============================================
// CONSTANTS
// ============================================
const ITEMS_PER_PAGE = 12;

const CATEGORIES = [
    'Semua Kategori',
    'Momen & Perayaan',
    'Rumah & Hunian',
    'Acara & Keluarga',
    'Perjalanan & Kendaraan',
    'Bayi & Si Kecil',
    'Studio Kreator'
];

const LOCATIONS = [
    'Semua Lokasi',
    'Jakarta Selatan',
    'Jakarta Pusat',
    'Jakarta Utara',
    'Jakarta Barat',
    'Jakarta Timur',
    'Tangerang',
    'Bekasi',
    'Depok',
    'Bogor'
];

const SORT_OPTIONS = [
    { id: 'relevance', label: 'Paling Relevan' },
    { id: 'price-asc', label: 'Harga Terendah' },
    { id: 'price-desc', label: 'Harga Tertinggi' },
    { id: 'rating', label: 'Rating Tertinggi' },
    { id: 'newest', label: 'Terbaru' }
];

// ============================================
// PAGINATION COMPONENT
// ============================================
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
        const pages = [];
        
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        // Always show first page
        pages.push(1);

        if (currentPage > 3) {
            pages.push('...');
        }

        // Show pages around current
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 2) {
            pages.push('...');
        }

        // Always show last page
        pages.push(totalPages);

        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex items-center justify-center gap-2 mt-12">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg font-bold text-slate-600 hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition border border-slate-200"
            >
                Previous
            </button>

            {visiblePages.map((page, idx) => (
                page === '...' ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-slate-400">...</span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 rounded-lg font-bold transition ${
                            currentPage === page
                                ? 'bg-[#14e9ff] text-slate-900 shadow-lg shadow-[#14e9ff]/30'
                                : 'text-slate-600 hover:bg-white border border-slate-200 hover:shadow-sm'
                        }`}
                    >
                        {page}
                    </button>
                )
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg font-bold text-slate-600 hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition border border-slate-200"
            >
                Next
            </button>
        </div>
    );
};

// ============================================
// MAIN COMPONENT
// ============================================
const AllProductsPage = ({ onProductClick, initialSearchTerm = '', onBack }) => {
    // Context
    const context = useContext(CartContext);
    const allProducts = context?.allProducts || []; 
    const addToCart = context?.addToCart || (() => {});

    // State Management
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    
    // Filter States
    const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
    const [selectedLocation, setSelectedLocation] = useState('Semua Lokasi');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState('relevance');

    // Update search term when props change
    useEffect(() => {
        setSearchTerm(initialSearchTerm);
        setCurrentPage(1);
    }, [initialSearchTerm]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, selectedLocation, maxPrice, sortBy]);

    // FILTERING & SORTING LOGIC
    const processedProducts = useMemo(() => {
        let products = [...allProducts];

        // 1. Search Filter (name, category, location)
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            products = products.filter(product => {
                const nameMatch = product.name?.toLowerCase().includes(searchLower);
                const categoryMatch = product.category?.toLowerCase().includes(searchLower);
                const locationMatch = product.location?.toLowerCase().includes(searchLower);
                return nameMatch || categoryMatch || locationMatch;
            });
        }

        // 2. Category Filter
        if (selectedCategory !== 'Semua Kategori') {
            products = products.filter(p => p.category === selectedCategory);
        }

        // 3. Location Filter
        if (selectedLocation !== 'Semua Lokasi') {
            products = products.filter(p => p.location === selectedLocation);
        }

        // 4. Price Filter
        if (maxPrice) {
            const maxPriceNum = parseFloat(maxPrice);
            if (!isNaN(maxPriceNum)) {
                products = products.filter(p => p.price <= maxPriceNum);
            }
        }

        // 5. Sorting
        switch (sortBy) {
            case 'price-asc':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'newest':
                products.sort((a, b) => (b.id || 0) - (a.id || 0));
                break;
            default:
                break;
        }

        return products;
    }, [allProducts, searchTerm, selectedCategory, selectedLocation, maxPrice, sortBy]);

    // Pagination
    const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return processedProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [processedProducts, currentPage]);

    // Handlers
    const handleClearSearch = useCallback(() => {
        setSearchTerm('');
    }, []);

    const handleResetFilters = useCallback(() => {
        setSelectedCategory('Semua Kategori');
        setSelectedLocation('Semua Lokasi');
        setMaxPrice('');
        setSortBy('relevance');
        setSearchTerm('');
    }, []);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Check if any filter is active
    const hasActiveFilters = useMemo(() => {
        return selectedCategory !== 'Semua Kategori' || 
               selectedLocation !== 'Semua Lokasi' || 
               maxPrice !== '' || 
               sortBy !== 'relevance';
    }, [selectedCategory, selectedLocation, maxPrice, sortBy]);

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
                        <button 
                            onClick={onBack} 
                            className="flex items-center gap-1 text-slate-500 hover:text-[#14e9ff] font-bold text-sm mb-3 transition"
                        >
                            <ArrowLeft size={18} /> Kembali
                        </button>
                        <h1 className="text-3xl font-black text-slate-900 mb-1">
                            {searchTerm ? `Hasil: "${searchTerm}"` : 'Semua Koleksi'}
                        </h1>
                        <p className="text-slate-500">
                            Menampilkan {processedProducts.length} barang
                            {totalPages > 1 && ` (Halaman ${currentPage} dari ${totalPages})`}
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
                                    aria-label="Hapus pencarian"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`p-3 border rounded-xl transition shadow-sm relative ${
                                isFilterOpen 
                                    ? 'bg-[#14e9ff] text-slate-900 border-[#14e9ff]' 
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                            aria-label="Toggle filter"
                        >
                            <SlidersHorizontal size={20} />
                            {hasActiveFilters && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                            )}
                        </button>
                    </div>
                </div>
                
                {/* Filter Section (Expandable) */}
                <AnimatePresence>
                    {isFilterOpen && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mb-6"
                        >
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                                        Filter Lanjutan
                                    </h3>
                                    {hasActiveFilters && (
                                        <button
                                            onClick={handleResetFilters}
                                            className="text-[#14e9ff] text-sm font-bold hover:underline"
                                        >
                                            Reset Semua
                                        </button>
                                    )}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                    {/* Category Filter */}
                                    <div>
                                        <label className="block text-slate-500 mb-1 font-medium">Kategori</label>
                                        <div className="relative">
                                            <select 
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:border-[#14e9ff] appearance-none bg-white cursor-pointer"
                                            >
                                                {CATEGORIES.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                                        </div>
                                    </div>

                                    {/* Location Filter */}
                                    <div>
                                        <label className="block text-slate-500 mb-1 font-medium">Lokasi</label>
                                        <div className="relative">
                                            <select 
                                                value={selectedLocation}
                                                onChange={(e) => setSelectedLocation(e.target.value)}
                                                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:border-[#14e9ff] appearance-none bg-white cursor-pointer"
                                            >
                                                {LOCATIONS.map(loc => (
                                                    <option key={loc} value={loc}>{loc}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                                        </div>
                                    </div>

                                    {/* Price Filter */}
                                    <div>
                                        <label className="block text-slate-500 mb-1 font-medium">Harga Maksimum</label>
                                        <input 
                                            type="number" 
                                            placeholder="Rp 0" 
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:border-[#14e9ff]" 
                                        />
                                    </div>

                                    {/* Sort Filter */}
                                    <div>
                                        <label className="block text-slate-500 mb-1 font-medium">Urutkan</label>
                                        <div className="relative">
                                            <select 
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                                className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:border-[#14e9ff] appearance-none bg-white cursor-pointer"
                                            >
                                                {SORT_OPTIONS.map(opt => (
                                                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Products Grid */}
                {paginatedProducts.length > 0 ? (
                    <>
                        <motion.div 
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {paginatedProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    layout
                                >
                                    <ProductCard 
                                        product={product} 
                                        addToCart={addToCart} 
                                        onClick={onProductClick} 
                                    />
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Pagination */}
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300"
                    >
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                            <Search size={40} />
                        </div>
                        <p className="text-slate-900 font-bold text-lg">Tidak ada barang ditemukan</p>
                        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
                            {searchTerm 
                                ? `Kami tidak menemukan barang dengan kata kunci "${searchTerm}".` 
                                : 'Tidak ada barang yang sesuai dengan filter Anda.'}
                            {' '}Coba gunakan kata kunci lain atau ubah filter.
                        </p>
                        <div className="flex gap-3 justify-center mt-6">
                            {searchTerm && (
                                <button 
                                    onClick={handleClearSearch}
                                    className="text-[#14e9ff] font-bold hover:underline"
                                >
                                    Hapus Pencarian
                                </button>
                            )}
                            {hasActiveFilters && (
                                <button 
                                    onClick={handleResetFilters}
                                    className="text-[#14e9ff] font-bold hover:underline"
                                >
                                    Reset Filter
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default AllProductsPage;
