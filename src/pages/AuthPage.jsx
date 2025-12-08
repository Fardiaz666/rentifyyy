import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Lock, Check } from 'lucide-react';
import logoRentify from '../assets/rentify-logo.png'; 
import loginIllustration from '../assets/login.png';

const AuthPage = ({ onBack, onLoginSuccess }) => {
    // State: true = Mode Login, false = Mode Register
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulasi login berhasil
        alert(isLogin ? "Berhasil Masuk! Selamat datang kembali." : "Akun Berhasil Dibuat! Silakan nikmati Rentify.");
        onLoginSuccess();
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // UPDATE: Memastikan flex items-center dan justify-center untuk centering total
            className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-4 md:p-8 font-sans text-slate-800"
        >
            {/* Tombol Kembali (Pojok Kiri Atas, tetap Absolut) */}
            <div className="absolute top-6 left-6 z-10">
                <button 
                    onClick={onBack} 
                    className="flex items-center gap-2 text-slate-500 hover:text-[#14e9ff] font-bold transition bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md"
                >
                    <ArrowLeft size={18} /> <span className="hidden sm:inline">Kembali ke Beranda</span>
                </button>
            </div>

            {/* KARTU UTAMA (SPLIT LAYOUT) - Ini adalah elemen yang terpusat */}
            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden w-full max-w-6xl flex flex-col md:flex-row min-h-[650px]">
                
                {/* BAGIAN KIRI: ILUSTRASI & BRANDING */}
                <div className="hidden md:flex w-1/2 bg-[#EBF8FF] relative flex-col items-center justify-center p-12 overflow-hidden">
                    
                    {/* Background Blobs (Hiasan) */}
                    <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-[#14e9ff] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-20"></div>
                    
                    <div className="relative z-10 text-center w-full h-full flex flex-col justify-center">
                        <img 
                            src={logoRentify} 
                            alt="Rentify Logo" 
                            className="h-12 mx-auto mb-6 object-contain"
                        />
                        
                        <h2 className="text-3xl font-black text-slate-900 mb-4">
                            Sewa Pintar,<br/>Hidup Lebih Ringan.
                        </h2>
                        
                        <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed mb-10">
                            Akses ribuan barang berkualitas tanpa harus membeli. Hemat biaya, hemat ruang.
                        </p>
                        
                        {/* GAMBAR ILUSTRASI 2D ANDA */}
                        <div className="relative w-full max-w-md mx-auto flex-1 flex items-center justify-center">
                            <img 
                                src={loginIllustration} 
                                alt="Ilustrasi Pembayaran"
                                className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition duration-700"
                                onError={(e) => { e.target.style.display = 'none'; }} 
                            />
                        </div>
                    </div>
                </div>

                {/* BAGIAN KANAN: FORMULIR */}
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white relative">
                    <div className="max-w-md mx-auto w-full">
                        
                        {/* Header Teks */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-black text-slate-900 mb-2">
                                {isLogin ? 'Welcome Back! 👋' : 'Buat Akun Baru 🚀'}
                            </h1>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {isLogin 
                                    ? 'Masukan email dan kata sandi Anda untuk mengakses akun Rentify.' 
                                    : 'Isi data diri Anda untuk mulai menyewa barang dengan mudah dan aman.'}
                            </p>
                        </div>

                        {/* Form Input */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            
                            {/* Input Nama (Hanya Mode Daftar) */}
                            {!isLogin && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="group"
                                >
                                    <label className="block text-[10px] font-bold text-slate-400 mb-1 ml-1 uppercase tracking-wide">Nama Lengkap</label>
                                    <div className="relative flex items-center">
                                        <User className="absolute left-4 text-slate-400 group-focus-within:text-[#14e9ff] transition" size={20} />
                                        <input 
                                            type="text" 
                                            placeholder="John Doe" 
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#14e9ff]/50 focus:bg-white transition font-medium text-slate-700 placeholder:text-slate-300"
                                            required={!isLogin}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* Input Email */}
                            <div className="group">
                                <label className="block text-[10px] font-bold text-slate-400 mb-1 ml-1 uppercase tracking-wide">Alamat Email</label>
                                <div className="relative flex items-center">
                                    <Mail className="absolute left-4 text-slate-400 group-focus-within:text-[#14e9ff] transition" size={20} />
                                    <input 
                                        type="email" 
                                        placeholder="nama@email.com" 
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#14e9ff]/50 focus:bg-white transition font-medium text-slate-700 placeholder:text-slate-300"
                                        required
                                    />
                                    {/* Icon Checkmark validasi visual */}
                                    <div className="absolute right-4 bg-green-100 p-1 rounded-full text-green-500 opacity-0 group-focus-within:opacity-100 transition">
                                        <Check size={14} className="text-white opacity-0 peer-checked:opacity-100 left-0.5 top-0.5 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Input Password */}
                            <div className="group">
                                <label className="block text-[10px] font-bold text-slate-400 mb-1 ml-1 uppercase tracking-wide">Kata Sandi</label>
                                <div className="relative flex items-center">
                                    <Lock className="absolute left-4 text-slate-400 group-focus-within:text-[#14e9ff] transition" size={20} />
                                    <input 
                                        type="password" 
                                        placeholder="••••••••••" 
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#14e9ff]/50 focus:bg-white transition font-medium text-slate-700 placeholder:text-slate-300"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Opsi Tambahan (Remember Me & Forgot Pass) */}
                            {isLogin && (
                                <div className="flex justify-between items-center mt-2">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input type="checkbox" className="peer sr-only" />
                                            <div className="w-5 h-5 border-2 border-slate-300 rounded-md peer-checked:bg-[#14e9ff] peer-checked:border-[#14e9ff] transition group-hover:border-[#14e9ff]"></div>
                                            <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 left-0.5 top-0.5 pointer-events-none" />
                                        </div>
                                        <span className="text-xs text-slate-500 font-bold select-none group-hover:text-slate-700">Ingat Saya</span>
                                    </label>
                                    <a href="#" className="text-xs font-bold text-slate-400 hover:text-[#14e9ff] transition">Lupa Sandi?</a>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-2">
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit" 
                                    className="flex-1 bg-[#14e9ff] text-slate-900 py-3.5 rounded-xl font-bold shadow-lg shadow-[#14e9ff]/30 hover:shadow-xl hover:bg-[#00d0e6] transition"
                                >
                                    {isLogin ? 'Masuk Sekarang' : 'Daftar Sekarang'}
                                </motion.button>
                                
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button" 
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="flex-1 bg-white border-2 border-slate-100 text-slate-600 py-3.5 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-200 transition"
                                >
                                    {isLogin ? 'Buat Akun' : 'Masuk Saja'}
                                </motion.button>
                            </div>
                        </form>

                        {/* Social Login Section */}
                        <div className="mt-10 pt-6 border-t border-slate-100 text-center">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-5">Atau lanjutkan dengan</p>
                            
                            <div className="flex justify-center gap-4">
                                {/* Google */}
                                <button className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center hover:bg-slate-50 hover:shadow-md transition duration-300 transform hover:-translate-y-1">
                                    <svg viewBox="0 0 48 48" width="24px" height="24px">
                                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                                    </svg>
                                </button>
                                
                                {/* Facebook */}
                                <button className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center hover:bg-slate-50 hover:shadow-md transition duration-300 transform hover:-translate-y-1">
                                    <svg viewBox="0 0 48 48" width="28px" height="28px">
                                        <path fill="#1877F2" d="M24 4A20 20 0 1 0 20.89 43.76V25.62H15.53V19.64h5.36v-4.66c0-5.28 3.13-8.21 7.97-8.21 2.32 0 4.74.41 4.74.41v5.19H30.93c-2.61 0-3.43 1.62-3.43 3.28v4h5.86l-.94 5.98H27.5v18.14A20 20 0 0 0 24 4z"/>
                                        <path fill="#fff" d="M26.56 25.62h4.87l.94-5.98h-5.81v-4c0-1.66.81-3.28 3.43-3.28H33.6V7.17s-2.42-.41-4.74-.41c-4.85 0-7.97 2.93-7.97 8.21v4.66h-5.36v5.98h5.36v18.14a20.25 20.25 0 0 0 7.11 0V25.62z"/>
                                    </svg>
                                </button>
                                
                                {/* X (Twitter) */}
                                <button className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center hover:bg-slate-50 hover:shadow-md transition duration-300 transform hover:-translate-y-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AuthPage;