import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import AllProductsPage from './pages/AllProductsPage'; 
import CartSidebar from './components/CartSidebar'; 
import AuthPage from './pages/AuthPage'; 
import CheckoutPage from './pages/CheckoutPage'; 
import OrderHistoryPage from './pages/OrderHistoryPage'; 
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage'; 
import SecurityPage from './pages/SecurityPage'; 
import SellerDashboard from './pages/SellerDashboard'; 
import SellerLayout from './pages/SellerLayout'; 
import SellerOrdersPage from './pages/SellerOrdersPage'; 
import SellerProductsPage from './pages/SellerProductsPage'; 
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function App() {
    // --- STATE MANAGEMENT ---
    const [page, setPage] = useState('home');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentSearchTerm, setCurrentSearchTerm] = useState(''); 
    const [userRole, setUserRole] = useState('buyer');

    // --- HANDLERS ---
    const handlePageChange = (newPage, searchData = '') => {
        setPage(newPage);
        setCurrentSearchTerm(searchData);
        window.scrollTo(0, 0); 
        if (newPage === 'home') setSelectedProduct(null);
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setPage('detail');
        window.scrollTo(0, 0);
    };

    const handleCheckout = () => {
        setIsCartOpen(false); 
        if (isLoggedIn) {
            handlePageChange('checkout');
        } else {
            handlePageChange('auth');
        }
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true); 
        setUserRole('seller'); 
        if (userRole === 'seller') {
            handlePageChange('seller'); 
        } else {
            handlePageChange('checkout'); 
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole('buyer');
        alert("Anda telah keluar.");
        handlePageChange('home');
    };

    // --- FUNGSI RENDER DASHBOARD PENJUAL ---
    const renderSellerContent = () => {
        
        // KOMPONEN PLACEHOLDER BARU DENGAN TOMBOL KEMBALI
        const PlaceholderPage = ({ title, content }) => (
            <div key={page} className="p-4 bg-white rounded-3xl shadow-xl border border-slate-100 min-h-[500px]">
                <button 
                    onClick={() => handlePageChange('seller')} 
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium mb-6 transition"
                >
                    <ArrowLeft size={18} /> Kembali ke Ringkasan
                </button>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-black text-slate-800 mb-2">{title}</h2>
                    <p className="text-slate-500 mt-2">{content}</p>
                    <p className="text-sm text-[#00c0d4] mt-4 font-bold">Segera Hadir!</p>
                </div>
            </div>
        );

        switch (page) {
            case 'seller':
                return <SellerDashboard key="seller_dashboard" onPageChange={handlePageChange} />;
            case 'seller_orders':
                return <SellerOrdersPage key="seller_orders" onPageChange={handlePageChange} />;
            case 'seller_products': 
                // Menggunakan komponen Pengelolaan Barang yang sudah dibuat
                return <SellerProductsPage key="seller_products_content" onPageChange={handlePageChange} />; 
            case 'seller_finance': 
                return <PlaceholderPage title="Keuangan & Pembayaran" content="Laporan pendapatan, pencairan dana, dan riwayat transaksi keuangan." />;
            case 'seller_analytics': 
                return <PlaceholderPage title="Analisis Penjualan" content="Grafik performa, barang terlaris, dan wawasan bisnis." />;
            default:
                return <SellerDashboard key="seller_dashboard_default" onPageChange={handlePageChange} />;
        }
    };

    // --- RENDER APLIKASI ---
    return (
        <CartProvider>
            <div className="min-h-screen bg-white text-slate-800 font-sans">
                
                {/* Navbar (Hanya Tampil di Buyer View) */}
                {page !== 'auth' && page !== 'checkout' && !page.startsWith('seller') && (
                    <Navbar 
                        onPageChange={handlePageChange} 
                        onCartClick={() => setIsCartOpen(true)} 
                        isLoggedIn={isLoggedIn}
                        onLogout={handleLogout}
                    />
                )}
                
                <AnimatePresence>
                    {isCartOpen && (
                        <CartSidebar 
                            isOpen={isCartOpen} 
                            onClose={() => setIsCartOpen(false)}
                            onCheckout={handleCheckout} 
                        />
                    )}
                </AnimatePresence>
                
                <AnimatePresence mode="wait">
                    
                    {/* LAYOUT PENJUAL (Diberi kondisi isLoggedIn) */}
                    {page.startsWith('seller') && isLoggedIn ? (
                        <SellerLayout key="seller-layout" onBack={() => handlePageChange('home')} onLogout={handleLogout} onPageChange={handlePageChange}>
                            <AnimatePresence mode="wait">
                                {renderSellerContent()}
                            </AnimatePresence>
                        </SellerLayout>
                    ) : (
                        // KONTEN PEMBELI
                        <>
                            {page === 'home' && (
                                <HomePage key="home" onPageChange={handlePageChange} onProductClick={handleProductClick} isLoggedIn={isLoggedIn} />
                            )}
                            {page === 'products' && (
                                <AllProductsPage key="products" onProductClick={handleProductClick} initialSearchTerm={currentSearchTerm} onBack={() => handlePageChange('home')} />
                            )}
                            {page === 'detail' && selectedProduct && (
                                <ProductDetail key="detail" product={selectedProduct} onBack={() => handlePageChange('home')} />
                            )}
                            {page === 'auth' && (
                                <AuthPage key="auth" onBack={() => handlePageChange('home')} onLoginSuccess={handleLoginSuccess} />
                            )}
                            {page === 'checkout' && (
                                <CheckoutPage key="checkout" onBack={() => handlePageChange('home')} onPaymentSuccess={() => handlePageChange('orders')} />
                            )}
                            {page === 'orders' && (
                                <OrderHistoryPage key="orders" onBack={() => handlePageChange('home')} />
                            )}
                            {page === 'profile' && (
                                <ProfilePage key="profile" onBack={() => handlePageChange('home')} />
                            )}
                            {page === 'settings' && (
                                <SettingsPage key="settings" onBack={() => handlePageChange('home')} onLogout={handleLogout} onNavigate={handlePageChange} />
                            )}
                            {page === 'security' && (
                                <SecurityPage key="security" onBack={() => handlePageChange('settings')} />
                            )}
                            
                            {page === 'wishlist' && (
                                <div key="wishlist" className="min-h-screen pt-32 text-center bg-slate-50">
                                    <h2 className="text-2xl font-bold text-slate-800">Barang Disukai</h2>
                                    <p className="text-slate-500 mt-2">Simpan barang favoritmu di sini nanti.</p>
                                    <button onClick={() => handlePageChange('home')} className="mt-4 text-[#14e9ff] font-bold hover:underline">Kembali ke Beranda</button>
                                </div>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </div>
        </CartProvider>
    );
}