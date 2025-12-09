import React, { createContext, useState } from 'react';
// PENTING: Ambil data mentah (INITIAL_PRODUCTS) dari mockData
import { INITIAL_PRODUCTS } from '../data/mockData'; 

export const CartContext = createContext();

// Data awal dummy untuk Seller (agar dashboard tidak kosong saat pertama buka)
const INITIAL_SELLER_ORDERS = [
    { 
        id: 'INV-103', 
        item: 'Sony A7III + Lensa GM', 
        customer: 'Budi Santoso', 
        date: '8 Des 2025', 
        status: 'Menunggu Konfirmasi', 
        total: 350000, 
        location: 'Tangerang Selatan', 
        due: '12 Jam' 
    },
    { 
        id: 'INV-102', 
        item: 'Kursi Futura + Cover (20 Pcs)', 
        customer: 'Ibu Rina', 
        date: '7 Des 2025', 
        status: 'Siap Dikirim', 
        total: 100000, 
        location: 'Bekasi', 
        due: 'Besok' 
    },
];

export const CartProvider = ({ children }) => {
    // --- Global Product State (Untuk Homepage, Katalog, dan Seller Product Mgmt) ---
    const [allProducts, setAllProducts] = useState(INITIAL_PRODUCTS);
    
    // --- Buyer State ---
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]); // Riwayat Pembeli

    // --- Seller State ---
    const [sellerOrders, setSellerOrders] = useState(INITIAL_SELLER_ORDERS); // Pesanan Masuk Penjual

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
            customer: "John Doe (Anda)",
            date: orderData.date,
            status: 'Menunggu Konfirmasi', // Status awal untuk penjual
            total: orderData.total,
            location: orderData.items[0].location,
            due: '24 Jam'
        };

        setSellerOrders([newSellerOrder, ...sellerOrders]);

        // 3. Kosongkan Keranjang
        setCart([]);
    };
    
    // --- FUNGSI PENGEMBALIAN BARANG (BARU) ---

    // 1. Pembeli menandai barang siap dikembalikan (Sisi Pembeli)
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

    // 2. Penjual mengkonfirmasi barang sudah diterima (Sisi Penjual)
    const confirmOrderReceived = (orderId) => {
        // Update status di Riwayat Pembeli
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: 'Selesai & Dana Cair' } : order
        ));
        // Update status di Pesanan Penjual
        setSellerOrders(sellerOrders.map(order => 
            order.id === orderId ? { ...order, status: 'Selesai & Dana Cair' } : order
        ));
        
        // Tambahkan logika pencairan dana ke saldo penjual di sini (Simulasi)
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

    // Fungsi Manajemen Order Seller (Terima/Tolak - Non-return)
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
