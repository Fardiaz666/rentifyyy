import React, { createContext, useState } from 'react';
import { INITIAL_PRODUCTS } from '../data/mockData'; 

export const CartContext = createContext();

// --- DATA AWAL YANG DISINKRONKAN (PENTING) ---
// Agar simulasi berjalan lancar, ID pesanan di Pembeli dan Penjual harus SAMA.

// 1. Pesanan yang sudah SELESAI
const ORDER_1 = {
    id: 'ORD-101',
    date: '10 Jan 2025',
    total: 180000,
    status: 'Selesai & Dana Cair',
    item_name: 'Stroller Doona+ (Car Seat & Stroller)',
    location: 'Jakarta Selatan',
    customer: 'Budi Santoso',
    items: [{ id: '1', name: 'Stroller Doona+ (Car Seat & Stroller)', pricePerDay: 150000, imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800' }],
    shipping: 'Kurir Instan',
    paymentMethod: 'Transfer Bank',
    duration: 3,
    shippingCost: 15000
};

// 2. Pesanan yang SEDANG DIKEMBALIKAN (Menunggu Konfirmasi Penjual)
const ORDER_2 = {
    id: 'ORD-102',
    date: '15 Jan 2025',
    total: 400000,
    status: 'Menunggu Penerimaan', // Status penting untuk demo fitur ini
    item_name: 'Kamera Sony A7III + Lensa G-Master',
    location: 'Tangerang Selatan',
    customer: 'John Doe (Anda)',
    items: [{ id: '2', name: 'Paket Sony A7III + Lensa G-Master', pricePerDay: 350000, imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800' }],
    shipping: 'Ambil Sendiri',
    paymentMethod: 'E-Wallet',
    duration: 2,
    shippingCost: 0,
    returnDetails: { resi: 'JPX-88219922', courier: 'JNE Regular' } // Data resi simulasi
};

// 3. Pesanan yang DALAM PENGIRIMAN (Siap untuk dikembalikan oleh Pembeli)
const ORDER_3 = {
    id: 'ORD-103',
    date: '20 Jan 2025',
    total: 200000,
    status: 'Dalam Pengiriman', // Status agar tombol "Kirim Kembali" muncul di sisi pembeli
    item_name: 'Vespa Matic Sprint S 150',
    location: 'Jakarta Selatan',
    customer: 'Siti Aminah',
    items: [{ id: '7', name: 'Vespa Matic Sprint S 150', pricePerDay: 175000, imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee53?auto=format&fit=crop&q=80&w=800' }],
    shipping: 'Kurir Instan',
    paymentMethod: 'QRIS',
    duration: 1,
    shippingCost: 15000
};


// --- INITIAL STATE UNTUK PEMBELI ---
const INITIAL_BUYER_ORDERS = [ORDER_1, ORDER_2, ORDER_3];

// --- INITIAL STATE UNTUK PENJUAL ---
// Kita format sedikit agar sesuai tampilan tabel penjual, tapi ID-nya SAMA.
const INITIAL_SELLER_ORDERS = [
    { 
        id: ORDER_2.id, // ORD-102
        item: ORDER_2.item_name, 
        customer: ORDER_2.customer, 
        date: ORDER_2.date, 
        status: ORDER_2.status, 
        total: ORDER_2.total, 
        location: ORDER_2.location,
        shipping: ORDER_2.shipping,
        returnDetails: ORDER_2.returnDetails, // Penting untuk seller lihat resi
        due: 'Barang Kembali'
    },
    { 
        id: ORDER_3.id, // ORD-103
        item: ORDER_3.item_name, 
        customer: ORDER_3.customer, 
        date: ORDER_3.date, 
        status: ORDER_3.status, 
        total: ORDER_3.total, 
        location: ORDER_3.location, 
        shipping: ORDER_3.shipping,
        due: '2 Hari Lagi' 
    },
    // Tambah satu pesanan baru khusus seller (Menunggu Konfirmasi)
    { 
        id: 'ORD-104', 
        item: 'PlayStation 5', 
        customer: 'Budi Santoso', 
        date: '21 Jan 2025', 
        status: 'Menunggu Konfirmasi', 
        total: 250000, 
        location: 'Jakarta Timur', 
        due: '12 Jam' 
    }
];

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState(INITIAL_PRODUCTS);
    
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState(INITIAL_BUYER_ORDERS); 
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

    // --- FUNGSI CHECKOUT ---
    const addOrder = (orderData) => {
        // 1. Masukkan ke Riwayat Pembeli
        setOrders([orderData, ...orders]);
        
        // 2. Masukkan ke Dashboard Penjual (Sinkronisasi)
        const newSellerOrder = {
            id: orderData.id,
            item: orderData.items.length > 1 ? `${orderData.items[0].name} (+${orderData.items.length - 1} lainnya)` : orderData.items[0].name,
            customer: "John Doe (Anda)", 
            date: orderData.date,
            status: 'Menunggu Konfirmasi',
            total: orderData.total,
            location: orderData.items[0].location || 'Jakarta',
            shipping: orderData.shipping,
            paymentMethod: orderData.paymentMethod,
            due: '24 Jam'
        };

        setSellerOrders([newSellerOrder, ...sellerOrders]);
        setCart([]);
    };
    
    // --- FUNGSI PENGEMBALIAN BARANG (SINKRON) ---
    // Dipanggil oleh Pembeli
    const markOrderAsReturned = (orderId, returnDetails) => {
        // Update sisi Pembeli
        setOrders(prevOrders => prevOrders.map(order => 
            order.id === orderId ? { ...order, status: 'Menunggu Penerimaan', returnDetails } : order
        ));
        // Update sisi Penjual (Agar muncul tombol 'Konfirmasi Diterima')
        setSellerOrders(prevSellerOrders => prevSellerOrders.map(order => 
            order.id === orderId ? { ...order, status: 'Menunggu Penerimaan', returnDetails } : order
        ));
    };

    // Dipanggil oleh Penjual
    const confirmOrderReceived = (orderId) => {
        // Update sisi Pembeli
        setOrders(prevOrders => prevOrders.map(order => 
            order.id === orderId ? { ...order, status: 'Selesai & Dana Cair' } : order
        ));
        // Update sisi Penjual
        setSellerOrders(prevSellerOrders => prevSellerOrders.map(order => 
            order.id === orderId ? { ...order, status: 'Selesai & Dana Cair' } : order
        ));
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

    const updateSellerOrderStatus = (orderId, newStatus) => {
        // Update Seller
        setSellerOrders(prevSellerOrders => prevSellerOrders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
        // Update Buyer juga agar sinkron (misal: Penjual klik 'Kirim', status di pembeli jadi 'Dalam Pengiriman')
        setOrders(prevOrders => prevOrders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const totalPrice = cart.reduce((total, item) => total + item.pricePerDay, 0);

    return (
        <CartContext.Provider value={{ 
            cart, addToCart, removeFromCart, totalPrice, 
            orders, addOrder, markOrderAsReturned, confirmOrderReceived, 
            allProducts, addProduct, updateProduct, deleteProduct, 
            sellerOrders, updateSellerOrderStatus 
        }}>
            {children}
        </CartContext.Provider>
    );
};
