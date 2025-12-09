import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Package, Clock, CheckCircle, MapPin, Truck, ShoppingBag, Send, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

// --- Komponen Modal Pengembalian ---
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
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[90] flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white rounded-2xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
                        <h3 className="font-bold text-lg mb-4">Input Resi Pengembalian</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <select value={courier} onChange={(e) => setCourier(e.target.value)} className="w-full p-2 border rounded">
                                <option>JNE</option><option>J&T</option><option>SiCepat</option>
                            </select>
                            <input type="text" value={resi} onChange={(e) => setResi(e.target.value)} placeholder="Nomor Resi" className="w-full p-2 border rounded" required />
                            <div className="flex gap-2">
                                <button type="button" onClick={onClose} className="flex-1 py-2 bg-gray-100 rounded">Batal</button>
                                <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded">Kirim</button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const OrderHistoryPage = ({ onBack }) => {
    // 1. SAFETY CHECK: Pastikan orders selalu array, jangan sampai undefined
    const { orders = [], markOrderAsReturned } = useContext(CartContext);
    
    const [filter, setFilter] = useState('Semua');
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // 2. FILTERING AMAN
    const safeOrders = Array.isArray(orders) ? orders : [];
    const filteredOrders = filter === 'Semua' ? safeOrders : safeOrders.filter(o => o.status === filter);

    const toggleExpand = (id) => setExpandedOrder(expandedOrder === id ? null : id);
    
    const openReturnModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleConfirmReturn = (id, details) => {
        if (markOrderAsReturned) markOrderAsReturned(id, details);
    };

    // 3. FUNGSI RENDER ITEM AMAN
    const renderOrderItems = (order) => {
        // Cek apakah items ada dan berupa array
        const items = Array.isArray(order.items) ? order.items : [];
        
        if (items.length === 0) return <p className="text-sm text-gray-500">Data item tidak tersedia.</p>;

        return items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg mb-2">
                {/* Fallback Image jika imageUrl kosong/error */}
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                    {item.imageUrl ? (
                        <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                            onError={(e) => e.target.style.display = 'none'} // Sembunyikan jika error load
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400"><ShoppingBag size={20}/></div>
                    )}
                </div>
                <div>
                    <p className="font-bold text-sm text-slate-800">{item.name || 'Produk Tanpa Nama'}</p>
                    <p className="text-xs text-slate-500">{formatCurrency(item.pricePerDay || 0)} x {order.duration || 1} hari</p>
                </div>
            </div>
        ));
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans text-slate-800">
            <div className="container mx-auto px-6 max-w-4xl">
                
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="p-2 hover:bg-white rounded-full transition shadow-sm bg-white/50 border border-slate-200 text-slate-500"><ArrowLeft size={20} /></button>
                    <h1 className="text-2xl font-black text-slate-900">Riwayat Pesanan</h1>
                </div>

                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {['Semua', 'Dalam Pengiriman', 'Menunggu Penerimaan', 'Selesai & Dana Cair'].map(status => (
                        <button key={status} onClick={() => setFilter(status)} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border ${filter === status ? 'bg-slate-900 text-white' : 'bg-white text-slate-500'}`}>
                            {status}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-20 text-slate-400">Belum ada pesanan.</div>
                    ) : (
                        filteredOrders.map(order => (
                            <div key={order.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div onClick={() => toggleExpand(order.id)} className="p-5 cursor-pointer hover:bg-slate-50 transition flex justify-between items-center">
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 mb-1">Order {order.id}</p>
                                        <span className="text-sm font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">{order.status}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-slate-900">{formatCurrency(order.total || 0)}</p>
                                        {/* Tombol Kirim Kembali */}
                                        {order.status === 'Dalam Pengiriman' && (
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); openReturnModal(order); }}
                                                className="mt-2 text-xs bg-red-500 text-white px-3 py-1.5 rounded-full font-bold hover:bg-red-600"
                                            >
                                                Kirim Kembali
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {expandedOrder === order.id && (
                                    <div className="border-t border-slate-100 p-5 bg-slate-50/50">
                                        <h4 className="font-bold text-sm mb-3">Rincian Barang</h4>
                                        {renderOrderItems(order)}
                                        
                                        {order.status === 'Menunggu Penerimaan' && (
                                            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-800">
                                                <p className="font-bold flex items-center gap-1"><Clock size={12}/> Menunggu Konfirmasi Penjual</p>
                                                <p>Resi: {order.returnDetails?.resi || '-'}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <ReturnModal isOpen={showModal} onClose={() => setShowModal(false)} order={selectedOrder} onConfirmReturn={handleConfirmReturn} />
        </motion.div>
    );
};

export default OrderHistoryPage;
