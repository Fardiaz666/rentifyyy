import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Package, TrendingUp, Clock, PlusCircle, User, MapPin, CheckCircle, ChevronRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '../utils/currency';
import { CartContext } from '../context/CartContext'; // Import Context agar data NYATA

const SellerDashboard = ({ onPageChange }) => {
    // AMBIL DATA DARI GLOBAL STATE
    const { sellerOrders, allProducts } = useContext(CartContext);

    // --- HITUNG STATISTIK REAL-TIME ---
    
    // 1. Total Pendapatan (Hitung total dari semua order yang masuk ke seller)
    const totalRevenue = sellerOrders.reduce((acc, order) => acc + (order.total || 0), 0);

    // 2. Pesanan Pending (Status 'Menunggu Konfirmasi')
    const pendingOrdersCount = sellerOrders.filter(o => o.status === 'Menunggu Konfirmasi').length;

    // 3. Barang Milik Penjual
    // (Kita gunakan filter yang sama dengan halaman Produk: Rating 5.0 = Barang milik John Doe)
    const myProducts = allProducts.filter(p => p.rating === 5.0);
    const totalItems = myProducts.length;

    // 4. Rating Toko (Statik/Simulasi)
    const storeRating = 4.8;

    // Komponen Kartu Statistik
    const StatCard = ({ title, value, icon: Icon, color, onClick, highlight }) => (
        <div 
            onClick={onClick}
            className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition cursor-pointer transform hover:-translate-y-0.5 relative overflow-hidden"
        >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 text-white ${color}`}>
                <Icon size={20} />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase">{title}</p>
            <h3 className="text-xl font-black text-slate-900 mt-1">{value}</h3>
            
            {/* Indikator Merah jika ada yang urgent */}
            {highlight && (
                <span className="absolute top-4 right-4 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            )}
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            
            {/* Header Utama & Tombol Kembali */}
            <div className="mb-8">
                <button 
                    // PERBAIKAN: Langsung arahkan ke 'home' agar tidak error
                    onClick={() => onPageChange('home')} 
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium mb-4 transition"
                >
                    <ArrowLeft size={18} /> Kembali ke Home Pembeli
                </button>
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-1">Selamat Datang, John!</h1>
                        <p className="text-slate-500">Berikut adalah ringkasan performa toko Anda hari ini.</p>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-xs font-bold text-slate-400 uppercase">Status Toko</p>
                        <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full mt-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Buka
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Statistik Utama (Data Real) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard 
                    title="Total Pendapatan" 
                    value={formatCurrency(totalRevenue)} 
                    icon={DollarSign} 
                    color="bg-green-600"
                    onClick={() => onPageChange('seller_finance')}
                />
                <StatCard 
                    title="Total Barang" 
                    value={`${totalItems} Unit`} 
                    icon={Package} 
                    color="bg-slate-900"
                    onClick={() => onPageChange('seller_products')}
                />
                <StatCard 
                    title="Pesanan Baru" 
                    value={`${pendingOrdersCount} Pesanan`} 
                    icon={Clock} 
                    color="bg-red-500"
                    onClick={() => onPageChange('seller_orders')}
                    highlight={pendingOrdersCount > 0}
                />
                <StatCard 
                    title="Rating Toko" 
                    value={`${storeRating} / 5.0`} 
                    icon={TrendingUp} 
                    color="bg-yellow-500"
                    onClick={() => onPageChange('seller_analytics')}
                />
            </div>

            {/* Pesanan Terbaru & Quick Action */}
            <div className="grid md:grid-cols-3 gap-8">
                
                {/* Kolom 1: Quick Action / Profil */}
                <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 space-y-6">
                    <h2 className="text-lg font-black text-slate-900 mb-4">Aksi Cepat</h2>
                    
                    {/* Profil Penjual Ringkas */}
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-[#14e9ff]">
                            <User size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">Toko John Doe</p>
                            <p className="text-xs text-green-600 font-bold flex items-center gap-1 mt-0.5">
                                <CheckCircle size={12} /> Terverifikasi
                            </p>
                        </div>
                    </div>
                    
                    {/* Menu Tombol */}
                    <button 
                        onClick={() => onPageChange('seller_products')}
                        className="w-full flex items-center justify-between p-3 bg-slate-900 text-[#14e9ff] rounded-xl hover:bg-slate-800 transition shadow-md group"
                    >
                        <span className="font-bold text-sm text-white">Daftarkan Barang Baru</span>
                        <PlusCircle size={18} className="text-[#14e9ff] group-hover:rotate-90 transition" />
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
                        <span className="font-bold text-sm text-slate-700">Kelola Stok Barang</span>
                        <Package size={18} className="text-slate-500" />
                    </button>
                </div>


                {/* Kolom 2: Pesanan Terbaru (Data Real) */}
                <div className="md:col-span-2 bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-black text-slate-900">Pesanan Masuk Terbaru</h2>
                        <button onClick={() => onPageChange('seller_orders')} className="text-sm font-bold text-[#00c0d4] hover:underline">Lihat Semua</button>
                    </div>
                    
                    <div className="space-y-3">
                        {sellerOrders.length === 0 ? (
                            <div className="text-center py-10 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                Belum ada pesanan masuk saat ini.
                            </div>
                        ) : (
                            // Tampilkan 3 pesanan terbaru
                            sellerOrders.slice(0, 3).map(order => (
                                <div 
                                    key={order.id} 
                                    onClick={() => onPageChange('seller_orders')} 
                                    className="flex justify-between items-center p-4 border-b border-slate-50 hover:bg-slate-50 transition rounded-xl cursor-pointer group"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{order.id}</span>
                                            <span className="text-[10px] text-slate-400">{order.date}</span>
                                        </div>
                                        <p className="font-bold text-slate-800 text-sm line-clamp-1 group-hover:text-[#14e9ff] transition">{order.item}</p>
                                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                            <MapPin size={10} /> {order.location || 'Lokasi Pembeli'}
                                        </p>
                                    </div>
                                    <div className="text-right flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-sm font-black text-slate-900">{formatCurrency(order.total)}</p>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                                                order.status === 'Selesai' ? 'bg-green-100 text-green-700' : 
                                                order.status === 'Menunggu Konfirmasi' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <ChevronRight size={16} className="text-slate-300 group-hover:text-[#14e9ff]" />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default SellerDashboard;
