import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock, CheckCircle, MapPin, Truck, ArrowLeft, ShoppingBag, Eye, X, Send, XCircle, Copy } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { CartContext } from '../context/CartContext'; // Import Context

const SellerOrdersPage = ({ onPageChange }) => { 
    // AMBIL DATA & FUNGSI UPDATE DARI CONTEXT
    const { sellerOrders, updateSellerOrderStatus, confirmOrderReceived } = useContext(CartContext);
    
    // State Lokal untuk UI
    const [selectedOrder, setSelectedOrder] = useState(null); 
    const [showResiModal, setShowResiModal] = useState(false); 
    const [resiInput, setResiInput] = useState('');
    const [processingId, setProcessingId] = useState(null); 

    const getStatusColor = (status) => {
        switch (status) {
            case 'Menunggu Konfirmasi': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Siap Dikirim': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Dalam Pengiriman': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Menunggu Penerimaan': return 'bg-orange-100 text-orange-800 border-orange-200'; 
            case 'Selesai & Dana Cair': return 'bg-green-100 text-green-800 border-green-200'; 
            case 'Dibatalkan': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    // --- ACTIONS SISI PENJUAL ---

    // 1. Terima Pesanan (Konfirmasi)
    const handleConfirm = (id) => {
        if (window.confirm("Konfirmasi pesanan ini? Stok akan dikunci untuk penyewa.")) {
            setProcessingId(id);
            setTimeout(() => {
                updateSellerOrderStatus(id, 'Siap Dikirim');
                setProcessingId(null);
            }, 1000); 
        }
    };
    
    // 2. Konfirmasi Barang Diterima (Dari Pembeli)
    const handleConfirmReceived = (id) => {
        if (window.confirm("Konfirmasi barang telah DITERIMA dan sesuai kondisi? Dana akan segera dicairkan.")) {
            setProcessingId(id);
            setTimeout(() => {
                confirmOrderReceived(id); // Memanggil fungsi global
                setProcessingId(null);
                alert("Penerimaan barang dikonfirmasi! Dana akan cair dalam 1x24 jam.");
            }, 1500); 
        }
    };

    // 3. Tolak Pesanan
    const handleReject = (id) => {
        const reason = prompt("Masukkan alasan penolakan (Wajib):");
        if (reason) {
            updateSellerOrderStatus(id, 'Dibatalkan');
        }
    };

    // 4. Input Resi (Membuka Modal)
    const openResiModal = (order) => {
        setSelectedOrder(order);
        setShowResiModal(true);
        setResiInput(order.resi || ''); 
    };

    // 5. Submit Resi
    const handleSubmitResi = (e) => {
        e.preventDefault();
        if (!resiInput.trim()) return alert("Nomor resi tidak boleh kosong!");

        updateSellerOrderStatus(selectedOrder.id, 'Dalam Pengiriman');
        
        setShowResiModal(false);
        setSelectedOrder(null);
        alert(`Resi ${resiInput} berhasil diinput. Status pesanan diperbarui.`);
    };

    // 6. Detail Modal
    const openDetailModal = (order) => {
        setSelectedOrder(order);
    };

    const closeModals = () => {
        setSelectedOrder(null);
        setShowResiModal(false);
    };
    
    // Helper Copy text
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Disalin!');
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-white rounded-3xl shadow-xl border border-slate-100 min-h-screen">
            
            {/* Tombol Kembali ke Dashboard Utama */}
            <button 
                onClick={() => onPageChange('seller')} 
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium mb-6 transition"
            >
                <ArrowLeft size={18} /> Kembali ke Ringkasan
            </button>

            <h1 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Package size={28} className="text-[#14e9ff]" /> Daftar Pesanan Masuk
            </h1>
            
            {/* Tabel Daftar Pesanan */}
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
                        {sellerOrders.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="py-10 text-center text-slate-400">
                                    Belum ada pesanan masuk saat ini.
                                </td>
                            </tr>
                        ) : (
                            sellerOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {/* UPDATE: Tampilkan Gambar Produk dari URL */}
                                            <div className="w-12 h-12 bg-slate-100 rounded-lg flex-shrink-0 overflow-hidden border border-slate-200">
                                                {order.imageUrl ? (
                                                    <img 
                                                        src={order.imageUrl} 
                                                        alt={order.item} 
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            // Fallback image jika gagal load
                                                            e.target.src = 'https://placehold.co/100x100/e0f7fa/00bcd4?text=IMG';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-slate-400">
                                                        <ShoppingBag size={18} />
                                                    </div>
                                                )}
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
                                        {order.status === 'Menunggu Konfirmasi' && <p className="text-[10px] text-red-500 mt-1 font-bold flex items-center gap-1"><Clock size={10} /> Segera Proses</p>}
                                        {order.status === 'Menunggu Penerimaan' && <p className="text-[10px] text-orange-600 mt-1 font-bold flex items-center gap-1"><Truck size={10} /> Barang Dikirim Balik</p>}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            
                                            {/* Logic Tombol Aksi Berdasarkan Status */}
                                            {order.status === 'Menunggu Konfirmasi' && (
                                                <>
                                                    <button 
                                                        onClick={() => handleConfirm(order.id)}
                                                        disabled={processingId === order.id}
                                                        className="bg-[#14e9ff] text-slate-900 px-3 py-2 rounded-lg text-xs font-bold hover:bg-[#00d0e6] transition shadow-sm flex items-center gap-1"
                                                    >
                                                        {processingId === order.id ? '...' : <><CheckCircle size={14} /> Terima</>}
                                                    </button>
                                                    <button 
                                                        onClick={() => handleReject(order.id)}
                                                        className="bg-white border border-slate-200 text-red-500 px-3 py-2 rounded-lg text-xs font-bold hover:bg-red-50 transition"
                                                        title="Tolak"
                                                    >
                                                        <XCircle size={14} />
                                                    </button>
                                                </>
                                            )}

                                            {order.status === 'Siap Dikirim' && (
                                                <button 
                                                    onClick={() => openResiModal(order)}
                                                    className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-slate-800 transition shadow-sm flex items-center gap-1"
                                                >
                                                    <Truck size={14} /> Input Resi
                                                </button>
                                            )}
                                            
                                            {order.status === 'Menunggu Penerimaan' && (
                                                <button 
                                                    onClick={() => handleConfirmReceived(order.id)}
                                                    disabled={processingId === order.id}
                                                    className="bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-green-700 transition shadow-sm flex items-center gap-1"
                                                    title="Konfirmasi Barang Diterima"
                                                >
                                                    {processingId === order.id ? 'Memproses...' : <><CheckCircle size={14} /> Diterima</>}
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
                            ))
                        )}
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
                                <h3 className="font-black text-slate-900 text-lg">Detail Pesanan {selectedOrder.id}</h3>
                                <button onClick={closeModals}><X size={20} className="text-slate-400 hover:text-slate-900" /></button>
                            </div>
                            <div className="p-6 space-y-4 text-sm max-h-[70vh] overflow-y-auto">
                                
                                <div className="flex justify-center mb-4">
                                     {/* GAMBAR DETAIL DI MODAL */}
                                     <img 
                                        src={selectedOrder.imageUrl || 'https://placehold.co/300x200/e0f7fa/00bcd4?text=Gambar+Produk'} 
                                        alt={selectedOrder.item} 
                                        className="w-full h-40 object-cover rounded-xl border border-slate-100"
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x200/e0f7fa/00bcd4?text=Error'; }}
                                    />
                                </div>

                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <p className="text-xs text-slate-400 uppercase font-bold">Status Saat Ini</p>
                                    <p className={`font-bold text-base mt-1 ${getStatusColor(selectedOrder.status)}`}>
                                        {selectedOrder.status}
                                    </p>
                                    {selectedOrder.status === 'Menunggu Penerimaan' && (
                                        <div className="mt-2 text-xs text-orange-600 font-medium flex items-center gap-1">
                                            <Truck size={14} /> Barang dalam perjalanan kembali
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold">Total & Pembayaran</p>
                                    <p className="font-bold text-base text-[#00c0d4]">{formatCurrency(selectedOrder.total)}</p>
                                    <p className="text-slate-500">Metode: Transfer Bank</p>
                                </div>
                                
                                <div>
                                    <p className="text-xs text-slate-400 uppercase font-bold">Penyewa</p>
                                    <p className="font-bold text-slate-900">{selectedOrder.customer}</p>
                                    <p className="text-slate-500">{selectedOrder.phone || '-'}</p>
                                </div>
                                
                                {/* Detail Bukti Pengiriman (Resi/Kurir) */}
                                {(selectedOrder.resi || selectedOrder.returnDetails) && (
                                     <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                        <p className="text-xs text-blue-600 uppercase font-bold mb-1">Bukti Pengiriman</p>
                                        <p className="font-bold text-blue-900 text-sm flex items-center gap-2">
                                            Resi: {selectedOrder.resi || selectedOrder.returnDetails?.resi || 'N/A'} 
                                            <button onClick={() => copyToClipboard(selectedOrder.resi || selectedOrder.returnDetails?.resi || '')} className="text-blue-500 hover:text-blue-700">
                                                <Copy size={14} />
                                            </button>
                                        </p>
                                        <p className="text-xs text-blue-600">
                                            Kurir: {selectedOrder.shipping || selectedOrder.returnDetails?.courier || 'N/A'}
                                        </p>
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
                            <p className="text-sm text-slate-500 mb-4">Pesanan <b>{selectedOrder.id}</b></p>
                            
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
