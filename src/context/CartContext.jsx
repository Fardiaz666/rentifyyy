import React, { createContext, useState } from 'react';
import { INITIAL_PRODUCTS, mockReviews } from '../data/mockData'; 

export const CartContext = createContext();

// --- DATA AWAL (INITIAL STATE) ---

// 1. Data dummy untuk Pembeli
const INITIAL_BUYER_ORDERS = [
    { 
        id: 'ORD-101', 
        date: '10 Jan 2025', 
        status: 'Selesai & Dana Cair', 
        total: 180000, 
        duration: 3, 
        shipping: 'Kurir Instan',
        paymentMethod: 'Transfer Bank',
        shippingCost: 15000,
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
        id: 'ORD-102', 
        date: '15 Jan 2025', 
        status: 'Menunggu Penerimaan', 
        total: 400000, 
        duration: 2, 
        shipping: 'Ambil Sendiri',
        paymentMethod: 'E-Wallet',
        shippingCost: 0,
        returnDetails: { resi: 'JNE-KMR123', courier: 'JNE Regular' },
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
];

// 2. Data dummy untuk Seller (Pesanan Masuk)
// UPDATE: Menambahkan properti 'imageUrl' agar bisa tampil di dashboard seller
const INITIAL_SELLER_ORDERS = [
    { 
        id: 'ORD-102', 
        item: 'Paket Sony A7III + Lensa G-Master', 
        // Tambahkan URL gambar di sini
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
        customer: 'John Doe (Pembeli)', 
        date: '15 Jan 2025', 
        status: 'Menunggu Penerimaan', 
        total: 400000, 
        location: 'Tangerang Selatan', 
        due: 'Barang Kembali',
        returnDetails: { resi: 'JNE-KMR123', courier: 'JNE Regular' }
    },
    { 
        id: 'INV-103', 
        item: 'Sony A7III + Lensa GM', 
        // Tambahkan URL gambar di sini
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
        customer: 'Budi Santoso', 
        date: '8 Des 2025', 
        status: 'Menunggu Konfirmasi', 
        total: 350000, 
        location: 'Tangerang Selatan', 
        due: '12 Jam' 
    },
];

export const CartProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState(INITIAL_PRODUCTS || []);
    
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState(INITIAL_BUYER_ORDERS); 
    const [sellerOrders, setSellerOrders] = useState(INITIAL_SELLER_ORDERS); 

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (indexToRemove) => {
        setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
    };

    const addOrder = (orderData) => {
        setOrders((prev) => [orderData, ...prev]);
        
        // Saat buyer checkout, kita buat data untuk seller
        // Pastikan kita mengambil gambar dari item pertama
        const firstItemImage = orderData.items.length > 0 ? orderData.items[0].imageUrl : 'https://placehold.co/100x100?text=No+Image';

        const newSellerOrder = {
            id: orderData.id,
            item: orderData.items.length > 0 ? orderData.items[0].name : 'Barang Sewaan',
            // Simpan URL gambar ke data seller order
            imageUrl: firstItemImage, 
            customer: "Anda (Demo)", 
            date: orderData.date,
            status: 'Menunggu Konfirmasi', 
            total: orderData.total,
            location: orderData.items.length > 0 ? (orderData.items[0].location || 'Lokasi Pembeli') : 'Lokasi Pembeli',
            due: '24 Jam',
            shipping: orderData.shipping,
            paymentMethod: orderData.paymentMethod
        };

        setSellerOrders((prev) => [newSellerOrder, ...prev]);
        setCart([]);
    };
    
    // --- FUNGSI LAINNYA TETAP SAMA ---
    const markOrderAsReturned = (orderId, returnDetails) => {
        setOrders((prev) => prev.map(order => 
            order.id === orderId ? { ...order, status: 'Menunggu Penerimaan', returnDetails } : order
        ));
        setSellerOrders((prev) => prev.map(order => 
            order.id === orderId ? { ...order, status: 'Menunggu Penerimaan', returnDetails } : order
        ));
    };

    const confirmOrderReceived = (orderId) => {
        setOrders((prev) => prev.map(order => 
            order.id === orderId ? { ...order, status: 'Selesai & Dana Cair' } : order
        ));
        setSellerOrders((prev) => prev.map(order => 
            order.id === orderId ? { ...order, status: 'Selesai & Dana Cair' } : order
        ));
    };
    
    const addProduct = (newProduct) => {
        const newId = (allProducts.length + 1).toString();
        const productWithId = { 
            ...newProduct, 
            id: newId, 
            rating: 5.0, 
            reviews: 0, 
            availability: newProduct.stock > 0,
            imageUrl: newProduct.imageUrl || 'https://placehold.co/400x300/e0f7fa/00bcd4?text=Produk+Baru', 
            specs: { 'Dibuat': new Date().toLocaleDateString('id-ID') } 
        };
        setAllProducts((prev) => [productWithId, ...prev]); 
    };
    
    const updateProduct = (updatedProduct) => {
        setAllProducts((prev) => prev.map(p => 
            p.id === updatedProduct.id ? { ...updatedProduct, availability: updatedProduct.stock > 0 } : p
        ));
    };

    const deleteProduct = (productId) => {
        setAllProducts((prev) => prev.filter(p => p.id !== productId));
    };

    const updateSellerOrderStatus = (orderId, newStatus) => {
        setSellerOrders((prev) => prev.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
        setOrders((prev) => prev.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const totalPrice = cart.reduce((total, item) => total + (item.pricePerDay || 0), 0);

    return (
        <CartContext.Provider value={{ 
            cart, addToCart, removeFromCart, totalPrice, 
            orders, addOrder, markOrderAsReturned, 
            allProducts, addProduct, updateProduct, deleteProduct, 
            sellerOrders, updateSellerOrderStatus, confirmOrderReceived
        }}>
            {children}
        </CartContext.Provider>
    );
};
