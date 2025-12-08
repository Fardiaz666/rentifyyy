import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Lock, Bell, HelpCircle, LogOut, ChevronRight, Shield } from 'lucide-react';

// Terima prop onNavigate dari App.jsx
const SettingsPage = ({ onBack, onLogout, onNavigate }) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    // Komponen Item Menu
    const MenuItem = ({ icon: Icon, title, subtitle, onClick, toggle, toggleValue }) => (
        <button 
            onClick={onClick}
            className="w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition group"
        >
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-[#14e9ff]/10 group-hover:text-[#00c0d4] transition">
                    <Icon size={20} />
                </div>
                <div className="text-left">
                    <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
                    {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
                </div>
            </div>
            
            {toggle ? (
                <div 
                    onClick={(e) => { e.stopPropagation(); toggle(); }}
                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${toggleValue ? 'bg-[#14e9ff]' : 'bg-slate-200'}`}
                >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${toggleValue ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
            ) : (
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500" />
            )}
        </button>
    );

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans text-slate-800"
        >
            <div className="container mx-auto px-6 max-w-2xl">
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={onBack} 
                        className="p-2 hover:bg-white rounded-full transition shadow-sm bg-white/50 border border-slate-200 text-slate-500 hover:text-[#00c0d4]"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-2xl font-black text-slate-900">Pengaturan</h1>
                </div>

                <div className="space-y-8">
                    
                    {/* Section: Akun */}
                    <section>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 ml-2">Akun</h2>
                        <div className="space-y-3">
                            <MenuItem 
                                icon={User} 
                                title="Informasi Profil" 
                                subtitle="Nama, Foto, dan Biodata"
                                // Tombol navigasi pertama: Ke halaman 'profile'
                                onClick={() => onNavigate('profile')} 
                            />
                            <MenuItem 
                                icon={Lock} 
                                title="Kata Sandi & Keamanan" 
                                subtitle="Ubah kata sandi, 2FA"
                                // Tombol navigasi kedua: Ke halaman 'security'
                                onClick={() => onNavigate('security')} 
                            />
                            <MenuItem 
                                icon={Shield} 
                                title="Verifikasi Identitas (KYC)" 
                                subtitle="Status: Terverifikasi"
                                onClick={() => alert("Halaman Verifikasi sedang dikembangkan.")}
                            />
                        </div>
                    </section>

                    {/* Section: Preferensi */}
                    <section>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 ml-2">Preferensi</h2>
                        <div className="space-y-3">
                            <MenuItem 
                                icon={Bell} 
                                title="Notifikasi" 
                                subtitle="Info promo dan status pesanan"
                                toggle={() => setNotificationsEnabled(!notificationsEnabled)}
                                toggleValue={notificationsEnabled}
                            />
                        </div>
                    </section>

                    {/* Section: Lainnya */}
                    <section>
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 ml-2">Lainnya</h2>
                        <div className="space-y-3">
                            <MenuItem 
                                icon={HelpCircle} 
                                title="Pusat Bantuan" 
                                subtitle="FAQ, Hubungi CS"
                            />
                            <button 
                                onClick={onLogout}
                                className="w-full flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-2xl hover:bg-red-100 transition group cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-red-500 shadow-sm">
                                        <LogOut size={20} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-red-600 text-sm">Keluar Akun</h3>
                                        <p className="text-xs text-red-400 mt-0.5">Logout dari perangkat ini</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </section>

                    <div className="text-center pt-8 pb-4">
                        <p className="text-xs text-slate-400 font-medium">Rentify App v1.0.0</p>
                        <p className="text-[10px] text-slate-300 mt-1">Made with ❤️ in Jakarta</p>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default SettingsPage;