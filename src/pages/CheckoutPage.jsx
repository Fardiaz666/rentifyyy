import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Truck, CreditCard, CheckCircle, Store, ChevronRight, QrCode, Wallet, Copy, Clock } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

// --- DATA LOGO METODE PEMBAYARAN ---
const BANKS = [
    { id: 'bca', name: 'BCA Virtual Account', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg' },
    { id: 'mandiri', name: 'Mandiri Virtual Account', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg' },
    { id: 'bri', name: 'BRI Virtual Account', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/68/BANK_BRI_logo.svg' },
    { id: 'bni', name: 'BNI Virtual Account', logo: 'https://upload.wikimedia.org/wikipedia/id/5/55/BNI_logo.svg' }
];

const WALLETS = [
    { id: 'gopay', name: 'GoPay', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg' },
    { id: 'ovo', name: 'OVO', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg' },
    { id: 'dana', name: 'DANA', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg' },
    { id: 'shopeepay', name: 'ShopeePay', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg' }
];

const CheckoutPage = ({ onBack, onPaymentSuccess }) => {
    // Ambil 'addOrder' dari context untuk menyimpan pesanan
    const { cart, totalPrice, addOrder } = useContext(CartContext);
    
    // State Halaman: 'details' (isi form) -> 'payment' (instruksi bayar)
    const [step, setStep] = useState('details'); 
    
    // State Form & Pilihan User
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentCategory, setPaymentCategory] = useState('bca'); // bca, qris, ewallet
    const [selectedBank, setSelectedBank] = useState(BANKS[0]);
    const [selectedWallet, setSelectedWallet] = useState(WALLETS[0]);
    const [shippingMethod, setShippingMethod] = useState('instant');

    // Data Dummy untuk Pembayaran
    const [virtualNumber, setVirtualNumber] = useState('');
    const [orderId] = useState(`ORD-${Math.floor(Math.random() * 1000000)}`);

    // Kalkulasi Biaya
    const serviceFee = 2000;
    const shippingCost = shippingMethod === 'instant' ? 15000 : 0;
    const grandTotal = totalPrice + shippingCost + serviceFee;

    // 1. Handle tombol "Bayar Sekarang"
    const handleCheckout = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        
        // Simulasi loading ke server
        setTimeout(() => {
            setIsProcessing(false);
            // Generate nomor VA acak
            setVirtualNumber(`88${Math.floor(Math.random() * 10000000000)}`);
            // Pindah ke halaman instruksi pembayaran
            setStep('payment'); 
            window.scrollTo(0, 0);
        }, 1500);
    };

    // 2. Handle tombol "Saya Sudah Bayar"
    const handleFinishPayment = () => {
        setIsProcessing(true);
        
        // Buat Objek Pesanan Baru
        const newOrder = {
            id: orderId,
            date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
            items: [...cart], // Simpan item yang ada di keranjang sekarang
            total: grandTotal,
            status: 'Menunggu Pengiriman',
            shipping: shippingMethod === 'instant' ? 'Kurir Instan' : 'Ambil Sendiri',
            paymentMethod: paymentCategory === 'qris' ? 'QRIS' : (paymentCategory === 'bca' ? selectedBank.name : selectedWallet.name)
        };

        setTimeout(() => {
            setIsProcessing(false);
            
            // Simpan ke Riwayat Pesanan (Context)
            addOrder(newOrder); 
            
            alert("Pembayaran Terkonfirmasi! Pesanan Anda sedang diproses.");
            
            // Pindah ke halaman Riwayat Pesanan (lewat prop dari App.jsx)
            onPaymentSuccess(); 
        }, 2000);
    };

    // Helper Copy text
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Disalin ke clipboard!');
    };

    // Jika keranjang kosong (user refresh di halaman ini)
    if (cart.length === 0 && step === 'details') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-500 font-sans p-6 text-center">
                <p className="mb-4 text-lg">Keranjangmu kosong.</p>
                <button onClick={onBack} className="text-[#14e9ff] font-bold hover:underline flex items-center gap-2">
                    <ArrowLeft size={18} /> Kembali Belanja
                </button>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-white font-sans text-slate-800"
        >
            {/* --- HEADER --- */}
            <div className="border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-md z-40">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={onBack} 
                            className="p-2 hover:bg-slate-50 rounded-full transition text-slate-500 hover:text-slate-800"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
                            <Lock size={18} className="text-green-500" /> 
                            {step === 'details' ? 'Checkout Aman' : 'Menunggu Pembayaran'}
                        </h1>
                    </div>
                    {/* Stepper (Indikator Langkah) */}
                    <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                        <span className={step === 'details' ? "text-[#14e9ff]" : "text-slate-900"}>1. Pengiriman</span>
                        <ChevronRight size={14} className="text-slate-300" />
                        <span className={step === 'payment' ? "text-[#14e9ff]" : "text-slate-400"}>2. Pembayaran</span>
                        <ChevronRight size={14} className="text-slate-300" />
                        <span className="text-slate-300">3. Selesai</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8 md:py-12">
                
                {/* === TAMPILAN 1: FORM DATA (Checkout) === */}
                {step === 'details' && (
                    <form onSubmit={handleCheckout} className="grid lg:grid-cols-12 gap-12 items-start">
                        
                        {/* Kiri: Input Data */}
                        <div className="lg:col-span-7 space-y-10">
                            
                            {/* Section Pengiriman */}
                            <section>
                                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-slate-900 text-[#14e9ff] flex items-center justify-center text-sm font-bold">1</span>
                                    Detail Pengiriman
                                </h2>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Nama Depan</label>
                                            <input type="text" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#14e9ff] focus:ring-2 focus:ring-[#14e9ff]/20 transition outline-none font-medium" required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Nama Belakang</label>
                                            <input type="text" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#14e9ff] focus:ring-2 focus:ring-[#14e9ff]/20 transition outline-none font-medium" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Alamat Lengkap</label>
                                        <input type="text" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#14e9ff] focus:ring-2 focus:ring-[#14e9ff]/20 transition outline-none font-medium" placeholder="Nama Jalan, No. Rumah, Apartemen, Blok" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Nomor WhatsApp</label>
                                        <input type="tel" className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#14e9ff] focus:ring-2 focus:ring-[#14e9ff]/20 transition outline-none font-medium" placeholder="08xxxxxxxxxx" required />
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-slate-100">
                                    <h3 className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2">
                                        <Truck size={18} /> Pilih Metode Pengiriman
                                    </h3>
                                    <div className="space-y-3">
                                        <label 
                                            className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${shippingMethod === 'instant' ? 'border-[#14e9ff] bg-[#14e9ff]/5 ring-1 ring-[#14e9ff]' : 'border-slate-200 hover:border-slate-300'}`}
                                            onClick={() => setShippingMethod('instant')}
                                        >
                                            <div className="flex items-center gap-4">
                                                <input type="radio" checked={shippingMethod === 'instant'} onChange={() => setShippingMethod('instant')} className="accent-[#14e9ff] w-5 h-5" />
                                                <div>
                                                    <p className="font-bold text-sm text-slate-900">Kurir Instan (Rentify Express)</p>
                                                    <p className="text-xs text-slate-500 mt-0.5">Estimasi: 2-3 jam</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-sm text-slate-900">{formatCurrency(15000)}</span>
                                        </label>
                                        <label 
                                            className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${shippingMethod === 'pickup' ? 'border-[#14e9ff] bg-[#14e9ff]/5 ring-1 ring-[#14e9ff]' : 'border-slate-200 hover:border-slate-300'}`}
                                            onClick={() => setShippingMethod('pickup')}
                                        >
                                            <div className="flex items-center gap-4">
                                                <input type="radio" checked={shippingMethod === 'pickup'} onChange={() => setShippingMethod('pickup')} className="accent-[#14e9ff] w-5 h-5" />
                                                <div>
                                                    <p className="font-bold text-sm text-slate-900">Ambil Sendiri (Self Pickup)</p>
                                                    <p className="text-xs text-slate-500 mt-0.5">Ambil di lokasi pemilik barang</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-xs text-green-700 bg-green-100 px-2 py-1 rounded">GRATIS</span>
                                        </label>
                                    </div>
                                </div>
                            </section>

                            {/* Section Pembayaran */}
                            <section className="pt-8 border-t border-slate-100">
                                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-slate-900 text-[#14e9ff] flex items-center justify-center text-sm font-bold">2</span>
                                    Metode Pembayaran
                                </h2>

                                {/* Tab Kategori Pembayaran */}
                                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
                                    <button type="button" onClick={() => setPaymentCategory('bca')} className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold whitespace-nowrap border transition ${paymentCategory === 'bca' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
                                        <CreditCard size={18} /> Transfer Bank
                                    </button>
                                    <button type="button" onClick={() => setPaymentCategory('qris')} className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold whitespace-nowrap border transition ${paymentCategory === 'qris' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
                                        <QrCode size={18} /> QRIS
                                    </button>
                                    <button type="button" onClick={() => setPaymentCategory('ewallet')} className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold whitespace-nowrap border transition ${paymentCategory === 'ewallet' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
                                        <Wallet size={18} /> E-Wallet
                                    </button>
                                </div>

                                {/* Content Pilihan Detail */}
                                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                                    
                                    {/* 1. Transfer Bank */}
                                    {paymentCategory === 'bca' && (
                                        <div className="space-y-3">
                                            <p className="text-xs font-bold text-slate-400 uppercase mb-3">Pilih Bank</p>
                                            {BANKS.map((bank) => (
                                                <label key={bank.id} onClick={() => setSelectedBank(bank)} className={`flex items-center justify-between p-4 bg-white border rounded-xl cursor-pointer transition ${selectedBank.id === bank.id ? 'border-[#14e9ff] ring-1 ring-[#14e9ff]' : 'border-slate-200 hover:border-slate-300'}`}>
                                                    <div className="flex items-center gap-4">
                                                        <img src={bank.logo} alt={bank.name} className="h-6 w-12 object-contain" />
                                                        <span className="text-sm font-bold text-slate-700">{bank.name}</span>
                                                    </div>
                                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedBank.id === bank.id ? 'border-[#14e9ff] bg-[#14e9ff]' : 'border-slate-300'}`}>
                                                        {selectedBank.id === bank.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                    {/* 2. QRIS */}
                                    {paymentCategory === 'qris' && (
                                        <div className="text-center py-4">
                                            <div className="inline-block bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-4">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg" alt="QRIS" className="h-8 mx-auto mb-4" />
                                                <div className="w-40 h-40 bg-slate-100 mx-auto rounded flex items-center justify-center">
                                                    <QrCode size={40} className="text-slate-300" />
                                                </div>
                                            </div>
                                            <p className="text-sm font-bold text-slate-800">Scan dengan aplikasi pembayaran apa saja.</p>
                                            <p className="text-xs text-slate-500 mt-1">GoPay, OVO, Dana, ShopeePay, BCA Mobile, dll.</p>
                                        </div>
                                    )}

                                    {/* 3. E-Wallet */}
                                    {paymentCategory === 'ewallet' && (
                                        <div className="space-y-3">
                                            <p className="text-xs font-bold text-slate-400 uppercase mb-3">Pilih E-Wallet</p>
                                            {WALLETS.map((wallet) => (
                                                <label key={wallet.id} onClick={() => setSelectedWallet(wallet)} className={`flex items-center justify-between p-4 bg-white border rounded-xl cursor-pointer transition ${selectedWallet.id === wallet.id ? 'border-[#14e9ff] ring-1 ring-[#14e9ff]' : 'border-slate-200 hover:border-slate-300'}`}>
                                                    <div className="flex items-center gap-4">
                                                        <img src={wallet.logo} alt={wallet.name} className="h-6 w-12 object-contain" />
                                                        <span className="text-sm font-bold text-slate-700">{wallet.name}</span>
                                                    </div>
                                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedWallet.id === wallet.id ? 'border-[#14e9ff] bg-[#14e9ff]' : 'border-slate-300'}`}>
                                                        {selectedWallet.id === wallet.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Kanan: Ringkasan Sticky */}
                        <div className="lg:col-span-5">
                            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200 sticky top-28 shadow-sm">
                                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                    <CheckCircle size={20} className="text-[#14e9ff]" /> Ringkasan Pesanan
                                </h3>
                                {/* List Item */}
                                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto custom-scrollbar">
                                    {cart.map((item, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <img src={item.imageUrl} className="w-14 h-14 rounded-lg bg-white object-cover border border-slate-100" alt="" />
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-slate-800 line-clamp-1">{item.name}</p>
                                                <p className="text-xs text-slate-500">{formatCurrency(item.pricePerDay)} / hari</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Total */}
                                <div className="border-t border-slate-200 pt-4 space-y-2">
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>Subtotal</span>
                                        <span>{formatCurrency(totalPrice)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>Pengiriman</span>
                                        <span className={shippingMethod === 'pickup' ? "text-green-600 font-bold" : ""}>{shippingMethod === 'pickup' ? 'Gratis' : formatCurrency(shippingCost)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>Biaya Layanan</span>
                                        <span>{formatCurrency(serviceFee)}</span>
                                    </div>
                                    <div className="border-t border-slate-200 my-2"></div>
                                    <div className="flex justify-between font-bold text-slate-900 text-lg">
                                        <span>Total</span>
                                        <span>{formatCurrency(grandTotal)}</span>
                                    </div>
                                    
                                    <button 
                                        type="submit" 
                                        disabled={isProcessing}
                                        className="w-full py-4 rounded-xl font-bold text-lg bg-slate-900 text-[#14e9ff] hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition mt-4 flex justify-center items-center gap-2 transform active:scale-95"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-[#14e9ff] border-t-transparent rounded-full animate-spin"></div>
                                                Memproses...
                                            </>
                                        ) : (
                                            'Bayar Sekarang'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}

                {/* === TAMPILAN 2: INSTRUKSI PEMBAYARAN (Setelah Klik Bayar) === */}
                {step === 'payment' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
                    >
                        {/* Header Instruksi */}
                        <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-[#14e9ff] opacity-10"></div>
                            <p className="text-slate-400 text-sm font-medium mb-1 relative z-10">Total Pembayaran</p>
                            <h2 className="text-4xl font-black text-white relative z-10">{formatCurrency(grandTotal)}</h2>
                            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs text-[#14e9ff] mt-4 font-bold relative z-10">
                                <Clock size={14} /> Bayar sebelum 24 Jam
                            </div>
                        </div>

                        {/* Konten Instruksi */}
                        <div className="p-8">
                            
                            {/* A. TAMPILAN QRIS */}
                            {paymentCategory === 'qris' && (
                                <div className="text-center">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg" alt="QRIS" className="h-10 mx-auto mb-6" />
                                    <div className="w-64 h-64 mx-auto bg-white p-2 border-2 border-slate-200 rounded-xl shadow-inner mb-6 relative">
                                        <img 
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=RENTIFY-${orderId}`} 
                                            alt="QR Code Pembayaran" 
                                            className="w-full h-full object-contain"
                                        />
                                        {/* Logo Rentify Kecil di Tengah QR */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                                            <div className="text-slate-900 font-black text-[10px]">R</div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                                        Buka aplikasi Gojek, OVO, Dana, atau Mobile Banking Anda, lalu scan kode di atas.
                                    </p>
                                </div>
                            )}

                            {/* B. TAMPILAN BANK TRANSFER & E-WALLET */}
                            {paymentCategory !== 'qris' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-slate-500 font-medium">Metode Pembayaran</span>
                                        {paymentCategory === 'bca' ? (
                                            <img src={selectedBank.logo} alt="Bank Logo" className="h-8 object-contain" />
                                        ) : (
                                            <img src={selectedWallet.logo} alt="Wallet Logo" className="h-8 object-contain" />
                                        )}
                                    </div>
                                    
                                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center mb-6">
                                        <p className="text-xs text-slate-400 uppercase font-bold mb-2">
                                            {paymentCategory === 'ewallet' ? 'Nomor Pembayaran' : 'Nomor Virtual Account'}
                                        </p>
                                        <div className="flex items-center justify-center gap-3">
                                            <span className="text-3xl font-black text-slate-800 tracking-widest font-mono">{virtualNumber}</span>
                                            <button onClick={() => copyToClipboard(virtualNumber)} className="p-2 text-[#14e9ff] hover:bg-[#14e9ff]/10 rounded-lg transition" title="Salin">
                                                <Copy size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Instruksi Accordion */}
                                    <div className="space-y-4">
                                        <details className="group border-b border-slate-100 pb-4 cursor-pointer">
                                            <summary className="flex justify-between items-center font-bold text-slate-700 list-none text-sm">
                                                Cara Bayar
                                                <ChevronRight size={16} className="group-open:rotate-90 transition" />
                                            </summary>
                                            <p className="text-sm text-slate-500 mt-2 leading-relaxed pl-4 border-l-2 border-slate-200 ml-1">
                                                1. Buka aplikasi pembayaran.<br/>
                                                2. Pilih menu Transfer / Bayar.<br/>
                                                3. Masukkan nomor: <b>{virtualNumber}</b>.<br/>
                                                4. Periksa nominal <b>{formatCurrency(grandTotal)}</b>.<br/>
                                                5. Masukkan PIN untuk konfirmasi.
                                            </p>
                                        </details>
                                    </div>
                                </div>
                            )}

                            {/* Tombol Aksi Akhir */}
                            <div className="mt-10 space-y-3">
                                <button 
                                    onClick={handleFinishPayment}
                                    disabled={isProcessing}
                                    className="w-full bg-[#14e9ff] text-slate-900 py-4 rounded-xl font-bold text-lg hover:bg-[#00d0e6] shadow-lg shadow-[#14e9ff]/20 transition flex items-center justify-center gap-2 transform active:scale-95"
                                >
                                    {isProcessing ? 'Mengecek Pembayaran...' : 'Saya Sudah Bayar'}
                                </button>
                                <button 
                                    onClick={() => setStep('details')}
                                    className="w-full bg-white text-slate-500 py-4 rounded-xl font-bold hover:text-slate-800 transition"
                                >
                                    Ganti Metode Pembayaran
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

            </div>
        </motion.div>
    );
};

export default CheckoutPage;