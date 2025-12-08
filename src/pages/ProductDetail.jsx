import React, { useContext } from 'react';
import { ArrowLeft, Star, MapPin, ShieldCheck, ShoppingCart, Heart, User } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import { mockReviews } from '../data/mockData';
// Import Motion
import { motion } from 'framer-motion';

const ProductDetail = ({ product, onBack }) => {
    const { addToCart } = useContext(CartContext);

    if (!product) return null;

    const reviews = mockReviews[product.id] || [];

    return (
        <motion.div 
            // Animasi Halaman Masuk/Keluar
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-white pt-24 pb-10 font-sans text-slate-800"
        >
            <div className="container mx-auto px-6">
                <button 
                    onClick={onBack} 
                    className="flex items-center gap-2 text-slate-500 hover:text-[#00c0d4] font-bold mb-8 transition"
                >
                    <ArrowLeft size={20} /> Kembali
                </button>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Kolom Kiri: Gambar (Slide dari kiri) */}
                    <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 relative group sticky top-24">
                            <motion.img 
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-full h-[500px] object-cover"
                            />
                            <motion.div 
                                whileTap={{ scale: 0.8 }}
                                className="absolute top-6 right-6 bg-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-red-50 hover:text-red-500 text-slate-300 transition z-10"
                            >
                                <Heart size={24} fill="currentColor" className="text-inherit" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Kolom Kanan: Info (Slide dari kanan) */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-[#14e9ff]/10 text-[#00b5c8] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                {product.category}
                            </span>
                            <div className="flex items-center gap-1 text-slate-500 text-sm font-medium">
                                <MapPin size={14} /> {product.location}
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-6 mb-8 border-b border-slate-100 pb-8">
                            <div className="flex items-center gap-2">
                                <Star className="text-yellow-400 fill-yellow-400" size={20} />
                                <span className="text-xl font-bold text-slate-900">{product.rating}</span>
                                <span className="text-slate-400">({product.reviews} ulasan)</span>
                            </div>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                                <ShieldCheck size={18} /> Verified Owner
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="font-bold text-slate-900 mb-3 text-lg">Deskripsi</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {product.description}
                            </p>
                        </div>

                        {product.specs && (
                            <div className="mb-10 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Spesifikasi</h3>
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                    {Object.entries(product.specs).map(([key, value]) => (
                                        <div key={key}>
                                            <p className="text-xs text-slate-400 font-medium mb-1">{key}</p>
                                            <p className="text-sm font-bold text-slate-800">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mb-12">
                            <h3 className="font-bold text-slate-900 mb-6 text-lg">
                                Ulasan Penyewa <span className="text-slate-400 font-normal">({reviews.length})</span>
                            </h3>
                            
                            {reviews.length > 0 ? (
                                <div className="space-y-4">
                                    {reviews.map((review, i) => (
                                        <motion.div 
                                            key={review.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:border-[#14e9ff]/30 transition duration-300"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 border border-slate-200">
                                                        <User size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 text-sm">{review.user}</p>
                                                        <p className="text-xs text-slate-400">{review.date}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-0.5 bg-slate-50 px-2 py-1 rounded-lg">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star 
                                                            key={i} 
                                                            size={12} 
                                                            className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-200"} 
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-slate-600 text-sm leading-relaxed pl-[3.25rem]">"{review.comment}"</p>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400">
                                    Belum ada ulasan tertulis untuk barang ini.
                                </div>
                            )}
                        </div>

                        {/* Sticky Action Bar */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-slate-100 sticky bottom-0 bg-white/95 backdrop-blur-sm pb-4 sm:pb-0 z-20">
                            <div className="w-full sm:w-auto">
                                <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-bold">Harga Sewa</p>
                                <p className="text-3xl font-black text-slate-900">{formatCurrency(product.pricePerDay)}<span className="text-base font-normal text-slate-400">/hari</span></p>
                            </div>
                            <motion.button 
                                onClick={() => addToCart(product)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:flex-1 bg-slate-900 text-[#14e9ff] py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-[#14e9ff]/20 flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={20} /> Sewa Sekarang
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductDetail;