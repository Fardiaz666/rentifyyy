import React, { useState, useEffect, useContext, useRef } from 'react';
import { ShoppingCart, Menu, User, LogOut, ChevronDown, Package, Heart, Settings } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import logoRentify from '../assets/rentify-logo.png'; 
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onPageChange, onCartClick, isLoggedIn, onLogout }) => {
    const { cart } = useContext(CartContext);
    const cartCount = cart.length;
    const [scrolled, setScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDropdownClick = (page) => {
        setIsProfileOpen(false); 
        onPageChange(page);      
    };

    // Fungsi khusus untuk tombol 'Jadi Pemilik Barang' di Nav
    const handleSellerClick = () => {
        // Jika sudah login, arahkan ke dashboard seller
        if (isLoggedIn) {
            onPageChange('seller');
        } else {
            // Jika belum login, arahkan ke halaman otentikasi
            onPageChange('auth');
        }
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b bg-white ${scrolled ? 'border-gray-200 shadow-md py-3' : 'border-gray-100 shadow-sm py-4'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                
                {/* LOGO */}
                <div onClick={() => onPageChange('home')} className="flex items-center cursor-pointer group">
                    <img 
                        src={logoRentify} 
                        alt="Rentify Logo" 
                        className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                        }}
                    />
                    <span className="hidden text-2xl font-black tracking-tight text-slate-900">
                        Rentify
                    </span>
                </div>

                {/* MENU LINKS */}
                <div className="hidden md:flex gap-8 font-bold text-slate-600 text-sm">
                    <button onClick={() => onPageChange('home')} className="hover:text-[#00c0d4] transition">Beranda</button>
                    <button onClick={() => onPageChange('products')} className="hover:text-[#00c0d4] transition">Kategori</button>
                    {/* PERBAIKAN DI SINI */}
                    <button onClick={handleSellerClick} className="hover:text-[#00c0d4] transition">Jadi Pemilik Barang</button>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-4">
                    {/* Tombol Keranjang */}
                    <button 
                        onClick={onCartClick} 
                        className="relative p-2.5 text-slate-800 hover:bg-[#14e9ff]/10 rounded-full transition group"
                    >
                        <ShoppingCart size={22} className="group-hover:text-[#00c0d4] transition" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold animate-pulse shadow-sm border border-white">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* LOGIKA LOGIN / DROPDOWN PROFIL */}
                    {isLoggedIn ? (
                        <div className="relative" ref={dropdownRef}>
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group"
                            >
                                <div className="text-right hidden lg:block">
                                    <p className="text-xs text-slate-400 font-medium group-hover:text-[#00c0d4] transition">Halo,</p>
                                    <p className="text-sm font-bold text-slate-900">John Doe</p>
                                </div>
                                
                                <div className={`w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center overflow-hidden transition ${isProfileOpen ? 'ring-2 ring-[#14e9ff] bg-white' : 'bg-slate-100 hover:bg-slate-200'}`}>
                                    <img 
                                        src="https://api.dicebear.com/9.x/avataaars/svg?seed=John" 
                                        alt="Avatar" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                
                                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.1 }}
                                        className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 origin-top-right"
                                    >
                                        <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                                            <p className="text-sm font-bold text-slate-900">John Doe</p>
                                            <p className="text-xs text-slate-500">john.doe@example.com</p>
                                        </div>
                                        
                                        <div className="p-2">
                                            <button 
                                                onClick={() => handleDropdownClick('profile')}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#00c0d4] rounded-xl transition text-left font-medium"
                                            >
                                                <User size={18} /> Profil Saya
                                            </button>
                                            <button 
                                                onClick={() => handleDropdownClick('orders')}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#00c0d4] rounded-xl transition text-left font-medium"
                                            >
                                                <Package size={18} /> Riwayat Pesanan
                                            </button>
                                            <button 
                                                onClick={() => handleDropdownClick('wishlist')}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#00c0d4] rounded-xl transition text-left font-medium"
                                            >
                                                <Heart size={18} /> Disukai
                                            </button>
                                            <button 
                                                onClick={() => handleDropdownClick('settings')}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#00c0d4] rounded-xl transition text-left font-medium"
                                            >
                                                <Settings size={18} /> Pengaturan
                                            </button>
                                        </div>

                                        <div className="p-2 border-t border-slate-50">
                                            <button 
                                                onClick={() => {
                                                    setIsProfileOpen(false);
                                                    onLogout();
                                                }}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition text-left font-bold"
                                            >
                                                <LogOut size={18} /> Keluar
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <button 
                            onClick={() => onPageChange('auth')} 
                            className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full font-bold bg-slate-900 text-white hover:bg-slate-800 transition shadow-lg hover:shadow-xl"
                        >
                            Masuk / Daftar
                        </button>
                    )}
                    
                    <button className="md:hidden text-slate-800"><Menu /></button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;