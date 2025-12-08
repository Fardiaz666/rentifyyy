import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Package, TrendingUp, Clock, PlusCircle, User, MapPin, CheckCircle, ChevronRight, ShoppingBag, ArrowLeft } from 'lucide-react'; // Tambahkan ArrowLeft
import { formatCurrency } from '../utils/currency';

// Data Dummy untuk Dashboard Penjual
const mockSellerData = {
    revenue: 5250000,
    activeRentals: 7,
    totalItems: 12,
    rating: 4.8,
    pendingOrders: 2,
    recentOrders: [
        { id: 'TRX-10293', item: 'Sony A7III + Lensa GM', status: 'Menunggu Pickup', amount: 350000, location: 'Tangerang' },
        { id: 'TRX-10292', item: 'Vespa Matic Sprint S 150', status: 'Sedang Disewa', amount: 175000, location: 'Jakarta Selatan' },
        { id: 'TRX-10291', item: 'Air Purifier Coway', status: 'Selesai', amount: 50000, location: 'Bekasi' },
    ],
    sellerItems: [
        { id: 1, name: 'Sony A7III + Lensa GM', status: 'Aktif', count: 1 },
        { id: 2, name: 'Vespa Matic Sprint S 150', status: 'Aktif', count: 1 },
        { id: 3, name: 'Dekorasi Lamaran Rustic', status: 'Aktif', count: 1 },
    ]
};

const SellerDashboard = ({ onBack, onPageChange }) => { // Tidak perlu onBack di sini lagi
    
    // Komponen Kartu Statistik
    const StatCard = ({ title, value, icon: Icon, color, onClick }) => (
        <div 
            onClick={onClick}
            className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition cursor-pointer transform hover:-translate-y-0.5"
        >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 text-white ${color}`}>
                <Icon size={20} />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase">{title}</p>
            <h3 className="text-xl font-black text-slate-900 mt-1">{value}</h3>
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            
            {/* Header Utama & Tombol Kembali */}
            <div className="mb-8">
                <button 
                    // PERBAIKAN: Gunakan onPageChange untuk navigasi ke 'home'
                    onClick={() => onPageChange('home')} 
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium mb-4 transition"
                >
                    <ArrowLeft size={18} /> Kembali ke Home Pembeli
                </button>
                <h1 className="text-3xl font-black text-slate-900 mb-1">Selamat Datang, John!</h1>
                <p className="text-slate-500">Kelola toko Anda dan tingkatkan pendapatan sewa.</p>
            </div>

            {/* Grid Statistik Utama */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard 
                    title="Total Pendapatan (Bulan Ini)" 
                    value={formatCurrency(mockSellerData.revenue)} 
                    icon={DollarSign} 
                    color="bg-green-600"
                    onClick={() => onPageChange('seller_finance')}
                />
                <StatCard 
                    title="Barang Aktif Disewa" 
                    value={`${mockSellerData.activeRentals} / ${mockSellerData.totalItems}`} 
                    icon={Package} 
                    color="bg-slate-900"
                    onClick={() => onPageChange('seller_products')}
                />
                <StatCard 
                    title="Pesanan Baru Menunggu" 
                    value={`${mockSellerData.pendingOrders} Pesanan`} 
                    icon={Clock} 
                    color="bg-red-500"
                    onClick={() => onPageChange('seller_orders')}
                />
                <StatCard 
                    title="Rating Toko" 
                    value={`${mockSellerData.rating} / 5.0`} 
                    icon={TrendingUp} 
                    color="bg-yellow-500"
                    onClick={() => onPageChange('seller_analytics')}
                />
            </div>

            {/* Pesanan Terbaru & Barang Saya */}
            <div className="grid md:grid-cols-3 gap-8">
                
                {/* Kolom 1: Quick Info / Profil */}
                <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 space-y-6">
                    <h2 className="text-lg font-black text-slate-900 mb-4">Informasi Toko</h2>
                    
                    {/* Profil Penjual */}
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-[#14e9ff]">
                            <User size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">Toko John Doe</p>
                            <p className="text-xs text-green-600 font-bold flex items-center gap-1 mt-0.5">
                                <CheckCircle size={12} /> Status: Verified
                            </p>
                        </div>
                    </div>
                    
                    {/* Tombol Aksi Cepat */}
                    <button 
                        onClick={() => onPageChange('seller_products')}
                        className="w-full flex items-center justify-between p-3 bg-slate-900 text-[#14e9ff] rounded-xl hover:bg-slate-800 transition shadow-md"
                    >
                        <span className="font-bold text-sm text-white">Daftarkan Barang Baru</span>
                        <PlusCircle size={18} className="text-[#14e9ff]" />
                    </button>
                    
                    <button 
                        onClick={() => onPageChange('seller_orders')}
                        className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition"
                    >
                        <span className="font-bold text-sm text-slate-700">Lihat Semua Pesanan</span>
                        <ShoppingBag size={18} className="text-slate-500" />
                    </button>
                    
                    <button 
                        onClick={() => onPageChange('seller_products')}
                        className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition"
                    >
                        <span className="font-bold text-sm text-slate-700">Kelola Semua Barang</span>
                        <Package size={18} className="text-slate-500" />
                    </button>

                </div>


                {/* Kolom 2: Pesanan Terbaru (Middle) */}
                <div className="md:col-span-2 bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100">
                    <h2 className="text-lg font-black text-slate-900 mb-6 flex justify-between items-center">
                        Pesanan Masuk Terbaru
                        <button onClick={() => onPageChange('seller_orders')} className="text-sm font-bold text-[#00c0d4] hover:underline">Lihat Detail</button>
                    </h2>
                    <div className="space-y-3">
                        {mockSellerData.recentOrders.map(order => (
                            <div key={order.id} className="flex justify-between items-center p-4 border-b border-slate-50 hover:bg-slate-50 transition rounded-lg cursor-pointer"
                                onClick={() => onPageChange('seller_orders')} 
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-slate-800 text-sm line-clamp-1">{order.item}</p>
                                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><MapPin size={12} /> {order.location}</p>
                                </div>
                                <div className="text-right flex items-center gap-4">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                        order.status === 'Selesai' ? 'bg-green-100 text-green-700' : 
                                        order.status === 'Sedang Disewa' ? 'bg-blue-100 text-blue-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {order.status}
                                    </span>
                                    <p className="text-sm font-black text-slate-900">{formatCurrency(order.amount)}</p>
                                    <ChevronRight size={16} className="text-slate-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default SellerDashboard;