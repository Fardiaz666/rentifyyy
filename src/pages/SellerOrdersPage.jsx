import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock, CheckCircle, MapPin, Truck, ArrowLeft, ShoppingBag, X, Send, Eye, XCircle } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

// Data Mock Awal
const initialOrders = [
    { id: 'INV-103', item: 'Sony A7III + Lensa GM', customer: 'Budi Santoso', date: '8 Des 2025', status: 'Menunggu Konfirmasi', total: 350000, location: 'Tangerang Selatan', due: '12 Jam', shipping: 'JNE Regular', address: 'Jl. Raya Serpong No. 12, Tangerang Selatan', phone: '081234567890' },
    { id: 'INV-102', item: 'Kursi Futura + Cover (20 Pcs)', customer: 'Ibu Rina', date: '7 Des 2025', status: 'Siap Dikirim', total: 100000, location: 'Bekasi', due: 'Besok', shipping: 'Lalamove', address: 'Cluster Harapan Indah Blok A5, Bekasi', phone: '081987654321' },
    { id: 'INV-104', item: 'Vespa Matic Sprint S', customer: 'Doni Tata', date: '9 Des 2025', status: 'Dalam Pengiriman', total: 175000, location: 'Jakarta Pusat', due: null, shipping: 'Self Pickup', address: 'Ambil di Toko', phone: '085678901234', resi: 'JPX-88291029' },
    { id: 'INV-101', item: 'Air Purifier Coway', customer: 'Kevin J', date: '6 Des 2025', status: 'Selesai', total: 50000, location: 'Jakarta Barat', due: null, shipping: 'GoSend Instant', address: 'Apartemen Taman Anggrek, Jakarta Barat', phone: '081345678901', resi: 'GK-11223344' },
];

