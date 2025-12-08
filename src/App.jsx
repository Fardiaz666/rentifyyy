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
import SellerFinancePage from './pages/SellerFinancePage'; // Import Halaman Keuangan
import { AnimatePresence } from 'framer-motion';

export default function App() {
    // --- STATE MANAGEMENT ---
    const [page, setPage] = useState('home');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    // State Login (Default false, nanti diubah saat login sukses)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentSearchTerm, setCurrentSearchTerm] = useState(''); 
    
    // State Role Pengguna (Simulasi)
    const [userRole, setUserRole] = useState('buyer'); // 'buyer' atau 'seller'

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
        
        // Simulasikan role. Setelah login, asumsikan dia seller
        setUserRole('seller'); 

        // Pindah ke dashboard penjual jika role seller, atau checkout jika buyer
        if (userRole === 'seller') {
            handlePageChange('seller'); 
        } else {
            handlePageChange('checkout'); 
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole('buyer'); // Reset role
        alert("Anda telah keluar.");
        handlePageChange('home');
    };

    // --- FUNGSI RENDER DASHBOARD PENJUAL ---
    const renderSellerContent = () => {
        switch (page) {
            case 'seller':
                return <SellerDashboard key="seller_dashboard" onPageChange={handlePageChange} />;
            case 'seller_orders':
                return <SellerOrdersPage key="seller_orders" onPageChange={handlePageChange} />;
            case 'seller_products': 
                return <SellerProductsPage key="seller_products_content" onPageChange={handlePageChange} />; 
            case 'seller_finance': 
                return <SellerFinancePage key="seller_finance" onPageChange={handlePageChange} />;
            case 'seller_analytics': 
                return <div className="p-4 bg-white rounded-3xl shadow-xl border border-slate-100">Halaman Analisis (Segera Hadir)</div>;
            default:
                return <SellerDashboard key="seller_dashboard_default" onPageChange={handlePageChange} />;
        }
    };

    // --- RENDER APLIKASI ---
    return (
        <CartProvider>
            {/* Wrapper utama */}
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
                
                {/* Sidebar Keranjang */}
                <AnimatePresence>
                    {isCartOpen && (
                        <CartSidebar 
                            isOpen={isCartOpen} 
                            onClose={() => setIsCartOpen(false)}
                            onCheckout={handleCheckout} 
                        />
                    )}
                </AnimatePresence>
                
                {/* Router / Halaman Utama */}
                <AnimatePresence mode="wait">
                    
                    {/* LAYOUT PENJUAL */}
                    {page.startsWith('seller') && isLoggedIn ? (
                        <SellerLayout key="seller-layout" onBack={() => handlePageChange('home')} onLogout={handleLogout} onPageChange={handlePageChange}>
                            <AnimatePresence mode="wait">
                                {renderSellerContent()}
                            </AnimatePresence>
                        </SellerLayout>
                    ) : (
                        // KONTEN PEMBELI
                        <>
                            {/* 1. HOME */}
                            {page === 'home' && (
                                <HomePage key="home" onPageChange={handlePageChange} onProductClick={handleProductClick} isLoggedIn={isLoggedIn} />
                            )}
                            
                            {/* 2. KATALOG */}
                            {page === 'products' && (
                                <AllProductsPage key="products" onProductClick={handleProductClick} initialSearchTerm={currentSearchTerm} onBack={() => handlePageChange('home')} />
                            )}
                            
                            {/* 3. DETAIL PRODUK */}
                            {page === 'detail' && selectedProduct && (
                                <ProductDetail key="detail" product={selectedProduct} onBack={() => handlePageChange('home')} />
                            )}

                            {/* 4. LOGIN / REGISTER */}
                            {page === 'auth' && (
                                <AuthPage key="auth" onBack={() => handlePageChange('home')} onLoginSuccess={handleLoginSuccess} />
                            )}

                            {/* 5. CHECKOUT */}
                            {page === 'checkout' && (
                                <CheckoutPage key="checkout" onBack={() => handlePageChange('home')} onPaymentSuccess={() => handlePageChange('orders')} />
                            )}

                            {/* 6. RIWAYAT PESANAN */}
                            {page === 'orders' && (
                                <OrderHistoryPage key="orders" onBack={() => handlePageChange('home')} />
                            )}

                            {/* 7. PROFIL USER */}
                            {page === 'profile' && (
                                <ProfilePage key="profile" onBack={() => handlePageChange('home')} />
                            )}

                            {/* 8. PENGATURAN */}
                            {page === 'settings' && (
                                <SettingsPage key="settings" onBack={() => handlePageChange('home')} onLogout={handleLogout} onNavigate={handlePageChange} />
                            )}

                            {/* 9. KEAMANAN */}
                            {page === 'security' && (
                                <SecurityPage key="security" onBack={() => handlePageChange('settings')} />
                            )}
                            
                            {/* 10. WISHLIST */}
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
