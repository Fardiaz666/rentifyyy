import React, { useState, useEffect } from 'react';
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
import SellerFinancePage from './pages/SellerFinancePage'; 
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function App() {
    // --- STATE MANAGEMENT ---
    const [page, setPage] = useState('home');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [currentSearchTerm, setCurrentSearchTerm] = useState(''); 
    const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);

    // 1. Inisialisasi Login dari LocalStorage
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    
    // 2. Inisialisasi Role dari LocalStorage
    const [userRole, setUserRole] = useState(() => {
        return localStorage.getItem('userRole') || 'buyer';
    });

    // --- HANDLERS ---

    const handlePageChange = (newPage, searchData = '') => {
        // 1. Logika Proteksi Halaman Seller
        // Jika user mencoba akses halaman seller tapi belum login
        if (newPage.startsWith('seller') && !isLoggedIn) {
            setRedirectAfterLogin('seller'); // Simpan tujuan
            setPage('auth'); // Paksa login
            return;
        }

        // 2. Auto-switch role jika user login mau masuk ke seller
        if (newPage.startsWith('seller') && isLoggedIn) {
            setUserRole('seller');
            localStorage.setItem('userRole', 'seller');
        }

        setPage(newPage);
        setCurrentSearchTerm(searchData); // Simpan kata kunci pencarian
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
            setRedirectAfterLogin('checkout'); 
            handlePageChange('auth');
        }
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');

        let targetPage = 'home';
        let role = 'buyer';

        // Cek redirect intent dari state sebelumnya
        if (redirectAfterLogin === 'checkout') {
            targetPage = 'checkout';
            role = 'buyer'; 
        } else if (redirectAfterLogin === 'seller') {
            targetPage = 'seller';
            role = 'seller'; 
        } else {
            // Default jika login biasa
            targetPage = 'home';
            role = 'buyer';
        }

        setUserRole(role);
        localStorage.setItem('userRole', role);
        setRedirectAfterLogin(null); 
        
        handlePageChange(targetPage);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole('buyer');
        
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        
        alert("Anda telah keluar.");
        handlePageChange('home');
    };

    // --- FUNGSI RENDER DASHBOARD PENJUAL ---
    const renderSellerContent = () => {
        
        // Komponen Placeholder untuk halaman yang belum ada isinya
        const PlaceholderPage = ({ title, content }) => (
            <div className="p-4 bg-white rounded-3xl shadow-xl border border-slate-100 min-h-[500px]">
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
                return <SellerProductsPage key="seller_products_content" onPageChange={handlePageChange} />; 
            case 'seller_finance': 
                return <SellerFinancePage key="seller_finance" onPageChange={handlePageChange} />;
            // Analisis Penjualan menggunakan placeholder karena belum dibuatkan file khususnya
            case 'seller_analytics': 
                return <PlaceholderPage title="Analisis Penjualan" content="Grafik performa, barang terlaris, dan wawasan bisnis." />;
            default:
                // Fallback aman agar tidak blank
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
                
                {/* Router */}
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
