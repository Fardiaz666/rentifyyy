import React, { useState } from 'react';
import { MapPin, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = ({ onPageChange }) => { 
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = () => {
        if (searchTerm.trim()) {
            onPageChange('products', searchTerm); 
        } else {
            onPageChange('products');
        }
    };

    return (
        // UPDATE: Ganti bg-[#14e9ff] menjadi bg-[#016ff8]
        <section className="relative pt-36 pb-28 overflow-hidden bg-[#016ff8]">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                {/* UPDATE: Ganti border-slate-900/10 text-slate-900 menjadi border-white/20 text-white */}
                <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-wide mb-8 backdrop-blur-sm">
                    <MapPin size={14} className="text-white" />
                    Marketplace Sewa #1 di Jabodetabek
                </div>
                
                {/* UPDATE: Sesuaikan warna teks agar kontras dengan background biru tua */}
                <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-sm">
                    Sewa Pintar,<br/>
                    <span className="text-blue-100 drop-shadow-md">Hidup Lebih Ringan.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-blue-50/80 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
                    Penuhi kebutuhan momen spesial dan harianmu tanpa menuhin rumah. 
                    Dari kamera buat konten sampai stroller buat si kecil, semua ada di sekitarmu.
                </p>

                {/* Search Bar */}
                <div className="max-w-4xl mx-auto bg-white p-2 rounded-[2rem] shadow-2xl shadow-blue-900/20 flex flex-col md:flex-row items-center gap-2 transform hover:scale-[1.01] transition duration-300">
                    <div className="flex-1 flex items-center w-full px-6 h-14 md:h-auto border-b md:border-b-0 md:border-r border-slate-100">
                        <Search className="text-slate-400 mr-3" size={22} />
                        <input 
                            type="text" 
                            placeholder="Mau sewa apa hari ini? (ex: Proyektor, Kebaya)" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') handleSearchSubmit();
                            }}
                            className="w-full bg-transparent focus:outline-none text-slate-800 placeholder-slate-400 font-medium text-lg"
                        />
                    </div>
                    <motion.button 
                        onClick={handleSearchSubmit} 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        // UPDATE: Ganti text-[#14e9ff] jadi text-[#016ff8]
                        className="w-full md:w-auto bg-slate-900 text-[#016ff8] px-10 py-4 rounded-[1.5rem] font-bold text-lg hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-lg"
                    >
                        Cari Barang <ArrowRight size={20} />
                    </motion.button>
                </div>

                <p className="mt-6 text-sm text-blue-100 font-medium opacity-80">
                    Atau <button onClick={() => onPageChange('auth')} className="underline hover:text-white transition font-bold">mulai menyewakan barang</button> kamu yang nganggur.
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
