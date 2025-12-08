import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, DollarSign, CreditCard, ArrowDownLeft, ArrowUpRight, Download, Wallet } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

// Data Dummy Transaksi Keuangan
const mockTransactions = [
    { id: 'TRX-9981', date: '8 Des 2025', desc: 'Pencairan Dana ke BCA', type: 'out', amount: 2500000, status: 'Berhasil' },
    { id: 'TRX-9982', date: '7 Des 2025', desc: 'Pendapatan Sewa - Sony A7III', type: 'in', amount: 350000, status: 'Selesai' },
    { id: 'TRX-9983', date: '6 Des 2025', desc: 'Pendapatan Sewa - Vespa Matic', type: 'in', amount: 175000, status: 'Selesai' },
    { id: 'TRX-9984', date: '5 Des 2025', desc: 'Pendapatan Sewa - Air Purifier', type: 'in', amount: 50000, status: 'Selesai' },
    { id: 'TRX-9985', date: '1 Des 2025', desc: 'Pencairan Dana ke BCA', type: 'out', amount: 1000000, status: 'Berhasil' },
];

const SellerFinancePage = ({ onPageChange }) => {
    const [balance, setBalance] = useState(5250000); // Saldo awal simulasi
    const [isWithdrawing, setIsWithdrawing] = useState(false);

    const handleWithdraw = () => {
        if (balance <= 0) return alert("Saldo tidak cukup.");
        
        setIsWithdrawing(true);
        // Simulasi proses penarikan
        setTimeout(() => {
            setIsWithdrawing(false);
            alert(`Permintaan penarikan dana sebesar ${formatCurrency(balance)} telah diproses ke rekening terdaftar.`);
            setBalance(0); // Kosongkan saldo setelah ditarik
        }, 2000);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 space-y-6">
            
            {/* Tombol Kembali */}
            <button 
                onClick={() => onPageChange('seller')} 
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition"
            >
                <ArrowLeft size={18} /> Kembali ke Ringkasan
            </button>

            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                        <Wallet className="text-[#14e9ff]" size={28} /> Keuangan
                    </h1>
                    <p className="text-slate-500 mt-1">Kelola pendapatan dan pencairan dana toko Anda.</p>
                </div>
            </div>

            {/* Bagian Saldo & Rekening */}
            <div className="grid md:grid-cols-2 gap-6">
                
                {/* Kartu Saldo */}
                <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#14e9ff] rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    
                    <p className="text-slate-400 font-medium mb-2 flex items-center gap-2">
                        <DollarSign size={16} /> Saldo Penghasilan Aktif
                    </p>
                    <h2 className="text-4xl font-black mb-8">{formatCurrency(balance)}</h2>
                    
                    <button 
                        onClick={handleWithdraw}
                        disabled={isWithdrawing || balance === 0}
                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                            isWithdrawing || balance === 0 
                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                            : 'bg-[#14e9ff] text-slate-900 hover:bg-white'
                        }`}
                    >
                        {isWithdrawing ? 'Memproses...' : 'Tarik Dana Sekarang'}
                    </button>
                </div>

                {/* Kartu Rekening Bank */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <CreditCard size={20} className="text-slate-400" /> Rekening Pencairan
                            </h3>
                            <button className="text-xs font-bold text-[#00c0d4] hover:underline">Ubah</button>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-2">
                            <div className="flex items-center gap-3">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" alt="BCA" className="h-4 object-contain" />
                                <span className="font-bold text-slate-700">Bank Central Asia</span>
                            </div>
                            <p className="text-lg font-mono text-slate-900 mt-2 tracking-wider">**** **** 8899</p>
                            <p className="text-xs text-slate-500 mt-1">a.n. John Doe</p>
                        </div>
                    </div>
                    <div className="text-xs text-slate-400 mt-4 flex gap-2">
                        <CheckCircleIcon /> Rekening Utama Terverifikasi
                    </div>
                </div>
            </div>

            {/* Riwayat Transaksi */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Riwayat Transaksi</h3>
                    <button className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900">
                        <Download size={14} /> Unduh Laporan
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-50">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase">ID Transaksi</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase">Keterangan</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase">Tanggal</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-slate-400 uppercase">Jumlah</th>
                                <th className="px-6 py-3 text-center text-xs font-bold text-slate-400 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {mockTransactions.map((trx) => (
                                <tr key={trx.id} className="hover:bg-slate-50 transition">
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{trx.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${trx.type === 'in' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                {trx.type === 'in' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                            </div>
                                            <span className="font-medium text-slate-700">{trx.desc}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{trx.date}</td>
                                    <td className={`px-6 py-4 text-right font-bold ${trx.type === 'in' ? 'text-green-600' : 'text-slate-900'}`}>
                                        {trx.type === 'in' ? '+' : '-'}{formatCurrency(trx.amount)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                            {trx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </motion.div>
    );
};

// Ikon kecil tambahan
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

export default SellerFinancePage;