import React, { createContext, useState } from 'react';
import { INITIAL_PRODUCTS } from '../data/mockData'; 

export const CartContext = createContext();

// --- DATA AWAL SIMULASI (DIPERBAIKI) ---

// Data dummy untuk Pembeli (Riwayat yang sudah terjadi)
const INITIAL_BUYER_ORDERS = [
    { 
        id: 'B-1005', 
        date: '10 Jan 2025', 
        status: 'Selesai & Dana Cair', 
        total: 180000, 
        duration: 3, 
        shipping: 'Kurir Instan',
        paymentMethod: 'Transfer Bank',
        shippingCost: 15000,
        // PERBAIKAN: Struktur items harus lengkap dengan imageUrl
        items: [
            {
                id: '1',
                name: 'Stroller Doona+ (Car Seat & Stroller)', 
                pricePerDay: 150000, 
                imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800',
                location: 'Jakarta Selatan'
            }
        ],
    },
    { 
        id: 'B-1004', 
        date: '15 Jan 2025', 
        status: 'Menunggu Penerimaan', 
        total: 400000, 
        duration: 2, 
        shipping: 'Ambil Sendiri',
        paymentMethod: 'E-Wallet',
        shippingCost: 0,
        returnDetails: { resi: 'JNE-KMR123', courier: 'JNE' },
        items: [
            {
                id: '2',
                name: 'Paket Sony A7III + Lensa G-Master', 
                pricePerDay: 350000, 
                imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
                location: 'Tangerang Selatan'
            }
        ],
    },
    { 
        id: 'B-1003', 
        date: '20 Jan 2025', 
        status: 'Dalam Pengiriman', 
        total: 200000, 
        duration: 1, 
        shipping: 'Kurir Instan',
        paymentMethod: 'QRIS',
        shippingCost: 15000,
        items: [
            {
                id: '7',
                name: 'Vespa Matic Sprint S 150', 
                pricePerDay: 175000, 
                imageUrl: 'https://images.unsplash.com/photo-1609630875171-b1321377ee53?auto=format&fit=crop&q=80&w=800', // Ganti ke URL stabil jika asset lokal bermasalah
                location: 'Jakarta Selatan'
            }
        ],
    },
];

// Data dummy untuk Seller (Pesanan Masuk)
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
        id: 'INV-104', 
        item: 'Kamera Sony A7III', 
        customer: 'John Doe (Pembeli)', 
        date: '15 Jan 2025', 
        status: 'Menunggu Penerimaan', 
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
        status: 'Siap Dikirim', 
        total: 100000, 
        location: 'Bekasi', 
        due: 'Besok' 
    },
];

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState(INITIAL_PRODUCTS);
    
    // --- Buyer State ---
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState(INITIAL_BUYER_ORDERS); // Gunakan data dummy yang sudah diperbaiki

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
        setOrders([orderData, ...orders]);
        
        const newSellerOrder = {
            id: orderData.id,
            item: orderData.items.length > 1 ? `${orderData.items[0].name} (+${orderData.items.length - 1} lainnya)` : orderData.items[0].name,
            customer: "Anda", 
            date: orderData.date,
            status: 'Menunggu Konfirmasi',
            total: orderData.total,
            location: orderData.items[0].location,
            due: '24 Jam'
        };

        setSellerOrders([newSellerOrder, ...sellerOrders]);
        setCart([]);
    };
    
    // --- FUNGSI PENGEMBALIAN BARANG ---
    const markOrderAsReturned = (orderId, returnDetails) => {
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: 'Menunggu Penerimaan', returnDetails } : order
        ));
        setSellerOrders(sellerOrders.map(order => 
            order.id === orderId ? { ...order, status: 'Menunggu Penerimaan', returnDetails } : order
        ));
    };

    const confirmOrderReceived = (orderId) => {
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: 'Selesai & Dana Cair' } : order
        ));
        setSellerOrders(sellerOrders.map(order => 
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
        setSellerOrders(sellerOrders.map(order => 
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
