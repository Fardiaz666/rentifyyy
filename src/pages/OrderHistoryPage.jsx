import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Package, Calendar, MapPin, ChevronRight, ShoppingBag, Truck, FileText, CheckCircle, Clock, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

const OrderHistoryPage = ({ onBack }) => {
    const { orders } = useContext(CartContext);
    const [filter, setFilter] = useState('Semua');
    const [expandedOrder, setExpandedOrder] = useState(null);

    // Filter Pesanan
    const filteredOrders = filter === 'Semua' 
        ? orders 
        : orders.filter(order => order.status === filter);

    const toggleExpand = (id) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    const handleDownloadInvoice = (e) => {
        e.stopPropagation();
        alert("Invoice berhasil diunduh! (Simulasi)");
    };

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
                    {['Semua', 'Menunggu Pengiriman', 'Dalam Pengiriman', 'Selesai'].map((status) => (
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
                        <div className="text-center py-24 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                                <Package size={48} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Belum ada pesanan</h3>
                            <p className="text-slate-500 max-w-xs mx-auto mb-8 leading-relaxed">
                                {filter === 'Semua' ? "Kamu belum pernah menyewa barang apapun. Yuk mulai eksplorasi!" : `Tidak ada pesanan dengan status "${filter}".`}
                            </p>
                            {filter === 'Semua' && (
                                <button onClick={onBack} className="bg-[#14e9ff] text-slate-900 px-8 py-3.5 rounded-full font-bold hover:bg-[#00d0e6] transition shadow-lg shadow-[#14e9ff]/20">
                                    Mulai Menyewa
                                </button>
                            )}
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
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${order.status === 'Selesai' ? 'bg-green-100 text-green-600' : 'bg-[#14e9ff]/10 text-[#00b5c8]'}`}>
                                                {order.status === 'Selesai' ? <CheckCircle size={24} /> : <ShoppingBag size={24} />}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-bold text-slate-900 text-lg">{order.id}</span>
                                                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{order.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                                                        order.status === 'Selesai' ? 'bg-green-100 text-green-700' : 
                                                        order.status === 'Dalam Pengiriman' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-left sm:text-right flex flex-col items-start sm:items-end">
                                            <p className="text-xs text-slate-400 font-bold uppercase mb-1">Total Tagihan</p>
                                            <p className="text-xl font-black text-slate-900">{formatCurrency(order.total)}</p>
                                        </div>
                                    </div>

                                    {/* Preview Items (Max 2) */}
                                    <div className="space-y-4">
                                        {order.items.slice(0, 2).map((item, idx) => (
                                            <div key={idx} className="flex gap-4 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-lg object-cover bg-white" />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{item.name}</h4>
                                                    <p className="text-xs text-slate-500 mt-0.5">{formatCurrency(item.pricePerDay)} / hari</p>
                                                </div>
                                            </div>
                                        ))}
                                        {order.items.length > 2 && (
                                            <p className="text-xs text-slate-400 font-medium pl-2">+ {order.items.length - 2} barang lainnya</p>
                                        )}
                                    </div>

                                    <div className="mt-4 flex justify-center">
                                        {expandedOrder === order.id ? <ChevronUp size={20} className="text-slate-300" /> : <ChevronDown size={20} className="text-slate-300" />}
                                    </div>
                                </div>

                                {/* --- EXPANDED DETAILS (Accordion) --- */}
                                <AnimatePresence>
                                    {expandedOrder === order.id && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t border-slate-100 bg-slate-50/50"
                                        >
                                            <div className="p-6 md:p-8 space-y-8">
                                                
                                                {/* 1. Status Pengiriman (Timeline) */}
                                                <div>
                                                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                                                        <Truck size={16} /> Status Pengiriman
                                                    </h4>
                                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                                                        {/* Garis Timeline */}
                                                        <div className="absolute top-10 left-8 right-8 h-1 bg-slate-100 -z-0"></div>
                                                        <div className="absolute top-10 left-8 h-1 bg-[#14e9ff] z-0 transition-all duration-1000" style={{ width: order.status === 'Selesai' ? '100%' : '30%' }}></div>

                                                        <div className="flex justify-between relative z-10">
                                                            {/* Step 1 */}
                                                            <div className="flex flex-col items-center text-center w-1/3">
                                                                <div className="w-8 h-8 rounded-full bg-[#14e9ff] text-slate-900 flex items-center justify-center font-bold text-xs mb-3 shadow-md ring-4 ring-white">
                                                                    <CheckCircle size={14} />
                                                                </div>
                                                                <p className="text-xs font-bold text-slate-800">Pesanan Dibuat</p>
                                                                <p className="text-[10px] text-slate-400 mt-1">{order.date}</p>
                                                            </div>
                                                            {/* Step 2 */}
                                                            <div className="flex flex-col items-center text-center w-1/3">
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-3 shadow-md ring-4 ring-white ${order.status !== 'Menunggu Pengiriman' ? 'bg-[#14e9ff] text-slate-900' : 'bg-slate-200 text-slate-400'}`}>
                                                                    <Truck size={14} />
                                                                </div>
                                                                <p className={`text-xs font-bold ${order.status !== 'Menunggu Pengiriman' ? 'text-slate-800' : 'text-slate-400'}`}>Sedang Dikirim</p>
                                                                <p className="text-[10px] text-slate-400 mt-1">Estimasi: Hari Ini</p>
                                                            </div>
                                                            {/* Step 3 */}
                                                            <div className="flex flex-col items-center text-center w-1/3">
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-3 shadow-md ring-4 ring-white ${order.status === 'Selesai' ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                                                                    <Package size={14} />
                                                                </div>
                                                                <p className={`text-xs font-bold ${order.status === 'Selesai' ? 'text-slate-800' : 'text-slate-400'}`}>Pesanan Selesai</p>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Info Kurir */}
                                                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                                                            <div>
                                                                <span className="text-slate-400 block mb-1">Kurir</span>
                                                                <span className="font-bold text-slate-800">{order.shipping === 'Ambil Sendiri' ? 'Self Pickup' : 'Rentify Express (Instant)'}</span>
                                                            </div>
                                                            <div className="text-right">
                                                                <span className="text-slate-400 block mb-1">No. Resi</span>
                                                                <span className="font-bold text-slate-800 font-mono select-all cursor-pointer hover:text-[#14e9ff]">JPX-88291029</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 2. Rincian Pembayaran */}
                                                <div>
                                                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
                                                        <CreditCard size={16} /> Rincian Pembayaran
                                                    </h4>
                                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-50">
                                                            <span className="text-sm text-slate-500">Metode Pembayaran</span>
                                                            <span className="font-bold text-slate-800 flex items-center gap-2">
                                                                {order.paymentMethod} <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Lunas</span>
                                                            </span>
                                                        </div>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex justify-between text-slate-500">
                                                                <span>Total Harga Barang</span>
                                                                <span>{formatCurrency(order.total - 17000)}</span> {/* Simulasi balik hitung */}
                                                            </div>
                                                            <div className="flex justify-between text-slate-500">
                                                                <span>Biaya Pengiriman</span>
                                                                <span>{formatCurrency(15000)}</span>
                                                            </div>
                                                            <div className="flex justify-between text-slate-500">
                                                                <span>Biaya Layanan</span>
                                                                <span>{formatCurrency(2000)}</span>
                                                            </div>
                                                            <div className="flex justify-between font-black text-slate-900 text-lg pt-2 border-t border-slate-100 mt-2">
                                                                <span>Total Bayar</span>
                                                                <span>{formatCurrency(order.total)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* 3. Action Buttons */}
                                                <div className="flex flex-col sm:flex-row gap-3">
                                                    <button 
                                                        onClick={handleDownloadInvoice}
                                                        className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition"
                                                    >
                                                        <FileText size={18} /> Download Invoice
                                                    </button>
                                                    <button className="flex-1 bg-slate-900 text-[#14e9ff] py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-900/20">
                                                        Sewa Lagi
                                                    </button>
                                                </div>

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default OrderHistoryPage;