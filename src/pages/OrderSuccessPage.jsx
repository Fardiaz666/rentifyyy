import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, ShoppingBag, Clock } from 'lucide-react';

const OrderSuccessPage = ({ onGoToOrders, onBackToHome }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans text-slate-800"
        >
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden">
                {/* Dekorasi Background */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#016ff8] to-purple-500"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#016ff8]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

                {/* Ikon Sukses Animasi */}
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                    className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20"
                >
                    <CheckCircle size={48} strokeWidth={3} />
                </motion.div>

                <h1 className="text-3xl font-black text-slate-900 mb-3">Pesanan Berhasil!</h1>
                <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                    Barangmu sudah siap, tenang dan tunggu ya! <br/>
                    Pemilik barang akan segera memproses pesananmu.
                </p>

                {/* Info Singkat */}
                <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-100 text-left">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm text-[#016ff8]">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-sm">Menunggu Konfirmasi</p>
                            <p className="text-xs text-slate-500 mt-1">Estimasi respon pemilik: &lt; 1 Jam</p>
                        </div>
                    </div>
                    <div className="w-full h-px bg-slate-200 mb-4"></div>
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm text-purple-500">
                            <ShoppingBag size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-sm">Cek Status Pesanan</p>
                            <p className="text-xs text-slate-500 mt-1">Pantau proses pengiriman di menu Riwayat.</p>
                        </div>
                    </div>
                </div>

                {/* Tombol Aksi */}
                <div className="space-y-3">
                    <button 
                        onClick={onGoToOrders}
                        className="w-full bg-[#016ff8] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#005bb5] transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 group"
                    >
                        Lihat Riwayat Pesanan <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                    </button>
                    <button 
                        onClick={onBackToHome}
                        className="w-full bg-white text-slate-500 py-4 rounded-xl font-bold hover:bg-slate-50 transition"
                    >
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default OrderSuccessPage;