const SellerOrdersPage = ({ onPageChange }) => { 
    const [orders, setOrders] = useState(initialOrders);
    const [selectedOrder, setSelectedOrder] = useState(null); // Untuk modal detail
    const [showResiModal, setShowResiModal] = useState(false); // Untuk modal input resi
    const [resiInput, setResiInput] = useState('');
    const [processingId, setProcessingId] = useState(null); // Untuk loading state tombol

    // --- LOGIKA STATUS & WARNA ---
    const getStatusColor = (status) => {
        switch (status) {
            case 'Menunggu Konfirmasi': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Siap Dikirim': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Dalam Pengiriman': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Selesai': return 'bg-green-100 text-green-800 border-green-200';
            case 'Dibatalkan': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    // --- ACTIONS ---

    // 1. Konfirmasi Pesanan
    const handleConfirm = (id) => {
        if (window.confirm("Konfirmasi pesanan ini? Stok akan dikunci untuk penyewa.")) {
            setProcessingId(id);
            setTimeout(() => {
                setOrders(orders.map(order => 
                    order.id === id ? { ...order, status: 'Siap Dikirim' } : order
                ));
                setProcessingId(null);
                alert("Pesanan berhasil dikonfirmasi! Silakan atur pengiriman.");
            }, 1000); // Simulasi loading
        }
    };

    // 2. Tolak Pesanan
    const handleReject = (id) => {
        const reason = prompt("Masukkan alasan penolakan (misal: Stok rusak/habis):");
        if (reason) {
            setOrders(orders.map(order => 
                order.id === id ? { ...order, status: 'Dibatalkan' } : order
            ));
            alert("Pesanan telah dibatalkan.");
        }
    };

    // 3. Input Resi (Buka Modal)
    const openResiModal = (order) => {
        setSelectedOrder(order);
        setShowResiModal(true);
        setResiInput('');
    };

    // 4. Submit Resi (Kirim Barang)
    const handleSubmitResi = (e) => {
        e.preventDefault();
        if (!resiInput.trim()) return alert("Nomor resi tidak boleh kosong!");

        const updatedOrders = orders.map(order => 
            order.id === selectedOrder.id ? { ...order, status: 'Dalam Pengiriman', resi: resiInput } : order
        );
        setOrders(updatedOrders);
        setShowResiModal(false);
        setSelectedOrder(null);
        alert(`Resi ${resiInput} berhasil diinput. Status berubah menjadi 'Dalam Pengiriman'.`);
    };

    // 5. Lihat Detail (Buka Modal Detail)
    const openDetailModal = (order) => {
        setSelectedOrder(order);
    };

    const closeModals = () => {
        setSelectedOrder(null);
        setShowResiModal(false);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-white rounded-3xl shadow-xl border border-slate-100 min-h-screen">
            
            {/* Navigasi */}
            <button 
                onClick={() => onPageChange('seller')} 
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium mb-6 transition"
            >
                <ArrowLeft size={18} /> Kembali ke Ringkasan
            </button>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                    <Package size={28} className="text-[#14e9ff]" /> Manajemen Pesanan
                </h1>
                <div className="bg-slate-100 p-1 rounded-lg flex text-xs font-bold">
                    <button className="px-4 py-2 bg-white shadow-sm rounded-md text-slate-900">Semua</button>
                    <button className="px-4 py-2 text-slate-500 hover:text-slate-900">Perlu Proses</button>
                    <button className="px-4 py-2 text-slate-500 hover:text-slate-900">Siap Kirim</button>
                </div>
            </div>

            {/* TABEL PESANAN */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Info Produk</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Total & Pembeli</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 text-sm">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50/50 transition">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                                            <ShoppingBag size={18} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 line-clamp-1 w-48">{order.item}</p>
                                            <p className="text-xs text-slate-500 mt-0.5 font-mono">{order.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="font-bold text-slate-900">{formatCurrency(order.total)}</p>
                                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                        <MapPin size={10} /> {order.customer}
                                    </p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                    {order.due && <p className="text-[10px] text-red-500 mt-1 font-bold flex items-center gap-1"><Clock size={10} /> Batas: {order.due}</p>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        
                                        {/* KONDISI 1: Menunggu Konfirmasi */}
                                        {order.status === 'Menunggu Konfirmasi' && (
                                            <>
                                                <button 
                                                    onClick={() => handleConfirm(order.id)}
                                                    disabled={processingId === order.id}
                                                    className="bg-[#14e9ff] text-slate-900 px-3 py-2 rounded-lg text-xs font-bold hover:bg-[#00d0e6] transition shadow-sm flex items-center gap-1"
                                                >
                                                    {processingId === order.id ? 'Memproses...' : <><CheckCircle size={14} /> Terima</>}
                                                </button>
                                                <button 
                                                    onClick={() => handleReject(order.id)}
                                                    className="bg-white border border-slate-200 text-red-500 px-3 py-2 rounded-lg text-xs font-bold hover:bg-red-50 transition"
                                                    title="Tolak Pesanan"
                                                >
                                                    <XCircle size={14} />
                                                </button>
                                            </>
                                        )}

                                        {/* KONDISI 2: Siap Dikirim */}
                                        {order.status === 'Siap Dikirim' && (
                                            <button 
                                                onClick={() => openResiModal(order)}
                                                className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-slate-800 transition shadow-sm flex items-center gap-1"
                                            >
                                                <Truck size={14} /> Input Resi
                                            </button>
                                        )}

                                        {/* Tombol Detail (Selalu Ada) */}
                                        <button 
                                            onClick={() => openDetailModal(order)}
                                            className="text-slate-500 hover:text-[#14e9ff] p-2 hover:bg-slate-100 rounded-lg transition"
                                            title="Lihat Detail"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- MODAL DETAIL PESANAN --- */}
            <AnimatePresence>
                {selectedOrder && !showResiModal && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={closeModals}
                    >
                        <motion.div 
                            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
                            className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <h3 className="font-black text-slate-900 text-lg">Detail Pesanan</h3>
                                <button onClick={closeModals}><X size={20} className="text-slate-400 hover:text-slate-900" /></button>
                            </div>
                            <div className="p-6 space-y-4 text-sm">
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold">Produk</p>
                                    <p className="font-bold text-slate-900 text-base">{selectedOrder.item}</p>
                                    <p className="text-slate-500">{selectedOrder.id} • {selectedOrder.date}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold">Penyewa</p>
                                    <p className="font-bold text-slate-900">{selectedOrder.customer}</p>
                                    <p className="text-slate-500">{selectedOrder.phone}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold">Alamat Pengiriman</p>
                                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100 mt-1">
                                        {selectedOrder.address}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-bold">Kurir</p>
                                        <p className="font-bold text-slate-900">{selectedOrder.shipping}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-bold">Total</p>
                                        <p className="font-bold text-[#00c0d4]">{formatCurrency(selectedOrder.total)}</p>
                                    </div>
                                </div>
                                {selectedOrder.resi && (
                                    <div className="bg-green-50 p-3 rounded-lg border border-green-100 text-center">
                                        <p className="text-xs text-green-600 font-bold uppercase">Nomor Resi</p>
                                        <p className="text-lg font-mono font-black text-green-800 tracking-wider">{selectedOrder.resi}</p>
                                    </div>
                                )}
                            </div>
                            <div className="p-4 border-t border-slate-100 flex justify-end">
                                <button onClick={closeModals} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition">Tutup</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- MODAL INPUT RESI --- */}
            <AnimatePresence>
                {showResiModal && selectedOrder && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4 backdrop-blur-sm"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6"
                        >
                            <h3 className="font-black text-slate-900 text-lg mb-2">Input Resi Pengiriman</h3>
                            <p className="text-sm text-slate-500 mb-4">Masukkan nomor resi untuk pesanan <b>{selectedOrder.id}</b> menggunakan kurir <b>{selectedOrder.shipping}</b>.</p>
                            
                            <form onSubmit={handleSubmitResi}>
                                <input 
                                    type="text" 
                                    value={resiInput}
                                    onChange={(e) => setResiInput(e.target.value)}
                                    placeholder="Contoh: JPX-88291029" 
                                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#14e9ff] focus:border-[#14e9ff] outline-none font-medium mb-4 uppercase"
                                    autoFocus
                                />
                                <div className="flex gap-3">
                                    <button type="button" onClick={closeModals} className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200">Batal</button>
                                    <button type="submit" className="flex-1 bg-[#14e9ff] text-slate-900 py-3 rounded-xl font-bold hover:bg-[#00d0e6] flex items-center justify-center gap-2">
                                        <Send size={16} /> Kirim
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
        </motion.div>
    );
};

export default SellerOrdersPage;
