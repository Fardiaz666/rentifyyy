import React, { createContext, useState } from 'react';
// Pastikan path ke mockData benar
import { INITIAL_PRODUCTS } from '../data/mockData'; 

export const CartContext = createContext();

// --- DATA AWAL (INITIAL STATE) ---

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
        items: [
            {
                id: '1',
                name: 'Stroller Doona+ (Car Seat & Stroller)', 
                pricePerDay: 150000, 
                // Gunakan URL placeholder jika gambar lokal belum siap
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
    // --- Global Product State ---
    const [allProducts, setAllProducts] = useState(INITIAL_PRODUCTS || []);
    
    // --- Buyer State ---
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState(INITIAL_BUYER_ORDERS); 

    // --- Seller State ---
    const [sellerOrders, setSellerOrders] = useState(INITIAL_SELLER_ORDERS); 

    // --- Actions ---

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
        // Simple Toast (Optional)
        // console.log(`${product.name} added to cart`);
    };

    const removeFromCart = (indexToRemove) => {
        setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
    };

    // FUNGSI CHECKOUT
    const addOrder = (orderData) => {
        // 1. Masukkan ke Riwayat Pembeli
        setOrders((prev) => [orderData, ...prev]);
        
        // 2. Masukkan ke Pesanan Masuk Penjual (Simulasi sinkronisasi)
        const newSellerOrder = {
            id: orderData.id,
            item: orderData.items.length > 1 ? `${orderData.items[0].name} (+${orderData.items.length - 1} lainnya)` : orderData.items[0].name,
            customer: "Anda (Demo)", 
            date: orderData.date,
            status: 'Menunggu Konfirmasi', 
            total: orderData.total,
            location: orderData.items[0].location || 'Lokasi Pembeli',
            due: '24 Jam',
            shipping: orderData.shipping,
            paymentMethod: orderData.paymentMethod
        };

        setSellerOrders((prev) => [newSellerOrder, ...prev]);
        
        // 3. Kosongkan Keranjang
        setCart([]);
    };
    
    // --- FUNGSI PENGEMBALIAN BARANG ---
    
    // Pembeli: Kirim Balik Barang
    const markOrderAsReturned = (orderId, returnDetails) => {
        setOrders((prev) => prev.map(order => 
            order.id === orderId ? { ...order, status: 'Menunggu Penerimaan', returnDetails } : order
        ));
        // Sinkronisasi ke Seller (agar seller tau barang sedang dikirim balik)
        // Cari order seller yang ID-nya sama (jika ada, karena ID di dummy kadang beda)
        // Di aplikasi nyata, ID pasti sama. Di sini kita update logika sellerOrders juga.
        setSellerOrders((prev) => prev.map(order => 
            order.id === orderId ? { ...order, status: 'Menunggu Penerimaan', returnDetails } : order
        ));
    };

    // Penjual: Konfirmasi Barang Diterima
    const confirmOrderReceived = (orderId) => {
        setOrders((prev) => prev.map(order => 
            order.id === orderId ? { ...order, status: 'Selesai & Dana Cair' } : order
        ));
        setSellerOrders((prev) => prev.map(order => 
            order.id === orderId ? { ...order, status: 'Selesai & Dana Cair' } : order
        ));
    };
    
    // --- Manajemen Produk (Seller) ---
    const addProduct = (newProduct) => {
        const newId = (allProducts.length + 1).toString();
        const productWithId = { 
            ...newProduct, 
            id: newId, 
            rating: 5.0, // Default rating
            reviews: 0, 
            availability: newProduct.stock > 0,
            imageUrl: newProduct.imageUrl || 'https://placehold.co/400x300/e0f7fa/00bcd4?text=Produk+Baru', // Fallback image
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

    // Manajemen Order Seller (Terima/Tolak/Input Resi)
    const updateSellerOrderStatus = (orderId, newStatus) => {
        setSellerOrders((prev) => prev.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
        // Sinkronisasi ke Buyer (opsional untuk simulasi)
        setOrders((prev) => prev.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
    };

    const totalPrice = cart.reduce((total, item) => total + (item.pricePerDay || 0), 0);

    return (
        <CartContext.Provider value={{ 
            // Buyer
            cart, addToCart, removeFromCart, totalPrice, 
            orders, addOrder, markOrderAsReturned, 
            
            // Seller
            allProducts, addProduct, updateProduct, deleteProduct, 
            sellerOrders, updateSellerOrderStatus, confirmOrderReceived
        }}>
            {children}
        </CartContext.Provider>
    );
};
