import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
// 1. IMPORT GAMBAR DARI ASSETS
import sellerIllustration from '../assets/seller-illustration.png'; 

const OwnerCTA = ({ onPageChange, isLoggedIn }) => {

    const handleCTAClick = () => {
        // Logika: Jika sudah login, langsung ke dashboard penjual ('seller').
        // Jika belum login, harus ke halaman Auth dulu.
        if (isLoggedIn) {
            onPageChange('seller'); 
        } else {
            onPageChange('auth');
        }
    };

    return (
        <section className="py-20 bg-white border-t border-slate-100">
            <div className="container mx-auto px-6">
                <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
                    
                    {/* Abstract Decor */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#14e9ff] rounded-full mix-blend-overlay opacity-20 blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="relative z-10 max-w-xl text-center lg:text-left">
                        <span className="text-[#14e9ff] font-bold tracking-widest text-xs uppercase mb-2 block">Untuk Pemilik Barang</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                            Barang Nganggur<br/>Jadi Cuan? <span className="text-[#14e9ff]">Bisa.</span>
                        </h2>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            Jangan biarkan asetmu berdebu. Hasilkan uang tambahan dengan menyewakannya di Rentify, terkelola dengan aman dan teratur!
                        </p>
                        <motion.button 
                            onClick={handleCTAClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#14e9ff] text-slate-900 px-8 py-3.5 rounded-full font-bold hover:bg-white transition shadow-lg shadow-[#14e9ff]/40 flex items-center justify-center gap-2 mx-auto lg:mx-0"
                        >
                            {isLoggedIn ? 'Akses Dashboard Penjual' : 'Mulai Menyewakan'}
                             <ArrowRight size={20} />
                        </motion.button>
                    </div>

                    {/* Ilustrasi Penjual (Updated) */}
                    <div className="relative z-10 hidden lg:block w-1/3">
                        {/* 2. GUNAKAN GAMBAR DI SINI */}
                        <img 
                            src={sellerIllustration} 
                            alt="Ilustrasi Penjual" 
                            className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition duration-500 transform rotate-[-5deg]"
                            onError={(e) => {
                                // Fallback jika gambar belum ada/gagal load
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        {/* Fallback Placeholder (Disembunyikan jika gambar berhasil load) */}
                        <div className="hidden w-64 h-64 bg-slate-800 rounded-3xl border-2 border-dashed border-slate-700 items-center justify-center text-slate-50 mx-auto">
                            <span className="text-sm font-bold opacity-70">Ilustrasi Penjual</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OwnerCTA;
