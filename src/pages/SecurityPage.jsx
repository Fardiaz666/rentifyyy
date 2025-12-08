import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Key, ShieldCheck, Smartphone, Eye, EyeOff, Save, Check } from 'lucide-react';

const SecurityPage = ({ onBack }) => {
    // State untuk Form Password
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    
    // State untuk Visibilitas Password
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    // State untuk 2FA
    const [twoFactor, setTwoFactor] = useState(true); // Default aktif

    // Handle Input Change
    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    // Toggle Visibility
    const toggleShow = (field) => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    // Handle Submit Ganti Password
    const handleChangePassword = (e) => {
        e.preventDefault();
        
        if (passwords.new !== passwords.confirm) {
            alert("Kata sandi baru dan konfirmasi tidak cocok!");
            return;
        }
        if (passwords.new.length < 8) {
            alert("Kata sandi baru minimal 8 karakter.");
            return;
        }
        
        // Simulasi API Call
        alert("Kata sandi berhasil diperbarui! Silakan login ulang nanti.");
        setPasswords({ current: '', new: '', confirm: '' });
    };

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
                    <h1 className="text-2xl font-black text-slate-900">Keamanan Akun</h1>
                </div>

                <div className="space-y-8">

                    {/* Section 1: Ganti Password */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Key className="text-[#14e9ff]" size={20} /> Ganti Kata Sandi
                        </h2>
                        
                        <form onSubmit={handleChangePassword} className="space-y-5">
                            {/* Password Saat Ini */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Kata Sandi Saat Ini</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type={showPassword.current ? "text" : "password"}
                                        name="current"
                                        value={passwords.current}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#14e9ff] transition"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button type="button" onClick={() => toggleShow('current')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                        {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Password Baru */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Kata Sandi Baru</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type={showPassword.new ? "text" : "password"}
                                        name="new"
                                        value={passwords.new}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#14e9ff] transition"
                                        placeholder="Minimal 8 karakter"
                                        required
                                    />
                                    <button type="button" onClick={() => toggleShow('new')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                        {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Konfirmasi Password */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Ulangi Kata Sandi Baru</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type={showPassword.confirm ? "text" : "password"}
                                        name="confirm"
                                        value={passwords.confirm}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#14e9ff] transition"
                                        placeholder="Ulangi password"
                                        required
                                    />
                                    <button type="button" onClick={() => toggleShow('confirm')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                        {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="w-full bg-slate-900 text-[#14e9ff] py-3.5 rounded-xl font-bold hover:opacity-90 transition shadow-lg flex justify-center items-center gap-2 mt-2"
                            >
                                <Save size={18} /> Simpan Perubahan
                            </button>
                        </form>
                    </div>

                    {/* Section 2: Autentikasi Dua Faktor (2FA) */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                    <ShieldCheck className="text-green-500" size={20} /> Verifikasi 2 Langkah (2FA)
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">Tambahkan lapisan keamanan ekstra dengan kode OTP.</p>
                            </div>
                            
                            {/* Toggle Switch */}
                            <div 
                                onClick={() => setTwoFactor(!twoFactor)}
                                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 mt-1 ${twoFactor ? 'bg-[#14e9ff]' : 'bg-slate-200'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${twoFactor ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                        </div>

                        {twoFactor ? (
                             <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start gap-3">
                                <div className="bg-green-100 p-2 rounded-full text-green-600">
                                    <Check size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-green-800">2FA Aktif</p>
                                    <p className="text-xs text-green-600 mt-0.5">Kode OTP akan dikirim ke +62 812-xxxx-7890 setiap kali login baru.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex items-start gap-3">
                                <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                                    <Lock size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-yellow-800">2FA Nonaktif</p>
                                    <p className="text-xs text-yellow-600 mt-0.5">Kami sangat menyarankan Anda mengaktifkan fitur ini untuk keamanan akun Anda.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Section 3: Riwayat Login */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Smartphone className="text-purple-500" size={20} /> Perangkat Login Aktif
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                                <div>
                                    <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                        <Check size={14} className="text-green-500" /> Windows 11 - Chrome
                                    </p>
                                    <p className="text-xs text-green-500 font-bold mt-0.5 ml-4">Sedang Aktif • Jakarta, ID</p>
                                </div>
                                <button className="text-xs text-red-500 hover:underline font-medium">Keluar</button>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-bold text-slate-800">iPhone 13 - Safari</p>
                                    <p className="text-xs text-slate-500 mt-0.5 ml-4">Bandung, ID</p>
                                </div>
                                <span className="text-xs text-slate-400">2 jam lalu</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Xiaomi Pad 5 - Chrome</p>
                                    <p className="text-xs text-slate-500 mt-0.5 ml-4">Surabaya, ID</p>
                                </div>
                                <span className="text-xs text-slate-400">1 bulan lalu</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

export default SecurityPage;