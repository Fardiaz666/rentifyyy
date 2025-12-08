import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ArrowLeft, Search, Edit, Trash2, PlusCircle, X, Save } from 'lucide-react'; 

import { categories } from '../data/mockData'; 
import { CartContext } from '../context/CartContext'; 

// Fungsi utilitas format mata uang
const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

// --- 1. KOMPONEN MODAL TAMBAH/EDIT BARANG (MENU INPUT) ---
const ProductFormModal = ({ isOpen, onClose, productToEdit, onSubmitSuccess }) => {
    const isEdit = !!productToEdit;
    
    const [formData, setFormData] = useState(productToEdit || {
        name: '',
        category: categories.length > 0 ? categories[0].name : 'Lain-lain',
        pricePerDay: 0,
        location: 'Jakarta Selatan',
        stock: 1,
        description: '',
        imageUrl: 'https://placehold.co/400x300/e0f7fa/00bcd4?text=Foto+Produk',
        id: productToEdit ? productToEdit.id : null 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: name === 'pricePerDay' || name === 'stock' ? Number(value) : value 
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        onSubmitSuccess(formData, isEdit); 
        onClose(); 
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="bg-white rounded-[2rem] w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto relative"
                    >
                        {/* Header Modal */}
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-2xl font-black text-slate-900">{isEdit ? 'Edit Detail Barang' : 'Input Barang Baru'}</h2>
                            <button onClick={onClose} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition"><X size={20} /></button>
                        </div>
                        
                        {/* Formulir Input Barang */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                
                                {/* Kiri: Info Dasar & Stok */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-slate-800 border-b pb-2">Informasi Produk</h3>
                                    
                                    <label className="block text-sm font-medium text-slate-700">Nama Barang</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Contoh: Kamera Sony A7III" required className="w-full p-3 border border-slate-200 rounded-xl focus:ring-[#14e9ff] focus:border-[#14e9ff] transition" />
                                    
                                    <label className="block text-sm font-medium text-slate-700">Kategori</label>
                                    <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-[#14e9ff] focus:border-[#14e9ff] transition">
                                        {categories.map(cat => <option key={cat.slug} value={cat.name}>{cat.name}</option>)}
                                    </select>

                                    <label className="block text-sm font-medium text-slate-700">Stok Unit Tersedia</label>
                                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stok Unit" min="1" required className="w-full p-3 border border-slate-200 rounded-xl focus:ring-[#14e9ff] focus:border-[#14e9ff] transition" />
                                    
                                    <label className="block text-sm font-medium text-slate-700">Lokasi Ambil/Ketemu</label>
                                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Contoh: Jakarta Selatan" required className="w-full p-3 border border-slate-200 rounded-xl focus:ring-[#14e9ff] focus:border-[#14e9ff] transition" />
                                </div>

                                {/* Kanan: Harga & Deskripsi */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-slate-800 border-b pb-2">Harga & Detail</h3>
                                    
                                    <label className="block text-sm font-medium text-slate-700">Harga Sewa / Hari</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-600">Rp</span>
                                        <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} placeholder="Harga Sewa / Hari" min="1000" required className="w-full pl-10 p-3 border border-slate-200 rounded-xl focus:ring-[#14e9ff] focus:border-[#14e9ff] transition" />
                                    </div>
                                    
                                    <label className="block text-sm font-medium text-slate-700">URL Gambar (Opsional)</label>
                                    <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="URL Gambar Produk" className="w-full p-3 border border-slate-200 rounded-xl focus:ring-[#14e9ff] focus:border-[#14e9ff] transition" />
                                    
                                    <label className="block text-sm font-medium text-slate-700">Deskripsi Lengkap</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Jelaskan fitur, kondisi, dan kelengkapan yang didapat penyewa." rows="4" required className="w-full p-3 border border-slate-200 rounded-xl resize-none focus:ring-[#14e9ff] focus:border-[#14e9ff] transition"></textarea>
                                </div>
                            </div>
                            
                            {/* Tombol Aksi */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <button type="button" onClick={onClose} className="bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition">Batal</button>
                                <motion.button 
                                    type="submit" 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-[#14e9ff] text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-[#00d0e6] shadow-md shadow-[#14e9ff]/30 flex items-center gap-2 transition"
                                >
                                    <Save size={18} /> {isEdit ? 'Simpan Perubahan' : 'Daftarkan Barang'}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


// --- 2. KOMPONEN HALAMAN UTAMA ---
const SellerProductsPage = ({ onPageChange }) => {
    // Ambil fungsionalitas dan data dari CartContext
    const { allProducts, addProduct, updateProduct, deleteProduct } = useContext(CartContext);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    // ASUMSI: Produk Penjual adalah produk yang ratingnya 5.0 (simulasi milik John Doe)
    const sellerProducts = allProducts.filter(p => p.rating === 5.0); 

    // Filter produk berdasarkan pencarian
    const products = sellerProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handler Form Submit dari Modal
    const handleProductSubmit = (formData, isEdit) => {
        if (isEdit) {
            updateProduct(formData);
            alert(`Barang '${formData.name}' berhasil diupdate global.`);
        } else {
            addProduct(formData);
            alert(`Barang baru '${formData.name}' berhasil ditambahkan ke pasar!`);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingProduct(null); 
        setIsModalOpen(true);
    };

    const handleDelete = (product) => {
        if (window.confirm(`Yakin ingin menghapus barang: ${product.name} dari daftar? Tindakan ini akan menghapusnya dari semua pasar.`)) {
            deleteProduct(product.id);
            alert(`Barang '${product.name}' berhasil dihapus dari pasar.`);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-white rounded-3xl shadow-xl border border-slate-100">
            
            {/* --- TOMBOL BACK / NAVIGASI KE DASHBOARD --- */}
            <button 
                // Menggunakan onPageChange yang diterima dari App.jsx
                onClick={() => onPageChange('seller')} 
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium mb-6 transition"
            >
                <ArrowLeft size={18} /> Kembali ke Ringkasan Dashboard
            </button>
            {/* ------------------------------------------- */}
            
            {/* Header Halaman */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-slate-100 pb-4">
                <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-4 sm:mb-0">
                    <Package size={28} className="text-[#14e9ff]" /> Pengelolaan Barang Sewa
                </h1>
                <motion.button 
                    onClick={handleAdd}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base bg-slate-900 text-[#14e9ff] hover:bg-slate-800 shadow-lg transition"
                >
                    <PlusCircle size={20} /> Tambah Baru
                </motion.button>
            </div>

            {/* Kontrol dan Pencarian */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <p className="text-sm text-slate-500 font-medium">Total {products.length} Barang Milik Anda (Simulasi)</p>
                <div className="relative w-full sm:w-80">
                    <input 
                        type="text" 
                        placeholder="Cari barang (nama/kategori)..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-[#14e9ff] focus:border-[#14e9ff] transition"
                    />
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
            </div>

            {/* Tabel Daftar Barang */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Barang</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Kategori</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Harga/Hari</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Stok</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 text-sm">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="py-10 text-center text-slate-500">
                                    Tidak ada barang ditemukan untuk "{searchTerm}".
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50 transition">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <img 
                                            src={product.imageUrl} 
                                            alt={product.name} 
                                            className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200" 
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/eeeeee/cccccc?text=Gbr'; }}
                                        />
                                        <p className="font-semibold text-slate-900 line-clamp-2">{product.name}</p>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">{product.category}</td>
                                    <td className="px-6 py-4 font-extrabold text-[#00c0d4]">{formatCurrency(product.pricePerDay)}</td>
                                    <td className="px-6 py-4 font-bold text-slate-800">
                                        {product.stock} Unit
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${product.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {product.availability ? 'Aktif' : 'Disewa'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button 
                                            onClick={() => handleEdit(product)} 
                                            className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition tooltip"
                                            title="Edit Barang"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(product)} 
                                            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition ml-2 tooltip"
                                            title="Hapus Barang"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Tampilkan Modal Input/Edit Barang */}
            <ProductFormModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productToEdit={editingProduct}
                onSubmitSuccess={handleProductSubmit} // Kirim handler submit ke modal
            />
            
        </motion.div>
    );
};

export default SellerProductsPage;