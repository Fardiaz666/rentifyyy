import React from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, MapPin, Truck, ArrowLeft, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

const mockOrders = [
    { id: 'INV-103', item: 'Sony A7III + Lensa GM', customer: 'Budi Santoso', date: '8 Des 2025', status: 'Menunggu Konfirmasi', total: 350000, location: 'Tangerang Selatan', due: '12 Jam' },
    { id: 'INV-102', item: 'Kursi Futura + Cover (20 Pcs)', customer: 'Ibu Rina', date: '7 Des 2025', status: 'Siap Dikirim', total: 100000, location: 'Bekasi', due: 'Besok' },
    { id: 'INV-101', item: 'Air Purifier Coway', customer: 'Kevin J', date: '6 Des 2025', status: 'Selesai', total: 50000, location: 'Jakarta Barat', due: null },
];

const SellerOrdersPage = ({ onPageChange }) => { // onPageChange digunakan untuk navigasi
    
    const getStatusColor = (status) => {
        switch (status) {
            case 'Menunggu Konfirmasi': return 'bg-yellow-100 text-yellow-800';
            case 'Siap Dikirim': return 'bg-blue-100 text-blue-800';
            case 'Selesai': return 'bg-green-100 text-green-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-white rounded-3xl shadow-xl border border-slate-100">
            
            {/* --- TOMBOL BACK / NAVIGASI KE DASHBOARD --- */}
            <button 
                // Arahkan kembali ke halaman ringkasan Seller Dashboard ('seller')
                onClick={() => onPageChange('seller')} 
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium mb-6 transition"
            >
                <ArrowLeft size={18} /> Kembali ke Ringkasan
            </button>
            {/* ------------------------------------------- */}

            <h1 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Package size={24} className="text-[#14e9ff]" /> Pesanan Masuk
            </h1>
            
            {/* Kartu Status Ringkasan */}
            <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                    <p className="text-3xl font-black text-yellow-800">1</p>
                    <p className="text-xs font-medium text-yellow-600 mt-1">Menunggu Konfirmasi</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-3xl font-black text-blue-800">1</p>
                    <p className="text-xs font-medium text-blue-600 mt-1">Siap Dikirim</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-3xl font-black text-green-800">{mockOrders.length}</p>
                    <p className="text-xs font-medium text-green-600 mt-1">Total Selesai</p>
                </div>
            </div>

            {/* Tabel Daftar Pesanan */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Barang</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 text-sm">
                        {mockOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50 transition">
                                <td className="px-6 py-4 font-semibold text-slate-900">{order.id}</td>
                                <td className="px-6 py-4">
                                    <p className="font-medium text-slate-800 line-clamp-1">{order.item}</p>
                                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} /> {order.location}</p>
                                </td>
                                <td className="px-6 py-4 font-bold text-slate-900">{formatCurrency(order.total)}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {order.status === 'Menunggu Konfirmasi' && (
                                        <button className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-700">Konfirmasi</button>
                                    )}
                                    {order.status === 'Siap Dikirim' && (
                                        <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700">Lacak / Kirim</button>
                                    )}
                                    {order.status === 'Selesai' && (
                                        <button className="text-slate-500 hover:text-[#14e9ff] text-xs font-bold">Detail</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </motion.div>
    );
};

export default SellerOrdersPage;