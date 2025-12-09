import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import sellerIllustration from '../assets/seller-illustration.png'; 

// Menerima prop 'isLoggedIn' dan 'onPageChange' dari HomePage
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
                    
                    {/* Abstract Decor - Menggunakan warna biru baru #016ff8 */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#016ff8] rounded-full mix-blend-overlay opacity-20 blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="relative z-10 max-w-xl text-center lg:text-left">
                        {/* UPDATE: Warna teks aksen */}
                        <span className="text-[#016ff8] font-bold tracking-widest text-xs uppercase mb-2 block">Untuk Pemilik Barang</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                            Barang Nganggur<br/>Jadi Cuan? <span className="text-[#016ff8]">Bisa.</span>
                        </h2>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            Jangan biarkan asetmu berdebu. Hasilkan uang tambahan dengan menyewakannya di Rentify, terkelola dengan aman dan teratur!
                        </p>
                        
                        {/* Tombol CTA */}
                        <motion.button 
                            onClick={handleCTAClick}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            // UPDATE: Background biru baru #016ff8
                            className="bg-[#016ff8] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#005bb5] transition shadow-lg shadow-[#016ff8]/40 flex items-center justify-center gap-2 mx-auto lg:mx-0"
                        >
                            {isLoggedIn ? 'Akses Dashboard Penjual' : 'Mulai Menyewakan'}
                             <ArrowRight size={20} />
                        </motion.button>
                    </div>

                    {/* Ilustrasi Penjual */}
                    <div className="relative z-10 hidden lg:block w-1/3">
                        <img 
                            src={sellerIllustration} 
                            alt="Ilustrasi Penjual" 
                            className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition duration-500 transform rotate-[-5deg]"
                            onError={(e) => {
                                // Fallback jika gambar gagal load
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        {/* Fallback Placeholder */}
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
