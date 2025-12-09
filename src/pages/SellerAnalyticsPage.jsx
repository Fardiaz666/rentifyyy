import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Eye, ShoppingBag, ArrowUpRight, ArrowDownRight, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

const SellerAnalyticsPage = ({ onPageChange }) => {

    // Data Dummy untuk Grafik (7 Hari Terakhir)
    const chartData = [
        { day: 'Sen', value: 150000, height: '30%' },
        { day: 'Sel', value: 300000, height: '60%' },
        { day: 'Rab', value: 100000, height: '20%' },
        { day: 'Kam', value: 450000, height: '80%' },
        { day: 'Jum', value: 250000, height: '50%' },
        { day: 'Sab', value: 600000, height: '100%' }, // Paling tinggi
        { day: 'Min', value: 500000, height: '85%' },
    ];

    const topProducts = [
        { name: 'Sony A7III + Lensa', rents: 12, revenue: 4200000, color: 'bg-blue-500' },
        { name: 'Vespa Matic Sprint', rents: 8, revenue: 1400000, color: 'bg-purple-500' },
        { name: 'Stroller Doona+', rents: 5, revenue: 750000, color: 'bg-green-500' },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            
            {/* Header & Navigasi */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div>
                    <button 
                        onClick={() => onPageChange('seller')} 
                        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold mb-2 transition text-sm"
                    >
                        <ArrowLeft size={16} /> Kembali ke Ringkasan
                    </button>
                    <h1 className="text-2xl font-black text-slate-900">Analisis Performa</h1>
                    <p className="text-slate-500 text-sm">Data statistik toko Anda dalam 7 hari terakhir.</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
                    <button className="px-4 py-2 bg-white shadow-sm rounded-lg text-xs font-bold text-slate-900">7 Hari</button>
                    <button className="px-4 py-2 text-slate-500 hover:text-slate-900 text-xs font-bold">30 Hari</button>
                </div>
            </div>

            {/* 1. Ringkasan Statistik (Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition group-hover:scale-110 duration-500">
                        <Eye size={80} className="text-[#016ff8]" />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 text-[#016ff8] rounded-lg">
                            <Eye size={20} />
                        </div>
                        <span className="text-sm font-bold text-slate-500">Total Dilihat</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900">1,240</h3>
                    <p className="text-xs font-bold text-green-500 flex items-center gap-1 mt-1">
                        <ArrowUpRight size={14} /> +12% dari minggu lalu
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition group-hover:scale-110 duration-500">
                        <ShoppingBag size={80} className="text-purple-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-50 text-purple-500 rounded-lg">
                            <ShoppingBag size={20} />
                        </div>
                        <span className="text-sm font-bold text-slate-500">Total Disewa</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900">28</h3>
                    <p className="text-xs font-bold text-green-500 flex items-center gap-1 mt-1">
                        <ArrowUpRight size={14} /> +5% dari minggu lalu
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition group-hover:scale-110 duration-500">
                        <Users size={80} className="text-orange-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-50 text-orange-500 rounded-lg">
                            <Users size={20} />
                        </div>
                        <span className="text-sm font-bold text-slate-500">Konversi</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900">2.4%</h3>
                    <p className="text-xs font-bold text-red-500 flex items-center gap-1 mt-1">
                        <ArrowDownRight size={14} /> -0.8% dari minggu lalu
                    </p>
                </div>
            </div>

            {/* 2. Grafik & Top Produk */}
            <div className="grid lg:grid-cols-3 gap-6">
                
                {/* GRAFIK CUSTOM (Bar Chart) */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-bold text-slate-900 text-lg">Pendapatan Minggu Ini</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span className="w-3 h-3 rounded-full bg-[#016ff8]"></span> Pemasukan
                        </div>
                    </div>
                    
                    {/* Visualisasi Grafik Batang (DIPERBAIKI UNTUK MUNCUL) */}
                    <div className="h-64 flex items-end justify-between gap-2 sm:gap-4">
                        {chartData.map((data, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2 group w-full">
                                <div className="relative w-full flex justify-center h-full items-end">
                                    {/* Tooltip Hover */}
                                    <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition bg-slate-900 text-white text-[10px] py-1 px-2 rounded-lg whitespace-nowrap z-10">
                                        {formatCurrency(data.value)}
                                    </div>
                                    {/* Batang Grafik DENGAN ANIMASI */}
                                    <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: data.height }}
                                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                                        className="w-full sm:w-12 bg-[#016ff8]/20 rounded-t-xl group-hover:bg-[#016ff8] transition-all duration-300 relative overflow-hidden"
                                    >
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#016ff8]/50"></div>
                                    </motion.div>
                                </div>
                                <span className="text-xs font-bold text-slate-400 group-hover:text-[#016ff8] transition">{data.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TOP PRODUK */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 text-lg mb-6">Barang Terlaris</h3>
                    <div className="space-y-6">
                        {topProducts.map((product, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-bold text-slate-700">{product.name}</span>
                                    <span className="text-xs font-bold text-slate-400">{product.rents}x Sewa</span>
                                </div>
                                {/* Progress Bar */}
                                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(product.rents / 15) * 100}%` }}
                                        transition={{ duration: 1, delay: idx * 0.2 }}
                                        className={`h-2.5 rounded-full ${product.color}`}
                                    ></motion.div>
                                </div>
                                <p className="text-right text-xs font-bold text-slate-500 mt-1">
                                    {formatCurrency(product.revenue)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">Tips Bisnis</p>
                        <p className="text-sm text-slate-700 leading-snug">
                            Barang kategori <b>Kamera</b> sedang tinggi peminatnya minggu ini. Coba tambah stok lensa!
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SellerAnalyticsPage;
