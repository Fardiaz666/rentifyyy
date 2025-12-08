import React, { useContext } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

const CartSidebar = ({ isOpen, onClose, onCheckout }) => {
    const { cart, removeFromCart, totalPrice } = useContext(CartContext);

    return (
        <>
            {/* Overlay Hitam (Background) */}
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
                />
            )}

            {/* Panel Sidebar (Slide dari kanan) */}
            <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: isOpen ? 0 : '100%' }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl flex flex-col"
            >
                {/* Header Keranjang */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                        <ShoppingBag className="text-[#14e9ff]" /> Keranjang Saya
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition">
                        <X size={24} className="text-slate-500" />
                    </button>
                </div>

                {/* List Barang di Keranjang */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                            <ShoppingBag size={64} className="text-slate-300" />
                            <p className="font-bold text-slate-400">Keranjang masih kosong nih.</p>
                        </div>
                    ) : (
                        cart.map((item, index) => (
                            <motion.div 
                                key={`${item.id}-${index}`}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-4 items-start"
                            >
                                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-100">
                                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-tight">{item.name}</h4>
                                    <p className="text-[#00b5c8] font-bold text-sm mt-1">{formatCurrency(item.pricePerDay)}</p>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(index)}
                                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </motion.div>
                        ))
                    )}
                </div>

                {/* Footer Total & Tombol Checkout */}
                <div className="p-6 border-t border-slate-100 bg-slate-50">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-500 font-medium">Total Sewa</span>
                        <span className="text-2xl font-black text-slate-900">{formatCurrency(totalPrice)}</span>
                    </div>
                    
                    <button 
                        onClick={onCheckout} // PENTING: Panggil fungsi checkout (ke halaman Login)
                        disabled={cart.length === 0}
                        className={`w-full py-4 rounded-xl font-bold transition flex justify-center items-center gap-2 shadow-lg ${cart.length === 0 ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-[#14e9ff] text-slate-900 hover:bg-[#00d0e6] shadow-[#14e9ff]/20'}`}
                    >
                        Lanjut Checkout <ArrowRight size={20} />
                    </button>
                </div>
            </motion.div>
        </>
    );
};

export default CartSidebar;