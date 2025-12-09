import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Package, Calendar, MapPin, ChevronRight, ShoppingBag, Truck, FileText, CheckCircle, Clock, CreditCard, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

// --- 1. KOMPONEN MODAL PENGEMBALIAN (FITUR BARU) ---
const ReturnModal = ({ isOpen, onClose, order, onConfirmReturn }) => {
    const [resi, setResi] = useState('');
    const [courier, setCourier] = useState('JNE');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!resi.trim()) return alert("Nomor resi tidak boleh kosong!");

        if (window.confirm(`Konfirmasi pengembalian dengan resi ${resi}?`)) {
            onConfirmReturn(order.id, { resi, courier });
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-[90] flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-2xl w-full max-w-sm shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <form onSubmit={handleSubmit} className="p-6">
                            <h3 className="font-black text-slate-900 text-lg mb-2 flex items-center gap-2"><Truck size={20} className="text-slate-600" /> Konfirmasi Pengembalian</h3>
                            <p className="text-sm text-slate-500 mb-6">Masukkan nomor resi pengiriman barang kembali.</p>
                            
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kurir</label>
                            <select value={courier} onChange={(e) => setCourier(e.target.value)} className="w-full p-3 border border-slate-300 rounded-xl mb-4">
                                <option>JNE</option><option>J&T</option><option>SiCepat</option><option>GoSend</option>
                            </select>

                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nomor Resi</label>
                            <input 
                                type="text" 
                                value={resi} 
                                onChange={(e) => setResi(e.target.value)} 
                                placeholder="Contoh: JPX-882910" 
                                className="w-full p-3 border border-slate-300 rounded-xl mb-6 uppercase font-medium"
                                required
                            />
                            
                            <div className="flex gap-3">
                                <button type="button" onClick={onClose} className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold">Batal</button>
                                <button type="submit" className="flex-1 bg-slate-900 text-[#14e9ff] py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                                    <Send size={16} /> Kirim
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- 2. KOMPONEN UTAMA (MODIFIKASI AMAN) ---
const OrderHistoryPage = ({ onBack }) => {
    // PROTEKSI: Default values jika context belum siap
    const { orders = [], markOrderAsReturned } = useContext(CartContext);
    
    const [filter, setFilter] = useState('Semua');
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [orderToReturn, setOrderToReturn] = useState(null);

    // Filter Pesanan
    const filteredOrders = filter === 'Semua' 
        ? orders 
        : orders.filter(order => order.status === filter);

    const toggleExpand = (id) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    // Handler Buka Modal
    const handleOpenReturn = (order) => {
        setOrderToReturn(order);
        setShowReturnModal(true);
    };
    
    // Handler Konfirmasi
    const handleConfirmReturn = (orderId, details) => {
        markOrderAsReturned(orderId, details);
    };

    // Helper Status Warna
    const getStatusColor = (status) => {
        switch (status) {
            case 'Menunggu Konfirmasi': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Siap Dikirim': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Dalam Pengiriman': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Menunggu Penerimaan': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'Selesai & Dana Cair': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    // Logika: Kapan tombol "Kirim Kembali" muncul? (Simulasi: Saat barang 'Dalam Pengiriman' dianggap masa sewa habis)
    const isReadyToReturn = (status) => status === 'Dalam Pengiriman';

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans text-slate-800"
        >
            <div className="container mx-auto px-6 max-w-4xl">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={onBack} 
                        className="p-2 hover:bg-white rounded-full transition shadow-sm bg-white/50 border border-slate-200 text-slate-500 hover:text-[#00c0d4]"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Riwayat Pesanan</h1>
                        <p className="text-sm text-slate-500">Pantau status sewa dan riwayat transaksimu.</p>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2 custom-scrollbar">
                    {['Semua', 'Dalam Pengiriman', 'Menunggu Penerimaan', 'Selesai & Dana Cair'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition border ${
                                filter === status 
                                ? 'bg-slate-900 text-[#14e9ff] border-slate-900 shadow-md' 
                                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* List Pesanan */}
                <div className="space-y-6">
                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                <Package size={48} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Belum ada pesanan</h3>
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <motion.div 
                                key={order.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                            >
                                {/* --- CARD HEADER (Selalu Muncul) --- */}
                                <div 
                                    onClick={() => toggleExpand(order.id)}
                                    className="p-6 cursor-pointer hover:bg-slate-50/50 transition"
                                >
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${getStatusColor(order.status).replace('-100', '-500').replace('text-', 'bg-')}`}>
                                                <ShoppingBag size={24} className="text-white"/>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Order ID: {order.id}</p>
                                                <span className={`text-sm font-bold px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-left sm:text-right">
                                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Total Bayar</p>
                                            {/* PROTEKSI: Fallback jika total undefined */}
                                            <p className="text-xl font-black text-slate-900">{formatCurrency(order.total || 0)}</p>
                                            
                                            {/* TOMBOL "KIRIM KEMBALI" (FITUR BARU) */}
                                            {isReadyToReturn(order.status) && (
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleOpenReturn(order); }}
                                                    className="mt-2 text-xs font-bold text-white bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition shadow-sm flex items-center gap-1"
                                                >
                                                    <Truck size={12} /> KIRIM KEMBALI
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 flex justify-center">
                                        {expandedOrder === order.id ? <ChevronUp size={20} className="text-slate-300" /> : <ChevronDown size={20} className="text-slate-300" />}
                                    </div>
                                </div>

                                {/* --- EXPANDED DETAILS --- */}
                                <AnimatePresence>
                                    {expandedOrder === order.id && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t border-slate-100 bg-white/50"
                                        >
                                            <div className="p-6 md:p-8 space-y-6">
                                                <h4 className="font-bold text-slate-900 text-lg border-b pb-2">Rincian Barang</h4>
                                                
                                                {/* ITEM LIST (DENGAN PROTEKSI GAMBAR) */}
                                                {(order.items || []).map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                        {/* PROTEKSI: Jika imageUrl kosong, pakai placeholder */}
                                                        <img 
                                                            src={item.imageUrl || 'https://placehold.co/100x100/e0f7fa/00bcd4?text=Produk'} 
                                                            alt={item.name} 
                                                            className="w-16 h-16 rounded-xl object-cover bg-white" 
                                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/eeeeee/cccccc?text=Error'; }}
                                                        />
                                                        <div className="flex-1">
                                                            <p className="font-bold text-slate-800 text-sm line-clamp-1">{item.name || 'Nama Produk'}</p>
                                                            <p className="text-xs text-slate-500">{formatCurrency(item.pricePerDay || 0)} / hari</p>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* INFO PENGEMBALIAN */}
                                                {order.status === 'Menunggu Penerimaan' && (
                                                    <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl space-y-2">
                                                        <p className="text-sm font-bold text-orange-800 flex items-center gap-2">
                                                            <Clock size={16} /> Barang Dalam Perjalanan Kembali
                                                        </p>
                                                        <p className="text-xs text-orange-600">
                                                            Kurir: <b>{order.returnDetails?.courier}</b> • Resi: <b className="font-mono bg-white px-1 rounded border border-orange-200">{order.returnDetails?.resi}</b>
                                                        </p>
                                                        <p className="text-[10px] text-orange-500 italic">Menunggu konfirmasi penerimaan dari pemilik barang.</p>
                                                    </div>
                                                )}

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
            
            {/* Modal Pengembalian */}
            <ReturnModal 
                isOpen={showReturnModal} 
                onClose={() => setShowReturnModal(false)}
                order={orderToReturn}
                onConfirmReturn={handleConfirmReturn}
            />

        </motion.div>
    );
};

export default OrderHistoryPage;
