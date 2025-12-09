import React, { createContext, useState } from 'react';
// PENTING: Ambil data mentah (INITIAL_PRODUCTS) dari mockData
import { INITIAL_PRODUCTS, mockReviews } from '../data/mockData'; 

export const CartContext = createContext();

// --- DATA AWAL SIMULASI ALUR PESANAN LENGKAP ---

// Data dummy untuk Pembeli (Riwayat yang sudah terjadi)
const INITIAL_BUYER_ORDERS = [
    { 
        id: 'B-1005', 
        item: 'Stroller Doona+ (Car Seat)', 
        items: [{name: 'Stroller Doona+', pricePerDay: 150000, location: 'JKT Sel'}],
        date: '10 Jan 2025', 
        status: 'Selesai & Dana Cair', // Pesanan Selesai (Dana Cair)
        total: 180000, 
        duration: 3, 
        shippingCost: 15000,
    },
    { 
        id: 'B-1004', 
        item: 'Kamera Sony A7III', 
        items: [{name: 'Kamera Sony A7III', pricePerDay: 350000, location: 'TNG Sel'}],
        date: '15 Jan 2025', 
        status: 'Menunggu Penerimaan', // Barang sudah dikirim balik oleh pembeli
        total: 400000, 
        duration: 2, 
        shippingCost: 15000,
        returnDetails: { resi: 'JNE-KMR123', courier: 'JNE' }
    },
    { 
        id: 'B-1003', 
        item: 'Vespa Matic Sprint S 150', 
        items: [{name: 'Vespa Matic Sprint S', pricePerDay: 175000, location: 'JKT Sel'}],
        date: '20 Jan 2025', 
        status: 'Dalam Pengiriman', // Barang sedang dipakai/masa sewa aktif
        total: 200000, 
        duration: 1, 
        shippingCost: 15000,
    },
];

// Data dummy untuk Seller (Pesanan Masuk)
const INITIAL_SELLER_ORDERS = [
    { 
        id: 'INV-103', 
        item: 'Sony A7III + Lensa GM', 
        customer: 'Budi Santoso', 
        date: '8 Des 2025', 
        status: 'Menunggu Konfirmasi', // Perlu Tindakan: Terima/Tolak
        total: 350000, 
        location: 'Tangerang Selatan', 
        due: '12 Jam' 
    },
    { 
        id: 'INV-104', 
        item: 'Kamera Sony A7III', 
        customer: 'John Doe (Pembeli)', 
        date: '15 Jan 2025', 
        status: 'Menunggu Penerimaan', // Perlu Tindakan: Konfirmasi Diterima
        total: 400000, 
        location: 'Tangerang Selatan', 
        due: 'Sudah Kembali',
        returnDetails: { resi: 'JNE-KMR123', courier: 'JNE' }
    },
    { 
        id: 'INV-102', 
        item: 'Kursi Futura + Cover (20 Pcs)', 
        customer: 'Ibu Rina', 
        date: '7 Des 2025', 
        status: 'Siap Dikirim', // Perlu Tindakan: Input Resi
        total: 100000, 
        location: 'Bekasi', 
        due: 'Besok' 
    },
];

export const CartProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState(INITIAL_PRODUCTS);
    
    // --- Buyer State ---
    const [cart, setCart] = useState([]);
    // Menggunakan data riwayat yang kompleks
    const [orders, setOrders] = useState(INITIAL_BUYER_ORDERS); 

    // --- Seller State ---
    const [sellerOrders, setSellerOrders] = useState(INITIAL_SELLER_ORDERS); 

    const addToCart = (product) => {
        setCart([...cart, product]);
        const toast = document.createElement('div');
        toast.innerText = `🛒 ${product.name} masuk keranjang!`;
        toast.className = 'fixed bottom-5 right-5 bg-slate-900 text-[#14e9ff] px-6 py-3 rounded-xl shadow-2xl font-bold z-50 animate-bounce flex items-center gap-2';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    const removeFromCart = (indexToRemove) => {
        setCart(cart.filter((_, index) => index !== indexToRemove));
    };

    // FUNGSI CHECKOUT
    const addOrder = (orderData) => {
        // 1. Masukkan ke Riwayat Pembeli
        setOrders([orderData, ...orders]);
        
        // 2. Masukkan ke Pesanan Masuk Penjual (Simulasi)
        const newSellerOrder = {
            id: orderData.id,
            item: orderData.items.length > 1 ? `${orderData.items[0].name} (+${orderData.items.length - 1} lainnya)` : orderData.items[0].name,
            customer: "Anda", // Pembeli yang sedang login
            date: orderData.date,
            status: 'Menunggu Konfirmasi', // Status awal untuk penjual
            total: orderData.total,
            location: orderData.items[0].location,
            due: '24 Jam'
        };

        setSellerOrders([newSellerOrder, ...sellerOrders]);
        setCart([]);
    };
    
    // --- FUNGSI PENGEMBALIAN BARANG (ALUR KRITIS) ---

    // 1. Pembeli menandai barang siap dikembalikan
    const markOrderAsReturned = (orderId, returnDetails) => {
        // Update di Riwayat Pembeli
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: 'Menunggu Penerimaan', returnDetails } : order
        ));
        // Update di Pesanan Penjual
        setSellerOrders(sellerOrders.map(order => 
            order.id === orderId ? { ...order, status: 'Menunggu Penerimaan', returnDetails } : order
        ));
    };

    // 2. Penjual mengkonfirmasi barang sudah diterima
    const confirmOrderReceived = (orderId) => {
        // Update status di Riwayat Pembeli
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: 'Selesai & Dana Cair' } : order
        ));
        // Update status di Pesanan Penjual
        setSellerOrders(sellerOrders.map(order => 
            order.id === orderId ? { ...order, status: 'Selesai & Dana Cair' } : order
        ));
        
        // SIMULASI: Tambahkan dana ke saldo penjual di sini (jika ada state saldo)
    };
    
    // --- Fungsi Manajemen Produk (Seller) ---
    const addProduct = (newProduct) => {
        const newId = (allProducts.length + 1).toString();
        const productWithId = { 
            ...newProduct, 
            id: newId, 
            rating: 0, 
            reviews: 0, 
            availability: true,
            specs: { 'Dibuat': new Date().toLocaleDateString('id-ID') } 
        };
        setAllProducts([productWithId, ...allProducts]); 
    };
    
    const updateProduct = (updatedProduct) => {
        setAllProducts(allProducts.map(p => 
            p.id === updatedProduct.id ? { ...updatedProduct } : p
        ));
    };

    const deleteProduct = (productId) => {
        setAllProducts(allProducts.filter(p => p.id !== productId));
    };

    // Fungsi Manajemen Order Seller (Terima/Tolak, Input Resi)
    const updateSellerOrderStatus = (orderId, newStatus) => {
        setSellerOrders(sellerOrders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const totalPrice = cart.reduce((total, item) => total + item.pricePerDay, 0);

    return (
        <CartContext.Provider value={{ 
            cart, addToCart, removeFromCart, totalPrice, 
            orders, addOrder, markOrderAsReturned, confirmOrderReceived, // Buyer & Return Flow
            allProducts, addProduct, updateProduct, deleteProduct, // Product Mgmt
            sellerOrders, updateSellerOrderStatus // Seller Order Mgmt
        }}>
            {children}
        </CartContext.Provider>
    );
};
