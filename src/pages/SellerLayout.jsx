import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, TrendingUp, DollarSign, ArrowLeft, LogOut, ChevronRight } from 'lucide-react';
import logoRentify from '../assets/rentify-logo.png'; 

const SellerLayout = ({ onBack, children, onLogout, onPageChange }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { id: 'dashboard', label: 'Ringkasan', icon: LayoutDashboard, page: 'seller' },
        { id: 'orders', label: 'Pesanan Masuk', icon: Package, page: 'seller_orders' },
        { id: 'products', label: 'Daftar Barang', icon: Package, page: 'seller_products' },
        { id: 'finance', label: 'Keuangan', icon: DollarSign, page: 'seller_finance' },
        { id: 'analytics', label: 'Analisis Penjualan', icon: TrendingUp, page: 'seller_analytics' },
    ];

    const handleNavClick = (pageId) => {
        setActiveTab(pageId);
        onPageChange(pageId);
        setIsSidebarOpen(false);
    };

    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Sidebar Desktop/Mobile */}
            <motion.div 
                initial={{ x: -250 }}
                animate={{ x: isSidebarOpen ? 0 : -250 }}
                transition={{ type: 'tween' }}
                className={`fixed md:sticky top-0 h-screen w-64 bg-white shadow-xl md:shadow-md z-50 flex flex-col transition-all duration-300 ${isSidebarOpen ? '' : 'hidden md:flex'}`}
            >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <img src={logoRentify} alt="Rentify Seller" className="h-10 w-auto" />
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1 text-slate-500">
                        <ArrowLeft size={20} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">Menu Penjual</p>
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item.page)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition font-bold text-sm ${
                                activeTab === item.page 
                                ? 'bg-[#14e9ff]/20 text-slate-900 ring-2 ring-[#14e9ff]/50' 
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            <item.icon size={18} className={activeTab === item.page ? 'text-[#00c0d4]' : 'text-slate-400'} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button onClick={onLogout} className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 transition">
                        <LogOut size={18} /> Keluar Akun
                    </button>
                    <button onClick={onBack} className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition mt-2">
                        <ArrowLeft size={18} /> Kembali ke Pembeli
                    </button>
                </div>
            </motion.div>

            {/* Konten Utama */}
            <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-x-hidden">
                <button 
                    onClick={() => setIsSidebarOpen(true)} 
                    className="md:hidden fixed top-4 left-4 p-2 z-50 bg-white rounded-lg shadow-md border border-slate-100"
                >
                    <LayoutDashboard size={20} />
                </button>
                {children}
            </main>
        </div>
    );
};

export default SellerLayout;